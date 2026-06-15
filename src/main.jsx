import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Alert,
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Card,
  Col,
  ConfigProvider,
  Descriptions,
  Drawer,
  Dropdown,
  Empty,
  Flex,
  Form,
  Input,
  InputNumber,
  Layout,
  Menu,
  Modal,
  Pagination,
  Row,
  Select,
  Space,
  Statistic,
  Switch,
  Table,
  Tabs,
  Tag,
  Timeline,
  Progress,
  Tree,
  Typography,
  Upload,
  message,
  theme
} from "antd";
import {
  AuditOutlined,
  BarChartOutlined,
  BellOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  ClusterOutlined,
  DatabaseOutlined,
  DiffOutlined,
  FileDoneOutlined,
  FileTextOutlined,
  HomeOutlined,
  MedicineBoxOutlined,
  PlusOutlined,
  SafetyCertificateOutlined,
  SearchOutlined,
  SettingOutlined,
  ShareAltOutlined,
  TeamOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { functionMenu } from "./menuData";
import "./styles.css";

const { Header, Sider, Content } = Layout;
const { Text, Title } = Typography;

const roles = {
  province: {
    name: "张建国",
    label: "省级管理员",
    province: "河南省",
    scope: "河南省全省数据",
    approvalEnabled: false,
    approvalModules: [],
    modules: ["dashboard", "cards", "followup", "duplicate", "base", "analytics", "exchange", "annual", "regionOrg", "consult", "quality", "dict", "audit", "system", "sharing"]
  },
  city: {
    name: "李文华",
    label: "地市登记员",
    province: "河南省",
    scope: "郑州市本级及下辖区县",
    approvalEnabled: false,
    approvalModules: [],
    modules: ["dashboard", "cards", "followup", "duplicate", "base", "analytics", "exchange", "regionOrg", "consult", "quality", "dict", "audit", "system"]
  },
  county: {
    name: "周敏",
    label: "县区审核员",
    province: "河南省",
    scope: "金水区辖区数据",
    approvalEnabled: false,
    approvalModules: [],
    modules: ["dashboard", "cards", "followup", "duplicate", "base", "analytics", "regionOrg", "consult", "quality", "audit"]
  },
  hospital: {
    name: "王医生",
    label: "医疗机构填报员",
    province: "河南省",
    scope: "河南省人民医院本机构数据",
    approvalEnabled: false,
    approvalModules: [],
    modules: ["dashboard", "cards", "followup", "exchange", "consult"]
  },
  jiangxi: {
    name: "刘主任",
    label: "江西省管理员",
    province: "江西省",
    scope: "江西省全省数据，审批流程已启用",
    approvalEnabled: true,
    approvalModules: ["cards", "exchange", "sharing", "annual", "risk"],
    modules: ["dashboard", "cards", "followup", "duplicate", "base", "analytics", "exchange", "annual", "regionOrg", "consult", "quality", "dict", "approval", "sharing", "audit", "system"]
  },
  share: {
    name: "陈主任",
    label: "数据共享审批员",
    province: "江西省",
    scope: "省级共享申请",
    approvalEnabled: true,
    approvalModules: ["sharing"],
    modules: ["dashboard", "consult", "approval", "audit", "sharing"]
  }
};

const moduleIcons = {
  dashboard: <HomeOutlined />,
  consult: <FileDoneOutlined />,
  cards: <FileTextOutlined />,
  exchange: <DatabaseOutlined />,
  quality: <SettingOutlined />,
  followup: <CalendarOutlined />,
  duplicate: <DiffOutlined />,
  analytics: <BarChartOutlined />,
  annual: <FileDoneOutlined />,
  base: <ClusterOutlined />,
  regionOrg: <ClusterOutlined />,
  dict: <DatabaseOutlined />,
  sharing: <ShareAltOutlined />,
  approval: <CheckCircleOutlined />,
  system: <SafetyCertificateOutlined />,
  audit: <AuditOutlined />
};

const records = [
  {
    key: "1",
    no: "HN-2026-000183",
    name: "张秀兰",
    idCard: "41010519630215482X",
    sex: "女",
    age: 63,
    region: "郑州市金水区",
    org: "河南省人民医院",
    diagnosis: "C50.9 乳腺恶性肿瘤",
    reportType: "原始卡",
    reportDate: "2026-06-05",
    diagnosisDate: "2026-06-01",
    status: "待县区审核",
    quality: "警告"
  },
  {
    key: "2",
    no: "HN-2026-000184",
    name: "王建国",
    idCard: "410305195504201238",
    sex: "男",
    age: 71,
    region: "洛阳市涧西区",
    org: "洛阳市中心医院",
    diagnosis: "C34.1 上叶肺癌",
    reportType: "原始卡",
    reportDate: "2026-06-04",
    diagnosisDate: "2026-05-28",
    status: "正式",
    quality: "通过"
  },
  {
    key: "3",
    no: "JX-2026-000041",
    name: "刘梅",
    idCard: "360102197402118224",
    sex: "女",
    age: 52,
    region: "南昌市东湖区",
    org: "江西省肿瘤医院",
    diagnosis: "C18.7 乙状结肠癌",
    reportType: "补报卡",
    reportDate: "2026-06-03",
    diagnosisDate: "2026-05-20",
    status: "退回修正",
    quality: "错误"
  },
  {
    key: "4",
    no: "HN-2026-000185",
    name: "赵海",
    idCard: "411002198103094210",
    sex: "男",
    age: 45,
    region: "许昌市魏都区",
    org: "许昌市人民医院",
    diagnosis: "C22.0 肝细胞癌",
    reportType: "原始卡",
    reportDate: "2026-06-02",
    diagnosisDate: "2026-05-29",
    status: "待省级终审",
    quality: "通过"
  },
  {
    key: "5",
    no: "HN-2025-008432",
    name: "陈国强",
    idCard: "410103195802073016",
    sex: "男",
    age: 68,
    region: "郑州市二七区",
    org: "郑大一附院",
    diagnosis: "C16.9 胃恶性肿瘤",
    reportType: "合并卡",
    reportDate: "2025-12-21",
    diagnosisDate: "2025-12-15",
    status: "死亡待更新",
    quality: "警告"
  }
];

const exchangeRows = [
  { key: "1", batch: "HIS-20260605-03", type: "HIS 上传管理", source: "河南省人民医院", total: 128, error: 17, status: "校验失败" },
  { key: "2", batch: "CAUS-20260605-01", type: "死因上传管理", source: "江西省全民健康信息平台", total: 42, error: 0, status: "已入库" },
  { key: "3", batch: "XIE-20260605-02", type: "信息协查管理", source: "郑州市疾控中心", total: 19, error: 2, status: "待逐条处理" }
];

const interfaceTemplateRows = [
  { key: "1", name: "肿瘤登记批量上报模板", formats: "xls / xlsx / csv", importType: "HIS", fields: 86, updateDate: "2026-06-01", status: "启用" },
  { key: "2", name: "肿瘤随访模板", formats: "xls / xlsx / csv", importType: "HIS", fields: 24, updateDate: "2026-05-28", status: "启用" },
  { key: "3", name: "死因登记上传模板", formats: "xls / xlsx / csv", importType: "CAUS", fields: 31, updateDate: "2026-05-26", status: "启用" },
  { key: "4", name: "信息协查登记模板", formats: "xls / xlsx / csv", importType: "XIE", fields: 52, updateDate: "2026-05-20", status: "启用" }
];

const dataInterfaceRows = [
  { key: "1", batch: "HIS-20260610-001", fileName: "河南省人民医院_肿瘤登记批量上报.xlsx", type: "HIS-肿瘤登记", region: "郑州市金水区", source: "河南省人民医院", uploadDate: "2026-06-10 09:12", total: 128, pass: 111, error: 17, duplicate: 6, status: "校验失败", updateStatus: "未入库", operator: "王医生", issue: "身份证号为空 5 条；ICD-O-3 编码不匹配 12 条" },
  { key: "2", batch: "HIS-20260609-004", fileName: "郑州市中心医院_病理接口数据.csv", type: "HIS-肿瘤登记", region: "郑州市二七区", source: "郑州市中心医院", uploadDate: "2026-06-09 16:40", total: 96, pass: 96, error: 0, duplicate: 3, status: "校验通过", updateStatus: "待导入", operator: "李文华", issue: "存在疑似重卡 3 条，导入时进入重卡治理" },
  { key: "3", batch: "CAUS-20260608-002", fileName: "省级死因回流_20260608.xlsx", type: "CAUS-死因登记", region: "河南省", source: "省全民健康信息平台", uploadDate: "2026-06-08 11:20", total: 42, pass: 39, error: 3, duplicate: 0, status: "待逐条处理", updateStatus: "部分入库", operator: "张建国", issue: "死亡日期早于诊断日期 2 条；根本死因编码缺失 1 条" },
  { key: "4", batch: "XIE-20260607-001", fileName: "金水区协查反馈_20260607.xlsx", type: "XIE-信息协查", region: "郑州市金水区", source: "金水区疾控中心", uploadDate: "2026-06-07 14:18", total: 19, pass: 17, error: 2, duplicate: 1, status: "待逐条处理", updateStatus: "临时库", operator: "周敏", issue: "现住地址未精确到社区 2 条，可暂存完善" }
];

const nationalReportRows = [
  { key: "1", batch: "NCCR-2025-HN-001", year: "2025", region: "河南省", packageType: "登记卡+随访+人口", cards: 22186, pass: 22042, error: 144, status: "待上报", feedback: "未回流", updateTime: "2026-06-12 09:30" },
  { key: "2", batch: "NCCR-2025-ZZ-002", year: "2025", region: "郑州市", packageType: "登记卡", cards: 6824, pass: 6811, error: 13, status: "上报失败", feedback: "待重传", updateTime: "2026-06-11 17:20" },
  { key: "3", batch: "NCCR-2024-HN-006", year: "2024", region: "河南省", packageType: "登记卡+随访+人口", cards: 20936, pass: 20936, error: 0, status: "已回流", feedback: "已导入", updateTime: "2026-05-28 16:10" }
];

const externalAccessRows = [
  { key: "1", batch: "EXT-LIS-20260612-01", sourceType: "LIS", source: "江西省肿瘤医院检验系统", region: "南昌市", mapping: "已完成", total: 326, matched: 284, error: 17, status: "待入库审核", tempStatus: "临时库" },
  { key: "2", batch: "EXT-PACS-20260611-02", sourceType: "PACS", source: "南昌市第一医院影像平台", region: "南昌市", mapping: "待补充", total: 142, matched: 96, error: 31, status: "字段待映射", tempStatus: "临时库" },
  { key: "3", batch: "EXT-SCREEN-20260610-01", sourceType: "癌症筛查", source: "江西省癌症筛查平台", region: "江西省", mapping: "已完成", total: 218, matched: 205, error: 4, status: "可入库", tempStatus: "待提交" }
];

const deathCauseInfoRows = [
  { key: "1", no: "HN-2025-008432", causeNo: "COD-202606-0017", name: "陈国强", sex: "男", region: "郑州市二七区", deathDate: "2026-05-30", rootCause: "胃恶性肿瘤", causeCode: "C16.9", deathType: "省级死因回流", updateStatus: "待漏单补录", matchResult: "已匹配发病记录", reportOrg: "郑大一附院" },
  { key: "2", no: "HN-2026-000185", causeNo: "COD-202606-0024", name: "赵海", sex: "男", region: "许昌市魏都区", deathDate: "2026-05-20", rootCause: "肝细胞癌", causeCode: "C22.0", deathType: "县区死因导入", updateStatus: "待核实", matchResult: "死亡日期早于诊断日期", reportOrg: "许昌市人民医院" },
  { key: "3", no: "-", causeNo: "COD-202606-0031", name: "刘建设", sex: "男", region: "郑州市金水区", deathDate: "2026-06-02", rootCause: "肺恶性肿瘤", causeCode: "C34.9", deathType: "国家平台回流", updateStatus: "未匹配", matchResult: "未找到有效报告卡", reportOrg: "-" }
];

const shareRows = [
  { key: "1", no: "REQ-2026-014", org: "省肿瘤研究所", range: "肺癌 2021-2025 脱敏病例", status: "待审批", date: "2026-06-04" },
  { key: "2", no: "REQ-2026-011", org: "江西省疾控中心", range: "结直肠癌地区分布汇总", status: "已交付", date: "2026-05-29" },
  { key: "3", no: "REQ-2026-009", org: "郑州大学课题组", range: "乳腺癌随访结局汇总", status: "退回补充", date: "2026-05-25" }
];

const annualRows = [
  { key: "1", batchNo: "AN-2026-001", year: "2025", region: "河南省", reportCards: 22186, populationReady: "完整", deathReady: "完整", status: "已汇总", issue: "无" },
  { key: "2", batchNo: "AN-2026-002", year: "2025", region: "郑州市", reportCards: 6824, populationReady: "完整", deathReady: "待补全", status: "待补全", issue: "死亡人口分母缺失 1 个年龄组" },
  { key: "3", batchNo: "AN-2025-006", year: "2024", region: "河南省", reportCards: 20936, populationReady: "完整", deathReady: "完整", status: "已归档", issue: "已发布版本 V1.2" }
];

const annualIndicatorRows = [
  { key: "1", indicator: "粗发病率", formula: "发病数 / 人口数 * 100000", value: "136.19/10万", status: "已生成", batch: "AN-2026-001" },
  { key: "2", indicator: "粗死亡率", formula: "死亡数 / 人口数 * 100000", value: "48.76/10万", status: "已生成", batch: "AN-2026-001" },
  { key: "3", indicator: "中标发病率", formula: "年龄别发病率 * 中国标准人口权重", value: "121.84/10万", status: "待生成", batch: "AN-2026-001" },
  { key: "4", indicator: "年度变化趋势", formula: "按年度率值变化计算，口径随年报参数配置", value: "待计算", status: "待生成", batch: "AN-2026-001" }
];

const annualTemplateRows = [
  { key: "1", template: "河南省肿瘤登记年报模板", year: "2025", chapters: 8, charts: 26, status: "草稿", version: "V0.9", updateTime: "2026-06-10" },
  { key: "2", template: "地市简版年报模板", year: "2025", chapters: 5, charts: 14, status: "已生成", version: "V1.0", updateTime: "2026-06-08" }
];

const annualArchiveRows = [
  { key: "1", fileNo: "RPT-2025-HN-V1.0", name: "河南省2025年肿瘤登记年报", format: "Word/PDF", version: "V1.0", status: "已归档", publishTime: "2026-06-10", operator: "张建国" },
  { key: "2", fileNo: "RPT-2024-HN-V1.2", name: "河南省2024年肿瘤登记年报", format: "PDF", version: "V1.2", status: "已发布", publishTime: "2025-06-20", operator: "张建国" }
];

const sharePolicyRows = [
  { key: "1", name: "科研脱敏策略", fields: "姓名、身份证、电话、详细地址", rule: "哈希/掩码/区县级汇总", status: "已发布", applyTo: "科研课题" },
  { key: "2", name: "部门交换汇总策略", fields: "病例明细、诊断日期、部位", rule: "去标识化+年龄组汇总", status: "启用", applyTo: "疾控交换" }
];

const shareDeliveryRows = [
  { key: "1", packageNo: "PKG-202606-014", requestNo: "REQ-2026-014", fileName: "肺癌_2021_2025_脱敏病例.zip", expireDate: "按审批配置", downloads: "按审批配置", watermark: "按系统参数", status: "待下载" },
  { key: "2", packageNo: "PKG-202605-011", requestNo: "REQ-2026-011", fileName: "结直肠癌_地区汇总.xlsx", expireDate: "按审批配置", downloads: "按审批配置", watermark: "按系统参数", status: "已交付" }
];

const shareServiceRows = [
  { key: "1", serviceNo: "API-202606-001", name: "江西省全民健康信息平台肿瘤登记同步", org: "江西省全民健康信息平台", type: "API接口", scope: "脱敏报告卡、随访、死亡摘要", auth: "按接口参数配置", limit: "按审批配置", status: "运行中" },
  { key: "2", serviceNo: "BOX-202606-002", name: "肺癌科研数据服务", org: "省肿瘤研究所", type: "受控数据服务", scope: "肺癌 2021-2025 脱敏明细", auth: "按账号权限配置", limit: "按审批配置", status: "启用" },
  { key: "3", serviceNo: "MEDIA-202606-003", name: "国家癌症中心介质同步", org: "国家癌症中心", type: "介质同步", scope: "登记卡、随访、人口表", auth: "人工交付", limit: "单次", status: "待生成" }
];

const shareMonitorRows = [
  { key: "1", objectNo: "PKG-202606-014", org: "省肿瘤研究所", action: "下载", user: "授权使用账号", ip: "授权IP", time: "2026-06-12 09:18", count: "按审批配置", status: "正常" },
  { key: "2", objectNo: "API-202606-001", org: "江西省全民健康信息平台", action: "API调用", user: "接口服务账号", ip: "授权IP", time: "2026-06-12 10:06", count: "按接口参数", status: "正常" },
  { key: "3", objectNo: "PKG-202605-011", org: "江西省疾控中心", action: "下载", user: "授权使用账号", ip: "授权IP", time: "2026-06-11 17:40", count: "达到审批配置上限", status: "已达上限" },
  { key: "4", objectNo: "API-202606-001", org: "省肿瘤研究所", action: "接口访问", user: "授权使用账号", ip: "非授权IP", time: "2026-06-11 21:12", count: "异常", status: "异常告警" }
];

const qualityWorkOrderRows = [
  { key: "1", orderNo: "WO-202606-001", source: "自动质控", businessNo: "JX-2026-000041", issue: "诊断日期与死亡日期逻辑需核实", assignee: "县区数据修正角色", status: "待修正", createdAt: "2026-06-12 09:20" },
  { key: "2", orderNo: "WO-202606-002", source: "接口入库", businessNo: "HIS-JX-20260611-03", issue: "身份证号缺失 5 条", assignee: "医疗机构接口员", status: "退回修正", createdAt: "2026-06-12 10:05" },
  { key: "3", orderNo: "WO-202606-003", source: "年报校验", businessNo: "AN-2026-002", issue: "死亡人口分母缺失 1 个年龄组", assignee: "人口数据维护角色", status: "待复核", createdAt: "2026-06-11 18:00" }
];

const qualityAssessmentRows = [
  { key: "1", region: "江西省", year: "2025", completeness: "96.8%", accuracy: "95.7%", consistency: "97.1%", missingRate: "待评估", errorRate: "2.4%", timeliness: "93.5%", status: "已生成" },
  { key: "2", region: "南昌市", year: "2025", completeness: "95.9%", accuracy: "94.8%", consistency: "96.3%", missingRate: "待评估", errorRate: "2.9%", timeliness: "92.7%", status: "待复核" }
];

const survivalRows = [
  { key: "1", site: "肺", diagnosisYear: "2020", cases: 1268, followed: 1194, deaths: 817, followupRate: "94.2%", observed: "31.6%", median: "28个月", status: "可计算" },
  { key: "2", site: "乳腺", diagnosisYear: "2020", cases: 986, followed: 951, deaths: 205, followupRate: "96.5%", observed: "78.4%", median: "未达到", status: "可计算" },
  { key: "3", site: "结直肠", diagnosisYear: "2020", cases: 742, followed: 696, deaths: 270, followupRate: "93.8%", observed: "61.2%", median: "52个月", status: "可计算" }
];

const autoRuleRows = [
  { key: "1", type: "自动质控规则", ruleNo: "QC-RULE-001", name: "身份证与出生日期一致", scene: "报告卡登记/接口入库", level: "错误", scope: "全省", version: "当前版本", status: "启用", lastRun: "2026-06-12 08:10", result: "拦截 12 条" },
  { key: "2", type: "查重规则", ruleNo: "DUP-RULE-003", name: "身份证+姓名+出生日期完全一致", scene: "报告卡查重", level: "高风险", scope: "正式有效卡", version: "当前版本", status: "启用", lastRun: "2026-06-12 02:00", result: "疑似重卡 18 组" },
  { key: "3", type: "随访计划规则", ruleNo: "FUP-RULE-002", name: "术后患者 3 个月随访", scene: "随访计划", level: "任务", scope: "存活患者", version: "V1.6", status: "启用", lastRun: "2026-06-12 01:30", result: "生成 286 条任务" },
  { key: "4", type: "死因匹配规则", ruleNo: "COD-RULE-005", name: "身份证完全匹配且死亡日期合理", scene: "死因补录", level: "自动匹配", scope: "死因回流", version: "V1.9", status: "启用", lastRun: "2026-06-12 03:20", result: "匹配 42 条" },
  { key: "5", type: "接口校验规则", ruleNo: "API-RULE-004", name: "HIS 模板必填字段校验", scene: "数据接口", level: "错误", scope: "HIS-肿瘤登记", version: "V3.0", status: "启用", lastRun: "2026-06-12 09:45", result: "错误 17 条" },
  { key: "6", type: "年报校验规则", ruleNo: "RPT-RULE-002", name: "年报人口分母完整性", scene: "结构化年报", level: "阻断", scope: "年度汇总", version: "V1.2", status: "启用", lastRun: "2026-06-11 18:00", result: "缺失 1 项" },
  { key: "7", type: "规则执行记录", ruleNo: "RUN-20260612-009", name: "自动质控批量执行", scene: "夜间任务", level: "日志", scope: "全省", version: "批次", status: "已完成", lastRun: "2026-06-12 04:00", result: "处理 22186 条" }
];

const auditManagementRows = [
  { key: "1", type: "报告卡操作日志", time: "2026-06-12 09:12", user: "王医生", role: "医疗机构填报员", objectNo: "JX-2026-000053", action: "提交报告卡", content: "系统派发至东湖区县区初审账号池", ip: "10.36.2.18", result: "成功" },
  { key: "2", type: "审批流转日志", time: "2026-06-12 09:30", user: "县区审核账号", role: "县区报告卡审核员", objectNo: "AP-202606-001", action: "通过并流转", content: "县区初审通过，流转至南昌市登记办账号池", ip: "授权IP", result: "成功" },
  { key: "3", type: "数据接口日志", time: "2026-06-12 10:05", user: "接口任务", role: "系统任务", objectNo: "HIS-JX-20260611-03", action: "接口校验", content: "HIS 批次校验，疑似重卡 3 条，进入入库审批", ip: "10.21.8.33", result: "成功" },
  { key: "4", type: "数据共享日志", time: "2026-06-12 10:18", user: "授权使用账号", role: "共享使用方", objectNo: "PKG-202606-014", action: "下载脱敏文件", content: "按审批配置下载，文件标识按系统参数生成", ip: "授权IP", result: "成功" },
  { key: "5", type: "系统操作日志", time: "2026-06-12 10:30", user: "刘主任", role: "江西省管理员", objectNo: "RPT-RULE-002", action: "发布规则", content: "年报人口分母完整性规则发布 V1.2", ip: "10.36.1.6", result: "成功" },
  { key: "6", type: "权限变更日志", time: "2026-06-12 10:42", user: "刘主任", role: "江西省管理员", objectNo: "ROLE_SHARE", action: "授权变更", content: "新增数据共享日志查看权限", ip: "10.36.1.6", result: "成功" },
  { key: "7", type: "登录访问日志", time: "2026-06-12 08:03", user: "陈主任", role: "数据共享审批员", objectNo: "LOGIN-20260612-001", action: "登录", content: "江西省数据共享审批员登录", ip: "10.36.1.21", result: "成功" }
];

const approvalRows = [
  { key: "1", flowNo: "AP-202606-001", businessType: "报告卡审核", businessNo: "JX-2026-000041", title: "胡梅 乙状结肠癌报告卡", applicant: "南昌市第一医院", submitterRole: "医疗机构填报员", currentNode: "县区初审", nodeLevel: "县区", receiverRegion: "南昌市东湖区", receiverRole: "县区报告卡审核员", receiverAccounts: "县区报告卡审核员账号池", owner: "东湖区登记处", status: "待我审批", inbox: "待我审批", submitTime: "2026-06-11 09:18", risk: "质控警告 1 项" },
  { key: "2", flowNo: "AP-202606-002", businessType: "接口入库审核", businessNo: "HIS-JX-20260611-03", title: "江西省人民医院 HIS 肿瘤批次入库", applicant: "江西省人民医院", submitterRole: "医疗机构接口员", currentNode: "省级复核", nodeLevel: "省级", receiverRegion: "江西省", receiverRole: "省级接口审核员", receiverAccounts: "省级接口审核员账号池", owner: "江西省肿瘤登记中心", status: "待我审批", inbox: "待我审批", submitTime: "2026-06-11 10:05", risk: "疑似重卡 3 条" },
  { key: "3", flowNo: "AP-202606-003", businessType: "数据共享审批", businessNo: "REQ-2026-014", title: "肺癌 2021-2025 脱敏病例共享", applicant: "省肿瘤研究所", submitterRole: "科研申请人", currentNode: "共享合规审核", nodeLevel: "省级", receiverRegion: "江西省", receiverRole: "数据共享审批员", receiverAccounts: "数据共享审批员账号池", owner: "数据共享审批员", status: "待审批", inbox: "待我审批", submitTime: "2026-06-10 16:42", risk: "涉及脱敏明细" },
  { key: "4", flowNo: "AP-202606-004", businessType: "年报发布审批", businessNo: "RPT-2025-JX-V1.0", title: "江西省2025年肿瘤登记年报发布", applicant: "年报编制组", submitterRole: "年报编制员", currentNode: "编制组修正", nodeLevel: "省级", receiverRegion: "江西省", receiverRole: "年报编制员", receiverAccounts: "年报编制员账号池", owner: "年报编制组", status: "退回修正", inbox: "我发起的", submitTime: "2026-06-09 14:20", risk: "死亡人口分母待确认" },
  { key: "5", flowNo: "AP-202606-005", businessType: "高风险操作审批", businessNo: "VOID-JX-2026-017", title: "作废卡物理删除申请", applicant: "南昌市登记处", submitterRole: "地市登记员", currentNode: "流程结束", nodeLevel: "省级", receiverRegion: "江西省", receiverRole: "系统管理员", receiverAccounts: "系统管理员A", owner: "系统管理员", status: "审批通过", inbox: "已处理", submitTime: "2026-06-08 11:32", risk: "不可恢复操作" },
  { key: "6", flowNo: "AP-202606-006", businessType: "报告卡审核", businessNo: "JX-2026-000052", title: "万强 肺恶性肿瘤报告卡", applicant: "九江市第一人民医院", submitterRole: "医疗机构填报员", currentNode: "地市复审", nodeLevel: "地市", receiverRegion: "九江市", receiverRole: "地市报告卡审核员", receiverAccounts: "地市报告卡审核员账号池", owner: "九江市登记办", status: "转办给我", inbox: "转办给我", submitTime: "2026-06-11 11:08", risk: "身份证地址跨区" },
  { key: "7", flowNo: "AP-202606-007", businessType: "数据共享审批", businessNo: "REQ-2026-018", title: "结直肠癌地区汇总数据共享", applicant: "江西省疾控中心", submitterRole: "外部机构申请人", currentNode: "交付授权", nodeLevel: "省级", receiverRegion: "江西省", receiverRole: "数据交付管理员", receiverAccounts: "数据交付员、陈主任", owner: "数据共享审批员", status: "抄送我的", inbox: "抄送我的", submitTime: "2026-06-11 08:40", risk: "仅汇总数据" }
];

const approvalFlowRows = [
  { key: "1", businessType: "报告卡审核", enabled: "启用", nodes: "机构提交 > 县区初审 > 地市复审 > 省级终审", assigneeRule: "按上级区划角色池派发", returnPolicy: "退回到提交人", province: "江西省" },
  { key: "2", businessType: "接口入库审核", enabled: "启用", nodes: "批次校验 > 省级复核 > 正式入库", assigneeRule: "按业务类型派发至省级接口审核员", returnPolicy: "退回临时库处理", province: "江西省" },
  { key: "3", businessType: "数据共享审批", enabled: "启用", nodes: "申请提交 > 合规审核 > 脱敏确认 > 交付授权", assigneeRule: "按共享场景派发至合规/脱敏/交付角色池", returnPolicy: "退回补充材料", province: "江西省" },
  { key: "4", businessType: "年报发布审批", enabled: "启用", nodes: "年报提交 > 数据准备度复核 > 省级终审 > 发布归档", assigneeRule: "按省级年报审核角色派发", returnPolicy: "退回年报编制组", province: "江西省" },
  { key: "5", businessType: "河南审批流程", enabled: "停用", nodes: "审批总开关关闭，沿用原河南操作路径", assigneeRule: "不派发审批任务", returnPolicy: "不适用", province: "河南省" }
];

const approvalNodeRules = [
  { key: "1", businessType: "报告卡审核", submitter: "医疗机构填报员", nextNode: "县区初审", receiverLevel: "县区", receiverRole: "县区报告卡审核员", accountPool: "所属县区所有启用审核账号", sample: "南昌市第一医院提交后，东湖区登记处 3 个账号均可处理" },
  { key: "2", businessType: "报告卡审核", submitter: "县区报告卡审核员", nextNode: "地市复审", receiverLevel: "地市", receiverRole: "地市报告卡审核员", accountPool: "上级地市审核账号池", sample: "东湖区通过后，南昌市登记办账号池收到任务" },
  { key: "3", businessType: "报告卡审核", submitter: "地市报告卡审核员", nextNode: "省级终审", receiverLevel: "省级", receiverRole: "省级报告卡终审员", accountPool: "省级终审账号池", sample: "南昌市通过后，江西省登记中心终审账号收到任务" },
  { key: "4", businessType: "数据共享审批", submitter: "外部/科研申请人", nextNode: "共享合规审核", receiverLevel: "省级", receiverRole: "数据共享审批员", accountPool: "共享审批账号池", sample: "申请提交后，对应角色账号池均可处理" },
  { key: "5", businessType: "接口入库审核", submitter: "医疗机构接口员", nextNode: "省级复核", receiverLevel: "省级", receiverRole: "省级接口审核员", accountPool: "接口审核账号池", sample: "批次校验通过后，接口审核员账号池收到任务" }
];

const voidRows = [
  {
    key: "1",
    no: "HN-2026-000091",
    name: "郭兰英",
    sex: "女",
    age: 71,
    idCard: "410102195501126527",
    region: "郑州市中原区",
    org: "郑州市中心医院",
    diagnosis: "C34.9 肺恶性肿瘤",
    type: "原始卡",
    quality: "通过",
    originalStatus: "待县区审核",
    status: "已作废",
    reason: "医疗机构误报",
    date: "2026-05-18",
    deletedBy: "周敏",
    deletedAt: "2026-05-18 15:21"
  },
  {
    key: "2",
    no: "HN-2026-000102",
    name: "孙志强",
    sex: "男",
    age: 59,
    idCard: "410204196705218419",
    region: "开封市鼓楼区",
    org: "开封市人民医院",
    diagnosis: "C18.7 乙状结肠癌",
    type: "合并卡",
    quality: "警告",
    originalStatus: "正式",
    status: "已作废",
    reason: "重卡合并后作废",
    date: "2026-05-22",
    deletedBy: "李文华",
    deletedAt: "2026-05-22 10:08"
  }
];

const followupRows = [
  {
    key: "1",
    no: "HN-2026-000183",
    name: "张秀兰",
    sex: "女",
    age: 63,
    idCard: "41010519630215482X",
    region: "郑州市金水区",
    org: "河南省人民医院",
    diagnosis: "C50.9 乳腺恶性肿瘤",
    diagnosisDate: "2026-06-01",
    lastContactDate: "2026-06-06",
    contactStatus: "存活",
    latestMethod: "电话随访",
    followupCount: 2,
    auditStatus: "已完成",
    followDoctor: "王医生",
    histories: [
      { date: "2026-06-06", method: "电话随访", status: "存活", doctor: "王医生", note: "患者术后恢复稳定，已在省人民医院复诊。" },
      { date: "2026-03-08", method: "门诊随访", status: "存活", doctor: "刘医生", note: "完成首次随访，联系人电话有效。" }
    ]
  },
  {
    key: "2",
    no: "HN-2026-000185",
    name: "赵海",
    sex: "男",
    age: 45,
    idCard: "411002198103094210",
    region: "许昌市魏都区",
    org: "许昌市人民医院",
    diagnosis: "C22.0 肝细胞癌",
    diagnosisDate: "2026-05-28",
    lastContactDate: "2026-06-02",
    contactStatus: "失访",
    latestMethod: "基层协查",
    followupCount: 1,
    auditStatus: "待复核",
    followDoctor: "周敏",
    histories: [
      { date: "2026-06-02", method: "基层协查", status: "失访", doctor: "周敏", note: "户籍地址可达，电话停机，需下次协查。" }
    ]
  },
  {
    key: "3",
    no: "HN-2025-008432",
    name: "陈国强",
    sex: "男",
    age: 68,
    idCard: "410103195802073016",
    region: "郑州市二七区",
    org: "郑大一附院",
    diagnosis: "C16.9 胃恶性肿瘤",
    diagnosisDate: "2025-12-15",
    lastContactDate: "2026-05-30",
    contactStatus: "死亡",
    latestMethod: "死因匹配",
    followupCount: 3,
    auditStatus: "死亡待更新",
    followDoctor: "李文华",
    deathDate: "2026-05-30",
    deathCause: "肿瘤相关死亡",
    deathPlace: "医院",
    histories: [
      { date: "2026-05-30", method: "死因匹配", status: "死亡", doctor: "李文华", note: "死因系统回流，需在死亡信息管理中补全死亡信息。" },
      { date: "2026-03-21", method: "电话随访", status: "存活", doctor: "王医生", note: "患者化疗中，家属反馈状态较差。" },
      { date: "2025-12-22", method: "门诊随访", status: "存活", doctor: "刘医生", note: "登记后首次随访。" }
    ]
  }
];

const batchFollowupErrors = [
  {
    key: "1",
    rowNo: 7,
    no: "HN-2026-000185",
    name: "赵海",
    idCard: "411002198103094210",
    contactDate: "2026-05-20",
    contactStatus: "存活",
    errorType: "日期逻辑错误",
    level: "错误",
    message: "最后接触日期早于确诊日期 2026-05-28",
    suggestion: "核对随访日期后重新上传或逐条处理"
  },
  {
    key: "2",
    rowNo: 12,
    no: "HN-2025-008432",
    name: "陈国强",
    idCard: "410103195802073016",
    contactDate: "2026-05-30",
    contactStatus: "死亡",
    errorType: "死亡字段缺失",
    level: "错误",
    message: "接触状态为死亡时，死亡原因和死亡地点不能为空",
    suggestion: "补齐死亡日期、死亡原因、死亡地点"
  },
  {
    key: "3",
    rowNo: 18,
    no: "HN-2026-009999",
    name: "刘建设",
    idCard: "410105197611032711",
    contactDate: "2026-06-07",
    contactStatus: "存活",
    errorType: "患者匹配失败",
    level: "错误",
    message: "登记编号不存在，身份证号未匹配到有效报告卡",
    suggestion: "确认登记编号或先补录报告卡"
  },
  {
    key: "4",
    rowNo: 23,
    no: "HN-2026-000183",
    name: "张秀兰",
    idCard: "41010519630215482X",
    contactDate: "2026-06-06",
    contactStatus: "存活",
    errorType: "重复随访",
    level: "警告",
    message: "同一患者、同一最后接触日期已存在随访记录",
    suggestion: "如确认覆盖，请逐条处理并填写说明"
  }
];

const followupPlanRows = [
  {
    key: "1",
    no: "HN-2026-000183",
    name: "张秀兰",
    idCard: "41010519630215482X",
    region: "郑州市金水区",
    diagnosis: "C50.9 乳腺恶性肿瘤",
    lastContactDate: "2026-06-06",
    patientStatus: "存活",
    plannedDate: "2026-09-06",
    rule: "术后 3 个月复访",
    taskStatus: "待生成",
    ownerOrg: "金水区疾控中心",
    ownerUser: "周敏",
    overdueDays: 0,
    latestFollowup: "2026-06-06 电话随访：患者术后恢复稳定"
  },
  {
    key: "2",
    no: "HN-2026-000185",
    name: "赵海",
    idCard: "411002198103094210",
    region: "许昌市魏都区",
    diagnosis: "C22.0 肝细胞癌",
    lastContactDate: "2026-06-02",
    patientStatus: "失访",
    plannedDate: "2026-06-30",
    rule: "失访 30 日基层协查",
    taskStatus: "已生成",
    ownerOrg: "魏都区疾控中心",
    ownerUser: "刘丽",
    overdueDays: 0,
    latestFollowup: "2026-06-02 基层协查：电话停机，需下次协查"
  },
  {
    key: "3",
    no: "HN-2025-007716",
    name: "马玉梅",
    idCard: "410105195902214829",
    region: "郑州市金水区",
    diagnosis: "C34.9 肺恶性肿瘤",
    lastContactDate: "2025-12-20",
    patientStatus: "存活",
    plannedDate: "2026-05-20",
    rule: "半年常规随访",
    taskStatus: "逾期",
    ownerOrg: "郑州市疾控中心",
    ownerUser: "李文华",
    overdueDays: 19,
    latestFollowup: "2025-12-20 电话随访：患者在家康复"
  },
  {
    key: "4",
    no: "HN-2025-008432",
    name: "陈国强",
    idCard: "410103195802073016",
    region: "郑州市二七区",
    diagnosis: "C16.9 胃恶性肿瘤",
    lastContactDate: "2026-05-30",
    patientStatus: "死亡",
    plannedDate: "-",
    rule: "死亡记录排除",
    taskStatus: "已排除",
    ownerOrg: "郑州市疾控中心",
    ownerUser: "李文华",
    overdueDays: 0,
    latestFollowup: "2026-05-30 死因匹配：需进入死亡信息管理补全"
  }
];

const deathInfoRows = [
  {
    key: "1",
    no: "HN-2025-008432",
    name: "陈国强",
    sex: "男",
    age: 68,
    idCard: "410103195802073016",
    region: "郑州市二七区",
    org: "郑大一附院",
    diagnosis: "C16.9 胃恶性肿瘤",
    diagnosisDate: "2025-12-15",
    lastContactDate: "2026-05-30",
    deathDate: "2026-05-30",
    deathCause: "肿瘤相关死亡",
    deathPlace: "医院",
    sourceType: "死因回流",
    deathStatus: "待补全",
    auditStatus: "死亡待更新",
    rootCauseCode: "",
    certificateSource: "死因监测系统",
    rollbackAllowed: true,
    archived: false,
    histories: [
      { date: "2026-05-30", method: "死因匹配", status: "死亡", doctor: "李文华", note: "死因系统回流，死亡原因和地点待补全。" },
      { date: "2026-03-21", method: "电话随访", status: "存活", doctor: "王医生", note: "家属反馈患者化疗中。" }
    ]
  },
  {
    key: "2",
    no: "HN-2024-006381",
    name: "吴凤英",
    sex: "女",
    age: 74,
    idCard: "410105195112098327",
    region: "郑州市金水区",
    org: "河南省肿瘤医院",
    diagnosis: "C34.9 肺恶性肿瘤",
    diagnosisDate: "2024-09-11",
    lastContactDate: "2026-06-01",
    deathDate: "2026-06-01",
    deathCause: "肿瘤相关死亡",
    deathPlace: "家中",
    sourceType: "电话随访",
    deathStatus: "已确认",
    auditStatus: "正式",
    rootCauseCode: "C34.9",
    certificateSource: "家属反馈并核验死亡证明",
    rollbackAllowed: true,
    archived: false,
    histories: [
      { date: "2026-06-01", method: "电话随访", status: "死亡", doctor: "周敏", note: "家属反馈并补充死亡证明信息。" },
      { date: "2025-12-01", method: "门诊随访", status: "存活", doctor: "刘医生", note: "患者门诊复诊。" }
    ]
  },
  {
    key: "3",
    no: "JX-2026-000041",
    name: "胡梅",
    sex: "女",
    age: 57,
    idCard: "360102196901183626",
    region: "南昌市东湖区",
    org: "南昌大学一附院",
    diagnosis: "C18.7 乙状结肠癌",
    diagnosisDate: "2026-05-30",
    lastContactDate: "2026-06-03",
    deathDate: "2026-06-03",
    deathCause: "心脑血管疾病",
    deathPlace: "医院",
    sourceType: "医院上报",
    deathStatus: "已上报",
    auditStatus: "已归档",
    rootCauseCode: "I64",
    certificateSource: "医院死亡医学证明",
    rollbackAllowed: false,
    archived: true,
    histories: [
      { date: "2026-06-03", method: "医院上报", status: "死亡", doctor: "陈医生", note: "已归档并上报，需走更正流程。" }
    ]
  }
];

const causeSupplementRows = [
  {
    key: "1",
    causeNo: "COD-202606-0017",
    batchNo: "COD-BACK-20260608-01",
    no: "HN-2025-008432",
    name: "陈国强",
    sex: "男",
    birthDate: "1958-02-07",
    idCard: "410103195802073016",
    region: "郑州市二七区",
    address: "郑州市二七区大学路街道",
    diagnosis: "C16.9 胃恶性肿瘤",
    diagnosisDate: "2025-12-15",
    deathDate: "2026-05-30",
    rootCause: "胃恶性肿瘤",
    causeCode: "C16.9",
    deathPlace: "医院",
    sourceType: "省级死因回流",
    matchStatus: "匹配成功",
    processStatus: "待补录",
    matchBasis: "身份证号、姓名、出生日期完全一致",
    confidence: "高",
    archived: false
  },
  {
    key: "2",
    causeNo: "COD-202606-0024",
    batchNo: "COD-BACK-20260608-01",
    no: "HN-2026-000185",
    name: "赵海",
    sex: "男",
    birthDate: "1981-03-09",
    idCard: "411002198103094210",
    region: "许昌市魏都区",
    address: "许昌市魏都区文峰街道",
    diagnosis: "C22.0 肝细胞癌",
    diagnosisDate: "2026-05-28",
    deathDate: "2026-05-20",
    rootCause: "肝细胞癌",
    causeCode: "C22.0",
    deathPlace: "家中",
    sourceType: "县区死因导入",
    matchStatus: "匹配存疑",
    processStatus: "待处理",
    matchBasis: "身份证号一致，但死亡日期早于确诊日期",
    confidence: "中",
    archived: false
  },
  {
    key: "3",
    causeNo: "COD-202606-0031",
    batchNo: "COD-BACK-20260608-02",
    no: "-",
    name: "刘建设",
    sex: "男",
    birthDate: "1976-11-03",
    idCard: "410105197611032711",
    region: "郑州市金水区",
    address: "郑州市金水区丰产路街道",
    diagnosis: "死因记录：肺恶性肿瘤",
    diagnosisDate: "-",
    deathDate: "2026-06-02",
    rootCause: "肺恶性肿瘤",
    causeCode: "C34.9",
    deathPlace: "医院",
    sourceType: "国家平台回流",
    matchStatus: "未匹配",
    processStatus: "转协查",
    matchBasis: "身份证号未匹配到有效报告卡",
    confidence: "低",
    archived: false
  },
  {
    key: "4",
    causeNo: "COD-202606-0042",
    batchNo: "COD-BACK-20260601-01",
    no: "JX-2026-000041",
    name: "胡梅",
    sex: "女",
    birthDate: "1969-01-18",
    idCard: "360102196901183626",
    region: "南昌市东湖区",
    address: "南昌市东湖区公园街道",
    diagnosis: "C18.7 乙状结肠癌",
    diagnosisDate: "2026-05-30",
    deathDate: "2026-06-03",
    rootCause: "脑卒中",
    causeCode: "I64",
    deathPlace: "医院",
    sourceType: "医院死亡证明",
    matchStatus: "匹配成功",
    processStatus: "已补录",
    matchBasis: "登记编号、身份证号一致",
    confidence: "高",
    archived: true
  }
];

const duplicateRows = [
  { key: "1", group: "DUP-202606-001", cards: "HN-2026-000183 / HN-2025-009812", basis: "身份证号 + 姓名 + 出生日期", judge: "疑似重复", risk: "高" },
  { key: "2", group: "DUP-202606-002", cards: "HN-2026-000185 / HN-2024-006381", basis: "姓名 + 联系电话 + 常住地址", judge: "疑似多原发", risk: "中" }
];

const duplicateReportRows = [
  {
    key: "1",
    groupNo: "DUP-RC-202606-001",
    patientName: "张秀兰",
    idCard: "410105196303124826",
    region: "郑州市金水区",
    candidateCount: 2,
    basis: "身份证号 + 姓名 + 出生日期完全一致",
    conflict: "报告单位、报告日期不同；诊断部位一致",
    judge: "疑似重复",
    risk: "高",
    status: "待处理",
    ownerOrg: "金水区疾控中心",
    discoverDate: "2026-06-08",
    suggestion: "建议保留最新完整卡，合并来源卡并作废重复卡",
    candidates: [
      { no: "HN-2026-000183", cardType: "原始卡", org: "河南省人民医院", reportDate: "2026-06-05", diagnosisDate: "2026-05-28", site: "C50.9 乳腺恶性肿瘤", status: "待县区审核", quality: "警告", completeness: "92%", keepRecommend: "保留" },
      { no: "HN-2025-009812", cardType: "历史卡", org: "郑州市中心医院", reportDate: "2025-12-18", diagnosisDate: "2025-12-10", site: "C50.9 乳腺恶性肿瘤", status: "正式", quality: "通过", completeness: "86%", keepRecommend: "合并" }
    ]
  },
  {
    key: "2",
    groupNo: "DUP-RC-202606-002",
    patientName: "赵海",
    idCard: "411002198103094210",
    region: "许昌市魏都区",
    candidateCount: 2,
    basis: "姓名 + 联系电话 + 常住地址相似",
    conflict: "肝脏部位相同，但诊断日期间隔较短",
    judge: "需人工复核",
    risk: "中",
    status: "待确认",
    ownerOrg: "魏都区疾控中心",
    discoverDate: "2026-06-07",
    suggestion: "建议查看病理号和就诊流水，确认是否同一次发病",
    candidates: [
      { no: "HN-2026-000185", cardType: "原始卡", org: "许昌市人民医院", reportDate: "2026-06-04", diagnosisDate: "2026-05-28", site: "C22.0 肝细胞癌", status: "待省级终审", quality: "通过", completeness: "94%", keepRecommend: "待定" },
      { no: "HN-2026-000209", cardType: "补充卡", org: "许昌市中心医院", reportDate: "2026-06-06", diagnosisDate: "2026-05-30", site: "C22.0 肝细胞癌", status: "待县区审核", quality: "警告", completeness: "88%", keepRecommend: "待定" }
    ]
  },
  {
    key: "3",
    groupNo: "DUP-RC-202606-003",
    patientName: "王建国",
    idCard: "410302195501182414",
    region: "洛阳市涧西区",
    candidateCount: 2,
    basis: "身份证号一致，发病部位不同",
    conflict: "肺癌与结肠癌部位不同，疑似多原发",
    judge: "疑似多原发",
    risk: "中",
    status: "待标记",
    ownerOrg: "洛阳市疾控中心",
    discoverDate: "2026-06-06",
    suggestion: "不建议快速合并，需按多原发规则标记关系",
    candidates: [
      { no: "HN-2026-000184", cardType: "原始卡", org: "洛阳市中心医院", reportDate: "2026-06-03", diagnosisDate: "2026-05-26", site: "C34.1 上叶肺癌", status: "正式", quality: "通过", completeness: "96%", keepRecommend: "保留" },
      { no: "HN-2026-000211", cardType: "原始卡", org: "河南科技大学一附院", reportDate: "2026-06-05", diagnosisDate: "2026-05-29", site: "C18.7 乙状结肠癌", status: "待省级终审", quality: "通过", completeness: "91%", keepRecommend: "保留" }
    ]
  },
  {
    key: "4",
    groupNo: "DUP-RC-202606-004",
    patientName: "刘梅",
    idCard: "360102197401093626",
    region: "南昌市东湖区",
    candidateCount: 3,
    basis: "姓名 + 性别 + 出生日期 + 地址相似",
    conflict: "身份证号缺失一条，报告机构重复上报",
    judge: "疑似重复",
    risk: "低",
    status: "已处理",
    ownerOrg: "东湖区疾控中心",
    discoverDate: "2026-06-02",
    suggestion: "已合并为 JX-2026-000041，保留处理日志",
    candidates: [
      { no: "JX-2026-000041", cardType: "合并卡", org: "江西省肿瘤医院", reportDate: "2026-06-01", diagnosisDate: "2026-05-30", site: "C18.7 乙状结肠癌", status: "正式", quality: "通过", completeness: "98%", keepRecommend: "保留" },
      { no: "JX-2026-000038", cardType: "原始卡", org: "南昌大学一附院", reportDate: "2026-05-31", diagnosisDate: "2026-05-30", site: "C18.7 乙状结肠癌", status: "已作废", quality: "通过", completeness: "83%", keepRecommend: "已合并" },
      { no: "JX-2026-000039", cardType: "原始卡", org: "南昌大学一附院", reportDate: "2026-05-31", diagnosisDate: "2026-05-30", site: "C18.7 乙状结肠癌", status: "已作废", quality: "警告", completeness: "78%", keepRecommend: "已合并" }
    ]
  }
];

const duplicatePopulationRows = [
  {
    key: "1",
    groupNo: "DUP-POP-202606-001",
    masterPersonNo: "P-HN-410105-000128",
    patientName: "张秀兰",
    sex: "女",
    birthDate: "1963-03-12",
    idCard: "410105196303124826",
    region: "郑州市金水区",
    address: "郑州市金水区文化路街道农业路社区",
    candidateCount: 2,
    basis: "身份证号 + 姓名完全一致",
    conflict: "联系电话不同，常住地址门牌号有差异",
    judge: "疑似同一人",
    risk: "高",
    status: "待合并",
    relationImpact: "报告卡2张、随访3条、地址2条",
    discoverDate: "2026-06-08",
    suggestion: "建议保留身份证完整、关联报告卡最多的人口主档",
    candidates: [
      { personNo: "P-HN-410105-000128", name: "张秀兰", sex: "女", birthDate: "1963-03-12", idCard: "410105196303124826", phone: "138****6218", address: "郑州市金水区文化路街道农业路社区12号", reportCards: 1, followups: 2, deaths: 0, source: "河南省人民医院", completeness: "96%", recommend: "保留主档" },
      { personNo: "P-HN-410105-000077", name: "张秀兰", sex: "女", birthDate: "1963-03-12", idCard: "410105196303124826", phone: "139****8316", address: "郑州市金水区文化路街道农业路社区", reportCards: 1, followups: 1, deaths: 0, source: "郑州市中心医院", completeness: "88%", recommend: "合并入主档" }
    ]
  },
  {
    key: "2",
    groupNo: "DUP-POP-202606-002",
    masterPersonNo: "P-HN-411002-000219",
    patientName: "赵海",
    sex: "男",
    birthDate: "1981-03-09",
    idCard: "411002198103094210",
    region: "许昌市魏都区",
    address: "许昌市魏都区文峰街道建设路",
    candidateCount: 2,
    basis: "姓名 + 手机号 + 常住地址相似",
    conflict: "一条身份证号缺失，出生日期相差1天",
    judge: "需人工核实",
    risk: "中",
    status: "待协查",
    relationImpact: "报告卡2张、随访1条、地址2条",
    discoverDate: "2026-06-07",
    suggestion: "建议转责任机构核实身份证件或病案首页",
    candidates: [
      { personNo: "P-HN-411002-000219", name: "赵海", sex: "男", birthDate: "1981-03-09", idCard: "411002198103094210", phone: "136****9021", address: "许昌市魏都区文峰街道建设路88号", reportCards: 1, followups: 1, deaths: 0, source: "许昌市人民医院", completeness: "93%", recommend: "待定" },
      { personNo: "P-HN-411002-000246", name: "赵海", sex: "男", birthDate: "1981-03-10", idCard: "-", phone: "136****9021", address: "许昌市魏都区文峰办建设路", reportCards: 1, followups: 0, deaths: 0, source: "许昌市中心医院", completeness: "74%", recommend: "待协查" }
    ]
  },
  {
    key: "3",
    groupNo: "DUP-POP-202606-003",
    masterPersonNo: "P-HN-410302-000098",
    patientName: "王建国",
    sex: "男",
    birthDate: "1955-01-18",
    idCard: "410302195501182414",
    region: "洛阳市涧西区",
    address: "洛阳市涧西区天津路街道",
    candidateCount: 2,
    basis: "身份证号一致",
    conflict: "同一人口存在两张不同部位报告卡",
    judge: "同一人多原发",
    risk: "中",
    status: "待确认",
    relationImpact: "报告卡2张、随访2条",
    discoverDate: "2026-06-06",
    suggestion: "人口主档应合并，报告卡关系保留多原发标记",
    candidates: [
      { personNo: "P-HN-410302-000098", name: "王建国", sex: "男", birthDate: "1955-01-18", idCard: "410302195501182414", phone: "137****4018", address: "洛阳市涧西区天津路街道联盟路", reportCards: 1, followups: 1, deaths: 0, source: "洛阳市中心医院", completeness: "95%", recommend: "保留主档" },
      { personNo: "P-HN-410302-000133", name: "王建国", sex: "男", birthDate: "1955-01-18", idCard: "410302195501182414", phone: "137****4018", address: "洛阳市涧西区天津路办联盟路", reportCards: 1, followups: 1, deaths: 0, source: "河南科技大学一附院", completeness: "90%", recommend: "合并人口，保留多原发" }
    ]
  },
  {
    key: "4",
    groupNo: "DUP-POP-202606-004",
    masterPersonNo: "P-JX-360102-000041",
    patientName: "胡梅",
    sex: "女",
    birthDate: "1969-01-18",
    idCard: "360102196901183626",
    region: "南昌市东湖区",
    address: "南昌市东湖区公园街道",
    candidateCount: 3,
    basis: "姓名 + 性别 + 出生日期 + 地址相似",
    conflict: "外院导入记录缺身份证号",
    judge: "疑似同一人",
    risk: "低",
    status: "已合并",
    relationImpact: "报告卡1张、死亡记录1条、地址3条",
    discoverDate: "2026-06-03",
    suggestion: "已合并为 P-JX-360102-000041，保留来源人口关系",
    candidates: [
      { personNo: "P-JX-360102-000041", name: "胡梅", sex: "女", birthDate: "1969-01-18", idCard: "360102196901183626", phone: "135****1036", address: "南昌市东湖区公园街道民德路", reportCards: 1, followups: 0, deaths: 1, source: "江西省肿瘤医院", completeness: "98%", recommend: "保留主档" },
      { personNo: "P-JX-360102-000038", name: "胡梅", sex: "女", birthDate: "1969-01-18", idCard: "-", phone: "135****1036", address: "东湖区公园街道民德路", reportCards: 0, followups: 0, deaths: 0, source: "南昌大学一附院", completeness: "68%", recommend: "已合并" },
      { personNo: "P-JX-360102-000039", name: "胡梅", sex: "女", birthDate: "1969-01-18", idCard: "-", phone: "-", address: "南昌市东湖区公园街道", reportCards: 0, followups: 0, deaths: 0, source: "死因回流", completeness: "55%", recommend: "已合并" }
    ]
  }
];

const duplicateRelationRows = [
  {
    key: "1",
    mergedNo: "HN-2026-000183",
    relationNo: "REL-RC-202606-001",
    patientName: "张秀兰",
    idCard: "410105196303124826",
    region: "郑州市金水区",
    diagnosis: "C50.9 乳腺恶性肿瘤",
    diagnosisDate: "2026-05-28",
    reportOrg: "河南省人民医院",
    relationType: "重卡合并",
    relationStatus: "有效",
    sourceCount: 2,
    mergeDate: "2026-06-08",
    mergeUser: "周敏",
    mergeBasis: "身份证号、姓名、出生日期一致；发病部位一致",
    mergedCard: { no: "HN-2026-000183", cardType: "合并卡", reportOrg: "河南省人民医院", reportDate: "2026-06-05", diagnosisDate: "2026-05-28", diagnosis: "C50.9 乳腺恶性肿瘤", status: "正式", quality: "通过" },
    sources: [
      { no: "HN-2026-000183", cardType: "原始卡", reportOrg: "河南省人民医院", reportDate: "2026-06-05", diagnosisDate: "2026-05-28", diagnosis: "C50.9 乳腺恶性肿瘤", relationRole: "目标卡", sourceStatus: "保留" },
      { no: "HN-2025-009812", cardType: "历史卡", reportOrg: "郑州市中心医院", reportDate: "2025-12-18", diagnosisDate: "2025-12-10", diagnosis: "C50.9 乳腺恶性肿瘤", relationRole: "来源卡", sourceStatus: "合并后作废" }
    ],
    logs: [
      { time: "2026-06-08 09:18", user: "周敏", action: "对比合并", note: "按合并字段优先级生成合并卡，来源卡关系留痕。" },
      { time: "2026-06-08 09:21", user: "李文华", action: "审核确认", note: "确认同一患者同一部位重复报告。" }
    ]
  },
  {
    key: "2",
    mergedNo: "JX-2026-000041",
    relationNo: "REL-RC-202606-002",
    patientName: "刘梅",
    idCard: "360102197401093626",
    region: "南昌市东湖区",
    diagnosis: "C18.7 乙状结肠癌",
    diagnosisDate: "2026-05-30",
    reportOrg: "江西省肿瘤医院",
    relationType: "重卡合并",
    relationStatus: "有效",
    sourceCount: 3,
    mergeDate: "2026-06-03",
    mergeUser: "陈芳",
    mergeBasis: "姓名、性别、出生日期、地址相似；诊断日期一致",
    mergedCard: { no: "JX-2026-000041", cardType: "合并卡", reportOrg: "江西省肿瘤医院", reportDate: "2026-06-01", diagnosisDate: "2026-05-30", diagnosis: "C18.7 乙状结肠癌", status: "正式", quality: "通过" },
    sources: [
      { no: "JX-2026-000041", cardType: "原始卡", reportOrg: "江西省肿瘤医院", reportDate: "2026-06-01", diagnosisDate: "2026-05-30", diagnosis: "C18.7 乙状结肠癌", relationRole: "目标卡", sourceStatus: "保留" },
      { no: "JX-2026-000038", cardType: "原始卡", reportOrg: "南昌大学一附院", reportDate: "2026-05-31", diagnosisDate: "2026-05-30", diagnosis: "C18.7 乙状结肠癌", relationRole: "来源卡", sourceStatus: "合并后作废" },
      { no: "JX-2026-000039", cardType: "原始卡", reportOrg: "南昌大学一附院", reportDate: "2026-05-31", diagnosisDate: "2026-05-30", diagnosis: "C18.7 乙状结肠癌", relationRole: "来源卡", sourceStatus: "合并后作废" }
    ],
    logs: [
      { time: "2026-06-03 14:06", user: "陈芳", action: "快速合并", note: "低风险重复记录按规则自动合并。" },
      { time: "2026-06-03 14:08", user: "系统", action: "来源留痕", note: "生成合并来源关系 REL-RC-202606-002。" }
    ]
  },
  {
    key: "3",
    mergedNo: "HN-2026-000185",
    relationNo: "REL-RC-202606-003",
    patientName: "赵海",
    idCard: "411002198103094210",
    region: "许昌市魏都区",
    diagnosis: "C22.0 肝细胞癌",
    diagnosisDate: "2026-05-28",
    reportOrg: "许昌市人民医院",
    relationType: "人工合并",
    relationStatus: "待复核",
    sourceCount: 2,
    mergeDate: "2026-06-09",
    mergeUser: "李文华",
    mergeBasis: "姓名、联系电话、常住地址一致；病理号一致",
    mergedCard: { no: "HN-2026-000185", cardType: "合并卡", reportOrg: "许昌市人民医院", reportDate: "2026-06-04", diagnosisDate: "2026-05-28", diagnosis: "C22.0 肝细胞癌", status: "待省级终审", quality: "通过" },
    sources: [
      { no: "HN-2026-000185", cardType: "原始卡", reportOrg: "许昌市人民医院", reportDate: "2026-06-04", diagnosisDate: "2026-05-28", diagnosis: "C22.0 肝细胞癌", relationRole: "目标卡", sourceStatus: "保留" },
      { no: "HN-2026-000209", cardType: "补充卡", reportOrg: "许昌市中心医院", reportDate: "2026-06-06", diagnosisDate: "2026-05-30", diagnosis: "C22.0 肝细胞癌", relationRole: "来源卡", sourceStatus: "合并待审核" }
    ],
    logs: [
      { time: "2026-06-09 10:32", user: "李文华", action: "对比合并", note: "人工确认同一次发病，提交省级终审。" }
    ]
  }
];

const multiPrimaryRows = [
  {
    key: "1",
    relationNo: "MP-202606-001",
    patientName: "王建国",
    idCard: "410302195501182414",
    region: "洛阳市涧西区",
    mainNo: "HN-2026-000184",
    mainDiagnosis: "C34.1 上叶肺癌",
    relatedCount: 2,
    markDate: "2026-06-06",
    markUser: "李文华",
    relationStatus: "有效",
    restoreAllowed: true,
    basis: "同一患者存在肺癌与结肠癌两张不同部位报告卡，人工复核后标记为多原发。",
    cards: [
      { no: "HN-2026-000184", cardType: "多原发主卡", reportOrg: "洛阳市中心医院", diagnosisDate: "2026-05-26", site: "C34.1 上叶肺癌", morphology: "8140/3", status: "正式", relationRole: "主卡" },
      { no: "HN-2026-000211", cardType: "多原发关联卡", reportOrg: "河南科技大学一附院", diagnosisDate: "2026-05-29", site: "C18.7 乙状结肠癌", morphology: "8140/3", status: "待省级终审", relationRole: "关联卡" }
    ],
    logs: [
      { time: "2026-06-06 15:20", user: "李文华", action: "标记多原发", note: "发病部位不同，保留两张报告卡，不进行重卡合并。" }
    ]
  },
  {
    key: "2",
    relationNo: "MP-202606-002",
    patientName: "陈国强",
    idCard: "410103195802073016",
    region: "郑州市二七区",
    mainNo: "HN-2025-008432",
    mainDiagnosis: "C16.9 胃恶性肿瘤",
    relatedCount: 2,
    markDate: "2026-05-30",
    markUser: "周敏",
    relationStatus: "已还原",
    restoreAllowed: false,
    basis: "曾按多原发暂存，后经病理复核确认为同一原发转移记录，已恢复标记前状态。",
    cards: [
      { no: "HN-2025-008432", cardType: "原始卡", reportOrg: "郑大一附院", diagnosisDate: "2025-12-15", site: "C16.9 胃恶性肿瘤", morphology: "8140/3", status: "死亡待更新", relationRole: "原主卡" },
      { no: "HN-2026-000236", cardType: "原始卡", reportOrg: "郑州市第六人民医院", diagnosisDate: "2026-02-12", site: "C78.7 肝继发恶性肿瘤", morphology: "8140/6", status: "已还原", relationRole: "原关联卡" }
    ],
    logs: [
      { time: "2026-05-30 11:12", user: "周敏", action: "快速还原", note: "恢复为标记前状态，保留多原发关系操作日志。" }
    ]
  }
];

const autoDedupParamRows = [
  { key: "1", paramType: "字段组合", name: "身份证姓名出生日期组合", selectedContent: "身份证号码、姓名、出生日期", logicType: "与", status: "启用", description: "用于报告卡和发病人口基础身份精确匹配。", updateTime: "2026-06-06" },
  { key: "2", paramType: "字段组合", name: "姓名联系电话地址组合", selectedContent: "姓名、联系电话、常住地址", logicType: "与", status: "启用", description: "身份证缺失时用于人工复核前的疑似匹配。", updateTime: "2026-06-05" },
  { key: "3", paramType: "查重条件", name: "报告卡有效唯一卡查重", selectedContent: "身份证姓名出生日期组合、发病部位组合", logicType: "与", status: "启用", description: "针对原始卡、合并卡、多原发卡进行重卡分析。", updateTime: "2026-06-04" },
  { key: "4", paramType: "查重条件", name: "发病人口手动查重", selectedContent: "身份证姓名出生日期组合、姓名联系电话地址组合", logicType: "或", status: "停用", description: "用于发病人口信息查重手工分析。", updateTime: "2026-05-30" }
];

const mergeFieldParamRows = [
  { key: "1", fieldCode: "diagnosisDate", fieldName: "确诊日期", priority: "确诊日期早", status: "启用", description: "重复卡合并时默认取较早确诊日期。", updateTime: "2026-06-01" },
  { key: "2", fieldCode: "followupDate", fieldName: "最后随访日期", priority: "更新随访", status: "启用", description: "取最近一次有效随访信息。", updateTime: "2026-06-01" },
  { key: "3", fieldCode: "diagnosisBasis", fieldName: "诊断依据", priority: "诊断级别", status: "启用", description: "病理诊断优先于临床诊断。", updateTime: "2026-05-28" },
  { key: "4", fieldCode: "reportOrg", fieldName: "报告单位", priority: "医院等级", status: "启用", description: "同等条件下优先取等级更高医院。", updateTime: "2026-05-28" },
  { key: "5", fieldCode: "morphologyCode", fieldName: "形态学编码", priority: "形态学编码", status: "启用", description: "优先取非空且编码更完整的形态学编码。", updateTime: "2026-05-20" },
  { key: "6", fieldCode: "householdAddress", fieldName: "户籍详细地址", priority: "户籍详细等级", status: "停用", description: "历史规则，停用后不参与自动合并默认值。", updateTime: "2026-05-10" }
];

const incidencePopulationRows = [
  { key: "1", personNo: "P-HN-410105-000128", registerNo: "HN-2026-000183", name: "张秀兰", sex: "女", birthDate: "1963-03-12", idCard: "410105196303124826", phone: "138****6218", householdRegion: "郑州市金水区", currentRegion: "郑州市金水区", ownerRegion: "郑州市金水区", address: "文化路街道农业路社区12号", cancerRelated: "是", reportCards: 2, updateDate: "2026-06-08", status: "有效" },
  { key: "2", personNo: "P-HN-411002-000219", registerNo: "HN-2026-000185", name: "赵海", sex: "男", birthDate: "1981-03-09", idCard: "411002198103094210", phone: "136****9021", householdRegion: "许昌市魏都区", currentRegion: "许昌市魏都区", ownerRegion: "许昌市魏都区", address: "文峰街道建设路88号", cancerRelated: "是", reportCards: 1, updateDate: "2026-06-07", status: "有效" },
  { key: "3", personNo: "P-HN-410302-000098", registerNo: "HN-2026-000184", name: "王建国", sex: "男", birthDate: "1955-01-18", idCard: "410302195501182414", phone: "137****4018", householdRegion: "洛阳市涧西区", currentRegion: "洛阳市涧西区", ownerRegion: "洛阳市涧西区", address: "天津路街道联盟路", cancerRelated: "是", reportCards: 2, updateDate: "2026-06-06", status: "有效" },
  { key: "4", personNo: "P-HN-410105-000246", registerNo: "-", name: "刘建设", sex: "男", birthDate: "1976-11-03", idCard: "410105197611032711", phone: "139****8321", householdRegion: "郑州市金水区", currentRegion: "郑州市二七区", ownerRegion: "郑州市金水区", address: "丰产路街道经三路", cancerRelated: "否", reportCards: 0, updateDate: "2026-05-29", status: "待调整" }
];

const spatialAddressRows = [
  {
    key: "1",
    personNo: "P-HN-410105-000128",
    registerNo: "HN-2026-000183",
    name: "张秀兰",
    idCard: "410105196303124826",
    region: "郑州市金水区",
    currentAddress: "郑州市金水区文化路街道农业路社区12号",
    latestDate: "2026-06-08",
    addressCount: 3,
    histories: [
      { key: "1-1", addressType: "常住地址", region: "郑州市金水区", address: "文化路街道农业路社区12号", longitude: "113.665218", latitude: "34.791508", startDate: "2026-06-08", source: "报告卡登记", latest: true },
      { key: "1-2", addressType: "户籍地址", region: "郑州市金水区", address: "文化路街道农业路社区", longitude: "113.664900", latitude: "34.791100", startDate: "2025-12-18", source: "历史报告卡", latest: false },
      { key: "1-3", addressType: "常住地址", region: "郑州市金水区", address: "文化路办农业路", longitude: "113.664100", latitude: "34.790800", startDate: "2024-10-09", source: "随访更新", latest: false }
    ]
  },
  {
    key: "2",
    personNo: "P-HN-411002-000219",
    registerNo: "HN-2026-000185",
    name: "赵海",
    idCard: "411002198103094210",
    region: "许昌市魏都区",
    currentAddress: "许昌市魏都区文峰街道建设路88号",
    latestDate: "2026-06-07",
    addressCount: 2,
    histories: [
      { key: "2-1", addressType: "常住地址", region: "许昌市魏都区", address: "文峰街道建设路88号", longitude: "113.830452", latitude: "34.026193", startDate: "2026-06-07", source: "发病人口维护", latest: true },
      { key: "2-2", addressType: "户籍地址", region: "许昌市魏都区", address: "文峰办建设路", longitude: "113.829900", latitude: "34.025800", startDate: "2026-05-30", source: "HIS上传", latest: false }
    ]
  },
  {
    key: "3",
    personNo: "P-HN-410302-000098",
    registerNo: "HN-2026-000184",
    name: "王建国",
    idCard: "410302195501182414",
    region: "洛阳市涧西区",
    currentAddress: "洛阳市涧西区天津路街道联盟路",
    latestDate: "2026-06-06",
    addressCount: 2,
    histories: [
      { key: "3-1", addressType: "常住地址", region: "洛阳市涧西区", address: "天津路街道联盟路", longitude: "112.399451", latitude: "34.658137", startDate: "2026-06-06", source: "报告卡登记", latest: true },
      { key: "3-2", addressType: "户籍地址", region: "洛阳市涧西区", address: "天津路办联盟路", longitude: "112.398900", latitude: "34.657900", startDate: "2026-05-26", source: "人口导入", latest: false }
    ]
  }
];

const analyticsAgeRows = [
  { key: "1", ageGroup: "0-14", lung: 6, breast: 2, stomach: 3, liver: 4, colorectal: 2, death: 4, population: 182000 },
  { key: "2", ageGroup: "15-44", lung: 28, breast: 34, stomach: 19, liver: 16, colorectal: 22, death: 31, population: 468000 },
  { key: "3", ageGroup: "45-54", lung: 76, breast: 69, stomach: 58, liver: 46, colorectal: 51, death: 82, population: 286000 },
  { key: "4", ageGroup: "55-64", lung: 132, breast: 88, stomach: 96, liver: 82, colorectal: 79, death: 148, population: 238000 },
  { key: "5", ageGroup: "65-74", lung: 168, breast: 71, stomach: 123, liver: 108, colorectal: 117, death: 209, population: 176000 },
  { key: "6", ageGroup: "75+", lung: 142, breast: 39, stomach: 101, liver: 94, colorectal: 96, death: 232, population: 98000 }
];

const analyticsMonthRows = [
  { key: "1", name: "金水区", jan: 92, feb: 84, mar: 118, apr: 126, may: 139, jun: 147, complete: 96.4 },
  { key: "2", name: "二七区", jan: 68, feb: 61, mar: 73, apr: 86, may: 91, jun: 98, complete: 94.8 },
  { key: "3", name: "许昌市人民医院", jan: 42, feb: 38, mar: 51, apr: 49, may: 57, jun: 64, complete: 92.6 },
  { key: "4", name: "河南省人民医院", jan: 76, feb: 69, mar: 82, apr: 88, may: 94, jun: 101, complete: 97.1 },
  { key: "5", name: "周敏", jan: 31, feb: 28, mar: 35, apr: 41, may: 43, jun: 47, complete: 95.2 },
  { key: "6", name: "李文华", jan: 58, feb: 49, mar: 63, apr: 70, may: 74, jun: 79, complete: 96.8 }
];

const analyticsSiteRows = [
  { key: "1", site: "肺", incidence: 552, death: 238, rate: 48.3, deathRate: 20.8 },
  { key: "2", site: "乳腺", incidence: 303, death: 62, rate: 26.5, deathRate: 5.4 },
  { key: "3", site: "胃", incidence: 400, death: 176, rate: 35.0, deathRate: 15.4 },
  { key: "4", site: "肝", incidence: 350, death: 194, rate: 30.6, deathRate: 17.0 },
  { key: "5", site: "结直肠", incidence: 367, death: 121, rate: 32.1, deathRate: 10.6 }
];

const crossReportRows = [
  { key: "1", item: "肺", male: 318, female: 234, total: 552 },
  { key: "2", item: "乳腺", male: 2, female: 301, total: 303 },
  { key: "3", item: "胃", male: 245, female: 155, total: 400 },
  { key: "4", item: "肝", male: 231, female: 119, total: 350 },
  { key: "5", item: "结直肠", male: 206, female: 161, total: 367 }
];

const analyticsMultiRows = [
  { key: "1", region: "郑州市金水区", org: "河南省人民医院", sex: "女", ageGroup: "55-64", site: "乳腺", diagnosisYear: "2026", cases: 126, deaths: 18, rate: 34.6, complete: 97.4 },
  { key: "2", region: "郑州市二七区", org: "郑州市中心医院", sex: "男", ageGroup: "65-74", site: "肺", diagnosisYear: "2026", cases: 142, deaths: 61, rate: 52.8, complete: 95.9 },
  { key: "3", region: "许昌市魏都区", org: "许昌市人民医院", sex: "男", ageGroup: "55-64", site: "胃", diagnosisYear: "2026", cases: 83, deaths: 29, rate: 38.2, complete: 93.7 },
  { key: "4", region: "洛阳市涧西区", org: "洛阳市中心医院", sex: "女", ageGroup: "45-54", site: "结直肠", diagnosisYear: "2026", cases: 71, deaths: 17, rate: 29.5, complete: 96.2 }
];

const baseRows = [
  { key: "1", code: "410105", name: "金水区", year: "2025", sex: "女", ageGroup: "60-64", population: "54,218", status: "启用" },
  { key: "2", code: "410103", name: "二七区", year: "2025", sex: "男", ageGroup: "65-69", population: "48,906", status: "启用" }
];

const regionRows = [
  { key: "1", code: "410000", name: "河南省", level: "省", parent: "-", sort: 1, status: "启用", mergeStatus: "未撤并", mergeTo: "-", description: "省级行政区划" },
  { key: "2", code: "410100", name: "郑州市", level: "市", parent: "河南省", sort: 1, status: "启用", mergeStatus: "未撤并", mergeTo: "-", description: "地市级行政区划" },
  { key: "3", code: "410105", name: "金水区", level: "县/区", parent: "郑州市", sort: 1, status: "启用", mergeStatus: "未撤并", mergeTo: "-", description: "县区级行政区划" },
  { key: "4", code: "410105001", name: "文化路街道", level: "乡镇/办事处", parent: "金水区", sort: 3, status: "启用", mergeStatus: "未撤并", mergeTo: "-", description: "街道办事处" },
  { key: "5", code: "410105001004", name: "农业路社区", level: "社区/村委会", parent: "文化路街道", sort: 4, status: "启用", mergeStatus: "未撤并", mergeTo: "-", description: "社区村委会" }
];

const organizationRows = [
  { key: "1", code: "410000-DJ-001", name: "河南省肿瘤登记中心", region: "河南省", level: "省级", type: "登记中心", phone: "0371-6590****", address: "郑州市金水区", status: "启用", mergeStatus: "未撤并", mergeTo: "-", description: "省级登记中心" },
  { key: "2", code: "410100-DJ-001", name: "郑州市肿瘤登记办公室", region: "郑州市", level: "地市级", type: "登记中心", phone: "0371-6788****", address: "郑州市中原区", status: "启用", mergeStatus: "未撤并", mergeTo: "-", description: "地市登记中心" },
  { key: "3", code: "410105-DJ-001", name: "金水区疾控中心", region: "郑州市金水区", level: "县区级", type: "登记中心", phone: "0371-6382****", address: "金水区丰产路", status: "启用", mergeStatus: "未撤并", mergeTo: "-", description: "县区登记中心" },
  { key: "4", code: "410105-HI-001", name: "河南省人民医院", region: "郑州市金水区", level: "省级", type: "医疗单位", phone: "0371-6558****", address: "金水区纬五路", status: "启用", mergeStatus: "未撤并", mergeTo: "-", description: "报告医疗机构" }
];

const populationMatrixRows = [
  { key: "1", region: "中国标准人口", year: "2000", sex: "合计", age0: 18420, age15: 36580, age45: 24930, age65: 11240, total: 91170, status: "启用" },
  { key: "2", region: "郑州市金水区", year: "2026", sex: "男", age0: 48200, age15: 156400, age45: 98400, age65: 53200, total: 356200, status: "启用" },
  { key: "3", region: "郑州市金水区", year: "2026", sex: "女", age0: 45600, age15: 162100, age45: 103600, age65: 58900, total: 370200, status: "启用" },
  { key: "4", region: "许昌市魏都区", year: "2026", sex: "男", age0: 31600, age15: 91800, age45: 65400, age65: 33600, total: 222400, status: "启用" }
];

const deathPopulationRows = [
  { key: "1", region: "郑州市金水区", year: "2026", sex: "男", age0: 8, age15: 32, age45: 118, age65: 286, total: 444, status: "启用" },
  { key: "2", region: "郑州市金水区", year: "2026", sex: "女", age0: 6, age15: 24, age45: 96, age65: 244, total: 370, status: "启用" },
  { key: "3", region: "许昌市魏都区", year: "2026", sex: "男", age0: 5, age15: 21, age45: 76, age65: 188, total: 290, status: "启用" }
];

const regularDictionaryRows = [
  { key: "1", dictName: "性别", code: "1", name: "男", sort: 1, status: "启用", mergeStatus: "未撤并", mergeCode: "-", remark: "报告卡基础字段" },
  { key: "2", dictName: "性别", code: "2", name: "女", sort: 2, status: "启用", mergeStatus: "未撤并", mergeCode: "-", remark: "报告卡基础字段" },
  { key: "3", dictName: "诊断依据", code: "7", name: "病理学诊断", sort: 7, status: "启用", mergeStatus: "未撤并", mergeCode: "-", remark: "优先级较高" },
  { key: "4", dictName: "报告卡状态", code: "20", name: "退回修正", sort: 20, status: "启用", mergeStatus: "未撤并", mergeCode: "-", remark: "审核流程状态" }
];

const anatomyDictionaryRows = [
  { key: "1", siteName: "呼吸系统", siteCode: "C34", subCode: "C34.1", subName: "上叶肺癌", sort: 1, status: "启用", mergeStatus: "未撤并", mergeCode: "-", remark: "肺恶性肿瘤亚部位" },
  { key: "2", siteName: "消化系统", siteCode: "C16", subCode: "C16.9", subName: "胃恶性肿瘤", sort: 2, status: "启用", mergeStatus: "未撤并", mergeCode: "-", remark: "胃部位" },
  { key: "3", siteName: "乳腺", siteCode: "C50", subCode: "C50.9", subName: "乳腺恶性肿瘤", sort: 3, status: "启用", mergeStatus: "未撤并", mergeCode: "-", remark: "乳腺部位" }
];

const pathologyDictionaryRows = [
  { key: "1", morphCode: "8140/3", morphName: "腺癌", behavior: "3", grade: "恶性", relatedSite: "消化系统", sort: 1, status: "启用", mergeStatus: "未撤并", mergeCode: "-", remark: "常见形态学编码" },
  { key: "2", morphCode: "8500/3", morphName: "浸润性导管癌", behavior: "3", grade: "恶性", relatedSite: "乳腺", sort: 2, status: "启用", mergeStatus: "未撤并", mergeCode: "-", remark: "乳腺常见病理" },
  { key: "3", morphCode: "8070/3", morphName: "鳞状细胞癌", behavior: "3", grade: "恶性", relatedSite: "呼吸系统", sort: 3, status: "启用", mergeStatus: "未撤并", mergeCode: "-", remark: "肺部常见病理" }
];

const logicDictionaryRows = [
  { key: "1", dictName: "性别与部位逻辑", condition: "部位=C50 乳腺", result: "性别=女", status: "启用", mergeStatus: "未撤并", mergeCode: "-", remark: "男性乳腺癌需警告复核" },
  { key: "2", dictName: "年龄与部位逻辑", condition: "年龄<15 且 部位=C61", result: "提示错误", status: "启用", mergeStatus: "未撤并", mergeCode: "-", remark: "儿童前列腺癌逻辑校验" },
  { key: "3", dictName: "死亡与随访逻辑", condition: "接触状态=死亡", result: "死亡日期必填", status: "启用", mergeStatus: "未撤并", mergeCode: "-", remark: "随访死亡必填规则" }
];

const customConditionRows = [
  { key: "1", name: "身份证与出生日期一致", expression: "idCard.birthDate == birthDate", variable: "身份证号,出生日期", operator: "等于", reserved: "身份证解析日期", checkStatus: "错误", createDate: "2026-05-20", status: "启用", remark: "不一致时返回错误" },
  { key: "2", name: "死亡日期不得早于诊断日期", expression: "deathDate >= diagnosisDate", variable: "死亡日期,诊断日期", operator: "大于等于", reserved: "日期比较", checkStatus: "错误", createDate: "2026-05-22", status: "启用", remark: "死因上传和死亡补录共用" },
  { key: "3", name: "地址编码完整性", expression: "regionLevel >= configuredLevel", variable: "行政区划", operator: "大于等于", reserved: "配置层级", checkStatus: "警告", createDate: "2026-06-01", status: "启用", remark: "不足层级时提示警告" }
];

const auditRows = [
  { key: "1", time: "2026-06-05 11:42", user: "张建国", action: "导出", content: "报告卡查询导出 128 条", result: "成功" },
  { key: "2", time: "2026-06-05 11:08", user: "周敏", action: "退回", content: "HN-2026-000183 地址编码缺失", result: "成功" },
  { key: "3", time: "2026-06-05 10:55", user: "王医生", action: "提交", content: "新增报告卡 HN-2026-000185", result: "成功" }
];

const systemUserRows = [
  { key: "1", username: "hn_admin", name: "张建国", sex: "男", region: "河南省", org: "河南省肿瘤登记中心", department: "登记管理科", phone: "138****1001", email: "admin@hncr.org", role: "省级管理员", status: "启用", address: "郑州市金水区" },
  { key: "2", username: "zz_reg", name: "李文华", sex: "男", region: "郑州市", org: "郑州市肿瘤登记办公室", department: "数据科", phone: "139****1002", email: "zz@hncr.org", role: "地市登记员", status: "启用", address: "郑州市中原区" },
  { key: "3", username: "js_audit", name: "周敏", sex: "女", region: "郑州市金水区", org: "金水区疾控中心", department: "慢病科", phone: "137****1003", email: "js@hncr.org", role: "县区审核员", status: "启用", address: "金水区丰产路" },
  { key: "4", username: "hnsrmyy", name: "王医生", sex: "男", region: "郑州市金水区", org: "河南省人民医院", department: "病案室", phone: "136****1004", email: "hospital@hncr.org", role: "医疗机构填报员", status: "停用", address: "金水区纬五路" }
];

const systemRoleRows = [
  { key: "1", code: "ROLE_PROVINCE", mark: "province", name: "省级管理员", sort: 1, permissionUrl: "/province", status: "启用", description: "省级全量菜单和数据范围" },
  { key: "2", code: "ROLE_CITY", mark: "city", name: "地市登记员", sort: 2, permissionUrl: "/city", status: "启用", description: "地市及下辖区县数据" },
  { key: "3", code: "ROLE_COUNTY", mark: "county", name: "县区审核员", sort: 3, permissionUrl: "/county", status: "启用", description: "县区审核和维护权限" },
  { key: "4", code: "ROLE_HOSPITAL", mark: "hospital", name: "医疗机构填报员", sort: 4, permissionUrl: "/hospital", status: "启用", description: "本机构报告卡和随访填报" }
];

const onlineUserRows = [
  { key: "1", username: "hn_admin", name: "张建国", region: "河南省", org: "河南省肿瘤登记中心", loginTime: "2026-06-10 09:12", ip: "10.41.0.12", status: "在线" },
  { key: "2", username: "zz_reg", name: "李文华", region: "郑州市", org: "郑州市肿瘤登记办公室", loginTime: "2026-06-10 09:35", ip: "10.41.1.18", status: "在线" },
  { key: "3", username: "js_audit", name: "周敏", region: "郑州市金水区", org: "金水区疾控中心", loginTime: "2026-06-10 10:02", ip: "10.41.3.22", status: "在线" }
];

const backupRows = [
  { key: "1", taskNo: "BAK-20260610-001", backupType: "业务库全量备份", scope: "河南省", startTime: "2026-06-10 02:00", fileSize: "8.6GB", result: "成功", operator: "系统任务", status: "已完成" },
  { key: "2", taskNo: "BAK-20260609-001", backupType: "报告卡增量备份", scope: "郑州市", startTime: "2026-06-09 02:00", fileSize: "1.3GB", result: "成功", operator: "系统任务", status: "已完成" },
  { key: "3", taskNo: "BAK-20260608-002", backupType: "字典配置备份", scope: "全省", startTime: "2026-06-08 18:30", fileSize: "126MB", result: "成功", operator: "张建国", status: "已完成" }
];

const consultRows = [
  { key: "1", title: "2026年河南省肿瘤登记年报数据上报通知", subtitle: "请各登记处按要求完成年度数据核验", category: "通知公告", author: "张建国", source: "河南省肿瘤登记中心", status: "已发布", top: "是", publishDate: "2026-06-08", views: 386, scope: "本级及下级", content: "请各地市在规定时间内完成年度发病、死亡、随访数据核验，并按系统提示处理重卡和完整性问题。" },
  { key: "2", title: "肿瘤登记编码培训课件下载", subtitle: "ICD-10 与 ICD-O-3 编码常见问题", category: "培训资料", author: "李文华", source: "郑州市登记办公室", status: "草稿", top: "否", publishDate: "-", views: 0, scope: "本级及下级", content: "培训材料包含部位编码、形态学编码、行为学编码及常见校验错误处理说明。" },
  { key: "3", title: "国家癌症中心数据质控规则更新说明", subtitle: "涉及完整性、逻辑一致性和死亡更新", category: "政策文件", author: "周敏", source: "国家癌症中心", status: "已发布", top: "否", publishDate: "2026-06-01", views: 214, scope: "本级及下级", content: "本次规则更新重点关注身份证一致性、诊断日期与死亡日期逻辑、地址编码完整性等内容。" }
];

const consultCategoryRows = [
  { key: "1", name: "通知公告", sort: 1, status: "启用", homeShow: "是", mergeStatus: "未撤并", mergeTo: "-", remark: "首页默认显示，面向本级及下级用户" },
  { key: "2", name: "培训资料", sort: 2, status: "启用", homeShow: "是", mergeStatus: "未撤并", mergeTo: "-", remark: "用于发布培训课件、操作手册和视频资料" },
  { key: "3", name: "政策文件", sort: 3, status: "启用", homeShow: "否", mergeStatus: "未撤并", mergeTo: "-", remark: "用于发布国家、省级政策与质控规范" },
  { key: "4", name: "历史公告", sort: 9, status: "停用", homeShow: "否", mergeStatus: "已撤并", mergeTo: "通知公告", remark: "旧栏目，内容已并入通知公告" }
];

const cockpitTrendRows = [
  { label: "1月", report: 812, audit: 744, death: 96 },
  { label: "2月", report: 768, audit: 701, death: 88 },
  { label: "3月", report: 936, audit: 884, death: 112 },
  { label: "4月", report: 1048, audit: 986, death: 126 },
  { label: "5月", report: 1136, audit: 1072, death: 143 },
  { label: "6月", report: 1214, audit: 1156, death: 151 }
];

const cockpitRegionRows = [
  { key: "1", region: "郑州市", reports: 1826, rate: "97.2%", quality: "96.5%", duplicate: 18, deaths: 216 },
  { key: "2", region: "洛阳市", reports: 1264, rate: "95.8%", quality: "94.9%", duplicate: 13, deaths: 164 },
  { key: "3", region: "许昌市", reports: 986, rate: "94.6%", quality: "93.7%", duplicate: 9, deaths: 118 },
  { key: "4", region: "南阳市", reports: 1418, rate: "96.1%", quality: "95.4%", duplicate: 15, deaths: 173 },
  { key: "5", region: "新乡市", reports: 874, rate: "93.9%", quality: "92.8%", duplicate: 7, deaths: 101 }
];

const cockpitCancerRows = [
  { label: "肺", value: 552 },
  { label: "胃", value: 400 },
  { label: "结直肠", value: 367 },
  { label: "肝", value: 350 },
  { label: "乳腺", value: 303 }
];

function statusTag(value) {
  const colorMap = {
    正式: "success",
    通过: "success",
    已入库: "success",
    已交付: "success",
    已作废: "error",
    已还原: "success",
    有效: "success",
    重卡合并: "processing",
    人工合并: "warning",
    保留: "success",
    合并后作废: "default",
    合并待审核: "warning",
    启用: "success",
    停用: "default",
    多原发主卡: "processing",
    多原发关联卡: "warning",
    待物理删除: "warning",
    已完成: "success",
    已确认: "success",
    审批通过: "success",
    运行中: "processing",
    正常: "success",
    已发布: "success",
    已上报: "success",
    已归档: "default",
    已生成: "processing",
    已补录: "success",
    已驳回: "error",
    匹配成功: "success",
    匹配存疑: "warning",
    未匹配: "error",
    疑似重复: "error",
    疑似多原发: "warning",
    需人工复核: "processing",
    疑似同一人: "error",
    需人工核实: "processing",
    同一人多原发: "warning",
    待合并: "warning",
    待生成: "warning",
    待下载: "warning",
    待补全: "warning",
    待补录: "warning",
    待处理: "processing",
    待确认: "warning",
    待标记: "warning",
    待协查: "processing",
    待发布: "warning",
    草稿: "default",
    已合并: "success",
    已撤并: "default",
    未撤并: "success",
    转协查: "processing",
    已排除: "default",
    逾期: "error",
    待县区审核: "warning",
    待地市复审: "warning",
    待省级终审: "warning",
    待脱敏确认: "warning",
    待交付授权: "warning",
    待审批: "warning",
    待我审批: "warning",
    抄送我的: "processing",
    转办给我: "processing",
    开启: "success",
    关闭: "default",
    可交付: "success",
    生效中: "processing",
    待逐条处理: "processing",
    死亡待更新: "warning",
    警告: "processing",
    高风险: "warning",
    阻断: "error",
    错误: "error",
    校验失败: "error",
    退回修正: "error",
    退回补充: "error",
    已达上限: "warning",
    异常告警: "error"
  };
  return <Tag color={colorMap[value] || "default"}>{value}</Tag>;
}

function App() {
  const [roleKey, setRoleKey] = useState("province");
  const [selectedKey, setSelectedKey] = useState("dashboard_01");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContext, setModalContext] = useState(null);
  const [detail, setDetail] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();

  const currentRole = roles[roleKey];
  const allowedModules = currentRole.modules;
  const visibleModules = useMemo(
    () => functionMenu.filter((item) => allowedModules.includes(item.id) && (item.id !== "approval" || currentRole.approvalEnabled)),
    [allowedModules, currentRole.approvalEnabled]
  );
  const featureMap = useMemo(() => {
    const map = new Map();
    functionMenu.forEach((module) => module.features.forEach((feature) => map.set(feature.id, { ...feature, module })));
    return map;
  }, []);
  const current = featureMap.get(selectedKey) || featureMap.get(visibleModules[0]?.features[0]?.id);
  const openKeys = visibleModules.map((item) => item.id);

  const menuItems = visibleModules.map((module) => ({
    key: module.id,
    icon: moduleIcons[module.id] || <MedicineBoxOutlined />,
    label: module.name,
    children: module.features.map((feature) => ({
      key: feature.id,
      label: feature.name
    }))
  }));

  function changeRole(value) {
    const nextModules = roles[value].modules;
    const nextVisibleModules = functionMenu.filter((item) => nextModules.includes(item.id) && (item.id !== "approval" || roles[value].approvalEnabled));
    const currentModule = featureMap.get(selectedKey)?.module?.id;
    setRoleKey(value);
    if (!nextVisibleModules.some((module) => module.id === currentModule)) {
      const firstModule = nextVisibleModules[0];
      setSelectedKey(firstModule?.features[0]?.id || "dashboard_01");
    }
    message.success(`已切换为${roles[value].label}`);
  }

  function showDetail(action, row, feature) {
    setDetail({ action, row, feature });
    setDrawerOpen(true);
  }

  function openBusinessModal(action, feature) {
    setModalContext({ action, feature });
    setModalOpen(true);
  }

  function submitCard() {
    form
      .validateFields()
      .then(() => {
        setModalOpen(false);
        form.resetFields();
        message.success(successMessage(modalContext));
      })
      .catch(() => message.error(errorMessage(modalContext)));
  }

  function handleUserMenu({ key }) {
    if (key === "profile") setProfileOpen(true);
    if (key === "password") setPasswordOpen(true);
    if (key?.startsWith("role:")) changeRole(key.replace("role:", ""));
    if (key === "logout") message.success("已退出当前登录，会话和在线用户状态已更新");
  }

  function submitPassword() {
    passwordForm.validateFields().then(() => {
      setPasswordOpen(false);
      passwordForm.resetFields();
      message.success("密码已修改，请使用新密码重新登录");
    }).catch(() => message.error("请补全原密码、新密码和确认新密码"));
  }

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: "#2f6bed",
          borderRadius: 8,
          fontFamily: 'Arial, "Microsoft YaHei", sans-serif'
        }
      }}
    >
      <Layout className="app-layout">
        <Sider width={350} className="app-sider">
          <div className="brand-row">
            <div className="brand-icon">
              <SafetyCertificateOutlined />
            </div>
            <Title level={3}>肿瘤登记信息平台</Title>
          </div>
          <Select
            value={roleKey}
            onChange={changeRole}
            className="role-select"
            options={Object.entries(roles).map(([key, role]) => ({ value: key, label: `${role.label} - ${role.name}` }))}
          />
          <Text className="scope-text">{roles[roleKey].scope}</Text>
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            defaultOpenKeys={openKeys}
            items={menuItems}
            onClick={({ key }) => {
              setSelectedKey(key);
            }}
            className="side-menu"
          />
        </Sider>
        <Layout>
          <Header className="app-header">
            <Breadcrumb
              items={[
                { title: <HomeOutlined /> },
                { title: current?.module?.name || "平台" },
                { title: current?.name || "首页概览" }
              ]}
            />
            <Space size={14} className="header-actions">
              <Badge dot offset={[-2, 4]}>
                <Button type="text" shape="circle" className="notice-button" icon={<BellOutlined />} />
              </Badge>
              <Dropdown
                trigger={["click"]}
                menu={{
                  onClick: handleUserMenu,
                  items: [
                    { key: "profile", label: "查看资料" },
                    { key: "password", label: "修改密码" },
                    { type: "divider" },
                    { key: "role:province", label: "切换为省级管理员" },
                    { key: "role:city", label: "切换为地市登记员" },
                    { key: "role:county", label: "切换为县区审核员" },
                    { key: "role:hospital", label: "切换为医疗机构填报员" },
                    { key: "role:jiangxi", label: "切换为江西省管理员" },
                    { key: "role:share", label: "切换为数据共享审批员" },
                    { type: "divider" },
                    { key: "logout", label: "退出登录", danger: true }
                  ]
                }}
              >
                <Button type="text" className="user-menu">
                  <Avatar size={36} className="user-avatar">
                    {roles[roleKey].name.slice(0, 1)}
                  </Avatar>
                  <div className="user-meta">
                    <Text strong>{roles[roleKey].name}</Text>
                    <Text type="secondary">{roles[roleKey].label}</Text>
                  </div>
                </Button>
              </Dropdown>
            </Space>
          </Header>
          <Content className="app-content">
            <div
              onClick={(event) => {
                const businessButton = event.target.closest("[data-business-action]");
                if (businessButton) openBusinessModal(businessButton.dataset.businessAction, current);
              }}
            >
              <FeaturePage
                feature={current}
                role={roles[roleKey]}
                openBusinessModal={openBusinessModal}
                showDetail={showDetail}
              />
            </div>
          </Content>
        </Layout>
      </Layout>

      <Modal
        title={modalTitle(modalContext)}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={submitCard}
        okText={modalOkText(modalContext)}
        cancelText="取消"
        width={modalWidth(modalContext)}
      >
        <BusinessForm context={modalContext} form={form} />
      </Modal>

      <Drawer title={detail?.action || "详情"} open={drawerOpen} onClose={() => setDrawerOpen(false)} width={560}>
        <DrawerContent detail={detail} />
      </Drawer>
      <Modal title="个人资料" open={profileOpen} onCancel={() => setProfileOpen(false)} footer={<Button type="primary" onClick={() => setProfileOpen(false)}>关闭</Button>} width={620}>
        <Descriptions bordered column={1} size="small">
          <Descriptions.Item label="姓名">{roles[roleKey].name}</Descriptions.Item>
          <Descriptions.Item label="省份">{roles[roleKey].province}</Descriptions.Item>
          <Descriptions.Item label="当前角色">{roles[roleKey].label}</Descriptions.Item>
          <Descriptions.Item label="数据范围">{roles[roleKey].scope}</Descriptions.Item>
          <Descriptions.Item label="审批模式">{roles[roleKey].approvalEnabled ? "已开启" : "已关闭"}</Descriptions.Item>
          <Descriptions.Item label="菜单权限">{visibleModules.map((item) => item.name).join("、")}</Descriptions.Item>
        </Descriptions>
      </Modal>
      <Modal title="修改密码" open={passwordOpen} onCancel={() => setPasswordOpen(false)} onOk={submitPassword} okText="保存" cancelText="取消" width={520} destroyOnHidden>
        <Form form={passwordForm} layout="vertical">
          <Form.Item name="oldPassword" label="原密码" rules={[{ required: true, message: "请输入原密码" }]}><Input.Password /></Form.Item>
          <Form.Item name="newPassword" label="新密码" rules={[{ required: true, message: "请输入新密码" }]}><Input.Password placeholder="不少于8位，包含数字、字母和特殊字符" /></Form.Item>
          <Form.Item name="confirmPassword" label="确认新密码" rules={[{ required: true, message: "请确认新密码" }]}><Input.Password /></Form.Item>
        </Form>
      </Modal>
    </ConfigProvider>
  );
}

function FeaturePage({ feature, role, openBusinessModal, showDetail }) {
  if (feature?.id === "dashboard_01") {
    return <LeadershipDashboard role={role} />;
  }
  if (feature?.id === "cards_01") {
    return <ReportCardRegistration role={role} />;
  }
  if (feature?.id === "cards_02") {
    return <ReportCardMaintenance />;
  }
  if (feature?.id === "cards_03") {
    return <ReportCardQuery role={role} />;
  }
  if (feature?.id === "cards_05") {
    return <VoidCardManagement role={role} />;
  }
  if (feature?.id === "consult_01") {
    return <ConsultPublishPage role={role} />;
  }
  if (feature?.id === "consult_02") {
    return <ConsultMaintenancePage role={role} />;
  }
  if (feature?.id === "consult_03") {
    return <ConsultCategoryPage role={role} />;
  }
  if (feature?.id === "followup_01") {
    return <FollowupInfoManagement role={role} />;
  }
  if (feature?.id === "followup_02") {
    return <BatchFollowupManagement role={role} />;
  }
  if (feature?.id === "followup_03") {
    return <FollowupPlanManagement role={role} />;
  }
  if (feature?.id === "followup_04") {
    return <DeathInfoManagement role={role} />;
  }
  if (feature?.id === "followup_05") {
    return <CauseSupplementManagement role={role} />;
  }
  if (feature?.id === "duplicate_01") {
    return <TumorDuplicateReportCheck role={role} />;
  }
  if (feature?.id === "duplicate_02") {
    return <PopulationDuplicateCheck role={role} />;
  }
  if (feature?.id === "duplicate_03") {
    return <DuplicateRelationView role={role} />;
  }
  if (feature?.id === "duplicate_05") {
    return <MultiPrimaryRelationView role={role} />;
  }
  if (feature?.id === "duplicate_06") {
    return <AutoDedupParameterManagement role={role} />;
  }
  if (feature?.id === "duplicate_07") {
    return <MergeFieldParameterManagement role={role} />;
  }
  if (feature?.id === "base_01") {
    return <IncidencePopulationManagement role={role} />;
  }
  if (feature?.id === "base_02") {
    return <SpatialAddressManagement role={role} />;
  }
  if (feature?.id === "regionOrg_01") {
    return <AdministrativeRegionManagement role={role} />;
  }
  if (feature?.id === "regionOrg_02") {
    return <OrganizationManagement role={role} />;
  }
  if (feature?.id === "regionOrg_03" || feature?.id === "regionOrg_04" || feature?.id === "regionOrg_05") {
    return <PopulationMatrixManagement feature={feature} role={role} />;
  }
  if (feature?.module?.id === "dict") {
    return <DictionaryManagement feature={feature} role={role} />;
  }
  if (feature?.module?.id === "system") {
    return <SystemSettingsWorkbench feature={feature} role={role} />;
  }
  if (feature?.module?.id === "exchange") {
    return <DataInterfaceWorkbench feature={feature} role={role} />;
  }
  if (feature?.module?.id === "analytics") {
    return <AnalyticsWorkbench feature={feature} role={role} />;
  }
  if (feature?.module?.id === "annual") {
    return <AnnualReportWorkbench feature={feature} role={role} />;
  }
  if (feature?.module?.id === "sharing") {
    return <DataSharingWorkbench feature={feature} role={role} />;
  }
  if (feature?.module?.id === "quality") {
    return <AutomationRulesWorkbench feature={feature} role={role} />;
  }
  if (feature?.module?.id === "audit") {
    return <AuditManagementWorkbench feature={feature} role={role} />;
  }
  if (feature?.module?.id === "approval") {
    return <ApprovalWorkbench feature={feature} role={role} />;
  }

  const moduleId = feature?.module?.id;
  const data = getRows(feature);
  const rows = data.rows;
  const columns = data.columns.map((column) => ({
    ...column,
    render: column.dataIndex === "status" || column.dataIndex === "quality" ? (value) => statusTag(value) : column.render
  }));
  columns.push({
    title: "操作",
    width: 230,
    fixed: "right",
    render: (_, row) => (
      <Space>
        {data.actions.map((action) => (
          <Button key={action} type="link" onClick={() => showDetail(action, row, feature)}>
            {action}
          </Button>
        ))}
      </Space>
    )
  });

  return (
    <div>
      <Row gutter={16} className="stat-row">
        <Col span={6}>
          <Card>
            <Statistic title="今日上报" value={286} suffix="条" prefix={<UploadOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="待处理" value={role.label === "医疗机构填报员" ? 3 : 43} suffix="条" prefix={<TeamOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="质控异常" value={17} suffix="条" prefix={<AuditOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="重卡疑似" value={9} suffix="组" prefix={<DiffOutlined />} />
          </Card>
        </Col>
      </Row>

      <Card className="search-card">
        <Flex justify="space-between" align="center" gap={12} className="search-line">
          <Space size={10} className="search-controls">
            <Input prefix={<SearchOutlined />} placeholder={data.placeholder} className="search-input" />
            {data.filters.map((filter) => (
              <Select key={filter.key} defaultValue={filter.options[0].value} className="filter-select" options={filter.options} />
            ))}
            <Button type="primary" icon={<SearchOutlined />} onClick={() => message.success("查询完成")}>
              搜索
            </Button>
          </Space>
          <Space className="action-controls">
            {data.toolbarActions.map((action) => (
              <Button key={action} data-business-action={action}>
                {action}
              </Button>
            ))}
            <Button type="primary" icon={<PlusOutlined />} data-business-action={data.primary}>
              {data.primary}
            </Button>
          </Space>
        </Flex>
      </Card>

      <Card className="table-card">
        <Table
          columns={columns}
          dataSource={rows}
          pagination={false}
          locale={{
            emptyText: <Empty description="当前筛选条件下暂无数据，请调整条件或新增记录。" />
          }}
          scroll={{ x: 1120 }}
        />
        <Flex justify="space-between" align="center" className="pagination-row">
          <Text type="secondary">共 {rows.length} 条记录，第 1 / 1 页</Text>
          <Pagination current={1} total={rows.length} pageSize={10} />
        </Flex>
      </Card>
    </div>
  );
}

function LeadershipDashboard({ role }) {
  const [form] = Form.useForm();
  const [period, setPeriod] = useState("月度");
  const [query, setQuery] = useState({ period: "月度", year: "2026", month: "6月", region: role?.scope || "河南省" });
  const periodLabel = query.period === "年度" ? query.year : query.period === "季度" ? `${query.year} ${query.quarter || "第二季度"}` : `${query.year} ${query.month || "6月"}`;
  const reportTotal = query.period === "年度" ? 22186 : query.period === "季度" ? 6284 : 1214;
  const auditRate = query.period === "年度" ? 96.8 : query.period === "季度" ? 96.1 : 95.2;
  const qualityRate = query.period === "年度" ? 94.9 : query.period === "季度" ? 94.2 : 93.8;
  const deathTotal = query.period === "年度" ? 2746 : query.period === "季度" ? 731 : 151;
  const regionColumns = [
    { title: "地市", dataIndex: "region", width: 100 },
    { title: "报告数", dataIndex: "reports", width: 90 },
    { title: "审核率", dataIndex: "rate", width: 90 },
    { title: "质控通过率", dataIndex: "quality", width: 110 },
    { title: "疑似重卡", dataIndex: "duplicate", width: 90 },
    { title: "死亡更新", dataIndex: "deaths", width: 90 }
  ];
  function runQuery() {
    const values = form.getFieldsValue();
    setQuery(values);
    message.success(`驾驶舱已切换至${values.period}统计口径`);
  }
  return (
    <div className="cockpit-page">
      <Card className="cockpit-hero">
        <Flex justify="space-between" align="center" gap={16} className="cockpit-hero-inner">
          <div>
            <Title level={3}>肿瘤登记领导驾驶舱</Title>
            <Text>当前口径：{periodLabel} / {query.region || role?.scope} / 正式有效数据</Text>
          </div>
          <Form form={form} layout="inline" initialValues={{ period: "月度", year: "2026", quarter: "第二季度", month: "6月", region: "河南省" }}>
            <Form.Item name="period"><Select className="filter-select small" onChange={(value) => setPeriod(value)} options={[{ value: "月度" }, { value: "季度" }, { value: "年度" }]} /></Form.Item>
            <Form.Item name="year"><Select className="filter-select small" options={[{ value: "2026" }, { value: "2025" }, { value: "2024" }]} /></Form.Item>
            {period === "季度" && <Form.Item name="quarter"><Select className="filter-select" options={[{ value: "第一季度" }, { value: "第二季度" }, { value: "第三季度" }, { value: "第四季度" }]} /></Form.Item>}
            {period === "月度" && <Form.Item name="month"><Select className="filter-select small" options={[{ value: "1月" }, { value: "2月" }, { value: "3月" }, { value: "4月" }, { value: "5月" }, { value: "6月" }]} /></Form.Item>}
            <Form.Item name="region"><Select className="filter-select" options={[{ value: "河南省" }, { value: "郑州市" }, { value: "洛阳市" }, { value: "许昌市" }, { value: "南阳市" }]} /></Form.Item>
            <Form.Item><Button type="primary" icon={<SearchOutlined />} onClick={runQuery}>刷新</Button></Form.Item>
          </Form>
        </Flex>
      </Card>

      <Row gutter={16} className="cockpit-kpi-row">
        <Col span={6}><Card><Statistic title="报告卡总量" value={reportTotal} suffix="张" prefix={<FileTextOutlined />} /><Text type="secondary">较上期 +8.6%</Text></Card></Col>
        <Col span={6}><Card><Statistic title="审核完成率" value={auditRate} suffix="%" prefix={<CheckCircleOutlined />} /><Text type="secondary">待审核 43 条</Text></Card></Col>
        <Col span={6}><Card><Statistic title="质控通过率" value={qualityRate} suffix="%" prefix={<SafetyCertificateOutlined />} /><Text type="secondary">错误 17 条，警告 126 条</Text></Card></Col>
        <Col span={6}><Card><Statistic title="死亡更新数" value={deathTotal} suffix="条" prefix={<CalendarOutlined />} /><Text type="secondary">待补录 18 条</Text></Card></Col>
      </Row>

      <Row gutter={16} className="cockpit-grid-row">
        <Col span={14}>
          <Card title="上报与审核趋势" className="analytics-chart-card cockpit-card">
            <DashboardTrendChart rows={cockpitTrendRows} />
          </Card>
        </Col>
        <Col span={10}>
          <Card title="重点癌种构成" className="analytics-chart-card cockpit-card">
            <SimplePieList data={cockpitCancerRows} />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} className="cockpit-grid-row">
        <Col span={14}>
          <Card title="地市数据总览" className="table-card cockpit-card">
            <Table columns={regionColumns} dataSource={cockpitRegionRows} pagination={false} size="small" />
          </Card>
        </Col>
        <Col span={10}>
          <Card title="质量与待办预警" className="analytics-chart-card cockpit-card">
            <div className="cockpit-alert-list">
              <div><Tag color="error">高</Tag><Text strong>郑州市金水区</Text><Text type="secondary"> 身份证与出生日期不一致 7 条</Text></div>
              <div><Tag color="warning">中</Tag><Text strong>许昌市魏都区</Text><Text type="secondary"> 死亡日期早于诊断日期 2 条</Text></div>
              <div><Tag color="processing">待办</Tag><Text strong>省级终审</Text><Text type="secondary"> 待处理报告卡 43 条</Text></div>
              <div><Tag color="default">资讯</Tag><Text strong>通知公告</Text><Text type="secondary"> 年报数据上报通知已发布</Text></div>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={16} className="cockpit-grid-row">
        <Col span={8}>
          <Card title="区域热度" className="analytics-chart-card cockpit-card">
            <SimpleBarChart data={cockpitRegionRows.map((row) => ({ label: row.region, value: row.reports }))} suffix="张" />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="业务构成" className="analytics-chart-card cockpit-card">
            <SimplePieList data={[{ label: "发病报告", value: 1214 }, { label: "随访更新", value: 486 }, { label: "死亡更新", value: 151 }, { label: "信息协查", value: 38 }]} />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="领导关注指标" className="analytics-chart-card cockpit-card">
            <div className="cockpit-focus-list">
              <div><Text>报告完整率</Text><strong>95.5%</strong></div>
              <div><Text>重卡处理率</Text><strong>91.2%</strong></div>
              <div><Text>随访完成率</Text><strong>88.6%</strong></div>
              <div><Text>接口入库成功率</Text><strong>96.9%</strong></div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

function DashboardTrendChart({ rows }) {
  const max = Math.max(...rows.flatMap((item) => [item.report, item.audit, item.death]), 1);
  return (
    <div className="dashboard-trend-chart">
      {rows.map((row) => (
        <div className="trend-column" key={row.label}>
          <div className="trend-bars">
            <span className="trend-bar report" style={{ height: `${Math.max(12, row.report / max * 100)}%` }} />
            <span className="trend-bar audit" style={{ height: `${Math.max(12, row.audit / max * 100)}%` }} />
            <span className="trend-bar death" style={{ height: `${Math.max(8, row.death / max * 100)}%` }} />
          </div>
          <Text>{row.label}</Text>
        </div>
      ))}
      <div className="trend-legend">
        <span><i className="legend-report" />上报</span>
        <span><i className="legend-audit" />审核</span>
        <span><i className="legend-death" />死亡</span>
      </div>
    </div>
  );
}

function cloneInitialValues(sourceRow, role) {
  if (!sourceRow) {
    return {
      registerNo: "HN-2026-000186",
      reportOrg: "河南省人民医院",
      reportDoctor: "王医生",
      reportDate: "2026-06-05",
      behavior: "3",
      grade: "2"
    };
  }
  const diagnosisCode = sourceRow.diagnosis?.slice(0, 5);
  const primarySite = diagnosisCode?.startsWith("C50") ? "breast" : diagnosisCode?.startsWith("C18") ? "colon" : diagnosisCode?.startsWith("C22") ? "liver" : "lung";
  return {
    sourceRegisterNo: sourceRow.no,
    cloneReason: "原卡信息调整",
    registerNo: `HN-2026-CL${sourceRow.key.padStart(3, "0")}`,
    name: sourceRow.name,
    idCard: sourceRow.idCard,
    sex: sourceRow.sex,
    age: sourceRow.age,
    nation: "汉族",
    occupation: sourceRow.age >= 60 ? "离退休人员" : "工人",
    domicile: sourceRow.region.includes("洛阳") ? "河南省/洛阳市/涧西区/天津路街道/厂前社区" : "河南省/郑州市/金水区/丰产路街道/红旗社区",
    residence: "同户籍地址",
    detailAddress: `${sourceRow.region} 登记地址待核实`,
    primarySite,
    subSite: diagnosisCode,
    pathology: sourceRow.diagnosis?.includes("腺") ? "adenocarcinoma" : sourceRow.diagnosis?.includes("乳腺") ? "ductal" : "unknown",
    behavior: "3",
    grade: "2",
    icd10: diagnosisCode,
    icdo3: sourceRow.diagnosis?.includes("乳腺") ? "8500/3" : "8000/3",
    diagnosisBasis: "病理",
    diagnosisDate: sourceRow.diagnosisDate,
    treatment: "手术",
    reportOrg: role?.label === "医疗机构填报员" ? "河南省人民医院" : "河南省肿瘤登记中心",
    reportDoctor: role?.name || "张建国",
    reportDate: "2026-06-08"
  };
}

function ReportCardRegistration({ mode = "create", sourceRow, role, onSubmitComplete }) {
  const [form] = Form.useForm();
  const [duplicateOpen, setDuplicateOpen] = useState(false);
  const [lastValues, setLastValues] = useState(null);
  const contactStatus = Form.useWatch("contactStatus", form);
  const primarySite = Form.useWatch("primarySite", form);
  const isClone = mode === "clone";
  const initialValues = cloneInitialValues(sourceRow, role);

  const subSiteOptions = {
    lung: [
      { value: "C34.1", label: "上叶，肺 C34.1" },
      { value: "C34.3", label: "下叶，肺 C34.3" },
      { value: "C34.9", label: "肺，NOS C34.9" }
    ],
    breast: [
      { value: "C50.4", label: "乳房外上象限 C50.4" },
      { value: "C50.9", label: "乳房，NOS C50.9" }
    ],
    colon: [
      { value: "C18.7", label: "乙状结肠 C18.7" },
      { value: "C18.9", label: "结肠，NOS C18.9" }
    ],
    liver: [
      { value: "C22.0", label: "肝细胞癌 C22.0" },
      { value: "C22.9", label: "肝，NOS C22.9" }
    ]
  };

  function parseIdCard(value) {
    const id = value?.trim();
    if (!/^\d{17}[0-9Xx]$/.test(id)) return;
    const birth = `${id.slice(6, 10)}-${id.slice(10, 12)}-${id.slice(12, 14)}`;
    const sex = Number(id.slice(16, 17)) % 2 === 1 ? "男" : "女";
    const age = new Date().getFullYear() - Number(id.slice(6, 10));
    form.setFieldsValue({ sex, birthday: birth, age });
    message.success("已根据身份证自动带出性别、出生日期和年龄");
  }

  function updateCodes(changedValues, allValues) {
    const hasTumorChange = ["primarySite", "subSite", "behavior", "grade", "pathology"].some((key) => Object.prototype.hasOwnProperty.call(changedValues, key));
    if (!hasTumorChange) return;
    const icd10 = allValues.subSite || "";
    const morphology = allValues.pathology === "adenocarcinoma" ? "8140" : allValues.pathology === "squamous" ? "8070" : allValues.pathology === "ductal" ? "8500" : "8000";
    const behavior = allValues.behavior || "3";
    form.setFieldsValue({
      icd10,
      icdo3: icd10 ? `${morphology}/${behavior}` : undefined
    });
  }

  function saveDraft() {
    message.success(isClone ? "克隆草稿已暂存，来源关系已保留" : "草稿已暂存，可在报告卡维护中继续编辑");
  }

  function submit() {
    form
      .validateFields()
      .then((values) => {
        setLastValues(values);
        setDuplicateOpen(true);
      })
      .catch(() => message.error("提交失败：请补全必填项并检查逻辑校验"));
  }

  function confirmSubmit() {
    setDuplicateOpen(false);
    if (role?.approvalEnabled) {
      Modal.success({
        title: `${isClone ? "克隆报告卡" : "报告卡"}已提交审批`,
        content: (
          <Descriptions bordered size="small" column={1}>
            <Descriptions.Item label="登记编号">{lastValues?.registerNo || "JX-2026-000053"}</Descriptions.Item>
            <Descriptions.Item label="下一节点">县区初审</Descriptions.Item>
            <Descriptions.Item label="接收区划">南昌市东湖区</Descriptions.Item>
            <Descriptions.Item label="接收角色">县区报告卡审核员</Descriptions.Item>
            <Descriptions.Item label="可处理账号">县区报告卡审核员账号池</Descriptions.Item>
          </Descriptions>
        )
      });
    } else {
      message.success(`${isClone ? "克隆报告卡" : "报告卡"}已提交，登记编号 ${lastValues?.registerNo || "HN-2026-000186"}，按河南原路径进入报告卡维护和查重流程`);
    }
    onSubmitComplete?.();
  }

  return (
    <div className="report-card-page">
      <Alert
        type="info"
        showIcon
        className="compact-alert"
        message={isClone ? "克隆报卡编辑" : "报告卡登记"}
        description={isClone ? "基于原报告卡创建一张新的草稿卡，患者和诊断信息默认带入，报告单位、报告医师、报告日期按当前用户默认填充；提交后重新执行校验、审核和查重。" : role?.approvalEnabled ? "江西审批已开启：提交后不需要手动选择审批人，系统将按上级区划和县区报告卡审核员角色池派发。" : "按河南 V3.0 录入习惯组织为发病基本信息、肿瘤报告信息、随访报告信息三部分；提交时执行必填、逻辑和重卡校验。"}
      />
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onValuesChange={(changed, allValues) => updateCodes(changed, allValues)}
      >
        {isClone && (
          <Card title="克隆来源信息" className="form-section" size="small">
            <Row gutter={12}>
              <Col span={6}>
                <Form.Item name="sourceRegisterNo" label="来源登记编号">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="来源患者">
                  <Input disabled value={`${sourceRow?.name || ""} / ${sourceRow?.idCard || ""}`} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="来源诊断">
                  <Input disabled value={sourceRow?.diagnosis} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name="cloneReason" label="克隆原因" rules={[{ required: true, message: "请选择克隆原因" }]}>
                  <Select options={[{ value: "原卡信息调整" }, { value: "疑似多原发补充" }, { value: "合并后重建新卡" }, { value: "上级登记中心修正" }]} />
                </Form.Item>
              </Col>
            </Row>
          </Card>
        )}
        <Card title="发病基本信息" className="form-section" size="small">
          <Row gutter={12}>
            <Col span={6}>
              <Form.Item name="registerNo" label="登记编号">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="name" label="姓名" rules={[{ required: true, message: "请输入姓名" }]}>
                <Input placeholder="张秀兰" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="idCard" label="身份证号" rules={[{ required: true, message: "请输入身份证号" }, { pattern: /^\d{17}[0-9Xx]$/, message: "身份证号必须为 18 位" }]}>
                <Input placeholder="41010519630215482X" onBlur={(event) => parseIdCard(event.target.value)} />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="sex" label="性别" rules={[{ required: true, message: "请选择性别" }]}>
                <Select options={[{ value: "男" }, { value: "女" }]} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="birthday" label="出生日期" rules={[{ required: true, message: "请输入出生日期" }]}>
                <Input placeholder="1963-02-15" />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="age" label="年龄" rules={[{ required: true, message: "请输入年龄" }]}>
                <InputNumber min={0} max={130} className="full" />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item name="nation" label="民族">
                <Select showSearch options={[{ value: "汉族" }, { value: "回族" }, { value: "蒙古族" }]} />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item name="occupation" label="职业">
                <Select showSearch options={[{ value: "农民" }, { value: "工人" }, { value: "离退休人员" }, { value: "医务人员" }]} />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="phone" label="联系电话">
                <Input placeholder="138****" />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item name="contactName" label="联系人">
                <Input />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item name="contactPhone" label="联系人电话">
                <Input />
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item name="domicile" label="户籍地址" rules={[{ required: true, message: "请选择户籍地址" }]}>
                <Select showSearch placeholder="请选择到社区/村委会" options={[{ value: "河南省/郑州市/金水区/丰产路街道/红旗社区" }, { value: "河南省/洛阳市/涧西区/天津路街道/厂前社区" }]} />
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item name="residence" label="常住地址">
                <Select showSearch placeholder="请选择到社区/村委会" options={[{ value: "同户籍地址" }, { value: "河南省/郑州市/金水区/文化路街道/农业路社区" }]} />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="detailAddress" label="详细地址">
                <Input placeholder="门牌号、楼栋、单元等" />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card title="肿瘤报告信息" className="form-section" size="small">
          <Row gutter={12}>
            <Col span={6}>
              <Form.Item name="primarySite" label="发病部位" rules={[{ required: true, message: "请选择发病部位" }]}>
                <Select
                  showSearch
                  placeholder="选择后联动亚部位"
                  options={[
                    { value: "lung", label: "肺" },
                    { value: "breast", label: "乳腺" },
                    { value: "colon", label: "结肠" },
                    { value: "liver", label: "肝" }
                  ]}
                  onChange={() => form.setFieldsValue({ subSite: undefined, icd10: undefined, icdo3: undefined })}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="subSite" label="亚部位" rules={[{ required: true, message: "请选择亚部位" }]}>
                <Select showSearch disabled={!primarySite} options={subSiteOptions[primarySite] || []} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="pathology" label="病理类型" rules={[{ required: true, message: "请选择病理类型" }]}>
                <Select showSearch options={[{ value: "adenocarcinoma", label: "腺癌" }, { value: "squamous", label: "鳞状细胞癌" }, { value: "ductal", label: "导管癌" }, { value: "unknown", label: "恶性肿瘤，NOS" }]} />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item name="behavior" label="行为">
                <Select options={[{ value: "2", label: "原位" }, { value: "3", label: "恶性" }]} />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item name="grade" label="分级">
                <Select options={[{ value: "1" }, { value: "2" }, { value: "3" }, { value: "9" }]} />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item name="icd10" label="ICD-10" rules={[{ required: true, message: "系统未生成 ICD-10" }]}>
                <Input placeholder="自动生成" />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item name="icdo3" label="ICD-O-3" rules={[{ required: true, message: "系统未生成 ICD-O-3" }]}>
                <Input placeholder="自动生成" />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item name="diagnosisBasis" label="诊断依据" rules={[{ required: true, message: "请选择诊断依据" }]}>
                <Select options={[{ value: "病理" }, { value: "临床" }, { value: "影像" }, { value: "死亡补发" }]} />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item name="diagnosisDate" label="确诊日期" rules={[{ required: true, message: "请输入确诊日期" }]}>
                <Input placeholder="2026-06-01" />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="treatment" label="治疗信息">
                <Select options={[{ value: "手术" }, { value: "放疗" }, { value: "化疗" }, { value: "未治疗" }]} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="reportOrg" label="报告单位" rules={[{ required: true, message: "请输入报告单位" }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item name="reportDoctor" label="报告医师" rules={[{ required: true, message: "请输入报告医师" }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item name="reportDate" label="报告日期" rules={[{ required: true, message: "请输入报告日期" }]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card title="随访报告信息" className="form-section" size="small">
          <Row gutter={12}>
            <Col span={5}>
              <Form.Item
                name="lastContactDate"
                label="最后接触日期"
                dependencies={["contactStatus"]}
                rules={[({ getFieldValue }) => ({ validator: (_, value) => (getFieldValue("contactStatus") && !value ? Promise.reject(new Error("状态已填写，日期必填")) : Promise.resolve()) })]}
              >
                <Input placeholder="2026-06-05" />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item
                name="contactStatus"
                label="最后接触状态"
                dependencies={["lastContactDate"]}
                rules={[({ getFieldValue }) => ({ validator: (_, value) => (getFieldValue("lastContactDate") && !value ? Promise.reject(new Error("日期已填写，状态必填")) : Promise.resolve()) })]}
              >
                <Select allowClear options={[{ value: "存活" }, { value: "死亡" }, { value: "失访" }]} />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item name="deathDate" label="死亡日期" rules={[{ required: contactStatus === "死亡", message: "死亡状态下必填" }]}>
                <Input disabled={contactStatus !== "死亡"} placeholder="2026-06-05" />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item name="deathCause" label="死亡原因" rules={[{ required: contactStatus === "死亡", message: "死亡状态下必填" }]}>
                <Select disabled={contactStatus !== "死亡"} options={[{ value: "肿瘤相关死亡" }, { value: "心脑血管疾病" }, { value: "其他原因" }]} />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="deathPlace" label="死亡地点" rules={[{ required: contactStatus === "死亡", message: "死亡状态下必填" }]}>
                <Select disabled={contactStatus !== "死亡"} options={[{ value: "医院" }, { value: "家中" }, { value: "其他" }]} />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item name="survivalMonths" label="存活月数">
                <InputNumber min={0} className="full" />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item name="followDoctor" label="随访医师">
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <div className="form-actions">
          <Space>
            <Button onClick={saveDraft}>暂存</Button>
            <Button onClick={() => form.resetFields()}>重置</Button>
            <Button type="primary" onClick={submit}>{isClone ? "提交克隆卡" : "提交"}</Button>
          </Space>
        </div>
      </Form>

      <Modal title="疑似重卡提示" open={duplicateOpen} onCancel={() => setDuplicateOpen(false)} footer={<Space><Button onClick={() => setDuplicateOpen(false)}>返回修改</Button><Button type="primary" onClick={confirmSubmit}>继续提交</Button></Space>}>
        <Alert type="warning" showIcon message="系统发现 1 条疑似重卡" description="HN-2025-009812，姓名张秀兰，身份证号与当前报告卡一致，发病部位同为乳腺。请确认是否继续提交为待审核状态。" />
        <Descriptions bordered column={1} size="small" style={{ marginTop: 16 }}>
          <Descriptions.Item label="当前记录">{lastValues?.registerNo || "HN-2026-000186"} / {lastValues?.icd10 || "C50.9"} 肿瘤报告卡</Descriptions.Item>
          <Descriptions.Item label="疑似记录">{sourceRow?.no || "HN-2025-009812"} / {sourceRow?.diagnosis || "C50.4 乳腺恶性肿瘤"}</Descriptions.Item>
          {isClone && <Descriptions.Item label="来源关系">当前新卡由 {sourceRow?.no} 克隆生成，提交后保留来源登记编号和克隆原因。</Descriptions.Item>}
          <Descriptions.Item label="处理建议">如为同一次肿瘤报告，后续在重卡管理中对比合并；如疑似多原发，请由登记中心复核。</Descriptions.Item>
        </Descriptions>
      </Modal>
    </div>
  );
}

function ReportCardMaintenance() {
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [query, setQuery] = useState({});
  const [detailRow, setDetailRow] = useState(null);
  const [editRow, setEditRow] = useState(null);
  const [deleteRow, setDeleteRow] = useState(null);

  const filteredRows = records.filter((row) => {
    if (query.region && query.region !== "全部区划" && !row.region.includes(query.region)) return false;
    if (query.quality && query.quality !== "全部状态" && row.quality !== query.quality) return false;
    if (query.reportType && query.reportType !== "全部类型" && row.reportType !== query.reportType) return false;
    if (query.keyword) {
      const field = query.searchType || "登记编号";
      const value = query.keyword.trim();
      if (field === "登记编号" && !row.no.includes(value)) return false;
      if (field === "姓名" && !row.name.includes(value)) return false;
      if (field === "身份证号" && !row.idCard.includes(value)) return false;
    }
    return true;
  });

  function doSearch() {
    setQuery(form.getFieldsValue());
    message.success("查询完成");
  }

  function resetSearch() {
    form.resetFields();
    setQuery({});
  }

  function openEdit(row) {
    setEditRow(row);
    editForm.setFieldsValue(row);
  }

  function saveEdit() {
    editForm
      .validateFields()
      .then(() => {
        setEditRow(null);
        message.success("报告卡修改已保存，并重新执行逻辑校验");
      })
      .catch(() => message.error("保存失败：请补全必填项"));
  }

  function confirmDelete() {
    setDeleteRow(null);
    message.success("报告卡已逻辑删除，可在作废卡管理中恢复或物理删除");
  }

  const columns = [
    {
      title: "登记编号",
      dataIndex: "no",
      width: 160,
      fixed: "left",
      render: (value, row) => (
        <Button type="link" className="link-cell" onClick={() => setDetailRow(row)}>
          {value}
        </Button>
      )
    },
    { title: "姓名", dataIndex: "name", width: 90 },
    { title: "性别", dataIndex: "sex", width: 70 },
    { title: "年龄", dataIndex: "age", width: 70 },
    { title: "身份证号", dataIndex: "idCard", width: 190 },
    { title: "行政区划", dataIndex: "region", width: 150 },
    { title: "报告单位", dataIndex: "org", width: 170 },
    { title: "诊断信息", dataIndex: "diagnosis", width: 210 },
    { title: "报卡类型", dataIndex: "reportType", width: 100 },
    { title: "报告日期", dataIndex: "reportDate", width: 115 },
    { title: "校验状态", dataIndex: "quality", width: 110, render: statusTag },
    { title: "审核状态", dataIndex: "status", width: 120, render: statusTag },
    {
      title: "操作",
      width: 160,
      fixed: "right",
      render: (_, row) => (
        <Space size={4}>
          <Button type="link" onClick={() => openEdit(row)}>
            编辑
          </Button>
          <Button type="link" danger onClick={() => setDeleteRow(row)}>
            删除
          </Button>
        </Space>
      )
    }
  ];

  return (
    <div className="maintenance-page">
      <Card className="search-card maintenance-search">
        <Form form={form} layout="inline" initialValues={{ region: "全部区划", quality: "全部状态", reportType: "全部类型", dateType: "报告日期", searchType: "登记编号" }}>
          <Form.Item name="region">
            <Select className="filter-select" options={[{ value: "全部区划" }, { value: "郑州市" }, { value: "洛阳市" }, { value: "许昌市" }, { value: "南昌市" }]} />
          </Form.Item>
          <Form.Item name="quality">
            <Select className="filter-select" options={[{ value: "全部状态" }, { value: "通过" }, { value: "警告" }, { value: "错误" }]} />
          </Form.Item>
          <Form.Item name="reportType">
            <Select className="filter-select" options={[{ value: "全部类型" }, { value: "原始卡" }, { value: "补报卡" }, { value: "合并卡" }, { value: "多原发卡" }]} />
          </Form.Item>
          <Form.Item name="dateType">
            <Select className="filter-select" options={[{ value: "报告日期" }, { value: "诊断日期" }, { value: "录入日期" }]} />
          </Form.Item>
          <Form.Item name="dateRange">
            <Input className="date-range-input" placeholder="2026-06-01 至 2026-06-30" />
          </Form.Item>
          <Form.Item name="searchType">
            <Select className="filter-select small" options={[{ value: "登记编号" }, { value: "姓名" }, { value: "身份证号" }]} />
          </Form.Item>
          <Form.Item name="keyword">
            <Input prefix={<SearchOutlined />} className="keyword-input" placeholder="请输入检索内容" />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" icon={<SearchOutlined />} onClick={doSearch}>
                查询
              </Button>
              <Button onClick={resetSearch}>重置</Button>
              <Button type="primary" icon={<PlusOutlined />} onClick={() => message.info("新增入口沿用报告卡登记表单")}>
                添加
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>

      <Card className="table-card">
        <Table columns={columns} dataSource={filteredRows} pagination={false} scroll={{ x: 1500 }} />
        <Flex justify="space-between" align="center" className="pagination-row">
          <Text type="secondary">共 {filteredRows.length} 条记录，第 1 / 1 页</Text>
          <Pagination current={1} total={filteredRows.length} pageSize={10} />
        </Flex>
      </Card>

      <Drawer title="报告卡详细信息" open={Boolean(detailRow)} onClose={() => setDetailRow(null)} width={720}>
        {detailRow && (
          <>
            <Descriptions bordered column={2} size="small">
              <Descriptions.Item label="登记编号">{detailRow.no}</Descriptions.Item>
              <Descriptions.Item label="报卡类型">{detailRow.reportType}</Descriptions.Item>
              <Descriptions.Item label="姓名">{detailRow.name}</Descriptions.Item>
              <Descriptions.Item label="身份证号">{detailRow.idCard}</Descriptions.Item>
              <Descriptions.Item label="性别">{detailRow.sex}</Descriptions.Item>
              <Descriptions.Item label="年龄">{detailRow.age}</Descriptions.Item>
              <Descriptions.Item label="行政区划">{detailRow.region}</Descriptions.Item>
              <Descriptions.Item label="报告单位">{detailRow.org}</Descriptions.Item>
              <Descriptions.Item label="诊断信息" span={2}>{detailRow.diagnosis}</Descriptions.Item>
              <Descriptions.Item label="诊断日期">{detailRow.diagnosisDate}</Descriptions.Item>
              <Descriptions.Item label="报告日期">{detailRow.reportDate}</Descriptions.Item>
              <Descriptions.Item label="校验状态">{statusTag(detailRow.quality)}</Descriptions.Item>
              <Descriptions.Item label="审核状态">{statusTag(detailRow.status)}</Descriptions.Item>
            </Descriptions>
            <Alert className="drawer-alert" type="info" showIcon message="操作提示" description="详情页保持只读；如需调整已录入信息，请返回列表点击编辑。所有查看和修改行为均写入报卡记录日志。" />
          </>
        )}
      </Drawer>

      <Modal title="编辑报告卡" open={Boolean(editRow)} onCancel={() => setEditRow(null)} onOk={saveEdit} okText="保存" cancelText="取消" width={820}>
        <Alert type="warning" showIcon message="编辑后将重新校验" description="保存时会重新执行必填、身份证逻辑、ICD 编码和随访死亡联动校验；正式数据修改会保留前后值。" style={{ marginBottom: 16 }} />
        <Form form={editForm} layout="vertical">
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="no" label="登记编号">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="name" label="姓名" rules={[{ required: true, message: "请输入姓名" }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="idCard" label="身份证号" rules={[{ required: true, message: "请输入身份证号" }, { pattern: /^\d{17}[0-9Xx]$/, message: "身份证号必须为 18 位" }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="region" label="行政区划" rules={[{ required: true, message: "请选择行政区划" }]}>
                <Select options={[{ value: "郑州市金水区" }, { value: "洛阳市涧西区" }, { value: "许昌市魏都区" }, { value: "南昌市东湖区" }]} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="diagnosis" label="诊断信息" rules={[{ required: true, message: "请输入诊断信息" }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="quality" label="校验状态">
                <Select options={[{ value: "通过" }, { value: "警告" }, { value: "错误" }]} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="status" label="审核状态">
                <Select options={[{ value: "待县区审核" }, { value: "待省级终审" }, { value: "正式" }, { value: "退回修正" }]} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      <Modal title="删除报告卡" open={Boolean(deleteRow)} onCancel={() => setDeleteRow(null)} onOk={confirmDelete} okText="确认删除" cancelText="取消" okButtonProps={{ danger: true }}>
        <Alert
          type="warning"
          showIcon
          message="本操作为逻辑删除"
          description={`登记编号 ${deleteRow?.no || ""} 删除后将进入作废卡管理，可由授权用户恢复；如需物理删除，需在作废卡管理中单独执行。`}
        />
      </Modal>
    </div>
  );
}

function ReportCardQuery({ role }) {
  const [form] = Form.useForm();
  const [query, setQuery] = useState({});
  const [detailRow, setDetailRow] = useState(null);
  const [exportOpen, setExportOpen] = useState(false);
  const [cloneRow, setCloneRow] = useState(null);
  const canClone = role.label !== "医疗机构填报员";

  const filteredRows = records.filter((row) => {
    if (query.region && query.region !== "全部区划" && !row.region.includes(query.region)) return false;
    if (query.quality && query.quality !== "全部状态" && row.quality !== query.quality) return false;
    if (query.reportType && query.reportType !== "全部类型" && row.reportType !== query.reportType) return false;
    if (query.keyword) {
      const field = query.searchType || "登记编号";
      const value = query.keyword.trim();
      if (field === "登记编号" && !row.no.includes(value)) return false;
      if (field === "姓名" && !row.name.includes(value)) return false;
      if (field === "身份证号" && !row.idCard.includes(value)) return false;
    }
    return true;
  });

  function doSearch() {
    setQuery(form.getFieldsValue());
    message.success("查询完成");
  }

  function resetSearch() {
    form.resetFields();
    setQuery({});
  }

  function confirmExport() {
    setExportOpen(false);
    message.success("导出任务已创建，文件生成后可在系统审计中查看下载记录");
  }

  const columns = [
    {
      title: "登记编号",
      dataIndex: "no",
      width: 160,
      fixed: "left",
      render: (value, row) => (
        <Button type="link" className="link-cell" onClick={() => setDetailRow(row)}>
          {value}
        </Button>
      )
    },
    { title: "姓名", dataIndex: "name", width: 90 },
    { title: "性别", dataIndex: "sex", width: 70 },
    { title: "年龄", dataIndex: "age", width: 70 },
    { title: "身份证号", dataIndex: "idCard", width: 190 },
    { title: "行政区划", dataIndex: "region", width: 150 },
    { title: "报告单位", dataIndex: "org", width: 170 },
    { title: "发病部位/诊断信息", dataIndex: "diagnosis", width: 220 },
    { title: "报卡类型", dataIndex: "reportType", width: 100 },
    { title: "报告日期", dataIndex: "reportDate", width: 115 },
    { title: "校验状态", dataIndex: "quality", width: 110, render: statusTag },
    { title: "重卡状态", dataIndex: "duplicateStatus", width: 110, render: (_, row) => statusTag(row.no === "HN-2026-000183" ? "疑似重卡" : "通过") },
    { title: "审核状态", dataIndex: "status", width: 120, render: statusTag },
    {
      title: "操作",
      width: canClone ? 150 : 80,
      fixed: "right",
      render: (_, row) => (
        <Space size={4}>
          <Button type="link" onClick={() => setDetailRow(row)}>
            详情
          </Button>
          {canClone && (
            <Button type="link" onClick={() => setCloneRow(row)}>
              克隆
            </Button>
          )}
        </Space>
      )
    }
  ];

  return (
    <div className="query-page">
      <Card className="search-card maintenance-search">
        <Form form={form} layout="inline" initialValues={{ region: "全部区划", quality: "全部状态", reportType: "全部类型", dateType: "报告日期", searchType: "登记编号" }}>
          <Form.Item name="region">
            <Select className="filter-select" options={[{ value: "全部区划" }, { value: "郑州市" }, { value: "洛阳市" }, { value: "许昌市" }, { value: "南昌市" }]} />
          </Form.Item>
          <Form.Item name="quality">
            <Select className="filter-select" options={[{ value: "全部状态" }, { value: "通过" }, { value: "警告" }, { value: "错误" }]} />
          </Form.Item>
          <Form.Item name="reportType">
            <Select className="filter-select" options={[{ value: "全部类型" }, { value: "原始卡" }, { value: "补报卡" }, { value: "合并卡" }, { value: "多原发卡" }]} />
          </Form.Item>
          <Form.Item name="dateType">
            <Select className="filter-select" options={[{ value: "报告日期" }, { value: "诊断日期" }, { value: "录入日期" }]} />
          </Form.Item>
          <Form.Item name="dateRange">
            <Input className="date-range-input" placeholder="2026-06-01 至 2026-06-30" />
          </Form.Item>
          <Form.Item name="searchType">
            <Select className="filter-select small" options={[{ value: "登记编号" }, { value: "姓名" }, { value: "身份证号" }]} />
          </Form.Item>
          <Form.Item name="keyword">
            <Input prefix={<SearchOutlined />} className="keyword-input" placeholder="请输入检索内容" />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" icon={<SearchOutlined />} onClick={doSearch}>
                查询
              </Button>
              <Button onClick={resetSearch}>重置</Button>
              <Button type="primary" onClick={() => setExportOpen(true)}>
                导出 Excel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>

      <Card className="table-card">
        {!canClone && (
          <Alert
            className="table-alert"
            type="info"
            showIcon
            message="当前角色仅可查询本机构数据"
            description="医疗机构填报员不显示报卡克隆操作。登记中心或辖区授权用户可基于原卡创建新的克隆草稿。"
          />
        )}
        <Table columns={columns} dataSource={filteredRows} pagination={false} scroll={{ x: 1650 }} />
        <Flex justify="space-between" align="center" className="pagination-row">
          <Text type="secondary">共 {filteredRows.length} 条记录，第 1 / 1 页</Text>
          <Pagination current={1} total={filteredRows.length} pageSize={10} />
        </Flex>
      </Card>

      <Drawer title="报告卡只读详情" open={Boolean(detailRow)} onClose={() => setDetailRow(null)} width={760}>
        {detailRow && (
          <>
            <Descriptions bordered column={2} size="small">
              <Descriptions.Item label="登记编号">{detailRow.no}</Descriptions.Item>
              <Descriptions.Item label="报卡类型">{detailRow.reportType}</Descriptions.Item>
              <Descriptions.Item label="姓名">{detailRow.name}</Descriptions.Item>
              <Descriptions.Item label="身份证号">{detailRow.idCard}</Descriptions.Item>
              <Descriptions.Item label="性别">{detailRow.sex}</Descriptions.Item>
              <Descriptions.Item label="年龄">{detailRow.age}</Descriptions.Item>
              <Descriptions.Item label="行政区划">{detailRow.region}</Descriptions.Item>
              <Descriptions.Item label="报告单位">{detailRow.org}</Descriptions.Item>
              <Descriptions.Item label="发病部位/诊断信息" span={2}>{detailRow.diagnosis}</Descriptions.Item>
              <Descriptions.Item label="诊断日期">{detailRow.diagnosisDate}</Descriptions.Item>
              <Descriptions.Item label="报告日期">{detailRow.reportDate}</Descriptions.Item>
              <Descriptions.Item label="校验状态">{statusTag(detailRow.quality)}</Descriptions.Item>
              <Descriptions.Item label="审核状态">{statusTag(detailRow.status)}</Descriptions.Item>
            </Descriptions>
            <Alert className="drawer-alert" type="info" showIcon message="查询页只读" description="报告卡查询仅提供详情查看、导出和授权克隆，不提供编辑和删除。修改请进入报告卡维护。" />
          </>
        )}
      </Drawer>

      <Modal title="导出 Excel" open={exportOpen} onCancel={() => setExportOpen(false)} onOk={confirmExport} okText="确认导出" cancelText="取消">
        <Descriptions bordered column={1} size="small">
          <Descriptions.Item label="导出范围">当前筛选条件下 {filteredRows.length} 条报告卡记录</Descriptions.Item>
          <Descriptions.Item label="脱敏规则">按当前角色权限处理身份证号、联系电话、详细地址等敏感字段</Descriptions.Item>
          <Descriptions.Item label="审计记录">导出人、时间、筛选条件、文件版本将写入系统操作日志</Descriptions.Item>
        </Descriptions>
      </Modal>

      <Drawer
        title="克隆报卡编辑"
        open={Boolean(cloneRow)}
        onClose={() => setCloneRow(null)}
        width={1180}
        className="clone-drawer"
        destroyOnClose
      >
        {cloneRow && (
          <ReportCardRegistration
            key={cloneRow.no}
            mode="clone"
            sourceRow={cloneRow}
            role={role}
            onSubmitComplete={() => setCloneRow(null)}
          />
        )}
      </Drawer>
    </div>
  );
}

function VoidCardManagement({ role }) {
  const [form] = Form.useForm();
  const [query, setQuery] = useState({});
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [detailRow, setDetailRow] = useState(null);
  const [restoreRow, setRestoreRow] = useState(null);
  const [deleteRow, setDeleteRow] = useState(null);
  const [batchRestoreOpen, setBatchRestoreOpen] = useState(false);
  const canPhysicalDelete = role.label === "省级管理员";

  const filteredRows = voidRows.filter((row) => {
    if (query.region && query.region !== "全部区划" && !row.region.includes(query.region)) return false;
    if (query.reason && query.reason !== "全部原因" && row.reason !== query.reason) return false;
    if (query.status && query.status !== "全部状态" && row.status !== query.status) return false;
    if (query.keyword) {
      const field = query.searchType || "登记编号";
      const value = query.keyword.trim();
      if (field === "登记编号" && !row.no.includes(value)) return false;
      if (field === "姓名" && !row.name.includes(value)) return false;
      if (field === "身份证号" && !row.idCard.includes(value)) return false;
    }
    return true;
  });

  function doSearch() {
    setQuery(form.getFieldsValue());
    message.success("作废卡查询完成");
  }

  function resetSearch() {
    form.resetFields();
    setQuery({});
  }

  function confirmRestore() {
    message.success(`${restoreRow?.no} 已还原至删除前状态：${restoreRow?.originalStatus}`);
    setRestoreRow(null);
  }

  function confirmPhysicalDelete() {
    message.success(`${deleteRow?.no} 已提交物理删除审批并记录审计日志`);
    setDeleteRow(null);
  }

  function confirmBatchRestore() {
    message.success(`已提交 ${selectedKeys.length} 张作废卡的批量还原任务`);
    setBatchRestoreOpen(false);
    setSelectedKeys([]);
  }

  const columns = [
    {
      title: "登记编号",
      dataIndex: "no",
      width: 160,
      fixed: "left",
      render: (value, row) => (
        <Button type="link" className="link-cell" onClick={() => setDetailRow(row)}>
          {value}
        </Button>
      )
    },
    { title: "姓名", dataIndex: "name", width: 90 },
    { title: "性别", dataIndex: "sex", width: 70 },
    { title: "年龄", dataIndex: "age", width: 70 },
    { title: "身份证号", dataIndex: "idCard", width: 190 },
    { title: "行政区划", dataIndex: "region", width: 150 },
    { title: "报告单位", dataIndex: "org", width: 170 },
    { title: "诊断信息", dataIndex: "diagnosis", width: 210 },
    { title: "报卡类型", dataIndex: "type", width: 100 },
    { title: "校验状态", dataIndex: "quality", width: 110, render: statusTag },
    { title: "原审核状态", dataIndex: "originalStatus", width: 120, render: statusTag },
    { title: "作废原因", dataIndex: "reason", width: 140 },
    { title: "作废日期", dataIndex: "date", width: 115 },
    { title: "作废人", dataIndex: "deletedBy", width: 90 },
    {
      title: "操作",
      width: 190,
      fixed: "right",
      render: (_, row) => (
        <Space size={4}>
          <Button type="link" onClick={() => setDetailRow(row)}>
            详情
          </Button>
          <Button type="link" onClick={() => setRestoreRow(row)}>
            还原
          </Button>
          <Button type="link" danger disabled={!canPhysicalDelete} onClick={() => setDeleteRow(row)}>
            物理删除
          </Button>
        </Space>
      )
    }
  ];

  return (
    <div className="void-page">
      <Card className="search-card maintenance-search">
        <Form form={form} layout="inline" initialValues={{ region: "全部区划", reason: "全部原因", status: "全部状态", dateType: "作废日期", searchType: "登记编号" }}>
          <Form.Item name="region">
            <Select className="filter-select" options={[{ value: "全部区划" }, { value: "郑州市" }, { value: "开封市" }, { value: "洛阳市" }, { value: "许昌市" }]} />
          </Form.Item>
          <Form.Item name="reason">
            <Select className="filter-select" options={[{ value: "全部原因" }, { value: "医疗机构误报" }, { value: "重卡合并后作废" }, { value: "患者信息错误" }]} />
          </Form.Item>
          <Form.Item name="status">
            <Select className="filter-select" options={[{ value: "全部状态" }, { value: "已作废" }, { value: "待物理删除" }]} />
          </Form.Item>
          <Form.Item name="dateType">
            <Select className="filter-select" options={[{ value: "作废日期" }, { value: "报告日期" }, { value: "诊断日期" }]} />
          </Form.Item>
          <Form.Item name="dateRange">
            <Input className="date-range-input" placeholder="2026-05-01 至 2026-05-31" />
          </Form.Item>
          <Form.Item name="searchType">
            <Select className="filter-select small" options={[{ value: "登记编号" }, { value: "姓名" }, { value: "身份证号" }]} />
          </Form.Item>
          <Form.Item name="keyword">
            <Input prefix={<SearchOutlined />} className="keyword-input" placeholder="请输入检索内容" />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" icon={<SearchOutlined />} onClick={doSearch}>
                查询
              </Button>
              <Button onClick={resetSearch}>重置</Button>
              <Button onClick={() => message.success(`已导出 ${filteredRows.length} 条作废卡记录，并写入审计日志`)}>
                导出 Excel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>

      <Card className="table-card">
        <Alert
          className="table-alert"
          type="warning"
          showIcon
          message="作废卡仅表示逻辑删除，仍可按权限还原"
          description={canPhysicalDelete ? "物理删除为高风险动作，需二次确认并记录审计日志；已物理删除的数据不可恢复。" : "当前角色可查看和还原授权范围内作废卡，物理删除仅省级管理员可操作。"}
        />
        <Flex justify="space-between" align="center" className="table-toolbar">
          <Text type="secondary">已选择 {selectedKeys.length} 条</Text>
          <Space>
            <Button disabled={!selectedKeys.length} onClick={() => setBatchRestoreOpen(true)}>
              批量还原
            </Button>
            <Button disabled={!selectedKeys.length || !canPhysicalDelete} danger onClick={() => message.warning("批量物理删除需逐条复核，本原型暂按单条确认展示")}>
              批量物理删除
            </Button>
          </Space>
        </Flex>
        <Table
          rowSelection={{ selectedRowKeys: selectedKeys, onChange: setSelectedKeys }}
          columns={columns}
          dataSource={filteredRows}
          pagination={false}
          scroll={{ x: 1800 }}
        />
        <Flex justify="space-between" align="center" className="pagination-row">
          <Text type="secondary">共 {filteredRows.length} 条记录，第 1 / 1 页</Text>
          <Pagination current={1} total={filteredRows.length} pageSize={10} />
        </Flex>
      </Card>

      <Drawer title="作废卡详细信息" open={Boolean(detailRow)} onClose={() => setDetailRow(null)} width={780}>
        {detailRow && (
          <>
            <Descriptions bordered column={2} size="small">
              <Descriptions.Item label="登记编号">{detailRow.no}</Descriptions.Item>
              <Descriptions.Item label="报卡类型">{detailRow.type}</Descriptions.Item>
              <Descriptions.Item label="姓名">{detailRow.name}</Descriptions.Item>
              <Descriptions.Item label="身份证号">{detailRow.idCard}</Descriptions.Item>
              <Descriptions.Item label="性别">{detailRow.sex}</Descriptions.Item>
              <Descriptions.Item label="年龄">{detailRow.age}</Descriptions.Item>
              <Descriptions.Item label="行政区划">{detailRow.region}</Descriptions.Item>
              <Descriptions.Item label="报告单位">{detailRow.org}</Descriptions.Item>
              <Descriptions.Item label="诊断信息" span={2}>{detailRow.diagnosis}</Descriptions.Item>
              <Descriptions.Item label="原审核状态">{statusTag(detailRow.originalStatus)}</Descriptions.Item>
              <Descriptions.Item label="作废状态">{statusTag(detailRow.status)}</Descriptions.Item>
              <Descriptions.Item label="作废原因">{detailRow.reason}</Descriptions.Item>
              <Descriptions.Item label="作废时间">{detailRow.deletedAt}</Descriptions.Item>
              <Descriptions.Item label="作废人">{detailRow.deletedBy}</Descriptions.Item>
              <Descriptions.Item label="校验状态">{statusTag(detailRow.quality)}</Descriptions.Item>
            </Descriptions>
            <Alert className="drawer-alert" type="info" showIcon message="还原规则" description="还原后报告卡回到删除前审核状态，并重新进入报卡维护列表；还原、物理删除和导出均写入系统操作日志。" />
          </>
        )}
      </Drawer>

      <Modal title="还原作废卡" open={Boolean(restoreRow)} onCancel={() => setRestoreRow(null)} onOk={confirmRestore} okText="确认还原" cancelText="取消">
        <Alert type="info" showIcon message="确认将作废卡恢复为有效记录" description={`登记编号 ${restoreRow?.no || ""} 将恢复到删除前状态：${restoreRow?.originalStatus || ""}。还原后可在报告卡维护中继续处理。`} />
      </Modal>

      <Modal title="物理删除确认" open={Boolean(deleteRow)} onCancel={() => setDeleteRow(null)} onOk={confirmPhysicalDelete} okText="确认提交删除审批" cancelText="取消" okButtonProps={{ danger: true }}>
        <Alert type="error" showIcon message="物理删除不可恢复" description={`登记编号 ${deleteRow?.no || ""} 将进入物理删除审批流程。正式系统应要求输入删除原因、复核人和二次口令，本原型先展示高风险确认。`} />
      </Modal>

      <Modal title="批量还原确认" open={batchRestoreOpen} onCancel={() => setBatchRestoreOpen(false)} onOk={confirmBatchRestore} okText="确认批量还原" cancelText="取消">
        <Alert type="info" showIcon message={`确认还原 ${selectedKeys.length} 张作废卡`} description="批量还原会逐条校验数据权限和原状态，失败记录保留在作废卡列表并生成处理日志。" />
      </Modal>
    </div>
  );
}

function FollowupInfoManagement({ role }) {
  const [form] = Form.useForm();
  const [followForm] = Form.useForm();
  const [query, setQuery] = useState({});
  const [detailRow, setDetailRow] = useState(null);
  const [followRow, setFollowRow] = useState(null);
  const [followMode, setFollowMode] = useState("add");
  const [deleteRow, setDeleteRow] = useState(null);
  const contactStatus = Form.useWatch("contactStatus", followForm);

  const filteredRows = followupRows.filter((row) => {
    if (query.region && query.region !== "全部区划" && !row.region.includes(query.region)) return false;
    if (query.contactStatus && query.contactStatus !== "全部状态" && row.contactStatus !== query.contactStatus) return false;
    if (query.method && query.method !== "全部方式" && row.latestMethod !== query.method) return false;
    if (query.keyword) {
      const field = query.searchType || "登记编号";
      const value = query.keyword.trim();
      if (field === "登记编号" && !row.no.includes(value)) return false;
      if (field === "姓名" && !row.name.includes(value)) return false;
      if (field === "身份证号" && !row.idCard.includes(value)) return false;
    }
    return true;
  });

  function doSearch() {
    setQuery(form.getFieldsValue());
    message.success("随访信息查询完成");
  }

  function resetSearch() {
    form.resetFields();
    setQuery({});
  }

  function openFollow(row, mode) {
    if (row.contactStatus === "死亡" && mode !== "add") {
      message.warning("死亡状态记录请进入死亡信息管理处理，随访信息管理仅展示历史。");
      return;
    }
    const latest = row.histories[0] || {};
    setFollowRow(row);
    setFollowMode(mode);
    followForm.setFieldsValue(
      mode === "edit"
        ? {
            followupDate: latest.date,
            method: latest.method,
            contactStatus: latest.status,
            followDoctor: latest.doctor,
            note: latest.note,
            deathDate: row.deathDate,
            deathCause: row.deathCause,
            deathPlace: row.deathPlace
          }
        : {
            followupDate: "2026-06-08",
            method: "电话随访",
            contactStatus: "存活",
            followDoctor: role.name,
            note: ""
          }
    );
  }

  function saveFollowup() {
    followForm
      .validateFields()
      .then((values) => {
        if (values.contactStatus === "死亡" && (!values.deathDate || !values.deathCause || !values.deathPlace)) {
          message.error("死亡状态下需填写死亡日期、死亡原因和死亡地点");
          return;
        }
        setFollowRow(null);
        message.success(followMode === "edit" ? "最新随访记录已修改，并写入随访记录日志" : "随访记录已新增，最后接触状态已更新");
      })
      .catch(() => message.error("保存失败：请补全随访必填项"));
  }

  function confirmDeleteLatest() {
    if ((deleteRow?.histories?.length || 0) <= 1) {
      message.error("删除失败：至少需保留一条有效随访记录");
      return;
    }
    message.success(`${deleteRow?.no} 最新随访记录已删除，患者状态回退到上一条随访`);
    setDeleteRow(null);
  }

  const columns = [
    {
      title: "登记编号",
      dataIndex: "no",
      width: 160,
      fixed: "left",
      render: (value, row) => (
        <Button type="link" className="link-cell" onClick={() => setDetailRow(row)}>
          {value}
        </Button>
      )
    },
    { title: "姓名", dataIndex: "name", width: 90 },
    { title: "性别", dataIndex: "sex", width: 70 },
    { title: "年龄", dataIndex: "age", width: 70 },
    { title: "身份证号", dataIndex: "idCard", width: 190 },
    { title: "行政区划", dataIndex: "region", width: 150 },
    { title: "报告单位", dataIndex: "org", width: 170 },
    { title: "诊断信息", dataIndex: "diagnosis", width: 210 },
    { title: "最后接触日期", dataIndex: "lastContactDate", width: 125 },
    { title: "最后接触状态", dataIndex: "contactStatus", width: 125, render: statusTag },
    { title: "最近随访方式", dataIndex: "latestMethod", width: 125 },
    { title: "随访次数", dataIndex: "followupCount", width: 90 },
    { title: "审核状态", dataIndex: "auditStatus", width: 120, render: statusTag },
    {
      title: "操作",
      width: 245,
      fixed: "right",
      render: (_, row) => {
        const isDeath = row.contactStatus === "死亡";
        return (
          <Space size={4}>
            <Button type="link" onClick={() => setDetailRow(row)}>
              详情
            </Button>
            <Button type="link" onClick={() => openFollow(row, "add")}>
              添加随访
            </Button>
            <Button type="link" disabled={isDeath} onClick={() => openFollow(row, "edit")}>
              修改最新
            </Button>
            <Button type="link" danger disabled={isDeath} onClick={() => setDeleteRow(row)}>
              删除最新
            </Button>
          </Space>
        );
      }
    }
  ];

  return (
    <div className="followup-page">
      <Card className="search-card maintenance-search">
        <Form form={form} layout="inline" initialValues={{ region: "全部区划", contactStatus: "全部状态", method: "全部方式", dateType: "最后接触日期", searchType: "登记编号" }}>
          <Form.Item name="region">
            <Select className="filter-select" options={[{ value: "全部区划" }, { value: "郑州市" }, { value: "许昌市" }, { value: "洛阳市" }]} />
          </Form.Item>
          <Form.Item name="contactStatus">
            <Select className="filter-select" options={[{ value: "全部状态" }, { value: "存活" }, { value: "失访" }, { value: "死亡" }]} />
          </Form.Item>
          <Form.Item name="method">
            <Select className="filter-select" options={[{ value: "全部方式" }, { value: "电话随访" }, { value: "门诊随访" }, { value: "基层协查" }, { value: "死因匹配" }]} />
          </Form.Item>
          <Form.Item name="dateType">
            <Select className="filter-select" options={[{ value: "最后接触日期" }, { value: "确诊日期" }]} />
          </Form.Item>
          <Form.Item name="dateRange">
            <Input className="date-range-input" placeholder="2026-06-01 至 2026-06-30" />
          </Form.Item>
          <Form.Item name="searchType">
            <Select className="filter-select small" options={[{ value: "登记编号" }, { value: "姓名" }, { value: "身份证号" }]} />
          </Form.Item>
          <Form.Item name="keyword">
            <Input prefix={<SearchOutlined />} className="keyword-input" placeholder="请输入检索内容" />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" icon={<SearchOutlined />} onClick={doSearch}>
                查询
              </Button>
              <Button onClick={resetSearch}>重置</Button>
              <Button onClick={() => message.success("已进入批量随访上传流程，请在批量随访菜单继续处理")}>
                批量随访
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>

      <Card className="table-card">
        <Alert
          className="table-alert"
          type="info"
          showIcon
          message="随访记录按时间倒序展示"
          description="仅最新随访记录允许修改或删除；死亡状态记录请进入死亡信息管理补录或回退。"
        />
        <Table columns={columns} dataSource={filteredRows} pagination={false} scroll={{ x: 1900 }} />
        <Flex justify="space-between" align="center" className="pagination-row">
          <Text type="secondary">共 {filteredRows.length} 条记录，第 1 / 1 页</Text>
          <Pagination current={1} total={filteredRows.length} pageSize={10} />
        </Flex>
      </Card>

      <Drawer title="随访信息详情" open={Boolean(detailRow)} onClose={() => setDetailRow(null)} width={820}>
        {detailRow && (
          <>
            <Descriptions bordered column={2} size="small">
              <Descriptions.Item label="登记编号">{detailRow.no}</Descriptions.Item>
              <Descriptions.Item label="姓名">{detailRow.name}</Descriptions.Item>
              <Descriptions.Item label="身份证号">{detailRow.idCard}</Descriptions.Item>
              <Descriptions.Item label="行政区划">{detailRow.region}</Descriptions.Item>
              <Descriptions.Item label="诊断信息" span={2}>{detailRow.diagnosis}</Descriptions.Item>
              <Descriptions.Item label="确诊日期">{detailRow.diagnosisDate}</Descriptions.Item>
              <Descriptions.Item label="最后接触日期">{detailRow.lastContactDate}</Descriptions.Item>
              <Descriptions.Item label="最后接触状态">{statusTag(detailRow.contactStatus)}</Descriptions.Item>
              <Descriptions.Item label="随访次数">{detailRow.followupCount}</Descriptions.Item>
              <Descriptions.Item label="审核状态">{statusTag(detailRow.auditStatus)}</Descriptions.Item>
            </Descriptions>
            <Card title="历史随访记录" size="small" className="history-card">
              <Timeline
                items={detailRow.histories.map((item) => ({
                  color: item.status === "死亡" ? "red" : item.status === "失访" ? "orange" : "green",
                  children: (
                    <div>
                      <Text strong>{item.date} / {item.method} / {item.status}</Text>
                      <div className="timeline-note">{item.doctor}：{item.note}</div>
                    </div>
                  )
                }))}
              />
            </Card>
          </>
        )}
      </Drawer>

      <Modal
        title={followMode === "edit" ? "修改最新随访" : "添加随访"}
        open={Boolean(followRow)}
        onCancel={() => setFollowRow(null)}
        onOk={saveFollowup}
        okText={followMode === "edit" ? "保存修改" : "保存随访"}
        cancelText="取消"
        width={780}
        destroyOnClose
      >
        {followRow && (
          <>
            <Alert
              type={followMode === "edit" ? "warning" : "info"}
              showIcon
              message={followMode === "edit" ? "仅允许修改最新一条随访记录" : "新增随访会更新患者最后接触状态"}
              description={followMode === "edit" ? "历史随访不可修改；如需修正历史记录，应通过随访记录日志发起纠错。" : `当前患者 ${followRow.name}，登记编号 ${followRow.no}，保存后按时间倒序进入历史随访。`}
              style={{ marginBottom: 16 }}
            />
            <Form form={followForm} layout="vertical">
              <Row gutter={12}>
                <Col span={6}>
                  <Form.Item name="followupDate" label="随访日期" rules={[{ required: true, message: "请输入随访日期" }]}>
                    <Input placeholder="2026-06-08" />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="method" label="随访方式" rules={[{ required: true, message: "请选择随访方式" }]}>
                    <Select options={[{ value: "电话随访" }, { value: "门诊随访" }, { value: "基层协查" }, { value: "死因匹配" }]} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="contactStatus" label="接触状态" rules={[{ required: true, message: "请选择接触状态" }]}>
                    <Select options={[{ value: "存活" }, { value: "失访" }, { value: "死亡" }]} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="followDoctor" label="随访医师" rules={[{ required: true, message: "请输入随访医师" }]}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="deathDate" label="死亡日期" rules={[{ required: contactStatus === "死亡", message: "死亡状态下必填" }]}>
                    <Input disabled={contactStatus !== "死亡"} placeholder="2026-06-08" />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="deathCause" label="死亡原因" rules={[{ required: contactStatus === "死亡", message: "死亡状态下必填" }]}>
                    <Select disabled={contactStatus !== "死亡"} options={[{ value: "肿瘤相关死亡" }, { value: "心脑血管疾病" }, { value: "其他原因" }]} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="deathPlace" label="死亡地点" rules={[{ required: contactStatus === "死亡", message: "死亡状态下必填" }]}>
                    <Select disabled={contactStatus !== "死亡"} options={[{ value: "医院" }, { value: "家中" }, { value: "养老机构" }, { value: "其他" }]} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item name="note" label="联系人反馈 / 随访说明" rules={[{ required: true, message: "请填写随访说明" }]}>
                    <Input.TextArea rows={3} placeholder="填写患者状态、联系人反馈、协查结果或死亡信息来源" />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </>
        )}
      </Modal>

      <Modal title="删除最新随访" open={Boolean(deleteRow)} onCancel={() => setDeleteRow(null)} onOk={confirmDeleteLatest} okText="确认删除" cancelText="取消" okButtonProps={{ danger: true }}>
        <Alert
          type="warning"
          showIcon
          message="仅允许删除最新一条随访记录"
          description={`登记编号 ${deleteRow?.no || ""} 当前共有 ${deleteRow?.histories?.length || 0} 条随访记录。系统会校验至少保留一条有效随访记录，删除后患者最后接触状态回退到上一条记录。`}
        />
      </Modal>
    </div>
  );
}

function BatchFollowupManagement({ role }) {
  const [form] = Form.useForm();
  const [query, setQuery] = useState({});
  const [fileName, setFileName] = useState("随访批量更新_郑州市金水区_20260608.xlsx");
  const [uploadChecked, setUploadChecked] = useState(true);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [detailRow, setDetailRow] = useState(null);
  const [importOpen, setImportOpen] = useState(false);
  const [handleRow, setHandleRow] = useState(null);

  const filteredRows = batchFollowupErrors.filter((row) => {
    if (query.level && query.level !== "全部级别" && row.level !== query.level) return false;
    if (query.errorType && query.errorType !== "全部类型" && row.errorType !== query.errorType) return false;
    if (query.keyword) {
      const field = query.searchType || "登记编号";
      const value = query.keyword.trim();
      if (field === "登记编号" && !row.no.includes(value)) return false;
      if (field === "姓名" && !row.name.includes(value)) return false;
      if (field === "身份证号" && !row.idCard.includes(value)) return false;
    }
    return true;
  });

  const summary = {
    total: 128,
    ready: 106,
    warning: 5,
    error: 17,
    duplicate: 3,
    deathMissing: 4
  };

  function beforeUpload(file) {
    setFileName(file.name);
    setUploadChecked(false);
    message.success("文件已选择，请点击上传校验");
    return false;
  }

  function validateUpload() {
    setUploadChecked(true);
    message.success("文件校验完成：106 条可入库，17 条错误需处理");
  }

  function downloadTemplate() {
    Modal.info({
      title: "下载批量随访模板",
      content: "模板版本：V2026.06。字段包含登记编号、姓名、身份证号、最后接触日期、接触状态、随访方式、死亡日期、死亡原因、死亡地点、随访说明。",
      okText: "知道了"
    });
  }

  function exportErrors() {
    message.success(`已导出 ${filteredRows.length} 条校验异常明细`);
  }

  function confirmImport() {
    setImportOpen(false);
    message.success("批量入库任务已创建，错误记录未入库，可在错误明细中逐条处理");
  }

  function saveHandleRow() {
    setHandleRow(null);
    message.success("逐条处理结果已保存，系统将重新校验该行记录");
  }

  const columns = [
    { title: "行号", dataIndex: "rowNo", width: 80, fixed: "left" },
    {
      title: "登记编号",
      dataIndex: "no",
      width: 160,
      fixed: "left",
      render: (value, row) => (
        <Button type="link" className="link-cell" onClick={() => setDetailRow(row)}>
          {value}
        </Button>
      )
    },
    { title: "姓名", dataIndex: "name", width: 90 },
    { title: "身份证号", dataIndex: "idCard", width: 190 },
    { title: "最后接触日期", dataIndex: "contactDate", width: 125 },
    { title: "接触状态", dataIndex: "contactStatus", width: 100, render: statusTag },
    { title: "错误类型", dataIndex: "errorType", width: 140 },
    { title: "级别", dataIndex: "level", width: 90, render: statusTag },
    { title: "错误说明", dataIndex: "message", width: 280 },
    { title: "处理建议", dataIndex: "suggestion", width: 240 },
    {
      title: "操作",
      width: 140,
      fixed: "right",
      render: (_, row) => (
        <Space size={4}>
          <Button type="link" onClick={() => setDetailRow(row)}>
            详情
          </Button>
          <Button type="link" onClick={() => setHandleRow(row)}>
            逐条处理
          </Button>
        </Space>
      )
    }
  ];

  return (
    <div className="batch-followup-page">
      <Row gutter={16} align="stretch" className="batch-upload-row">
        <Col span={7}>
          <Card title="模板下载" className="form-section batch-panel" size="small">
            <div className="template-info-list">
              <div><Text type="secondary">模板版本</Text><Text strong>V2026.06</Text></div>
              <div><Text type="secondary">适用范围</Text><Text strong>批量新增与最新状态更新</Text></div>
              <div><Text type="secondary">死亡字段</Text><Text strong>死亡日期、死亡原因、死亡地点</Text></div>
            </div>
            <div className="batch-panel-actions">
              <Button type="primary" icon={<UploadOutlined />} onClick={downloadTemplate}>
                下载模板
              </Button>
            </div>
          </Card>
        </Col>
        <Col span={17}>
          <Card title="上传校验" className="form-section batch-panel" size="small">
            <Form className="batch-upload-form" layout="vertical" initialValues={{ batchNo: "FUP-20260608-001", org: role.label === "医疗机构填报员" ? "河南省人民医院" : "郑州市疾控中心", method: "电话随访" }}>
              <Row gutter={12}>
                <Col span={6}>
                  <Form.Item name="batchNo" label="上传批次号">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="org" label="上传机构">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item name="method" label="默认随访方式">
                    <Select options={[{ value: "电话随访" }, { value: "门诊随访" }, { value: "基层协查" }]} />
                  </Form.Item>
                </Col>
                <Col span={7}>
                  <Form.Item label="随访文件">
                    <div className="upload-control-line">
                      <Upload beforeUpload={beforeUpload} maxCount={1} showUploadList={false} accept=".xlsx,.xls,.csv">
                        <Button icon={<UploadOutlined />}>选择文件</Button>
                      </Upload>
                      <Text className="upload-file-name" type="secondary">{fileName}</Text>
                    </div>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="导入说明">
                    <Input.TextArea rows={2} placeholder="填写本批次来源、随访范围或特殊说明" />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
            <Space className="batch-panel-actions">
              <Button type="primary" icon={<UploadOutlined />} onClick={validateUpload}>
                上传校验
              </Button>
              <Button onClick={() => message.info("已清空当前选择文件和校验结果")}>清空</Button>
            </Space>
          </Card>
        </Col>
      </Row>

      <Row gutter={16} className="stat-row">
        <Col span={4}><Card><Statistic title="总行数" value={summary.total} suffix="行" /></Card></Col>
        <Col span={4}><Card><Statistic title="可入库" value={summary.ready} suffix="行" valueStyle={{ color: "#16a34a" }} /></Card></Col>
        <Col span={4}><Card><Statistic title="警告" value={summary.warning} suffix="行" valueStyle={{ color: "#2563eb" }} /></Card></Col>
        <Col span={4}><Card><Statistic title="错误" value={summary.error} suffix="行" valueStyle={{ color: "#dc2626" }} /></Card></Col>
        <Col span={4}><Card><Statistic title="重复行" value={summary.duplicate} suffix="行" /></Card></Col>
        <Col span={4}><Card><Statistic title="死亡待补充" value={summary.deathMissing} suffix="行" /></Card></Col>
      </Row>

      <Card className="search-card maintenance-search">
        <Form form={form} layout="inline" initialValues={{ level: "全部级别", errorType: "全部类型", searchType: "登记编号" }}>
          <Form.Item name="level">
            <Select className="filter-select" options={[{ value: "全部级别" }, { value: "错误" }, { value: "警告" }]} />
          </Form.Item>
          <Form.Item name="errorType">
            <Select className="filter-select" options={[{ value: "全部类型" }, { value: "日期逻辑错误" }, { value: "死亡字段缺失" }, { value: "患者匹配失败" }, { value: "重复随访" }]} />
          </Form.Item>
          <Form.Item name="searchType">
            <Select className="filter-select small" options={[{ value: "登记编号" }, { value: "姓名" }, { value: "身份证号" }]} />
          </Form.Item>
          <Form.Item name="keyword">
            <Input prefix={<SearchOutlined />} className="keyword-input" placeholder="请输入检索内容" />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" icon={<SearchOutlined />} onClick={() => { setQuery(form.getFieldsValue()); message.success("异常明细筛选完成"); }}>
                查询
              </Button>
              <Button onClick={() => { form.resetFields(); setQuery({}); }}>重置</Button>
              <Button onClick={exportErrors}>错误导出</Button>
              <Button type="primary" disabled={!uploadChecked} onClick={() => setImportOpen(true)}>
                批量入库
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>

      <Card className="table-card">
        <Alert
          className="table-alert"
          type={uploadChecked ? "warning" : "info"}
          showIcon
          message={uploadChecked ? "存在错误记录，错误行不会入库" : "请先上传文件并执行校验"}
          description="系统仅允许可入库记录批量入库；错误记录需修正模板后重传，或在错误明细中逐条处理。"
        />
        <Flex justify="space-between" align="center" className="table-toolbar">
          <Text type="secondary">已选择 {selectedKeys.length} 条异常记录</Text>
          <Space>
            <Button disabled={!selectedKeys.length} onClick={() => message.success(`已导出 ${selectedKeys.length} 条选中异常`)}>
              导出选中
            </Button>
            <Button disabled={!selectedKeys.length} onClick={() => message.info("选中记录已标记为逐条处理队列")}>
              加入逐条处理
            </Button>
          </Space>
        </Flex>
        <Table
          rowSelection={{ selectedRowKeys: selectedKeys, onChange: setSelectedKeys }}
          columns={columns}
          dataSource={filteredRows}
          pagination={false}
          scroll={{ x: 1750 }}
        />
        <Flex justify="space-between" align="center" className="pagination-row">
          <Text type="secondary">共 {filteredRows.length} 条异常记录，第 1 / 1 页</Text>
          <Pagination current={1} total={filteredRows.length} pageSize={10} />
        </Flex>
      </Card>

      <Drawer title="校验异常详情" open={Boolean(detailRow)} onClose={() => setDetailRow(null)} width={720}>
        {detailRow && (
          <>
            <Descriptions bordered column={2} size="small">
              <Descriptions.Item label="行号">{detailRow.rowNo}</Descriptions.Item>
              <Descriptions.Item label="级别">{statusTag(detailRow.level)}</Descriptions.Item>
              <Descriptions.Item label="登记编号">{detailRow.no}</Descriptions.Item>
              <Descriptions.Item label="姓名">{detailRow.name}</Descriptions.Item>
              <Descriptions.Item label="身份证号" span={2}>{detailRow.idCard}</Descriptions.Item>
              <Descriptions.Item label="最后接触日期">{detailRow.contactDate}</Descriptions.Item>
              <Descriptions.Item label="接触状态">{statusTag(detailRow.contactStatus)}</Descriptions.Item>
              <Descriptions.Item label="错误类型">{detailRow.errorType}</Descriptions.Item>
              <Descriptions.Item label="处理建议">{detailRow.suggestion}</Descriptions.Item>
              <Descriptions.Item label="错误说明" span={2}>{detailRow.message}</Descriptions.Item>
            </Descriptions>
            <Alert className="drawer-alert" type="info" showIcon message="入库规则" description="错误级别记录不会批量入库；警告记录可在确认后入库，但需保留警告说明和操作日志。" />
          </>
        )}
      </Drawer>

      <Modal title="批量入库确认" open={importOpen} onCancel={() => setImportOpen(false)} onOk={confirmImport} okText="确认入库" cancelText="取消">
        <Descriptions bordered column={1} size="small">
          <Descriptions.Item label="文件名">{fileName}</Descriptions.Item>
          <Descriptions.Item label="可入库记录">{summary.ready} 行</Descriptions.Item>
          <Descriptions.Item label="不入库记录">{summary.error} 行错误、{summary.warning} 行警告待复核</Descriptions.Item>
          <Descriptions.Item label="审计记录">记录上传人、机构、批次号、文件名、入库数量和异常数量。</Descriptions.Item>
        </Descriptions>
      </Modal>

      <Modal title="逐条处理" open={Boolean(handleRow)} onCancel={() => setHandleRow(null)} onOk={saveHandleRow} okText="保存处理" cancelText="取消" width={780}>
        {handleRow && (
          <>
            <Alert type="warning" showIcon message={handleRow.errorType} description={handleRow.message} style={{ marginBottom: 16 }} />
            <Form layout="vertical" initialValues={{ no: handleRow.no, name: handleRow.name, contactDate: handleRow.contactDate, contactStatus: handleRow.contactStatus, note: handleRow.suggestion }}>
              <Row gutter={12}>
                <Col span={6}><Form.Item name="no" label="登记编号"><Input /></Form.Item></Col>
                <Col span={6}><Form.Item name="name" label="姓名"><Input /></Form.Item></Col>
                <Col span={6}><Form.Item name="contactDate" label="最后接触日期"><Input /></Form.Item></Col>
                <Col span={6}><Form.Item name="contactStatus" label="接触状态"><Select options={[{ value: "存活" }, { value: "失访" }, { value: "死亡" }]} /></Form.Item></Col>
                <Col span={8}><Form.Item name="deathDate" label="死亡日期"><Input placeholder="死亡状态下填写" /></Form.Item></Col>
                <Col span={8}><Form.Item name="deathCause" label="死亡原因"><Select allowClear options={[{ value: "肿瘤相关死亡" }, { value: "心脑血管疾病" }, { value: "其他原因" }]} /></Form.Item></Col>
                <Col span={8}><Form.Item name="deathPlace" label="死亡地点"><Select allowClear options={[{ value: "医院" }, { value: "家中" }, { value: "其他" }]} /></Form.Item></Col>
                <Col span={24}><Form.Item name="note" label="处理说明"><Input.TextArea rows={3} /></Form.Item></Col>
              </Row>
            </Form>
          </>
        )}
      </Modal>
    </div>
  );
}

function FollowupPlanManagement({ role }) {
  const [form] = Form.useForm();
  const [assignForm] = Form.useForm();
  const [query, setQuery] = useState({});
  const [detailRow, setDetailRow] = useState(null);
  const [assignRow, setAssignRow] = useState(null);
  const [generateRow, setGenerateRow] = useState(null);
  const [delayRow, setDelayRow] = useState(null);
  const [cancelRow, setCancelRow] = useState(null);

  const filteredRows = followupPlanRows.filter((row) => {
    if (query.region && query.region !== "全部区划" && !row.region.includes(query.region)) return false;
    if (query.taskStatus && query.taskStatus !== "全部状态" && row.taskStatus !== query.taskStatus) return false;
    if (query.patientStatus && query.patientStatus !== "全部患者" && row.patientStatus !== query.patientStatus) return false;
    if (query.keyword) {
      const field = query.searchType || "登记编号";
      const value = query.keyword.trim();
      if (field === "登记编号" && !row.no.includes(value)) return false;
      if (field === "姓名" && !row.name.includes(value)) return false;
      if (field === "身份证号" && !row.idCard.includes(value)) return false;
    }
    return true;
  });

  const planSummary = {
    shouldFollow: followupPlanRows.filter((row) => row.patientStatus !== "死亡").length,
    generated: followupPlanRows.filter((row) => row.taskStatus === "已生成").length,
    overdue: followupPlanRows.filter((row) => row.taskStatus === "逾期").length,
    excluded: followupPlanRows.filter((row) => row.taskStatus === "已排除").length,
    today: 2
  };

  function openAssign(row) {
    setAssignRow(row);
    assignForm.setFieldsValue({
      ownerOrg: row.ownerOrg,
      ownerUser: row.ownerUser,
      plannedDate: row.plannedDate === "-" ? "2026-06-30" : row.plannedDate,
      note: row.patientStatus === "失访" ? "失访患者默认分派基层协查" : ""
    });
  }

  function confirmAssign() {
    setAssignRow(null);
    message.success("随访任务已分派，并写入任务流转记录");
  }

  function confirmGenerate() {
    setGenerateRow(null);
    message.success("随访任务已生成，责任机构将收到待办提醒");
  }

  function confirmDelay() {
    setDelayRow(null);
    message.success("随访计划已延期，延期原因已记录");
  }

  function confirmCancel() {
    setCancelRow(null);
    message.success("随访计划已取消，不再生成常规随访任务");
  }

  const columns = [
    {
      title: "登记编号",
      dataIndex: "no",
      width: 160,
      fixed: "left",
      render: (value, row) => (
        <Button type="link" className="link-cell" onClick={() => setDetailRow(row)}>
          {value}
        </Button>
      )
    },
    { title: "姓名", dataIndex: "name", width: 90 },
    { title: "身份证号", dataIndex: "idCard", width: 190 },
    { title: "行政区划", dataIndex: "region", width: 150 },
    { title: "诊断信息", dataIndex: "diagnosis", width: 210 },
    { title: "最后接触日期", dataIndex: "lastContactDate", width: 125 },
    { title: "当前状态", dataIndex: "patientStatus", width: 105, render: statusTag },
    { title: "计划随访日期", dataIndex: "plannedDate", width: 125 },
    { title: "计划规则", dataIndex: "rule", width: 170 },
    {
      title: "任务状态",
      dataIndex: "taskStatus",
      width: 105,
      render: (value, row) => (
        <Space size={4}>
          {statusTag(value)}
          {row.overdueDays > 0 && <Tag color="red">逾期 {row.overdueDays} 天</Tag>}
        </Space>
      )
    },
    { title: "责任机构", dataIndex: "ownerOrg", width: 160 },
    { title: "责任人", dataIndex: "ownerUser", width: 90 },
    {
      title: "操作",
      width: 320,
      fixed: "right",
      render: (_, row) => {
        const excluded = row.patientStatus === "死亡" || row.taskStatus === "已排除";
        return (
          <Space size={4}>
            <Button type="link" onClick={() => setDetailRow(row)}>详情</Button>
            <Button type="link" disabled={excluded || row.taskStatus !== "待生成"} onClick={() => setGenerateRow(row)}>生成任务</Button>
            <Button type="link" disabled={excluded} onClick={() => openAssign(row)}>分派</Button>
            <Button type="link" disabled={excluded} onClick={() => message.success(`${row.no} 已标记完成，随访信息同步更新`)}>标记完成</Button>
            <Button type="link" disabled={excluded} onClick={() => setDelayRow(row)}>延期</Button>
            <Button type="link" danger disabled={excluded} onClick={() => setCancelRow(row)}>取消计划</Button>
          </Space>
        );
      }
    }
  ];

  return (
    <div className="followup-plan-page">
      <Row gutter={16} className="plan-stat-row">
        <Col span={5}><Card><Statistic title="应随访人数" value={planSummary.shouldFollow} suffix="人" /></Card></Col>
        <Col span={5}><Card><Statistic title="已生成任务" value={planSummary.generated} suffix="条" valueStyle={{ color: "#2563eb" }} /></Card></Col>
        <Col span={5}><Card><Statistic title="逾期任务" value={planSummary.overdue} suffix="条" valueStyle={{ color: "#dc2626" }} /></Card></Col>
        <Col span={5}><Card><Statistic title="死亡/作废排除" value={planSummary.excluded} suffix="条" /></Card></Col>
        <Col span={4}><Card><Statistic title="今日待随访" value={planSummary.today} suffix="条" valueStyle={{ color: "#16a34a" }} /></Card></Col>
      </Row>

      <Card className="search-card maintenance-search">
        <Form form={form} layout="inline" initialValues={{ region: "全部区划", taskStatus: "全部状态", patientStatus: "全部患者", cancerType: "全部癌种", dateType: "计划随访日期", searchType: "登记编号" }}>
          <Form.Item name="region">
            <Select className="filter-select" options={[{ value: "全部区划" }, { value: "郑州市" }, { value: "许昌市" }, { value: "洛阳市" }]} />
          </Form.Item>
          <Form.Item name="taskStatus">
            <Select className="filter-select" options={[{ value: "全部状态" }, { value: "待生成" }, { value: "已生成" }, { value: "逾期" }, { value: "已排除" }]} />
          </Form.Item>
          <Form.Item name="patientStatus">
            <Select className="filter-select" options={[{ value: "全部患者" }, { value: "存活" }, { value: "失访" }, { value: "死亡" }]} />
          </Form.Item>
          <Form.Item name="cancerType">
            <Select className="filter-select" options={[{ value: "全部癌种" }, { value: "乳腺" }, { value: "肺" }, { value: "肝" }, { value: "胃" }]} />
          </Form.Item>
          <Form.Item name="dateType">
            <Select className="filter-select" options={[{ value: "计划随访日期" }, { value: "最后接触日期" }, { value: "确诊日期" }]} />
          </Form.Item>
          <Form.Item name="dateRange">
            <Input className="date-range-input" placeholder="2026-06-01 至 2026-06-30" />
          </Form.Item>
          <Form.Item name="searchType">
            <Select className="filter-select small" options={[{ value: "登记编号" }, { value: "姓名" }, { value: "身份证号" }]} />
          </Form.Item>
          <Form.Item name="keyword">
            <Input prefix={<SearchOutlined />} className="keyword-input" placeholder="请输入检索内容" />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" icon={<SearchOutlined />} onClick={() => { setQuery(form.getFieldsValue()); message.success("随访计划查询完成"); }}>
                查询
              </Button>
              <Button onClick={() => { form.resetFields(); setQuery({}); }}>重置</Button>
              <Button type="primary" onClick={() => message.success("已按当前规则生成可随访任务，死亡和作废记录自动排除")}>批量生成</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>

      <Card className="table-card">
        <Alert
          className="table-alert"
          type="info"
          showIcon
          message="随访计划用于生成和分派任务，不直接修改随访记录"
          description="死亡、作废、归档记录不生成常规随访任务；失访患者默认生成基层协查任务；逾期任务在列表中红色标记。"
        />
        <Table columns={columns} dataSource={filteredRows} pagination={false} scroll={{ x: 1900 }} />
        <Flex justify="space-between" align="center" className="pagination-row">
          <Text type="secondary">共 {filteredRows.length} 条计划，第 1 / 1 页</Text>
          <Pagination current={1} total={filteredRows.length} pageSize={10} />
        </Flex>
      </Card>

      <Drawer title="随访计划详情" open={Boolean(detailRow)} onClose={() => setDetailRow(null)} width={820}>
        {detailRow && (
          <>
            <Descriptions bordered column={2} size="small">
              <Descriptions.Item label="登记编号">{detailRow.no}</Descriptions.Item>
              <Descriptions.Item label="姓名">{detailRow.name}</Descriptions.Item>
              <Descriptions.Item label="身份证号" span={2}>{detailRow.idCard}</Descriptions.Item>
              <Descriptions.Item label="行政区划">{detailRow.region}</Descriptions.Item>
              <Descriptions.Item label="当前状态">{statusTag(detailRow.patientStatus)}</Descriptions.Item>
              <Descriptions.Item label="诊断信息" span={2}>{detailRow.diagnosis}</Descriptions.Item>
              <Descriptions.Item label="最近随访" span={2}>{detailRow.latestFollowup}</Descriptions.Item>
              <Descriptions.Item label="计划随访日期">{detailRow.plannedDate}</Descriptions.Item>
              <Descriptions.Item label="计划规则">{detailRow.rule}</Descriptions.Item>
              <Descriptions.Item label="任务状态">{statusTag(detailRow.taskStatus)}</Descriptions.Item>
              <Descriptions.Item label="责任机构">{detailRow.ownerOrg}</Descriptions.Item>
            </Descriptions>
            <Card title="任务流转记录" size="small" className="history-card">
              <Timeline
                items={[
                  { color: "blue", children: `${detailRow.lastContactDate} 根据最后接触状态计算计划规则：${detailRow.rule}` },
                  { color: detailRow.taskStatus === "逾期" ? "red" : "green", children: `${detailRow.plannedDate} 当前任务状态：${detailRow.taskStatus}` }
                ]}
              />
            </Card>
          </>
        )}
      </Drawer>

      <Modal title="生成随访任务" open={Boolean(generateRow)} onCancel={() => setGenerateRow(null)} onOk={confirmGenerate} okText="确认生成" cancelText="取消">
        <Alert type="info" showIcon message="确认生成随访任务" description={`登记编号 ${generateRow?.no || ""} 将按规则“${generateRow?.rule || ""}”生成任务，并分派给 ${generateRow?.ownerOrg || ""}。`} />
      </Modal>

      <Modal title="分派随访任务" open={Boolean(assignRow)} onCancel={() => setAssignRow(null)} onOk={confirmAssign} okText="保存分派" cancelText="取消" width={720}>
        <Form form={assignForm} layout="vertical">
          <Row gutter={12}>
            <Col span={8}><Form.Item name="ownerOrg" label="责任机构" rules={[{ required: true, message: "请选择责任机构" }]}><Select options={[{ value: "金水区疾控中心" }, { value: "魏都区疾控中心" }, { value: "郑州市疾控中心" }]} /></Form.Item></Col>
            <Col span={8}><Form.Item name="ownerUser" label="责任人" rules={[{ required: true, message: "请选择责任人" }]}><Select options={[{ value: "周敏" }, { value: "李文华" }, { value: "刘丽" }]} /></Form.Item></Col>
            <Col span={8}><Form.Item name="plannedDate" label="计划完成日期" rules={[{ required: true, message: "请输入计划完成日期" }]}><Input /></Form.Item></Col>
            <Col span={24}><Form.Item name="note" label="分派说明"><Input.TextArea rows={3} placeholder="填写分派原因、协查要求或特殊说明" /></Form.Item></Col>
          </Row>
        </Form>
      </Modal>

      <Modal title="延期随访计划" open={Boolean(delayRow)} onCancel={() => setDelayRow(null)} onOk={confirmDelay} okText="确认延期" cancelText="取消">
        <Alert type="warning" showIcon message="延期会重新计算逾期状态" description={`登记编号 ${delayRow?.no || ""} 当前计划日期为 ${delayRow?.plannedDate || ""}。正式系统需填写延期原因和新的计划日期。`} />
      </Modal>

      <Modal title="取消随访计划" open={Boolean(cancelRow)} onCancel={() => setCancelRow(null)} onOk={confirmCancel} okText="确认取消" cancelText="取消" okButtonProps={{ danger: true }}>
        <Alert type="warning" showIcon message="取消后不再生成常规随访任务" description={`登记编号 ${cancelRow?.no || ""} 的计划将标记为已取消。死亡、作废或归档记录应使用自动排除规则。`} />
      </Modal>
    </div>
  );
}

function DeathInfoManagement({ role }) {
  const [form] = Form.useForm();
  const [completeForm] = Form.useForm();
  const [rollbackForm] = Form.useForm();
  const [query, setQuery] = useState({});
  const [detailRow, setDetailRow] = useState(null);
  const [completeRow, setCompleteRow] = useState(null);
  const [rollbackRow, setRollbackRow] = useState(null);
  const [exportOpen, setExportOpen] = useState(false);

  const filteredRows = deathInfoRows.filter((row) => {
    if (query.region && query.region !== "全部区划" && !row.region.includes(query.region)) return false;
    if (query.deathStatus && query.deathStatus !== "全部状态" && row.deathStatus !== query.deathStatus) return false;
    if (query.sourceType && query.sourceType !== "全部来源" && row.sourceType !== query.sourceType) return false;
    if (query.keyword) {
      const field = query.searchType || "登记编号";
      const value = query.keyword.trim();
      if (field === "登记编号" && !row.no.includes(value)) return false;
      if (field === "姓名" && !row.name.includes(value)) return false;
      if (field === "身份证号" && !row.idCard.includes(value)) return false;
    }
    return true;
  });

  const summary = {
    total: deathInfoRows.length,
    pending: deathInfoRows.filter((row) => row.deathStatus === "待补全").length,
    confirmed: deathInfoRows.filter((row) => row.deathStatus === "已确认").length,
    backflow: deathInfoRows.filter((row) => row.sourceType === "死因回流").length,
    rollback: deathInfoRows.filter((row) => row.rollbackAllowed).length,
    today: 1
  };

  function openComplete(row) {
    setCompleteRow(row);
    completeForm.setFieldsValue({
      deathDate: row.deathDate,
      deathCause: row.deathCause,
      deathPlace: row.deathPlace,
      certificateSource: row.certificateSource,
      rootCauseCode: row.rootCauseCode || row.diagnosis.slice(0, 5),
      note: row.deathStatus === "待补全" ? "根据死因回流记录补全死亡信息" : "复核死亡信息"
    });
  }

  function confirmComplete() {
    completeForm
      .validateFields()
      .then(() => {
        setCompleteRow(null);
        message.success("死亡信息已补全，死亡状态和审核状态已同步更新");
      })
      .catch(() => message.error("保存失败：请补全死亡日期、死亡原因、死亡地点和证明来源"));
  }

  function openRollback(row) {
    if (!row.rollbackAllowed || row.archived) {
      message.warning("已归档或已上报记录不可直接回退，请走死亡信息更正流程。");
      return;
    }
    setRollbackRow(row);
    rollbackForm.setFieldsValue({ reason: "死亡信息误报，恢复上一条存活随访状态", restoreStatus: "存活" });
  }

  function confirmRollback() {
    rollbackForm
      .validateFields()
      .then(() => {
        setRollbackRow(null);
        message.success("死亡信息已回退，记录将回到随访信息管理并恢复上一条接触状态");
      })
      .catch(() => message.error("回退失败：请填写回退原因"));
  }

  const columns = [
    {
      title: "登记编号",
      dataIndex: "no",
      width: 160,
      fixed: "left",
      render: (value, row) => (
        <Button type="link" className="link-cell" onClick={() => setDetailRow(row)}>
          {value}
        </Button>
      )
    },
    { title: "姓名", dataIndex: "name", width: 90 },
    { title: "身份证号", dataIndex: "idCard", width: 190 },
    { title: "行政区划", dataIndex: "region", width: 150 },
    { title: "诊断信息", dataIndex: "diagnosis", width: 210 },
    { title: "最后接触日期", dataIndex: "lastContactDate", width: 125 },
    { title: "死亡日期", dataIndex: "deathDate", width: 115 },
    { title: "死亡原因", dataIndex: "deathCause", width: 135 },
    { title: "死亡地点", dataIndex: "deathPlace", width: 100 },
    { title: "来源类型", dataIndex: "sourceType", width: 115 },
    { title: "死亡信息状态", dataIndex: "deathStatus", width: 125, render: statusTag },
    { title: "审核状态", dataIndex: "auditStatus", width: 115, render: statusTag },
    {
      title: "操作",
      width: 210,
      fixed: "right",
      render: (_, row) => (
        <Space size={4}>
          <Button type="link" onClick={() => setDetailRow(row)}>详情</Button>
          <Button type="link" onClick={() => openComplete(row)}>死亡补全</Button>
          <Button type="link" danger disabled={!row.rollbackAllowed || row.archived} onClick={() => openRollback(row)}>死亡回退</Button>
        </Space>
      )
    }
  ];

  return (
    <div className="death-info-page">
      <Row gutter={16} className="plan-stat-row">
        <Col span={4}><Card><Statistic title="死亡记录数" value={summary.total} suffix="条" /></Card></Col>
        <Col span={4}><Card><Statistic title="待补全" value={summary.pending} suffix="条" valueStyle={{ color: "#d97706" }} /></Card></Col>
        <Col span={4}><Card><Statistic title="已确认" value={summary.confirmed} suffix="条" valueStyle={{ color: "#16a34a" }} /></Card></Col>
        <Col span={4}><Card><Statistic title="死因回流" value={summary.backflow} suffix="条" valueStyle={{ color: "#2563eb" }} /></Card></Col>
        <Col span={4}><Card><Statistic title="可回退" value={summary.rollback} suffix="条" /></Card></Col>
        <Col span={4}><Card><Statistic title="今日更新" value={summary.today} suffix="条" /></Card></Col>
      </Row>

      <Card className="search-card maintenance-search">
        <Form form={form} layout="inline" initialValues={{ region: "全部区划", deathStatus: "全部状态", sourceType: "全部来源", dateType: "死亡日期", searchType: "登记编号" }}>
          <Form.Item name="region">
            <Select className="filter-select" options={[{ value: "全部区划" }, { value: "郑州市" }, { value: "南昌市" }, { value: "许昌市" }]} />
          </Form.Item>
          <Form.Item name="deathStatus">
            <Select className="filter-select" options={[{ value: "全部状态" }, { value: "待补全" }, { value: "已确认" }, { value: "已上报" }]} />
          </Form.Item>
          <Form.Item name="sourceType">
            <Select className="filter-select" options={[{ value: "全部来源" }, { value: "死因回流" }, { value: "电话随访" }, { value: "医院上报" }]} />
          </Form.Item>
          <Form.Item name="dateType">
            <Select className="filter-select" options={[{ value: "死亡日期" }, { value: "最后接触日期" }, { value: "确诊日期" }]} />
          </Form.Item>
          <Form.Item name="dateRange">
            <Input className="date-range-input" placeholder="2026-06-01 至 2026-06-30" />
          </Form.Item>
          <Form.Item name="searchType">
            <Select className="filter-select small" options={[{ value: "登记编号" }, { value: "姓名" }, { value: "身份证号" }]} />
          </Form.Item>
          <Form.Item name="keyword">
            <Input prefix={<SearchOutlined />} className="keyword-input" placeholder="请输入检索内容" />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" icon={<SearchOutlined />} onClick={() => { setQuery(form.getFieldsValue()); message.success("死亡信息查询完成"); }}>
                查询
              </Button>
              <Button onClick={() => { form.resetFields(); setQuery({}); }}>重置</Button>
              <Button onClick={() => setExportOpen(true)}>导出 Excel</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>

      <Card className="table-card">
        <Alert
          className="table-alert"
          type="warning"
          showIcon
          message="死亡回退为高风险操作"
          description="仅最新且唯一有效的死亡随访记录允许回退；已归档或已上报国家平台记录不可直接回退，需走死亡信息更正流程。"
        />
        <Table columns={columns} dataSource={filteredRows} pagination={false} scroll={{ x: 1750 }} />
        <Flex justify="space-between" align="center" className="pagination-row">
          <Text type="secondary">共 {filteredRows.length} 条死亡记录，第 1 / 1 页</Text>
          <Pagination current={1} total={filteredRows.length} pageSize={10} />
        </Flex>
      </Card>

      <Drawer title="死亡信息详情" open={Boolean(detailRow)} onClose={() => setDetailRow(null)} width={840}>
        {detailRow && (
          <>
            <Descriptions bordered column={2} size="small">
              <Descriptions.Item label="登记编号">{detailRow.no}</Descriptions.Item>
              <Descriptions.Item label="姓名">{detailRow.name}</Descriptions.Item>
              <Descriptions.Item label="身份证号" span={2}>{detailRow.idCard}</Descriptions.Item>
              <Descriptions.Item label="行政区划">{detailRow.region}</Descriptions.Item>
              <Descriptions.Item label="报告单位">{detailRow.org}</Descriptions.Item>
              <Descriptions.Item label="诊断信息" span={2}>{detailRow.diagnosis}</Descriptions.Item>
              <Descriptions.Item label="确诊日期">{detailRow.diagnosisDate}</Descriptions.Item>
              <Descriptions.Item label="最后接触日期">{detailRow.lastContactDate}</Descriptions.Item>
              <Descriptions.Item label="死亡日期">{detailRow.deathDate}</Descriptions.Item>
              <Descriptions.Item label="死亡原因">{detailRow.deathCause}</Descriptions.Item>
              <Descriptions.Item label="死亡地点">{detailRow.deathPlace}</Descriptions.Item>
              <Descriptions.Item label="来源类型">{detailRow.sourceType}</Descriptions.Item>
              <Descriptions.Item label="根本死因编码">{detailRow.rootCauseCode || "待补全"}</Descriptions.Item>
              <Descriptions.Item label="证明来源">{detailRow.certificateSource}</Descriptions.Item>
              <Descriptions.Item label="死亡信息状态">{statusTag(detailRow.deathStatus)}</Descriptions.Item>
              <Descriptions.Item label="审核状态">{statusTag(detailRow.auditStatus)}</Descriptions.Item>
            </Descriptions>
            <Card title="历史随访记录" size="small" className="history-card">
              <Timeline
                items={detailRow.histories.map((item) => ({
                  color: item.status === "死亡" ? "red" : "green",
                  children: (
                    <div>
                      <Text strong>{item.date} / {item.method} / {item.status}</Text>
                      <div className="timeline-note">{item.doctor}：{item.note}</div>
                    </div>
                  )
                }))}
              />
            </Card>
            <div className="drawer-action-row">
              <Space>
                <Button type="primary" onClick={() => openComplete(detailRow)}>死亡补全</Button>
                <Button danger disabled={!detailRow.rollbackAllowed || detailRow.archived} onClick={() => openRollback(detailRow)}>死亡回退</Button>
              </Space>
            </div>
          </>
        )}
      </Drawer>

      <Modal title="死亡信息补全" open={Boolean(completeRow)} onCancel={() => setCompleteRow(null)} onOk={confirmComplete} okText="保存补全" cancelText="取消" width={820} destroyOnClose>
        {completeRow && (
          <>
            <Alert type="info" showIcon message="补全死亡信息" description={`登记编号 ${completeRow.no}，来源：${completeRow.sourceType}。死亡日期、死亡原因、死亡地点和证明来源为必填。`} style={{ marginBottom: 16 }} />
            <Form form={completeForm} layout="vertical">
              <Row gutter={12}>
                <Col span={6}><Form.Item name="deathDate" label="死亡日期" rules={[{ required: true, message: "请输入死亡日期" }]}><Input /></Form.Item></Col>
                <Col span={6}><Form.Item name="deathCause" label="死亡原因" rules={[{ required: true, message: "请选择死亡原因" }]}><Select options={[{ value: "肿瘤相关死亡" }, { value: "心脑血管疾病" }, { value: "其他原因" }]} /></Form.Item></Col>
                <Col span={6}><Form.Item name="deathPlace" label="死亡地点" rules={[{ required: true, message: "请选择死亡地点" }]}><Select options={[{ value: "医院" }, { value: "家中" }, { value: "养老机构" }, { value: "其他" }]} /></Form.Item></Col>
                <Col span={6}><Form.Item name="rootCauseCode" label="根本死因编码" rules={[{ required: true, message: "请输入根本死因编码" }]}><Input placeholder="C34.9" /></Form.Item></Col>
                <Col span={12}><Form.Item name="certificateSource" label="死亡证明来源" rules={[{ required: true, message: "请输入证明来源" }]}><Input /></Form.Item></Col>
                <Col span={12}><Form.Item name="note" label="补全说明"><Input /></Form.Item></Col>
              </Row>
            </Form>
          </>
        )}
      </Modal>

      <Modal title="死亡回退确认" open={Boolean(rollbackRow)} onCancel={() => setRollbackRow(null)} onOk={confirmRollback} okText="确认回退" cancelText="取消" okButtonProps={{ danger: true }} width={720}>
        {rollbackRow && (
          <>
            <Alert type="error" showIcon message="死亡回退会恢复上一条随访状态" description="正式系统应校验该死亡记录是否为最新且唯一有效死亡随访；回退后记录回到随访信息管理，并写入随访记录日志和系统操作日志。" style={{ marginBottom: 16 }} />
            <Form form={rollbackForm} layout="vertical">
              <Row gutter={12}>
                <Col span={8}><Form.Item name="restoreStatus" label="回退后状态"><Select options={[{ value: "存活" }, { value: "失访" }]} /></Form.Item></Col>
                <Col span={16}><Form.Item name="reason" label="回退原因" rules={[{ required: true, message: "请填写回退原因" }]}><Input /></Form.Item></Col>
              </Row>
            </Form>
          </>
        )}
      </Modal>

      <Modal title="导出死亡信息" open={exportOpen} onCancel={() => setExportOpen(false)} onOk={() => { setExportOpen(false); message.success("死亡信息导出任务已创建，并写入系统操作日志"); }} okText="确认导出" cancelText="取消">
        <Descriptions bordered column={1} size="small">
          <Descriptions.Item label="导出范围">当前筛选条件下 {filteredRows.length} 条死亡记录</Descriptions.Item>
          <Descriptions.Item label="敏感字段">身份证号、证明来源等按当前角色权限脱敏</Descriptions.Item>
          <Descriptions.Item label="审计记录">记录导出人、机构、时间、筛选条件和文件版本</Descriptions.Item>
        </Descriptions>
      </Modal>
    </div>
  );
}

function CauseSupplementManagement({ role }) {
  const [form] = Form.useForm();
  const [supplementForm] = Form.useForm();
  const [rejectForm] = Form.useForm();
  const [query, setQuery] = useState({});
  const [detailRow, setDetailRow] = useState(null);
  const [supplementRow, setSupplementRow] = useState(null);
  const [rejectRow, setRejectRow] = useState(null);
  const [assistRow, setAssistRow] = useState(null);

  const filteredRows = causeSupplementRows.filter((row) => {
    if (query.region && query.region !== "全部区划" && !row.region.includes(query.region)) return false;
    if (query.matchStatus && query.matchStatus !== "全部匹配" && row.matchStatus !== query.matchStatus) return false;
    if (query.processStatus && query.processStatus !== "全部处理" && row.processStatus !== query.processStatus) return false;
    if (query.batchNo && query.batchNo !== "全部批次" && row.batchNo !== query.batchNo) return false;
    if (query.keyword) {
      const field = query.searchType || "死因编号";
      const value = query.keyword.trim();
      if (field === "死因编号" && !row.causeNo.includes(value)) return false;
      if (field === "登记编号" && !row.no.includes(value)) return false;
      if (field === "姓名" && !row.name.includes(value)) return false;
      if (field === "身份证号" && !row.idCard.includes(value)) return false;
    }
    return true;
  });

  const summary = {
    pending: causeSupplementRows.filter((row) => row.processStatus === "待补录").length,
    matched: causeSupplementRows.filter((row) => row.matchStatus === "匹配成功").length,
    doubtful: causeSupplementRows.filter((row) => row.matchStatus === "匹配存疑").length,
    completed: causeSupplementRows.filter((row) => row.processStatus === "已补录").length,
    rejected: causeSupplementRows.filter((row) => row.processStatus === "已驳回").length,
    assist: causeSupplementRows.filter((row) => row.processStatus === "转协查").length
  };

  function openSupplement(row) {
    if (row.matchStatus !== "匹配成功") {
      message.warning("匹配存疑或未匹配记录需先转协查或人工确认后再补录。");
      return;
    }
    if (row.archived) {
      message.warning("已归档记录需走死亡信息更正流程，不可直接补录。");
      return;
    }
    setSupplementRow(row);
  }

  function confirmSupplement() {
    supplementForm
      .validateFields()
      .then(() => {
        setSupplementRow(null);
        message.success("死因信息已补录，并同步生成死亡随访记录和死亡信息管理记录");
      })
      .catch(() => message.error("补录失败：请补全死亡日期、根本死因、死因编码和死亡地点"));
  }

  function openReject(row) {
    setRejectRow(row);
  }

  function confirmReject() {
    rejectForm
      .validateFields()
      .then(() => {
        setRejectRow(null);
        message.success("死因记录已驳回，驳回原因已写入处理日志");
      })
      .catch(() => message.error("请填写驳回原因"));
  }

  function openAssist(row) {
    setAssistRow(row);
  }

  function confirmAssist() {
    setAssistRow(null);
    message.success("已生成死因协查任务，并推送至责任机构");
  }

  const columns = [
    {
      title: "死因编号",
      dataIndex: "causeNo",
      width: 165,
      fixed: "left",
      render: (value, row) => (
        <Button type="link" className="link-cell" onClick={() => setDetailRow(row)}>
          {value}
        </Button>
      )
    },
    { title: "登记编号", dataIndex: "no", width: 160 },
    { title: "姓名", dataIndex: "name", width: 90 },
    { title: "身份证号", dataIndex: "idCard", width: 190 },
    { title: "行政区划", dataIndex: "region", width: 150 },
    { title: "肿瘤诊断", dataIndex: "diagnosis", width: 210 },
    { title: "死亡日期", dataIndex: "deathDate", width: 115 },
    { title: "根本死因", dataIndex: "rootCause", width: 140 },
    { title: "死因来源", dataIndex: "sourceType", width: 135 },
    { title: "匹配状态", dataIndex: "matchStatus", width: 110, render: statusTag },
    { title: "处理状态", dataIndex: "processStatus", width: 110, render: statusTag },
    {
      title: "操作",
      width: 215,
      render: (_, row) => (
        <Space size={4}>
          <Button type="link" onClick={() => setDetailRow(row)}>详情</Button>
          <Button type="link" disabled={row.processStatus === "已补录"} onClick={() => openSupplement(row)}>补录</Button>
          <Button type="link" danger disabled={row.processStatus === "已补录"} onClick={() => openReject(row)}>驳回</Button>
          <Button type="link" disabled={row.processStatus === "已补录"} onClick={() => openAssist(row)}>转协查</Button>
        </Space>
      )
    }
  ];

  return (
    <div className="cause-supplement-page">
      <Row gutter={16} className="plan-stat-row">
        <Col span={4}><Card><Statistic title="待补录" value={summary.pending} suffix="条" valueStyle={{ color: "#d97706" }} /></Card></Col>
        <Col span={4}><Card><Statistic title="匹配成功" value={summary.matched} suffix="条" valueStyle={{ color: "#16a34a" }} /></Card></Col>
        <Col span={4}><Card><Statistic title="匹配存疑" value={summary.doubtful} suffix="条" valueStyle={{ color: "#d97706" }} /></Card></Col>
        <Col span={4}><Card><Statistic title="已补录" value={summary.completed} suffix="条" valueStyle={{ color: "#2563eb" }} /></Card></Col>
        <Col span={4}><Card><Statistic title="已驳回" value={summary.rejected} suffix="条" /></Card></Col>
        <Col span={4}><Card><Statistic title="转协查" value={summary.assist} suffix="条" /></Card></Col>
      </Row>

      <Card className="search-card maintenance-search">
        <Form form={form} layout="inline" initialValues={{ region: "全部区划", matchStatus: "全部匹配", processStatus: "全部处理", batchNo: "全部批次", dateType: "死亡日期", searchType: "死因编号" }}>
          <Form.Item name="region">
            <Select className="filter-select" options={[{ value: "全部区划" }, { value: "郑州市" }, { value: "许昌市" }, { value: "南昌市" }]} />
          </Form.Item>
          <Form.Item name="matchStatus">
            <Select className="filter-select" options={[{ value: "全部匹配" }, { value: "匹配成功" }, { value: "匹配存疑" }, { value: "未匹配" }]} />
          </Form.Item>
          <Form.Item name="processStatus">
            <Select className="filter-select" options={[{ value: "全部处理" }, { value: "待补录" }, { value: "待处理" }, { value: "已补录" }, { value: "已驳回" }, { value: "转协查" }]} />
          </Form.Item>
          <Form.Item name="batchNo">
            <Select className="filter-select" options={[{ value: "全部批次" }, { value: "COD-BACK-20260608-01" }, { value: "COD-BACK-20260608-02" }, { value: "COD-BACK-20260601-01" }]} />
          </Form.Item>
          <Form.Item name="dateType">
            <Select className="filter-select" options={[{ value: "死亡日期" }, { value: "回流日期" }, { value: "确诊日期" }]} />
          </Form.Item>
          <Form.Item name="dateRange">
            <Input className="date-range-input" placeholder="2026-06-01 至 2026-06-30" />
          </Form.Item>
          <Form.Item name="searchType">
            <Select className="filter-select small" options={[{ value: "死因编号" }, { value: "登记编号" }, { value: "姓名" }, { value: "身份证号" }]} />
          </Form.Item>
          <Form.Item name="keyword">
            <Input prefix={<SearchOutlined />} className="keyword-input" placeholder="请输入检索内容" />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" icon={<SearchOutlined />} onClick={() => { setQuery(form.getFieldsValue()); message.success("死因补录查询完成"); }}>查询</Button>
              <Button onClick={() => { form.resetFields(); setQuery({}); }}>重置</Button>
              <Button onClick={() => message.success(`已导出 ${filteredRows.length} 条死因补录待办`)}>导出 Excel</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>

      <Card className="table-card">
        <Alert
          className="table-alert"
          type="info"
          showIcon
          message="死因补录处理外部死因回流待办"
          description="匹配成功记录可补录；匹配存疑需人工确认或转协查；未匹配记录不可直接补录；已归档记录需走死亡信息更正流程。"
        />
        <Table columns={columns} dataSource={filteredRows} pagination={false} scroll={{ x: 1700 }} />
        <Flex justify="space-between" align="center" className="pagination-row">
          <Text type="secondary">共 {filteredRows.length} 条待办，第 1 / 1 页</Text>
          <Pagination current={1} total={filteredRows.length} pageSize={10} />
        </Flex>
      </Card>

      <Drawer title="死因匹配详情" open={Boolean(detailRow)} onClose={() => setDetailRow(null)} width={920}>
        {detailRow && (
          <>
            <Row gutter={16}>
              <Col span={12}>
                <Card title="死因回流信息" size="small">
                  <Descriptions bordered column={1} size="small">
                    <Descriptions.Item label="死因编号">{detailRow.causeNo}</Descriptions.Item>
                    <Descriptions.Item label="来源批次">{detailRow.batchNo}</Descriptions.Item>
                    <Descriptions.Item label="姓名">{detailRow.name}</Descriptions.Item>
                    <Descriptions.Item label="身份证号">{detailRow.idCard}</Descriptions.Item>
                    <Descriptions.Item label="死亡日期">{detailRow.deathDate}</Descriptions.Item>
                    <Descriptions.Item label="根本死因">{detailRow.rootCause}</Descriptions.Item>
                    <Descriptions.Item label="死因编码">{detailRow.causeCode}</Descriptions.Item>
                    <Descriptions.Item label="死亡地点">{detailRow.deathPlace}</Descriptions.Item>
                    <Descriptions.Item label="死因来源">{detailRow.sourceType}</Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col>
              <Col span={12}>
                <Card title="匹配登记信息" size="small">
                  <Descriptions bordered column={1} size="small">
                    <Descriptions.Item label="登记编号">{detailRow.no}</Descriptions.Item>
                    <Descriptions.Item label="肿瘤诊断">{detailRow.diagnosis}</Descriptions.Item>
                    <Descriptions.Item label="确诊日期">{detailRow.diagnosisDate}</Descriptions.Item>
                    <Descriptions.Item label="行政区划">{detailRow.region}</Descriptions.Item>
                    <Descriptions.Item label="地址">{detailRow.address}</Descriptions.Item>
                    <Descriptions.Item label="匹配状态">{statusTag(detailRow.matchStatus)}</Descriptions.Item>
                    <Descriptions.Item label="置信度">{detailRow.confidence}</Descriptions.Item>
                    <Descriptions.Item label="匹配依据">{detailRow.matchBasis}</Descriptions.Item>
                    <Descriptions.Item label="处理状态">{statusTag(detailRow.processStatus)}</Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col>
            </Row>
            <div className="drawer-action-row">
              <Space>
                <Button type="primary" disabled={detailRow.processStatus === "已补录"} onClick={() => openSupplement(detailRow)}>补录</Button>
                <Button danger disabled={detailRow.processStatus === "已补录"} onClick={() => openReject(detailRow)}>驳回</Button>
                <Button disabled={detailRow.processStatus === "已补录"} onClick={() => openAssist(detailRow)}>转协查</Button>
              </Space>
            </div>
          </>
        )}
      </Drawer>

      <Modal title="死因补录" open={Boolean(supplementRow)} onCancel={() => setSupplementRow(null)} onOk={confirmSupplement} okText="提交补录" cancelText="取消" width={820} destroyOnHidden>
        {supplementRow && (
          <>
            <Alert type="info" showIcon message="补录后将同步更新死亡信息管理和随访记录" description={`登记编号 ${supplementRow.no}，匹配依据：${supplementRow.matchBasis}`} style={{ marginBottom: 16 }} />
            <Form
              key={supplementRow.key}
              form={supplementForm}
              layout="vertical"
              initialValues={{
                deathDate: supplementRow.deathDate,
                rootCause: supplementRow.rootCause,
                causeCode: supplementRow.causeCode,
                deathPlace: supplementRow.deathPlace,
                certificateSource: supplementRow.sourceType,
                note: "根据死因回流数据补录死亡信息"
              }}
            >
              <Row gutter={12}>
                <Col span={6}><Form.Item name="deathDate" label="死亡日期" rules={[{ required: true, message: "请输入死亡日期" }]}><Input /></Form.Item></Col>
                <Col span={6}><Form.Item name="rootCause" label="根本死因" rules={[{ required: true, message: "请输入根本死因" }]}><Input /></Form.Item></Col>
                <Col span={6}><Form.Item name="causeCode" label="死因编码" rules={[{ required: true, message: "请输入死因编码" }]}><Input /></Form.Item></Col>
                <Col span={6}><Form.Item name="deathPlace" label="死亡地点" rules={[{ required: true, message: "请选择死亡地点" }]}><Select options={[{ value: "医院" }, { value: "家中" }, { value: "养老机构" }, { value: "其他" }]} /></Form.Item></Col>
                <Col span={12}><Form.Item name="certificateSource" label="死亡证明来源" rules={[{ required: true, message: "请输入死亡证明来源" }]}><Input /></Form.Item></Col>
                <Col span={12}><Form.Item name="note" label="补录说明"><Input /></Form.Item></Col>
              </Row>
            </Form>
          </>
        )}
      </Modal>

      <Modal title="驳回死因记录" open={Boolean(rejectRow)} onCancel={() => setRejectRow(null)} onOk={confirmReject} okText="确认驳回" cancelText="取消" okButtonProps={{ danger: true }} width={680}>
        {rejectRow && (
          <Form
            key={rejectRow.key}
            form={rejectForm}
            layout="vertical"
            initialValues={{
              reason: rejectRow.matchStatus === "未匹配" ? "未匹配到有效肿瘤登记报告卡" : "死因记录与登记信息不一致"
            }}
          >
            <Alert type="warning" showIcon message="驳回后该死因记录不更新死亡信息" description={`死因编号 ${rejectRow.causeNo}，当前匹配状态：${rejectRow.matchStatus}`} style={{ marginBottom: 16 }} />
            <Form.Item name="reason" label="驳回原因" rules={[{ required: true, message: "请填写驳回原因" }]}>
              <Select options={[{ value: "非肿瘤登记对象" }, { value: "死因记录重复" }, { value: "身份证不一致" }, { value: "死亡日期逻辑错误" }, { value: "未匹配到有效报告卡" }]} />
            </Form.Item>
          </Form>
        )}
      </Modal>

      <Modal title="转协查" open={Boolean(assistRow)} onCancel={() => setAssistRow(null)} onOk={confirmAssist} okText="生成协查任务" cancelText="取消" width={760}>
        {assistRow && (
          <Form
            layout="vertical"
            initialValues={{
              assistOrg: assistRow.region.includes("许昌") ? "魏都区疾控中心" : "金水区疾控中心",
              dueDate: "2026-06-15",
              priority: "普通",
              reason: assistRow.matchStatus === "匹配存疑" ? "死亡日期早于确诊日期，需核实死因记录" : assistRow.matchStatus === "未匹配" ? "死因记录未匹配到有效报告卡，需基层协查" : "已匹配登记卡，需核实死亡证明来源和死亡地点"
            }}
          >
            <Alert type="info" showIcon message="转协查会生成责任机构待办" description={`死因编号 ${assistRow.causeNo}，匹配依据：${assistRow.matchBasis}`} style={{ marginBottom: 16 }} />
            <Row gutter={12}>
              <Col span={8}><Form.Item name="assistOrg" label="协查机构" rules={[{ required: true, message: "请选择协查机构" }]}><Select options={[{ value: "金水区疾控中心" }, { value: "魏都区疾控中心" }, { value: "南昌市东湖区疾控中心" }]} /></Form.Item></Col>
              <Col span={8}><Form.Item name="dueDate" label="要求完成日期" rules={[{ required: true, message: "请输入完成日期" }]}><Input /></Form.Item></Col>
              <Col span={8}><Form.Item name="priority" label="优先级"><Select options={[{ value: "普通" }, { value: "紧急" }]} /></Form.Item></Col>
              <Col span={24}><Form.Item name="reason" label="协查原因" rules={[{ required: true, message: "请填写协查原因" }]}><Input.TextArea rows={3} /></Form.Item></Col>
            </Row>
          </Form>
        )}
      </Modal>
    </div>
  );
}

function TumorDuplicateReportCheck({ role }) {
  const [form] = Form.useForm();
  const [mergeForm] = Form.useForm();
  const [multiForm] = Form.useForm();
  const [query, setQuery] = useState({});
  const [detailRow, setDetailRow] = useState(null);
  const [mergeRow, setMergeRow] = useState(null);
  const [quickRow, setQuickRow] = useState(null);
  const [multiRow, setMultiRow] = useState(null);

  const filteredRows = duplicateReportRows.filter((row) => {
    if (query.region && query.region !== "全部区划" && !row.region.includes(query.region)) return false;
    if (query.judge && query.judge !== "全部结果" && row.judge !== query.judge) return false;
    if (query.risk && query.risk !== "全部风险" && row.risk !== query.risk) return false;
    if (query.status && query.status !== "全部状态" && row.status !== query.status) return false;
    if (query.basis && query.basis !== "全部依据" && !row.basis.includes(query.basis)) return false;
    if (query.keyword) {
      const field = query.searchType || "组号";
      const value = query.keyword.trim();
      if (field === "组号" && !row.groupNo.includes(value)) return false;
      if (field === "姓名" && !row.patientName.includes(value)) return false;
      if (field === "身份证号" && !row.idCard.includes(value)) return false;
      if (field === "登记编号" && !row.candidates.some((item) => item.no.includes(value))) return false;
    }
    return true;
  });

  const summary = {
    groups: duplicateReportRows.length,
    cards: duplicateReportRows.reduce((sum, row) => sum + row.candidateCount, 0),
    high: duplicateReportRows.filter((row) => row.risk === "高").length,
    pending: duplicateReportRows.filter((row) => row.status !== "已处理").length,
    multi: duplicateReportRows.filter((row) => row.judge === "疑似多原发").length,
    done: duplicateReportRows.filter((row) => row.status === "已处理").length
  };

  const candidateColumns = [
    { title: "登记编号", dataIndex: "no", width: 150 },
    { title: "卡片类型", dataIndex: "cardType", width: 100 },
    { title: "报告单位", dataIndex: "org", width: 180 },
    { title: "报告日期", dataIndex: "reportDate", width: 115 },
    { title: "诊断日期", dataIndex: "diagnosisDate", width: 115 },
    { title: "诊断部位", dataIndex: "site", width: 190 },
    { title: "卡片状态", dataIndex: "status", width: 110, render: statusTag },
    { title: "质控", dataIndex: "quality", width: 80, render: statusTag },
    { title: "完整度", dataIndex: "completeness", width: 90 },
    { title: "建议", dataIndex: "keepRecommend", width: 90 }
  ];

  function openMerge(row) {
    if (row.judge === "疑似多原发") {
      message.warning("疑似多原发不能直接合并，请先进入标记多原发流程。");
      return;
    }
    setMergeRow(row);
  }

  function confirmMerge() {
    mergeForm
      .validateFields()
      .then(() => {
        setMergeRow(null);
        message.success("对比合并申请已提交，系统将保留来源卡关系并写入重卡处理日志");
      })
      .catch(() => message.error("请确认保留卡、合并方式和处理说明"));
  }

  function openQuick(row) {
    if (row.judge === "疑似多原发" || row.risk !== "低") {
      setQuickRow(row);
      return;
    }
    message.success(`${row.groupNo} 已按低风险规则快速合并，重复卡自动作废并保留来源关系`);
  }

  function transferQuickToMerge() {
    const row = quickRow;
    setQuickRow(null);
    if (row) {
      window.setTimeout(() => setMergeRow(row), 0);
    }
  }

  function openMulti(row) {
    setMultiRow(row);
  }

  function confirmMulti() {
    multiForm
      .validateFields()
      .then(() => {
        setMultiRow(null);
        message.success("已标记多原发关系，该组记录不再进入重复卡合并队列");
      })
      .catch(() => message.error("请填写多原发判断依据"));
  }

  const columns = [
    {
      title: "重卡组号",
      dataIndex: "groupNo",
      width: 175,
      fixed: "left",
      render: (value, row) => (
        <Button type="link" className="link-cell" onClick={() => setDetailRow(row)}>
          {value}
        </Button>
      )
    },
    { title: "患者姓名", dataIndex: "patientName", width: 95 },
    { title: "身份证号", dataIndex: "idCard", width: 190 },
    { title: "行政区划", dataIndex: "region", width: 150 },
    { title: "关联卡数", dataIndex: "candidateCount", width: 90, render: (value) => `${value} 张` },
    { title: "查重依据", dataIndex: "basis", width: 240 },
    { title: "关键冲突", dataIndex: "conflict", width: 240 },
    { title: "判断结果", dataIndex: "judge", width: 115, render: statusTag },
    { title: "风险等级", dataIndex: "risk", width: 90, render: (value) => <Tag color={value === "高" ? "red" : value === "中" ? "orange" : "green"}>{value}</Tag> },
    { title: "处理状态", dataIndex: "status", width: 105, render: statusTag },
    { title: "责任机构", dataIndex: "ownerOrg", width: 155 },
    { title: "发现日期", dataIndex: "discoverDate", width: 115 },
    {
      title: "操作",
      width: 260,
      render: (_, row) => (
        <Space size={4}>
          <Button type="link" onClick={() => setDetailRow(row)}>详情</Button>
          <Button type="link" disabled={row.status === "已处理"} onClick={() => openMerge(row)}>对比合并</Button>
          <Button type="link" disabled={row.status === "已处理"} onClick={() => openQuick(row)}>快速合并</Button>
          <Button type="link" disabled={row.status === "已处理"} onClick={() => openMulti(row)}>标记多原发</Button>
        </Space>
      )
    }
  ];

  return (
    <div className="duplicate-report-page">
      <Row gutter={16} className="plan-stat-row">
        <Col span={4}><Card><Statistic title="疑似重卡组" value={summary.groups} suffix="组" /></Card></Col>
        <Col span={4}><Card><Statistic title="关联报告卡" value={summary.cards} suffix="张" valueStyle={{ color: "#2563eb" }} /></Card></Col>
        <Col span={4}><Card><Statistic title="高风险" value={summary.high} suffix="组" valueStyle={{ color: "#dc2626" }} /></Card></Col>
        <Col span={4}><Card><Statistic title="待处理" value={summary.pending} suffix="组" valueStyle={{ color: "#d97706" }} /></Card></Col>
        <Col span={4}><Card><Statistic title="疑似多原发" value={summary.multi} suffix="组" /></Card></Col>
        <Col span={4}><Card><Statistic title="已处理" value={summary.done} suffix="组" valueStyle={{ color: "#16a34a" }} /></Card></Col>
      </Row>

      <Card className="search-card maintenance-search">
        <Form form={form} layout="inline" initialValues={{ region: "全部区划", judge: "全部结果", risk: "全部风险", status: "全部状态", basis: "全部依据", dateType: "发现日期", searchType: "组号" }}>
          <Form.Item name="region">
            <Select className="filter-select" options={[{ value: "全部区划" }, { value: "郑州市" }, { value: "洛阳市" }, { value: "许昌市" }, { value: "南昌市" }]} />
          </Form.Item>
          <Form.Item name="judge">
            <Select className="filter-select" options={[{ value: "全部结果" }, { value: "疑似重复" }, { value: "需人工复核" }, { value: "疑似多原发" }]} />
          </Form.Item>
          <Form.Item name="risk">
            <Select className="filter-select small" options={[{ value: "全部风险" }, { value: "高" }, { value: "中" }, { value: "低" }]} />
          </Form.Item>
          <Form.Item name="status">
            <Select className="filter-select" options={[{ value: "全部状态" }, { value: "待处理" }, { value: "待确认" }, { value: "待标记" }, { value: "已处理" }]} />
          </Form.Item>
          <Form.Item name="basis">
            <Select className="filter-select" options={[{ value: "全部依据" }, { value: "身份证号" }, { value: "姓名" }, { value: "地址" }]} />
          </Form.Item>
          <Form.Item name="dateType">
            <Select className="filter-select small" options={[{ value: "发现日期" }, { value: "报告日期" }, { value: "诊断日期" }]} />
          </Form.Item>
          <Form.Item name="dateRange">
            <Input className="date-range-input" placeholder="2026-06-01 至 2026-06-30" />
          </Form.Item>
          <Form.Item name="searchType">
            <Select className="filter-select small" options={[{ value: "组号" }, { value: "登记编号" }, { value: "姓名" }, { value: "身份证号" }]} />
          </Form.Item>
          <Form.Item name="keyword">
            <Input prefix={<SearchOutlined />} className="keyword-input" placeholder="请输入检索内容" />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" icon={<SearchOutlined />} onClick={() => { setQuery(form.getFieldsValue()); message.success("肿瘤登记报告查重查询完成"); }}>查询</Button>
              <Button onClick={() => { form.resetFields(); setQuery({}); }}>重置</Button>
              <Button onClick={() => message.success("已按当前条件重新执行查重分析")}>查重分析</Button>
              <Button onClick={() => message.success(`已导出 ${filteredRows.length} 组疑似重卡`) }>导出 Excel</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>

      <Card className="table-card">
        <Alert
          className="table-alert"
          type="warning"
          showIcon
          message="重卡处理会影响报告卡主档案关系"
          description="快速合并仅适用于低风险、无关键冲突的重复报告；疑似多原发和高风险组必须人工对比，处理后保留来源卡、目标卡、字段选择和操作日志。"
        />
        <Table columns={columns} dataSource={filteredRows} pagination={false} scroll={{ x: 2050 }} />
        <Flex justify="space-between" align="center" className="pagination-row">
          <Text type="secondary">共 {filteredRows.length} 组疑似重卡，第 1 / 1 页</Text>
          <Pagination current={1} total={filteredRows.length} pageSize={10} />
        </Flex>
      </Card>

      <Drawer title="肿瘤登记报告查重详情" open={Boolean(detailRow)} onClose={() => setDetailRow(null)} width={1060}>
        {detailRow && (
          <>
            <Descriptions bordered column={3} size="small">
              <Descriptions.Item label="重卡组号">{detailRow.groupNo}</Descriptions.Item>
              <Descriptions.Item label="患者姓名">{detailRow.patientName}</Descriptions.Item>
              <Descriptions.Item label="身份证号">{detailRow.idCard}</Descriptions.Item>
              <Descriptions.Item label="行政区划">{detailRow.region}</Descriptions.Item>
              <Descriptions.Item label="判断结果">{statusTag(detailRow.judge)}</Descriptions.Item>
              <Descriptions.Item label="风险等级"><Tag color={detailRow.risk === "高" ? "red" : detailRow.risk === "中" ? "orange" : "green"}>{detailRow.risk}</Tag></Descriptions.Item>
              <Descriptions.Item label="查重依据" span={2}>{detailRow.basis}</Descriptions.Item>
              <Descriptions.Item label="处理状态">{statusTag(detailRow.status)}</Descriptions.Item>
              <Descriptions.Item label="关键冲突" span={3}>{detailRow.conflict}</Descriptions.Item>
              <Descriptions.Item label="处理建议" span={3}>{detailRow.suggestion}</Descriptions.Item>
            </Descriptions>
            <Card title="组内报告卡对比" size="small" className="history-card">
              <Table columns={candidateColumns} dataSource={detailRow.candidates} pagination={false} rowKey="no" scroll={{ x: 1300 }} />
            </Card>
            <div className="drawer-action-row">
              <Space>
                <Button type="primary" disabled={detailRow.status === "已处理"} onClick={() => openMerge(detailRow)}>对比合并</Button>
                <Button disabled={detailRow.status === "已处理"} onClick={() => openQuick(detailRow)}>快速合并</Button>
                <Button disabled={detailRow.status === "已处理"} onClick={() => openMulti(detailRow)}>标记多原发</Button>
              </Space>
            </div>
          </>
        )}
      </Drawer>

      <Modal title="对比合并确认" open={Boolean(mergeRow)} onCancel={() => setMergeRow(null)} onOk={confirmMerge} okText="提交合并" cancelText="取消" width={820} destroyOnHidden>
        {mergeRow && (
          <>
            <Alert type="info" showIcon message="合并后重复卡将保留来源关系" description={`${mergeRow.groupNo}，${mergeRow.suggestion}`} style={{ marginBottom: 16 }} />
            <Form
              key={mergeRow.key}
              form={mergeForm}
              layout="vertical"
              initialValues={{ keepCard: mergeRow.candidates[0]?.no, mergeMode: "保留完整度最高字段", reason: "同一患者同一肿瘤报告重复上报，按重卡规则合并" }}
            >
              <Row gutter={12}>
                <Col span={8}><Form.Item name="keepCard" label="保留主卡" rules={[{ required: true, message: "请选择保留主卡" }]}><Select options={mergeRow.candidates.map((item) => ({ value: item.no }))} /></Form.Item></Col>
                <Col span={8}><Form.Item name="mergeMode" label="字段合并方式" rules={[{ required: true, message: "请选择合并方式" }]}><Select options={[{ value: "保留完整度最高字段" }, { value: "保留正式卡字段优先" }, { value: "人工逐项选择" }]} /></Form.Item></Col>
                <Col span={8}><Form.Item name="voidMode" label="重复卡处理"><Select options={[{ value: "合并后自动作废" }, { value: "合并后待审核作废" }]} /></Form.Item></Col>
                <Col span={24}><Form.Item name="reason" label="处理说明" rules={[{ required: true, message: "请填写处理说明" }]}><Input.TextArea rows={3} /></Form.Item></Col>
              </Row>
            </Form>
          </>
        )}
      </Modal>

      <Modal title="快速合并阻断" open={Boolean(quickRow)} onCancel={() => setQuickRow(null)} onOk={transferQuickToMerge} okText="转对比合并" cancelText="取消" width={700} destroyOnHidden>
        {quickRow && (
          <Alert
            type="warning"
            showIcon
            message="当前组不满足快速合并条件"
            description={`${quickRow.groupNo}：${quickRow.judge}，风险等级${quickRow.risk}。${quickRow.conflict}。请进入对比合并或标记多原发流程，避免误合并。`}
          />
        )}
      </Modal>

      <Modal title="标记多原发" open={Boolean(multiRow)} onCancel={() => setMultiRow(null)} onOk={confirmMulti} okText="确认标记" cancelText="取消" width={760} destroyOnHidden>
        {multiRow && (
          <>
            <Alert type="info" showIcon message="多原发记录不会按重复卡合并" description={`${multiRow.groupNo}，${multiRow.conflict}`} style={{ marginBottom: 16 }} />
            <Form
              key={multiRow.key}
              form={multiForm}
              layout="vertical"
              initialValues={{ relationType: "疑似多原发", basis: multiRow.judge === "疑似多原发" ? "发病部位不同，符合多原发人工复核条件" : "经人工复核，确认为不同原发肿瘤" }}
            >
              <Row gutter={12}>
                <Col span={8}><Form.Item name="relationType" label="关系类型"><Select options={[{ value: "疑似多原发" }, { value: "确认多原发" }]} /></Form.Item></Col>
                <Col span={16}><Form.Item name="basis" label="判断依据" rules={[{ required: true, message: "请填写判断依据" }]}><Input /></Form.Item></Col>
                <Col span={24}><Form.Item name="note" label="备注"><Input.TextArea rows={3} placeholder="可填写病理号、诊断日期、解剖部位或复核意见" /></Form.Item></Col>
              </Row>
            </Form>
          </>
        )}
      </Modal>
    </div>
  );
}

function PopulationDuplicateCheck({ role }) {
  const [form] = Form.useForm();
  const [mergeForm] = Form.useForm();
  const [assistForm] = Form.useForm();
  const [query, setQuery] = useState({});
  const [detailRow, setDetailRow] = useState(null);
  const [mergeRow, setMergeRow] = useState(null);
  const [assistRow, setAssistRow] = useState(null);
  const [excludeRow, setExcludeRow] = useState(null);

  const filteredRows = duplicatePopulationRows.filter((row) => {
    if (query.region && query.region !== "全部区划" && !row.region.includes(query.region)) return false;
    if (query.judge && query.judge !== "全部结果" && row.judge !== query.judge) return false;
    if (query.risk && query.risk !== "全部风险" && row.risk !== query.risk) return false;
    if (query.status && query.status !== "全部状态" && row.status !== query.status) return false;
    if (query.basis && query.basis !== "全部依据" && !row.basis.includes(query.basis)) return false;
    if (query.keyword) {
      const field = query.searchType || "人口编号";
      const value = query.keyword.trim();
      if (field === "人口编号" && !row.candidates.some((item) => item.personNo.includes(value))) return false;
      if (field === "姓名" && !row.patientName.includes(value)) return false;
      if (field === "身份证号" && !row.idCard.includes(value)) return false;
      if (field === "组号" && !row.groupNo.includes(value)) return false;
    }
    return true;
  });

  const summary = {
    groups: duplicatePopulationRows.length,
    persons: duplicatePopulationRows.reduce((sum, row) => sum + row.candidateCount, 0),
    high: duplicatePopulationRows.filter((row) => row.risk === "高").length,
    pending: duplicatePopulationRows.filter((row) => row.status !== "已合并").length,
    assist: duplicatePopulationRows.filter((row) => row.status === "待协查").length,
    merged: duplicatePopulationRows.filter((row) => row.status === "已合并").length
  };

  const personColumns = [
    { title: "人口编号", dataIndex: "personNo", width: 165 },
    { title: "姓名", dataIndex: "name", width: 80 },
    { title: "性别", dataIndex: "sex", width: 70 },
    { title: "出生日期", dataIndex: "birthDate", width: 115 },
    { title: "身份证号", dataIndex: "idCard", width: 185 },
    { title: "联系电话", dataIndex: "phone", width: 120 },
    { title: "常住地址", dataIndex: "address", width: 230 },
    { title: "报告卡", dataIndex: "reportCards", width: 80, render: (value) => `${value} 张` },
    { title: "随访", dataIndex: "followups", width: 75, render: (value) => `${value} 条` },
    { title: "死亡", dataIndex: "deaths", width: 75, render: (value) => `${value} 条` },
    { title: "来源", dataIndex: "source", width: 160 },
    { title: "完整度", dataIndex: "completeness", width: 90 },
    { title: "建议", dataIndex: "recommend", width: 130 }
  ];

  function openMerge(row) {
    if (row.status === "待协查") {
      message.warning("该组存在身份信息冲突，请先协查确认后再合并。");
      return;
    }
    setMergeRow(row);
  }

  function confirmMerge() {
    mergeForm
      .validateFields()
      .then(() => {
        setMergeRow(null);
        message.success("人口主档合并已提交，报告卡、随访、死亡和地址关系将迁移至保留主档");
      })
      .catch(() => message.error("请确认保留主档、迁移范围和合并说明"));
  }

  function openAssist(row) {
    setAssistRow(row);
  }

  function confirmAssist() {
    assistForm
      .validateFields()
      .then(() => {
        setAssistRow(null);
        message.success("人口信息协查任务已生成，并推送至责任机构");
      })
      .catch(() => message.error("请填写协查机构和协查原因"));
  }

  function confirmExclude() {
    setExcludeRow(null);
    message.success("已标记为非同一人，该组不再参与人口合并");
  }

  const columns = [
    {
      title: "查重组号",
      dataIndex: "groupNo",
      width: 175,
      fixed: "left",
      render: (value, row) => (
        <Button type="link" className="link-cell" onClick={() => setDetailRow(row)}>
          {value}
        </Button>
      )
    },
    { title: "主档人口编号", dataIndex: "masterPersonNo", width: 165 },
    { title: "姓名", dataIndex: "patientName", width: 90 },
    { title: "性别", dataIndex: "sex", width: 70 },
    { title: "出生日期", dataIndex: "birthDate", width: 115 },
    { title: "身份证号", dataIndex: "idCard", width: 190 },
    { title: "行政区划", dataIndex: "region", width: 150 },
    { title: "候选人口", dataIndex: "candidateCount", width: 95, render: (value) => `${value} 条` },
    { title: "查重依据", dataIndex: "basis", width: 220 },
    { title: "信息冲突", dataIndex: "conflict", width: 230 },
    { title: "判断结果", dataIndex: "judge", width: 115, render: statusTag },
    { title: "风险等级", dataIndex: "risk", width: 90, render: (value) => <Tag color={value === "高" ? "red" : value === "中" ? "orange" : "green"}>{value}</Tag> },
    { title: "处理状态", dataIndex: "status", width: 105, render: statusTag },
    { title: "影响关系", dataIndex: "relationImpact", width: 220 },
    { title: "发现日期", dataIndex: "discoverDate", width: 115 },
    {
      title: "操作",
      width: 260,
      render: (_, row) => (
        <Space size={4}>
          <Button type="link" onClick={() => setDetailRow(row)}>详情</Button>
          <Button type="link" disabled={row.status === "已合并"} onClick={() => openMerge(row)}>人口合并</Button>
          <Button type="link" disabled={row.status === "已合并"} onClick={() => openAssist(row)}>转协查</Button>
          <Button type="link" danger disabled={row.status === "已合并"} onClick={() => setExcludeRow(row)}>非同一人</Button>
        </Space>
      )
    }
  ];

  return (
    <div className="population-duplicate-page">
      <Row gutter={16} className="plan-stat-row">
        <Col span={4}><Card><Statistic title="疑似人口组" value={summary.groups} suffix="组" /></Card></Col>
        <Col span={4}><Card><Statistic title="候选人口" value={summary.persons} suffix="条" valueStyle={{ color: "#2563eb" }} /></Card></Col>
        <Col span={4}><Card><Statistic title="高风险" value={summary.high} suffix="组" valueStyle={{ color: "#dc2626" }} /></Card></Col>
        <Col span={4}><Card><Statistic title="待处理" value={summary.pending} suffix="组" valueStyle={{ color: "#d97706" }} /></Card></Col>
        <Col span={4}><Card><Statistic title="待协查" value={summary.assist} suffix="组" /></Card></Col>
        <Col span={4}><Card><Statistic title="已合并" value={summary.merged} suffix="组" valueStyle={{ color: "#16a34a" }} /></Card></Col>
      </Row>

      <Card className="search-card maintenance-search">
        <Form form={form} layout="inline" initialValues={{ region: "全部区划", judge: "全部结果", risk: "全部风险", status: "全部状态", basis: "全部依据", dateType: "发现日期", searchType: "人口编号" }}>
          <Form.Item name="region">
            <Select className="filter-select" options={[{ value: "全部区划" }, { value: "郑州市" }, { value: "许昌市" }, { value: "洛阳市" }, { value: "南昌市" }]} />
          </Form.Item>
          <Form.Item name="judge">
            <Select className="filter-select" options={[{ value: "全部结果" }, { value: "疑似同一人" }, { value: "需人工核实" }, { value: "同一人多原发" }]} />
          </Form.Item>
          <Form.Item name="risk">
            <Select className="filter-select small" options={[{ value: "全部风险" }, { value: "高" }, { value: "中" }, { value: "低" }]} />
          </Form.Item>
          <Form.Item name="status">
            <Select className="filter-select" options={[{ value: "全部状态" }, { value: "待合并" }, { value: "待协查" }, { value: "待确认" }, { value: "已合并" }]} />
          </Form.Item>
          <Form.Item name="basis">
            <Select className="filter-select" options={[{ value: "全部依据" }, { value: "身份证号" }, { value: "手机号" }, { value: "地址" }, { value: "出生日期" }]} />
          </Form.Item>
          <Form.Item name="dateType">
            <Select className="filter-select small" options={[{ value: "发现日期" }, { value: "建档日期" }, { value: "更新日期" }]} />
          </Form.Item>
          <Form.Item name="dateRange">
            <Input className="date-range-input" placeholder="2026-06-01 至 2026-06-30" />
          </Form.Item>
          <Form.Item name="searchType">
            <Select className="filter-select small" options={[{ value: "人口编号" }, { value: "组号" }, { value: "姓名" }, { value: "身份证号" }]} />
          </Form.Item>
          <Form.Item name="keyword">
            <Input prefix={<SearchOutlined />} className="keyword-input" placeholder="请输入检索内容" />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" icon={<SearchOutlined />} onClick={() => { setQuery(form.getFieldsValue()); message.success("发病人口信息查重查询完成"); }}>查询</Button>
              <Button onClick={() => { form.resetFields(); setQuery({}); }}>重置</Button>
              <Button onClick={() => message.success("已按当前范围重新执行人口查重")}>查重分析</Button>
              <Button onClick={() => message.success(`已导出 ${filteredRows.length} 组人口查重结果`) }>导出 Excel</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>

      <Card className="table-card">
        <Alert
          className="table-alert"
          type="warning"
          showIcon
          message="人口合并会迁移关联业务关系"
          description="发病人口主档合并后，报告卡、空间地址、随访、死亡记录和日志需同步挂接到保留主档；存在身份证缺失、出生日期冲突或地址冲突时，应先协查确认。"
        />
        <Table columns={columns} dataSource={filteredRows} pagination={false} scroll={{ x: 2400 }} />
        <Flex justify="space-between" align="center" className="pagination-row">
          <Text type="secondary">共 {filteredRows.length} 组疑似重复人口，第 1 / 1 页</Text>
          <Pagination current={1} total={filteredRows.length} pageSize={10} />
        </Flex>
      </Card>

      <Drawer title="发病人口查重详情" open={Boolean(detailRow)} onClose={() => setDetailRow(null)} width={1120}>
        {detailRow && (
          <>
            <Descriptions bordered column={3} size="small">
              <Descriptions.Item label="查重组号">{detailRow.groupNo}</Descriptions.Item>
              <Descriptions.Item label="主档人口编号">{detailRow.masterPersonNo}</Descriptions.Item>
              <Descriptions.Item label="处理状态">{statusTag(detailRow.status)}</Descriptions.Item>
              <Descriptions.Item label="姓名">{detailRow.patientName}</Descriptions.Item>
              <Descriptions.Item label="性别">{detailRow.sex}</Descriptions.Item>
              <Descriptions.Item label="出生日期">{detailRow.birthDate}</Descriptions.Item>
              <Descriptions.Item label="身份证号">{detailRow.idCard}</Descriptions.Item>
              <Descriptions.Item label="行政区划">{detailRow.region}</Descriptions.Item>
              <Descriptions.Item label="判断结果">{statusTag(detailRow.judge)}</Descriptions.Item>
              <Descriptions.Item label="查重依据" span={2}>{detailRow.basis}</Descriptions.Item>
              <Descriptions.Item label="风险等级"><Tag color={detailRow.risk === "高" ? "red" : detailRow.risk === "中" ? "orange" : "green"}>{detailRow.risk}</Tag></Descriptions.Item>
              <Descriptions.Item label="信息冲突" span={3}>{detailRow.conflict}</Descriptions.Item>
              <Descriptions.Item label="影响关系" span={3}>{detailRow.relationImpact}</Descriptions.Item>
              <Descriptions.Item label="处理建议" span={3}>{detailRow.suggestion}</Descriptions.Item>
            </Descriptions>
            <Card title="候选人口信息对比" size="small" className="history-card">
              <Table columns={personColumns} dataSource={detailRow.candidates} pagination={false} rowKey="personNo" scroll={{ x: 1650 }} />
            </Card>
            <div className="drawer-action-row">
              <Space>
                <Button type="primary" disabled={detailRow.status === "已合并"} onClick={() => openMerge(detailRow)}>人口合并</Button>
                <Button disabled={detailRow.status === "已合并"} onClick={() => openAssist(detailRow)}>转协查</Button>
                <Button danger disabled={detailRow.status === "已合并"} onClick={() => setExcludeRow(detailRow)}>非同一人</Button>
              </Space>
            </div>
          </>
        )}
      </Drawer>

      <Modal title="人口主档合并" open={Boolean(mergeRow)} onCancel={() => setMergeRow(null)} onOk={confirmMerge} okText="提交合并" cancelText="取消" width={840} destroyOnHidden>
        {mergeRow && (
          <>
            <Alert type="info" showIcon message="合并后业务关系将迁移至保留主档" description={`${mergeRow.groupNo}：${mergeRow.relationImpact}。${mergeRow.suggestion}`} style={{ marginBottom: 16 }} />
            <Form
              key={mergeRow.key}
              form={mergeForm}
              layout="vertical"
              initialValues={{ keepPerson: mergeRow.masterPersonNo, migrateScope: ["报告卡", "空间地址", "随访记录", "死亡记录"], reason: "经人口查重确认疑似同一人，合并发病人口主档并迁移关联业务关系" }}
            >
              <Row gutter={12}>
                <Col span={8}><Form.Item name="keepPerson" label="保留主档" rules={[{ required: true, message: "请选择保留主档" }]}><Select options={mergeRow.candidates.map((item) => ({ value: item.personNo }))} /></Form.Item></Col>
                <Col span={16}><Form.Item name="migrateScope" label="关系迁移范围" rules={[{ required: true, message: "请选择迁移范围" }]}><Select mode="multiple" options={[{ value: "报告卡" }, { value: "空间地址" }, { value: "随访记录" }, { value: "死亡记录" }, { value: "操作日志" }]} /></Form.Item></Col>
                <Col span={8}><Form.Item name="addressMode" label="地址处理"><Select options={[{ value: "保留最新标准地址" }, { value: "保留完整度最高地址" }, { value: "人工确认地址" }]} /></Form.Item></Col>
                <Col span={8}><Form.Item name="phoneMode" label="联系电话处理"><Select options={[{ value: "保留最新号码" }, { value: "保留非空号码" }, { value: "人工确认号码" }]} /></Form.Item></Col>
                <Col span={8}><Form.Item name="archiveMode" label="被合并人口"><Select options={[{ value: "标记为已合并" }, { value: "保留别名关系" }]} /></Form.Item></Col>
                <Col span={24}><Form.Item name="reason" label="合并说明" rules={[{ required: true, message: "请填写合并说明" }]}><Input.TextArea rows={3} /></Form.Item></Col>
              </Row>
            </Form>
          </>
        )}
      </Modal>

      <Modal title="人口信息协查" open={Boolean(assistRow)} onCancel={() => setAssistRow(null)} onOk={confirmAssist} okText="生成协查任务" cancelText="取消" width={760} destroyOnHidden>
        {assistRow && (
          <>
            <Alert type="warning" showIcon message="协查用于确认身份冲突或缺失字段" description={`${assistRow.groupNo}：${assistRow.conflict}`} style={{ marginBottom: 16 }} />
            <Form
              key={assistRow.key}
              form={assistForm}
              layout="vertical"
              initialValues={{
                assistOrg: assistRow.region.includes("许昌") ? "魏都区疾控中心" : assistRow.region.includes("洛阳") ? "洛阳市疾控中心" : "金水区疾控中心",
                dueDate: "2026-06-15",
                reason: assistRow.status === "待协查" ? "身份证号缺失或出生日期冲突，需核实病案首页和身份证件" : "人口主档合并前需责任机构复核身份信息"
              }}
            >
              <Row gutter={12}>
                <Col span={8}><Form.Item name="assistOrg" label="协查机构" rules={[{ required: true, message: "请选择协查机构" }]}><Select options={[{ value: "金水区疾控中心" }, { value: "魏都区疾控中心" }, { value: "洛阳市疾控中心" }, { value: "东湖区疾控中心" }]} /></Form.Item></Col>
                <Col span={8}><Form.Item name="dueDate" label="要求完成日期" rules={[{ required: true, message: "请输入完成日期" }]}><Input /></Form.Item></Col>
                <Col span={8}><Form.Item name="priority" label="优先级"><Select options={[{ value: "普通" }, { value: "紧急" }]} /></Form.Item></Col>
                <Col span={24}><Form.Item name="reason" label="协查原因" rules={[{ required: true, message: "请填写协查原因" }]}><Input.TextArea rows={3} /></Form.Item></Col>
              </Row>
            </Form>
          </>
        )}
      </Modal>

      <Modal title="标记非同一人" open={Boolean(excludeRow)} onCancel={() => setExcludeRow(null)} onOk={confirmExclude} okText="确认标记" cancelText="取消" okButtonProps={{ danger: true }} width={700}>
        {excludeRow && (
          <Alert
            type="error"
            showIcon
            message="该操作会将本组排除出人口合并队列"
            description={`${excludeRow.groupNo} 将记录为非同一人，系统保留查重命中依据和人工排除原因，后续自动查重不会再次按同一规则推送。`}
          />
        )}
      </Modal>
    </div>
  );
}

function DuplicateRelationView({ role }) {
  const [form] = Form.useForm();
  const [query, setQuery] = useState({});
  const [detailRow, setDetailRow] = useState(null);
  const [sourceRow, setSourceRow] = useState(null);
  const [exportOpen, setExportOpen] = useState(false);

  const filteredRows = duplicateRelationRows.filter((row) => {
    if (query.region && query.region !== "全部区划" && !row.region.includes(query.region)) return false;
    if (query.relationStatus && query.relationStatus !== "全部状态" && row.relationStatus !== query.relationStatus) return false;
    if (query.keyword) {
      const field = query.searchType || "登记编号";
      const value = query.keyword.trim();
      if (field === "登记编号" && !row.mergedNo.includes(value) && !row.sources.some((item) => item.no.includes(value))) return false;
      if (field === "姓名" && !row.patientName.includes(value)) return false;
      if (field === "身份证号" && !row.idCard.includes(value)) return false;
      if (field === "关系编号" && !row.relationNo.includes(value)) return false;
    }
    return true;
  });

  const summary = {
    total: duplicateRelationRows.length,
    sourceCards: duplicateRelationRows.reduce((sum, row) => sum + row.sourceCount, 0),
    valid: duplicateRelationRows.filter((row) => row.relationStatus === "有效").length,
    pending: duplicateRelationRows.filter((row) => row.relationStatus === "待复核").length,
    orgs: new Set(duplicateRelationRows.map((row) => row.region)).size,
    today: 1
  };

  const sourceColumns = [
    { title: "登记编号", dataIndex: "no", width: 150 },
    { title: "卡片类型", dataIndex: "cardType", width: 100 },
    { title: "报告单位", dataIndex: "reportOrg", width: 180 },
    { title: "报告日期", dataIndex: "reportDate", width: 115 },
    { title: "诊断日期", dataIndex: "diagnosisDate", width: 115 },
    { title: "诊断信息", dataIndex: "diagnosis", width: 190 },
    { title: "关系角色", dataIndex: "relationRole", width: 100 },
    { title: "来源状态", dataIndex: "sourceStatus", width: 120, render: statusTag }
  ];

  const columns = [
    {
      title: "登记编号",
      dataIndex: "mergedNo",
      width: 160,
      fixed: "left",
      render: (value, row) => (
        <Button type="link" className="link-cell" onClick={() => setDetailRow(row)}>
          {value}
        </Button>
      )
    },
    { title: "关系编号", dataIndex: "relationNo", width: 175 },
    { title: "姓名", dataIndex: "patientName", width: 90 },
    { title: "身份证号", dataIndex: "idCard", width: 190 },
    { title: "行政区划", dataIndex: "region", width: 150 },
    { title: "诊断信息", dataIndex: "diagnosis", width: 205 },
    { title: "诊断日期", dataIndex: "diagnosisDate", width: 115 },
    { title: "报告单位", dataIndex: "reportOrg", width: 180 },
    { title: "关系类型", dataIndex: "relationType", width: 110, render: statusTag },
    { title: "来源卡数", dataIndex: "sourceCount", width: 95, render: (value) => `${value} 张` },
    { title: "合并日期", dataIndex: "mergeDate", width: 115 },
    { title: "合并人", dataIndex: "mergeUser", width: 90 },
    { title: "关系状态", dataIndex: "relationStatus", width: 105, render: statusTag },
    {
      title: "操作",
      width: 180,
      render: (_, row) => (
        <Space size={4}>
          <Button type="link" onClick={() => setDetailRow(row)}>详情</Button>
          <Button type="link" onClick={() => setSourceRow(row)}>合并来源</Button>
        </Space>
      )
    }
  ];

  return (
    <div className="duplicate-relation-page">
      <Row gutter={16} className="plan-stat-row">
        <Col span={4}><Card><Statistic title="合并关系" value={summary.total} suffix="组" /></Card></Col>
        <Col span={4}><Card><Statistic title="来源报告卡" value={summary.sourceCards} suffix="张" valueStyle={{ color: "#2563eb" }} /></Card></Col>
        <Col span={4}><Card><Statistic title="有效关系" value={summary.valid} suffix="组" valueStyle={{ color: "#16a34a" }} /></Card></Col>
        <Col span={4}><Card><Statistic title="待复核" value={summary.pending} suffix="组" valueStyle={{ color: "#d97706" }} /></Card></Col>
        <Col span={4}><Card><Statistic title="涉及区划" value={summary.orgs} suffix="个" /></Card></Col>
        <Col span={4}><Card><Statistic title="今日新增" value={summary.today} suffix="组" /></Card></Col>
      </Row>

      <Card className="search-card maintenance-search">
        <Form form={form} layout="inline" initialValues={{ region: "全部区划", relationStatus: "全部状态", searchType: "登记编号" }}>
          <Form.Item name="region">
            <Select className="filter-select" options={[{ value: "全部区划" }, { value: "郑州市" }, { value: "许昌市" }, { value: "南昌市" }]} />
          </Form.Item>
          <Form.Item name="relationStatus">
            <Select className="filter-select" options={[{ value: "全部状态" }, { value: "有效" }, { value: "待复核" }]} />
          </Form.Item>
          <Form.Item name="searchType">
            <Select className="filter-select small" options={[{ value: "登记编号" }, { value: "关系编号" }, { value: "姓名" }, { value: "身份证号" }]} />
          </Form.Item>
          <Form.Item name="keyword">
            <Input prefix={<SearchOutlined />} className="keyword-input" placeholder="请输入检索内容" />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" icon={<SearchOutlined />} onClick={() => { setQuery(form.getFieldsValue()); message.success("重卡关系查询完成"); }}>查询</Button>
              <Button onClick={() => { form.resetFields(); setQuery({}); }}>重置</Button>
              <Button onClick={() => setExportOpen(true)}>导出 Excel</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>

      <Card className="table-card">
        <Alert
          className="table-alert"
          type="info"
          showIcon
          message="重卡关系查看用于追溯已合并记录"
          description="本页仅查看合并卡与来源卡关系，不执行重卡合并或还原操作；点击登记编号查看合并卡详情，点击合并来源展示或隐藏来源卡信息。"
        />
        <Table columns={columns} dataSource={filteredRows} pagination={false} scroll={{ x: 1850 }} />
        <Flex justify="space-between" align="center" className="pagination-row">
          <Text type="secondary">共 {filteredRows.length} 组合并关系，第 1 / 1 页</Text>
          <Pagination current={1} total={filteredRows.length} pageSize={10} />
        </Flex>
      </Card>

      <Drawer title="重卡关系详情" open={Boolean(detailRow)} onClose={() => setDetailRow(null)} width={980}>
        {detailRow && (
          <>
            <Descriptions bordered column={3} size="small">
              <Descriptions.Item label="登记编号">{detailRow.mergedNo}</Descriptions.Item>
              <Descriptions.Item label="关系编号">{detailRow.relationNo}</Descriptions.Item>
              <Descriptions.Item label="关系状态">{statusTag(detailRow.relationStatus)}</Descriptions.Item>
              <Descriptions.Item label="姓名">{detailRow.patientName}</Descriptions.Item>
              <Descriptions.Item label="身份证号" span={2}>{detailRow.idCard}</Descriptions.Item>
              <Descriptions.Item label="行政区划">{detailRow.region}</Descriptions.Item>
              <Descriptions.Item label="诊断日期">{detailRow.diagnosisDate}</Descriptions.Item>
              <Descriptions.Item label="来源卡数">{detailRow.sourceCount} 张</Descriptions.Item>
              <Descriptions.Item label="诊断信息" span={3}>{detailRow.diagnosis}</Descriptions.Item>
              <Descriptions.Item label="合并依据" span={3}>{detailRow.mergeBasis}</Descriptions.Item>
              <Descriptions.Item label="合并日期">{detailRow.mergeDate}</Descriptions.Item>
              <Descriptions.Item label="合并人">{detailRow.mergeUser}</Descriptions.Item>
              <Descriptions.Item label="关系类型">{statusTag(detailRow.relationType)}</Descriptions.Item>
            </Descriptions>
            <Card title="合并卡信息" size="small" className="history-card">
              <Descriptions bordered column={2} size="small">
                <Descriptions.Item label="登记编号">{detailRow.mergedCard.no}</Descriptions.Item>
                <Descriptions.Item label="卡片类型">{detailRow.mergedCard.cardType}</Descriptions.Item>
                <Descriptions.Item label="报告单位">{detailRow.mergedCard.reportOrg}</Descriptions.Item>
                <Descriptions.Item label="报告日期">{detailRow.mergedCard.reportDate}</Descriptions.Item>
                <Descriptions.Item label="诊断日期">{detailRow.mergedCard.diagnosisDate}</Descriptions.Item>
                <Descriptions.Item label="审核状态">{statusTag(detailRow.mergedCard.status)}</Descriptions.Item>
                <Descriptions.Item label="诊断信息" span={2}>{detailRow.mergedCard.diagnosis}</Descriptions.Item>
              </Descriptions>
            </Card>
            <Card title="合并来源信息" size="small" className="history-card">
              <Table columns={sourceColumns} dataSource={detailRow.sources} pagination={false} rowKey="no" scroll={{ x: 1200 }} />
            </Card>
            <Card title="关系日志" size="small" className="history-card">
              <Timeline
                items={detailRow.logs.map((item) => ({
                  color: item.action.includes("审核") ? "green" : "blue",
                  children: (
                    <div>
                      <Text strong>{item.time} / {item.action}</Text>
                      <div className="timeline-note">{item.user}：{item.note}</div>
                    </div>
                  )
                }))}
              />
            </Card>
          </>
        )}
      </Drawer>

      <Modal title="合并来源信息" open={Boolean(sourceRow)} onCancel={() => setSourceRow(null)} footer={<Button type="primary" onClick={() => setSourceRow(null)}>关闭</Button>} width={960}>
        {sourceRow && (
          <>
            <Alert type="info" showIcon message={`登记编号 ${sourceRow.mergedNo} 的合并来源`} description={`合并依据：${sourceRow.mergeBasis}`} style={{ marginBottom: 16 }} />
            <Table columns={sourceColumns} dataSource={sourceRow.sources} pagination={false} rowKey="no" scroll={{ x: 1200 }} />
          </>
        )}
      </Modal>

      <Modal title="导出重卡关系" open={exportOpen} onCancel={() => setExportOpen(false)} onOk={() => { setExportOpen(false); message.success("重卡关系导出任务已创建"); }} okText="确认导出" cancelText="取消">
        <Descriptions bordered column={1} size="small">
          <Descriptions.Item label="导出范围">当前筛选条件下 {filteredRows.length} 组合并关系</Descriptions.Item>
          <Descriptions.Item label="导出内容">合并卡、来源卡、合并依据、合并人、合并时间</Descriptions.Item>
          <Descriptions.Item label="审计记录">记录导出人、机构、时间和筛选条件</Descriptions.Item>
        </Descriptions>
      </Modal>
    </div>
  );
}

function MultiPrimaryRelationView({ role }) {
  const [form] = Form.useForm();
  const [query, setQuery] = useState({});
  const [detailRow, setDetailRow] = useState(null);
  const [cardRow, setCardRow] = useState(null);
  const [restoreRow, setRestoreRow] = useState(null);

  const filteredRows = multiPrimaryRows.filter((row) => {
    if (query.region && query.region !== "全部区划" && !row.region.includes(query.region)) return false;
    if (query.relationStatus && query.relationStatus !== "全部状态" && row.relationStatus !== query.relationStatus) return false;
    if (query.keyword) {
      const field = query.searchType || "登记编号";
      const value = query.keyword.trim();
      if (field === "登记编号" && !row.mainNo.includes(value) && !row.cards.some((item) => item.no.includes(value))) return false;
      if (field === "姓名" && !row.patientName.includes(value)) return false;
      if (field === "身份证号" && !row.idCard.includes(value)) return false;
      if (field === "关系编号" && !row.relationNo.includes(value)) return false;
    }
    return true;
  });

  const summary = {
    total: multiPrimaryRows.length,
    active: multiPrimaryRows.filter((row) => row.relationStatus === "有效").length,
    restored: multiPrimaryRows.filter((row) => row.relationStatus === "已还原").length,
    cards: multiPrimaryRows.reduce((sum, row) => sum + row.relatedCount, 0),
    restorable: multiPrimaryRows.filter((row) => row.restoreAllowed).length,
    today: 1
  };

  const cardColumns = [
    { title: "登记编号", dataIndex: "no", width: 150 },
    { title: "卡片类型", dataIndex: "cardType", width: 130 },
    { title: "报告单位", dataIndex: "reportOrg", width: 180 },
    { title: "诊断日期", dataIndex: "diagnosisDate", width: 115 },
    { title: "发病部位", dataIndex: "site", width: 190 },
    { title: "形态学编码", dataIndex: "morphology", width: 110 },
    { title: "卡片状态", dataIndex: "status", width: 115, render: statusTag },
    { title: "关系角色", dataIndex: "relationRole", width: 110 }
  ];

  const columns = [
    {
      title: "登记编号",
      dataIndex: "mainNo",
      width: 160,
      fixed: "left",
      render: (value, row) => <Button type="link" className="link-cell" onClick={() => setDetailRow(row)}>{value}</Button>
    },
    { title: "关系编号", dataIndex: "relationNo", width: 160 },
    { title: "姓名", dataIndex: "patientName", width: 90 },
    { title: "身份证号", dataIndex: "idCard", width: 190 },
    { title: "行政区划", dataIndex: "region", width: 150 },
    { title: "主卡诊断", dataIndex: "mainDiagnosis", width: 205 },
    { title: "多原发卡数", dataIndex: "relatedCount", width: 105, render: (value) => `${value} 张` },
    { title: "标记日期", dataIndex: "markDate", width: 115 },
    { title: "标记人", dataIndex: "markUser", width: 90 },
    { title: "关系状态", dataIndex: "relationStatus", width: 105, render: statusTag },
    {
      title: "操作",
      width: 220,
      render: (_, row) => (
        <Space size={4}>
          <Button type="link" onClick={() => setDetailRow(row)}>详情</Button>
          <Button type="link" onClick={() => setCardRow(row)}>多原发卡</Button>
          <Button type="link" danger disabled={!row.restoreAllowed} onClick={() => setRestoreRow(row)}>快速还原</Button>
        </Space>
      )
    }
  ];

  return (
    <div className="multi-primary-page">
      <Row gutter={16} className="plan-stat-row">
        <Col span={4}><Card><Statistic title="多原发关系" value={summary.total} suffix="组" /></Card></Col>
        <Col span={4}><Card><Statistic title="有效关系" value={summary.active} suffix="组" valueStyle={{ color: "#16a34a" }} /></Card></Col>
        <Col span={4}><Card><Statistic title="已还原" value={summary.restored} suffix="组" /></Card></Col>
        <Col span={4}><Card><Statistic title="关联报告卡" value={summary.cards} suffix="张" valueStyle={{ color: "#2563eb" }} /></Card></Col>
        <Col span={4}><Card><Statistic title="可快速还原" value={summary.restorable} suffix="组" valueStyle={{ color: "#d97706" }} /></Card></Col>
        <Col span={4}><Card><Statistic title="今日标记" value={summary.today} suffix="组" /></Card></Col>
      </Row>
      <Card className="search-card maintenance-search">
        <Form form={form} layout="inline" initialValues={{ region: "全部区划", relationStatus: "全部状态", searchType: "登记编号" }}>
          <Form.Item name="region"><Select className="filter-select" options={[{ value: "全部区划" }, { value: "郑州市" }, { value: "洛阳市" }]} /></Form.Item>
          <Form.Item name="relationStatus"><Select className="filter-select" options={[{ value: "全部状态" }, { value: "有效" }, { value: "已还原" }]} /></Form.Item>
          <Form.Item name="searchType"><Select className="filter-select small" options={[{ value: "登记编号" }, { value: "关系编号" }, { value: "姓名" }, { value: "身份证号" }]} /></Form.Item>
          <Form.Item name="keyword"><Input prefix={<SearchOutlined />} className="keyword-input" placeholder="请输入检索内容" /></Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" icon={<SearchOutlined />} onClick={() => { setQuery(form.getFieldsValue()); message.success("多原发关系查询完成"); }}>查询</Button>
              <Button onClick={() => { form.resetFields(); setQuery({}); }}>重置</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
      <Card className="table-card">
        <Alert className="table-alert" type="info" showIcon message="多原发关系查看用于追溯多原发标记记录" description="本页按河南手册提供查询、登记编号详情、多原发卡信息展示和快速还原；快速还原会恢复为标记前状态并保留操作日志。" />
        <Table columns={columns} dataSource={filteredRows} pagination={false} scroll={{ x: 1500 }} />
        <Flex justify="space-between" align="center" className="pagination-row">
          <Text type="secondary">共 {filteredRows.length} 组多原发关系，第 1 / 1 页</Text>
          <Pagination current={1} total={filteredRows.length} pageSize={10} />
        </Flex>
      </Card>
      <Drawer title="多原发关系详情" open={Boolean(detailRow)} onClose={() => setDetailRow(null)} width={980}>
        {detailRow && (
          <>
            <Descriptions bordered column={3} size="small">
              <Descriptions.Item label="登记编号">{detailRow.mainNo}</Descriptions.Item>
              <Descriptions.Item label="关系编号">{detailRow.relationNo}</Descriptions.Item>
              <Descriptions.Item label="关系状态">{statusTag(detailRow.relationStatus)}</Descriptions.Item>
              <Descriptions.Item label="姓名">{detailRow.patientName}</Descriptions.Item>
              <Descriptions.Item label="身份证号" span={2}>{detailRow.idCard}</Descriptions.Item>
              <Descriptions.Item label="行政区划">{detailRow.region}</Descriptions.Item>
              <Descriptions.Item label="标记日期">{detailRow.markDate}</Descriptions.Item>
              <Descriptions.Item label="标记人">{detailRow.markUser}</Descriptions.Item>
              <Descriptions.Item label="判断依据" span={3}>{detailRow.basis}</Descriptions.Item>
            </Descriptions>
            <Card title="多原发卡信息" size="small" className="history-card">
              <Table columns={cardColumns} dataSource={detailRow.cards} pagination={false} rowKey="no" scroll={{ x: 1200 }} />
            </Card>
            <Card title="关系日志" size="small" className="history-card">
              <Timeline items={detailRow.logs.map((item) => ({ color: item.action.includes("还原") ? "orange" : "blue", children: <div><Text strong>{item.time} / {item.action}</Text><div className="timeline-note">{item.user}：{item.note}</div></div> }))} />
            </Card>
          </>
        )}
      </Drawer>
      <Modal title="多原发卡信息" open={Boolean(cardRow)} onCancel={() => setCardRow(null)} footer={<Button type="primary" onClick={() => setCardRow(null)}>关闭</Button>} width={960}>
        {cardRow && <Table columns={cardColumns} dataSource={cardRow.cards} pagination={false} rowKey="no" scroll={{ x: 1200 }} />}
      </Modal>
      <Modal title="快速还原多原发关系" open={Boolean(restoreRow)} onCancel={() => setRestoreRow(null)} onOk={() => { setRestoreRow(null); message.success("多原发关系已快速还原，记录恢复为标记前状态"); }} okText="确认还原" cancelText="取消" okButtonProps={{ danger: true }}>
        {restoreRow && <Alert type="warning" showIcon message="确认恢复为标记前状态？" description={`${restoreRow.relationNo} 将取消多原发关系标记，相关报告卡恢复为标记前状态，并写入多原发关系日志。`} />}
      </Modal>
    </div>
  );
}

function AutoDedupParameterManagement({ role }) {
  const [form] = Form.useForm();
  const [paramForm] = Form.useForm();
  const [query, setQuery] = useState({ paramType: "查重条件" });
  const [editRow, setEditRow] = useState(null);
  const rows = autoDedupParamRows.filter((row) => {
    if (query.paramType && row.paramType !== query.paramType) return false;
    if (query.keyword && !`${row.name}${row.selectedContent}${row.description}`.includes(query.keyword.trim())) return false;
    return true;
  });

  function openEdit(row) {
    setEditRow(row);
  }

  function confirmParam() {
    paramForm.validateFields().then(() => {
      setEditRow(null);
      message.success("自动查重参数已保存，规则变更已留痕");
    }).catch(() => message.error("请补全参数名称、选择内容和逻辑类型"));
  }

  const columns = [
    { title: "选择类型", dataIndex: "paramType", width: 110 },
    { title: "参数名称", dataIndex: "name", width: 220 },
    { title: "选择内容", dataIndex: "selectedContent", width: 320 },
    { title: "逻辑类型", dataIndex: "logicType", width: 90 },
    { title: "使用状态", dataIndex: "status", width: 100, render: statusTag },
    { title: "内容说明", dataIndex: "description", width: 320 },
    { title: "更新时间", dataIndex: "updateTime", width: 115 },
    { title: "操作", width: 140, render: (_, row) => <Space size={4}><Button type="link" onClick={() => openEdit(row)}>编辑</Button><Button type="link" danger onClick={() => message.warning("已被查重条件引用的参数需先停用或解除引用后再删除")}>删除</Button></Space> }
  ];

  return (
    <div className="auto-dedup-page">
      <Card className="search-card maintenance-search">
        <Form form={form} layout="inline" initialValues={{ paramType: "查重条件" }}>
          <Form.Item name="paramType"><Select className="filter-select" options={[{ value: "查重条件" }, { value: "字段组合" }]} /></Form.Item>
          <Form.Item name="keyword"><Input prefix={<SearchOutlined />} className="keyword-input" placeholder="请输入关键字" /></Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" icon={<SearchOutlined />} onClick={() => { setQuery(form.getFieldsValue()); message.success("自动查重参数查询完成"); }}>查询</Button>
              <Button onClick={() => { form.resetFields(); setQuery({ paramType: "查重条件" }); }}>重置</Button>
              <Button type="primary" onClick={() => openEdit({ paramType: form.getFieldValue("paramType") || "查重条件", status: "启用", logicType: "与" })}>{(form.getFieldValue("paramType") || "查重条件") === "字段组合" ? "添加组合" : "添加条件"}</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
      <Card className="table-card">
        <Alert className="table-alert" type="info" showIcon message="自动查重参数分为查重条件和字段组合" description="字段组合提供可选字段参数；查重条件引用字段组合并设置与/或逻辑，系统据此进行重卡分析。" />
        <Table columns={columns} dataSource={rows} pagination={false} scroll={{ x: 1650 }} />
      </Card>
      <Modal title={editRow?.paramType === "字段组合" ? "字段组合参数" : "查重条件参数"} open={Boolean(editRow)} onCancel={() => setEditRow(null)} onOk={confirmParam} okText="保存" cancelText="取消" width={760} destroyOnHidden>
        {editRow && (
          <Form key={editRow.key || "new"} form={paramForm} layout="vertical" initialValues={editRow}>
            <Row gutter={12}>
              <Col span={8}><Form.Item name="paramType" label="选择类型"><Select options={[{ value: "查重条件" }, { value: "字段组合" }]} /></Form.Item></Col>
              <Col span={16}><Form.Item name="name" label={editRow.paramType === "字段组合" ? "组合名称" : "条件名称"} rules={[{ required: true, message: "请输入名称" }]}><Input /></Form.Item></Col>
              <Col span={24}><Form.Item name="selectedContent" label="选择内容" rules={[{ required: true, message: "请选择内容" }]}><Select mode="multiple" options={[{ value: "身份证号码" }, { value: "姓名" }, { value: "出生日期" }, { value: "联系电话" }, { value: "常住地址" }, { value: "发病部位组合" }, { value: "身份证姓名出生日期组合" }, { value: "姓名联系电话地址组合" }]} /></Form.Item></Col>
              <Col span={8}><Form.Item name="logicType" label="逻辑类型" rules={[{ required: true, message: "请选择逻辑类型" }]}><Select options={[{ value: "与" }, { value: "或" }]} /></Form.Item></Col>
              <Col span={8}><Form.Item name="status" label="使用状态"><Select options={[{ value: "启用" }, { value: "停用" }]} /></Form.Item></Col>
              <Col span={24}><Form.Item name="description" label="内容说明"><Input.TextArea rows={3} /></Form.Item></Col>
            </Row>
          </Form>
        )}
      </Modal>
    </div>
  );
}

function MergeFieldParameterManagement({ role }) {
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [query, setQuery] = useState({});
  const [editRow, setEditRow] = useState(null);
  const rows = mergeFieldParamRows.filter((row) => {
    if (query.keyword && !`${row.fieldCode}${row.fieldName}${row.priority}`.includes(query.keyword.trim())) return false;
    return true;
  });

  function confirmEdit() {
    editForm.validateFields().then(() => {
      setEditRow(null);
      message.success("合并字段参数已保存，新的优先级将在下次合并时生效");
    }).catch(() => message.error("请补全优先级别和使用状态"));
  }

  const columns = [
    { title: "字段", dataIndex: "fieldCode", width: 160 },
    { title: "字段名称", dataIndex: "fieldName", width: 150 },
    { title: "优先级别", dataIndex: "priority", width: 150 },
    { title: "使用状态", dataIndex: "status", width: 100, render: statusTag },
    { title: "内容说明", dataIndex: "description", width: 360 },
    { title: "更新时间", dataIndex: "updateTime", width: 115 },
    { title: "操作", width: 90, render: (_, row) => <Button type="link" onClick={() => setEditRow(row)}>编辑</Button> }
  ];

  return (
    <div className="merge-field-page">
      <Card className="search-card maintenance-search">
        <Form form={form} layout="inline">
          <Form.Item name="keyword"><Input prefix={<SearchOutlined />} className="keyword-input" placeholder="请输入关键字" /></Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" icon={<SearchOutlined />} onClick={() => { setQuery(form.getFieldsValue()); message.success("合并字段参数查询完成"); }}>查询</Button>
              <Button onClick={() => { form.resetFields(); setQuery({}); }}>重置</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
      <Card className="table-card">
        <Alert className="table-alert" type="info" showIcon message="合并字段参数决定对比合并的默认取值" description="优先级别包括是否为空、确诊日期早、确诊日期晚、更新随访、诊断级别、医院等级、形态学编码、发病部位、治疗信息和户籍详细等级。" />
        <Table columns={columns} dataSource={rows} pagination={false} scroll={{ x: 1200 }} />
      </Card>
      <Modal title="合并字段参数修改" open={Boolean(editRow)} onCancel={() => setEditRow(null)} onOk={confirmEdit} okText="保存" cancelText="取消" width={720} destroyOnHidden>
        {editRow && (
          <Form key={editRow.key} form={editForm} layout="vertical" initialValues={editRow}>
            <Row gutter={12}>
              <Col span={8}><Form.Item name="fieldCode" label="字段"><Input disabled /></Form.Item></Col>
              <Col span={8}><Form.Item name="fieldName" label="字段名称"><Input disabled /></Form.Item></Col>
              <Col span={8}><Form.Item name="priority" label="优先级别" rules={[{ required: true, message: "请选择优先级别" }]}><Select options={["是否为空", "确诊日期早", "确诊日期晚", "更新随访", "诊断级别", "医院等级", "形态学编码", "发病部位", "治疗信息", "户籍详细等级"].map((value) => ({ value }))} /></Form.Item></Col>
              <Col span={8}><Form.Item name="status" label="使用状态" rules={[{ required: true, message: "请选择使用状态" }]}><Select options={[{ value: "启用" }, { value: "停用" }]} /></Form.Item></Col>
              <Col span={24}><Form.Item name="description" label="内容说明"><Input.TextArea rows={3} /></Form.Item></Col>
            </Row>
          </Form>
        )}
      </Modal>
    </div>
  );
}

function IncidencePopulationManagement({ role }) {
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [convertForm] = Form.useForm();
  const [query, setQuery] = useState({});
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [detailRow, setDetailRow] = useState(null);
  const [editRow, setEditRow] = useState(null);
  const [convertOpen, setConvertOpen] = useState(false);
  const filteredRows = incidencePopulationRows.filter((row) => {
    if (query.region && query.region !== "全部区划" && !row.ownerRegion.includes(query.region)) return false;
    if (query.filterRegion && query.filterRegion !== "全部过滤区划" && !row.currentRegion.includes(query.filterRegion)) return false;
    if (query.onlyCurrent && row.ownerRegion !== row.currentRegion) return false;
    if (query.onlyCancer && row.cancerRelated !== "是") return false;
    if (query.keyword) {
      const field = query.searchType || "登记编号";
      const value = query.keyword.trim();
      if (field === "登记编号" && !row.registerNo.includes(value)) return false;
      if (field === "人口编号" && !row.personNo.includes(value)) return false;
      if (field === "姓名" && !row.name.includes(value)) return false;
      if (field === "身份证号" && !row.idCard.includes(value)) return false;
    }
    return true;
  });

  function confirmEdit() {
    editForm.validateFields().then(() => {
      setEditRow(null);
      message.success("发病人口信息已保存，空间地址同步写入维护记录");
    }).catch(() => message.error("请补全姓名、性别、出生日期、身份证号和行政区划"));
  }

  function openConvert() {
    if (selectedRowKeys.length === 0) {
      message.warning("请先勾选需要调整归属区划的人口信息");
      return;
    }
    setConvertOpen(true);
  }

  function confirmConvert() {
    convertForm.validateFields().then((values) => {
      setConvertOpen(false);
      message.success(`已提交 ${selectedRowKeys.length} 条人口归属区划调整${values.syncCurrentAddress ? "，常住地址将同步调整" : ""}`);
    }).catch(() => message.error("请选择归属行政区划"));
  }

  const columns = [
    { title: "登记编号", dataIndex: "registerNo", width: 150, fixed: "left", render: (value, row) => <Button type="link" className="link-cell" onClick={() => setDetailRow(row)}>{value}</Button> },
    { title: "人口编号", dataIndex: "personNo", width: 170 },
    { title: "姓名", dataIndex: "name", width: 85 },
    { title: "性别", dataIndex: "sex", width: 65 },
    { title: "出生日期", dataIndex: "birthDate", width: 115 },
    { title: "身份证号", dataIndex: "idCard", width: 190 },
    { title: "联系电话", dataIndex: "phone", width: 120 },
    { title: "户籍行政区划", dataIndex: "householdRegion", width: 145 },
    { title: "常住行政区划", dataIndex: "currentRegion", width: 145 },
    { title: "归属行政区划", dataIndex: "ownerRegion", width: 145 },
    { title: "肿瘤相关", dataIndex: "cancerRelated", width: 90 },
    { title: "报告卡数", dataIndex: "reportCards", width: 90 },
    { title: "状态", dataIndex: "status", width: 90, render: statusTag },
    { title: "操作", width: 170, render: (_, row) => <Space size={4}><Button type="link" onClick={() => setDetailRow(row)}>查看</Button><Button type="link" onClick={() => setEditRow(row)}>修改</Button><Button type="link" danger onClick={() => message.warning("存在关联报告卡或随访记录的人口信息不可直接删除")}>删除</Button></Space> }
  ];

  return (
    <div className="incidence-population-page">
      <Card className="search-card maintenance-search">
        <Form form={form} layout="inline" initialValues={{ region: "全部区划", filterRegion: "全部过滤区划", searchType: "登记编号" }}>
          <Form.Item name="region"><Select className="filter-select" options={[{ value: "全部区划" }, { value: "郑州市" }, { value: "许昌市" }, { value: "洛阳市" }]} /></Form.Item>
          <Form.Item name="filterRegion"><Select className="filter-select" options={[{ value: "全部过滤区划" }, { value: "郑州市金水区" }, { value: "郑州市二七区" }, { value: "许昌市魏都区" }, { value: "洛阳市涧西区" }]} /></Form.Item>
          <Form.Item name="onlyCurrent" valuePropName="checked"><input type="checkbox" /> </Form.Item>
          <Text>仅显当前区划信息</Text>
          <Form.Item name="onlyCancer" valuePropName="checked"><input type="checkbox" /> </Form.Item>
          <Text>仅显肿瘤相关</Text>
          <Form.Item name="searchType"><Select className="filter-select small" options={[{ value: "登记编号" }, { value: "人口编号" }, { value: "姓名" }, { value: "身份证号" }]} /></Form.Item>
          <Form.Item name="keyword"><Input prefix={<SearchOutlined />} className="keyword-input" placeholder="请输入检索内容" /></Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" icon={<SearchOutlined />} onClick={() => { setQuery(form.getFieldsValue()); message.success("发病人口信息查询完成"); }}>查询</Button>
              <Button onClick={() => { form.resetFields(); setQuery({}); }}>重置</Button>
              <Button type="primary" onClick={() => setEditRow({ status: "有效", cancerRelated: "是" })}>添加</Button>
              <Button onClick={openConvert}>批量转换区划</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
      <Card className="table-card">
        <Alert className="table-alert" type="info" showIcon message="发病人口信息管理按河南手册支持人口归属区划调整" description="可通过过滤行政区划和勾选条件筛选待调整人员，选择归属行政区划后批量转换；勾选同步选项时常住地址将共同调整。" />
        <Table rowSelection={{ selectedRowKeys, onChange: setSelectedRowKeys }} columns={columns} dataSource={filteredRows} pagination={false} scroll={{ x: 1900 }} />
        <Flex justify="space-between" align="center" className="pagination-row">
          <Text type="secondary">共 {filteredRows.length} 条发病人口信息，已选择 {selectedRowKeys.length} 条</Text>
          <Pagination current={1} total={filteredRows.length} pageSize={10} />
        </Flex>
      </Card>
      <Drawer title="发病人口信息详情" open={Boolean(detailRow)} onClose={() => setDetailRow(null)} width={820}>
        {detailRow && <Descriptions bordered column={2} size="small">
          <Descriptions.Item label="登记编号">{detailRow.registerNo}</Descriptions.Item>
          <Descriptions.Item label="人口编号">{detailRow.personNo}</Descriptions.Item>
          <Descriptions.Item label="姓名">{detailRow.name}</Descriptions.Item>
          <Descriptions.Item label="性别">{detailRow.sex}</Descriptions.Item>
          <Descriptions.Item label="出生日期">{detailRow.birthDate}</Descriptions.Item>
          <Descriptions.Item label="身份证号">{detailRow.idCard}</Descriptions.Item>
          <Descriptions.Item label="户籍行政区划">{detailRow.householdRegion}</Descriptions.Item>
          <Descriptions.Item label="常住行政区划">{detailRow.currentRegion}</Descriptions.Item>
          <Descriptions.Item label="归属行政区划">{detailRow.ownerRegion}</Descriptions.Item>
          <Descriptions.Item label="肿瘤相关">{detailRow.cancerRelated}</Descriptions.Item>
          <Descriptions.Item label="详细地址" span={2}>{detailRow.address}</Descriptions.Item>
        </Descriptions>}
      </Drawer>
      <Modal title={editRow?.personNo ? "修改发病人口信息" : "添加发病人口信息"} open={Boolean(editRow)} onCancel={() => setEditRow(null)} onOk={confirmEdit} okText="保存" cancelText="取消" width={820} destroyOnHidden>
        {editRow && <Form key={editRow.personNo || "new"} form={editForm} layout="vertical" initialValues={editRow}>
          <Row gutter={12}>
            <Col span={8}><Form.Item name="name" label="姓名" rules={[{ required: true, message: "请输入姓名" }]}><Input /></Form.Item></Col>
            <Col span={8}><Form.Item name="sex" label="性别" rules={[{ required: true, message: "请选择性别" }]}><Select options={[{ value: "男" }, { value: "女" }]} /></Form.Item></Col>
            <Col span={8}><Form.Item name="birthDate" label="出生日期" rules={[{ required: true, message: "请输入出生日期" }]}><Input /></Form.Item></Col>
            <Col span={12}><Form.Item name="idCard" label="身份证号" rules={[{ required: true, message: "请输入身份证号" }]}><Input /></Form.Item></Col>
            <Col span={12}><Form.Item name="phone" label="联系电话"><Input /></Form.Item></Col>
            <Col span={8}><Form.Item name="householdRegion" label="户籍行政区划" rules={[{ required: true, message: "请选择户籍行政区划" }]}><Select options={[{ value: "郑州市金水区" }, { value: "郑州市二七区" }, { value: "许昌市魏都区" }, { value: "洛阳市涧西区" }]} /></Form.Item></Col>
            <Col span={8}><Form.Item name="currentRegion" label="常住行政区划" rules={[{ required: true, message: "请选择常住行政区划" }]}><Select options={[{ value: "郑州市金水区" }, { value: "郑州市二七区" }, { value: "许昌市魏都区" }, { value: "洛阳市涧西区" }]} /></Form.Item></Col>
            <Col span={8}><Form.Item name="ownerRegion" label="归属行政区划" rules={[{ required: true, message: "请选择归属行政区划" }]}><Select options={[{ value: "郑州市金水区" }, { value: "郑州市二七区" }, { value: "许昌市魏都区" }, { value: "洛阳市涧西区" }]} /></Form.Item></Col>
            <Col span={24}><Form.Item name="address" label="详细地址"><Input /></Form.Item></Col>
          </Row>
        </Form>}
      </Modal>
      <Modal title="批量转换区划" open={convertOpen} onCancel={() => setConvertOpen(false)} onOk={confirmConvert} okText="确认转换" cancelText="取消" width={700} destroyOnHidden>
        <Form form={convertForm} layout="vertical" initialValues={{ syncCurrentAddress: false }}>
          <Alert type="warning" showIcon message={`将调整 ${selectedRowKeys.length} 条人口归属行政区划`} description="如勾选常住地址同步调整，系统会同时写入空间地址变更日志。" style={{ marginBottom: 16 }} />
          <Form.Item name="targetRegion" label="归属行政区划" rules={[{ required: true, message: "请选择归属行政区划" }]}><Select options={[{ value: "郑州市金水区" }, { value: "郑州市二七区" }, { value: "许昌市魏都区" }, { value: "洛阳市涧西区" }]} /></Form.Item>
          <Form.Item name="syncCurrentAddress" valuePropName="checked"><input type="checkbox" /> 常住地址共同进行调整</Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

function SpatialAddressManagement({ role }) {
  const [form] = Form.useForm();
  const [addressForm] = Form.useForm();
  const [query, setQuery] = useState({});
  const [detailRow, setDetailRow] = useState(null);
  const [editAddress, setEditAddress] = useState(null);
  const filteredRows = spatialAddressRows.filter((row) => {
    if (query.region && query.region !== "全部区划" && !row.region.includes(query.region)) return false;
    if (query.keyword) {
      const value = query.keyword.trim();
      if (!`${row.registerNo}${row.personNo}${row.name}${row.idCard}${row.currentAddress}`.includes(value)) return false;
    }
    return true;
  });
  const addressColumns = [
    { title: "地址类型", dataIndex: "addressType", width: 110 },
    { title: "行政区划", dataIndex: "region", width: 150 },
    { title: "详细地址", dataIndex: "address", width: 260 },
    { title: "经度", dataIndex: "longitude", width: 110 },
    { title: "纬度", dataIndex: "latitude", width: 110 },
    { title: "开始日期", dataIndex: "startDate", width: 115 },
    { title: "来源", dataIndex: "source", width: 120 },
    { title: "是否最新", dataIndex: "latest", width: 90, render: (value) => value ? <Tag color="green">最新</Tag> : <Tag>历史</Tag> },
    { title: "操作", width: 150, render: (_, row) => <Space size={4}><Button type="link" disabled={!row.latest} onClick={() => setEditAddress(row)}>修改</Button><Button type="link" danger disabled={!row.latest} onClick={() => message.success("最新地址已删除，空间地址日志已记录")}>删除</Button></Space> }
  ];
  const columns = [
    { title: "登记编号", dataIndex: "registerNo", width: 150, fixed: "left", render: (value, row) => <Button type="link" className="link-cell" onClick={() => setDetailRow(row)}>{value}</Button> },
    { title: "人口编号", dataIndex: "personNo", width: 170 },
    { title: "姓名", dataIndex: "name", width: 90 },
    { title: "身份证号", dataIndex: "idCard", width: 190 },
    { title: "行政区划", dataIndex: "region", width: 150 },
    { title: "最新空间地址", dataIndex: "currentAddress", width: 320 },
    { title: "地址记录数", dataIndex: "addressCount", width: 105, render: (value) => `${value} 条` },
    { title: "最新日期", dataIndex: "latestDate", width: 115 },
    { title: "操作", width: 150, render: (_, row) => <Space size={4}><Button type="link" onClick={() => setDetailRow(row)}>查看</Button><Button type="link" onClick={() => setEditAddress({ latest: true, personNo: row.personNo, region: row.region })}>添加</Button></Space> }
  ];
  function confirmAddress() {
    addressForm.validateFields().then(() => {
      setEditAddress(null);
      message.success("空间地址信息已保存，地址变更日志已写入");
    }).catch(() => message.error("请补全行政区划、详细地址、经纬度和开始日期"));
  }
  return (
    <div className="spatial-address-page">
      <Card className="search-card maintenance-search">
        <Form form={form} layout="inline" initialValues={{ region: "全部区划" }}>
          <Form.Item name="region"><Select className="filter-select" options={[{ value: "全部区划" }, { value: "郑州市" }, { value: "许昌市" }, { value: "洛阳市" }]} /></Form.Item>
          <Form.Item name="keyword"><Input prefix={<SearchOutlined />} className="keyword-input" placeholder="请输入检索内容" /></Form.Item>
          <Form.Item><Space><Button type="primary" icon={<SearchOutlined />} onClick={() => { setQuery(form.getFieldsValue()); message.success("空间地址信息查询完成"); }}>查询</Button><Button onClick={() => { form.resetFields(); setQuery({}); }}>重置</Button></Space></Form.Item>
        </Form>
      </Card>
      <Card className="table-card">
        <Alert className="table-alert" type="info" showIcon message="空间地址信息按时间倒序展示历史记录" description="点击登记编号查看所有空间地址记录；可添加地址，修改和删除仅对最新空间地址有效，并写入空间地址日志。" />
        <Table columns={columns} dataSource={filteredRows} pagination={false} scroll={{ x: 1450 }} />
      </Card>
      <Drawer title="空间地址历史" open={Boolean(detailRow)} onClose={() => setDetailRow(null)} width={1040}>
        {detailRow && <>
          <Descriptions bordered column={2} size="small">
            <Descriptions.Item label="登记编号">{detailRow.registerNo}</Descriptions.Item>
            <Descriptions.Item label="人口编号">{detailRow.personNo}</Descriptions.Item>
            <Descriptions.Item label="姓名">{detailRow.name}</Descriptions.Item>
            <Descriptions.Item label="身份证号">{detailRow.idCard}</Descriptions.Item>
            <Descriptions.Item label="最新空间地址" span={2}>{detailRow.currentAddress}</Descriptions.Item>
          </Descriptions>
          <Card title="地址列表信息" size="small" className="history-card">
            <Table columns={addressColumns} dataSource={detailRow.histories} pagination={false} rowKey="key" scroll={{ x: 1300 }} />
          </Card>
          <div className="drawer-action-row"><Button type="primary" onClick={() => setEditAddress({ latest: true, personNo: detailRow.personNo, region: detailRow.region })}>添加空间地址</Button></div>
        </>}
      </Drawer>
      <Modal title={editAddress?.key ? "修改最新地址" : "添加空间地址"} open={Boolean(editAddress)} onCancel={() => setEditAddress(null)} onOk={confirmAddress} okText="保存" cancelText="取消" width={760} destroyOnHidden>
        {editAddress && <Form key={editAddress.key || "new"} form={addressForm} layout="vertical" initialValues={editAddress}>
          <Row gutter={12}>
            <Col span={8}><Form.Item name="addressType" label="地址类型" rules={[{ required: true, message: "请选择地址类型" }]}><Select options={[{ value: "常住地址" }, { value: "户籍地址" }]} /></Form.Item></Col>
            <Col span={8}><Form.Item name="region" label="行政区划" rules={[{ required: true, message: "请选择行政区划" }]}><Select options={[{ value: "郑州市金水区" }, { value: "郑州市二七区" }, { value: "许昌市魏都区" }, { value: "洛阳市涧西区" }]} /></Form.Item></Col>
            <Col span={8}><Form.Item name="startDate" label="开始日期" rules={[{ required: true, message: "请输入开始日期" }]}><Input /></Form.Item></Col>
            <Col span={24}><Form.Item name="address" label="详细地址" rules={[{ required: true, message: "请输入详细地址" }]}><Input /></Form.Item></Col>
            <Col span={8}><Form.Item name="longitude" label="经度" rules={[{ required: true, message: "请输入经度" }]}><Input /></Form.Item></Col>
            <Col span={8}><Form.Item name="latitude" label="纬度" rules={[{ required: true, message: "请输入纬度" }]}><Input /></Form.Item></Col>
            <Col span={8}><Form.Item name="source" label="来源"><Input /></Form.Item></Col>
          </Row>
        </Form>}
      </Modal>
    </div>
  );
}

function AdministrativeRegionManagement({ role }) {
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [query, setQuery] = useState({});
  const [editRow, setEditRow] = useState(null);
  const [selectedParent, setSelectedParent] = useState("河南省");
  const rows = regionRows.filter((row) => {
    if (query.keyword && !`${row.code}${row.name}${row.parent}`.includes(query.keyword.trim())) return false;
    if (query.level && query.level !== "全部级别" && row.level !== query.level) return false;
    return true;
  });
  function saveRegion() {
    editForm.validateFields().then(() => {
      setEditRow(null);
      message.success("区划信息已保存；如涉及撤并，关联机构和人口数据将按规则提示处理");
    }).catch(() => message.error("请补全区域编码、区域名称、排序和使用状态"));
  }
  const columns = [
    { title: "区域编码", dataIndex: "code", width: 145 },
    { title: "区域名称", dataIndex: "name", width: 150 },
    { title: "等级", dataIndex: "level", width: 110 },
    { title: "上级区域", dataIndex: "parent", width: 140 },
    { title: "排序", dataIndex: "sort", width: 75 },
    { title: "使用状态", dataIndex: "status", width: 100, render: statusTag },
    { title: "撤并状态", dataIndex: "mergeStatus", width: 110, render: statusTag },
    { title: "并入编码", dataIndex: "mergeTo", width: 130 },
    { title: "描述说明", dataIndex: "description", width: 220 },
    { title: "操作", width: 150, fixed: "right", render: (_, row) => <Space size={2}><Button type="link" onClick={() => setEditRow(row)}>编辑</Button><Button type="link" danger onClick={() => message.warning("删除区划前必须提交撤并操作，区域编码保存后不可直接调整")}>删除</Button></Space> }
  ];
  return (
    <div className="region-org-page">
      <Row gutter={16} className="region-layout-row">
        <Col span={6}>
          <Card title="行政区划树" className="table-card region-tree-card">
            {["河南省", "郑州市", "金水区", "文化路街道", "农业路社区"].map((item) => (
              <Button key={item} block type={selectedParent === item ? "primary" : "text"} onClick={() => setSelectedParent(item)}>{item}</Button>
            ))}
            <Button className="region-back-button" onClick={() => setSelectedParent("河南省")}>返回上一级</Button>
          </Card>
        </Col>
        <Col span={18}>
          <Card className="search-card maintenance-search">
            <Form form={form} layout="inline" initialValues={{ level: "全部级别" }}>
              <Form.Item name="level"><Select className="filter-select" options={["全部级别", "省", "市", "县/区", "乡镇/办事处", "社区/村委会"].map((value) => ({ value }))} /></Form.Item>
              <Form.Item name="keyword"><Input prefix={<SearchOutlined />} className="keyword-input" placeholder="区域编码/区域名称/上级区域" /></Form.Item>
              <Form.Item><Space><Button type="primary" icon={<SearchOutlined />} onClick={() => { setQuery(form.getFieldsValue()); message.success("区划查询完成"); }}>查询</Button><Button onClick={() => { form.resetFields(); setQuery({}); }}>重置</Button><Button type="primary" onClick={() => setEditRow({ parent: selectedParent, status: "启用", mergeStatus: "未撤并" })}>添加</Button></Space></Form.Item>
            </Form>
          </Card>
          <Card className="table-card">
            <Alert className="table-alert" type="info" showIcon message="区划管理按五级行政区划维护" description="河南手册要求按省、市、县/区、乡镇办事处、社区村委会分级展示；删除前必须做撤并，并入编码需有效。" />
            <Table columns={columns} dataSource={rows} pagination={false} scroll={{ x: 1450 }} />
          </Card>
        </Col>
      </Row>
      <Modal title={editRow?.code ? "编辑行政区划" : "添加行政区划"} open={Boolean(editRow)} onCancel={() => setEditRow(null)} onOk={saveRegion} okText="保存" cancelText="取消" width={760} destroyOnHidden>
        {editRow && <Form key={editRow.code || "new-region"} form={editForm} layout="vertical" initialValues={editRow}>
          <Row gutter={12}>
            <Col span={8}><Form.Item name="code" label="区域编码" rules={[{ required: true, message: "请输入区域编码" }]}><Input disabled={Boolean(editRow.code)} /></Form.Item></Col>
            <Col span={8}><Form.Item name="name" label="区域名称" rules={[{ required: true, message: "请输入区域名称" }]}><Input /></Form.Item></Col>
            <Col span={8}><Form.Item name="level" label="区域等级" rules={[{ required: true, message: "请选择区域等级" }]}><Select options={["省", "市", "县/区", "乡镇/办事处", "社区/村委会"].map((value) => ({ value }))} /></Form.Item></Col>
            <Col span={8}><Form.Item name="parent" label="上级区域"><Input /></Form.Item></Col>
            <Col span={8}><Form.Item name="sort" label="排列顺序" rules={[{ required: true, message: "请输入排序" }]}><InputNumber min={1} style={{ width: "100%" }} /></Form.Item></Col>
            <Col span={8}><Form.Item name="status" label="使用状态" rules={[{ required: true, message: "请选择使用状态" }]}><Select options={[{ value: "启用" }, { value: "停用" }]} /></Form.Item></Col>
            <Col span={8}><Form.Item name="mergeStatus" label="撤并状态"><Select options={[{ value: "未撤并" }, { value: "已撤并" }]} /></Form.Item></Col>
            <Col span={8}><Form.Item name="mergeTo" label="并入编码"><Input placeholder="撤并时必填" /></Form.Item></Col>
            <Col span={24}><Form.Item name="description" label="描述说明"><Input.TextArea rows={3} /></Form.Item></Col>
          </Row>
        </Form>}
      </Modal>
    </div>
  );
}

function OrganizationManagement({ role }) {
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [query, setQuery] = useState({});
  const [editRow, setEditRow] = useState(null);
  const rows = organizationRows.filter((row) => {
    if (query.region && query.region !== "全部区划" && !row.region.includes(query.region)) return false;
    if (query.keyword && !`${row.code}${row.name}${row.address}`.includes(query.keyword.trim())) return false;
    return true;
  });
  function saveOrg() {
    editForm.validateFields().then(() => {
      setEditRow(null);
      message.success("机构信息已保存；登记中心唯一性和机构编码规则已校验");
    }).catch(() => message.error("请补全机构编码、机构名称、行政区划、机构等级和机构类别"));
  }
  const columns = [
    { title: "机构编码", dataIndex: "code", width: 150 },
    { title: "机构名称", dataIndex: "name", width: 190 },
    { title: "行政区划", dataIndex: "region", width: 140 },
    { title: "机构等级", dataIndex: "level", width: 100 },
    { title: "机构类别", dataIndex: "type", width: 110 },
    { title: "联系电话", dataIndex: "phone", width: 130 },
    { title: "详细地址", dataIndex: "address", width: 180 },
    { title: "使用状态", dataIndex: "status", width: 100, render: statusTag },
    { title: "撤并状态", dataIndex: "mergeStatus", width: 110, render: statusTag },
    { title: "并入编码", dataIndex: "mergeTo", width: 120 },
    { title: "操作", width: 150, fixed: "right", render: (_, row) => <Space size={2}><Button type="link" onClick={() => setEditRow(row)}>编辑</Button><Button type="link" danger onClick={() => message.warning("删除机构前必须提交撤并操作，同一区划登记中心唯一规则将被校验")}>删除</Button></Space> }
  ];
  return (
    <div className="region-org-page">
      <Card className="search-card maintenance-search">
        <Form form={form} layout="inline" initialValues={{ region: "全部区划" }}>
          <Form.Item name="region"><Select className="filter-select" options={[{ value: "全部区划" }, { value: "河南省" }, { value: "郑州市" }, { value: "金水区" }]} /></Form.Item>
          <Form.Item name="keyword"><Input prefix={<SearchOutlined />} className="keyword-input" placeholder="机构编码/机构名称/地址" /></Form.Item>
          <Form.Item><Space><Button type="primary" icon={<SearchOutlined />} onClick={() => { setQuery(form.getFieldsValue()); message.success("机构查询完成"); }}>查询</Button><Button onClick={() => { form.resetFields(); setQuery({}); }}>重置</Button><Button type="primary" onClick={() => setEditRow({ status: "启用", mergeStatus: "未撤并", type: "医疗单位" })}>添加</Button></Space></Form.Item>
        </Form>
      </Card>
      <Card className="table-card">
        <Alert className="table-alert" type="info" showIcon message="机构管理支持区划树筛选和登记中心唯一校验" description="河南手册要求机构编码根据行政区划生成；机构等级包括省级、地市级、县区级、乡镇级；机构类别分登记中心和医疗单位。" />
        <Table columns={columns} dataSource={rows} pagination={false} scroll={{ x: 1550 }} />
      </Card>
      <Modal title={editRow?.code ? "编辑机构" : "添加机构"} open={Boolean(editRow)} onCancel={() => setEditRow(null)} onOk={saveOrg} okText="保存" cancelText="取消" width={820} destroyOnHidden>
        {editRow && <Form key={editRow.code || "new-org"} form={editForm} layout="vertical" initialValues={editRow}>
          <Row gutter={12}>
            <Col span={8}><Form.Item name="code" label="机构编码" rules={[{ required: true, message: "请输入机构编码" }]}><Input /></Form.Item></Col>
            <Col span={8}><Form.Item name="name" label="机构名称" rules={[{ required: true, message: "请输入机构名称" }]}><Input /></Form.Item></Col>
            <Col span={8}><Form.Item name="region" label="行政区划" rules={[{ required: true, message: "请选择行政区划" }]}><Select options={[{ value: "河南省" }, { value: "郑州市" }, { value: "郑州市金水区" }, { value: "许昌市魏都区" }]} /></Form.Item></Col>
            <Col span={8}><Form.Item name="sort" label="排列顺序"><InputNumber min={1} style={{ width: "100%" }} /></Form.Item></Col>
            <Col span={8}><Form.Item name="phone" label="联系电话"><Input /></Form.Item></Col>
            <Col span={8}><Form.Item name="level" label="机构等级" rules={[{ required: true, message: "请选择机构等级" }]}><Select options={["省级", "地市级", "县区级", "乡镇级"].map((value) => ({ value }))} /></Form.Item></Col>
            <Col span={8}><Form.Item name="type" label="机构类别" rules={[{ required: true, message: "请选择机构类别" }]}><Select options={[{ value: "登记中心" }, { value: "医疗单位" }]} /></Form.Item></Col>
            <Col span={8}><Form.Item name="status" label="使用状态"><Select options={[{ value: "启用" }, { value: "停用" }]} /></Form.Item></Col>
            <Col span={8}><Form.Item name="mergeStatus" label="撤并状态"><Select options={[{ value: "未撤并" }, { value: "已撤并" }]} /></Form.Item></Col>
            <Col span={8}><Form.Item name="mergeTo" label="并入编码"><Input /></Form.Item></Col>
            <Col span={16}><Form.Item name="address" label="详细地址"><Input /></Form.Item></Col>
            <Col span={24}><Form.Item name="description" label="描述说明"><Input.TextArea rows={3} /></Form.Item></Col>
          </Row>
        </Form>}
      </Modal>
    </div>
  );
}

function PopulationMatrixManagement({ feature, role }) {
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [query, setQuery] = useState({});
  const [editRow, setEditRow] = useState(null);
  const isStandard = feature.id === "regionOrg_03";
  const isDeath = feature.id === "regionOrg_05";
  const sourceRows = isStandard ? populationMatrixRows.filter((row) => row.region.includes("标准")) : isDeath ? deathPopulationRows : populationMatrixRows.filter((row) => !row.region.includes("标准"));
  const rows = sourceRows.filter((row) => {
    if (query.year && query.year !== "全部年度" && row.year !== query.year) return false;
    if (query.sex && query.sex !== "全部性别" && row.sex !== query.sex) return false;
    if (query.region && query.region !== "全部区划" && !row.region.includes(query.region)) return false;
    return true;
  });
  const editable = role?.label === "县区审核员" || role?.label === "省级管理员" || isStandard;
  function savePopulation() {
    editForm.validateFields().then(() => {
      setEditRow(null);
      message.success(`${feature.name}已保存，同一区划同一年度同一性别唯一性已校验`);
    }).catch(() => message.error("请补全年度、性别和年龄组人口数"));
  }
  const columns = [
    { title: isStandard ? "标准名称" : "行政区划", dataIndex: "region", width: 150 },
    { title: "年度", dataIndex: "year", width: 90 },
    { title: "性别", dataIndex: "sex", width: 90 },
    { title: "0-14岁", dataIndex: "age0", width: 100 },
    { title: "15-44岁", dataIndex: "age15", width: 100 },
    { title: "45-64岁", dataIndex: "age45", width: 100 },
    { title: "65岁以上", dataIndex: "age65", width: 110 },
    { title: "合计", dataIndex: "total", width: 110 },
    { title: "状态", dataIndex: "status", width: 90, render: statusTag },
    { title: "操作", width: 140, fixed: "right", render: (_, row) => <Space size={2}><Button type="link" disabled={!editable} onClick={() => setEditRow(row)}>编辑</Button><Button type="link" danger disabled={!editable} onClick={() => message.warning("删除前需确认该年度统计报表未引用此人口数据")}>删除</Button></Space> }
  ];
  return (
    <div className="population-matrix-page">
      <Row gutter={16} className="plan-stat-row">
        <Col span={6}><Card><Statistic title="记录数" value={rows.length} suffix="条" /></Card></Col>
        <Col span={6}><Card><Statistic title={isDeath ? "死亡人口合计" : "人口合计"} value={rows.reduce((sum, row) => sum + row.total, 0)} /></Card></Col>
        <Col span={6}><Card><Statistic title="当前权限" value={editable ? "可维护" : "仅查看"} /></Card></Col>
        <Col span={6}><Card><Statistic title="数据口径" value={isStandard ? "标准人口" : isDeath ? "死亡人口" : "区域人口"} /></Card></Col>
      </Row>
      <Card className="search-card maintenance-search">
        <Form form={form} layout="inline" initialValues={{ region: "全部区划", year: "2026", sex: "全部性别" }}>
          {!isStandard && <Form.Item name="region"><Select className="filter-select" options={[{ value: "全部区划" }, { value: "郑州市" }, { value: "金水区" }, { value: "许昌市" }]} /></Form.Item>}
          <Form.Item name="year"><Select className="filter-select small" options={[{ value: "全部年度" }, { value: "2026" }, { value: "2025" }, { value: "2000" }]} /></Form.Item>
          <Form.Item name="sex"><Select className="filter-select small" options={[{ value: "全部性别" }, { value: "男" }, { value: "女" }, { value: "合计" }]} /></Form.Item>
          <Form.Item><Space><Button type="primary" icon={<SearchOutlined />} onClick={() => { setQuery(form.getFieldsValue()); message.success(`${feature.name}查询完成`); }}>查询</Button><Button onClick={() => { form.resetFields(); setQuery({}); }}>重置</Button>{isStandard && <Button onClick={() => setEditRow({ region: "中国标准人口", year: "2000", sex: "合计", status: "启用" })}>添加中国人口标准</Button>}<Button type="primary" disabled={!editable} onClick={() => setEditRow({ region: isStandard ? "中国标准人口" : "郑州市金水区", year: "2026", sex: "男", status: "启用" })}>添加</Button></Space></Form.Item>
        </Form>
      </Card>
      <Card className="table-card">
        <Alert className="table-alert" type="info" showIcon message={`${feature.name}按年龄组维护`} description={isStandard ? "标准人口用于标化率计算，可添加中国人口标准和年度年龄组人口。" : "河南手册要求同一区划同一年度同一性别只允许一条年龄组人口数据；县区级用户可编辑，其它行政区划用户主要查看。"} />
        <Table columns={columns} dataSource={rows} pagination={false} scroll={{ x: 1150 }} />
      </Card>
      <Modal title={editRow?.key ? `编辑${feature.name}` : `添加${feature.name}`} open={Boolean(editRow)} onCancel={() => setEditRow(null)} onOk={savePopulation} okText="保存" cancelText="取消" width={820} destroyOnHidden>
        {editRow && <Form key={editRow.key || "new-population"} form={editForm} layout="vertical" initialValues={editRow}>
          <Row gutter={12}>
            <Col span={8}><Form.Item name="region" label={isStandard ? "标准名称" : "行政区划"} rules={[{ required: true, message: "请输入名称" }]}><Input /></Form.Item></Col>
            <Col span={8}><Form.Item name="year" label="年度" rules={[{ required: true, message: "请输入年度" }]}><Input /></Form.Item></Col>
            <Col span={8}><Form.Item name="sex" label="性别" rules={[{ required: true, message: "请选择性别" }]}><Select options={[{ value: "男" }, { value: "女" }, { value: "合计" }]} /></Form.Item></Col>
            <Col span={6}><Form.Item name="age0" label="0-14岁" rules={[{ required: true, message: "请输入人口数" }]}><InputNumber min={0} style={{ width: "100%" }} /></Form.Item></Col>
            <Col span={6}><Form.Item name="age15" label="15-44岁" rules={[{ required: true, message: "请输入人口数" }]}><InputNumber min={0} style={{ width: "100%" }} /></Form.Item></Col>
            <Col span={6}><Form.Item name="age45" label="45-64岁" rules={[{ required: true, message: "请输入人口数" }]}><InputNumber min={0} style={{ width: "100%" }} /></Form.Item></Col>
            <Col span={6}><Form.Item name="age65" label="65岁以上" rules={[{ required: true, message: "请输入人口数" }]}><InputNumber min={0} style={{ width: "100%" }} /></Form.Item></Col>
            <Col span={8}><Form.Item name="total" label="合计"><InputNumber min={0} style={{ width: "100%" }} /></Form.Item></Col>
            <Col span={8}><Form.Item name="status" label="状态"><Select options={[{ value: "启用" }, { value: "停用" }]} /></Form.Item></Col>
          </Row>
        </Form>}
      </Modal>
    </div>
  );
}

function DictionaryManagement({ feature }) {
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [query, setQuery] = useState({});
  const [editRow, setEditRow] = useState(null);
  const id = feature.id;
  const isRegular = id === "dict_01";
  const isAnatomy = id === "dict_02";
  const isPathology = id === "dict_03";
  const isLogic = id === "dict_04";
  const isCustom = id === "dict_05";
  const sourceRows = isRegular ? regularDictionaryRows : isAnatomy ? anatomyDictionaryRows : isPathology ? pathologyDictionaryRows : isLogic ? logicDictionaryRows : customConditionRows;
  const rows = sourceRows.filter((row) => {
    if (query.dictName && query.dictName !== "全部字典" && row.dictName !== query.dictName) return false;
    if (query.siteName && query.siteName !== "全部部位" && row.siteName !== query.siteName && row.relatedSite !== query.siteName) return false;
    if (query.status && query.status !== "全部状态" && row.status !== query.status) return false;
    if (query.keyword && !Object.values(row).join("").includes(query.keyword.trim())) return false;
    return true;
  });
  const commonTail = [
    { title: "状态", dataIndex: "status", width: 90, render: statusTag },
    { title: "撤并状态", dataIndex: "mergeStatus", width: 110, render: statusTag },
    { title: "撤并编码", dataIndex: "mergeCode", width: 120 },
    { title: "备注", dataIndex: "remark", width: 220 },
    { title: "操作", width: 140, fixed: "right", render: (_, row) => <Space size={2}><Button type="link" onClick={() => setEditRow(row)}>编辑</Button><Button type="link" danger onClick={() => message.warning("删除前需要先完成撤并操作，撤并编码不能为空")}>删除</Button></Space> }
  ];
  const columns = isRegular
    ? [{ title: "字典名称", dataIndex: "dictName", width: 130 }, { title: "代码", dataIndex: "code", width: 90 }, { title: "名称", dataIndex: "name", width: 150 }, { title: "排序", dataIndex: "sort", width: 80 }, ...commonTail]
    : isAnatomy
      ? [{ title: "部位名称", dataIndex: "siteName", width: 130 }, { title: "部位编码", dataIndex: "siteCode", width: 100 }, { title: "亚部位编码", dataIndex: "subCode", width: 120 }, { title: "亚部位名称", dataIndex: "subName", width: 160 }, { title: "排序", dataIndex: "sort", width: 80 }, ...commonTail]
      : isPathology
        ? [{ title: "形态学编码", dataIndex: "morphCode", width: 120 }, { title: "病理名称", dataIndex: "morphName", width: 160 }, { title: "行为学", dataIndex: "behavior", width: 90 }, { title: "性质", dataIndex: "grade", width: 90 }, { title: "关联部位", dataIndex: "relatedSite", width: 130 }, { title: "排序", dataIndex: "sort", width: 80 }, ...commonTail]
        : isLogic
          ? [{ title: "逻辑字典", dataIndex: "dictName", width: 150 }, { title: "条件", dataIndex: "condition", width: 220 }, { title: "结果", dataIndex: "result", width: 180 }, ...commonTail]
          : [{ title: "条件名称", dataIndex: "name", width: 170 }, { title: "条件内容", dataIndex: "expression", width: 240 }, { title: "变量", dataIndex: "variable", width: 150 }, { title: "运算符", dataIndex: "operator", width: 100 }, { title: "保留符", dataIndex: "reserved", width: 120 }, { title: "校验状态", dataIndex: "checkStatus", width: 100, render: statusTag }, { title: "创建日期", dataIndex: "createDate", width: 120 }, { title: "状态", dataIndex: "status", width: 90, render: statusTag }, { title: "操作", width: 140, fixed: "right", render: (_, row) => <Space size={2}><Button type="link" onClick={() => setEditRow(row)}>编辑</Button><Button type="link" danger onClick={() => message.warning("自定义条件已被规则引用时不可直接删除")}>删除</Button></Space> }];

  function saveDictionary() {
    editForm.validateFields().then(() => {
      setEditRow(null);
      message.success(`${feature.name}已保存，编码唯一性和撤并关系已校验`);
    }).catch(() => message.error("请补全必填字段并检查编码、排序和撤并状态"));
  }
  function openAdd() {
    const base = { status: "启用", mergeStatus: "未撤并", mergeCode: "-", sort: 1 };
    setEditRow(isRegular ? { ...base, dictName: form.getFieldValue("dictName") || "性别" } : isAnatomy ? { ...base, siteName: form.getFieldValue("siteName") || "呼吸系统" } : isPathology ? { ...base, relatedSite: "呼吸系统" } : isLogic ? { ...base, dictName: form.getFieldValue("dictName") || "性别与部位逻辑" } : { status: "启用", checkStatus: "错误", createDate: "2026-06-10" });
  }
  return (
    <div className="dictionary-page">
      <Row gutter={16} className="plan-stat-row">
        <Col span={6}><Card><Statistic title="字典项" value={rows.length} suffix="条" /></Card></Col>
        <Col span={6}><Card><Statistic title="启用" value={rows.filter((row) => row.status === "启用").length} suffix="条" /></Card></Col>
        <Col span={6}><Card><Statistic title="已撤并" value={rows.filter((row) => row.mergeStatus === "已撤并").length} suffix="条" /></Card></Col>
        <Col span={6}><Card><Statistic title="当前菜单" value={feature.name} /></Card></Col>
      </Row>
      <Card className="search-card maintenance-search">
        <Form form={form} layout="inline" initialValues={{ dictName: "全部字典", siteName: "全部部位", status: "全部状态" }}>
          {(isRegular || isLogic) && <Form.Item name="dictName"><Select className="filter-select" options={["全部字典", "性别", "诊断依据", "报告卡状态", "性别与部位逻辑", "年龄与部位逻辑", "死亡与随访逻辑"].map((value) => ({ value }))} /></Form.Item>}
          {(isAnatomy || isPathology) && <Form.Item name="siteName"><Select className="filter-select" options={["全部部位", "呼吸系统", "消化系统", "乳腺"].map((value) => ({ value }))} /></Form.Item>}
          {isCustom && <Form.Item name="dateRange"><Input className="date-range-input" placeholder="创建日期 2026-05-01 至 2026-06-10" /></Form.Item>}
          <Form.Item name="status"><Select className="filter-select" options={[{ value: "全部状态" }, { value: "启用" }, { value: "停用" }]} /></Form.Item>
          <Form.Item name="keyword"><Input prefix={<SearchOutlined />} className="keyword-input" placeholder="关键字/编码/名称" /></Form.Item>
          <Form.Item><Space><Button type="primary" icon={<SearchOutlined />} onClick={() => { setQuery(form.getFieldsValue()); message.success(`${feature.name}查询完成`); }}>查询</Button><Button onClick={() => { form.resetFields(); setQuery({}); }}>重置</Button><Button type="primary" onClick={openAdd}>{isCustom ? "添加条件" : "添加"}</Button></Space></Form.Item>
        </Form>
      </Card>
      <Card className="table-card">
        <Alert className="table-alert" type="info" showIcon message={feature.name} description={dictionaryDescription(feature.id)} />
        <Table columns={columns} dataSource={rows} pagination={false} scroll={{ x: isCustom ? 1500 : 1400 }} />
      </Card>
      <Modal title={editRow?.key ? `编辑${feature.name}` : `添加${isCustom ? "条件" : feature.name}`} open={Boolean(editRow)} onCancel={() => setEditRow(null)} onOk={saveDictionary} okText="保存" cancelText="取消" width={860} destroyOnHidden>
        {editRow && <DictionaryEditForm key={editRow.key || feature.id} form={editForm} row={editRow} type={feature.id} />}
      </Modal>
    </div>
  );
}

function DictionaryEditForm({ form, row, type }) {
  const isRegular = type === "dict_01";
  const isAnatomy = type === "dict_02";
  const isPathology = type === "dict_03";
  const isLogic = type === "dict_04";
  const isCustom = type === "dict_05";
  return (
    <Form form={form} layout="vertical" initialValues={row}>
      <Row gutter={12}>
        {isRegular && <>
          <Col span={8}><Form.Item name="dictName" label="字典名称" rules={[{ required: true, message: "请选择字典名称" }]}><Select options={["性别", "诊断依据", "报告卡状态"].map((value) => ({ value }))} /></Form.Item></Col>
          <Col span={8}><Form.Item name="code" label="代码" rules={[{ required: true, message: "请输入代码" }]}><Input /></Form.Item></Col>
          <Col span={8}><Form.Item name="name" label="名称" rules={[{ required: true, message: "请输入名称" }]}><Input /></Form.Item></Col>
        </>}
        {isAnatomy && <>
          <Col span={6}><Form.Item name="siteName" label="部位名称" rules={[{ required: true, message: "请选择部位" }]}><Select options={["呼吸系统", "消化系统", "乳腺"].map((value) => ({ value }))} /></Form.Item></Col>
          <Col span={6}><Form.Item name="siteCode" label="部位编码" rules={[{ required: true, message: "请输入部位编码" }]}><Input /></Form.Item></Col>
          <Col span={6}><Form.Item name="subCode" label="亚部位编码" rules={[{ required: true, message: "请输入亚部位编码" }]}><Input /></Form.Item></Col>
          <Col span={6}><Form.Item name="subName" label="亚部位名称" rules={[{ required: true, message: "请输入亚部位名称" }]}><Input /></Form.Item></Col>
        </>}
        {isPathology && <>
          <Col span={6}><Form.Item name="morphCode" label="形态学编码" rules={[{ required: true, message: "请输入形态学编码" }]}><Input /></Form.Item></Col>
          <Col span={6}><Form.Item name="morphName" label="病理名称" rules={[{ required: true, message: "请输入病理名称" }]}><Input /></Form.Item></Col>
          <Col span={6}><Form.Item name="behavior" label="行为学" rules={[{ required: true, message: "请输入行为学" }]}><Input /></Form.Item></Col>
          <Col span={6}><Form.Item name="relatedSite" label="关联部位"><Select options={["呼吸系统", "消化系统", "乳腺"].map((value) => ({ value }))} /></Form.Item></Col>
        </>}
        {isLogic && <>
          <Col span={8}><Form.Item name="dictName" label="逻辑字典" rules={[{ required: true, message: "请选择逻辑字典" }]}><Select options={["性别与部位逻辑", "年龄与部位逻辑", "死亡与随访逻辑"].map((value) => ({ value }))} /></Form.Item></Col>
          <Col span={8}><Form.Item name="condition" label="条件" rules={[{ required: true, message: "请输入条件" }]}><Input /></Form.Item></Col>
          <Col span={8}><Form.Item name="result" label="结果" rules={[{ required: true, message: "请输入结果" }]}><Input /></Form.Item></Col>
        </>}
        {isCustom && <>
          <Col span={8}><Form.Item name="name" label="条件名称" rules={[{ required: true, message: "请输入条件名称" }]}><Input /></Form.Item></Col>
          <Col span={16}><Form.Item name="expression" label="条件内容" rules={[{ required: true, message: "请输入条件内容" }]}><Input /></Form.Item></Col>
          <Col span={6}><Form.Item name="variable" label="变量"><Select mode="multiple" options={["身份证号", "出生日期", "死亡日期", "诊断日期", "行政区划", "发病部位"].map((value) => ({ value }))} /></Form.Item></Col>
          <Col span={6}><Form.Item name="operator" label="运算符"><Select options={["等于", "不等于", "大于", "大于等于", "小于", "包含"].map((value) => ({ value }))} /></Form.Item></Col>
          <Col span={6}><Form.Item name="reserved" label="保留符"><Select options={["身份证解析日期", "日期比较", "配置层级", "当前日期"].map((value) => ({ value }))} /></Form.Item></Col>
          <Col span={6}><Form.Item name="checkStatus" label="校验状态"><Select options={[{ value: "错误" }, { value: "警告" }, { value: "正确" }]} /></Form.Item></Col>
        </>}
        {!isCustom && <Col span={6}><Form.Item name="sort" label="排序" rules={[{ required: true, message: "请输入排序" }]}><InputNumber min={1} style={{ width: "100%" }} /></Form.Item></Col>}
        <Col span={6}><Form.Item name="status" label="状态"><Select options={[{ value: "启用" }, { value: "停用" }]} /></Form.Item></Col>
        {!isCustom && <>
          <Col span={6}><Form.Item name="mergeStatus" label="撤并状态"><Select options={[{ value: "未撤并" }, { value: "已撤并" }]} /></Form.Item></Col>
          <Col span={6}><Form.Item name="mergeCode" label="撤并编码"><Input /></Form.Item></Col>
        </>}
        <Col span={24}><Form.Item name="remark" label="备注"><Input.TextArea rows={3} /></Form.Item></Col>
      </Row>
    </Form>
  );
}

function dictionaryDescription(id) {
  if (id === "dict_01") return "河南手册要求先选择字典名称，再维护代码、名称、排序、状态、撤并状态、撤并编码和备注；删除前需要做撤并。";
  if (id === "dict_02") return "先选择部位名称，再查看和维护亚部位；部位和亚部位需保持父子关系，编码不可重复。";
  if (id === "dict_03") return "维护形态学编码、行为学、病理名称及关联部位，用于 ICD-O-3 和报告卡编码生成。";
  if (id === "dict_04") return "选择逻辑字典后维护条件和结果，引用的常规字典项必须有效，删除前需撤并。";
  return "自定义条件用于报告卡逻辑校验，包含变量、运算符、保留符、条件内容和校验状态。";
}

function AutomationRulesWorkbench({ feature }) {
  const [form] = Form.useForm();
  const [detailRow, setDetailRow] = useState(null);
  const id = feature.id;
  const typeMap = {
    quality_01: "自动质控规则",
    quality_02: "查重规则",
    quality_03: "随访计划规则",
    quality_04: "死因匹配规则",
    quality_05: "接口校验规则",
    quality_06: "年报校验规则",
    quality_07: "规则执行记录",
    quality_08: "纠错工单",
    quality_09: "质量评估报告"
  };
  const isWorkOrder = id === "quality_08";
  const isAssessment = id === "quality_09";
  const rows = autoRuleRows.filter((row) => row.type === typeMap[id]);
  const activeRows = autoRuleRows.filter((row) => row.status === "启用").length;
  const columns = isWorkOrder
    ? [
      { title: "工单编号", dataIndex: "orderNo", width: 150 },
      { title: "来源", dataIndex: "source", width: 120 },
      { title: "业务编号", dataIndex: "businessNo", width: 160 },
      { title: "问题说明", dataIndex: "issue", width: 280 },
      { title: "处理角色", dataIndex: "assignee", width: 160 },
      { title: "创建时间", dataIndex: "createdAt", width: 150 },
      { title: "状态", dataIndex: "status", width: 100, render: statusTag },
      { title: "操作", width: 180, fixed: "right", render: (_, row) => <Space size={2}><Button type="link" onClick={() => setDetailRow(row)}>详情</Button><Button type="link" onClick={() => message.success(`${row.orderNo} 已提交复核`) }>提交复核</Button><Button type="link" danger onClick={() => message.warning(`${row.orderNo} 已退回修正`) }>退回</Button></Space> }
    ]
    : isAssessment
      ? [
        { title: "区划", dataIndex: "region", width: 120 },
        { title: "年度", dataIndex: "year", width: 90 },
        { title: "完整率", dataIndex: "completeness", width: 100 },
        { title: "准确率", dataIndex: "accuracy", width: 100 },
        { title: "一致率", dataIndex: "consistency", width: 100 },
        { title: "漏报率", dataIndex: "missingRate", width: 100 },
        { title: "错误率", dataIndex: "errorRate", width: 100 },
        { title: "及时率", dataIndex: "timeliness", width: 100 },
        { title: "状态", dataIndex: "status", width: 100, render: statusTag },
        { title: "操作", width: 180, fixed: "right", render: (_, row) => <Space size={2}><Button type="link" onClick={() => setDetailRow(row)}>指标说明</Button><Button type="link" onClick={() => message.success(`${row.region}${row.year}质量评估报告已导出`) }>导出</Button></Space> }
      ]
      : [
    { title: "规则编号", dataIndex: "ruleNo", width: 160 },
    { title: "规则名称", dataIndex: "name", width: 210 },
    { title: "规则类型", dataIndex: "type", width: 130 },
    { title: "适用场景", dataIndex: "scene", width: 160 },
    { title: "级别", dataIndex: "level", width: 100 },
    { title: "范围", dataIndex: "scope", width: 140 },
    { title: "版本", dataIndex: "version", width: 90 },
    { title: "最近执行", dataIndex: "lastRun", width: 150 },
    { title: "执行结果", dataIndex: "result", width: 140 },
    { title: "状态", dataIndex: "status", width: 90, render: statusTag },
    {
      title: "操作",
      width: 220,
      fixed: "right",
      render: (_, row) => (
        <Space size={2}>
          <Button type="link" onClick={() => setDetailRow(row)}>详情</Button>
          <Button type="link" onClick={() => message.success(`${row.name} 已执行规则测试，结果写入规则执行记录`)}>测试</Button>
          <Button type="link" onClick={() => message.success(`${row.name} 已发布新版本，自动规则立即生效`) }>发布</Button>
          <Button type="link" danger onClick={() => message.warning(`${row.name} 已停用，历史执行记录保留`) }>停用</Button>
        </Space>
      )
    }
  ];
  const tableRows = isWorkOrder ? qualityWorkOrderRows : isAssessment ? qualityAssessmentRows : rows;
  return (
    <div className="automation-page">
      <Row gutter={16} className="plan-stat-row">
        <Col span={6}><Card><Statistic title="规则总数" value={autoRuleRows.length} suffix="条" /></Card></Col>
        <Col span={6}><Card><Statistic title="启用规则" value={activeRows} suffix="条" /></Card></Col>
        <Col span={6}><Card><Statistic title="当前类型" value={feature.name} /></Card></Col>
        <Col span={6}><Card><Statistic title="审批流程配置" value="已移至审批管理" /></Card></Col>
      </Row>
      <Card className="search-card maintenance-search">
        <Form form={form} layout="inline" initialValues={{ status: "全部状态" }}>
          <Form.Item name="status"><Select className="filter-select" options={[{ value: "全部状态" }, { value: "启用" }, { value: "停用" }, { value: "已完成" }]} /></Form.Item>
          <Form.Item name="scene"><Select className="filter-select" options={[{ value: "全部场景" }, { value: "报告卡登记" }, { value: "数据接口" }, { value: "结构化年报" }, { value: "死因补录" }]} /></Form.Item>
          <Form.Item name="keyword"><Input prefix={<SearchOutlined />} className="keyword-input" placeholder="规则编号/名称/场景" /></Form.Item>
          <Form.Item><Space><Button type="primary" icon={<SearchOutlined />} onClick={() => message.success(`${feature.name}查询完成`)}>查询</Button><Button onClick={() => form.resetFields()}>重置</Button>{!isAssessment && <Button type="primary" onClick={() => setDetailRow({ type: feature.name, status: "启用" })}>{isWorkOrder ? "发起工单" : "新增规则"}</Button>}<Button onClick={() => message.success(`${feature.name}${isAssessment ? "已生成报告" : "批量执行任务已创建"}`)}>{isAssessment ? "生成报告" : "批量执行"}</Button></Space></Form.Item>
        </Form>
      </Card>
      <Card className="table-card" title={feature.name}>
        <Alert className="table-alert" type="info" showIcon message="自动化规则只负责系统自动判断" description="审批流程、审批人账号池和人工流转统一在审批管理维护；这里保留质控、查重、随访、死因、接口和年报校验等自动规则。" />
        <Table columns={columns} dataSource={tableRows} pagination={false} scroll={{ x: 1500 }} />
      </Card>
      <Modal title={detailRow?.ruleNo ? "规则详情" : "新增规则"} open={Boolean(detailRow)} onCancel={() => setDetailRow(null)} onOk={() => { setDetailRow(null); message.success("规则已保存，版本和操作日志已记录"); }} okText="保存" cancelText="取消" width={760}>
        <Descriptions bordered size="small" column={1}>
          <Descriptions.Item label="规则类型">{detailRow?.type || feature.name}</Descriptions.Item>
          <Descriptions.Item label="规则名称">{detailRow?.name || "新建自动规则"}</Descriptions.Item>
          <Descriptions.Item label="适用场景">{detailRow?.scene || "按当前菜单配置"}</Descriptions.Item>
          <Descriptions.Item label="处理级别">{detailRow?.level || "错误/警告/任务/阻断"}</Descriptions.Item>
          <Descriptions.Item label="说明">规则保存后进入自动执行链路；发布、停用、测试均写入规则执行记录和系统操作日志。</Descriptions.Item>
        </Descriptions>
      </Modal>
    </div>
  );
}

function AuditManagementWorkbench({ feature }) {
  const [form] = Form.useForm();
  const [detailRow, setDetailRow] = useState(null);
  const typeMap = {
    audit_01: "报告卡操作日志",
    audit_02: "审批流转日志",
    audit_03: "数据接口日志",
    audit_04: "数据共享日志",
    audit_05: "系统操作日志",
    audit_06: "权限变更日志",
    audit_07: "登录访问日志"
  };
  const rows = auditManagementRows.filter((row) => row.type === typeMap[feature.id]);
  const columns = [
    { title: "时间", dataIndex: "time", width: 160 },
    { title: "日志类型", dataIndex: "type", width: 130 },
    { title: "用户", dataIndex: "user", width: 120 },
    { title: "角色", dataIndex: "role", width: 150 },
    { title: "业务编号", dataIndex: "objectNo", width: 170 },
    { title: "动作", dataIndex: "action", width: 130 },
    { title: "内容", dataIndex: "content", width: 330 },
    { title: "IP地址", dataIndex: "ip", width: 130 },
    { title: "结果", dataIndex: "result", width: 90, render: statusTag },
    { title: "操作", width: 100, fixed: "right", render: (_, row) => <Button type="link" onClick={() => setDetailRow(row)}>详情</Button> }
  ];
  return (
    <div className="audit-page">
      <Row gutter={16} className="plan-stat-row">
        <Col span={6}><Card><Statistic title="日志总量" value={auditManagementRows.length} suffix="类样例" /></Card></Col>
        <Col span={6}><Card><Statistic title="当前分类" value={feature.name} /></Card></Col>
        <Col span={6}><Card><Statistic title="高风险留痕" value={3} suffix="项" /></Card></Col>
        <Col span={6}><Card><Statistic title="保留周期" value="按系统参数" /></Card></Col>
      </Row>
      <Card className="search-card maintenance-search">
        <Form form={form} layout="inline" initialValues={{ result: "全部结果" }}>
          <Form.Item name="result"><Select className="filter-select" options={[{ value: "全部结果" }, { value: "成功" }, { value: "失败" }, { value: "异常" }]} /></Form.Item>
          <Form.Item name="date"><Select className="filter-select" options={[{ value: "今日" }, { value: "近7天" }, { value: "近30天" }, { value: "自定义" }]} /></Form.Item>
          <Form.Item name="keyword"><Input prefix={<SearchOutlined />} className="keyword-input" placeholder="用户/业务编号/IP/动作" /></Form.Item>
          <Form.Item><Space><Button type="primary" icon={<SearchOutlined />} onClick={() => message.success(`${feature.name}查询完成`)}>查询</Button><Button onClick={() => form.resetFields()}>重置</Button><Button onClick={() => message.success(`${feature.name}已导出，导出行为也会写入系统操作日志`)}>导出日志</Button></Space></Form.Item>
        </Form>
      </Card>
      <Card className="table-card" title={feature.name}>
        <Alert className="table-alert" type="info" showIcon message="审计管理只做留痕和追溯" description="业务处理在各业务模块完成，审批处理在审批管理完成；审计管理统一记录操作、流转、共享、权限和安全访问。" />
        <Table columns={columns} dataSource={rows} pagination={false} scroll={{ x: 1500 }} />
      </Card>
      <Drawer title="审计详情" open={Boolean(detailRow)} onClose={() => setDetailRow(null)} width={620}>
        <Descriptions bordered size="small" column={1}>
          <Descriptions.Item label="日志类型">{detailRow?.type}</Descriptions.Item>
          <Descriptions.Item label="业务编号">{detailRow?.objectNo}</Descriptions.Item>
          <Descriptions.Item label="操作用户">{detailRow?.user}</Descriptions.Item>
          <Descriptions.Item label="用户角色">{detailRow?.role}</Descriptions.Item>
          <Descriptions.Item label="动作">{detailRow?.action}</Descriptions.Item>
          <Descriptions.Item label="内容">{detailRow?.content}</Descriptions.Item>
          <Descriptions.Item label="IP地址">{detailRow?.ip}</Descriptions.Item>
          <Descriptions.Item label="结果">{detailRow?.result}</Descriptions.Item>
        </Descriptions>
      </Drawer>
    </div>
  );
}

function ApprovalWorkbench({ feature, role }) {
  const [form] = Form.useForm();
  const [action, setAction] = useState(null);
  const [activeInbox, setActiveInbox] = useState("待我审批");
  const [workflowRows, setWorkflowRows] = useState(approvalRows);
  const id = feature.id;
  const isMine = id === "approval_01";
  const isStarted = id === "approval_02";
  const isFlow = id === "approval_08";
  const businessMap = {
    approval_03: "报告卡审核",
    approval_04: "接口入库审核",
    approval_05: "数据共享审批",
    approval_06: "年报发布审批",
    approval_07: "高风险操作审批"
  };
  const rows = isFlow
    ? approvalFlowRows
    : workflowRows.filter((row) => {
      if (isMine) return row.inbox === activeInbox;
      if (isStarted) return true;
      return row.businessType === businessMap[id];
    });
  const pendingCount = workflowRows.filter((row) => row.inbox === "待我审批").length;
  const passedCount = workflowRows.filter((row) => row.inbox === "已处理").length;
  const returnedCount = workflowRows.filter((row) => row.status === "退回修正").length;
  const ccCount = workflowRows.filter((row) => row.inbox === "抄送我的").length;
  const transferCount = workflowRows.filter((row) => row.inbox === "转办给我").length;

  function applyApproval(result) {
    if (!action?.row) return;
    const next = getNextApprovalState(action.row, result);
    setWorkflowRows((items) => items.map((item) => (item.key === action.row.key ? { ...item, ...next } : item)));
    setAction(null);
    message.success(`${action.row.flowNo} 已${result}，${next.message}`);
  }

  if (!role?.approvalEnabled) {
    return (
      <Card className="table-card">
        <Empty
          description={`${role?.province || "当前省份"}未开启审批管理，系统按河南原业务路径执行：质控通过后进入维护、查重、统计或归档环节。`}
        />
      </Card>
    );
  }

  const columns = isFlow
    ? [
      { title: "省份", dataIndex: "province", width: 100 },
      { title: "业务类型", dataIndex: "businessType", width: 140 },
      { title: "状态", dataIndex: "enabled", width: 90, render: statusTag },
      { title: "审批节点", dataIndex: "nodes", width: 380 },
      { title: "处理人规则", dataIndex: "assigneeRule", width: 240 },
      { title: "退回策略", dataIndex: "returnPolicy", width: 160 },
      { title: "操作", width: 190, fixed: "right", render: (_, row) => <Space size={2}><Button type="link" onClick={() => setAction({ type: "flowEdit", row })}>配置节点</Button><Button type="link" onClick={() => message.success(`${row.businessType}流程已发布新版本`) }>发布</Button><Button type="link" danger onClick={() => message.warning(`${row.businessType}流程停用需确认无在途审批`) }>停用</Button></Space> }
    ]
    : [
      { title: "审批编号", dataIndex: "flowNo", width: 150 },
      { title: "业务类型", dataIndex: "businessType", width: 130 },
      { title: "业务编号", dataIndex: "businessNo", width: 160 },
      { title: "标题", dataIndex: "title", width: 240 },
      { title: "申请方", dataIndex: "applicant", width: 160 },
      { title: "提交角色", dataIndex: "submitterRole", width: 130 },
      { title: "当前节点", dataIndex: "currentNode", width: 130 },
      { title: "接收区划", dataIndex: "receiverRegion", width: 130 },
      { title: "接收角色", dataIndex: "receiverRole", width: 150 },
      { title: "提交时间", dataIndex: "submitTime", width: 150 },
      { title: "状态", dataIndex: "status", width: 110, render: statusTag },
      { title: "风险提示", dataIndex: "risk", width: 160 },
      {
        title: "操作",
        width: 250,
        fixed: "right",
        render: (_, row) => (
          <Space size={2}>
            <Button type="link" onClick={() => setAction({ type: "detail", row })}>详情</Button>
            {!isStarted && row.inbox !== "已处理" && row.inbox !== "抄送我的" && <Button type="link" onClick={() => setAction({ type: "approve", row })}>审批</Button>}
            {isStarted && <Button type="link" onClick={() => setAction({ type: "trace", row })}>轨迹</Button>}
            {isStarted && row.status.includes("待") && <Button type="link" onClick={() => message.success(`${row.flowNo} 已发送催办提醒`) }>催办</Button>}
            {!isStarted && row.inbox !== "已处理" && row.inbox !== "抄送我的" && <Button type="link" danger onClick={() => setAction({ type: "reject", row })}>驳回</Button>}
          </Space>
        )
      }
    ];

  return (
    <div className="approval-page">
      <Row gutter={16} className="plan-stat-row">
        <Col span={6}><Card><Statistic title="审批模式" value={role.province} suffix="已开启" /></Card></Col>
        <Col span={6}><Card><Statistic title="待处理" value={pendingCount} suffix="件" /></Card></Col>
        <Col span={6}><Card><Statistic title="已处理" value={passedCount} suffix="件" /></Card></Col>
        <Col span={6}><Card><Statistic title="退回修正" value={returnedCount} suffix="件" /></Card></Col>
      </Row>
      {isMine && (
        <Card className="table-card approval-route-card" title="审批人工作台">
          <Alert className="table-alert" type="info" showIcon message="任务按账号池派发" description="提交人不需要选择具体审批人。系统按业务类型、行政区划、上级层级和角色权限，把任务推送给对应账号池；账号池内任一有权限账号处理后，该节点完成。" />
          <Tabs
            activeKey={activeInbox}
            onChange={setActiveInbox}
            items={[
              { key: "待我审批", label: `待我审批 ${pendingCount}` },
              { key: "已处理", label: `已处理 ${passedCount}` },
              { key: "抄送我的", label: `抄送我的 ${ccCount}` },
              { key: "转办给我", label: `转办给我 ${transferCount}` }
            ]}
          />
        </Card>
      )}
      {isFlow && (
        <Card className="table-card approval-route-card" title="节点处理人规则">
          <Table
            size="small"
            pagination={false}
            columns={[
              { title: "业务类型", dataIndex: "businessType", width: 130 },
              { title: "提交角色", dataIndex: "submitter", width: 150 },
              { title: "下一节点", dataIndex: "nextNode", width: 120 },
              { title: "接收层级", dataIndex: "receiverLevel", width: 100 },
              { title: "接收角色", dataIndex: "receiverRole", width: 150 },
              { title: "账号池", dataIndex: "accountPool", width: 190 },
              { title: "示例", dataIndex: "sample", width: 260 }
            ]}
            dataSource={approvalNodeRules}
            scroll={{ x: 1200 }}
          />
        </Card>
      )}
      <Card className="search-card maintenance-search">
        <Form form={form} layout="inline" initialValues={{ status: "全部状态", businessType: "全部业务" }}>
          <Form.Item name="businessType"><Select className="filter-select" options={[{ value: "全部业务" }, { value: "报告卡审核" }, { value: "接口入库审核" }, { value: "数据共享审批" }, { value: "年报发布审批" }, { value: "高风险操作审批" }]} /></Form.Item>
          <Form.Item name="status"><Select className="filter-select" options={[{ value: "全部状态" }, { value: "待我审批" }, { value: "退回修正" }, { value: "审批通过" }]} /></Form.Item>
          <Form.Item name="keyword"><Input prefix={<SearchOutlined />} className="keyword-input" placeholder="审批编号/业务编号/申请方" /></Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" icon={<SearchOutlined />} onClick={() => message.success(`${feature.name}查询完成`) }>查询</Button>
              <Button onClick={() => form.resetFields()}>重置</Button>
              {isMine && <Button type="primary" onClick={() => message.success("已批量通过低风险且质控无错误的审批事项")}>批量通过</Button>}
              {isFlow && <Button type="primary" onClick={() => setAction({ type: "flowEdit" })}>新增流程</Button>}
            </Space>
          </Form.Item>
        </Form>
      </Card>
      <Card className="table-card" title={feature.name}>
        <Alert className="table-alert" type="info" showIcon message={approvalHint(feature.id, role)} />
        <Table columns={columns} dataSource={rows} pagination={false} scroll={{ x: isFlow ? 1200 : 1700 }} />
      </Card>
      <Modal
        title={approvalModalTitle(action)}
        open={Boolean(action)}
        onCancel={() => setAction(null)}
        footer={approvalModalFooter(action, applyApproval, () => setAction(null))}
        width={820}
      >
        <ApprovalActionContent action={action} />
      </Modal>
    </div>
  );
}

function approvalHint(id, role) {
  if (id === "approval_08") return `${role.province}审批开启后，业务提交不会直接生效，而是按这里配置的节点流转；河南关闭时隐藏审批菜单。`;
  if (id === "approval_03") return "报告卡审核会回写报告卡状态，审核通过进入正式库或下一节点，退回后回到提交人修正。";
  if (id === "approval_04") return "接口入库审核承接数据接口临时库，通过后才写入正式报告卡、死亡或协查业务数据。";
  if (id === "approval_05") return "共享审批必须确认共享范围、脱敏策略和交付有效期，通过后文件交付菜单才可生成数据包。";
  if (id === "approval_06") return "年报发布审批依赖年报数据准备度、问题清单和质量评估结果。";
  if (id === "approval_07") return "高风险操作包括物理删除、数据恢复、规则发布和权限变更，必须留痕。";
  return "审批管理是江西启用的流程中枢，统一承接报告卡、接口、共享、年报和高风险操作待办。";
}

function getNextApprovalState(row, result) {
  if (result === "退回") {
    return {
      currentNode: "提交人修正",
      receiverRegion: row.applicant,
      receiverRole: row.submitterRole,
      receiverAccounts: `${row.applicant}提交账号`,
      status: "退回修正",
      inbox: "已处理",
      message: `已退回至${row.applicant}，提交人修正后可重新提交`
    };
  }
  if (result === "驳回") {
    return {
      currentNode: "流程终止",
      receiverRegion: "-",
      receiverRole: "-",
      receiverAccounts: "-",
      status: "已驳回",
      inbox: "已处理",
      message: "流程已终止，业务数据不进入正式库或交付环节"
    };
  }
  const flow = {
    县区初审: { currentNode: "地市复审", receiverRegion: "南昌市", receiverRole: "地市报告卡审核员", receiverAccounts: "地市报告卡审核员账号池", status: "待地市复审", inbox: "已处理", message: "已流转至南昌市登记办账号池" },
    地市复审: { currentNode: "省级终审", receiverRegion: "江西省", receiverRole: "省级报告卡终审员", receiverAccounts: "省级报告卡终审员账号池", status: "待省级终审", inbox: "已处理", message: "已流转至省级终审账号池" },
    省级终审: { currentNode: "流程结束", receiverRegion: "-", receiverRole: "-", receiverAccounts: "-", status: "审批通过", inbox: "已处理", message: "报告卡已进入正式库" },
    省级复核: { currentNode: "流程结束", receiverRegion: "-", receiverRole: "-", receiverAccounts: "-", status: "审批通过", inbox: "已处理", message: "接口批次已允许写入正式库" },
    共享合规审核: { currentNode: "脱敏确认", receiverRegion: "江西省", receiverRole: "脱敏策略管理员", receiverAccounts: "脱敏管理员、陈主任", status: "待脱敏确认", inbox: "已处理", message: "已流转至脱敏策略账号池" },
    脱敏确认: { currentNode: "交付授权", receiverRegion: "江西省", receiverRole: "数据交付管理员", receiverAccounts: "数据交付员、陈主任", status: "待交付授权", inbox: "已处理", message: "已流转至交付管理员账号池" },
    交付授权: { currentNode: "流程结束", receiverRegion: "-", receiverRole: "-", receiverAccounts: "-", status: "审批通过", inbox: "已处理", message: "文件交付菜单可生成交付包" },
    安全复核: { currentNode: "流程结束", receiverRegion: "-", receiverRole: "-", receiverAccounts: "-", status: "审批通过", inbox: "已处理", message: "高风险操作允许执行并写入审计" }
  };
  return flow[row.currentNode] || {
    currentNode: "流程结束",
    receiverRegion: "-",
    receiverRole: "-",
    receiverAccounts: "-",
    status: "审批通过",
    inbox: "已处理",
    message: "流程已完成，业务状态已回写"
  };
}

function approvalModalTitle(action) {
  const map = { detail: "审批详情", approve: "审批处理", reject: "驳回审批", trace: "审批轨迹", flowEdit: "审批流程配置" };
  return map[action?.type] || "审批管理";
}

function approvalModalFooter(action, applyApproval, close) {
  if (!action) return null;
  if (action.type === "approve") {
    return (
      <Space>
        <Button onClick={close}>取消</Button>
        <Button onClick={() => applyApproval("退回")}>退回修改</Button>
        <Button danger onClick={() => applyApproval("驳回")}>驳回</Button>
        <Button type="primary" onClick={() => applyApproval("通过")}>通过并流转</Button>
      </Space>
    );
  }
  if (action.type === "reject") {
    return (
      <Space>
        <Button onClick={close}>取消</Button>
        <Button danger type="primary" onClick={() => applyApproval("驳回")}>确认驳回</Button>
      </Space>
    );
  }
  return <Button type="primary" onClick={close}>关闭</Button>;
}

function ApprovalActionContent({ action }) {
  if (!action) return null;
  if (action.type === "approve" || action.type === "reject") {
    return (
      <Form layout="vertical" initialValues={{ result: action.type === "approve" ? "通过" : "驳回", nextNode: "下一审批节点" }}>
        <Row gutter={12}>
          <Col span={12}><Form.Item label="审批结果"><Select options={[{ value: "通过" }, { value: "退回修改" }, { value: "驳回" }, { value: "转办" }]} /></Form.Item></Col>
          <Col span={12}><Form.Item label="下一节点"><Select options={[{ value: "下一审批节点" }, { value: "正式入库/发布" }, { value: "退回提交人" }, { value: "流程终止" }]} /></Form.Item></Col>
          <Col span={24}><Form.Item label="审批意见" required><Input.TextArea rows={3} placeholder="请填写审批依据、退回原因或驳回说明" /></Form.Item></Col>
        </Row>
        <Alert type="warning" showIcon message={`当前业务：${action.row?.businessType || "审批事项"}。确认后会同步更新业务状态、账号池待办和审计日志。`} description={`当前任务来自 ${action.row?.applicant}，系统按 ${action.row?.receiverRegion} / ${action.row?.receiverRole} 派发，账号池：${action.row?.receiverAccounts}。`} />
      </Form>
    );
  }
  if (action.type === "trace") {
    return <ApprovalTrace row={action.row} />;
  }
  if (action.type === "flowEdit") {
    return (
      <Form layout="vertical" initialValues={action.row || { province: "江西省", enabled: "启用" }}>
        <Row gutter={12}>
          <Col span={8}><Form.Item label="省份"><Select options={[{ value: "江西省" }, { value: "河南省" }]} /></Form.Item></Col>
          <Col span={8}><Form.Item label="业务类型"><Select options={[{ value: "报告卡审核" }, { value: "接口入库审核" }, { value: "数据共享审批" }, { value: "年报发布审批" }, { value: "高风险操作审批" }]} /></Form.Item></Col>
          <Col span={8}><Form.Item label="状态"><Select options={[{ value: "启用" }, { value: "停用" }]} /></Form.Item></Col>
          <Col span={24}><Form.Item label="审批节点"><Input.TextArea rows={3} placeholder="例如：机构提交 > 县区初审 > 地市复审 > 省级终审" /></Form.Item></Col>
          <Col span={24}><Form.Item label="处理人规则"><Select options={[{ value: "按上级区划角色池派发" }, { value: "按业务类型派发至省级角色池" }, { value: "指定角色池" }, { value: "指定账号" }, { value: "提交人上级机构" }]} /></Form.Item></Col>
          <Col span={24}><Form.Item label="退回策略"><Input placeholder="退回提交人 / 退回上一节点 / 退回临时库处理" /></Form.Item></Col>
        </Row>
      </Form>
    );
  }
  return (
    <Space direction="vertical" className="full" size={14}>
      <Descriptions bordered size="small" column={1}>
        <Descriptions.Item label="审批编号">{action.row?.flowNo}</Descriptions.Item>
        <Descriptions.Item label="业务类型">{action.row?.businessType}</Descriptions.Item>
        <Descriptions.Item label="业务编号">{action.row?.businessNo}</Descriptions.Item>
        <Descriptions.Item label="当前节点">{action.row?.currentNode}</Descriptions.Item>
        <Descriptions.Item label="派发规则">按 {action.row?.nodeLevel} 层级、{action.row?.receiverRegion} 区划、{action.row?.receiverRole} 角色池派发</Descriptions.Item>
        <Descriptions.Item label="可处理账号">{action.row?.receiverAccounts}</Descriptions.Item>
        <Descriptions.Item label="风险提示">{action.row?.risk}</Descriptions.Item>
      </Descriptions>
      <ApprovalTrace row={action.row} />
    </Space>
  );
}

function ApprovalTrace({ row }) {
  const base = [
    `${row?.submitTime || "2026-06-11 09:18"} ${row?.applicant || "提交方"}提交，提交角色：${row?.submitterRole || "-"}`,
    `系统派发：${row?.receiverRegion || "-"} / ${row?.receiverRole || "-"}，账号池：${row?.receiverAccounts || "-"}`,
    `当前节点：${row?.currentNode || "-"}，当前状态：${row?.status || "-"}`
  ];
  const extra = row?.status === "审批通过"
    ? ["流程结束：业务状态已回写，进入正式库/交付/归档环节"]
    : row?.status === "退回修正"
      ? ["退回提交方：修正后重新提交，重新进入对应审批节点"]
      : ["待处理：账号池内任一授权账号处理后，该节点完成"];
  return <Timeline items={[...base, ...extra].map((children) => ({ children }))} />;
}

function AnnualReportWorkbench({ feature, role }) {
  const [form] = Form.useForm();
  const [action, setAction] = useState(null);
  const [query, setQuery] = useState({});
  const id = feature.id;
  const isSummary = id === "annual_01";
  const isIndicator = id === "annual_02";
  const isTemplate = id === "annual_03";
  const rows = isSummary ? annualRows : isIndicator ? annualIndicatorRows : isTemplate ? annualTemplateRows : annualArchiveRows;
  const summaryCards = isSummary
    ? [
      ["汇总批次", annualRows.length, "个"],
      ["报告卡数", annualRows.reduce((sum, row) => sum + row.reportCards, 0), "张"],
      ["人口分母完整", annualRows.filter((row) => row.populationReady === "完整").length, "项"],
      ["问题清单", annualRows.filter((row) => row.issue !== "无").length, "条"]
    ]
    : isIndicator
      ? [["指标总数", rows.length, "项"], ["已生成", rows.filter((row) => row.status === "已生成").length, "项"], ["待生成", rows.filter((row) => row.status === "待生成").length, "项"], ["公式版本", "V3.0", ""]]
      : isTemplate
        ? [["模板数量", rows.length, "套"], ["章节数", rows.reduce((sum, row) => sum + row.chapters, 0), "章"], ["图表数", rows.reduce((sum, row) => sum + row.charts, 0), "张"], ["草稿", rows.filter((row) => row.status === "草稿").length, "份"]]
        : [["归档文件", rows.length, "份"], ["已发布", rows.filter((row) => row.status === "已发布").length, "份"], ["最新版本", "V1.0", ""], ["下载留痕", "100", "%"]];
  const columns = isSummary
    ? [
      { title: "汇总批次", dataIndex: "batchNo", width: 150 },
      { title: "年度", dataIndex: "year", width: 90 },
      { title: "区划", dataIndex: "region", width: 120 },
      { title: "报告卡数", dataIndex: "reportCards", width: 110 },
      { title: "人口分母", dataIndex: "populationReady", width: 110, render: statusTag },
      { title: "死亡分母", dataIndex: "deathReady", width: 110, render: statusTag },
      { title: "状态", dataIndex: "status", width: 100, render: statusTag },
      { title: "问题说明", dataIndex: "issue", width: 240 },
      { title: "操作", width: 210, fixed: "right", render: (_, row) => <Space size={2}><Button type="link" onClick={() => setAction({ type: "summaryDetail", row })}>明细</Button><Button type="link" onClick={() => setAction({ type: "issue", row })}>问题清单</Button><Button type="link" onClick={() => message.success(`${row.batchNo} 已重新生成汇总，缺失分母将进入问题清单`)}>重新汇总</Button></Space> }
    ]
    : isIndicator
      ? [
        { title: "指标名称", dataIndex: "indicator", width: 150 },
        { title: "公式口径", dataIndex: "formula", width: 260 },
        { title: "计算值", dataIndex: "value", width: 130 },
        { title: "批次", dataIndex: "batch", width: 140 },
        { title: "状态", dataIndex: "status", width: 100, render: statusTag },
        { title: "操作", width: 210, fixed: "right", render: (_, row) => <Space size={2}><Button type="link" onClick={() => message.success(`${row.indicator} 已按固定公式重新计算`) }>重新计算</Button><Button type="link" onClick={() => setAction({ type: "calcLog", row })}>计算日志</Button><Button type="link" onClick={() => setAction({ type: "indicatorWarn", row })}>异常提示</Button></Space> }
      ]
      : isTemplate
        ? [
          { title: "模板名称", dataIndex: "template", width: 230 },
          { title: "年度", dataIndex: "year", width: 90 },
          { title: "章节", dataIndex: "chapters", width: 80 },
          { title: "图表", dataIndex: "charts", width: 80 },
          { title: "版本", dataIndex: "version", width: 90 },
          { title: "更新时间", dataIndex: "updateTime", width: 120 },
          { title: "状态", dataIndex: "status", width: 100, render: statusTag },
          { title: "操作", width: 240, fixed: "right", render: (_, row) => <Space size={2}><Button type="link" onClick={() => setAction({ type: "templatePreview", row })}>章节预览</Button><Button type="link" onClick={() => setAction({ type: "chartInsert", row })}>插入图表</Button><Button type="link" onClick={() => message.success(`${row.template} 草稿已保存，版本号自动递增`) }>保存草稿</Button></Space> }
        ]
        : [
          { title: "文件编号", dataIndex: "fileNo", width: 180 },
          { title: "年报名称", dataIndex: "name", width: 240 },
          { title: "格式", dataIndex: "format", width: 110 },
          { title: "版本", dataIndex: "version", width: 90 },
          { title: "发布时间", dataIndex: "publishTime", width: 130 },
          { title: "操作人", dataIndex: "operator", width: 100 },
          { title: "状态", dataIndex: "status", width: 100, render: statusTag },
          { title: "操作", width: 240, fixed: "right", render: (_, row) => <Space size={2}><Button type="link" onClick={() => message.success(`${row.name} Word 导出任务已创建`) }>导出Word</Button><Button type="link" onClick={() => message.success(`${row.name} PDF 已生成并生成归档文件标识`) }>导出PDF</Button><Button type="link" onClick={() => setAction({ type: "archive", row })}>归档详情</Button></Space> }
        ];

  return (
    <div className="annual-page">
      <Row gutter={16} className="plan-stat-row">
        {summaryCards.map(([title, value, suffix]) => <Col span={6} key={title}><Card><Statistic title={title} value={value} suffix={suffix} /></Card></Col>)}
      </Row>
      <Card className="search-card maintenance-search">
        <Form form={form} layout="inline" initialValues={{ year: "2025", region: "河南省" }}>
          <Form.Item name="year"><Select className="filter-select small" options={[{ value: "2025" }, { value: "2024" }, { value: "2023" }]} /></Form.Item>
          <Form.Item name="region"><Select className="filter-select" options={[{ value: "河南省" }, { value: "郑州市" }, { value: "开封市" }, { value: "金水区" }]} /></Form.Item>
          <Form.Item name="level"><Select className="filter-select" placeholder="机构层级" options={[{ value: "全省" }, { value: "地市" }, { value: "县区" }, { value: "登记机构" }]} /></Form.Item>
          <Form.Item name="keyword"><Input prefix={<SearchOutlined />} className="keyword-input" placeholder="批次/模板/文件编号" /></Form.Item>
          <Form.Item><Space><Button type="primary" icon={<SearchOutlined />} onClick={() => { setQuery(form.getFieldsValue()); message.success(`${feature.name}筛选完成`); }}>查询</Button><Button onClick={() => { form.resetFields(); setQuery({}); }}>重置</Button>{isSummary && <Button type="primary" onClick={() => setAction({ type: "createSummary" })}>生成汇总</Button>}{isIndicator && <Button type="primary" onClick={() => message.success("已提交指标预计算，分母缺失会自动进入异常提示")}>批量计算</Button>}{isTemplate && <Button type="primary" onClick={() => setAction({ type: "newTemplate" })}>生成模板</Button>}{!isSummary && !isIndicator && !isTemplate && <Button type="primary" onClick={() => message.success("当前年报已发布归档，下载与访问记录将纳入审计")}>发布归档</Button>}</Space></Form.Item>
        </Form>
      </Card>
      {isIndicator && <Card className="table-card annual-progress-card" title="指标计算进度"><Row gutter={18}><Col span={8}><Progress percent={50} status="active" /></Col><Col span={8}><Text>粗率指标已完成；标化率等待标准人口权重校验。</Text></Col><Col span={8}><Text type="secondary">计算口径：每10万人，发病率/死亡率 = 例数 / 人口数 * 100000。</Text></Col></Row></Card>}
      {isTemplate && <Card className="table-card annual-progress-card" title="章节结构"><Timeline items={["封面与摘要", "登记地区和人口", "发病统计", "死亡统计", "主要癌种分析", "质量评价", "附表导出"].map((item) => ({ children: item }))} /></Card>}
      <Card className="table-card" title={feature.name}>
        <Table columns={columns} dataSource={rows} pagination={false} scroll={{ x: 1250 }} />
      </Card>
      <Modal title={annualModalTitle(action)} open={Boolean(action)} onCancel={() => setAction(null)} onOk={() => { setAction(null); message.success("操作已完成，年报处理记录已写入日志"); }} okText="确认" cancelText="取消" width={720}>
        <AnnualActionContent action={action} />
      </Modal>
    </div>
  );
}

function annualModalTitle(action) {
  const map = { createSummary: "生成年度汇总", summaryDetail: "汇总明细", issue: "问题清单", calcLog: "计算日志", indicatorWarn: "指标异常提示", templatePreview: "章节预览", chartInsert: "插入图表", newTemplate: "生成年报模板", archive: "归档详情" };
  return map[action?.type] || "结构化年报";
}

function AnnualActionContent({ action }) {
  if (!action) return null;
  if (action.type === "createSummary") {
    return <Form layout="vertical" initialValues={{ year: "2025", region: "河南省", level: "全省" }}><Row gutter={12}><Col span={8}><Form.Item label="年度"><Select options={[{ value: "2025" }, { value: "2024" }]} /></Form.Item></Col><Col span={8}><Form.Item label="区划"><Select options={[{ value: "河南省" }, { value: "郑州市" }]} /></Form.Item></Col><Col span={8}><Form.Item label="机构层级"><Select options={[{ value: "全省" }, { value: "地市" }, { value: "县区" }]} /></Form.Item></Col></Row><Alert type="info" showIcon message="生成前会检查正式报告卡、区域人口、死亡人口和标准人口是否完整；缺失项不会静默跳过。" /></Form>;
  }
  if (action.type === "issue" || action.type === "indicatorWarn") {
    return <Alert type="warning" showIcon message="需处理的问题" description={action.row?.issue || "中标发病率缺少标准人口权重，死亡率计算存在 1 个年龄组分母为 0。请先在区域/机构/人口菜单补齐分母后重新计算。"} />;
  }
  if (action.type === "templatePreview") {
    return <Timeline items={["第一章 登记地区与人口", "第二章 全部恶性肿瘤发病情况", "第三章 全部恶性肿瘤死亡情况", "第四章 主要癌种年龄别发病率", "第五章 数据质量评价"].map((children) => ({ children }))} />;
  }
  if (action.type === "chartInsert") {
    return <Descriptions bordered size="small" column={1}><Descriptions.Item label="可插入图表">年龄组发病率柱状图、主要癌种构成饼图、年度趋势折线图、地区分布排行图</Descriptions.Item><Descriptions.Item label="图表口径">正式有效卡，按诊断日期年度统计，率按每10万人计算</Descriptions.Item></Descriptions>;
  }
  return <Descriptions bordered size="small" column={1}><Descriptions.Item label="对象">{action.row?.batchNo || action.row?.indicator || action.row?.name || action.row?.template || "年度年报"}</Descriptions.Item><Descriptions.Item label="处理说明">展示当前记录的来源批次、计算口径、版本和操作留痕，确认后进入下一环节。</Descriptions.Item><Descriptions.Item label="当前状态">{action.row?.status || "待处理"}</Descriptions.Item></Descriptions>;
}

function DataSharingWorkbench({ feature, role }) {
  const [form] = Form.useForm();
  const [action, setAction] = useState(null);
  const id = feature.id;
  const isApply = id === "sharing_01";
  const isRecord = id === "sharing_02";
  const isPolicy = id === "sharing_03";
  const isDelivery = id === "sharing_04";
  const isService = id === "sharing_05";
  const isMonitor = id === "sharing_06";
  const rows = isPolicy ? sharePolicyRows : isDelivery ? shareDeliveryRows : isService ? shareServiceRows : isMonitor ? shareMonitorRows : shareRows;
  const columns = isPolicy
    ? [
      { title: "策略名称", dataIndex: "name", width: 160 },
      { title: "脱敏字段", dataIndex: "fields", width: 260 },
      { title: "脱敏规则", dataIndex: "rule", width: 220 },
      { title: "适用场景", dataIndex: "applyTo", width: 120 },
      { title: "状态", dataIndex: "status", width: 100, render: statusTag },
      { title: "操作", width: 210, fixed: "right", render: (_, row) => <Space size={2}><Button type="link" onClick={() => setAction({ type: "policyEdit", row })}>编辑</Button><Button type="link" onClick={() => setAction({ type: "policyPreview", row })}>预览</Button><Button type="link" onClick={() => message.success(`${row.name} 已发布，后续交付包将按该策略脱敏`) }>发布</Button></Space> }
    ]
    : isDelivery
      ? [
        { title: "交付包编号", dataIndex: "packageNo", width: 170 },
        { title: "申请编号", dataIndex: "requestNo", width: 140 },
        { title: "文件名", dataIndex: "fileName", width: 250 },
        { title: "有效期", dataIndex: "expireDate", width: 120 },
        { title: "下载限制", dataIndex: "downloads", width: 120 },
        { title: "文件标识", dataIndex: "watermark", width: 120 },
        { title: "状态", dataIndex: "status", width: 100, render: statusTag },
        { title: "操作", width: 240, fixed: "right", render: (_, row) => <Space size={2}><Button type="link" onClick={() => message.success(`${row.fileName} 已按审批配置生成受控下载链接`) }>生成链接</Button><Button type="link" onClick={() => setAction({ type: "deliveryDetail", row })}>交付详情</Button><Button type="link" danger onClick={() => message.warning(`${row.packageNo} 已设置为立即失效`) }>失效</Button></Space> }
      ]
      : isService
        ? [
          { title: "服务编号", dataIndex: "serviceNo", width: 150 },
          { title: "服务名称", dataIndex: "name", width: 230 },
          { title: "授权机构", dataIndex: "org", width: 180 },
          { title: "服务类型", dataIndex: "type", width: 120 },
          { title: "共享范围", dataIndex: "scope", width: 260 },
          { title: "鉴权参数", dataIndex: "auth", width: 150 },
          { title: "使用限制", dataIndex: "limit", width: 120 },
          { title: "状态", dataIndex: "status", width: 100, render: statusTag },
          { title: "操作", width: 230, fixed: "right", render: (_, row) => <Space size={2}><Button type="link" onClick={() => setAction({ type: "serviceDetail", row })}>详情</Button><Button type="link" onClick={() => message.success(`${row.name} 连通性检查通过，鉴权参数和脱敏策略有效`) }>连通性检查</Button><Button type="link" danger onClick={() => message.warning(`${row.name} 已停用，服务访问立即失效`) }>停用</Button></Space> }
        ]
        : isMonitor
          ? [
            { title: "对象编号", dataIndex: "objectNo", width: 160 },
            { title: "机构", dataIndex: "org", width: 180 },
            { title: "行为", dataIndex: "action", width: 110 },
            { title: "账号", dataIndex: "user", width: 130 },
            { title: "IP地址", dataIndex: "ip", width: 130 },
            { title: "时间", dataIndex: "time", width: 150 },
            { title: "次数/额度", dataIndex: "count", width: 110 },
            { title: "状态", dataIndex: "status", width: 100, render: statusTag },
            { title: "操作", width: 160, fixed: "right", render: (_, row) => <Space size={2}><Button type="link" onClick={() => setAction({ type: "monitorDetail", row })}>详情</Button><Button type="link" danger disabled={row.status === "正常"} onClick={() => message.warning(`${row.objectNo} 已强制失效并记录数据共享日志`) }>强制失效</Button></Space> }
          ]
          : [
        { title: "申请编号", dataIndex: "no", width: 140 },
        { title: "申请机构", dataIndex: "org", width: 170 },
        { title: "共享范围", dataIndex: "range", width: 260 },
        { title: "申请日期", dataIndex: "date", width: 120 },
        { title: "状态", dataIndex: "status", width: 110, render: statusTag },
        { title: "操作", width: 240, fixed: "right", render: (_, row) => <Space size={2}><Button type="link" onClick={() => setAction({ type: "shareDetail", row })}>详情</Button>{isRecord ? <><Button type="link" onClick={() => setAction({ type: "trace", row })}>审批轨迹</Button><Button type="link" onClick={() => message.success(`${row.no} 已定位到交付包和下载记录`) }>交付记录</Button></> : <><Button type="link" onClick={() => setAction({ type: "applyEdit", row })}>补充材料</Button><Button type="link" danger disabled={row.status === "已交付"} onClick={() => message.warning(`${row.no} 已撤回，审批管理中的待审任务同步取消`) }>撤回</Button></>}</Space> }
      ];

  return (
    <div className="sharing-page">
      <Row gutter={16} className="plan-stat-row">
        <Col span={6}><Card><Statistic title="申请总数" value={shareRows.length} suffix="件" /></Card></Col>
        <Col span={6}><Card><Statistic title="审批中" value={shareRows.filter((row) => row.status === "待审批").length} suffix="件" /></Card></Col>
        <Col span={6}><Card><Statistic title="脱敏策略" value={sharePolicyRows.length} suffix="套" /></Card></Col>
        <Col span={6}><Card><Statistic title="服务/交付" value={shareDeliveryRows.length + shareServiceRows.length} suffix="项" /></Card></Col>
      </Row>
      <Card className="search-card maintenance-search">
        <Form form={form} layout="inline" initialValues={{ status: "全部状态" }}>
          <Form.Item name="status"><Select className="filter-select" options={[{ value: "全部状态" }, { value: "待审批" }, { value: "已交付" }, { value: "退回补充" }]} /></Form.Item>
          <Form.Item name="scene"><Select className="filter-select" placeholder="共享场景" options={[{ value: "科研课题" }, { value: "疾控交换" }, { value: "领导决策" }]} /></Form.Item>
          <Form.Item name="keyword"><Input prefix={<SearchOutlined />} className="keyword-input" placeholder="申请编号/机构/文件名/服务编号" /></Form.Item>
          <Form.Item><Space><Button type="primary" icon={<SearchOutlined />} onClick={() => message.success(`${feature.name}查询完成`) }>查询</Button><Button onClick={() => form.resetFields()}>重置</Button>{isApply && <Button type="primary" onClick={() => setAction({ type: "newApply" })}>新建申请</Button>}{isRecord && <Button onClick={() => message.info("共享审批请进入：审批管理 > 数据共享审批")}>查看审批入口</Button>}{isPolicy && <Button type="primary" onClick={() => setAction({ type: "policyEdit" })}>新增策略</Button>}{isDelivery && <Button type="primary" onClick={() => message.success("已为审批通过的申请生成待交付数据包")}>生成交付包</Button>}{isService && <Button type="primary" onClick={() => setAction({ type: "serviceEdit" })}>新增服务</Button>}{isMonitor && <Button onClick={() => message.success("异常使用行为已生成告警并写入数据共享日志")}>生成告警</Button>}</Space></Form.Item>
        </Form>
      </Card>
      {isRecord && <Card className="table-card share-policy-note"><Alert type="info" showIcon message="共享审批入口已统一到审批管理" description="数据共享菜单只展示申请、记录、脱敏、交付、服务和监控；同意、退回、驳回等人工审批动作请在审批管理 > 数据共享审批中处理。" /></Card>}
      {isPolicy && <Card className="table-card share-policy-note"><Alert type="info" showIcon message="脱敏策略与交付包关联" description="交付前必须选择已发布策略。姓名、身份证、电话、详细地址等字段按角色和申请用途脱敏；下载限制和文件标识按审批与系统参数生成。" /></Card>}
      <Card className="table-card" title={feature.name}>
        <Table columns={columns} dataSource={rows} pagination={false} scroll={{ x: 1220 }} />
      </Card>
      <Modal title={shareModalTitle(action)} open={Boolean(action)} onCancel={() => setAction(null)} onOk={() => { setAction(null); message.success("数据共享操作已提交，审批和交付日志已记录"); }} okText="确认" cancelText="取消" width={760}>
        <ShareActionContent action={action} />
      </Modal>
    </div>
  );
}

function shareModalTitle(action) {
  const map = { newApply: "新建共享申请", applyEdit: "补充申请材料", shareDetail: "共享申请详情", trace: "共享审批轨迹", policyEdit: "脱敏策略维护", policyPreview: "脱敏预览", deliveryDetail: "文件交付详情", serviceEdit: "新增接口服务", serviceDetail: "接口服务详情", monitorDetail: "使用监控详情" };
  return map[action?.type] || "数据共享";
}

function ShareActionContent({ action }) {
  if (!action) return null;
  if (action.type === "newApply" || action.type === "applyEdit") {
    return <Form layout="vertical" initialValues={{ org: action.row?.org, range: action.row?.range, purpose: "科研课题", level: "脱敏明细" }}><Row gutter={12}><Col span={12}><Form.Item label="申请机构" required><Input /></Form.Item></Col><Col span={12}><Form.Item label="共享用途" required><Select options={[{ value: "科研课题" }, { value: "疾控交换" }, { value: "领导决策" }]} /></Form.Item></Col><Col span={12}><Form.Item label="数据粒度"><Select options={[{ value: "脱敏明细" }, { value: "区县汇总" }, { value: "图表结果" }]} /></Form.Item></Col><Col span={12}><Form.Item label="有效期"><Select options={[{ value: "30天" }, { value: "90天" }, { value: "半年" }]} /></Form.Item></Col><Col span={24}><Form.Item label="共享范围" required><Input.TextArea rows={3} /></Form.Item></Col></Row><Alert type="warning" showIcon message="涉及病例明细时必须选择脱敏策略，审批通过后才可生成交付包。" /></Form>;
  }
  if (action.type === "policyEdit") {
    return <Form layout="vertical" initialValues={action.row || { status: "启用" }}><Row gutter={12}><Col span={12}><Form.Item label="策略名称" required><Input /></Form.Item></Col><Col span={12}><Form.Item label="适用场景"><Select options={[{ value: "科研课题" }, { value: "疾控交换" }]} /></Form.Item></Col><Col span={24}><Form.Item label="脱敏字段"><Input placeholder="姓名、身份证、电话、详细地址" /></Form.Item></Col><Col span={24}><Form.Item label="规则说明"><Input.TextArea rows={3} placeholder="例如：身份证保留前6后4，姓名替换为编号，地址汇总到区县" /></Form.Item></Col></Row></Form>;
  }
  if (action.type === "policyPreview") {
    return <Table size="small" pagination={false} columns={[{ title: "字段", dataIndex: "field" }, { title: "原值", dataIndex: "before" }, { title: "脱敏后", dataIndex: "after" }]} dataSource={[{ key: "1", field: "姓名", before: "张秀兰", after: "病例000183" }, { key: "2", field: "身份证", before: "41010519630215482X", after: "410105******5482X" }, { key: "3", field: "详细地址", before: "郑州市金水区纬五路", after: "郑州市金水区" }]} />;
  }
  if (action.type === "trace") {
    return <Timeline items={["申请提交：省肿瘤研究所提交共享申请", "共享合规审核：审批管理 > 数据共享审批中处理", "脱敏确认：绑定科研脱敏策略", "交付授权：通过后进入文件交付或接口服务"].map((children) => ({ children }))} />;
  }
  if (action.type === "serviceEdit") {
    return <Form layout="vertical" initialValues={{ type: "API接口", auth: "按接口参数配置" }}><Row gutter={12}><Col span={12}><Form.Item label="服务名称" required><Input /></Form.Item></Col><Col span={12}><Form.Item label="服务类型"><Select options={[{ value: "API接口" }, { value: "受控数据服务" }, { value: "介质同步" }]} /></Form.Item></Col><Col span={12}><Form.Item label="鉴权参数"><Select options={[{ value: "按接口参数配置" }, { value: "按账号权限配置" }, { value: "人工交付" }]} /></Form.Item></Col><Col span={12}><Form.Item label="使用限制"><Input placeholder="按审批配置" /></Form.Item></Col><Col span={24}><Form.Item label="共享范围" required><Input.TextArea rows={3} /></Form.Item></Col></Row><Alert type="info" showIcon message="接口服务必须绑定审批通过的共享申请和脱敏策略。" /></Form>;
  }
  return <Descriptions bordered size="small" column={1}><Descriptions.Item label="业务对象">{action.row?.no || action.row?.packageNo || action.row?.serviceNo || action.row?.objectNo || action.row?.name || "共享申请"}</Descriptions.Item><Descriptions.Item label="当前状态">{action.row?.status || "待提交"}</Descriptions.Item><Descriptions.Item label="处理要求">共享申请审批在审批管理处理；数据共享菜单负责申请、记录、脱敏、交付、接口服务和使用监控，所有下载、调用和失效动作写入数据共享日志。</Descriptions.Item></Descriptions>;
}

function SystemSettingsWorkbench({ feature, role }) {
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [query, setQuery] = useState({});
  const [editRow, setEditRow] = useState(null);
  const [authRole, setAuthRole] = useState(null);
  const [authCheckedKeys, setAuthCheckedKeys] = useState([]);
  const id = feature.id;
  const isPassword = id === "system_00";
  const isUser = id === "system_01";
  const isRole = id === "system_02";
  const isBackup = id === "system_04";
  const isProvinceParam = id === "system_05";
  const rows = isUser ? systemUserRows : isRole ? systemRoleRows : isBackup ? backupRows : onlineUserRows;
  const filteredRows = rows.filter((row) => {
    if (query.region && query.region !== "全部区划" && row.region && !row.region.includes(query.region)) return false;
    if (query.keyword && !Object.values(row).join("").includes(query.keyword.trim())) return false;
    return true;
  });
  function saveSystemRow() {
    editForm.validateFields().then(() => {
      setEditRow(null);
      message.success(`${feature.name}信息已保存，系统操作日志已记录`);
    }).catch(() => message.error("请补全必填字段并检查格式"));
  }
  function openRoleAuth(row) {
    const moduleIds = roles[row.mark]?.modules || [];
    const checkedKeys = [];
    functionMenu.forEach((module) => {
      if (moduleIds.includes(module.id)) {
        checkedKeys.push(module.id);
        module.features.forEach((item) => checkedKeys.push(item.id));
      }
    });
    setAuthRole(row);
    setAuthCheckedKeys(checkedKeys);
  }
  function saveRoleAuth() {
    const moduleCount = authCheckedKeys.filter((key) => functionMenu.some((module) => module.id === key)).length;
    const featureCount = authCheckedKeys.length - moduleCount;
    message.success(`${authRole?.name || "角色"}菜单权限已保存：${moduleCount} 个一级菜单、${featureCount} 个二级功能，重新登录后生效`);
    setAuthRole(null);
  }
  if (isProvinceParam) {
    return <ProvinceParameterSettings role={role} />;
  }
  if (isPassword) {
    return (
      <div className="system-page">
        <Card className="table-card system-password-card" title="修改密码">
          <Alert className="compact-alert" type="info" showIcon message="河南系统管理：修改密码" description="用户首次登录、密码过期或主动修改时进入本页面。密码不少于 8 位，需包含数字、字母和特殊字符，默认有效期 90 天。" />
          <Form form={form} layout="vertical" className="system-password-form">
            <Form.Item name="oldPassword" label="原密码" rules={[{ required: true, message: "请输入原密码" }]}><Input.Password /></Form.Item>
            <Form.Item name="newPassword" label="新密码" rules={[{ required: true, message: "请输入新密码" }]}><Input.Password placeholder="不少于8位，包含数字、字母和特殊字符" /></Form.Item>
            <Form.Item name="confirmPassword" label="确认新密码" rules={[{ required: true, message: "请再次输入新密码" }]}><Input.Password /></Form.Item>
            <Space><Button onClick={() => form.resetFields()}>重置</Button><Button type="primary" onClick={() => form.validateFields().then(() => message.success("密码已修改，请使用新密码重新登录")).catch(() => message.error("请补全密码并确认两次输入一致"))}>保存</Button></Space>
          </Form>
        </Card>
      </div>
    );
  }
  const columns = isUser
    ? [
      { title: "用户名", dataIndex: "username", width: 120 },
      { title: "姓名", dataIndex: "name", width: 90 },
      { title: "性别", dataIndex: "sex", width: 70 },
      { title: "行政区划", dataIndex: "region", width: 140 },
      { title: "机构", dataIndex: "org", width: 180 },
      { title: "部门", dataIndex: "department", width: 120 },
      { title: "联系电话", dataIndex: "phone", width: 130 },
      { title: "角色", dataIndex: "role", width: 130 },
      { title: "状态", dataIndex: "status", width: 90, render: statusTag },
      { title: "操作", width: 210, fixed: "right", render: (_, row) => <Space size={2}><Button type="link" onClick={() => setEditRow(row)}>修改</Button><Button type="link" onClick={() => message.success(`${row.name} 密码已重置为初始密码，首次登录需修改`)}>重置密码</Button><Button type="link" danger onClick={() => message.warning("用户已删除，关联操作日志保留")}>删除</Button></Space> }
    ]
    : isRole
      ? [
        { title: "编码", dataIndex: "code", width: 150 },
        { title: "标识", dataIndex: "mark", width: 110 },
        { title: "名称", dataIndex: "name", width: 130 },
        { title: "排序", dataIndex: "sort", width: 80 },
        { title: "权限地址", dataIndex: "permissionUrl", width: 140 },
        { title: "状态", dataIndex: "status", width: 90, render: statusTag },
        { title: "描述说明", dataIndex: "description", width: 260 },
        { title: "操作", width: 180, fixed: "right", render: (_, row) => <Space size={2}><Button type="link" onClick={() => setEditRow(row)}>修改</Button><Button type="link" onClick={() => openRoleAuth(row)}>授权</Button><Button type="link" danger onClick={() => message.warning("存在用户绑定的角色不可直接删除")}>删除</Button></Space> }
      ]
      : isBackup
        ? [
          { title: "任务编号", dataIndex: "taskNo", width: 160 },
          { title: "备份类型", dataIndex: "backupType", width: 160 },
          { title: "范围", dataIndex: "scope", width: 100 },
          { title: "开始时间", dataIndex: "startTime", width: 150 },
          { title: "文件大小", dataIndex: "fileSize", width: 100 },
          { title: "结果", dataIndex: "result", width: 90, render: statusTag },
          { title: "操作人", dataIndex: "operator", width: 110 },
          { title: "状态", dataIndex: "status", width: 100, render: statusTag },
          { title: "操作", width: 170, fixed: "right", render: (_, row) => <Space size={2}><Button type="link" onClick={() => message.success(`${row.taskNo} 备份文件下载申请已提交`)}>下载</Button><Button type="link" onClick={() => message.warning("恢复为高风险操作，需审批后执行")}>恢复申请</Button></Space> }
        ]
        : [
          { title: "用户名", dataIndex: "username", width: 120 },
          { title: "姓名", dataIndex: "name", width: 90 },
          { title: "行政区划", dataIndex: "region", width: 140 },
          { title: "机构", dataIndex: "org", width: 180 },
          { title: "登录时间", dataIndex: "loginTime", width: 150 },
          { title: "IP地址", dataIndex: "ip", width: 120 },
          { title: "状态", dataIndex: "status", width: 90, render: statusTag },
          { title: "操作", width: 120, fixed: "right", render: (_, row) => <Button type="link" danger onClick={() => message.warning(`${row.name} 已被强制下线，操作写入系统操作日志`)}>强制下线</Button> }
        ];
  return (
    <div className="system-page">
      <Row gutter={16} className="plan-stat-row">
        <Col span={6}><Card><Statistic title="记录数" value={filteredRows.length} suffix="条" /></Card></Col>
        <Col span={6}><Card><Statistic title="启用/在线" value={filteredRows.filter((row) => row.status === "启用" || row.status === "在线").length} suffix="条" /></Card></Col>
        <Col span={6}><Card><Statistic title="当前角色" value={role?.label || "当前用户"} /></Card></Col>
        <Col span={6}><Card><Statistic title="菜单口径" value={feature.name} /></Card></Col>
      </Row>
      <Card className="search-card maintenance-search">
        <Form form={form} layout="inline" initialValues={{ region: "全部区划" }}>
          {(isUser || !isRole && !isBackup) && <Form.Item name="region"><Select className="filter-select" options={[{ value: "全部区划" }, { value: "河南省" }, { value: "郑州市" }, { value: "金水区" }]} /></Form.Item>}
          <Form.Item name="keyword"><Input prefix={<SearchOutlined />} className="keyword-input" placeholder={isBackup ? "任务编号/备份类型/操作人" : "用户名/姓名/机构/角色"} /></Form.Item>
          <Form.Item><Space><Button type="primary" icon={<SearchOutlined />} onClick={() => { setQuery(form.getFieldsValue()); message.success(`${feature.name}查询完成`); }}>查询</Button><Button onClick={() => { form.resetFields(); setQuery({}); }}>重置</Button>{(isUser || isRole) && <Button type="primary" onClick={() => setEditRow(isUser ? { status: "启用", sex: "男" } : { status: "启用", sort: 1 })}>{isUser ? "添加用户" : "添加角色"}</Button>}{isBackup && <Button type="primary" onClick={() => message.success("手动备份任务已创建，完成后进入备份列表")}>手动备份</Button>}</Space></Form.Item>
        </Form>
      </Card>
      <Card className="table-card">
        <Alert className="table-alert" type="info" showIcon message={feature.name} description={systemDescription(feature.id)} />
        <Table columns={columns} dataSource={filteredRows} pagination={false} scroll={{ x: 1350 }} />
      </Card>
      <Modal title={editRow?.key ? `修改${feature.name}` : `添加${isUser ? "用户" : "角色"}`} open={Boolean(editRow)} onCancel={() => setEditRow(null)} onOk={saveSystemRow} okText="保存" cancelText="取消" width={860} destroyOnHidden>
        {editRow && <SystemEditForm form={editForm} row={editRow} type={feature.id} />}
      </Modal>
      <Modal title={`角色授权 - ${authRole?.name || ""}`} open={Boolean(authRole)} onCancel={() => setAuthRole(null)} onOk={saveRoleAuth} okText="保存授权" cancelText="取消" width={900}>
        <Alert className="compact-alert" type="info" showIcon message="授权内容直接对应左侧系统菜单" description="勾选一级菜单会包含其下二级功能；取消二级功能后，该角色登录时不展示对应菜单入口。数据范围仍由角色和机构区划共同控制。" />
        <Row gutter={16}>
          <Col span={14}>
            <Card size="small" title="菜单权限">
              <Tree
                checkable
                defaultExpandAll
                checkedKeys={authCheckedKeys}
                onCheck={(keys) => setAuthCheckedKeys(Array.isArray(keys) ? keys : keys.checked)}
                treeData={functionMenu.map((module) => ({
                  key: module.id,
                  title: module.name,
                  children: module.features.map((item) => ({ key: item.id, title: item.name }))
                }))}
              />
            </Card>
          </Col>
          <Col span={10}>
            <Card size="small" title="已授权摘要">
              <Descriptions column={1} size="small" bordered>
                <Descriptions.Item label="角色标识">{authRole?.mark}</Descriptions.Item>
                <Descriptions.Item label="一级菜单">{authCheckedKeys.filter((key) => functionMenu.some((module) => module.id === key)).length} 个</Descriptions.Item>
                <Descriptions.Item label="二级功能">{authCheckedKeys.filter((key) => functionMenu.some((module) => module.features.some((item) => item.id === key))).length} 个</Descriptions.Item>
                <Descriptions.Item label="当前说明">{authRole?.description}</Descriptions.Item>
              </Descriptions>
              <Alert className="drawer-alert" type="warning" showIcon message="保存后模拟生效" description="本原型会展示授权和菜单的关联关系；正式系统保存后会写入角色-菜单-操作权限表，并在用户重新登录后刷新菜单。" />
            </Card>
          </Col>
        </Row>
      </Modal>
    </div>
  );
}

function ProvinceParameterSettings({ role }) {
  const [form] = Form.useForm();
  const isJiangxi = role?.province === "江西省";
  const enabledModules = new Set(role?.approvalModules || []);
  const settings = [
    { key: "cards", label: "报告卡审批", desc: "报告卡提交后进入县区、地市、省级审核；关闭时按河南原路径进入维护/正式状态。" },
    { key: "exchange", label: "接口入库审批", desc: "HIS、死因、协查临时库数据通过审批后写入正式库。" },
    { key: "sharing", label: "数据共享审批", desc: "共享申请需合规审核、脱敏确认和交付授权。" },
    { key: "annual", label: "年报发布审批", desc: "年报发布归档前检查数据准备度和问题清单。" },
    { key: "risk", label: "高风险操作审批", desc: "作废物理删除、恢复、规则发布、权限变更等需审批留痕。" }
  ];
  const rows = [
    { key: "1", province: "河南省", approval: "关闭", path: "质控通过后沿用河南 V3.0 原业务操作", visibleMenu: "隐藏审批管理", status: "生效中" },
    { key: "2", province: "江西省", approval: "开启", path: "提交后进入统一审批管理和首页待办", visibleMenu: "显示审批管理", status: "可交付" }
  ];
  return (
    <div className="system-page">
      <Row gutter={16} className="plan-stat-row">
        <Col span={6}><Card><Statistic title="当前省份" value={role?.province || "河南省"} /></Card></Col>
        <Col span={6}><Card><Statistic title="审批总开关" value={role?.approvalEnabled ? "开启" : "关闭"} /></Card></Col>
        <Col span={6}><Card><Statistic title="已启用业务" value={role?.approvalModules?.length || 0} suffix="项" /></Card></Col>
        <Col span={6}><Card><Statistic title="菜单策略" value={role?.approvalEnabled ? "显示审批管理" : "隐藏审批管理"} /></Card></Col>
      </Row>
      <Card className="table-card" title="审批开关">
        <Alert className="table-alert" type="info" showIcon message="同一平台按省份控制审批能力" description="河南默认关闭审批，减少对原系统操作习惯的影响；江西开启审批后，报告卡、接口入库、数据共享、年报发布和高风险操作会进入审批管理。" />
        <Form form={form} layout="vertical" initialValues={{ province: role?.province || "河南省", approvalEnabled: Boolean(role?.approvalEnabled), level: isJiangxi ? "机构-县区-地市-省级" : "不启用" }}>
          <Row gutter={14}>
            <Col span={8}><Form.Item label="省份" name="province"><Select options={[{ value: "河南省" }, { value: "江西省" }]} /></Form.Item></Col>
            <Col span={8}><Form.Item label="审批层级" name="level"><Select options={[{ value: "不启用" }, { value: "县区-地市-省级" }, { value: "机构-县区-地市-省级" }]} /></Form.Item></Col>
            <Col span={8}><Form.Item label="审批总开关" name="approvalEnabled" valuePropName="checked"><Switch checkedChildren="开启" unCheckedChildren="关闭" /></Form.Item></Col>
          </Row>
        </Form>
        <Row gutter={12}>
          {settings.map((item) => (
            <Col span={12} key={item.key}>
              <Card size="small" className="approval-switch-card">
                <Flex justify="space-between" align="center">
                  <div>
                    <Text strong>{item.label}</Text>
                    <br />
                    <Text type="secondary">{item.desc}</Text>
                  </div>
                  <Switch checked={enabledModules.has(item.key)} checkedChildren="开" unCheckedChildren="关" />
                </Flex>
              </Card>
            </Col>
          ))}
        </Row>
        <Space className="drawer-action-row">
          <Button onClick={() => form.resetFields()}>重置</Button>
          <Button type="primary" onClick={() => message.success(`${role?.province || "当前省份"}审批参数已保存，菜单和业务流程将在重新登录后生效`)}>保存参数</Button>
        </Space>
      </Card>
      <Card className="table-card" title="省份审批策略对比">
        <Table
          pagination={false}
          columns={[
            { title: "省份", dataIndex: "province", width: 100 },
            { title: "审批总开关", dataIndex: "approval", width: 110, render: statusTag },
            { title: "业务路径", dataIndex: "path", width: 360 },
            { title: "菜单显示", dataIndex: "visibleMenu", width: 150 },
            { title: "状态", dataIndex: "status", width: 100, render: statusTag }
          ]}
          dataSource={rows}
        />
      </Card>
    </div>
  );
}

function SystemEditForm({ form, row, type }) {
  const isUser = type === "system_01";
  return (
    <Form form={form} layout="vertical" initialValues={row}>
      <Row gutter={12}>
        {isUser ? <>
          <Col span={8}><Form.Item name="username" label="用户名" rules={[{ required: true, message: "请输入用户名" }]}><Input /></Form.Item></Col>
          <Col span={8}><Form.Item name="name" label="姓名" rules={[{ required: true, message: "请输入姓名" }]}><Input /></Form.Item></Col>
          <Col span={8}><Form.Item name="sex" label="性别"><Select options={[{ value: "男" }, { value: "女" }]} /></Form.Item></Col>
          <Col span={8}><Form.Item name="region" label="行政区划" rules={[{ required: true, message: "请选择行政区划" }]}><Select options={[{ value: "河南省" }, { value: "郑州市" }, { value: "郑州市金水区" }]} /></Form.Item></Col>
          <Col span={8}><Form.Item name="org" label="机构" rules={[{ required: true, message: "请选择机构" }]}><Select options={[{ value: "河南省肿瘤登记中心" }, { value: "郑州市肿瘤登记办公室" }, { value: "金水区疾控中心" }, { value: "河南省人民医院" }]} /></Form.Item></Col>
          <Col span={8}><Form.Item name="department" label="部门"><Input /></Form.Item></Col>
          <Col span={8}><Form.Item name="phone" label="联系电话"><Input /></Form.Item></Col>
          <Col span={8}><Form.Item name="email" label="电子邮箱"><Input /></Form.Item></Col>
          <Col span={8}><Form.Item name="role" label="角色权限"><Select options={systemRoleRows.map((role) => ({ value: role.name }))} /></Form.Item></Col>
          <Col span={8}><Form.Item name="status" label="状态"><Select options={[{ value: "启用" }, { value: "停用" }]} /></Form.Item></Col>
          <Col span={16}><Form.Item name="address" label="详细地址"><Input /></Form.Item></Col>
        </> : <>
          <Col span={8}><Form.Item name="code" label="编码" rules={[{ required: true, message: "请输入编码" }]}><Input /></Form.Item></Col>
          <Col span={8}><Form.Item name="mark" label="标识" rules={[{ required: true, message: "请输入标识" }]}><Input /></Form.Item></Col>
          <Col span={8}><Form.Item name="name" label="名称" rules={[{ required: true, message: "请输入名称" }]}><Input /></Form.Item></Col>
          <Col span={8}><Form.Item name="sort" label="排序"><InputNumber min={1} style={{ width: "100%" }} /></Form.Item></Col>
          <Col span={8}><Form.Item name="permissionUrl" label="权限地址"><Input /></Form.Item></Col>
          <Col span={8}><Form.Item name="status" label="状态"><Select options={[{ value: "启用" }, { value: "停用" }]} /></Form.Item></Col>
          <Col span={24}><Form.Item name="description" label="描述说明"><Input.TextArea rows={3} /></Form.Item></Col>
        </>}
      </Row>
    </Form>
  );
}

function systemDescription(id) {
  if (id === "system_01") return "河南手册用户管理支持行政区划和检索内容筛选，添加用户包含用户名、密码、姓名、性别、行政区划、机构、部门、联系电话、邮箱、状态、详细地址和备注；行政区划与机构二级联动。";
  if (id === "system_02") return "角色管理支持添加、修改、删除和授权；授权页面展示系统所有操作权限，通过勾选设置角色权限内容。";
  if (id === "system_03") return "在线用户按行政区划等级展示当前登录用户，管理员可执行强制下线并写入系统操作日志。";
  return "数据备份用于管理备份任务和备份文件；恢复属于高风险操作，需要审批和审计。";
}

function DataInterfaceWorkbench({ feature }) {
  const [form] = Form.useForm();
  const [uploadForm] = Form.useForm();
  const [query, setQuery] = useState({});
  const [uploadOpen, setUploadOpen] = useState(false);
  const [detailRow, setDetailRow] = useState(null);
  const [editRow, setEditRow] = useState(null);
  const id = feature?.id;
  const name = feature?.name || "";
  const isIntro = id === "exchange_01";
  const isDeathInfo = id === "exchange_06";
  const isHis = id === "exchange_03";
  const isCause = id === "exchange_04";
  const isAssist = id === "exchange_05";
  const isNational = id === "exchange_07";
  const isExternal = id === "exchange_08";
  const rows = isDeathInfo
    ? deathCauseInfoRows
    : isNational
      ? nationalReportRows
      : isExternal
        ? externalAccessRows
    : dataInterfaceRows.filter((row) => {
      if (isHis) return row.type.includes("HIS");
      if (isCause) return row.type.includes("CAUS");
      if (isAssist) return row.type.includes("XIE");
      return true;
    });
  const total = rows.reduce((sum, row) => sum + (row.total || 1), 0);
  const errors = rows.reduce((sum, row) => sum + (row.error || 0), 0);
  const imported = rows.filter((row) => ["已入库", "部分入库"].includes(row.updateStatus)).length;

  const uploadColumns = [
    { title: "批次号", dataIndex: "batch", width: 170 },
    { title: "文件名", dataIndex: "fileName", width: 260 },
    { title: "导入类型", dataIndex: "type", width: 130 },
    { title: "行政区划", dataIndex: "region", width: 130 },
    { title: "来源机构", dataIndex: "source", width: 180 },
    { title: "总数", dataIndex: "total", width: 80 },
    { title: "通过", dataIndex: "pass", width: 80 },
    { title: "错误", dataIndex: "error", width: 80 },
    { title: "重卡", dataIndex: "duplicate", width: 80 },
    { title: "校验状态", dataIndex: "status", width: 110, render: statusTag },
    { title: "入库状态", dataIndex: "updateStatus", width: 110, render: statusTag },
    {
      title: "操作",
      width: 230,
      fixed: "right",
      render: (_, row) => (
        <Space size={2}>
          <Button type="link" onClick={() => setDetailRow(row)}>日志</Button>
          <Button type="link" onClick={() => setEditRow(row)}>逐条处理</Button>
          <Button type="link" onClick={() => message.success(`${row.batch} 错误信息已随数据导出`)}>错误导出</Button>
          <Button type="link" onClick={() => message.success(`${row.batch} 已重新提交校验`)}>重传</Button>
        </Space>
      )
    }
  ];
  const deathColumns = [
    { title: "登记编号", dataIndex: "no", width: 150 },
    { title: "死因编号", dataIndex: "causeNo", width: 160 },
    { title: "姓名", dataIndex: "name", width: 90 },
    { title: "性别", dataIndex: "sex", width: 70 },
    { title: "行政区划", dataIndex: "region", width: 140 },
    { title: "死亡日期", dataIndex: "deathDate", width: 120 },
    { title: "根本死因", dataIndex: "rootCause", width: 140 },
    { title: "死因编码", dataIndex: "causeCode", width: 100 },
    { title: "更新状态", dataIndex: "updateStatus", width: 120, render: statusTag },
    { title: "匹配结果", dataIndex: "matchResult", width: 180 },
    {
      title: "操作",
      width: 170,
      fixed: "right",
      render: (_, row) => (
        <Space size={2}>
          <Button type="link" onClick={() => setDetailRow(row)}>详情</Button>
          <Button type="link" disabled={row.updateStatus === "未匹配"} onClick={() => setEditRow(row)}>漏单补录</Button>
        </Space>
      )
    }
  ];
  const nationalColumns = [
    { title: "上报批次", dataIndex: "batch", width: 180 },
    { title: "年度", dataIndex: "year", width: 80 },
    { title: "行政区划", dataIndex: "region", width: 130 },
    { title: "数据包类型", dataIndex: "packageType", width: 170 },
    { title: "卡片数", dataIndex: "cards", width: 90 },
    { title: "通过", dataIndex: "pass", width: 90 },
    { title: "错误", dataIndex: "error", width: 90 },
    { title: "上报状态", dataIndex: "status", width: 110, render: statusTag },
    { title: "回流状态", dataIndex: "feedback", width: 110, render: statusTag },
    { title: "更新时间", dataIndex: "updateTime", width: 150 },
    {
      title: "操作",
      width: 260,
      fixed: "right",
      render: (_, row) => (
        <Space size={2}>
          <Button type="link" onClick={() => setDetailRow(row)}>详情</Button>
          <Button type="link" onClick={() => message.success(`${row.batch} 介质文件已生成，包含校验摘要和错误清单`)}>下载介质</Button>
          <Button type="link" disabled={row.status !== "上报失败"} onClick={() => message.success(`${row.batch} 已重新生成并提交重传队列`)}>失败重传</Button>
          <Button type="link" onClick={() => message.success(`${row.batch} 回流数据已进入临时库校验`)}>导入回流</Button>
        </Space>
      )
    }
  ];
  const externalColumns = [
    { title: "接入批次", dataIndex: "batch", width: 180 },
    { title: "来源类型", dataIndex: "sourceType", width: 110 },
    { title: "来源系统", dataIndex: "source", width: 230 },
    { title: "行政区划", dataIndex: "region", width: 120 },
    { title: "字段映射", dataIndex: "mapping", width: 110, render: statusTag },
    { title: "总数", dataIndex: "total", width: 80 },
    { title: "匹配数", dataIndex: "matched", width: 90 },
    { title: "错误数", dataIndex: "error", width: 90 },
    { title: "处理状态", dataIndex: "status", width: 120, render: statusTag },
    { title: "库状态", dataIndex: "tempStatus", width: 100, render: statusTag },
    {
      title: "操作",
      width: 250,
      fixed: "right",
      render: (_, row) => (
        <Space size={2}>
          <Button type="link" onClick={() => setDetailRow(row)}>详情</Button>
          <Button type="link" onClick={() => setEditRow(row)}>字段映射</Button>
          <Button type="link" onClick={() => message.success(`${row.batch} 已重新执行身份匹配和肿瘤编码校验`)}>重新匹配</Button>
          <Button type="link" disabled={row.status === "字段待映射"} onClick={() => message.success(`${row.batch} 已提交接口入库审核`)}>提交入库</Button>
        </Space>
      )
    }
  ];

  function runQuery() {
    setQuery(form.getFieldsValue());
    message.success(`${name}查询完成`);
  }

  function confirmUpload() {
    uploadForm.validateFields().then((values) => {
      setUploadOpen(false);
      message.success(`${values.importType} 文件已上传临时库，正在执行格式、必填、字典和逻辑校验`);
    }).catch(() => message.error("请选择导入类型、行政区划和上传文件"));
  }

  if (isIntro) {
    return (
      <div className="data-interface-page">
        <Row gutter={16} className="plan-stat-row">
          <Col span={6}><Card><Statistic title="模板类型" value={4} suffix="类" /></Card></Col>
          <Col span={6}><Card><Statistic title="ImportType" value="HIS/CAUS/XIE" /></Card></Col>
          <Col span={6}><Card><Statistic title="支持格式" value="xls/xlsx/csv" /></Card></Col>
          <Col span={6}><Card><Statistic title="当前版本" value="V3.0" /></Card></Col>
        </Row>
        <Row gutter={16} className="interface-guide-row">
          <Col span={8}><Card title="必填说明" className="interface-guide-card"><Text>空值会进入错误记录；身份证、姓名、性别、出生日期、行政区划、诊断日期、ICD 编码等核心字段按报告卡同等规则校验。</Text></Card></Col>
          <Col span={8}><Card title="上传说明" className="interface-guide-card"><Text>河南手册要求先添加文件并上传到临时表，校验通过后批量导入；错误记录可导出线下修正后重新上传。</Text></Card></Col>
          <Col span={8}><Card title="接口说明" className="interface-guide-card"><Text>ImportType 分为 HIS-肿瘤登记、CAUS-死因登记、XIE-信息协查登记；为空时默认 HIS。</Text></Card></Col>
        </Row>
        <Card className="table-card" title="模板下载">
          <Table
            columns={[
              { title: "模板名称", dataIndex: "name", width: 220 },
              { title: "格式", dataIndex: "formats", width: 150 },
              { title: "导入类型", dataIndex: "importType", width: 110 },
              { title: "字段数", dataIndex: "fields", width: 90 },
              { title: "更新日期", dataIndex: "updateDate", width: 120 },
              { title: "状态", dataIndex: "status", width: 90, render: statusTag },
              { title: "操作", width: 150, render: (_, row) => <Button type="link" onClick={() => message.success(`${row.name}压缩包已开始下载`)}>下载模板</Button> }
            ]}
            dataSource={interfaceTemplateRows}
            pagination={false}
          />
        </Card>
      </div>
    );
  }

  return (
    <div className="data-interface-page">
      <Row gutter={16} className="plan-stat-row">
        <Col span={6}><Card><Statistic title={isDeathInfo ? "死因记录" : isNational ? "上报批次" : isExternal ? "接入批次" : "上传批次"} value={rows.length} suffix={isDeathInfo ? "条" : "批"}/></Card></Col>
        <Col span={6}><Card><Statistic title={isDeathInfo ? "待补录" : isNational ? "上报卡片" : isExternal ? "接入记录" : "临时库记录"} value={isDeathInfo ? rows.filter((row) => row.updateStatus.includes("待")).length : isNational ? rows.reduce((sum, row) => sum + row.cards, 0) : total} suffix="条" /></Card></Col>
        <Col span={6}><Card><Statistic title={isDeathInfo ? "未匹配" : isNational ? "错误记录" : isExternal ? "匹配成功" : "错误记录"} value={isDeathInfo ? rows.filter((row) => row.updateStatus === "未匹配").length : isExternal ? rows.reduce((sum, row) => sum + row.matched, 0) : errors} suffix="条" /></Card></Col>
        <Col span={6}><Card><Statistic title={isDeathInfo ? "导出权限" : isNational ? "已回流" : isExternal ? "待审核" : "已入库批次"} value={isDeathInfo ? "Excel" : isNational ? rows.filter((row) => row.feedback === "已导入").length : isExternal ? rows.filter((row) => row.status.includes("审核")).length : imported} suffix={isDeathInfo ? "" : isNational ? "批" : isExternal ? "批" : "批"} /></Card></Col>
      </Row>
      <Card className="search-card maintenance-search">
        <Form key={id} form={form} layout="inline" initialValues={{ region: "全部区划", duplicate: "全部", uploadType: isHis ? "HIS" : isCause ? "CAUS" : isAssist ? "XIE" : isNational ? "国家平台" : isExternal ? "外部接入" : "全部类型", dateType: isDeathInfo ? "死亡日期" : isNational ? "生成日期" : "上传日期", updateStatus: "全部状态" }}>
          <Form.Item name="region"><Select className="filter-select" options={[{ value: "全部区划" }, { value: "河南省" }, { value: "郑州市" }, { value: "金水区" }, { value: "许昌市" }]} /></Form.Item>
          {isDeathInfo ? (
            <>
              <Form.Item name="updateStatus"><Select className="filter-select" options={[{ value: "全部状态" }, { value: "待漏单补录" }, { value: "待核实" }, { value: "未匹配" }]} /></Form.Item>
              <Form.Item name="deathType"><Select className="filter-select" options={[{ value: "全部死因" }, { value: "省级死因回流" }, { value: "县区死因导入" }, { value: "国家平台回流" }]} /></Form.Item>
            </>
          ) : isNational ? (
            <>
              <Form.Item name="year"><Select className="filter-select" options={[{ value: "2025" }, { value: "2024" }, { value: "2023" }]} /></Form.Item>
              <Form.Item name="packageType"><Select className="filter-select" options={[{ value: "全部数据包" }, { value: "登记卡" }, { value: "随访" }, { value: "人口" }]} /></Form.Item>
              <Form.Item name="updateStatus"><Select className="filter-select" options={[{ value: "全部状态" }, { value: "待上报" }, { value: "上报失败" }, { value: "已回流" }]} /></Form.Item>
            </>
          ) : isExternal ? (
            <>
              <Form.Item name="sourceType"><Select className="filter-select" options={[{ value: "全部来源" }, { value: "HIS" }, { value: "LIS" }, { value: "PACS" }, { value: "癌症筛查" }, { value: "慢病监测" }]} /></Form.Item>
              <Form.Item name="mapping"><Select className="filter-select" options={[{ value: "全部映射" }, { value: "已完成" }, { value: "待补充" }]} /></Form.Item>
              <Form.Item name="updateStatus"><Select className="filter-select" options={[{ value: "全部状态" }, { value: "待入库审核" }, { value: "字段待映射" }, { value: "可入库" }]} /></Form.Item>
            </>
          ) : (
            <>
              <Form.Item name="duplicate"><Select className="filter-select" options={[{ value: "全部" }, { value: "未查重" }, { value: "疑似重卡" }, { value: "已处理" }]} /></Form.Item>
              <Form.Item name="uploadType"><Select className="filter-select" options={[{ value: "全部类型" }, { value: "HIS" }, { value: "CAUS" }, { value: "XIE" }]} /></Form.Item>
            </>
          )}
          <Form.Item name="dateType"><Select className="filter-select" options={[{ value: isDeathInfo ? "死亡日期" : isNational ? "生成日期" : "上传日期" }, { value: isDeathInfo ? "更新日期" : isNational ? "回流日期" : "入库日期" }]} /></Form.Item>
          <Form.Item name="dateRange"><Input className="date-range-input" placeholder="2026-06-01 至 2026-06-10" /></Form.Item>
          <Form.Item name="keyword"><Input prefix={<SearchOutlined />} className="keyword-input" placeholder={isDeathInfo ? "登记编号/姓名/死因编号" : isNational ? "上报批次/区划" : isExternal ? "接入批次/来源系统" : "批次号/来源机构/文件名"} /></Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" icon={<SearchOutlined />} onClick={runQuery}>查询</Button>
              <Button onClick={() => { form.resetFields(); setQuery({}); }}>重置</Button>
              {isDeathInfo ? <Button onClick={() => message.success("当前死因信息已按筛选条件导出 Excel")}>导出 Excel</Button> : isNational ? <>
                <Button onClick={() => message.success("已按当前年度和区划生成国家平台上报数据包")}>生成数据包</Button>
                <Button onClick={() => message.success("已导出国家平台上报错误清单")}>错误导出</Button>
              </> : isExternal ? <>
                <Button icon={<UploadOutlined />} onClick={() => setUploadOpen(true)}>接入批次</Button>
                <Button onClick={() => message.success("已对可入库记录提交接口入库审核")}>提交审核</Button>
                <Button onClick={() => message.success("外部接入错误记录已导出")}>错误导出</Button>
              </> : <>
                <Button icon={<UploadOutlined />} onClick={() => setUploadOpen(true)}>添加文件</Button>
                <Button onClick={() => message.success("已对校验通过记录执行批量导入，错误记录保留在临时库")}>批量导入</Button>
                <Button danger onClick={() => message.warning("仅删除临时库选中记录，正式库数据不受影响")}>删除</Button>
              </>}
            </Space>
          </Form.Item>
        </Form>
      </Card>
      <Card className="table-card">
        <Alert className="table-alert" type="info" showIcon message={isDeathInfo ? "死因信息管理" : isNational ? "国家平台上报" : isExternal ? "外部平台数据接入" : "河南 V3.0 两步上传流程"} description={isDeathInfo ? "按行政区划、更新状态、死因类型、日期类型和检索内容筛选；已匹配发病记录但未更新死亡状态的数据可漏单补录。" : isNational ? "按年度和区划生成上报数据包，先完成格式、必填、逻辑和重卡校验，再跟踪上报、重传和回流导入。" : isExternal ? "医保、LIS、PACS、筛查和慢病等外部来源先进入临时库，完成字段映射、身份匹配和权限校验后再提交入库审核。" : "第一步添加文件并上传到临时表；第二步对校验通过数据批量导入，错误数据导出修正或逐条处理。"} />
        <Table columns={isDeathInfo ? deathColumns : isNational ? nationalColumns : isExternal ? externalColumns : uploadColumns} dataSource={rows} pagination={false} scroll={{ x: isDeathInfo ? 1350 : isNational ? 1600 : isExternal ? 1650 : 1750 }} />
      </Card>
      <Drawer title={isDeathInfo ? "死因信息详情" : isNational ? "国家平台上报详情" : isExternal ? "外部接入详情" : "上传校验日志"} open={Boolean(detailRow)} onClose={() => setDetailRow(null)} width={760}>
        {detailRow && <>
          <Descriptions bordered column={1} size="small">
            {Object.entries(detailRow).filter(([key]) => key !== "key").map(([key, value]) => <Descriptions.Item key={key} label={interfaceLabel(key)}>{String(value)}</Descriptions.Item>)}
          </Descriptions>
          {!isDeathInfo && <Timeline className="interface-log" items={
            isNational
              ? [
                { color: "blue", children: "生成数据包：按国家平台字段模板抽取登记卡、随访和人口数据" },
                { color: detailRow.error ? "red" : "green", children: `上报前校验：通过 ${detailRow.pass} 条，错误 ${detailRow.error} 条` },
                { color: detailRow.feedback === "已导入" ? "green" : "gray", children: `回流状态：${detailRow.feedback}` }
              ]
              : isExternal
                ? [
                  { color: "blue", children: `接入来源：${detailRow.sourceType} 数据先进入临时库` },
                  { color: detailRow.mapping === "已完成" ? "green" : "orange", children: `字段映射：${detailRow.mapping}` },
                  { color: detailRow.error ? "red" : "green", children: `身份匹配：匹配 ${detailRow.matched} 条，错误 ${detailRow.error} 条` }
                ]
                : [
                  { color: "blue", children: "添加文件：读取文件头和 ImportType" },
                  { color: detailRow.error ? "red" : "green", children: `校验结果：通过 ${detailRow.pass} 条，错误 ${detailRow.error} 条，疑似重卡 ${detailRow.duplicate} 条` },
                  { color: detailRow.updateStatus?.includes("入库") ? "green" : "gray", children: `入库状态：${detailRow.updateStatus}` }
                ]
          } />}
        </>}
      </Drawer>
      <Drawer title={isDeathInfo ? "漏单补录" : isExternal ? "外部来源字段映射" : `${name}逐条处理`} open={Boolean(editRow)} onClose={() => setEditRow(null)} width={980}>
        {editRow && <DataInterfaceEditForm row={editRow} isAssist={isAssist} isDeathInfo={isDeathInfo} isExternal={isExternal} onClose={() => setEditRow(null)} />}
      </Drawer>
      <Modal title={`${name} - 添加文件`} open={uploadOpen} onCancel={() => setUploadOpen(false)} onOk={confirmUpload} okText="上传文件" cancelText="取消" width={760} destroyOnHidden>
        <Form form={uploadForm} layout="vertical" initialValues={{ importType: isExternal ? "LIS" : isCause ? "CAUS-死因登记" : isAssist ? "XIE-信息协查" : "HIS-肿瘤登记", region: "河南省" }}>
          <Alert type="info" showIcon message={isExternal ? "外部来源先接入临时库" : "选择文件后先导入临时表"} description={isExternal ? "接入后需完成字段映射、身份匹配、肿瘤编码校验和权限范围校验，再提交入库审核。" : "系统会执行文件格式、ImportType、必填项、字典项、逻辑关系和重卡状态校验。"} className="compact-alert" />
          <Row gutter={12}>
            <Col span={8}><Form.Item name="importType" label={isExternal ? "来源类型" : "导入类型"} rules={[{ required: true, message: "请选择导入类型" }]}><Select options={isExternal ? [{ value: "HIS" }, { value: "LIS" }, { value: "PACS" }, { value: "癌症筛查" }, { value: "慢病监测" }] : [{ value: "HIS-肿瘤登记" }, { value: "CAUS-死因登记" }, { value: "XIE-信息协查" }]} /></Form.Item></Col>
            <Col span={8}><Form.Item name="region" label="行政区划" rules={[{ required: true, message: "请选择行政区划" }]}><Select options={[{ value: "河南省" }, { value: "郑州市金水区" }, { value: "郑州市二七区" }, { value: "许昌市魏都区" }]} /></Form.Item></Col>
            <Col span={8}><Form.Item name="file" label="上传文件" rules={[{ required: true, message: "请选择文件" }]}><Input placeholder="请选择 xls / xlsx / csv 文件" /></Form.Item></Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
}

function DataInterfaceEditForm({ row, isAssist, isDeathInfo, isExternal, onClose }) {
  const [form] = Form.useForm();
  function submit(type) {
    form.validateFields().then(() => {
      const text = isDeathInfo ? "死因漏单补录已提交，死亡状态将同步到发病记录" : isExternal ? "字段映射已保存，系统将重新执行身份匹配和编码校验" : isAssist && type === "temp" ? "信息协查已暂存到临时库" : "单条数据已通过逻辑校验并提交入库";
      message.success(text);
      onClose();
    }).catch(() => message.error("请补全必填字段并检查日期、编码和地址逻辑"));
  }
  if (isExternal) {
    return (
      <Form form={form} layout="vertical" initialValues={{
        sourceType: row.sourceType,
        source: row.source,
        patientId: "身份证号",
        diagnosisDate: "诊断日期",
        diagnosisCode: "ICD-10编码",
        pathologyCode: "病理形态学编码"
      }}>
        <Alert className="compact-alert" type="warning" showIcon message="字段映射用于外部来源入库前校验" description="保存后不会直接进入正式库，系统会重新执行身份匹配、字典映射、日期逻辑和肿瘤编码校验；可入库记录再提交接口入库审核。" />
        <Row gutter={12}>
          <Col span={8}><Form.Item name="sourceType" label="来源类型"><Input disabled /></Form.Item></Col>
          <Col span={16}><Form.Item name="source" label="来源系统"><Input disabled /></Form.Item></Col>
          <Col span={8}><Form.Item name="patientId" label="身份标识字段" rules={[{ required: true, message: "请选择身份标识字段" }]}><Select options={[{ value: "身份证号" }, { value: "门诊号" }, { value: "住院号" }, { value: "健康档案号" }]} /></Form.Item></Col>
          <Col span={8}><Form.Item name="diagnosisDate" label="诊断日期字段" rules={[{ required: true, message: "请选择诊断日期字段" }]}><Select options={[{ value: "诊断日期" }, { value: "检查日期" }, { value: "报告日期" }]} /></Form.Item></Col>
          <Col span={8}><Form.Item name="diagnosisCode" label="诊断编码字段" rules={[{ required: true, message: "请选择诊断编码字段" }]}><Select options={[{ value: "ICD-10编码" }, { value: "疾病诊断编码" }, { value: "检查提示编码" }]} /></Form.Item></Col>
          <Col span={8}><Form.Item name="pathologyCode" label="病理编码字段"><Select options={[{ value: "病理形态学编码" }, { value: "病理诊断文本" }, { value: "无" }]} /></Form.Item></Col>
          <Col span={16}><Form.Item name="remark" label="映射说明"><Input placeholder="说明未映射字段或需人工核实的字段" /></Form.Item></Col>
        </Row>
        <div className="drawer-action-row"><Space><Button onClick={onClose}>取消</Button><Button type="primary" onClick={() => submit("mapping")}>保存映射</Button></Space></div>
      </Form>
    );
  }
  return (
    <Form form={form} layout="vertical" initialValues={{
      name: row.name || "张秀兰",
      idCard: row.idCard || "410105196303124826",
      diagnosis: row.rootCause || "C50.9 乳腺恶性肿瘤",
      deathDate: row.deathDate,
      causeCode: row.causeCode,
      region: row.region
    }}>
      <Alert className="compact-alert" type="warning" showIcon message={isDeathInfo ? "补录后将更新发病记录死亡状态" : "逐条处理复用报告卡登记逻辑"} description={isAssist ? "信息协查提交分为暂存提交和入库提交，暂存不进入正式库。" : "保存前执行报告卡同等必填、编码、日期和地址校验。"} />
      <Row gutter={12}>
        <Col span={8}><Form.Item name="name" label="姓名" rules={[{ required: true, message: "请输入姓名" }]}><Input /></Form.Item></Col>
        <Col span={8}><Form.Item name="idCard" label="身份证号" rules={[{ required: true, message: "请输入身份证号" }]}><Input /></Form.Item></Col>
        <Col span={8}><Form.Item name="region" label="行政区划" rules={[{ required: true, message: "请选择行政区划" }]}><Select options={[{ value: "河南省" }, { value: "郑州市金水区" }, { value: "郑州市二七区" }, { value: "许昌市魏都区" }]} /></Form.Item></Col>
        <Col span={12}><Form.Item name="diagnosis" label={isDeathInfo ? "根本死因" : "诊断信息"} rules={[{ required: true, message: "请输入诊断信息" }]}><Input /></Form.Item></Col>
        <Col span={6}><Form.Item name="diagnosisDate" label="诊断日期"><Input placeholder="2026-06-01" /></Form.Item></Col>
        <Col span={6}><Form.Item name="deathDate" label="死亡日期"><Input placeholder="死亡记录必填" /></Form.Item></Col>
        <Col span={8}><Form.Item name="causeCode" label="ICD-10/死因编码"><Input placeholder="C34.9" /></Form.Item></Col>
        <Col span={16}><Form.Item name="address" label="现住地址" rules={[{ required: true, message: "请输入现住地址" }]}><Input placeholder="需精确到乡镇街道/社区配置要求" /></Form.Item></Col>
      </Row>
      <div className="drawer-action-row">
        <Space>
          {isAssist && <Button onClick={() => submit("temp")}>暂存提交</Button>}
          <Button type="primary" onClick={() => submit("final")}>{isDeathInfo ? "提交补录" : "入库提交"}</Button>
        </Space>
      </div>
    </Form>
  );
}

function interfaceLabel(key) {
  const labels = {
    batch: "批次号",
    fileName: "文件名",
    type: "导入类型",
    region: "行政区划",
    source: "来源机构",
    uploadDate: "上传日期",
    total: "总数",
    pass: "通过数",
    error: "错误数",
    duplicate: "重卡数",
    status: "校验状态",
    updateStatus: "更新状态",
    operator: "操作人",
    issue: "错误提示",
    no: "登记编号",
    causeNo: "死因编号",
    name: "姓名",
    sex: "性别",
    deathDate: "死亡日期",
    rootCause: "根本死因",
    causeCode: "死因编码",
    deathType: "死因类型",
    matchResult: "匹配结果",
    reportOrg: "报告机构",
    year: "年度",
    packageType: "数据包类型",
    cards: "卡片数",
    feedback: "回流状态",
    updateTime: "更新时间",
    sourceType: "来源类型",
    mapping: "字段映射",
    matched: "匹配数",
    tempStatus: "库状态"
  };
  return labels[key] || key;
}

function ConsultPublishPage({ role }) {
  const [form] = Form.useForm();
  function submit(status) {
    form.validateFields().then(() => {
      message.success(status === "草稿" ? "资讯已保存为草稿，可在咨询维护中继续编辑" : "资讯已发布，本级及下级授权用户可查看");
    }).catch(() => message.error("请补全标题、类别、作者、来源和正文内容"));
  }
  return (
    <div className="consult-page">
      <Row gutter={16} className="plan-stat-row">
        <Col span={6}><Card><Statistic title="发布范围" value="本级及下级" /></Card></Col>
        <Col span={6}><Card><Statistic title="启用类别" value={3} suffix="类" /></Card></Col>
        <Col span={6}><Card><Statistic title="支持附件" value="图片/文件" /></Card></Col>
        <Col span={6}><Card><Statistic title="当前作者" value={role?.name || "当前用户"} /></Card></Col>
      </Row>
      <Card className="table-card consult-editor-card" title="发布资讯">
        <Alert className="compact-alert" type="info" showIcon message="河南辅助功能：发布资讯" description="填写标题、副标题、内容、类别、作者、来源和状态；内容支持图片、文件附件和文字编排，发布后按类别展示在对应栏目。" />
        <Form form={form} layout="vertical" initialValues={{ author: role?.name, source: "河南省肿瘤登记中心", status: "待发布", scope: "本级及下级用户可见" }}>
          <Row gutter={14}>
            <Col span={12}><Form.Item name="title" label="标题" rules={[{ required: true, message: "请输入标题" }]}><Input placeholder="请输入资讯标题" /></Form.Item></Col>
            <Col span={12}><Form.Item name="subtitle" label="副标题"><Input placeholder="请输入副标题" /></Form.Item></Col>
            <Col span={6}><Form.Item name="category" label="类别" rules={[{ required: true, message: "请选择类别" }]}><Select options={consultCategoryRows.filter((item) => item.status === "启用").map((item) => ({ value: item.name }))} /></Form.Item></Col>
            <Col span={6}><Form.Item name="author" label="作者" rules={[{ required: true, message: "请输入作者" }]}><Input /></Form.Item></Col>
            <Col span={6}><Form.Item name="source" label="来源" rules={[{ required: true, message: "请输入来源" }]}><Input /></Form.Item></Col>
            <Col span={6}><Form.Item name="status" label="状态"><Select options={[{ value: "待发布" }, { value: "草稿" }, { value: "已发布" }]} /></Form.Item></Col>
            <Col span={8}><Form.Item name="scope" label="查看权限"><Input disabled /></Form.Item></Col>
            <Col span={8}><Form.Item name="top" label="是否置顶"><Select options={[{ value: "否" }, { value: "是" }]} /></Form.Item></Col>
            <Col span={8}><Form.Item name="attachment" label="附件"><Input placeholder="上传图片/文件附件" /></Form.Item></Col>
            <Col span={24}><Form.Item name="content" label="内容" rules={[{ required: true, message: "请输入资讯内容" }]}><Input.TextArea rows={8} placeholder="请输入正文内容，可描述通知要求、培训资料说明或政策文件摘要" /></Form.Item></Col>
          </Row>
          <div className="drawer-action-row">
            <Space>
              <Button onClick={() => form.resetFields()}>重置</Button>
              <Button onClick={() => submit("草稿")}>保存草稿</Button>
              <Button type="primary" onClick={() => submit("发布")}>发布</Button>
            </Space>
          </div>
        </Form>
      </Card>
    </div>
  );
}

function ConsultMaintenancePage({ role }) {
  const [form] = Form.useForm();
  const [detailRow, setDetailRow] = useState(null);
  const [editRow, setEditRow] = useState(null);
  const columns = [
    { title: "标题", dataIndex: "title", width: 260, render: (value, row) => <Button type="link" className="link-cell" onClick={() => setDetailRow(row)}>{value}</Button> },
    { title: "类别", dataIndex: "category", width: 110 },
    { title: "作者", dataIndex: "author", width: 100 },
    { title: "来源", dataIndex: "source", width: 160 },
    { title: "状态", dataIndex: "status", width: 100, render: statusTag },
    { title: "置顶", dataIndex: "top", width: 80 },
    { title: "发布日期", dataIndex: "publishDate", width: 120 },
    { title: "浏览量", dataIndex: "views", width: 90 },
    { title: "操作", width: 190, fixed: "right", render: (_, row) => <Space size={2}><Button type="link" onClick={() => setEditRow(row)}>编辑</Button><Button type="link" onClick={() => message.success(`${row.title} 已${row.top === "是" ? "取消置顶" : "置顶"}`)}>{row.top === "是" ? "取消置顶" : "置顶"}</Button><Button type="link" danger onClick={() => message.warning("资讯已删除，操作已写入审计日志")}>删除</Button></Space> }
  ];
  return (
    <div className="consult-page">
      <Row gutter={16} className="plan-stat-row">
        <Col span={6}><Card><Statistic title="资讯总数" value={consultRows.length} suffix="条" /></Card></Col>
        <Col span={6}><Card><Statistic title="已发布" value={consultRows.filter((item) => item.status === "已发布").length} suffix="条" /></Card></Col>
        <Col span={6}><Card><Statistic title="草稿" value={consultRows.filter((item) => item.status === "草稿").length} suffix="条" /></Card></Col>
        <Col span={6}><Card><Statistic title="首页置顶" value={consultRows.filter((item) => item.top === "是").length} suffix="条" /></Card></Col>
      </Row>
      <Card className="search-card maintenance-search">
        <Form form={form} layout="inline" initialValues={{ category: "全部类别", status: "全部状态" }}>
          <Form.Item name="category"><Select className="filter-select" options={[{ value: "全部类别" }, ...consultCategoryRows.map((item) => ({ value: item.name }))]} /></Form.Item>
          <Form.Item name="status"><Select className="filter-select" options={[{ value: "全部状态" }, { value: "已发布" }, { value: "草稿" }, { value: "待发布" }]} /></Form.Item>
          <Form.Item name="keyword"><Input prefix={<SearchOutlined />} className="keyword-input" placeholder="关键字/标题/来源" /></Form.Item>
          <Form.Item><Space><Button type="primary" icon={<SearchOutlined />} onClick={() => message.success("资讯查询完成")}>查询</Button><Button onClick={() => form.resetFields()}>重置</Button><Button onClick={() => setEditRow({ author: role?.name, source: "河南省肿瘤登记中心", status: "草稿" })}>添加资讯</Button></Space></Form.Item>
        </Form>
      </Card>
      <Card className="table-card">
        <Alert className="table-alert" type="info" showIcon message="资讯管理" description="支持关键字查询、标题浏览详情、编辑、删除和添加资讯；编辑时回调原资讯内容。" />
        <Table columns={columns} dataSource={consultRows} pagination={false} scroll={{ x: 1250 }} />
      </Card>
      <Drawer title="资讯详情" open={Boolean(detailRow)} onClose={() => setDetailRow(null)} width={760}>
        {detailRow && <Descriptions bordered column={1} size="small">
          <Descriptions.Item label="标题">{detailRow.title}</Descriptions.Item>
          <Descriptions.Item label="副标题">{detailRow.subtitle}</Descriptions.Item>
          <Descriptions.Item label="类别">{detailRow.category}</Descriptions.Item>
          <Descriptions.Item label="作者/来源">{detailRow.author} / {detailRow.source}</Descriptions.Item>
          <Descriptions.Item label="查看权限">{detailRow.scope}</Descriptions.Item>
          <Descriptions.Item label="内容">{detailRow.content}</Descriptions.Item>
        </Descriptions>}
      </Drawer>
      <ConsultEditDrawer row={editRow} open={Boolean(editRow)} onClose={() => setEditRow(null)} />
    </div>
  );
}

function ConsultEditDrawer({ row, open, onClose }) {
  const [form] = Form.useForm();
  function submit() {
    form.validateFields().then(() => {
      message.success(row?.key ? "资讯内容已更新，版本和审计日志已记录" : "资讯已添加，可在列表中维护发布状态");
      onClose();
    }).catch(() => message.error("请补全标题、类别、作者、来源和内容"));
  }
  return (
    <Drawer title={row?.key ? "编辑资讯" : "添加资讯"} open={open} onClose={onClose} width={860} destroyOnHidden>
      {row && <Form key={row.key || "new-consult"} form={form} layout="vertical" initialValues={row}>
        <Row gutter={12}>
          <Col span={12}><Form.Item name="title" label="标题" rules={[{ required: true, message: "请输入标题" }]}><Input /></Form.Item></Col>
          <Col span={12}><Form.Item name="subtitle" label="副标题"><Input /></Form.Item></Col>
          <Col span={8}><Form.Item name="category" label="类别" rules={[{ required: true, message: "请选择类别" }]}><Select options={consultCategoryRows.filter((item) => item.status === "启用").map((item) => ({ value: item.name }))} /></Form.Item></Col>
          <Col span={8}><Form.Item name="author" label="作者" rules={[{ required: true, message: "请输入作者" }]}><Input /></Form.Item></Col>
          <Col span={8}><Form.Item name="source" label="来源" rules={[{ required: true, message: "请输入来源" }]}><Input /></Form.Item></Col>
          <Col span={8}><Form.Item name="status" label="状态"><Select options={[{ value: "草稿" }, { value: "待发布" }, { value: "已发布" }]} /></Form.Item></Col>
          <Col span={8}><Form.Item name="top" label="是否置顶"><Select options={[{ value: "否" }, { value: "是" }]} /></Form.Item></Col>
          <Col span={8}><Form.Item name="attachment" label="附件"><Input placeholder="图片/文件附件" /></Form.Item></Col>
          <Col span={24}><Form.Item name="content" label="内容" rules={[{ required: true, message: "请输入内容" }]}><Input.TextArea rows={7} /></Form.Item></Col>
        </Row>
        <div className="drawer-action-row"><Space><Button onClick={onClose}>取消</Button><Button type="primary" onClick={submit}>保存</Button></Space></div>
      </Form>}
    </Drawer>
  );
}

function ConsultCategoryPage() {
  const [form] = Form.useForm();
  const [editRow, setEditRow] = useState(null);
  const [categoryForm] = Form.useForm();
  function saveCategory() {
    categoryForm.validateFields().then(() => {
      message.success(editRow?.key ? "类别已更新，首页显示和撤并规则同步生效" : "类别已添加，可用于发布资讯");
      setEditRow(null);
    }).catch(() => message.error("请补全名称、排序、状态和首页显示设置"));
  }
  const columns = [
    { title: "类别名称", dataIndex: "name", width: 160 },
    { title: "排序", dataIndex: "sort", width: 80 },
    { title: "状态", dataIndex: "status", width: 90, render: statusTag },
    { title: "首页显示", dataIndex: "homeShow", width: 100 },
    { title: "撤并状态", dataIndex: "mergeStatus", width: 110, render: statusTag },
    { title: "撤并至", dataIndex: "mergeTo", width: 140 },
    { title: "备注", dataIndex: "remark", width: 280 },
    { title: "操作", width: 140, fixed: "right", render: (_, row) => <Space size={2}><Button type="link" onClick={() => setEditRow(row)}>编辑</Button><Button type="link" danger onClick={() => message.warning(row.mergeStatus === "已撤并" ? "已撤并类别不可重复删除" : "类别已删除，关联资讯需重新归类")}>删除</Button></Space> }
  ];
  return (
    <div className="consult-page">
      <Row gutter={16} className="plan-stat-row">
        <Col span={6}><Card><Statistic title="类别总数" value={consultCategoryRows.length} suffix="类" /></Card></Col>
        <Col span={6}><Card><Statistic title="首页显示" value={consultCategoryRows.filter((item) => item.homeShow === "是").length} suffix="类" /></Card></Col>
        <Col span={6}><Card><Statistic title="启用类别" value={consultCategoryRows.filter((item) => item.status === "启用").length} suffix="类" /></Card></Col>
        <Col span={6}><Card><Statistic title="已撤并" value={consultCategoryRows.filter((item) => item.mergeStatus === "已撤并").length} suffix="类" /></Card></Col>
      </Row>
      <Card className="search-card maintenance-search">
        <Form form={form} layout="inline">
          <Form.Item name="keyword"><Input prefix={<SearchOutlined />} className="keyword-input" placeholder="类别名称/备注" /></Form.Item>
          <Form.Item name="status"><Select className="filter-select" options={[{ value: "全部状态" }, { value: "启用" }, { value: "停用" }]} /></Form.Item>
          <Form.Item><Space><Button type="primary" icon={<SearchOutlined />} onClick={() => message.success("资讯类别查询完成")}>查询</Button><Button onClick={() => form.resetFields()}>重置</Button><Button onClick={() => setEditRow({ status: "启用", homeShow: "否", mergeStatus: "未撤并" })}>添加类别</Button></Space></Form.Item>
        </Form>
      </Card>
      <Card className="table-card">
        <Alert className="table-alert" type="info" showIcon message="资讯类别" description="类别包括名称、排序、状态、首页显示、撤并状态、撤并至和备注；首页显示决定综合首页是否出现该栏目。" />
        <Table columns={columns} dataSource={consultCategoryRows} pagination={false} scroll={{ x: 1200 }} />
      </Card>
      <Modal title={editRow?.key ? "编辑类别" : "添加类别"} open={Boolean(editRow)} onCancel={() => setEditRow(null)} onOk={saveCategory} okText="保存" cancelText="取消" width={760} destroyOnHidden>
        {editRow && <Form key={editRow.key || "new-category"} form={categoryForm} layout="vertical" initialValues={editRow}>
          <Row gutter={12}>
            <Col span={12}><Form.Item name="name" label="名称" rules={[{ required: true, message: "请输入类别名称" }]}><Input /></Form.Item></Col>
            <Col span={12}><Form.Item name="sort" label="排序" rules={[{ required: true, message: "请输入排序" }]}><InputNumber min={1} style={{ width: "100%" }} /></Form.Item></Col>
            <Col span={8}><Form.Item name="status" label="状态" rules={[{ required: true, message: "请选择状态" }]}><Select options={[{ value: "启用" }, { value: "停用" }]} /></Form.Item></Col>
            <Col span={8}><Form.Item name="homeShow" label="首页显示" rules={[{ required: true, message: "请选择首页显示" }]}><Select options={[{ value: "是" }, { value: "否" }]} /></Form.Item></Col>
            <Col span={8}><Form.Item name="mergeStatus" label="撤并状态"><Select options={[{ value: "未撤并" }, { value: "已撤并" }]} /></Form.Item></Col>
            <Col span={12}><Form.Item name="mergeTo" label="撤并至"><Select options={[{ value: "-" }, ...consultCategoryRows.filter((item) => item.name !== editRow.name).map((item) => ({ value: item.name }))]} /></Form.Item></Col>
            <Col span={12}><Form.Item name="remark" label="备注"><Input /></Form.Item></Col>
          </Row>
        </Form>}
      </Modal>
    </div>
  );
}

function AnalyticsWorkbench({ feature, role }) {
  const [form] = Form.useForm();
  const [query, setQuery] = useState({});
  const [detailRow, setDetailRow] = useState(null);
  const id = feature?.id;
  const name = feature?.name || "";
  const isRate = name.includes("率");
  const isDeath = name.includes("死亡");
  const isMonth = id === "analytics_06";
  const isCompleteness = id === "analytics_07";
  const isCross = id === "analytics_08";
  const isMulti = id === "analytics_09";
  const isSurvival = id === "analytics_10";
  const isSite = id === "analytics_05";

  const labelMap = {
    ageGroup: "年龄组",
    lung: "肺",
    breast: "乳腺",
    stomach: "胃",
    liver: "肝",
    colorectal: "结直肠",
    death: "死亡数",
    population: "人口数",
    value: isRate ? `${isDeath ? "死亡率" : "发病率"}/10万` : isDeath ? "死亡数" : "发病数",
    name: isMonth ? "统计对象" : "对象名称",
    jan: "1月",
    feb: "2月",
    mar: "3月",
    apr: "4月",
    may: "5月",
    jun: "6月",
    total: "合计",
    complete: "完整率",
    site: "综合部位",
    incidence: "发病数",
    rate: "发病率/10万",
    deathRate: "死亡率/10万",
    item: "纵向项目",
    male: "男",
    female: "女",
    region: "行政区划",
    org: "报告单位",
    sex: "性别",
    diagnosisYear: "诊断年份",
    cases: "发病数",
    deaths: "死亡数",
    followupRate: "随访完成率",
    observed: "观察生存率",
    followed: "已随访数",
    median: "中位生存时间"
  };

  const ageRows = analyticsAgeRows.map((row) => {
    const incidence = row.lung + row.breast + row.stomach + row.liver + row.colorectal;
    const value = isDeath ? row.death : incidence;
    return {
      ...row,
      value: isRate ? Number((value / row.population * 100000).toFixed(2)) : value
    };
  });
  const monthRows = analyticsMonthRows.map((row) => ({ ...row, total: row.jan + row.feb + row.mar + row.apr + row.may + row.jun }));
  const tableRows = isSurvival ? survivalRows : isCross ? crossReportRows : isSite ? analyticsSiteRows : isMulti ? analyticsMultiRows : (isMonth || isCompleteness) ? monthRows : ageRows;
  const pieTitle = isSurvival ? "观察生存率构成" : isSite ? "发病/死亡构成" : isCross ? "性别构成" : isMulti ? "部位构成" : isMonth ? "报卡范围构成" : isCompleteness ? "缺失项构成" : "重点部位构成";
  const pieData = isCross
    ? [{ label: "男", value: 1002 }, { label: "女", value: 970 }]
    : isSurvival
      ? survivalRows.map((row) => ({ label: row.site, value: Number.parseFloat(row.observed) || 0 }))
    : isMulti
      ? analyticsMultiRows.map((row) => ({ label: row.site, value: row.cases }))
      : isMonth
        ? [{ label: "正式卡", value: 1628 }, { label: "合并卡", value: 214 }, { label: "多原发卡", value: 130 }]
        : isCompleteness
          ? [{ label: "身份证缺失", value: 18 }, { label: "病理编码缺失", value: 27 }, { label: "地址编码缺失", value: 31 }, { label: "诊断依据缺失", value: 12 }]
          : analyticsSiteRows.map((row) => ({ label: row.site, value: isDeath ? row.death : row.incidence }));

  const totalValue = tableRows.reduce((sum, row) => sum + (row.value || row.total || row.incidence || row.cases || 0), 0);
  const totalPopulation = analyticsAgeRows.reduce((sum, row) => sum + row.population, 0);
  const totalAgeCases = analyticsAgeRows.reduce((sum, row) => {
    const incidence = row.lung + row.breast + row.stomach + row.liver + row.colorectal;
    return sum + (isDeath ? row.death : incidence);
  }, 0);
  const crudeRate = isRate ? Number((totalAgeCases / totalPopulation * 100000).toFixed(2)) : null;
  const topItem = [...tableRows].sort((a, b) => (b.value || b.total || b.incidence || b.complete || b.cases || 0) - (a.value || a.total || a.incidence || a.complete || a.cases || 0))[0];
  const primaryStatTitle = isRate ? (isDeath ? "粗死亡率" : "粗发病率") : isCompleteness ? "平均完整率" : "统计合计";
  const topStatTitle = isSurvival ? "最高癌种" : isRate || (!isSite && !isMonth && !isCompleteness && !isCross && !isMulti) ? "最高年龄组" : "最高项目";
  const survivalAvg = isSurvival ? Number((survivalRows.reduce((sum, row) => sum + (Number.parseFloat(row.observed) || 0), 0) / survivalRows.length).toFixed(1)) : null;

  const columns = isCross
    ? [
      { title: "纵向项目", dataIndex: "item", width: 140 },
      { title: "男", dataIndex: "male", width: 100 },
      { title: "女", dataIndex: "female", width: 100 },
      { title: "合计", dataIndex: "total", width: 100 },
      { title: "操作", width: 100, render: (_, row) => <Button type="link" onClick={() => setDetailRow(row)}>明细</Button> }
    ]
    : isSurvival
      ? [
        { title: "综合部位", dataIndex: "site", width: 120 },
        { title: "诊断年份", dataIndex: "diagnosisYear", width: 100 },
        { title: "病例数", dataIndex: "cases", width: 90 },
        { title: "已随访数", dataIndex: "followed", width: 100 },
        { title: "死亡数", dataIndex: "deaths", width: 90 },
        { title: "随访完成率", dataIndex: "followupRate", width: 120 },
        { title: "观察生存率", dataIndex: "observed", width: 120 },
        { title: "中位生存时间", dataIndex: "median", width: 130 },
        { title: "状态", dataIndex: "status", width: 100, render: statusTag },
        { title: "操作", width: 100, render: (_, row) => <Button type="link" onClick={() => setDetailRow(row)}>明细</Button> }
      ]
    : isSite
      ? [
        { title: "综合部位", dataIndex: "site", width: 130 },
        { title: "发病数", dataIndex: "incidence", width: 100 },
        { title: "发病率/10万", dataIndex: "rate", width: 120 },
        { title: "死亡数", dataIndex: "death", width: 100 },
        { title: "死亡率/10万", dataIndex: "deathRate", width: 120 },
        { title: "操作", width: 100, render: (_, row) => <Button type="link" onClick={() => setDetailRow(row)}>明细</Button> }
      ]
      : isMulti
        ? [
          { title: "行政区划", dataIndex: "region", width: 140 },
          { title: "报告单位", dataIndex: "org", width: 170 },
          { title: "诊断年份", dataIndex: "diagnosisYear", width: 100 },
          { title: "性别", dataIndex: "sex", width: 80 },
          { title: "年龄组", dataIndex: "ageGroup", width: 100 },
          { title: "综合部位", dataIndex: "site", width: 100 },
          { title: "发病数", dataIndex: "cases", width: 90 },
          { title: "死亡数", dataIndex: "deaths", width: 90 },
          { title: "发病率/10万", dataIndex: "rate", width: 120 },
          { title: "完整率", dataIndex: "complete", width: 100, render: (value) => `${value}%` },
          { title: "操作", width: 100, fixed: "right", render: (_, row) => <Button type="link" onClick={() => setDetailRow(row)}>明细</Button> }
        ]
        : (isMonth || isCompleteness)
        ? [
          { title: isMonth ? "统计对象" : "对象名称", dataIndex: "name", width: 160 },
          { title: "1月", dataIndex: "jan", width: 80 },
          { title: "2月", dataIndex: "feb", width: 80 },
          { title: "3月", dataIndex: "mar", width: 80 },
          { title: "4月", dataIndex: "apr", width: 80 },
          { title: "5月", dataIndex: "may", width: 80 },
          { title: "6月", dataIndex: "jun", width: 80 },
          { title: isCompleteness ? "完整率" : "合计", dataIndex: isCompleteness ? "complete" : "total", width: 100, render: (value) => isCompleteness ? `${value}%` : value },
          { title: "操作", width: 100, render: (_, row) => <Button type="link" onClick={() => setDetailRow(row)}>明细</Button> }
        ]
        : [
          { title: "年龄组", dataIndex: "ageGroup", width: 100 },
          { title: "肺", dataIndex: "lung", width: 80 },
          { title: "乳腺", dataIndex: "breast", width: 80 },
          { title: "胃", dataIndex: "stomach", width: 80 },
          { title: "肝", dataIndex: "liver", width: 80 },
          { title: "结直肠", dataIndex: "colorectal", width: 90 },
          { title: isRate ? `${isDeath ? "死亡率" : "发病率"}/10万` : isDeath ? "死亡数" : "发病数", dataIndex: "value", width: 130 },
          { title: "操作", width: 100, render: (_, row) => <Button type="link" onClick={() => setDetailRow(row)}>明细</Button> }
        ];

  function runQuery() {
    setQuery(form.getFieldsValue());
    message.success(`${name}查询完成`);
  }

  function exportReport() {
    const exportName = isCross ? "交叉统计报表" : isMulti ? "多维查询结果" : name;
    message.success(`${exportName}已生成，导出字段按当前角色权限处理`);
  }

  return (
    <div className="analytics-page">
      <Row gutter={16} className="plan-stat-row analytics-stat-row">
        <Col span={6}><Card><Statistic title={isSurvival ? "平均观察生存率" : primaryStatTitle} value={isSurvival ? survivalAvg : isRate ? crudeRate : isCompleteness ? 95.5 : totalValue} suffix={isSurvival || isCompleteness ? "%" : isRate ? "/10万" : "例"} /></Card></Col>
        <Col span={6}><Card><Statistic title={topStatTitle} value={topItem?.ageGroup || topItem?.name || topItem?.site || topItem?.item || topItem?.region} /></Card></Col>
        <Col span={6}><Card><Statistic title="统计口径" value={query.reportRange || "全部报卡"} /></Card></Col>
        <Col span={6}><Card><Statistic title="数据更新时间" value="2026-06-10" /></Card></Col>
      </Row>

      <Card className="search-card maintenance-search">
        <Form form={form} layout="inline" initialValues={{
          region: "河南省",
          reportRange: "全部报卡",
          timeType: "年度统计",
          sex: "全部性别",
          dateType: "报告日期",
          year: "2026",
          dimension: "按区划",
          icdGroup: "ICD-10 三位码",
          ageGroup: "五岁年龄组",
          rowField: "ICD 分组",
          colField: "性别"
        }}>
          {isSurvival ? (
            <>
              <Form.Item name="region"><Select className="filter-select" options={[{ value: "江西省" }, { value: "南昌市" }, { value: "九江市" }]} /></Form.Item>
              <Form.Item name="diagnosisYear"><Select className="filter-select" options={[{ value: "2020" }, { value: "2021" }, { value: "2022" }]} /></Form.Item>
              <Form.Item name="site"><Select className="filter-select" options={[{ value: "全部部位" }, { value: "肺" }, { value: "乳腺" }, { value: "结直肠" }]} /></Form.Item>
              <Form.Item name="followupEnd"><Input className="date-range-input" placeholder="随访截止日期 2026-06-30" /></Form.Item>
              <Form.Item name="sex"><Select className="filter-select" options={[{ value: "全部性别" }, { value: "男" }, { value: "女" }]} /></Form.Item>
            </>
          ) : isMulti ? (
            <>
              <Form.Item name="region"><Select className="filter-select" options={[{ value: "河南省" }, { value: "郑州市" }, { value: "许昌市" }, { value: "洛阳市" }]} /></Form.Item>
              <Form.Item name="dateType"><Select className="filter-select" options={[{ value: "报告日期" }, { value: "诊断日期" }, { value: "录入日期" }]} /></Form.Item>
              <Form.Item name="dateRange"><Input className="date-range-input" placeholder="2026-01-01 至 2026-06-30" /></Form.Item>
              <Form.Item name="reportRange"><Select className="filter-select" options={[{ value: "全部报卡" }, { value: "正式卡" }, { value: "合并卡" }, { value: "多原发卡" }]} /></Form.Item>
              <Form.Item name="sex"><Select className="filter-select small" options={[{ value: "全部性别" }, { value: "男" }, { value: "女" }]} /></Form.Item>
              <Form.Item name="ageGroup"><Select className="filter-select" options={[{ value: "五岁年龄组" }, { value: "十岁年龄组" }, { value: "自定义年龄组" }]} /></Form.Item>
              <Form.Item name="site"><Select className="filter-select" options={[{ value: "全部部位" }, { value: "肺" }, { value: "乳腺" }, { value: "胃" }, { value: "肝" }, { value: "结直肠" }]} /></Form.Item>
              <Form.Item name="keyword"><Input prefix={<SearchOutlined />} className="keyword-input" placeholder="机构/地区/部位" /></Form.Item>
            </>
          ) : isCross ? (
            <>
              <Form.Item name="dateType"><Select className="filter-select" options={[{ value: "报告日期" }, { value: "诊断日期" }, { value: "录入日期" }]} /></Form.Item>
              <Form.Item name="dateRange"><Input className="date-range-input" placeholder="2026-01-01 至 2026-06-30" /></Form.Item>
              <Form.Item name="reportRange"><Select className="filter-select" options={[{ value: "全部报卡" }, { value: "正式卡" }, { value: "合并卡" }, { value: "多原发卡" }]} /></Form.Item>
              <Form.Item name="icdGroup"><Select className="filter-select" options={[{ value: "ICD-10 三位码" }, { value: "ICD-10 四位码" }, { value: "综合部位" }]} /></Form.Item>
              <Form.Item name="ageGroup"><Select className="filter-select" options={[{ value: "五岁年龄组" }, { value: "十岁年龄组" }, { value: "自定义年龄组" }]} /></Form.Item>
              <Form.Item name="rowField"><Select className="filter-select small" options={[{ value: "ICD 分组" }, { value: "年龄组" }, { value: "行政区划" }]} /></Form.Item>
              <Form.Item name="colField"><Select className="filter-select small" options={[{ value: "性别" }, { value: "报卡范围" }, { value: "年份" }]} /></Form.Item>
            </>
          ) : isMonth || isCompleteness ? (
            <>
              <Form.Item name="dimension"><Select className="filter-select" options={[{ value: "按区划" }, { value: "按单位" }, { value: "按用户" }]} /></Form.Item>
              <Form.Item name="region"><Select className="filter-select" options={[{ value: "河南省" }, { value: "郑州市" }, { value: "许昌市" }, { value: "洛阳市" }]} /></Form.Item>
              <Form.Item name="dateType"><Select className="filter-select" options={[{ value: "报告日期" }, { value: "诊断日期" }, { value: "录入日期" }]} /></Form.Item>
              <Form.Item name="year"><Select className="filter-select small" options={[{ value: "2026" }, { value: "2025" }, { value: "2024" }]} /></Form.Item>
              <Form.Item name="reportRange"><Select className="filter-select" options={[{ value: "全部报卡" }, { value: "正式卡" }, { value: "合并卡" }, { value: "多原发卡" }]} /></Form.Item>
            </>
          ) : (
            <>
              <Form.Item name="region"><Select className="filter-select" options={[{ value: "河南省" }, { value: "郑州市" }, { value: "许昌市" }, { value: "洛阳市" }]} /></Form.Item>
              <Form.Item name="endDate"><Input className="date-range-input" placeholder="截止日期 2026-06-30" /></Form.Item>
              <Form.Item name="reportRange"><Select className="filter-select" options={[{ value: "全部报卡" }, { value: "正式卡" }, { value: "合并卡" }, { value: "多原发卡" }]} /></Form.Item>
              <Form.Item name="timeType"><Select className="filter-select" options={[{ value: "年度统计" }, { value: "半年统计" }, { value: "季度统计" }, { value: "月份统计" }]} /></Form.Item>
              <Form.Item name="sex"><Select className="filter-select" options={[{ value: "全部性别" }, { value: "男" }, { value: "女" }]} /></Form.Item>
            </>
          )}
          <Form.Item>
            <Space>
              <Button type="primary" icon={<SearchOutlined />} onClick={runQuery}>查询</Button>
              <Button onClick={() => { form.resetFields(); setQuery({}); }}>重置</Button>
              <Button onClick={exportReport}>导出 Excel</Button>
              {isMulti && <Button onClick={() => message.info("已打开字段列配置，可选择导出地区、机构、年龄、性别、部位、发病死亡指标")}>列配置</Button>}
            </Space>
          </Form.Item>
        </Form>
      </Card>

      <Row gutter={16} className="analytics-chart-row">
        <Col span={14}>
          <Card title={isSurvival ? "癌种观察生存率" : isMonth || isCompleteness ? "月度趋势" : isCross ? "交叉报表柱状图" : isMulti ? "地区病例分布" : "年龄组分布"} className="analytics-chart-card">
            <SimpleBarChart data={isSurvival ? survivalRows.map((row) => ({ label: row.site, value: Number.parseFloat(row.observed) || 0 })) : isSite ? analyticsSiteRows.map((row) => ({ label: row.site, value: isDeath ? row.death : row.incidence })) : isCross ? crossReportRows.map((row) => ({ label: row.item, value: row.total })) : isMulti ? analyticsMultiRows.map((row) => ({ label: row.region, value: row.cases })) : isMonth || isCompleteness ? monthRows.map((row) => ({ label: row.name, value: isCompleteness ? row.complete : row.total })) : ageRows.map((row) => ({ label: row.ageGroup, value: row.value }))} suffix={isSurvival || isCompleteness ? "%" : isRate ? "/10万" : ""} />
          </Card>
        </Col>
        <Col span={10}>
          <Card title={pieTitle} className="analytics-chart-card">
            <SimplePieList data={pieData} />
          </Card>
        </Col>
      </Row>

      <Card className="table-card">
        <Alert className="table-alert" type="info" showIcon message={`${name}结果明细`} description="筛选条件参考河南操作手册保留原表单口径；图表用于辅助查看趋势和构成，明细表用于核对与导出。" />
        <Table columns={columns} dataSource={tableRows} pagination={false} scroll={{ x: 1100 }} />
      </Card>

      <Modal title={`${name}明细`} open={Boolean(detailRow)} onCancel={() => setDetailRow(null)} footer={<Button type="primary" onClick={() => setDetailRow(null)}>关闭</Button>} width={720}>
        {detailRow && <Descriptions bordered column={1} size="small">
          {Object.entries(detailRow).filter(([key]) => key !== "key").map(([key, value]) => <Descriptions.Item key={key} label={labelMap[key] || key}>{String(value)}</Descriptions.Item>)}
        </Descriptions>}
      </Modal>
    </div>
  );
}

function SimpleBarChart({ data, suffix = "" }) {
  const max = Math.max(...data.map((item) => Number(item.value) || 0), 1);
  return (
    <div className="simple-bar-chart">
      {data.map((item) => (
        <div className="bar-row" key={item.label}>
          <Text className="bar-label">{item.label}</Text>
          <div className="bar-track"><div className="bar-fill" style={{ width: `${Math.max(4, (Number(item.value) || 0) / max * 100)}%` }} /></div>
          <Text className="bar-value">{item.value}{suffix}</Text>
        </div>
      ))}
    </div>
  );
}

function SimplePieList({ data }) {
  const total = data.reduce((sum, item) => sum + item.value, 0) || 1;
  return (
    <div className="pie-list">
      {data.map((item, index) => {
        const percent = (item.value / total * 100).toFixed(1);
        return (
          <div className="pie-row" key={item.label}>
            <span className={`pie-dot dot-${index % 5}`} />
            <Text>{item.label}</Text>
            <div className="pie-meter"><span style={{ width: `${percent}%` }} /></div>
            <Text>{percent}%</Text>
          </div>
        );
      })}
    </div>
  );
}

function getRows(feature) {
  const moduleId = feature?.module?.id;
  const featureName = feature?.name || "";
  const sourceName = feature?.sourceName || "";
  const baseConfig = {
    placeholder: `搜索${featureName}名称/编号`,
    filters: commonFilters(),
    toolbarActions: ["重置"],
    primary: "新增",
    rows: records,
    actions: ["查看", "编辑", "导出"]
  };
  if (sourceName === "作废卡管理") {
    return {
      ...baseConfig,
      placeholder: "搜索登记编号/姓名/身份证号",
      primary: "导出 Excel",
      toolbarActions: ["重置"],
      rows: voidRows,
      actions: ["详情", "还原", "删除"],
      columns: [
        { title: "登记编号", dataIndex: "no", width: 160 },
        { title: "姓名", dataIndex: "name", width: 100 },
        { title: "行政区划", dataIndex: "region", width: 160 },
        { title: "报卡类型", dataIndex: "type", width: 120 },
        { title: "校验状态", dataIndex: "quality", width: 110 },
        { title: "作废状态", dataIndex: "status", width: 110 },
        { title: "作废日期", dataIndex: "date", width: 130 }
      ]
    };
  }
  if (moduleId === "cards") {
    const isQuery = sourceName === "报告卡查询";
    return {
      ...baseConfig,
      placeholder: "搜索登记编号/姓名/身份证号",
      filters: [
        selectFilter("行政区划", ["全部区划", "郑州市", "洛阳市", "许昌市"]),
        selectFilter("校验状态", ["全部状态", "通过", "警告", "错误"]),
        selectFilter("报卡类型", ["全部类型", "原始卡", "合并卡", "多原发卡"]),
        selectFilter("日期类型", ["报告日期", "诊断日期", "录入日期"]),
        selectFilter("检索类型", ["登记编号", "姓名", "身份证号"])
      ],
      primary: sourceName === "报告卡登记" ? "提交报告卡" : isQuery ? "导出 Excel" : "添加",
      toolbarActions: isQuery ? ["重置"] : ["重置"],
      actions: isQuery ? ["详情", "克隆"] : sourceName === "报告卡维护" ? ["详情", "编辑", "删除"] : ["详情", "编辑", "提交审核"],
      columns: reportColumns()
    };
  }
  if (moduleId === "exchange") {
    return {
      ...baseConfig,
      placeholder: "搜索上传批次/来源机构/文件名",
      filters: [
        selectFilter("行政区划", ["全部区划", "郑州市", "洛阳市", "南昌市"]),
        selectFilter("重卡状态", ["全部", "未查重", "疑似重卡", "已处理"]),
        selectFilter("上传类型", ["全部类型", "HIS", "CAUS", "XIE"]),
        selectFilter("日期类型", ["上传日期", "入库日期"])
      ],
      rows: exchangeRows,
      primary: "添加文件",
      toolbarActions: ["上传文件", "批量导入", "删除全部"],
      actions: ["查看日志", "错误导出", "重传"],
      columns: [
        { title: "批次号", dataIndex: "batch", width: 190 },
        { title: "类型", dataIndex: "type", width: 160 },
        { title: "来源", dataIndex: "source", width: 220 },
        { title: "总数", dataIndex: "total", width: 80 },
        { title: "错误", dataIndex: "error", width: 80 },
        { title: "状态", dataIndex: "status", width: 120 }
      ]
    };
  }
  if (moduleId === "duplicate") {
    return {
      ...baseConfig,
      placeholder: "搜索登记编号/姓名/身份证号",
      filters: [selectFilter("行政区划", ["全部区划", "郑州市", "洛阳市"]), selectFilter("查重依据", ["全部依据", "身份证号", "姓名电话", "姓名性别出生日期地址"])],
      rows: duplicateRows,
      primary: sourceName.includes("参数") ? "添加参数" : "对比合并",
      toolbarActions: sourceName.includes("关系查看") ? ["快速还原"] : ["快速合并"],
      actions: sourceName.includes("关系查看") ? ["详情", "还原"] : ["对比合并", "快速合并", "标记多原发"],
      columns: [
        { title: "组号", dataIndex: "group", width: 150 },
        { title: "关联记录", dataIndex: "cards", width: 260 },
        { title: "查重依据", dataIndex: "basis", width: 220 },
        { title: "判断结果", dataIndex: "judge", width: 130 },
        { title: "风险等级", dataIndex: "risk", width: 100 }
      ]
    };
  }
  if (moduleId === "followup") {
    return {
      ...baseConfig,
      placeholder: "搜索登记编号/姓名/身份证号",
      filters: [
        selectFilter("行政区划", ["全部区划", "郑州市", "洛阳市"]),
        selectFilter("校验状态", ["全部状态", "通过", "警告", "错误"]),
        selectFilter("报卡类型", ["全部类型", "原始卡", "合并卡"]),
        selectFilter("日期类型", ["最后接触日期", "死亡日期"])
      ],
      rows: records,
      primary: sourceName.includes("批量") ? "上传更新" : sourceName.includes("死亡") ? "死亡补录" : "添加随访",
      toolbarActions: sourceName.includes("随访信息") ? ["批量随访"] : ["导出 Excel"],
      actions: sourceName.includes("死亡") ? ["随访", "删除"] : ["随访", "修改最新", "删除最新"],
      columns: reportColumns()
    };
  }
  if (moduleId === "base") {
    return {
      ...baseConfig,
      placeholder: "搜索编码/名称/年度",
      filters: [selectFilter("行政区划", ["全部区划", "郑州市", "洛阳市"]), selectFilter("年度", ["2026", "2025", "2024"]), selectFilter("性别", ["全部性别", "男", "女"])],
      rows: baseRows,
      primary: "添加",
      toolbarActions: sourceName.includes("发病人口") ? ["批量转换区划"] : ["重置"],
      actions: ["查看", "编辑", "删除"],
      columns: [
        { title: "编码", dataIndex: "code", width: 120 },
        { title: "名称", dataIndex: "name", width: 140 },
        { title: "年度", dataIndex: "year", width: 90 },
        { title: "性别", dataIndex: "sex", width: 90 },
        { title: "年龄组", dataIndex: "ageGroup", width: 120 },
        { title: "人口数", dataIndex: "population", width: 120 },
        { title: "状态", dataIndex: "status", width: 100 }
      ]
    };
  }
  if (moduleId === "sharing") {
    return {
      ...baseConfig,
      placeholder: "搜索申请编号/申请单位",
      filters: [selectFilter("审批状态", ["全部状态", "待审批", "已交付", "退回补充"]), selectFilter("数据类型", ["全部类型", "报告卡", "随访", "人口"])],
      rows: shareRows,
      primary: "新建申请",
      toolbarActions: ["导出审批单"],
      actions: ["审批", "退回", "生成脱敏文件"],
      columns: [
        { title: "申请编号", dataIndex: "no", width: 150 },
        { title: "申请单位", dataIndex: "org", width: 180 },
        { title: "数据范围", dataIndex: "range", width: 260 },
        { title: "状态", dataIndex: "status", width: 120 },
        { title: "申请日期", dataIndex: "date", width: 130 }
      ]
    };
  }
  if (moduleId === "audit") {
    return {
      ...baseConfig,
      placeholder: "搜索关键字/用户/业务编号",
      filters: [selectFilter("日志类型", ["全部日志", "报卡日志", "随访日志", "空间地址日志", "系统操作日志"]), selectFilter("日期区间", ["今日", "近7天", "近30天"])],
      rows: auditRows,
      primary: "导出日志",
      toolbarActions: [],
      actions: ["查看详情"],
      columns: [
        { title: "时间", dataIndex: "time", width: 170 },
        { title: "用户", dataIndex: "user", width: 120 },
        { title: "动作", dataIndex: "action", width: 90 },
        { title: "内容", dataIndex: "content", width: 280 },
        { title: "结果", dataIndex: "result", width: 100 }
      ]
    };
  }
  const actions = featureName.includes("审核")
    ? ["审核", "退回", "驳回"]
    : featureName.includes("查重") || featureName.includes("重卡") || featureName.includes("多原发")
      ? ["对比合并", "快速合并", "标记多原发"]
      : featureName.includes("随访") || featureName.includes("死亡")
        ? ["随访", "死亡补录", "回退"]
        : ["查看", "编辑", "导出"];
  return {
    ...baseConfig,
    rows: records,
    actions,
    primary: moduleId === "annual" ? "生成年报" : moduleId === "config" ? "添加" : "导出 Excel",
    toolbarActions: moduleId === "config" ? ["发布", "停用"] : ["重置"],
    columns: reportColumns()
  };
}

function reportColumns() {
  return [
    { title: "登记编号", dataIndex: "no", width: 160 },
    { title: "姓名", dataIndex: "name", width: 100 },
    { title: "性别", dataIndex: "sex", width: 70 },
    { title: "年龄", dataIndex: "age", width: 70 },
    { title: "行政区划", dataIndex: "region", width: 160 },
    { title: "报告机构", dataIndex: "org", width: 180 },
    { title: "诊断", dataIndex: "diagnosis", width: 220 },
    { title: "状态", dataIndex: "status", width: 130 },
    { title: "校验", dataIndex: "quality", width: 100 }
  ];
}

function commonFilters() {
  return [selectFilter("状态", ["全部状态", "启用", "停用"]), selectFilter("日期类型", ["创建日期", "更新日期"])];
}

function selectFilter(key, options) {
  return { key, options: options.map((value) => ({ value, label: value })) };
}

function modalTitle(context) {
  if (!context) return "业务操作";
  const name = context.feature?.name || "";
  const action = context.action || "";
  if (action.includes("上传") || action.includes("添加文件")) return `${name} - 文件上传`;
  if (action.includes("批量导入")) return `${name} - 批量导入确认`;
  if (action.includes("审核") || action === "审批") return `${name} - ${action}`;
  if (action.includes("合并")) return `${name} - ${action}`;
  if (action.includes("随访")) return `${name} - 随访记录`;
  if (action.includes("死亡")) return `${name} - 死亡信息`;
  if (action.includes("申请")) return `${name} - 申请登记`;
  if (action.includes("导出")) return `${name} - 导出确认`;
  return `${name} - ${action}`;
}

function modalOkText(context) {
  const action = context?.action || "";
  if (action.includes("上传") || action.includes("添加文件")) return "上传";
  if (action.includes("导出")) return "导出";
  if (action.includes("审核") || action === "审批") return "提交审核";
  if (action.includes("合并")) return "确认合并";
  if (action.includes("退回")) return "确认退回";
  return "提交";
}

function modalWidth(context) {
  const action = context?.action || "";
  return action.includes("合并") ? 960 : 820;
}

function successMessage(context) {
  const action = context?.action || "";
  if (action.includes("上传") || action.includes("添加文件")) return "文件已进入临时库，系统正在执行格式和逻辑校验";
  if (action.includes("导出")) return "导出任务已创建，完成后可在系统审计中查看下载记录";
  if (action.includes("合并")) return "合并已提交，来源记录和目标记录关系已留痕";
  if (action.includes("审核") || action === "审批") return "审核意见已提交，记录进入下一流程节点";
  if (action.includes("随访")) return "随访记录已保存，最新接触状态已更新";
  if (action.includes("死亡")) return "死亡信息已补录，待匹配发病记录并更新状态";
  return "操作已提交，系统已记录审计日志";
}

function errorMessage(context) {
  const action = context?.action || "";
  if (action.includes("上传") || action.includes("添加文件")) return "上传失败：请选择文件并确认导入类型";
  if (action.includes("审核") || action === "审批") return "提交失败：请填写处理意见";
  return "提交失败：请补全必填项并检查格式";
}

function BusinessForm({ context, form }) {
  const action = context?.action || "";
  const moduleId = context?.feature?.module?.id || "";
  if (action.includes("上传") || action.includes("添加文件")) {
    return (
      <Form layout="vertical" form={form}>
        <Alert type="info" showIcon message="两步上传流程" description="参照河南 V3.0：先选择文件上传到临时库，再按校验结果批量导入或逐条处理。" style={{ marginBottom: 16 }} />
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item name="importType" label="导入类型" rules={[{ required: true, message: "请选择导入类型" }]}>
              <Select options={[{ value: "HIS-肿瘤登记" }, { value: "CAUS-死因登记" }, { value: "XIE-信息协查" }]} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="region" label="行政区划" rules={[{ required: true, message: "请选择行政区划" }]}>
              <Select options={[{ value: "河南省" }, { value: "郑州市" }, { value: "金水区" }]} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="file" label="上传文件" rules={[{ required: true, message: "请选择上传文件" }]}>
              <Input placeholder="肿瘤登记批量上报.xlsx" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
  if (action.includes("审核") || action === "审批" || action.includes("退回") || action.includes("驳回")) {
    return (
      <Form layout="vertical" form={form}>
        <Descriptions bordered size="small" column={2} style={{ marginBottom: 16 }}>
          <Descriptions.Item label="登记编号">HN-2026-000183</Descriptions.Item>
          <Descriptions.Item label="校验状态">警告</Descriptions.Item>
          <Descriptions.Item label="异常提示">户籍地址未精确到社区；ICD-O-3 编码需复核</Descriptions.Item>
          <Descriptions.Item label="当前节点">县区复审</Descriptions.Item>
        </Descriptions>
        <Form.Item name="opinion" label="处理意见" rules={[{ required: true, message: "请填写处理意见" }]}>
          <Input.TextArea rows={4} placeholder="请输入确认、退回或驳回原因" />
        </Form.Item>
      </Form>
    );
  }
  if (action.includes("合并")) {
    return (
      <Form layout="vertical" form={form}>
        <Alert type="warning" showIcon message="合并前请确认是否存在疑似多原发" description="发病部位和形态学编码存在差异时，建议先标记多原发，不直接快速合并。" style={{ marginBottom: 16 }} />
        <Table
          size="small"
          pagination={false}
          dataSource={[
            { key: "1", field: "姓名", a: "张秀兰", b: "张秀兰", selected: "一致" },
            { key: "2", field: "发病部位", a: "乳腺 C50.9", b: "乳腺 C50.4", selected: "按确诊日期早" },
            { key: "3", field: "形态学编码", a: "8500/3", b: "8520/3", selected: "需人工确认" }
          ]}
          columns={[
            { title: "字段", dataIndex: "field" },
            { title: "记录 A", dataIndex: "a" },
            { title: "记录 B", dataIndex: "b" },
            { title: "合并策略", dataIndex: "selected" }
          ]}
        />
      </Form>
    );
  }
  if (action.includes("随访") || action.includes("死亡")) {
    return (
      <Form layout="vertical" form={form}>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item name="contactDate" label="最后接触日期" rules={[{ required: true, message: "请选择最后接触日期" }]}>
              <Input placeholder="2026-06-05" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="contactStatus" label="最后接触状态" rules={[{ required: true, message: "请选择接触状态" }]}>
              <Select options={[{ value: "存活" }, { value: "死亡" }, { value: "失访" }]} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="deathReason" label="根本死因">
              <Input placeholder="最后接触状态为死亡时必填" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="note" label="随访说明">
              <Input.TextArea rows={3} placeholder="填写随访方式、联系人反馈或死亡信息来源" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
  if (moduleId === "sharing") {
    return (
      <Form layout="vertical" form={form}>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item name="org" label="申请单位" rules={[{ required: true, message: "请输入申请单位" }]}>
              <Input placeholder="省肿瘤研究所" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="dataType" label="数据类型" rules={[{ required: true, message: "请选择数据类型" }]}>
              <Select options={[{ value: "报告卡" }, { value: "随访" }, { value: "人口数据" }]} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="level" label="脱敏级别" rules={[{ required: true, message: "请选择脱敏级别" }]}>
              <Select options={[{ value: "强脱敏" }, { value: "中脱敏" }, { value: "汇总数据" }]} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="purpose" label="使用目的" rules={[{ required: true, message: "请输入使用目的" }]}>
              <Input.TextArea rows={3} placeholder="说明课题、使用范围、有效期和联系人" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
  return <ReportCardForm form={form} />;
}

function ReportCardForm({ form }) {
  return (
    <Form layout="vertical" form={form}>
      <Alert type="info" showIcon message="报告卡三段式录入" description="发病基本信息、肿瘤报告信息、随访报告信息保持河南 V3.0 的录入习惯。" style={{ marginBottom: 16 }} />
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item name="name" label="姓名" rules={[{ required: true, message: "请输入患者姓名" }]}>
            <Input placeholder="如：李桂英" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="id" label="身份证号" rules={[{ required: true, message: "请输入身份证号" }, { pattern: /^\d{17}[0-9Xx]$/, message: "请输入 18 位身份证号" }]}>
            <Input placeholder="41010519630215482X" />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item name="sex" label="性别" rules={[{ required: true, message: "请选择性别" }]}>
            <Select options={[{ value: "女" }, { value: "男" }]} />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item name="age" label="年龄" rules={[{ required: true, message: "请输入年龄" }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="region" label="户籍地址" rules={[{ required: true, message: "请选择到县区以下地址" }]}>
            <Input placeholder="河南省郑州市金水区丰产路街道" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="diagnosis" label="诊断名称" rules={[{ required: true, message: "请输入诊断名称" }]}>
            <Input placeholder="乳腺恶性肿瘤" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="icd10" label="ICD-10" rules={[{ required: true, message: "请输入 ICD-10 编码" }]}>
            <Input placeholder="C50.9" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="icdo3" label="ICD-O-3" rules={[{ required: true, message: "请输入 ICD-O-3 编码" }]}>
            <Input placeholder="8500/3" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="doctor" label="报告医师">
            <Input placeholder="王医生" />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

function DrawerContent({ detail }) {
  const action = detail?.action || "查看";
  const row = detail?.row || {};
  const featureName = detail?.feature?.name || "当前功能";
  const text = action.includes("删除")
    ? "删除为高风险动作。逻辑删除进入作废卡管理；物理删除需单独授权、二次确认和审计。"
    : action.includes("重传")
      ? "系统将按原批次、原映射和重传策略重新发送，失败原因会写回任务日志。"
      : action.includes("错误导出")
        ? "导出文件会包含原始字段和错误提示，便于线下修正后重新上传。"
        : action.includes("克隆")
          ? "克隆用于登记中心对辖区内非当前用户上报正式数据进行调整和合并，需保留来源关系。"
          : "系统展示业务详情、校验结果、流程状态和操作留痕。";
  return (
    <Descriptions bordered column={1} size="small">
      <Descriptions.Item label="功能">{featureName}</Descriptions.Item>
      <Descriptions.Item label="业务对象">{row.no || row.batch || row.group || row.name || "当前记录"}</Descriptions.Item>
      <Descriptions.Item label="操作说明">{text}</Descriptions.Item>
      <Descriptions.Item label="审计留痕">记录用户、角色、机构、时间、动作、前后状态和处理意见。</Descriptions.Item>
    </Descriptions>
  );
}

createRoot(document.getElementById("root")).render(<App />);
