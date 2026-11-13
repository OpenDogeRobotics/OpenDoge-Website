import { l, type L } from "@/lib/i18n";

export type Repo = {
  name: string;
  tagline: L;
  desc: L;
  lang: string;
  langColor: string;
  license?: string;
  tags: string[];
  core?: boolean;
  /** Small key facts rendered as a mini grid on core cards. */
  facts?: { k: L; v: string }[];
};

export const CORE_REPOS: Repo[] = [
  {
    name: "OpenDoge_origin",
    tagline: l("主仓库 · 文档与项目总览", "Main repo · docs & overview"),
    desc: l(
      "OpenDoge 的入口仓库：项目总览、模块说明、技术栈、快速开始与开发路线图，中英双语 README。",
      "The entry point: project overview, module docs, tech stack, quick start and roadmap, with bilingual README.",
    ),
    lang: "Markdown",
    langColor: "#e5e7eb",
    tags: ["docs", "overview", "roadmap"],
    core: true,
  },
  {
    name: "OpenDoge_hardware",
    tagline: l("机械结构设计 & 器件规格书", "Mechanical design & datasheets"),
    desc: l(
      "405 个 SolidWorks 零件、整机与子装配 STEP 文件（V1.0），V2.0 迭代开发中；附 DM-IMU、尺物驱动板与 EL05 电机资料。",
      "405 SolidWorks parts plus full & sub-assembly STEP files (V1.0), with V2.0 in development; includes DM-IMU, driver board and EL05 datasheets.",
    ),
    lang: "Python",
    langColor: "#3572A5",
    tags: ["SolidWorks", "STEP", "datasheets"],
    core: true,
    facts: [
      { k: l("零件数", "Parts"), v: "405" },
      { k: l("版本", "Version"), v: "V1.0 → V2.0" },
      { k: l("STEP 装配体", "STEP assembly"), v: "~80 MB" },
    ],
  },
  {
    name: "OpenDoge_description",
    tagline: l("URDF / Xacro 机器人描述包", "URDF / Xacro description package"),
    desc: l(
      "ROS / ROS 2 描述包：完整 URDF、STL 网格、MuJoCo MJCF、关节映射表，以及 RViz 与 Gazebo 启动文件。",
      "ROS / ROS 2 description package: full URDF, STL meshes, MuJoCo MJCF, joint mapping table and RViz / Gazebo launch files.",
    ),
    lang: "CMake",
    langColor: "#DA3434",
    license: "BSD",
    tags: ["URDF", "MJCF", "RViz", "Gazebo"],
    core: true,
    facts: [
      { k: l("STL 网格", "STL meshes"), v: "17" },
      { k: l("驱动关节", "Actuated joints"), v: "12" },
      { k: l("启动文件", "Launch files"), v: "RViz · Gazebo" },
    ],
  },
  {
    name: "OpenDoge_firmware",
    tagline: l("独立 C++ 实机部署 & Python 工具链", "Standalone C++ deployment & Python tools"),
    desc: l(
      "opendoge_deploy 单进程部署程序：CPU ONNX 推理、4 路 SocketCAN、EL05 协议驱动、安全阻尼；附 IMU 桥接、手柄桥接与电机测试工具。",
      "The opendoge_deploy single-process binary: CPU ONNX inference, 4× SocketCAN, EL05 protocol driver, safety damping; plus IMU / joystick bridges and motor test tools.",
    ),
    lang: "C++ / Python",
    langColor: "#f34b7d",
    license: "Apache-2.0",
    tags: ["ONNX Runtime", "SocketCAN", "EL05", "RK3588"],
    core: true,
    facts: [
      { k: l("策略推理", "Policy"), v: "100 Hz" },
      { k: l("运控帧", "Motor loop"), v: "1000 Hz" },
      { k: l("CAN 总线", "CAN buses"), v: "4 ×" },
    ],
  },
  {
    name: "OpenDoge_train",
    tagline: l("Isaac Gym RL 训练 · Sim2Sim · ONNX 导出", "Isaac Gym RL · Sim2Sim · ONNX export"),
    desc: l(
      "衍生自 HIMLoco 的 legged_gym + rsl_rl 训练框架，MuJoCo Sim2Sim 部署脚本，IK 步态工具，以及多个预训练 ONNX 策略。",
      "HIMLoco-derived legged_gym + rsl_rl framework, MuJoCo Sim2Sim deployment scripts, IK gait tools and several pre-trained ONNX policies.",
    ),
    lang: "Python",
    langColor: "#3572A5",
    license: "MIT",
    tags: ["Isaac Gym", "PPO", "MuJoCo", "ONNX"],
    core: true,
    facts: [
      { k: l("并行环境", "Parallel envs"), v: "4096" },
      { k: l("预训练策略", "Pre-trained"), v: "4 ONNX" },
      { k: l("支持机器人", "Robots"), v: "8" },
    ],
  },
];

export const ECOSYSTEM_REPOS: Repo[] = [
  {
    name: "GOUJIAO",
    tagline: l("《精品大狗不可能不叫》教程", "“GOUJIAO” build-a-robot-dog tutorial"),
    desc: l(
      "带你从零开始，制作设计具身机器狗。基于 Fumadocs 的系统化教程站点。",
      "From zero to an embodied robot dog — a systematic tutorial site built on Fumadocs.",
    ),
    lang: "MDX",
    langColor: "#fcb32c",
    tags: ["tutorial", "embodied AI"],
  },
  {
    name: "BEEF-ROS2",
    tagline: l("也许是第二好的中文 ROS 2 教程！", "Maybe the second-best Chinese ROS 2 tutorial!"),
    desc: l(
      "12 章实战型 ROS 2 教程与代码：安装、核心概念、接口、Launch、TF2、DDS、测试调试、rosbag2。",
      "A 12-chapter hands-on ROS 2 course with code: install, core concepts, interfaces, Launch, TF2, DDS, testing, rosbag2.",
    ),
    lang: "Python",
    langColor: "#3572A5",
    license: "MIT",
    tags: ["ROS 2", "tutorial"],
  },
  {
    name: "DM-IMU-ROS2",
    tagline: l("达妙 IMU ROS 2 驱动", "Damiao IMU ROS 2 driver"),
    desc: l(
      "DM-IMU ROS 2 代码，包含传统节点与 ros2_control 两种集成方式。",
      "ROS 2 code for the DM-IMU, with both a classic node and a ros2_control integration.",
    ),
    lang: "C++",
    langColor: "#f34b7d",
    license: "MIT",
    tags: ["IMU", "ros2_control"],
  },
  {
    name: "motor_control",
    tagline: l("关节电机控制", "Joint motor control"),
    desc: l(
      "面向 EL05 / RobStride 系列关节电机的 CAN 控制代码与示例。",
      "CAN control code and examples for EL05 / RobStride-series joint actuators.",
    ),
    lang: "C++",
    langColor: "#f34b7d",
    tags: ["CAN", "EL05"],
  },
  {
    name: "OpenDoge_URDF",
    tagline: l("早期 URDF 模型", "Early URDF model"),
    desc: l("OpenDoge 早期版本的 URDF 描述文件。", "Early-version URDF description files for OpenDoge."),
    lang: "CMake",
    langColor: "#DA3434",
    tags: ["URDF"],
  },
];

export const REPO_TREE = `OpenDoge/
├── OpenDoge_hardware/       # 机械结构设计 & 器件规格书
├── OpenDoge_description/    # URDF/Xacro 机器人描述文件 (ROS/ROS2)
├── OpenDoge_firmware/       # 独立 C++ 实机部署 & Python 工具链
├── OpenDoge_train/          # Isaac Gym RL 训练、MuJoCo Sim2Sim、ONNX 导出
└── OpenDoge_origin/         # 主仓库 — 文档与项目总览`;

export const REPO_TREE_EN = `OpenDoge/
├── OpenDoge_hardware/       # Mechanical design & component datasheets
├── OpenDoge_description/    # URDF/Xacro robot description (ROS/ROS2)
├── OpenDoge_firmware/       # Standalone C++ deployment & Python tooling
├── OpenDoge_train/          # Isaac Gym RL, MuJoCo Sim2Sim, ONNX export
└── OpenDoge_origin/         # Main repository — docs & overview`;
