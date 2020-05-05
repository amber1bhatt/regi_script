import requests
from html.parser import HTMLParser
import smtplib
from email.message import EmailMessage
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from string import Template

# payload={'sesscd': input("Term (S=summer, W=winter): "),
#          'sessyr': input("Year: "),
#          'course': input("Course: "),
#          'section': input("Section: "),
#          'dept': input("Department (in all caps): ")}

r = requests.get('https://courses.students.ubc.ca/cs/courseschedule?sesscd=W&pname=subjarea&tname=subj-section&course=220&sessyr=2020&section=101&dept=MATH')

# print(r.text)
# print(r.url)


class MyHTMLParser(HTMLParser):
    print_flag = False
    seat_data = []
    seat_data_dict = {}
    availability = "Limbo"
    # def handle_starttag(self, tag, attrs):
    #     print("Start tag:", tag)
    #     for attr in attrs:
    #         # if attr == "('table-nonfluid&#39;', None)":
    #             print("     attr:", attr)

    # def handle_endtag(self, tag):
    #     print("End tag  :", tag)

    def handle_data(self, data):
        if MyHTMLParser.print_flag:
            MyHTMLParser.seat_data.append(data)
        if data == "Seat Summary":
            MyHTMLParser.print_flag = True
        if data == "Book Summary":
            MyHTMLParser.print_flag = False

    def clean_seat_data(self):
        for val in MyHTMLParser.seat_data:
            if "\n" in val or "Book Summary" in val or "\n\n" in val:
                MyHTMLParser.seat_data.remove(val)

        if len(MyHTMLParser.seat_data) >= 10:
            MyHTMLParser.seat_data = MyHTMLParser.seat_data[0:8]

        MyHTMLParser.seat_data_dict = {MyHTMLParser.seat_data[i]: MyHTMLParser.seat_data[i+1] for i in range(0, len(MyHTMLParser.seat_data),2)}

    def check_data(self):
        # print(MyHTMLParser.seat_data)
        if int(MyHTMLParser.seat_data_dict["General Seats Remaining:"]) > 0:
            print("SEAT OPEN")
            return True
        else:
            print("The Big Sad")
            return False

def get_contacts(filename):
    """
    Return two lists names, emails containing names and email addresses
    read from a file specified by filename.
    """
    names = []
    emails = []
    with open(filename, mode='r', encoding='utf-8') as contacts_file:
        for a_contact in contacts_file:
            names.append(a_contact.split()[0])
            emails.append(a_contact.split()[1])
    return names, emails


def read_template(filename):
    """
    Returns a Template object comprising the contents of the 
    file specified by filename.
    """
    
    with open(filename, 'r', encoding='utf-8') as template_file:
        template_file_content = template_file.read()
    return Template(template_file_content)


parser = MyHTMLParser()
parser.feed(r.text)

parser.clean_seat_data()
# print(parser.check_data())
if parser.check_data():
    names, emails = get_contacts('mycontacts.txt') # read contacts
    print(names, emails)
    message_template = read_template('message.txt')
    print(message_template)

    # set up the SMTP server
    s = smtplib.SMTP(host='smtp.gmail.com', port="587")
    s.starttls()
    s.login("register.notif.script@gmail.com", "amscripts7")

    # For each contact, send the email:
    for name, email in zip(names, emails):
        msg = MIMEMultipart()       # create a message

        # add in the actual person name to the message template
        message = message_template.substitute(PERSON_NAME=name.title())

        # Prints out the message body for our sake
        print(message)

        # setup the parameters of the message
        msg['From']="register.notif.script@gmail.com"
        msg['To']=email
        msg['Subject']="This is TEST"
        
        # add in the message body
        msg.attach(MIMEText(message, 'plain'))
        
        # send the message via the server set up earlier.
        s.send_message(msg)
        del msg
        
    # Terminate the SMTP session and close the connection
    s.quit()



# print(parser.seat_data)
# print(parser.seat_data_dict)

# FROM = 'amberb220@gmail.com'
# TO = 'amberb220@gmail.com'
# SUBJECT = availability
# TEXT = "Yeet"
# message = """\
# FROM: %s
# TO: %s
# SUBJECT: %s
#
# %s
# """ % (FROM, ", ".join(TO), SUBJECT, TEXT)
# server = smtplib.SMTP('')
