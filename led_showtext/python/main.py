import time
from pathlib import Path

from arduino.app_utils import App, Bridge

TEXT_FILE = Path("/app/python/led_text.txt")
POLL_INTERVAL_SEC = 0.5

last_sent_text = None

print("LED matrix text app started.")
print(f"Edit {TEXT_FILE} to update the scrolling text.")


def read_text_file() -> str:
    try:
        text = TEXT_FILE.read_text(encoding="utf-8").strip()
    except FileNotFoundError:
        return ""

    return text


def send_text_if_changed() -> None:
    global last_sent_text

    text = read_text_file()
    if not text or text == last_sent_text:
        return

    ok = Bridge.call("set_text", text)
    if ok:
        last_sent_text = text
        print(f"Updated LED text: {text}")
    else:
        print(f"Failed to update LED text: {text}")


def loop():
    send_text_if_changed()
    time.sleep(POLL_INTERVAL_SEC)


App.run(user_loop=loop)
