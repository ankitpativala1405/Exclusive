from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
import random
import os

app = Flask(__name__)
CORS(app)  # Allow requests from frontend

# Store OTPs in memory for demo (use DB/Redis in real use)
otp_store = {}

@app.route('/send-otp', methods=['POST'])
def send_otp():
    data = request.json
    email = data.get('email')

    if not email:
        return jsonify({"error": "Email is required"}), 400

    otp = str(random.randint(100000, 999999))
    otp_store[email] = otp

    try:
        # Use your SMTP provider settings
        sender_email = "ankitj1405@gmail.com"
        sender_password = os.getenv("EMAIL_PASSWORD")  # Store in env var for security

        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(sender_email, sender_password)
            message = f"Subject: Your OTP Code\n\nYour OTP code is {otp}."
            server.sendmail(sender_email, email, message)

        return jsonify({"message": "OTP sent successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/verify-otp', methods=['POST'])
def verify_otp():
    data = request.json
    email = data.get("email")
    user_otp = data.get("otp")

    if otp_store.get(email) == user_otp:
        return jsonify({"message": "OTP verified successfully!"}), 200
    else:
        return jsonify({"error": "Invalid OTP"}), 400

if __name__ == '__main__':
    app.run(port=4001, debug=False)
