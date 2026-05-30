# SPDX-FileCopyrightText: Copyright (C) ARDUINO SRL (http://www.arduino.cc)
#
# SPDX-License-Identifier: MPL-2.0

from datetime import UTC, datetime

from arduino.app_bricks.video_objectdetection import VideoObjectDetection
from arduino.app_bricks.web_ui import WebUI
from arduino.app_utils import App


ui = WebUI()
detection_stream = VideoObjectDetection(confidence=0.5, debounce_sec=0.0)


def set_confidence_threshold(sid, threshold):
    detection_stream.override_threshold(float(threshold))


def send_detections_to_ui(detections: dict):
    for label, values in detections.items():
        for value in values:
            ui.send_message(
                "detection",
                message={
                    "content": label,
                    "confidence": value.get("confidence"),
                    "timestamp": datetime.now(UTC).isoformat(),
                },
            )


ui.on_message("override_th", set_confidence_threshold)
detection_stream.on_detect_all(send_detections_to_ui)

App.run()
