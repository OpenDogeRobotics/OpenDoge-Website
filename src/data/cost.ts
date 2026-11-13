import { l, type L } from "@/lib/i18n";

export type CostCategoryId =
  | "actuator"
  | "compute"
  | "comms"
  | "sensor"
  | "power"
  | "mechanical"
  | "fastener"
  | "assembly";

export type CostCategory = {
  id: CostCategoryId;
  no: string;
  name: L;
  en: string;
  color: string;
};

export type CostItem = {
  id: string;
  category: CostCategoryId;
  name: L;
  spec: L;
  qty: number;
  unit: L;
  price: number;
  low: number;
  high: number;
  required: boolean;
  defaultOn: boolean;
  /** Quantity is fixed by the design and cannot be edited. */
  lockQty?: boolean;
  /** Priced per set / batch rather than per piece. */
  perSet?: boolean;
};

export type CostPresetId = "lite" | "std" | "full";

export type CostState = {
  qty: Record<string, number>;
  on: Record<string, boolean>;
  edulite: boolean;
};

export const COST_CATEGORIES: CostCategory[] = [
  { id: "actuator", no: "01", name: l("执行器 · 关节电机", "Actuators"), en: "ACTUATORS", color: "#fbbf24" },
  { id: "compute", no: "02", name: l("计算 · 主控", "Compute"), en: "COMPUTE", color: "#38bdf8" },
  { id: "comms", no: "03", name: l("通信 · 总线与手柄", "Comms & HMI"), en: "COMMS / HMI", color: "#34d399" },
  { id: "sensor", no: "04", name: l("传感器", "Sensors"), en: "SENSORS", color: "#a78bfa" },
  { id: "power", no: "05", name: l("电源 · 电池与配电", "Power"), en: "POWER", color: "#fb923c" },
  { id: "mechanical", no: "06", name: l("机械结构件", "Mechanical"), en: "MECHANICAL", color: "#e4e4e7" },
  { id: "fastener", no: "07", name: l("连接件", "Bearings & fasteners"), en: "FASTENERS", color: "#fde047" },
  { id: "assembly", no: "08", name: l("装配与调试", "Harness & tooling"), en: "ASSEMBLY", color: "#94a3b8" },
];

/**
 * 价格来源：OpenDoge_hardware 规格书、GOUJIAO 硬件篇、RobStride 官方指导价。
 * 均为约 2026 年市场预估价（CNY），仅供预算参考。
 */
export const COST_ITEMS: CostItem[] = [
  // ── 01 执行器 ──────────────────────────────────────────────
  {
    id: "motor",
    category: "actuator",
    name: l("关节电机模组 ×12", "Joint motor modules ×12"),
    spec: l("RobStride RS05 / EL05 · CAN 1 Mbps · 准直驱 QDD", "RobStride RS05 / EL05 · CAN 1 Mbps · quasi-direct drive"),
    qty: 12,
    unit: l("个", "pcs"),
    price: 499,
    low: 399,
    high: 539,
    required: true,
    defaultOn: true,
    lockQty: true,
  },
  {
    id: "motor-spare",
    category: "actuator",
    name: l("备用关节电机", "Spare joint motor"),
    spec: l("同型号备件 · 摔机或烧驱动后即时更换", "Same model spare · swap after a crash or burnt driver"),
    qty: 1,
    unit: l("个", "pc"),
    price: 499,
    low: 399,
    high: 539,
    required: false,
    defaultOn: false,
  },

  // ── 02 计算 ────────────────────────────────────────────────
  {
    id: "rk3588",
    category: "compute",
    name: l("RK3588 主控开发板套件", "RK3588 compute board kit"),
    spec: l("8 GB RAM + 散热 + 64 GB 存储 + PD 电源", "8 GB RAM + heatsink + 64 GB storage + PD supply"),
    qty: 1,
    unit: l("套", "kit"),
    price: 680,
    low: 500,
    high: 1500,
    required: true,
    defaultOn: true,
    lockQty: true,
  },

  // ── 03 通信 ────────────────────────────────────────────────
  {
    id: "usb2can",
    category: "comms",
    name: l("USB 转 4 路 CAN 适配器", "USB-to-4×CAN adapter"),
    spec: l("SocketCAN · 1 Mbps · can0–can3 每路一腿", "SocketCAN · 1 Mbps · can0–can3, one leg per bus"),
    qty: 1,
    unit: l("个", "pc"),
    price: 180,
    low: 120,
    high: 400,
    required: true,
    defaultOn: true,
    lockQty: true,
  },
  {
    id: "usbttl",
    category: "comms",
    name: l("USB-TTL 串口模块", "USB-TTL serial module"),
    spec: l("IMU 串口桥接 · 115200 bps", "IMU serial bridge · 115200 bps"),
    qty: 1,
    unit: l("个", "pc"),
    price: 15,
    low: 8,
    high: 25,
    required: true,
    defaultOn: true,
  },
  {
    id: "xbox",
    category: "comms",
    name: l("Xbox 无线手柄", "Xbox wireless controller"),
    spec: l("速度 / 步态指令 · 键盘的实机替代", "Velocity & gait commands · hands-on alternative to keyboard"),
    qty: 1,
    unit: l("个", "pc"),
    price: 300,
    low: 200,
    high: 350,
    required: false,
    defaultOn: true,
  },

  // ── 04 传感器 ──────────────────────────────────────────────
  {
    id: "imu",
    category: "sensor",
    name: l("达妙 DM-IMU-L1 六轴 IMU", "DM-IMU-L1 6-axis IMU"),
    spec: l("±16 g / ±2000 °/s · 500 Hz · 30×30 mm", "±16 g / ±2000 °/s · 500 Hz · 30×30 mm"),
    qty: 1,
    unit: l("个", "pc"),
    price: 200,
    low: 199,
    high: 260,
    required: true,
    defaultOn: true,
    lockQty: true,
  },
  {
    id: "d435i",
    category: "sensor",
    name: l("Intel RealSense D435i 深度相机", "Intel RealSense D435i depth camera"),
    spec: l("RGB-D + 内置 IMU · 地形感知与避障", "RGB-D + built-in IMU · terrain sensing & avoidance"),
    qty: 1,
    unit: l("个", "pc"),
    price: 1800,
    low: 1500,
    high: 2500,
    required: false,
    defaultOn: false,
  },

  // ── 05 电源 ────────────────────────────────────────────────
  {
    id: "battery",
    category: "power",
    name: l("6S 航模锂电池 5200 mAh", "6S LiPo battery 5200 mAh"),
    spec: l("22.2 V · 30C · XT60", "22.2 V · 30C · XT60"),
    qty: 1,
    unit: l("块", "pack"),
    price: 380,
    low: 300,
    high: 500,
    required: true,
    defaultOn: true,
    lockQty: true,
  },
  {
    id: "charger",
    category: "power",
    name: l("6S 平衡充电器", "6S balance charger"),
    spec: l("200 W 级 LiPo 平衡充", "200 W-class LiPo balance charger"),
    qty: 1,
    unit: l("个", "pc"),
    price: 220,
    low: 150,
    high: 350,
    required: true,
    defaultOn: true,
  },
  {
    id: "dcdc",
    category: "power",
    name: l("DC-DC 降压模块", "DC-DC buck module"),
    spec: l("24 V → 12 V / 5 V 双路", "24 V → 12 V / 5 V dual rail"),
    qty: 1,
    unit: l("个", "pc"),
    price: 45,
    low: 30,
    high: 80,
    required: true,
    defaultOn: true,
  },
  {
    id: "pdb",
    category: "power",
    name: l("配电与安全件", "Power distribution & safety"),
    spec: l("总开关 / 保险丝 / 急停 / 分电板", "Main switch · fuse · E-stop · distribution board"),
    qty: 1,
    unit: l("套", "set"),
    price: 60,
    low: 40,
    high: 100,
    required: true,
    defaultOn: true,
  },
  {
    id: "wires",
    category: "power",
    name: l("线材与接插件包", "Wire & connector kit"),
    spec: l("XT60 / GH1.25 / 硅胶线 / CAN 双绞线", "XT60 · GH1.25 · silicone wire · CAN twisted pair"),
    qty: 1,
    unit: l("批", "batch"),
    price: 120,
    low: 80,
    high: 200,
    required: true,
    defaultOn: true,
    perSet: true,
  },

  // ── 06 机械结构件 ──────────────────────────────────────────
  {
    id: "cnc",
    category: "mechanical",
    name: l("CNC 6061 铝合金结构件", "CNC 6061 aluminium parts"),
    spec: l("底板 + 髋部承力件 · 阳极氧化", "Base plate & hip load parts · anodized"),
    qty: 1,
    unit: l("套", "set"),
    price: 450,
    low: 300,
    high: 800,
    required: true,
    defaultOn: true,
    perSet: true,
  },
  {
    id: "petg",
    category: "mechanical",
    name: l("PETG 打印耗材", "PETG filament"),
    spec: l("机身 / 侧板 / 腿部结构件 · ≈2 kg · 30–40% 填充", "Body, side plates & legs · ≈2 kg · 30–40% infill"),
    qty: 2,
    unit: l("kg", "kg"),
    price: 70,
    low: 60,
    high: 90,
    required: true,
    defaultOn: true,
  },
  {
    id: "pa12",
    category: "mechanical",
    name: l("尼龙 PA12 打印耗材", "Nylon PA12 filament"),
    spec: l("髋部高负载关节件 · ≈0.5 kg", "High-load hip parts · ≈0.5 kg"),
    qty: 0.5,
    unit: l("kg", "kg"),
    price: 260,
    low: 200,
    high: 350,
    required: true,
    defaultOn: true,
  },
  {
    id: "tpu",
    category: "mechanical",
    name: l("TPU 95A 打印耗材（足端）", "TPU 95A filament (feet)"),
    spec: l("足端缓冲 · 增加抓地力 · ≈0.5 kg", "Foot pads · extra grip · ≈0.5 kg"),
    qty: 0.5,
    unit: l("kg", "kg"),
    price: 130,
    low: 90,
    high: 160,
    required: true,
    defaultOn: true,
  },
  {
    id: "carbon",
    category: "mechanical",
    name: l("碳纤维杆 / 管", "Carbon-fibre tubes"),
    spec: l("腿部连杆 · 外购裁切", "Leg links · bought cut to size"),
    qty: 1,
    unit: l("套", "set"),
    price: 80,
    low: 50,
    high: 150,
    required: true,
    defaultOn: true,
    perSet: true,
  },
  {
    id: "print-service",
    category: "mechanical",
    name: l("3D 打印代工服务", "3D printing service"),
    spec: l("无打印机时 · 全套结构件代打", "Full structural set printed when you have no printer"),
    qty: 1,
    unit: l("次", "run"),
    price: 500,
    low: 400,
    high: 800,
    required: false,
    defaultOn: false,
  },

  // ── 07 连接件 ──────────────────────────────────────────────
  {
    id: "brg6804",
    category: "fastener",
    name: l("6804 深沟球轴承（髋关节）", "6804 ball bearings (hip)"),
    spec: l("内径 20 mm · 每腿 ×2", "20 mm ID · 2 per leg"),
    qty: 8,
    unit: l("个", "pcs"),
    price: 8,
    low: 5,
    high: 15,
    required: true,
    defaultOn: true,
  },
  {
    id: "brg6803",
    category: "fastener",
    name: l("6803 深沟球轴承（膝关节）", "6803 ball bearings (knee)"),
    spec: l("内径 17 mm · 每腿 ×2", "17 mm ID · 2 per leg"),
    qty: 8,
    unit: l("个", "pcs"),
    price: 6,
    low: 4,
    high: 12,
    required: true,
    defaultOn: true,
  },
  {
    id: "thrust",
    category: "fastener",
    name: l("推力滚子轴承", "Thrust roller bearings"),
    spec: l("轴向承载 · 腿根连接处", "Axial load · at the leg root"),
    qty: 4,
    unit: l("个", "pcs"),
    price: 12,
    low: 8,
    high: 20,
    required: true,
    defaultOn: true,
  },
  {
    id: "adapter",
    category: "fastener",
    name: l("电机输出转接块", "Motor output adapters"),
    spec: l("法兰 / 嵌件 · 承担剪切载荷", "Flange / insert · takes the shear load"),
    qty: 12,
    unit: l("个", "pcs"),
    price: 8,
    low: 5,
    high: 30,
    required: true,
    defaultOn: true,
  },
  {
    id: "screws",
    category: "fastener",
    name: l("M3 / M4 紧固件套装", "M3 / M4 fastener kit"),
    spec: l("螺丝 / 螺母 / 弹垫 / 挡圈 / 键销", "Screws · nuts · washers · circlips · keys"),
    qty: 1,
    unit: l("批", "batch"),
    price: 60,
    low: 40,
    high: 100,
    required: true,
    defaultOn: true,
    perSet: true,
  },
  {
    id: "grease",
    category: "fastener",
    name: l("润滑脂与螺纹胶", "Grease & threadlocker"),
    spec: l("轴承润滑脂 + 中强度螺纹胶", "Bearing grease + medium-strength threadlocker"),
    qty: 1,
    unit: l("套", "set"),
    price: 25,
    low: 20,
    high: 50,
    required: true,
    defaultOn: true,
  },

  // ── 08 装配与调试 ──────────────────────────────────────────
  {
    id: "cable-mgmt",
    category: "assembly",
    name: l("线束管理耗材", "Cable management consumables"),
    spec: l("蛇皮网 / 扎带 / 热缩管 / 走线夹", "Braid · zip ties · heat-shrink · clips"),
    qty: 1,
    unit: l("套", "set"),
    price: 40,
    low: 25,
    high: 60,
    required: true,
    defaultOn: true,
  },
  {
    id: "debug-board",
    category: "assembly",
    name: l("尺物电机调测驱动板", "Motor debug driver board"),
    spec: l("USB 单电机调试 · 先跑通协议再上机", "USB single-motor debug · verify protocol before assembly"),
    qty: 1,
    unit: l("块", "pc"),
    price: 150,
    low: 100,
    high: 200,
    required: false,
    defaultOn: false,
  },
];

export const COST_PRESETS: {
  id: CostPresetId;
  icon: "flask" | "shield" | "waypoints";
  name: L;
  en: string;
  desc: L;
  tags: L[];
}[] = [
  {
    id: "lite",
    icon: "flask",
    name: l("入门验证版", "Lite validation"),
    en: "LITE",
    desc: l("经济款 EL05 · 无相机 / 备件 / 手柄，先让狗站起来", "EL05 motors · no camera, spare or controller — get it standing first"),
    tags: [l("EL05 ¥399×12", "EL05 ¥399×12"), l("键盘控制", "Keyboard"), l("最小感官集", "Minimal sensing")],
  },
  {
    id: "std",
    icon: "shield",
    name: l("标准复现版", "Standard build"),
    en: "STANDARD",
    desc: l("官方推荐 · RS05 + Xbox 手柄，实机稳定行走", "Recommended · RS05 + Xbox controller for stable walking"),
    tags: [l("RS05 ¥499×12", "RS05 ¥499×12"), l("Xbox 手柄", "Xbox controller"), l("6S 动力电池", "6S battery")],
  },
  {
    id: "full",
    icon: "waypoints",
    name: l("全配探索版", "Full exploration"),
    en: "FULL",
    desc: l("深度视觉 + 备用电机 + 打印代工 + 调测板", "Depth vision + spare motor + print service + debug board"),
    tags: [l("D435i 视觉", "D435i vision"), l("备件 ×1", "Spare ×1"), l("JLC3DP 代工", "JLC3DP print")],
  },
];

export const defaultCostState = (): CostState => {
  const qty: Record<string, number> = {};
  const on: Record<string, boolean> = {};
  for (const item of COST_ITEMS) {
    qty[item.id] = item.qty;
    on[item.id] = item.defaultOn;
  }
  return { qty, on, edulite: false };
};

export const applyPreset = (preset: CostPresetId): CostState => {
  const state = defaultCostState();
  const set = (id: string, on: boolean) => (state.on[id] = on);
  state.edulite = preset === "lite";
  set("xbox", preset !== "lite");
  set("d435i", preset === "full");
  set("motor-spare", preset === "full");
  set("debug-board", preset === "full");
  set("print-service", preset === "full");
  return state;
};

export const unitPrice = (item: CostItem, state: CostState) =>
  item.id === "motor" && state.edulite ? 399 : item.price;

export const itemSubtotal = (item: CostItem, state: CostState) =>
  state.on[item.id] ? unitPrice(item, state) * state.qty[item.id] : 0;

export const costTotals = (state: CostState) => {
  let cost = 0;
  let low = 0;
  let high = 0;
  const byCat: Record<string, number> = {};

  for (const item of COST_ITEMS) {
    const subtotal = itemSubtotal(item, state);
    cost += subtotal;
    if (state.on[item.id]) {
      const electric = item.id === "motor" && state.edulite;
      const unitLow = electric ? 399 : Math.min(item.low, unitPrice(item, state));
      const unitHigh = electric ? 399 : Math.max(item.high, unitPrice(item, state));
      low += unitLow * state.qty[item.id];
      high += unitHigh * state.qty[item.id];
    }
    byCat[item.category] = (byCat[item.category] ?? 0) + subtotal;
  }

  return { cost, low, high, byCat };
};

export const countParts = (state: CostState) =>
  COST_ITEMS.reduce(
    (total, item) => total + (state.on[item.id] && !item.perSet ? state.qty[item.id] : 0),
    0,
  );

export const fmtCny = (value: number) => `¥${Math.round(value).toLocaleString("zh-CN")}`;
