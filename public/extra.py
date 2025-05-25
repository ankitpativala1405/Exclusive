import smtplib
import os
from dotenv import load_dotenv

load_dotenv()  # This loads variables from .env file into environment

sender_email = "ankitj1405@gmail.com"
password = os.getenv("EMAIL_PASSWORD")
print("Email Password from env:", password)

receiver_email = "pativalaankit@gmail.com"  # replace with your test email

try:
    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(sender_email, password)
        server.sendmail(sender_email, receiver_email, "Subject: Test\n\nThis is a test email.")
    print("Email sent successfully!")
except Exception as e:
    print("Failed to send email:", e)
