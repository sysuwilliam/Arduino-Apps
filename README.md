# Arduino Apps

这个仓库收集了一组基于 **Arduino UNO Q** 和 **Arduino App Lab** 的示例应用，覆盖板载 LED、LED 矩阵、摄像头目标检测、手机摄像头输入和天气显示等场景。

## 应用列表

| 目录 | 应用 | 说明 |
| --- | --- | --- |
| `blink-led/` | Blink LED | 通过 Python 和 Arduino Router Bridge 控制板载 LED 每秒闪烁 |
| `detect-objects-on-camera/` | Detect Objects on Camera | 使用 USB 摄像头和目标检测 Brick 识别实时画面中的物体 |
| `detect-objects-on-smartphone-camera/` | Detect Objects on Smartphone Camera | 使用手机摄像头作为远程视频输入进行目标检测 |
| `weather-forecast-on-led-matrix/` | Weather forecast on LED matrix | 获取天气数据并在 UNO Q 的 8 x 13 LED 矩阵上显示动画 |
| `led_showtext/` | LED_showtext | 从文本文件读取内容，并在 8 x 13 LED 矩阵上循环滚动显示 |
| `copy-of-detect-objects-on-camera/` | Copy of Detect Objects on Camera | USB 摄像头目标检测示例副本，用于实验或对照 |

## 仓库结构

每个应用通常包含以下文件和目录：

```text
app-name/
├── app.yaml        # Arduino App Lab 应用元数据和 Brick 配置
├── README.md       # 单个应用的使用说明
├── python/         # Linux / MPU 侧 Python 逻辑
├── sketch/         # MCU 侧 Arduino sketch
└── assets/         # Web UI、图片、字体或文档资源
```

不是所有应用都会同时包含 `python/`、`sketch/` 和 `assets/`。例如摄像头检测类应用主要包含 Python 后端和 Web UI，LED 矩阵类应用通常还包含 Arduino sketch。

## 环境要求

- Arduino UNO Q
- Arduino App Lab
- USB-C 数据线
- 需要摄像头的示例还需要 USB 摄像头、USB-C Hub 或 Arduino IoT Remote 手机应用
- 需要联网的示例需要设备能够访问局域网或互联网

具体硬件和软件要求请查看每个应用目录下的 `README.md`。

## 使用方式

1. 在 Arduino App Lab 中打开目标应用目录。
2. 检查该应用的 `README.md` 和 `app.yaml`。
3. 按说明连接硬件，例如 USB 摄像头、手机远程摄像头或 LED 矩阵。
4. 在 Arduino App Lab 中运行应用。

部分应用使用 Router Bridge 让 Python 和 Arduino sketch 通信：

- Python 侧负责读取文件、获取网络数据或运行 AI / Brick 逻辑
- Arduino sketch 侧负责控制 MCU 上的硬件能力
- 两端通过 `Bridge.call(...)` 和 `Bridge.provide(...)` 交换数据

## 开发说明

- 不要提交 `.cache/`、虚拟环境、编译产物和本地编辑器配置。
- 每个应用的入口配置是 `app.yaml`。
- 修改单个应用时，优先更新该应用目录下的 `README.md`。
- 新增应用时建议保持 `python/`、`sketch/`、`assets/` 的目录命名一致。

## Git 说明

当前运行环境中普通 `.git` 目录不可写，本仓库实际使用 `.gitrepo` 作为 Git 元数据目录。因此在这个环境里执行 Git 命令时需要使用：

```bash
git --git-dir=.gitrepo --work-tree=. status
```

例如提交和推送：

```bash
git --git-dir=.gitrepo --work-tree=. add README.md .gitignore
git --git-dir=.gitrepo --work-tree=. commit -m "docs: update repository docs"
git --git-dir=.gitrepo --work-tree=. push
```
