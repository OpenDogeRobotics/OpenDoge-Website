import { l, type L } from "@/lib/i18n";

export type QuickStep = { title: L; desc?: L; code?: string; lang?: string };
export type QuickTab = { id: string; label: L; intro: L; steps: QuickStep[] };

export const QUICK_TABS: QuickTab[] = [
  {
    id: "hardware",
    label: l("硬件制造", "Hardware"),
    intro: l(
      "使用 OpenDoge_hardware 中的 STEP 文件加工结构件，按子装配层级组装机身。",
      "Fabricate structural parts from the STEP files in OpenDoge_hardware and assemble following the sub-assembly hierarchy.",
    ),
    steps: [
      {
        title: l("获取机械文件", "Get the mechanical files"),
        desc: l(
          "V1.0 目录包含 405 个 .SLDPRT 零件、整机零件级 STEP（~80 MB）与子装配 STEP（~82 MB）。",
          "The V1.0 folder ships 405 .SLDPRT parts, a part-level STEP (~80 MB) and a sub-assembly STEP (~82 MB).",
        ),
        code: `git clone https://github.com/OpenDogeRobotics/OpenDoge_hardware.git
cd OpenDoge_hardware/mechanical/V1.0
ls
# OpenDog/   全零件.STEP   全子装配.STEP`,
        lang: "bash",
      },
      {
        title: l("3D 打印 / CNC 加工", "3D print / CNC machine"),
        desc: l(
          "结构件推荐 PLA / PETG / 尼龙打印，或铝合金 CNC；足端使用橡胶或 TPU。",
          "Print structural parts in PLA / PETG / Nylon or machine in aluminium; use rubber or TPU for foot tips.",
        ),
      },
      {
        title: l("采购电控件", "Source the electronics"),
        desc: l(
          "12× EL05 / RobStride 关节电机、DM-IMU-L1 六轴 IMU、USB 转 4 路 CAN2.0 模块、RK3588 或 x86 主控，规格书见 datasheets/ 目录。",
          "12× EL05 / RobStride joint motors, a DM-IMU-L1 6-axis IMU, a USB-to-4×CAN2.0 adapter and an RK3588 / x86 host — see datasheets/.",
        ),
      },
      {
        title: l("按子装配层级组装", "Assemble by sub-assembly"),
        desc: l(
          "先装 4 条腿模块（hip / thigh / calf），再合装机身、主控与 IMU。",
          "Build the four leg modules (hip / thigh / calf) first, then mate the body, host computer and IMU.",
        ),
      },
    ],
  },
  {
    id: "train",
    label: l("仿真训练", "Training"),
    intro: l(
      "在 Isaac Gym 中用 4096 个并行环境训练 OpenDoge 行走策略。",
      "Train an OpenDoge locomotion policy in Isaac Gym with 4096 parallel environments.",
    ),
    steps: [
      {
        title: l("准备环境", "Set up the environment"),
        desc: l("需要 CUDA 12.1 与 NVIDIA Isaac Gym Preview 4。", "Requires CUDA 12.1 and NVIDIA Isaac Gym Preview 4."),
        code: `conda create -n himloco python=3.8
conda activate himloco
pip install torch==2.3.1 torchvision==0.18.1 \\
  --index-url https://download.pytorch.org/whl/cu121
pip install mujoco==3.2.3
# 从 NVIDIA 官网下载安装 Isaac Gym Preview 4
pip install -e <isaacgym_path>/isaacgym/python
pip install -e .`,
        lang: "bash",
      },
      {
        title: l("启动训练", "Start training"),
        code: `export PYTHONPATH=$PWD
python legged_gym/scripts/train.py --task=opendoge --headless --num_envs=4096`,
        lang: "bash",
      },
      {
        title: l("从 checkpoint 继续", "Resume from a checkpoint"),
        code: `python legged_gym/scripts/train.py --task=opendoge \\
  --resume --load_run <run_name> --checkpoint <N>`,
        lang: "bash",
      },
    ],
  },
  {
    id: "sim2sim",
    label: l("Sim2Sim & ONNX", "Sim2Sim & ONNX"),
    intro: l(
      "回放训练结果并导出 ONNX，然后在 MuJoCo 中用键盘或手柄验证策略。",
      "Play back the trained run to export ONNX, then verify the policy in MuJoCo with a keyboard or gamepad.",
    ),
    steps: [
      {
        title: l("回放与 ONNX 导出", "Playback & ONNX export"),
        desc: l("ONNX 模型会保存到 onnx/ 目录。", "The ONNX model is written to the onnx/ directory."),
        code: `python legged_gym/scripts/play.py --task=opendoge --load_run <run_name>`,
        lang: "bash",
      },
      {
        title: l("MuJoCo Sim2Sim 验证", "MuJoCo Sim2Sim verification"),
        code: `conda activate himloco
# 键盘控制
python deploy/deploy_mujoco/deploy_opendoge.py
# Xbox 手柄控制
python deploy/deploy_mujoco/deploy_opendoge_xbox.py
# 指定 ONNX 模型（推荐全向策略）
python deploy/deploy_mujoco/deploy_opendoge.py \\
  --onnx onnx/flat_opendoge_9000_omni.onnx`,
        lang: "bash",
      },
      {
        title: l("对齐 PD 参数", "Align PD parameters"),
        desc: l(
          "kp = 12.0，kd = 0.5，action_scale = 0.30，control_decimation = 2，simulation_dt = 0.005 —— 训练、Sim2Sim、实机三者保持一致。",
          "kp = 12.0, kd = 0.5, action_scale = 0.30, control_decimation = 2, simulation_dt = 0.005 — identical across training, Sim2Sim and hardware.",
        ),
      },
    ],
  },
  {
    id: "deploy",
    label: l("实机部署", "Deployment"),
    intro: l(
      "构建 opendoge_deploy，先 Dry-run 验证全链路，再加载 ONNX 策略驱动真机。",
      "Build opendoge_deploy, dry-run the full loop first, then load the ONNX policy and drive the real robot.",
    ),
    steps: [
      {
        title: l("安装 ONNX Runtime 并构建", "Install ONNX Runtime & build"),
        code: `cd OpenDoge_firmware
./scripts/setup_onnx.sh
export ONNXRUNTIME_ROOT=$(realpath build/deps/onnxruntime)

colcon build --symlink-install --packages-select opendoge_deploy
source install/setup.bash`,
        lang: "bash",
      },
      {
        title: l("初始化 CAN 总线", "Bring up the CAN buses"),
        desc: l("每条 CAN 总线驱动一条腿：can0 FL · can1 FR · can2 RL · can3 RR。", "One CAN bus per leg: can0 FL · can1 FR · can2 RL · can3 RR."),
        code: `./scripts/setup_can.sh      # 4× SocketCAN
./scripts/setup_vcan.sh     # 无硬件时使用虚拟 CAN`,
        lang: "bash",
      },
      {
        title: l("Dry-run 验证", "Dry-run validation"),
        code: `./scripts/start_robot.sh dry`,
        lang: "bash",
      },
      {
        title: l("加载 ONNX 策略运行", "Run with the ONNX policy"),
        desc: l(
          "start_robot.sh 一键聚合启动 CAN、IMU 桥接、手柄桥接与 deploy 主程序。",
          "start_robot.sh launches CAN, the IMU bridge, the joystick bridge and the deploy binary in one go.",
        ),
        code: `POLICY_PATH=policy/gen52_model4800.onnx ./scripts/start_robot.sh policy`,
        lang: "bash",
      },
    ],
  },
];

export const DEPENDENCIES: { name: string; note: L }[] = [
  { name: "CUDA 12.1", note: l("GPU 训练", "GPU training") },
  { name: "PyTorch 2.3.1", note: l("GPU 版本", "GPU build") },
  { name: "Isaac Gym Preview 4", note: l("并行 RL 仿真", "Parallel RL simulation") },
  { name: "MuJoCo 3.2.3", note: l("Sim2Sim 验证", "Sim2Sim verification") },
  { name: "ONNX Runtime ≥ 1.18", note: l("实机 CPU 推理", "On-robot CPU inference") },
  { name: "ROS 2 Humble + colcon", note: l("仅描述包与工具链（可选）", "Description & tools only (optional)") },
];
