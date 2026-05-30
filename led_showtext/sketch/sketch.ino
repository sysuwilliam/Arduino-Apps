#include <ArduinoGraphics.h>
#include <Arduino_LED_Matrix.h>
#include <Arduino_RouterBridge.h>

Arduino_LED_Matrix matrix;
String currentText = "";

void renderScrollingText(const String& text) {
  matrix.beginDraw();
  matrix.background(0x000000);
  matrix.clear();

  matrix.stroke(0xFFFFFF);
  matrix.textFont(Font_5x7);
  matrix.textScrollSpeed(50);
  matrix.beginText(0, 1, 0xFFFFFF);
  matrix.print(text);
  matrix.endText(SCROLL_LEFT);
  matrix.endDraw();
}

bool setText(String text) {
  if (text.length() == 0) {
    return false;
  }

  currentText = text;
  renderScrollingText(currentText);
  return true;
}

void setup() {
  matrix.begin();
  Bridge.begin();
  Bridge.provide_safe("set_text", setText);
  matrix.beginDraw();
  matrix.background(0x000000);
  matrix.clear();
  matrix.endDraw();
}

void loop() {
  if (currentText.length() > 0) {
    renderScrollingText(currentText);
  }
}
