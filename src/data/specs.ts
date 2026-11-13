import { l, type L } from "@/lib/i18n";

export type LegId = "FL" | "FR" | "RL" | "RR";

export type Leg = {
  id: LegId;
  name: L;
  can: string;
  motors: [number, number, number];
  color: string;
};

export const LEGS: Leg[] = [
  { id: "FL", name: l("左前腿", "Front-left"), can: "can0", motors: [1, 2, 3], color: "#34d399" },
  { id: "FR", name: l("右前腿", "Front-right"), can: "can1", motors: [4, 5, 6], color: "#22d3ee" },
  { id: "RL", name: l("左后腿", "Rear-left"), can: "can2", motors: [7, 8, 9], color: "#a78bfa" },
  { id: "RR", name: l("右后腿", "Rear-right"), can: "can3", motors: [10, 11, 12], color: "#fbbf24" },
];

export const JOINT_SEGMENTS = ["hip", "thigh", "calf"] as const;

export const JOINT_LABEL: Record<(typeof JOINT_SEGMENTS)[number], L> = {
  hip: l("髋关节", "Hip"),
  thigh: l("大腿", "Thigh"),
  calf: l("小腿", "Calf"),
};

export type PdParam = { key: string; value: string; note: L };

export const PD_PARAMS: PdParam[] = [
  { key: "kp", value: "12.0", note: l("位置增益", "Position gain") },
  { key: "kd", value: "0.5", note: l("速度增益", "Velocity gain") },
  { key: "action_scale", value: "0.30", note: l("动作缩放", "Action scale") },
  { key: "control_decimation", value: "2", note: l("策略 100 Hz", "Policy at 100 Hz") },
  { key: "simulation_dt", value: "0.005", note: l("物理 200 Hz", "Physics at 200 Hz") },
  { key: "init_base_height", value: "0.15 m", note: l("初始机身高度", "Initial base height") },
];

export type ChainNode = { label: L; meta?: string; kind: "software" | "bus" | "hardware" };

export const DEPLOY_CHAIN: ChainNode[] = [
  { label: l("opendoge_deploy 单进程", "opendoge_deploy (single process)"), kind: "software" },
  { label: l("CPU ONNX 策略推理", "CPU ONNX policy inference"), meta: "100 Hz", kind: "software" },
  { label: l("位置目标保持", "Position target hold"), meta: "200 Hz", kind: "software" },
  { label: l("EL05 q / dq / tau / kp / kd 控制", "EL05 q / dq / tau / kp / kd control"), meta: "1000 Hz", kind: "software" },
  { label: l("SocketCAN can0 / can1 / can2 / can3", "SocketCAN can0 / can1 / can2 / can3"), kind: "bus" },
  { label: l("USB 转 4 路 CAN2.0 模块", "USB-to-4×CAN2.0 adapter"), kind: "bus" },
  { label: l("12× EL05 / RobStride 关节电机", "12× EL05 / RobStride joint motors"), kind: "hardware" },
];

export const POLICY_BACKENDS: { name: string; desc: L }[] = [
  { name: "onnx", desc: l("ONNX Runtime CPU 推理", "ONNX Runtime CPU inference") },
  { name: "linear_csv", desc: l("线性 CSV 策略", "Linear CSV policy") },
  { name: "none", desc: l("纯阻尼模式", "Damping-only mode") },
];

export const ONNX_MODELS: { file: string; desc: L; recommended?: boolean }[] = [
  { file: "flat_opendoge_9000_omni.onnx", desc: l("全向策略，9000 轮", "Omnidirectional, 9000 iters"), recommended: true },
  { file: "flat_opendoge_fresh_6000.onnx", desc: l("Fresh 策略，6000 轮", "Fresh policy, 6000 iters") },
  { file: "flat_opendoge_5700.onnx", desc: l("Gen4 风格策略，5700 轮", "Gen4-style, 5700 iters") },
  { file: "flat_opendoge_gen52_4800.onnx", desc: l("Gen52 策略，4800 轮", "Gen52 policy, 4800 iters") },
];
