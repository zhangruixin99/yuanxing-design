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
  InputNumber,
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

const shareRows = [
  { key: "1", no: "REQ-2026-014", org: "省肿瘤研究所", range: "肺癌 2021-2025 脱敏病例", status: "待审批", date: "2026-06-04" },
  { key: "2", no: "REQ-2026-011", org: "江西省疾控中心", range: "结直肠癌地区分布汇总", status: "已交付", date: "2026-05-29" },
  { key: "3", no: "REQ-2026-009", org: "郑州大学课题组", range: "乳腺癌生存分析样本", status: "退回补充", date: "2026-05-25" }
];

const voidRows = [
  { key: "1", no: "HN-2026-000091", name: "郭兰英", region: "郑州市中原区", type: "原始卡", quality: "通过", status: "已作废", date: "2026-05-18" },
  { key: "2", no: "HN-2026-000102", name: "孙志强", region: "开封市鼓楼区", type: "合并卡", quality: "警告", status: "已作废", date: "2026-05-22" }
];

const duplicateRows = [
  { key: "1", group: "DUP-202606-001", cards: "HN-2026-000183 / HN-2025-009812", basis: "身份证号 + 姓名 + 出生日期", judge: "疑似重复", risk: "高" },
  { key: "2", group: "DUP-202606-002", cards: "HN-2026-000185 / HN-2024-006381", basis: "姓名 + 联系电话 + 常住地址", judge: "疑似多原发", risk: "中" }
];

const baseRows = [
  { key: "1", code: "410105", name: "金水区", year: "2025", sex: "女", ageGroup: "60-64", population: "54,218", status: "启用" },
  { key: "2", code: "410103", name: "二七区", year: "2025", sex: "男", ageGroup: "65-69", population: "48,906", status: "启用" }
];

const auditRows = [
  { key: "1", time: "2026-06-05 11:42", user: "张建国", action: "导出", content: "报告卡查询导出 128 条", result: "成功" },
  { key: "2", time: "2026-06-05 11:08", user: "周敏", action: "退回", content: "HN-2026-000183 地址编码缺失", result: "成功" },
  { key: "3", time: "2026-06-05 10:55", user: "王医生", action: "提交", content: "新增报告卡 HN-2026-000185", result: "成功" }
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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContext, setModalContext] = useState(null);
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
    </ConfigProvider>
  );
}

function FeaturePage({ feature, role, openBusinessModal, showDetail }) {
  if (feature?.id === "cards_01") {
    return <ReportCardRegistration />;
  }
  if (feature?.id === "cards_02") {
    return <ReportCardMaintenance />;
  }
  if (feature?.id === "cards_03") {
    return <ReportCardQuery role={role} />;
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

function ReportCardRegistration() {
  const [form] = Form.useForm();
  const [duplicateOpen, setDuplicateOpen] = useState(false);
  const [lastValues, setLastValues] = useState(null);
  const contactStatus = Form.useWatch("contactStatus", form);
  const primarySite = Form.useWatch("primarySite", form);

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
    message.success("草稿已暂存，可在报告卡维护中继续编辑");
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
    message.success(`报告卡已提交，登记编号 ${lastValues?.registerNo || "HN-2026-000186"}，进入审核流程`);
  }

  return (
    <div className="report-card-page">
      <Alert
        type="info"
        showIcon
        className="compact-alert"
        message="报告卡登记"
        description="按河南 V3.0 录入习惯组织为发病基本信息、肿瘤报告信息、随访报告信息三部分；提交时执行必填、逻辑和重卡校验。"
      />
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          registerNo: "HN-2026-000186",
          reportOrg: "河南省人民医院",
          reportDoctor: "王医生",
          reportDate: "2026-06-05",
          behavior: "3",
          grade: "2"
        }}
        onValuesChange={(changed, allValues) => updateCodes(changed, allValues)}
      >
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
            <Button type="primary" onClick={submit}>提交</Button>
          </Space>
        </div>
      </Form>

      <Modal title="疑似重卡提示" open={duplicateOpen} onCancel={() => setDuplicateOpen(false)} footer={<Space><Button onClick={() => setDuplicateOpen(false)}>返回修改</Button><Button type="primary" onClick={confirmSubmit}>继续提交</Button></Space>}>
        <Alert type="warning" showIcon message="系统发现 1 条疑似重卡" description="HN-2025-009812，姓名张秀兰，身份证号与当前报告卡一致，发病部位同为乳腺。请确认是否继续提交为待审核状态。" />
        <Descriptions bordered column={1} size="small" style={{ marginTop: 16 }}>
          <Descriptions.Item label="当前记录">HN-2026-000186 / C50.9 乳腺恶性肿瘤</Descriptions.Item>
          <Descriptions.Item label="疑似记录">HN-2025-009812 / C50.4 乳腺恶性肿瘤</Descriptions.Item>
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

  function confirmClone() {
    setCloneRow(null);
    message.success(`已基于 ${cloneRow?.no} 创建克隆草稿，来源关系已保留`);
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
            description="医疗机构填报员不显示报卡克隆操作。登记中心或辖区授权用户可对正式数据执行克隆调整。"
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

      <Modal title="报卡克隆确认" open={Boolean(cloneRow)} onCancel={() => setCloneRow(null)} onOk={confirmClone} okText="确认克隆" cancelText="取消">
        <Alert
          type="warning"
          showIcon
          message="克隆会生成新的草稿报告卡"
          description="该操作用于登记中心对辖区内非当前用户上报正式数据进行调整和合并，克隆后保留来源关系，仍需重新校验和审核。"
          style={{ marginBottom: 16 }}
        />
        <Descriptions bordered column={1} size="small">
          <Descriptions.Item label="来源登记编号">{cloneRow?.no}</Descriptions.Item>
          <Descriptions.Item label="患者姓名">{cloneRow?.name}</Descriptions.Item>
          <Descriptions.Item label="诊断信息">{cloneRow?.diagnosis}</Descriptions.Item>
        </Descriptions>
      </Modal>
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
