# AI Camera Detection

`AI Camera Detection` 是一个面向 **Arduino UNO Q** 和 **Arduino App Lab** 的 USB 摄像头目标检测示例。应用会读取实时摄像头画面，使用 `video_object_detection` Brick 识别物体，并在 Web UI 中显示检测结果。

## 功能

- 显示 USB 摄像头实时画面
- 使用 YOLOX 目标检测模型识别物体
- 在浏览器中显示最新检测结果和历史记录
- 支持通过滑块调整检测置信度阈值

## 硬件要求

- Arduino UNO Q
- USB 摄像头
- USB-C Hub
- USB-C 数据线或电源
- 运行 Arduino App Lab 的电脑

## 软件要求

- Arduino App Lab
- 设备与浏览器处于可访问的同一网络环境

## 项目结构

```text
ai-camera-detection/
├── app.yaml
├── README.md
├── assets/
│   ├── app.js
│   ├── index.html
│   ├── style.css
│   └── libs/socket.io.min.js
└── python/
    └── main.py
```

## 使用方法

1. 将 USB 摄像头连接到 UNO Q。
2. 在 Arduino App Lab 中打开 `ai-camera-detection/`。
3. 运行 App。
4. Web UI 打开后，等待摄像头画面加载。
5. 将物体放到摄像头前，查看检测结果。

## 工作原理

`python/main.py` 初始化两个 Brick：

- `WebUI`：负责浏览器页面和 Python 后端之间的 Socket.IO 通信
- `VideoObjectDetection`：负责从摄像头视频流中检测物体

当模型检测到物体时，Python 后端会把物体名称、置信度和时间戳发送给前端。前端接收 `detection` 事件后更新最新检测结果和历史列表。

前端的置信度滑块会发送 `override_th` 消息给 Python 后端，用于动态调整检测阈值。
