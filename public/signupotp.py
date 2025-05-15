import pywhatkit as pwk
import pyautogui
import time
import random

otp = random.randint(100000, 999999)
message = f"Your OTP is: {otp}"

pwk.sendwhatmsg_instantly("+919723665181", message, wait_time=15, tab_close=True)

time.sleep(20)
pyautogui.press('enter')

print(f"OTP sent: {otp}")
