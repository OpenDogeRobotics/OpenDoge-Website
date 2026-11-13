import {
  Box,
  Boxes,
  BrainCircuit,
  Cpu,
  FlaskConical,
  Gauge,
  Layers3,
  Printer,
  Radio,
  ShieldCheck,
  TerminalSquare,
  Timer,
  Waypoints,
  type LucideIcon,
} from "lucide-react";
import { l, type L } from "@/lib/i18n";

export const GITHUB_ORG = "https://github.com/OpenDogeRobotics";
export const REPO = (name: string) => `${GITHUB_ORG}/${name}`;

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export type NavLink = { id: string; label: L };

export const NAV_LINKS: NavLink[] = [
  { id: "pipeline", label: l("系统架构", "Architecture") },
  { id: "features", label: l("核心特性", "Features") },
  { id: "repos", label: l("代码仓库", "Repositories") },
  { id: "specs", label: l("技术规格", "Specs") },
  { id: "quickstart", label: l("快速开始", "Quick Start") },
  { id: "roadmap", label: l("路线图", "Roadmap") },
  { id: "community", label: l("社区", "Community") },
];

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export const HERO = {
  badge: l("开源小型四足机器人 · 全栈开发方案", "Open-source mini quadruped · Full-stack"),
  /**
   * Headline lines. Groups are "|"-separated; each group is rendered as an
   * unbreakable unit so line breaks only ever happen between groups
   * (prevents orphaned CJK characters / hyphen splits at any viewport width).
   */
  titleLine1: l("低成本、|可复现的", "Low-cost,|open,"),
  titleLine2: l("端到端开源|四足机器人", "end-to-end|quadruped"),
  titleHighlight: l("端到端", "end-to-end"),
  desc: l(
    "OpenDoge 覆盖从机械结构设计、URDF 仿真描述、嵌入式固件控制，到强化学习训练与实机部署的完整链路 —— 让每个人都能从零开始，打造并驱动属于自己的机器狗。",
    "OpenDoge covers the entire pipeline — mechanical design, URDF simulation description, embedded firmware control, reinforcement-learning training and real-robot deployment — so anyone can build and drive their own robot dog from scratch.",
  ),
  ctaPrimary: l("GitHub 仓库", "View on GitHub"),
  ctaSecondary: l("快速开始", "Quick Start"),
  imageCaption: l("OpenDoge NO.01 · 机械结构 V1.0 渲染图", "OpenDoge NO.01 · Mechanical V1.0 render"),
  chips: ["SolidWorks", "URDF / MJCF", "Isaac Gym", "MuJoCo", "HIMLoco PPO", "ONNX Runtime", "SocketCAN", "ROS 2 Humble"],
  floating: [
    { k: l("策略推理", "Policy"), v: "100 Hz" },
    { k: l("电机控制", "Motor loop"), v: "1000 Hz" },
    { k: l("关节电机", "Actuators"), v: "12 × EL05" },
  ],
};

export type Stat = { value: string; label: L; hint: L };

export const STATS: Stat[] = [
  { value: "12", label: l("自由度", "Degrees of freedom"), hint: l("4 腿 × 3 关节", "4 legs × 3 joints") },
  { value: "405", label: l("SolidWorks 零件", "SolidWorks parts"), hint: l("STEP 全开放", "Full STEP export") },
  { value: "4096", label: l("并行训练环境", "Parallel envs"), hint: l("Isaac Gym", "Isaac Gym") },
  { value: "1000 Hz", label: l("电机控制频率", "Motor control rate"), hint: l("EL05 运控帧", "EL05 MIT frames") },
  { value: "0", label: l("运行时 ROS 依赖", "ROS deps at runtime"), hint: l("单进程 C++", "Single C++ binary") },
];

/* ------------------------------------------------------------------ */
/* Pipeline / architecture                                             */
/* ------------------------------------------------------------------ */

export type Stage = {
  id: string;
  index: string;
  icon: LucideIcon;
  title: L;
  short: L;
  desc: L;
  bullets: L[];
  tools: string[];
  repo: string;
};

export const STAGES: Stage[] = [
  {
    id: "mech",
    index: "01",
    icon: Box,
    title: l("机械设计", "Mechanical Design"),
    short: l("SolidWorks · STEP", "SolidWorks · STEP"),
    desc: l(
      "405 个 SolidWorks 零件构成的 12 自由度四足本体，提供零件级与子装配级 STEP 文件，兼容 Fusion 360 / FreeCAD，结构件可直接 3D 打印或 CNC 加工。",
      "A 12-DOF quadruped body made of 405 SolidWorks parts, shipped as part-level and sub-assembly STEP files compatible with Fusion 360 / FreeCAD. Structural parts can be 3D-printed or CNC-machined directly.",
    ),
    bullets: [
      l("4 条腿 × 3 个驱动关节（hip / thigh / calf）", "4 legs × 3 actuated joints (hip / thigh / calf)"),
      l("PLA / PETG / 尼龙 3D 打印，或铝合金 CNC", "PLA / PETG / Nylon printing, or aluminium CNC"),
      l("足端推荐橡胶或 TPU 以提升抓地力", "Rubber or TPU foot tips for traction"),
      l("附带 DM-IMU、驱动板、EL05 电机规格书", "Datasheets for DM-IMU, driver board and EL05 motors"),
    ],
    tools: ["SolidWorks", "STEP", "3D Printing", "CNC"],
    repo: "OpenDoge_hardware",
  },
  {
    id: "desc",
    index: "02",
    icon: Layers3,
    title: l("机器人描述", "Robot Description"),
    short: l("URDF · MJCF · STL", "URDF · MJCF · STL"),
    desc: l(
      "完整的 URDF 运动学 / 动力学模型与 17 个 STL 连杆网格，附带 MuJoCo MJCF 模型、关节映射表，以及 RViz 与 Gazebo 的一键启动文件。",
      "A complete URDF kinematic/dynamic model with 17 STL link meshes, a MuJoCo MJCF model, a joint-mapping table, and one-shot launch files for RViz and Gazebo.",
    ),
    bullets: [
      l("base_link + 4 条腿 × 4 段连杆网格", "base_link + 4 legs × 4 link meshes"),
      l("display.launch（RViz）与 gazebo.launch", "display.launch (RViz) and gazebo.launch"),
      l("Opendoge.xml + scene.xml MuJoCo 场景", "Opendoge.xml + scene.xml MuJoCo scene"),
      l("BSD 许可证，ROS / ROS 2 通用", "BSD licensed, works with ROS / ROS 2"),
    ],
    tools: ["URDF", "Xacro", "MJCF", "RViz", "Gazebo"],
    repo: "OpenDoge_description",
  },
  {
    id: "train",
    index: "03",
    icon: BrainCircuit,
    title: l("强化学习训练", "RL Training"),
    short: l("Isaac Gym · HIMLoco", "Isaac Gym · HIMLoco"),
    desc: l(
      "基于 HIMLoco 的 Isaac Gym 训练框架，4096 个并行环境中通过 PPO 学习行走；LSTM Actor-Critic 赋予步态记忆，课程学习与域随机化保证策略鲁棒可迁移。",
      "A HIMLoco-derived Isaac Gym framework that learns locomotion with PPO across 4096 parallel environments. An LSTM Actor-Critic provides gait memory, while curriculum learning and domain randomization keep policies robust and transferable.",
    ),
    bullets: [
      l("从站立到动态行走的渐进式课程学习", "Curriculum from standing to dynamic locomotion"),
      l("摩擦、电机力矩、负载、外力扰动、PD 随机化", "Friction, motor strength, payload, pushes, PD randomization"),
      l("多机器人支持：A1 / Go1 / Go2 / G1 / H1 / ZSL1", "Multi-robot: A1 / Go1 / Go2 / G1 / H1 / ZSL1"),
      l("TensorBoard 全量奖励分项日志", "Full TensorBoard reward logging"),
    ],
    tools: ["Isaac Gym", "PyTorch 2.3.1", "CUDA 12.1", "HIMLoco PPO", "LSTM"],
    repo: "OpenDoge_train",
  },
  {
    id: "sim2sim",
    index: "04",
    icon: FlaskConical,
    title: l("Sim2Sim 验证", "Sim2Sim Verification"),
    short: l("MuJoCo · ONNX 导出", "MuJoCo · ONNX export"),
    desc: l(
      "训练好的策略先导出为 ONNX，再在 MuJoCo 中用键盘或 Xbox 手柄实际操控验证 —— 这是实机部署前的安全关卡，PD 增益与观测缩放与实机严格对齐。",
      "Trained policies are exported to ONNX and driven with a keyboard or Xbox gamepad inside MuJoCo — a safety gate before real-robot deployment, with PD gains and observation scaling strictly aligned to the hardware.",
    ),
    bullets: [
      l("play.py 一键回放并导出 ONNX", "One-shot playback & ONNX export via play.py"),
      l("deploy_opendoge.py 键盘 / deploy_opendoge_xbox.py 手柄", "Keyboard (deploy_opendoge.py) / gamepad (…_xbox.py)"),
      l("附带 4 个可直接部署的预训练 ONNX 策略", "4 ready-to-deploy pre-trained ONNX policies included"),
      l("mujoco_ik 工具：IK 步态控制器与参考运动录制", "mujoco_ik: IK gait controller & reference-motion recorder"),
    ],
    tools: ["MuJoCo 3.2.3", "ONNX", "Xbox Gamepad", "IK"],
    repo: "OpenDoge_train",
  },
  {
    id: "deploy",
    index: "05",
    icon: Cpu,
    title: l("实机部署", "Real-Robot Deployment"),
    short: l("C++ · ONNX Runtime · CAN", "C++ · ONNX Runtime · CAN"),
    desc: l(
      "单进程 C++ 二进制 opendoge_deploy 直接管理 CPU ONNX 推理、4 路 SocketCAN、EL05 运控帧与安全阻尼，运行时零 ROS 依赖，可跑在 RK3588 或 x86 上。",
      "A single-process C++ binary, opendoge_deploy, manages CPU ONNX inference, 4× SocketCAN, EL05 motion-control frames and safety damping — no ROS at runtime, running on RK3588 or x86.",
    ),
    bullets: [
      l("100 Hz 策略 → 200 Hz 位置保持 → 1000 Hz 电机控制", "100 Hz policy → 200 Hz hold → 1000 Hz motor loop"),
      l("故障 / 过温 / 超时 / CAN 异常 / 急停自动阻尼", "Auto-damping on fault / over-temp / timeout / CAN error / E-Stop"),
      l("SCHED_FIFO + mlockall 低延迟实时控制", "SCHED_FIFO + mlockall low-latency realtime"),
      l("vCAN Dry-run 模式，无硬件全链路验证", "vCAN dry-run mode: validate the full loop without hardware"),
    ],
    tools: ["C++17", "ONNX Runtime", "SocketCAN", "EL05 / RobStride", "RK3588"],
    repo: "OpenDoge_firmware",
  },
];

/* ------------------------------------------------------------------ */
/* Features                                                            */
/* ------------------------------------------------------------------ */

export type Feature = { icon: LucideIcon; title: L; desc: L };

export const FEATURES: Feature[] = [
  {
    icon: ShieldCheck,
    title: l("安全优先设计", "Safety-first design"),
    desc: l(
      "电机故障、过温、反馈超时、CAN 异常或急停触发时，控制器自动切入阻尼模式，保护机器与人。",
      "On motor fault, over-temperature, feedback timeout, CAN error or E-Stop, the controller drops into damping mode automatically.",
    ),
  },
  {
    icon: TerminalSquare,
    title: l("运行时零 ROS 依赖", "Zero ROS at runtime"),
    desc: l(
      "实机部署是一个独立的 C++ 进程：推理、CAN 通信、状态机全部内聚，RK3588 与 x86 均可运行。",
      "Deployment is one standalone C++ process — inference, CAN I/O and the state machine all in-process, on RK3588 or x86.",
    ),
  },
  {
    icon: Waypoints,
    title: l("课程学习 + 域随机化", "Curriculum + domain randomization"),
    desc: l(
      "从站立逐步过渡到动态行走；摩擦、电机力矩、负载、外力扰动与 PD 参数全部随机化，弥合 Sim2Real 差距。",
      "Progress from standing to dynamic gaits while randomizing friction, motor strength, payload, pushes and PD gains to close the sim-to-real gap.",
    ),
  },
  {
    icon: BrainCircuit,
    title: l("LSTM 记忆策略", "LSTM memory policy"),
    desc: l(
      "HIMLoco 风格的 LSTM Actor-Critic 与 HIMEstimator，让策略具备依赖历史的步态记忆能力。",
      "A HIMLoco-style LSTM Actor-Critic with HIMEstimator gives the policy history-dependent gait memory.",
    ),
  },
  {
    icon: FlaskConical,
    title: l("Sim2Sim 安全关卡", "Sim2Sim safety gate"),
    desc: l(
      "上实机之前，先在 MuJoCo 中用同一份 ONNX 与同一组 PD 参数跑通 —— 训练与实机参数逐项对齐。",
      "Before touching hardware, run the exact ONNX file and PD gains in MuJoCo — training and deployment parameters aligned one by one.",
    ),
  },
  {
    icon: Printer,
    title: l("为 3D 打印而生", "Built for 3D printing"),
    desc: l(
      "结构件适配 PLA / PETG / 尼龙打印与铝合金 CNC，全套 STEP 开放，任何人都能低成本复现。",
      "Parts print in PLA / PETG / Nylon or machine in aluminium; the complete STEP set is open so anyone can reproduce it cheaply.",
    ),
  },
  {
    icon: Gauge,
    title: l("Dry-run 全链路验证", "Dry-run the whole loop"),
    desc: l(
      "vCAN 虚拟总线或无 CAN 模式下完整跑通控制循环，桌面上即可排查逻辑与时序问题。",
      "Run the complete control loop on a virtual CAN bus or with no CAN at all — debug logic and timing from your desk.",
    ),
  },
  {
    icon: Timer,
    title: l("实时性支持", "Realtime ready"),
    desc: l(
      "可选 SCHED_FIFO 实时调度与 mlockall 内存锁定，保证 1000 Hz 运控帧的低延迟与低抖动。",
      "Optional SCHED_FIFO scheduling and mlockall memory locking keep the 1000 Hz motor loop low-latency and low-jitter.",
    ),
  },
];

/* ------------------------------------------------------------------ */
/* Tech stack                                                          */
/* ------------------------------------------------------------------ */

export type TechRow = { layer: L; tech: string; purpose: L; icon: LucideIcon };

export const TECH_STACK: TechRow[] = [
  { icon: Box, layer: l("机械设计", "Mechanical"), tech: "SolidWorks", purpose: l("零件设计，装配体导出 STEP", "Part design, STEP assembly export") },
  { icon: Layers3, layer: l("仿真模型", "Sim model"), tech: "URDF / Xacro / MJCF", purpose: l("运动学与动力学描述", "Kinematic & dynamic description") },
  { icon: Boxes, layer: l("物理仿真", "Physics"), tech: "Isaac Gym · MuJoCo · Gazebo", purpose: l("RL 训练 / Sim2Sim / ROS 仿真", "RL training / Sim2Sim / ROS sim") },
  { icon: Radio, layer: l("机器人中间件", "Middleware"), tech: "ROS 2 Humble", purpose: l("可选，仅描述包使用", "Optional — description package only") },
  { icon: Cpu, layer: l("硬件控制", "Hardware control"), tech: "SocketCAN + EL05", purpose: l("CAN 总线实时电机控制", "Realtime motor control over CAN") },
  { icon: Gauge, layer: l("传感器", "Sensors"), tech: "DM-IMU-L1", purpose: l("六轴姿态传感器", "6-axis attitude sensor") },
  { icon: BrainCircuit, layer: l("深度学习框架", "DL framework"), tech: "PyTorch 2.3.1 + CUDA 12.1", purpose: l("RL 模型训练", "RL model training") },
  { icon: Waypoints, layer: l("RL 算法", "RL algorithm"), tech: "HIMLoco (PPO)", purpose: l("LSTM Actor-Critic 架构", "LSTM Actor-Critic architecture") },
  { icon: FlaskConical, layer: l("模型导出", "Model export"), tech: "ONNX Runtime 1.18+", purpose: l("PyTorch → ONNX，CPU 推理", "PyTorch → ONNX, CPU inference") },
  { icon: Timer, layer: l("训练监控", "Monitoring"), tech: "TensorBoard", purpose: l("训练指标可视化", "Training metrics visualisation") },
  { icon: TerminalSquare, layer: l("实机部署", "Deployment"), tech: "Standalone C++", purpose: l("RK3588 / x86 实时控制循环", "Realtime loop on RK3588 / x86") },
  { icon: ShieldCheck, layer: l("编程语言", "Languages"), tech: "Python · C++", purpose: l("训练 / 仿真 用 Python，部署 用 C++", "Python for train/sim, C++ for deploy") },
];

/* ------------------------------------------------------------------ */
/* Roadmap                                                             */
/* ------------------------------------------------------------------ */

export type RoadmapStatus = "done" | "progress" | "planned";
export type RoadmapItem = { status: RoadmapStatus; title: L; desc: L };

export const ROADMAP: RoadmapItem[] = [
  { status: "done", title: l("硬件", "Hardware"), desc: l("405 零件机械结构设计，12-DOF 四足构型，适配 3D 打印", "405-part mechanical design, 12-DOF quadruped, 3D-printable") },
  { status: "done", title: l("URDF 模型", "URDF model"), desc: l("完整运动学 / 动力学模型，STL 网格，RViz & Gazebo 支持", "Full kinematic/dynamic model, STL meshes, RViz & Gazebo") },
  { status: "done", title: l("固件", "Firmware"), desc: l("独立 C++ 部署程序，ONNX 推理，SocketCAN，安全阻尼", "Standalone C++ deployment, ONNX inference, SocketCAN, safety damping") },
  { status: "done", title: l("训练管线", "Training pipeline"), desc: l("Isaac Gym PPO 训练，课程学习，域随机化", "Isaac Gym PPO with curriculum learning & domain randomization") },
  { status: "done", title: l("Sim2Sim", "Sim2Sim"), desc: l("MuJoCo 策略验证，键盘 / 手柄遥控（已整合至 train）", "MuJoCo policy verification with keyboard/gamepad (merged into train)") },
  { status: "progress", title: l("OpenDoge 专属训练配置", "OpenDoge-specific training config"), desc: l("针对实际硬件调优的专用训练任务", "Dedicated task tuned for the actual hardware") },
  { status: "progress", title: l("实机行走", "Real-machine walking"), desc: l("物理机器人首次稳定行走", "First stable locomotion on the physical robot") },
  { status: "planned", title: l("步态库", "Gait library"), desc: l("trot / walk / bound / pace 多步态及切换", "trot / walk / bound / pace gaits with switching") },
  { status: "planned", title: l("地形适应", "Terrain adaptation"), desc: l("楼梯、斜坡、不平整地面", "Stairs, slopes, uneven ground") },
  { status: "planned", title: l("视觉集成", "Vision integration"), desc: l("深度相机 + 高程图步态策略", "Depth camera + elevation-map locomotion") },
  { status: "planned", title: l("社区发布 v1.0", "Community release v1.0"), desc: l("完整 BOM、组装教程、预训练模型", "Full BOM, build guide, pre-trained models") },
];

export const ROADMAP_STATUS_LABEL: Record<RoadmapStatus, L> = {
  done: l("已完成", "Done"),
  progress: l("进行中", "In progress"),
  planned: l("规划中", "Planned"),
};

/* ------------------------------------------------------------------ */
/* Acknowledgments                                                     */
/* ------------------------------------------------------------------ */

export type Ack = { name: string; desc: L; href?: string };

export const ACKS: Ack[] = [
  { name: "HIMLoco", desc: l("仿真训练框架基础", "Training framework foundation"), href: "https://github.com/InternRobotics/HIMLoco" },
  { name: "galileo-isaacgym", desc: l("训练框架参考", "Training framework reference"), href: "https://github.com/Hahalim2022y/galileo_isaacgym" },
  { name: "quadruped_rl", desc: l("四足 RL 参考实现", "Quadruped RL reference"), href: "https://github.com/Benxiaogu/quadruped_rl" },
  { name: "ROS 2 · Isaac Gym · MuJoCo", desc: l("开源社区", "Open-source communities") },
];
