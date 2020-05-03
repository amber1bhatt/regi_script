import requests
from html.parser import HTMLParser

# payload={'sesscd': input("Term (S=summer, W=winter): "), 
#          'pname': 'subjarea', 'tname': 'subj-section', 
#          'sessyr': input("Year: "), 
#          'course': input("Course: "), 
#          'section': input("Section: "), 
#          'dept': input("Department (in all caps): ")}

r = requests.get('https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-section&dept=MATH&course=220&section=951')

# print(r.text)
# print(r.url)


class MyHTMLParser(HTMLParser):
    print_flag = False
    seat_data = []
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


parser = MyHTMLParser()
parser.feed(r.text)

parser.clean_seat_data()

print(parser.seat_data)

