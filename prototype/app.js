const roles = {
  province: {
    name: "省级管理员",
    scope: "河南省全省数据；可管理配置、共享、年报和全省质控。",
    menus: ["dashboard", "cards", "quality", "followup", "duplicate", "exchange", "analytics", "annual", "sharing", "config", "audit"],
  },
  city: {
    name: "地市登记员",
    scope: "郑州市本级及下辖区县；处理辖区审核、查重和统计。",
    menus: ["dashboard", "cards", "quality", "followup", "duplicate", "exchange", "analytics", "audit"],
  },
  county: {
    name: "县区审核员",
    scope: "金水区辖区数据；负责初复审、人口维护和随访监督。",
    menus: ["dashboard", "cards", "quality", "followup", "duplicate", "analytics", "audit"],
  },
  hospital: {
    name: "医疗机构填报员",
    scope: "河南省人民医院本机构数据；可录入、修正和上传。",
    menus: ["dashboard", "cards", "followup", "exchange"],
  },
  share: {
    name: "数据共享审批员",
    scope: "省级授权共享申请；可审批脱敏文件交付。",
    menus: ["dashboard", "sharing", "audit"],
  },
};

const menuMeta = {
  dashboard: ["工作台", "按角色展示待办、质控、上报与共享概况"],
  cards: ["报告卡管理", "登记、维护、查询、克隆、作废与恢复"],
  quality: ["审核质控", "多级审核、退回驳回、规则校验、纠错工单"],
  followup: ["随访死亡", "随访计划、死亡更新、死因补录和批量随访"],
  duplicate: ["重卡治理", "患者查重、报告卡查重、合并和多原发"],
  exchange: ["数据交换", "模板导入、接口接入、失败重传和上报跟踪"],
  analytics: ["统计分析", "发病率、死亡率、月报、完整性和交叉报表"],
  annual: ["结构化年报", "模板化生成、图表插入、导出和归档"],
  sharing: ["数据共享", "申请审批、脱敏策略、文件交付和下载留痕"],
  config: ["配置中心", "区划机构、字典、表单、规则、流程和接口映射"],
  audit: ["系统审计", "报卡、随访、地址、操作、登录和共享日志"],
};

const mock = {
  cards: [
    ["HN-2026-000183", "张秀兰", "女", "63", "郑州市金水区", "C50.9 乳腺恶性肿瘤", "待县区审核", "警告"],
    ["HN-2026-000184", "王建国", "男", "71", "洛阳市涧西区", "C34.1 上叶肺癌", "正式", "通过"],
    ["JX-2026-000041", "刘梅", "女", "52", "南昌市东湖区", "C18.7 乙状结肠癌", "退回修正", "错误"],
    ["HN-2026-000185", "赵海", "男", "45", "许昌市魏都区", "C22.0 肝细胞癌", "待省级终审", "通过"],
  ],
  tasks: [
    ["审核", "HN-2026-000183", "身份证地址缺少社区编码", "金水区疾控中心", "今日 09:32"],
    ["重卡", "HN-2026-000177", "疑似与 HN-2025-009812 重复", "河南省人民医院", "今日 10:18"],
    ["上传失败", "批次 HIS-20260605-03", "第 17 行 ICD-O-3 编码缺失", "郑大一附院", "今日 11:05"],
    ["共享审批", "REQ-2026-014", "省肿瘤研究所申请肺癌脱敏数据", "省级平台", "昨日 16:44"],
  ],
  followups: [
    ["张秀兰", "HN-2026-000183", "2026-06-20", "计划随访", "河南省人民医院"],
    ["王建国", "HN-2026-000184", "2026-07-01", "存活", "洛阳市中心医院"],
    ["陈国强", "HN-2025-008432", "2026-05-28", "死亡待更新", "许昌市人民医院"],
  ],
  exchange: [
    ["HIS-20260605-03", "HIS 肿瘤登记", "河南省人民医院", "128", "17", "校验失败"],
    ["CAUS-20260605-01", "死因登记", "江西省全民健康信息平台", "42", "0", "已入库"],
    ["NCC-EXPORT-202606", "国家癌症中心上报", "省级平台", "2684", "0", "待上报"],
  ],
  shares: [
    ["REQ-2026-014", "省肿瘤研究所", "肺癌 2021-2025 脱敏病例", "待审批", "2026-06-04"],
    ["REQ-2026-011", "江西省疾控中心", "结直肠癌地区分布汇总", "已交付", "2026-05-29"],
    ["REQ-2026-009", "郑州大学课题组", "乳腺癌生存分析样本", "退回补充", "2026-05-25"],
  ],
};

let state = {
  role: "province",
  page: "dashboard",
  filter: "",
  emptyMode: false,
};

const $ = (selector) => document.querySelector(selector);

function init() {
  const roleSelect = $("#roleSelect");
  Object.entries(roles).forEach(([key, role]) => {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = role.name;
    roleSelect.appendChild(option);
  });
  roleSelect.value = state.role;
  roleSelect.addEventListener("change", () => {
    state.role = roleSelect.value;
    const allowed = roles[state.role].menus;
    state.page = allowed.includes(state.page) ? state.page : allowed[0];
    state.emptyMode = false;
    render();
    toast(`已切换为：${roles[state.role].name}`);
  });

  document.body.addEventListener("click", handleClick);
  document.body.addEventListener("input", handleInput);
  render();
}

function render() {
  renderMenu();
  $("#roleScope").textContent = roles[state.role].scope;
  const [title, subtitle] = menuMeta[state.page];
  $("#pageTitle").textContent = title;
  $("#pageSubtitle").textContent = subtitle;
  const renderer = pages[state.page] || pages.dashboard;
  $("#content").innerHTML = renderer();
}

function renderMenu() {
  const allowed = roles[state.role].menus;
  $("#menu").innerHTML = allowed
    .map((key) => {
      const count = key === "dashboard" ? mock.tasks.length : key === "cards" ? mock.cards.length : "";
      return `<button class="${state.page === key ? "active" : ""}" data-page="${key}">
        <span>${menuMeta[key][0]}</span>${count ? `<span class="badge">${count}</span>` : ""}
      </button>`;
    })
    .join("");
}

const pages = {
  dashboard() {
    const visibleTasks = filterRows(mock.tasks);
    return `
      <div class="grid cols-4">
        ${metric("今日上报", "286", "较昨日 +12.4%")}
        ${metric("待审核", roleNumber({ province: 43, city: 21, county: 12, hospital: 3, share: 0 }), "含 8 条超时")}
        ${metric("质控异常", "17", "错误 5 / 警告 12")}
        ${metric("重卡待处理", "9", "疑似多原发 2")}
      </div>
      <div class="grid cols-3" style="margin-top:14px">
        <section class="panel" style="grid-column: span 2">
          ${panelHead("待办任务", toolbar("输入编号/机构/类型", "taskSearch", "simulateEmpty"))}
          <div class="panel-body">${taskTable(visibleTasks)}</div>
        </section>
        <section class="panel">
          ${panelHead("癌种发病排行", `<button data-action="export">导出</button>`)}
          <div class="panel-body">${bars([["肺癌", 92], ["乳腺癌", 76], ["结直肠癌", 61], ["肝癌", 49], ["胃癌", 38]])}</div>
        </section>
      </div>
      <div class="grid cols-3" style="margin-top:14px">
        <section class="panel">${panelHead("接口状态", `<button data-page="exchange">查看</button>`)}<div class="panel-body">${miniList(["HIS 同步成功 111 条", "死因平台入库 42 条", "国家平台待上报 2684 条"])}</div></section>
        <section class="panel">${panelHead("随访提醒", `<button data-page="followup">处理</button>`)}<div class="panel-body">${miniList(["本周计划随访 36 人", "死亡待更新 4 人", "逾期随访 7 人"])}</div></section>
        <section class="panel">${panelHead("权限提示", `<button data-action="permissionDemo">测试</button>`)}<div class="panel-body"><p>当前角色：${roles[state.role].name}</p><p>菜单会随角色实时变化，越权操作会弹出提示。</p></div></section>
      </div>`;
  },
  cards() {
    const rows = state.emptyMode ? [] : filterRows(mock.cards);
    return tablePage("报告卡列表", "新增报告卡", ["登记编号", "姓名", "性别", "年龄", "区划", "诊断", "状态", "校验"], rows, ["查看", "编辑", "提交审核", "作废"], "cardSearch");
  },
  quality() {
    const rows = state.emptyMode ? [] : mock.tasks.filter((x) => ["审核", "上传失败"].includes(x[0]));
    return tablePage("审核质控工作台", "发布质控规则", ["类型", "业务编号", "异常说明", "来源机构", "时间"], rows, ["审核", "退回", "驳回", "转协查"], "qualitySearch");
  },
  followup() {
    return tablePage("随访与死亡记录", "新增随访", ["姓名", "登记编号", "最后接触日期", "接触状态", "报告机构"], state.emptyMode ? [] : mock.followups, ["随访", "死亡补录", "回退"], "followSearch");
  },
  duplicate() {
    const rows = state.emptyMode ? [] : [
      ["DUP-001", "HN-2026-000183 / HN-2025-009812", "身份证+姓名+出生日期", "疑似重复", "高"],
      ["DUP-002", "HN-2026-000185 / HN-2024-006381", "姓名+电话+地址", "疑似多原发", "中"],
    ];
    return tablePage("重卡治理", "运行查重", ["组号", "关联记录", "查重依据", "判断", "风险"], rows, ["对比合并", "快速合并", "标记多原发"], "dupSearch");
  },
  exchange() {
    return tablePage("数据交换任务", "上传文件", ["批次号", "类型", "来源", "总数", "错误", "状态"], state.emptyMode ? [] : mock.exchange, ["查看日志", "错误导出", "重传", "入库"], "exchangeSearch");
  },
  analytics() {
    return `
      <section class="panel">
        ${panelHead("统计分析", `<button data-action="export">导出报表</button>`)}
        <div class="panel-body">
          <div class="toolbar">
            <select><option>年度统计</option><option>季度统计</option><option>月度统计</option></select>
            <select><option>全省</option><option>郑州市</option><option>南昌市</option></select>
            <select><option>全部性别</option><option>男</option><option>女</option></select>
            <button data-action="query">查询</button>
            <button data-action="simulateEmpty">模拟空数据</button>
          </div>
          ${state.emptyMode ? empty("当前筛选条件下暂无统计结果", "请调整年度、区划或癌种后重试。") : bars([["肺癌发病率", 58], ["乳腺癌发病率", 42], ["结直肠癌发病率", 36], ["胃癌死亡率", 28], ["肝癌死亡率", 24]])}
        </div>
      </section>`;
  },
  annual() {
    return cardsPanel("结构化年报", [
      ["2025 河南省肿瘤登记年报", "数据完整，待生成 Word/PDF", "生成"],
      ["2024 河南省肿瘤登记年报", "已归档，版本 V3", "下载"],
      ["2025 江西省结构化年报", "缺少东湖区死亡人口分母", "查看问题"],
    ]);
  },
  sharing() {
    return tablePage("数据共享审批", "新建共享申请", ["申请编号", "申请单位", "数据范围", "状态", "申请日期"], state.emptyMode ? [] : mock.shares, ["审批", "退回", "生成脱敏文件", "下载留痕"], "shareSearch");
  },
  config() {
    return cardsPanel("配置中心", [
      ["表单模板", "报告卡三段式表单、随访、死亡、协查字段配置", "配置"],
      ["质控规则", "身份证、ICD、日期、跨字段逻辑、自定义条件", "发布"],
      ["审核流程", "按区划、机构、来源、报卡类型配置节点", "设计"],
      ["接口映射", "HIS/LIS/PACS/国家平台字段与编码映射", "测试"],
      ["字典管理", "解剖部位、病理类型、常规字典、逻辑字典", "维护"],
      ["菜单权限", "角色、按钮、数据范围、高风险操作授权", "授权"],
    ]);
  },
  audit() {
    const rows = [
      ["2026-06-05 11:42", roles[state.role].name, "导出", "报告卡查询导出 128 条", "成功"],
      ["2026-06-05 11:08", "县区审核员", "退回", "HN-2026-000183 地址编码缺失", "成功"],
      ["2026-06-05 10:55", "医疗机构填报员", "提交", "新增报告卡 HN-2026-000185", "成功"],
      ["2026-06-05 10:21", "数据共享审批员", "下载", "REQ-2026-011 脱敏包", "成功"],
    ];
    return tablePage("系统审计日志", "导出日志", ["时间", "用户", "动作", "内容", "结果"], state.emptyMode ? [] : rows, ["查看详情"], "auditSearch");
  },
};

function metric(label, value, note) {
  return `<section class="panel metric"><span>${label}</span><strong>${value}</strong><small>${note}</small></section>`;
}

function roleNumber(values) {
  return values[state.role] ?? values.province;
}

function panelHead(title, actions = "") {
  return `<div class="panel-head"><h2>${title}</h2><div class="top-actions">${actions}</div></div>`;
}

function toolbar(placeholder, inputId, emptyAction) {
  return `<div class="toolbar"><input id="${inputId}" placeholder="${placeholder}" value="${state.filter}"><button data-action="query">查询</button><button data-action="${emptyAction}">模拟空数据</button></div>`;
}

function tablePage(title, primaryText, headers, rows, actions, inputId) {
  const body = rows.length ? dataTable(headers, rows, actions) : empty("没有找到符合条件的数据", "可以调整筛选条件，或点击新增/上传创建数据。");
  return `<section class="panel">${panelHead(title, `<button data-action="simulateEmpty">模拟空数据</button><button class="primary" data-action="openForm">${primaryText}</button>`)}
    <div class="panel-body">
      ${toolbar("输入编号、姓名、机构或状态", inputId, "simulateEmpty")}
      ${body}
    </div>
  </section>`;
}

function dataTable(headers, rows, actions) {
  return `<table><thead><tr>${headers.map((h) => `<th>${h}</th>`).join("")}<th>操作</th></tr></thead><tbody>
    ${rows.map((row) => `<tr>${row.map((cell) => `<td>${formatCell(cell)}</td>`).join("")}<td><div class="row-actions">${actions.map((a) => `<button data-action="rowAction" data-label="${a}">${a}</button>`).join("")}</div></td></tr>`).join("")}
  </tbody></table>`;
}

function taskTable(rows) {
  if (state.emptyMode || !rows.length) return empty("暂无待办任务", "当前角色没有待处理事项，系统会在新任务产生后自动提醒。");
  return dataTable(["类型", "业务编号", "说明", "来源", "时间"], rows, ["处理", "退回", "详情"]);
}

function formatCell(cell) {
  const text = String(cell);
  if (["正式", "已入库", "成功", "通过", "已交付", "存活"].includes(text)) return `<span class="tag green">${text}</span>`;
  if (["错误", "校验失败", "退回修正", "退回补充"].includes(text)) return `<span class="tag red">${text}</span>`;
  if (["待县区审核", "待省级终审", "待审批", "待上报", "计划随访", "死亡待更新"].includes(text)) return `<span class="tag amber">${text}</span>`;
  if (["警告", "疑似重复", "疑似多原发"].includes(text)) return `<span class="tag blue">${text}</span>`;
  return text;
}

function empty(title, desc) {
  return `<div class="empty"><div><strong>${title}</strong><span>${desc}</span><div style="margin-top:14px"><button data-action="resetEmpty">恢复模拟数据</button></div></div></div>`;
}

function miniList(items) {
  return `<div class="timeline">${items.map((item) => `<div class="timeline-item"><strong>${item}</strong><span>点击可进入对应业务页面处理</span></div>`).join("")}</div>`;
}

function bars(items) {
  const max = Math.max(...items.map((x) => x[1]));
  return `<div class="chart-bars">${items.map(([label, value]) => `<div class="bar-row"><span>${label}</span><div class="bar-track"><div class="bar" style="width:${Math.round((value / max) * 100)}%"></div></div><strong>${value}</strong></div>`).join("")}</div>`;
}

function cardsPanel(title, items) {
  return `<section class="panel">${panelHead(title, `<button data-action="simulateError">模拟异常</button>`)}
    <div class="panel-body"><div class="grid cols-3">
      ${items.map(([name, desc, action]) => `<div class="panel"><div class="panel-body"><h3>${name}</h3><p>${desc}</p><button class="primary" data-action="rowAction" data-label="${action}">${action}</button></div></div>`).join("")}
    </div></div>
  </section>`;
}

function filterRows(rows) {
  if (!state.filter) return rows;
  return rows.filter((row) => row.join(" ").includes(state.filter));
}

function handleInput(event) {
  if (event.target.matches(".toolbar input")) {
    state.filter = event.target.value.trim();
    render();
  }
}

function handleClick(event) {
  const button = event.target.closest("button");
  if (!button) return;
  const page = button.dataset.page;
  if (page) {
    if (!roles[state.role].menus.includes(page)) {
      toast("当前角色没有该菜单权限");
      return;
    }
    state.page = page;
    state.filter = "";
    state.emptyMode = false;
    render();
    return;
  }

  const action = button.dataset.action;
  if (!action) return;
  const label = button.dataset.label || button.textContent.trim();
  const actions = {
    refresh: () => toast("数据已刷新，最新任务状态已同步"),
    notify: () => openModal("系统通知", `<p>今日 11:05，HIS 批次 HIS-20260605-03 存在 17 条错误记录，请相关机构处理。</p>`),
    quickCreate: () => openFormModal(),
    openForm: () => openFormModal(),
    closeModal: () => closeModal(),
    confirmModal: () => validateModalForm(),
    query: () => toast("查询完成"),
    simulateEmpty: () => {
      state.emptyMode = true;
      render();
      toast("已切换为空数据场景");
    },
    resetEmpty: () => {
      state.emptyMode = false;
      render();
      toast("已恢复模拟数据");
    },
    simulateError: () => openModal("异常提示", `<p><span class="tag red">生成失败</span></p><p>缺少东湖区 2025 年死亡人口分母数据，无法完成死亡率指标计算。</p>`),
    export: () => toast("导出任务已创建，完成后可在审计日志查看下载记录"),
    permissionDemo: () => {
      if (state.role === "hospital") toast("权限不足：医疗机构填报员不可访问共享审批和配置中心");
      else toast("权限校验通过：当前角色可执行该操作");
    },
    rowAction: () => openModal(label, detailContent(label)),
  };
  (actions[action] || (() => toast(`已点击：${label}`)))();
}

function openFormModal() {
  openModal("新增报告卡", `
    <div class="form-grid" id="modalForm">
      ${field("姓名", "patientName", "请输入患者姓名")}
      ${field("身份证号", "idCard", "请输入 18 位身份证号")}
      ${field("性别", "gender", "请选择性别", "select", ["女", "男"])}
      ${field("出生日期", "birthday", "请选择出生日期", "date")}
      ${field("户籍区划", "region", "请选择到县区以下地址")}
      ${field("诊断", "diagnosis", "请输入诊断名称")}
      ${field("ICD-10", "icd10", "请输入 ICD-10 编码")}
      ${field("ICD-O-3", "icdo3", "请输入 ICD-O-3 编码")}
      <div class="field" style="grid-column:1/-1"><label>备注</label><textarea placeholder="可填写质控说明或报告来源"></textarea></div>
    </div>
    <p style="color:#64748b;margin-bottom:0">提示：直接点确认会触发表单必填和身份证规则校验。</p>
  `);
}

function field(label, id, error, type = "text", options = []) {
  if (type === "select") {
    return `<div class="field" data-field="${id}"><label>${label}</label><select><option value="">请选择</option>${options.map((x) => `<option>${x}</option>`).join("")}</select><span class="error">${error}</span></div>`;
  }
  return `<div class="field" data-field="${id}"><label>${label}</label><input type="${type}" placeholder="${label}"><span class="error">${error}</span></div>`;
}

function validateModalForm() {
  const form = $("#modalForm");
  if (!form) {
    closeModal();
    toast("操作已确认并写入审计日志");
    return;
  }
  let ok = true;
  form.querySelectorAll(".field[data-field]").forEach((fieldEl) => {
    const input = fieldEl.querySelector("input,select,textarea");
    const name = fieldEl.dataset.field;
    let invalid = !input.value.trim();
    if (name === "idCard" && input.value.trim() && !/^\d{17}[0-9Xx]$/.test(input.value.trim())) invalid = true;
    fieldEl.classList.toggle("invalid", invalid);
    if (invalid) ok = false;
  });
  if (!ok) {
    toast("提交失败：请补全必填项并检查身份证号");
    return;
  }
  closeModal();
  toast("报告卡已暂存，校验通过后进入审核流程");
}

function detailContent(label) {
  return `
    <div class="timeline">
      <div class="timeline-item"><strong>${label}已打开</strong><span>系统展示业务详情、字段校验结果和操作记录。</span></div>
      <div class="timeline-item"><strong>质控结果</strong><span>身份证逻辑通过；ICD-O-3 编码需复核；地址精确到社区。</span></div>
      <div class="timeline-item"><strong>审计留痕</strong><span>确认后会记录用户、角色、机构、时间、动作和前后状态。</span></div>
    </div>`;
}

function openModal(title, html) {
  $("#modalTitle").textContent = title;
  $("#modalBody").innerHTML = html;
  $("#modal").classList.remove("hidden");
}

function closeModal() {
  $("#modal").classList.add("hidden");
}

function toast(message) {
  const el = $("#toast");
  el.textContent = message;
  el.classList.remove("hidden");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => el.classList.add("hidden"), 2600);
}

init();
