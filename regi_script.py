import requests

payload={'sesscd': input("Term (S=summer, W=winter): "), 'pname': 'subjarea', 'tname': 'subj-section', 'sessyr': input("Year: "), 'course': input("Course: "), 'section': input("Section: "), 'dept': input("Department (in all caps): ")}
r = requests.get('https://courses.students.ubc.ca/cs/courseschedule', params=payload)

print(r.text)
print(r.url)
