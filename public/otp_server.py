# # # import pywhatkit as pwk
# # # import pyautogui
# # # import time
# # # import random

# # # otp = random.randint(100000, 999999)
# # # message = f"Your OTP is: {otp}"

# # # pwk.sendwhatmsg_instantly("+919723665181", message, wait_time=15, tab_close=True)

# # # time.sleep(20)
# # # pyautogui.press('enter')

# # # print(f"OTP sent: {otp}")

# # # otp_sender.py
# # import pywhatkit as pwk
# # import pyautogui
# # import time
# # import random

# # def send_otp(phone_number: str) -> int:
# #     """Sends a 6-digit OTP to the given WhatsApp number and returns the OTP."""
# #     otp = random.randint(100000, 999999)
# #     message = f"Your OTP is: {otp}"
    
# #     # Send the message instantly with a wait time
# #     pwk.sendwhatmsg_instantly(phone_number, message, wait_time=15, tab_close=True)
    
# #     # Wait to ensure message box is ready, then press Enter
# #     time.sleep(20)
# #     pyautogui.press('enter')
    
# #     print(f"OTP sent to {phone_number}: {otp}")
# #     return otp

# import pywhatkit as pwk
# import pyautogui
# import time
# import random

# def send_otp(phone_number: str) -> int:
#     """
#     Sends a 6-digit OTP to the given WhatsApp number and returns the OTP.
#     Make sure the sender is logged into WhatsApp Web in the browser.
#     """
#     try:
#         # Generate a 6-digit OTP
#         otp = random.randint(100000, 999999)
#         message = f"Your OTP is: {otp}"

#         print(f"Preparing to send OTP to {phone_number}...")

#         # Send the message instantly with a wait time
#         pwk.sendwhatmsg_instantly(phone_number, message, wait_time=15, tab_close=True)

#         # Give time for the WhatsApp Web interface to load
#         time.sleep(20)

#         # Press 'Enter' to send the message if needed
#         pyautogui.press('enter')

#         print(f"OTP sent successfully to {phone_number}: {otp}")
#         return otp

#     except Exception as e:
#         print(f"Failed to send OTP: {e}")
#         return -1  # Indicates failure

# # Example usage
# if __name__ == "__main__":
#     receiver_number = "+911234567890"  # Replace with the actual receiver number
#     otp = send_otp(receiver_number)

#     if otp != -1:
#         print("Returned OTP:", otp)
#     else:
#         print("OTP could not be sent.")


# otp_server.py
from flask import Flask, request, jsonify
import pywhatkit as pwk
import pyautogui
import time
import random

app = Flask(__name__)

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

@app.route("/send-otp", methods=["POST"])
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
    app.run(port=5000)
