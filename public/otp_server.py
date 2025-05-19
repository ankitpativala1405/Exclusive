# # # # import pywhatkit as pwk
# # # # import pyautogui
# # # # import time
# # # # import random

# # # # otp = random.randint(100000, 999999)
# # # # message = f"Your OTP is: {otp}"

# # # # pwk.sendwhatmsg_instantly("+919723665181", message, wait_time=15, tab_close=True)

# # # # time.sleep(20)
# # # # pyautogui.press('enter')

# # # # print(f"OTP sent: {otp}")

# otp_server.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import pywhatkit as pwk
import pyautogui
import time
import random

app = Flask(__name__)
CORS(app)

def send_otp(phone_number: str) -> int:
    otp = random.randint(100000, 999999)
    message = f"Your OTP is: {otp}"
    try:
        pwk.sendwhatmsg_instantly(phone_number, message, wait_time=15, tab_close=True)
        time.sleep(20)
        pyautogui.press('enter')
        print(f"OTP sent to {phone_number}: {otp}")
        return otp
    except Exception as e:
        print(f"Error: {e}")
        return -1

@app.route("/", methods=["POST"])
def send_otp_api():
    data = request.get_json()
    phone_number = data.get("phone")
    if not phone_number:
        return jsonify({"error": "Phone number required"}), 400
    otp = send_otp(phone_number)
    if otp == -1:
        return jsonify({"error": "Failed to send OTP"}), 500
    return jsonify({"otp": otp}), 200

if __name__ == "__main__":
    app.run(port=4000)

