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
  Empty,
  Flex,
  Form,
  Input,
  Layout,
  Menu,
  Modal,
  Pagination,
  Row,
  Select,
  Space,
  Statistic,
  Table,
  Tag,
  Typography,
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
  UserSwitchOutlined
} from "@ant-design/icons";
import { functionMenu } from "./menuData";
import "./styles.css";

const { Header, Sider, Content } = Layout;
const { Text, Title } = Typography;

const roles = {
  province: {
    name: "张建国",
    label: "省级管理员",
    scope: "河南省全省数据",
    modules: ["dashboard", "cards", "exchange", "quality", "followup", "duplicate", "analytics", "annual", "base", "sharing", "config", "audit"]
  },
  city: {
    name: "李文华",
    label: "地市登记员",
    scope: "郑州市本级及下辖区县",
    modules: ["dashboard", "cards", "exchange", "quality", "followup", "duplicate", "analytics", "base", "audit"]
  },
  county: {
    name: "周敏",
    label: "县区审核员",
    scope: "金水区辖区数据",
    modules: ["dashboard", "cards", "quality", "followup", "duplicate", "analytics", "base", "audit"]
  },
  hospital: {
    name: "王医生",
    label: "医疗机构填报员",
    scope: "河南省人民医院本机构数据",
    modules: ["dashboard", "cards", "exchange", "followup"]
  },
  share: {
    name: "陈主任",
    label: "数据共享审批员",
    scope: "省级共享申请",
    modules: ["dashboard", "sharing", "audit"]
  }
};

const moduleIcons = {
  dashboard: <HomeOutlined />,
  cards: <FileTextOutlined />,
  exchange: <DatabaseOutlined />,
  quality: <SettingOutlined />,
  followup: <CalendarOutlined />,
  duplicate: <DiffOutlined />,
  analytics: <BarChartOutlined />,
  annual: <FileDoneOutlined />,
  base: <ClusterOutlined />,
  sharing: <ShareAltOutlined />,
  config: <SafetyCertificateOutlined />,
  audit: <AuditOutlined />
};

const records = [
  {
    key: "1",
    no: "HN-2026-000183",
    name: "张秀兰",
    sex: "女",
    age: 63,
    region: "郑州市金水区",
    org: "河南省人民医院",
    diagnosis: "C50.9 乳腺恶性肿瘤",
    status: "待县区审核",
    quality: "警告"
  },
  {
    key: "2",
    no: "HN-2026-000184",
    name: "王建国",
    sex: "男",
    age: 71,
    region: "洛阳市涧西区",
    org: "洛阳市中心医院",
    diagnosis: "C34.1 上叶肺癌",
    status: "正式",
    quality: "通过"
  },
  {
    key: "3",
    no: "JX-2026-000041",
    name: "刘梅",
    sex: "女",
    age: 52,
    region: "南昌市东湖区",
    org: "江西省肿瘤医院",
    diagnosis: "C18.7 乙状结肠癌",
    status: "退回修正",
    quality: "错误"
  },
  {
    key: "4",
    no: "HN-2026-000185",
    name: "赵海",
    sex: "男",
    age: 45,
    region: "许昌市魏都区",
    org: "许昌市人民医院",
    diagnosis: "C22.0 肝细胞癌",
    status: "待省级终审",
    quality: "通过"
  },
  {
    key: "5",
    no: "HN-2025-008432",
    name: "陈国强",
    sex: "男",
    age: 68,
    region: "郑州市二七区",
    org: "郑大一附院",
    diagnosis: "C16.9 胃恶性肿瘤",
    status: "死亡待更新",
    quality: "警告"
  }
];

const exchangeRows = [
  { key: "1", batch: "HIS-20260605-03", type: "HIS 上传管理", source: "河南省人民医院", total: 128, error: 17, status: "校验失败" },
  { key: "2", batch: "CAUS-20260605-01", type: "死因上传管理", source: "江西省全民健康信息平台", total: 42, error: 0, status: "已入库" },
  { key: "3", batch: "XIE-20260605-02", type: "信息协查管理", source: "郑州市疾控中心", total: 19, error: 2, status: "待逐条处理" }
];

const shareRows = [
  { key: "1", no: "REQ-2026-014", org: "省肿瘤研究所", range: "肺癌 2021-2025 脱敏病例", status: "待审批", date: "2026-06-04" },
  { key: "2", no: "REQ-2026-011", org: "江西省疾控中心", range: "结直肠癌地区分布汇总", status: "已交付", date: "2026-05-29" },
  { key: "3", no: "REQ-2026-009", org: "郑州大学课题组", range: "乳腺癌生存分析样本", status: "退回补充", date: "2026-05-25" }
];

function statusTag(value) {
  const colorMap = {
    正式: "success",
    通过: "success",
    已入库: "success",
    已交付: "success",
    待县区审核: "warning",
    待省级终审: "warning",
    待审批: "warning",
    待逐条处理: "processing",
    死亡待更新: "warning",
    警告: "processing",
    错误: "error",
    校验失败: "error",
    退回修正: "error",
    退回补充: "error"
  };
  return <Tag color={colorMap[value] || "default"}>{value}</Tag>;
}

function App() {
  const [roleKey, setRoleKey] = useState("province");
  const [selectedKey, setSelectedKey] = useState("dashboard_01");
  const [empty, setEmpty] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [detail, setDetail] = useState(null);
  const [form] = Form.useForm();

  const allowedModules = roles[roleKey].modules;
  const visibleModules = useMemo(() => functionMenu.filter((item) => allowedModules.includes(item.id)), [allowedModules]);
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
    const currentModule = featureMap.get(selectedKey)?.module?.id;
    setRoleKey(value);
    if (!nextModules.includes(currentModule)) {
      const firstModule = functionMenu.find((item) => nextModules.includes(item.id));
      setSelectedKey(firstModule?.features[0]?.id || "dashboard_01");
    }
    setEmpty(false);
    message.success(`已切换为${roles[value].label}`);
  }

  function showDetail(action, row) {
    setDetail({ action, row });
    setDrawerOpen(true);
  }

  function submitCard() {
    form
      .validateFields()
      .then(() => {
        setModalOpen(false);
        form.resetFields();
        message.success("报告卡已暂存，校验通过后进入审核流程");
      })
      .catch(() => message.error("提交失败：请补全必填项并检查身份证号"));
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
              setEmpty(false);
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
            <Space size={18}>
              <Badge dot>
                <BellOutlined className="header-icon" />
              </Badge>
              <Avatar size={44} className="user-avatar">
                {roles[roleKey].name.slice(0, 1)}
              </Avatar>
              <div>
                <Text strong>{roles[roleKey].name}</Text>
                <br />
                <Text type="secondary">{roles[roleKey].label}</Text>
              </div>
            </Space>
          </Header>
          <Content className="app-content">
            <FeaturePage
              feature={current}
              role={roles[roleKey]}
              empty={empty}
              setEmpty={setEmpty}
              openCreate={() => setModalOpen(true)}
              showDetail={showDetail}
            />
          </Content>
        </Layout>
      </Layout>

      <Modal title="报告卡登记" open={modalOpen} onCancel={() => setModalOpen(false)} onOk={submitCard} okText="提交" cancelText="取消" width={820}>
        <Alert
          type="info"
          showIcon
          message="河南 V3.0 交互习惯"
          description="表单按发病基本信息、肿瘤报告信息、随访报告信息分组；身份证可自动带出性别、出生日期，提交时执行必填、逻辑和重卡校验。"
          style={{ marginBottom: 16 }}
        />
        <Form layout="vertical" form={form}>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="name" label="姓名" rules={[{ required: true, message: "请输入患者姓名" }]}>
                <Input placeholder="如：李桂英" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="id"
                label="身份证号"
                rules={[
                  { required: true, message: "请输入身份证号" },
                  { pattern: /^\d{17}[0-9Xx]$/, message: "请输入 18 位身份证号" }
                ]}
              >
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
      </Modal>

      <Drawer title={detail?.action || "详情"} open={drawerOpen} onClose={() => setDrawerOpen(false)} width={560}>
        <Descriptions bordered column={1} size="small">
          <Descriptions.Item label="业务对象">{detail?.row?.no || detail?.row?.batch || detail?.row?.name || "当前记录"}</Descriptions.Item>
          <Descriptions.Item label="质控结果">身份证逻辑通过；ICD-O-3 编码需复核；地址精确到社区。</Descriptions.Item>
          <Descriptions.Item label="审计留痕">确认后记录用户、角色、机构、时间、动作和前后状态。</Descriptions.Item>
        </Descriptions>
      </Drawer>
    </ConfigProvider>
  );
}

function FeaturePage({ feature, role, empty, setEmpty, openCreate, showDetail }) {
  const moduleId = feature?.module?.id;
  const data = getRows(moduleId, feature?.name);
  const rows = empty ? [] : data.rows;
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
          <Button key={action} type="link" onClick={() => showDetail(action, row)}>
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
        <Flex justify="space-between" gap={16} wrap="wrap">
          <Space size={12} wrap>
            <Input prefix={<SearchOutlined />} placeholder={`搜索${feature?.name || "功能"}名称/编号`} className="search-input" />
            <Select defaultValue="全部状态" className="filter-select" options={[{ value: "全部状态" }, { value: "待审核" }, { value: "正式" }, { value: "退回" }]} />
            <Select defaultValue="全部区划" className="filter-select" options={[{ value: "全部区划" }, { value: "郑州市" }, { value: "洛阳市" }, { value: "南昌市" }]} />
            <Button type="primary" icon={<SearchOutlined />} onClick={() => message.success("查询完成")}>
              搜索
            </Button>
            <Button onClick={() => setEmpty(true)}>模拟空数据</Button>
          </Space>
          <Space>
            <Button onClick={() => setEmpty(false)}>恢复数据</Button>
            <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>
              {primaryText(moduleId, feature?.name)}
            </Button>
          </Space>
        </Flex>
      </Card>

      <Row gutter={16} className="info-row">
        <Col span={12}>
          <Card title="功能描述">
            <Text>{feature?.description}</Text>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="验证规则 / 业务校验">
            <Text>{feature?.validation}</Text>
          </Card>
        </Col>
      </Row>

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

function primaryText(moduleId, featureName = "") {
  if (moduleId === "cards" || featureName.includes("报告卡")) return "新增报告卡";
  if (moduleId === "exchange") return "上传文件";
  if (moduleId === "sharing") return "新增申请";
  if (moduleId === "config") return "新增配置";
  return "新增";
}

function getRows(moduleId, featureName = "") {
  if (moduleId === "exchange") {
    return {
      rows: exchangeRows,
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
  if (moduleId === "sharing") {
    return {
      rows: shareRows,
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
  const actions = featureName.includes("审核")
    ? ["审核", "退回", "驳回"]
    : featureName.includes("查重") || featureName.includes("重卡") || featureName.includes("多原发")
      ? ["对比合并", "快速合并", "标记多原发"]
      : featureName.includes("随访") || featureName.includes("死亡")
        ? ["随访", "死亡补录", "回退"]
        : ["查看", "编辑", "导出"];
  return {
    rows: records,
    actions,
    columns: [
      { title: "登记编号", dataIndex: "no", width: 160 },
      { title: "姓名", dataIndex: "name", width: 100 },
      { title: "性别", dataIndex: "sex", width: 70 },
      { title: "年龄", dataIndex: "age", width: 70 },
      { title: "行政区划", dataIndex: "region", width: 160 },
      { title: "报告机构", dataIndex: "org", width: 180 },
      { title: "诊断", dataIndex: "diagnosis", width: 220 },
      { title: "状态", dataIndex: "status", width: 130 },
      { title: "校验", dataIndex: "quality", width: 100 }
    ]
  };
}

createRoot(document.getElementById("root")).render(<App />);
