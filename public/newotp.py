# otp_service.py (or inside your Flask app file)

from flask import Flask, request, jsonify
from flask_cors import CORS
import pywhatkit as kit
import random
import datetime

app = Flask(__name__)
CORS(app)

def generate_otp():
    return str(random.randint(100000, 999999))

def send_otp_message(phone_number, otp):
    now = datetime.datetime.now()
    hour = now.hour
    minute = now.minute + 2
    message = f"Your OTP is: {otp}"
    print(f"Scheduling WhatsApp message to {phone_number}: {message}")
    kit.sendwhatmsg(phone_number, message, hour, minute)

@app.route('/send-otp', methods=['POST'])
def send_otp():
    data = request.get_json()
    phone_number = data.get('number')

    if not phone_number:
        return jsonify({"message": "Phone number is required"}), 400

    if not phone_number.startswith('+') or len(phone_number) < 10:
        return jsonify({"message": "Please include country code (e.g., +91XXXXXXXXXX)"}), 400

    otp = generate_otp()

    try:
        send_otp_message(phone_number, otp)
        return jsonify({"message": "OTP is scheduled to be sent via WhatsApp in 2 minutes."}), 200
    except Exception as e:
        print("Failed to send WhatsApp OTP:", e)
        return jsonify({"message": "Failed to send WhatsApp OTP."}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)
