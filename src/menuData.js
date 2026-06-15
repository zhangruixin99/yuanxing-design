export const functionMenu = [
  {
    "id": "dashboard",
    "sourceName": "工作台",
    "name": "首页展示",
    "features": [
      {
        "id": "dashboard_01",
        "sourceName": "综合首页",
        "name": "综合首页",
        "description": "按用户角色展示全省/辖区/机构的登记概况、待办任务、质控概览、上传状态和公告资讯。",
        "interactions": "指标卡片、待办列表、地图/区划统计、快捷入口、公告列表、刷新、筛选时间范围。",
        "validation": "用户只能看到授权区划和机构数据；指标口径与正式库统计口径一致；待办数量需与任务列表一致。"
      },
      {
        "id": "dashboard_02",
        "sourceName": "待办中心",
        "name": "待办中心",
        "description": "汇总审核、退回修正、纠错工单、重卡处理、随访计划、死亡更新、上传失败等任务。",
        "interactions": "任务类型筛选、状态筛选、批量处理入口、跳转详情、催办、导出。",
        "validation": "待办按角色、菜单权限、数据范围过滤；已处理任务不得重复处理；超时任务按流程配置标记。"
      }
    ]
  },
  {
    "id": "cards",
    "sourceName": "报告卡管理",
    "name": "报告卡管理",
    "features": [
      {
        "id": "cards_01",
        "sourceName": "报告卡登记",
        "name": "报告卡登记",
        "description": "新增肿瘤发病报告卡，填写发病基本信息、肿瘤报告信息和随访报告信息。",
        "interactions": "新增、暂存、提交、重置、身份证自动解析、地址树选择、字典检索、ICD 自动生成、重卡提示。",
        "validation": "必填项校验；18 位身份证格式校验；身份证与性别、出生日期一致性校验；户籍/常住地址至少精确到配置要求层级；ICD-10/ICD-O-3 根据部位、亚部位、行为、分级、病理类型生成；错误阻断提交，警告允许提交并留痕。"
      },
      {
        "id": "cards_02",
        "sourceName": "报告卡维护",
        "name": "报告卡维护",
        "description": "对授权范围内报告卡进行查询、查看、编辑和逻辑删除。",
        "interactions": "查询、重置、详情、编辑、删除、按行政区划/校验状态/报卡类型/日期/登记编号/姓名/身份证筛选。",
        "validation": "仅允许编辑权限范围内且状态允许编辑的记录；删除为逻辑删除并进入作废卡管理；编辑需重新触发校验和审计。"
      },
      {
        "id": "cards_03",
        "sourceName": "报告卡查询",
        "name": "报告卡查询",
        "description": "面向统计、审核、管理用户查询报告卡并导出结果。",
        "interactions": "条件查询、详情查看、导出 Excel/CSV、克隆入口、列设置。",
        "validation": "导出受权限控制；敏感字段按角色脱敏；克隆仅限登记中心等授权角色；查询结果不得越权。"
      },
      {
        "id": "cards_05",
        "sourceName": "作废卡管理",
        "name": "作废卡管理",
        "description": "管理逻辑删除后的报告卡，支持查询、恢复和物理删除。",
        "interactions": "查询、详情、导出、还原、物理删除、批量选择。",
        "validation": "还原需恢复到删除前状态；物理删除为高风险动作，需单独授权、二次确认和审计；已物理删除不可恢复。"
      }
    ]
  },
  {
    "id": "followup",
    "sourceName": "随访与死亡管理",
    "name": "随访管理",
    "features": [
      {
        "id": "followup_01",
        "sourceName": "随访信息管理",
        "name": "随访信息管理",
        "description": "维护存活患者随访记录，展示历史随访并新增最新随访。",
        "interactions": "查询、详情、随访列表、添加随访、修改最新随访、删除最新随访、批量随访上传。",
        "validation": "随访记录按时间倒序；仅最新随访可修改/删除；至少保留一条有效随访记录；最后接触日期和状态需成对填写。"
      },
      {
        "id": "followup_02",
        "sourceName": "批量随访",
        "name": "批量随访",
        "description": "通过模板批量更新患者随访信息。",
        "interactions": "模板下载、文件上传、校验结果、错误导出、批量入库、逐条处理。",
        "validation": "文件格式和字段校验；患者/报告卡匹配校验；死亡状态需补充死亡日期、死因、死亡地点；错误记录不得批量入库。"
      },
      {
        "id": "followup_03",
        "sourceName": "随访计划",
        "name": "随访计划",
        "description": "按规则生成随访任务并分配给机构或人员。",
        "interactions": "计划生成、任务列表、分派、提醒、完成登记、逾期筛选。",
        "validation": "计划生成规则按癌种、诊断日期、最后接触状态配置；死亡、作废、归档记录不生成常规随访任务；逾期状态自动计算。"
      },
      {
        "id": "followup_04",
        "sourceName": "死亡信息管理",
        "name": "死亡信息管理",
        "description": "管理已死亡报告卡及死亡随访记录。",
        "interactions": "查询、详情、随访记录查看、死亡回退、导出。",
        "validation": "仅死亡状态记录显示；死亡回退仅可删除最新且唯一有效的死亡随访记录；回退后记录回到随访信息管理。"
      },
      {
        "id": "followup_05",
        "sourceName": "死因补录",
        "name": "死因补录",
        "description": "对死因数据匹配到已有发病记录但尚未更新的病例进行补录。",
        "interactions": "待补录列表、匹配详情、补录表单、提交、驳回、转协查。",
        "validation": "死因记录必须匹配患者或报告卡；补录死亡信息需满足死亡日期、根本死因、死亡地点等必填规则；补录后记录状态更新并留痕。"
      }
    ]
  },
  {
    "id": "duplicate",
    "sourceName": "重卡与主档案",
    "name": "重卡管理",
    "features": [
      {
        "id": "duplicate_01",
        "sourceName": "肿瘤登记报告查重",
        "name": "肿瘤登记报告查重",
        "description": "对报告卡进行自动或手动查重，识别重复报告和疑似多原发。",
        "interactions": "查重分析、分组展示、展开详情、对比合并、快速合并、标记多原发。",
        "validation": "查重范围限有效唯一卡；可疑多原发需提示并阻断快速合并；合并后保留来源卡关系；重复处理不可造成数据丢失。"
      },
      {
        "id": "duplicate_02",
        "sourceName": "发病人口信息查重",
        "name": "发病人口信息查重",
        "description": "对患者/发病人口信息进行查重和合并。",
        "interactions": "查重依据选择、查询、分组展示、对比合并、信息合并。",
        "validation": "查重依据支持身份证、姓名电话、联系人电话、姓名性别出生日期地址等组合；人口合并需同步空间地址、报告卡、随访、死亡记录关系。"
      },
      {
        "id": "duplicate_03",
        "sourceName": "重卡关系查看",
        "name": "重卡关系查看",
        "description": "查询已合并报告卡的主卡与来源卡关系，追溯重卡合并来源。",
        "interactions": "条件查询、登记编号详情、展示或隐藏合并来源信息、导出。",
        "validation": "仅展示授权范围内已形成重卡关系的记录；合并来源关系不可在查看页修改；详情需保留来源卡与目标卡关系。"
      },
      {
        "id": "duplicate_05",
        "sourceName": "多原发管理",
        "name": "多原发关系查看",
        "description": "标记、查看和还原多原发关系。",
        "interactions": "标记多原发、关系查看、快速还原、详情展开。",
        "validation": "多原发判断需记录依据；还原需恢复标记前状态；多原发记录不按重复卡合并。"
      },
      {
        "id": "duplicate_06",
        "sourceName": "自动查重参数",
        "name": "自动查重参数",
        "description": "配置查重字段组合和查重条件。",
        "interactions": "字段组合新增/编辑/删除、条件新增/编辑/删除、与/或逻辑、启停。",
        "validation": "查重条件必须引用已启用字段组合；字段组合不能为空；删除已引用参数需先停用或解除引用。"
      },
      {
        "id": "duplicate_07",
        "sourceName": "合并字段参数",
        "name": "合并字段参数",
        "description": "配置合并时各字段默认取值优先级。",
        "interactions": "字段列表、编辑优先级、启停、说明。",
        "validation": "优先级策略需在允许范围内；停用字段不得参与自动合并；规则变更需版本留痕。"
      }
    ]
  },
  {
    "id": "base",
    "sourceName": "基础数据管理",
    "name": "基础信息管理",
    "features": [
      {
        "id": "base_01",
        "sourceName": "发病人口信息管理",
        "name": "发病人口信息管理",
        "description": "维护患者基础信息和人口归属。",
        "interactions": "查询、新增、编辑、删除、详情、批量转换区划、过滤行政区划。",
        "validation": "身份信息校验；人口归属调整需授权；批量转换需记录原区划和目标区划；常住地址联动调整需显式勾选。"
      },
      {
        "id": "base_02",
        "sourceName": "空间地址信息管理",
        "name": "空间地址信息管理",
        "description": "维护患者户籍、常住、经纬度等地址历史。",
        "interactions": "查询、地址历史列表、添加、修改最新地址、删除最新地址。",
        "validation": "地址历史按时间倒序；仅最新地址可修改；地址区划编码必须有效；修改需写入空间地址日志。"
      }
    ]
  },
  {
    "id": "analytics",
    "sourceName": "统计分析",
    "name": "数据分析统计",
    "features": [
      {
        "id": "analytics_01",
        "sourceName": "年龄组发病数分析",
        "name": "年龄组发病数分析",
        "description": "按年龄组、部位、性别、区划、时间统计发病数量。",
        "interactions": "条件筛选、图表/表格切换、导出 Excel。",
        "validation": "统计范围限正式有效数据；年龄按配置分组；日期类型和区间合法。"
      },
      {
        "id": "analytics_02",
        "sourceName": "年龄组发病率分析",
        "name": "年龄组发病率分析",
        "description": "基于区域人口或标准人口计算年龄组发病率。",
        "interactions": "条件筛选、人口口径选择、导出、下钻。",
        "validation": "分母人口数据必须存在；发病率计算公式固定并可追溯；分母为 0 时提示不可计算。"
      },
      {
        "id": "analytics_03",
        "sourceName": "年龄组死亡数分析",
        "name": "年龄组死亡数分析",
        "description": "按年龄组、部位、性别、区划、时间统计死亡数量。",
        "interactions": "条件筛选、图表/表格切换、导出。",
        "validation": "仅统计死亡状态或有效死亡记录；死亡日期区间合法；重复死亡记录需去重。"
      },
      {
        "id": "analytics_04",
        "sourceName": "年龄组死亡率分析",
        "name": "年龄组死亡率分析",
        "description": "基于死亡人口或区域人口计算年龄组死亡率。",
        "interactions": "条件筛选、人口口径选择、导出、下钻。",
        "validation": "分母数据必须存在；死亡率公式固定；分母为 0 时提示不可计算。"
      },
      {
        "id": "analytics_05",
        "sourceName": "综合部位数据分析",
        "name": "综合部位数据分析",
        "description": "按癌种/部位综合展示发病、死亡及趋势。",
        "interactions": "区划、截止日期、报卡范围、时间统计类型、性别筛选、导出。",
        "validation": "部位分组按 ICD/配置字典执行；统计口径与报表一致；数据范围不得越权。"
      },
      {
        "id": "analytics_06",
        "sourceName": "月报表",
        "name": "月报表",
        "description": "按区划、单位、用户统计月度报告数量。",
        "interactions": "按区划/单位/用户切换、年份、日期类型、报卡范围、导出。",
        "validation": "月份按日期类型计算；作废、驳回记录不进入正式口径；导出结果与页面一致。"
      },
      {
        "id": "analytics_07",
        "sourceName": "报告完整性",
        "name": "报告完整性",
        "description": "按区划、单位、用户统计报告完整性情况。",
        "interactions": "年份、日期类型、报卡范围、明细下钻、导出。",
        "validation": "完整性规则按质控配置计算；缺失项需可下钻查看；统计范围限授权数据。"
      },
      {
        "id": "analytics_08",
        "sourceName": "交叉报表",
        "name": "交叉报表",
        "description": "用户自定义纵横维度生成交叉统计。",
        "interactions": "日期范围、ICD 分组、年龄分组、纵向项目、横向项目、导出。",
        "validation": "纵向和横向项目不可相同或冲突；维度值需来自有效字典；大数据量查询需限制或异步导出。"
      },
      {
        "id": "analytics_09",
        "sourceName": "多维查询与导出",
        "name": "多维查询与导出",
        "description": "按地区、时间、年龄、性别、肿瘤部位等多维筛选并导出。",
        "interactions": "筛选器、列配置、保存查询条件、导出 Excel/PDF/Word。",
        "validation": "敏感字段导出按角色脱敏；批量导出需高风险授权；查询条件需合法且可复现。"
      },
      {
        "id": "analytics_10",
        "sourceName": "生存率分析",
        "name": "生存率分析",
        "description": "基于报告卡、随访和死亡信息统计观察生存率、随访完成率和生存结局等指标。",
        "interactions": "癌种、诊断年份、随访截止日期、性别、年龄组筛选；图表、明细、导出。",
        "validation": "生存分析需基于有效随访和死亡结局；随访截止日期、诊断日期和死亡日期需合法。"
      }
    ]
  },
  {
    "id": "exchange",
    "sourceName": "数据接口",
    "name": "数据接口",
    "features": [
      {
        "id": "exchange_01",
        "sourceName": "接口说明",
        "name": "接口说明",
        "description": "按河南操作手册提供必填说明、上传说明和模板下载。",
        "interactions": "模板下载、接口文档查看、字段说明、版本选择。",
        "validation": "模板版本需与当前字段配置匹配；停用模板不可下载；模板变更需保留历史版本。"
      },
      {
        "id": "exchange_02",
        "sourceName": "数据报表管理",
        "name": "数据报表管理",
        "description": "查询、上传和处理临时库中的批量数据报表。",
        "interactions": "添加文件、上传、校验、批量导入、逐条处理、删除、错误导出。",
        "validation": "文件类型和大小校验；导入类型合法；必填、格式、字典、逻辑规则校验；仅校验通过记录可批量入库；错误提示需可导出。"
      },
      {
        "id": "exchange_03",
        "sourceName": "HIS上传管理",
        "name": "HIS上传管理",
        "description": "从医院业务系统自动或半自动采集肿瘤相关诊疗、检查、病理数据。",
        "interactions": "接口任务、手动拉取、自动同步、日志查看、失败重试、字段映射配置。",
        "validation": "接口认证通过；报文格式合法；字段映射完整；重复数据按来源业务号和主索引规则处理；失败任务可重传。"
      },
      {
        "id": "exchange_04",
        "sourceName": "死因上传管理",
        "name": "死因上传管理",
        "description": "接收死因监测数据并进入匹配、补录和死亡更新流程。",
        "interactions": "文件/接口上传、临时库、匹配结果、逐条处理、批量入库、错误导出。",
        "validation": "死因类型合法；死亡日期、根本死因等必填；匹配成功生成更新待办；匹配失败进入漏单补录或协查。"
      },
      {
        "id": "exchange_05",
        "sourceName": "信息协查管理",
        "name": "信息协查管理",
        "description": "接收或发起协查数据，支持暂存和入库提交。",
        "interactions": "协查上传、暂存提交、入库提交、逐条处理、转办、反馈。",
        "validation": "暂存不进入正式库；入库提交需通过报告卡同等校验；协查数据需保留来源和处理状态。"
      },
      {
        "id": "exchange_06",
        "sourceName": "死因信息管理",
        "name": "死因信息管理",
        "description": "查询死因信息并对已存在发病记录但未更新死亡状态的数据进行漏单补录。",
        "interactions": "查询、登记编号详情、导出 Excel、漏单补录。",
        "validation": "按行政区划、更新状态、死因类型、日期类型和检索内容筛选；补录需满足死亡日期、根本死因、死亡地点等规则。"
      },
      {
        "id": "exchange_07",
        "sourceName": "国家平台上报",
        "name": "国家平台上报",
        "description": "按国家癌症中心要求生成登记卡、随访、人口等上报数据包，并跟踪上报状态和失败重传。",
        "interactions": "生成数据包、上报状态、失败重传、下载介质文件、导入国家平台回流数据。",
        "validation": "上报数据需通过格式、必填、逻辑、重卡和权限校验；失败记录需可导出和重传。"
      },
      {
        "id": "exchange_08",
        "sourceName": "外部平台数据接入",
        "name": "外部平台数据接入",
        "description": "接入医保、LIS、PACS、癌症筛查、慢病监测等外部来源数据并进入临时库处理。",
        "interactions": "来源类型、字段映射、批次校验、匹配结果、入库审批、错误导出。",
        "validation": "外部数据需先进入临时库；字段映射、身份匹配和授权范围校验通过后才可入库。"
      }
    ]
  },
  {
    "id": "annual",
    "sourceName": "结构化年报",
    "name": "结构化年报",
    "features": [
      {
        "id": "annual_01",
        "sourceName": "数据自动汇总",
        "name": "数据自动汇总",
        "description": "按年度、区划、机构层级自动提取年报所需病例、人口和死亡数据。",
        "interactions": "年度选择、区划选择、机构层级、生成汇总、查看明细。",
        "validation": "仅使用正式有效数据；人口分母完整性检查；缺失分母或关键数据时生成问题清单。"
      },
      {
        "id": "annual_02",
        "sourceName": "指标预计算",
        "name": "指标预计算",
        "description": "自动计算发病率、死亡率、年度变化趋势等核心指标。",
        "interactions": "指标列表、重新计算、计算日志、异常提示。",
        "validation": "指标公式固定版本；分母为 0 或缺失时提示；计算结果保留批次和时间戳。"
      },
      {
        "id": "annual_03",
        "sourceName": "年报模板生成",
        "name": "年报模板生成",
        "description": "按固定章节生成结构化年报初稿。",
        "interactions": "模板选择、章节预览、图表插入、文字编辑、保存草稿。",
        "validation": "章节模板必须完整；指标占位符必须能解析；人工编辑保留版本。"
      },
      {
        "id": "annual_04",
        "sourceName": "年报导出与归档",
        "name": "年报导出与归档",
        "description": "导出 Word/PDF 年报并归档历史版本。",
        "interactions": "导出 Word、导出 PDF、版本列表、发布归档、下载。",
        "validation": "导出内容与当前版本一致；发布后版本不可直接修改；下载和发布需留痕。"
      }
    ]
  },
  {
    "id": "regionOrg",
    "sourceName": "区划/机构管理",
    "name": "区划/机构管理",
    "features": [
      {
        "id": "regionOrg_01",
        "sourceName": "区划管理",
        "name": "区划管理",
        "description": "按省、市、县区、乡镇办事处、社区村委会五级维护行政区划。",
        "interactions": "区划树、添加、编辑、删除、返回上一级、撤并至、排序。",
        "validation": "区域编码保存后不可随意调整；删除需先做撤并；撤并至必须为有效区划。"
      },
      {
        "id": "regionOrg_02",
        "sourceName": "机构管理",
        "name": "机构管理",
        "description": "维护登记中心和医疗单位等机构信息。",
        "interactions": "关键字查询、行政区划树筛选、添加、编辑、删除、撤并。",
        "validation": "机构编码按行政区划生成；同一区划只允许一个登记中心；删除需先做撤并。"
      },
      {
        "id": "regionOrg_03",
        "sourceName": "标准人口",
        "name": "标准人口",
        "description": "维护中国标准人口等标准人口年龄组数据。",
        "interactions": "添加中国人口标准、添加、编辑、删除、年度筛选。",
        "validation": "年度和年龄组人口数必填；同一标准同一年度不可重复。"
      },
      {
        "id": "regionOrg_04",
        "sourceName": "区域人口",
        "name": "区域人口",
        "description": "维护区划年度、性别、年龄组人口分母。",
        "interactions": "查询、添加、编辑、删除、年度/性别/区划筛选。",
        "validation": "同一区划同一年度同一性别只允许一套年龄组人口；县区级用户可编辑，其它层级查看。"
      },
      {
        "id": "regionOrg_05",
        "sourceName": "死亡人口",
        "name": "死亡人口",
        "description": "维护区划年度、性别、年龄组死亡人口分母。",
        "interactions": "查询、添加、编辑、删除、年度/性别/区划筛选。",
        "validation": "同一区划同一年度同一性别只允许一套年龄组死亡人口；县区级用户可编辑，其它层级查看。"
      }
    ]
  },
  {
    "id": "consult",
    "sourceName": "辅助功能",
    "name": "咨询管理",
    "features": [
      {
        "id": "consult_01",
        "sourceName": "发布资讯",
        "name": "咨询发布",
        "description": "发布通知、培训资料、政策文件等资讯内容。",
        "interactions": "填写标题、副标题、内容、类别、作者、来源、状态；上传图片和附件；保存草稿；发布。",
        "validation": "标题、类别、作者、来源、内容必填；发布后按类别展示；查看权限为本级及下级用户可见。"
      },
      {
        "id": "consult_02",
        "sourceName": "资讯管理",
        "name": "咨询维护",
        "description": "查询、浏览、编辑和删除已发布或草稿资讯。",
        "interactions": "关键字查询、状态筛选、类别筛选、添加资讯、标题详情、编辑、删除、置顶。",
        "validation": "删除需二次确认并留痕；编辑回调原资讯内容；已发布资讯修改后需记录版本。"
      },
      {
        "id": "consult_03",
        "sourceName": "资讯类别",
        "name": "咨询类别管理",
        "description": "维护资讯类别及首页显示规则。",
        "interactions": "关键字查询、添加类别、编辑、删除、排序、启停、首页显示、撤并至其它类别。",
        "validation": "类别名称必填且不可重复；排序为数字；撤并类别需指定并入类别；首页显示决定首页栏目是否展示。"
      }
    ]
  },
  {
    "id": "quality",
    "sourceName": "审核与质控",
    "name": "自动化规则",
    "features": [
      {
        "id": "quality_01",
        "sourceName": "自动质控规则",
        "name": "自动质控规则",
        "description": "对录入、导入、接口上传数据执行必填、格式、逻辑、编码和自定义校验。",
        "interactions": "规则列表、新增规则、编辑规则、启停、测试规则、发布版本。",
        "validation": "规则表达式必须可解析；规则结果只能为错误、警告、通过；错误阻断保存或入库；规则变更需记录版本和操作人。"
      },
      {
        "id": "quality_02",
        "sourceName": "查重规则",
        "name": "查重规则",
        "description": "配置报告卡查重、发病人口查重、多原发识别等自动规则。",
        "interactions": "字段组合、相似度阈值、查重范围、规则测试、启停、发布。",
        "validation": "字段组合不能为空；阈值需在允许范围内；规则发布后需记录版本。"
      },
      {
        "id": "quality_03",
        "sourceName": "随访计划规则",
        "name": "随访计划规则",
        "description": "按癌种、诊断日期、最后接触状态和随访周期自动生成随访任务。",
        "interactions": "周期配置、适用癌种、排除条件、任务生成、启停、测试。",
        "validation": "死亡、作废、归档记录不生成常规随访；周期规则不可冲突。"
      },
      {
        "id": "quality_04",
        "sourceName": "死因匹配规则",
        "name": "死因匹配规则",
        "description": "配置死因监测数据与发病记录的自动匹配、补录和协查规则。",
        "interactions": "匹配字段、置信度阈值、异常处理、规则测试、启停。",
        "validation": "匹配成功需可追溯依据；低置信度不得自动补录；异常记录进入待处理。"
      },
      {
        "id": "quality_05",
        "sourceName": "接口校验规则",
        "name": "接口校验规则",
        "description": "配置 HIS、死因、协查等接口数据进入临时库后的自动校验规则。",
        "interactions": "模板字段、必填规则、字典映射、逻辑校验、错误级别、发布。",
        "validation": "接口规则需绑定模板版本；错误级别决定是否允许入库；规则变更需留痕。"
      },
      {
        "id": "quality_06",
        "sourceName": "年报校验规则",
        "name": "年报校验规则",
        "description": "配置结构化年报生成前的数据准备度、分母完整性和问题清单规则。",
        "interactions": "年度范围、人口分母检查、重卡完成检查、质量阈值、启停。",
        "validation": "未完成的重卡、分母缺失、未关闭质控问题需阻断发布或提示风险。"
      },
      {
        "id": "quality_07",
        "sourceName": "规则执行记录",
        "name": "规则执行记录",
        "description": "查看自动质控、查重、随访、死因匹配、接口校验和年报校验的执行结果。",
        "interactions": "按规则类型、执行状态、批次、时间查询；查看日志、错误明细、重跑。",
        "validation": "执行记录不可删除；失败记录需保留错误原因和影响数据范围。"
      },
      {
        "id": "quality_08",
        "sourceName": "纠错工单",
        "name": "纠错工单",
        "description": "对异常数据发起修正任务，跟踪修正、复核和关闭。",
        "interactions": "发起工单、指派、修正、提交复核、关闭、退回、工单日志。",
        "validation": "工单必须关联业务记录；关闭前需完成复核；工单处理人需具备数据范围权限；所有修正保留前后值。"
      },
      {
        "id": "quality_09",
        "sourceName": "质量评估报告",
        "name": "质量评估报告",
        "description": "生成完整性、准确性、一致性、漏报率、错误率、及时率等数据质量评估报告。",
        "interactions": "年度、区划、机构、指标口径筛选；图表、明细下钻、导出 PDF/Excel/Word。",
        "validation": "评估指标需有固定口径；只能统计授权范围数据；导出需记录操作日志。"
      }
    ]
  },
  {
    "id": "dict",
    "sourceName": "字典管理",
    "name": "字典管理",
    "features": [
      {
        "id": "dict_01",
        "sourceName": "常规字典",
        "name": "常规字典",
        "description": "维护性别、状态、诊断依据等常规字典项。",
        "interactions": "选择字典、查询、添加、编辑、删除、撤并、排序。",
        "validation": "代码唯一；删除需先撤并；停用后不再用于新增业务。"
      },
      {
        "id": "dict_02",
        "sourceName": "解剖部位",
        "name": "解剖部位",
        "description": "维护肿瘤部位和亚部位编码。",
        "interactions": "部位选择、亚部位列表、添加、编辑、删除。",
        "validation": "部位和亚部位保持父子关系；编码不可重复；删除需先撤并。"
      },
      {
        "id": "dict_03",
        "sourceName": "病理类型",
        "name": "病理类型",
        "description": "维护形态学、行为学和病理类型相关编码。",
        "interactions": "查询、添加、编辑、删除、撤并、状态管理。",
        "validation": "形态学编码和行为学编码合法；关联部位时需满足字典关系。"
      },
      {
        "id": "dict_04",
        "sourceName": "逻辑字典",
        "name": "逻辑字典",
        "description": "维护涉及多个常规字典组合的逻辑字典。",
        "interactions": "选择字典、关键字查询、添加、编辑、删除。",
        "validation": "逻辑字典引用的常规字典项必须有效；删除需进行撤并。"
      },
      {
        "id": "dict_05",
        "sourceName": "自定义条件",
        "name": "自定义条件",
        "description": "维护报告卡逻辑校验使用的自定义条件。",
        "interactions": "关键字查询、创建日期筛选、变量、运算符、保留符、添加条件、编辑、删除。",
        "validation": "条件表达式必须可解析；校验状态为错误/正确时返回语义必须一致。"
      }
    ]
  },
  {
    "id": "audit",
    "sourceName": "审计管理",
    "name": "审计管理",
    "features": [
      {
        "id": "audit_01",
        "sourceName": "报告卡操作日志",
        "name": "报告卡操作日志",
        "description": "查看报告卡新增、编辑、提交、退回、作废、恢复、合并等业务日志。",
        "interactions": "条件查询、详情、日志列表、导出。",
        "validation": "日志不可篡改；记录业务编号、操作人、时间、动作、前后状态。"
      },
      {
        "id": "audit_02",
        "sourceName": "审批流转日志",
        "name": "审批流转日志",
        "description": "查看审批提交、派发、通过、退回、驳回、转办、抄送等流转记录。",
        "interactions": "审批编号查询、业务类型筛选、节点轨迹、意见查看、导出。",
        "validation": "审批日志需记录节点、处理人、账号池、意见和结果；不可篡改。"
      },
      {
        "id": "audit_03",
        "sourceName": "数据接口日志",
        "name": "数据接口日志",
        "description": "查看接口上传、临时库校验、错误导出、入库和失败重试日志。",
        "interactions": "批次查询、接口类型筛选、错误明细、入库结果、导出。",
        "validation": "接口日志需记录来源系统、批次、文件、校验结果和入库数量。"
      },
      {
        "id": "audit_04",
        "sourceName": "数据共享日志",
        "name": "数据共享日志",
        "description": "查看共享申请、审批、脱敏、交付、下载、失效和使用监控日志。",
        "interactions": "申请编号查询、交付包查询、下载记录、使用行为、导出。",
        "validation": "共享日志需记录用途、脱敏策略、下载账号、时间、IP、文件标识和文件版本。"
      },
      {
        "id": "audit_05",
        "sourceName": "系统操作日志",
        "name": "系统操作日志",
        "description": "查看用户在系统中的查询、导出、备份、参数配置、规则发布等操作。",
        "interactions": "关键字查询、日期区间、操作类型、用户筛选、导出。",
        "validation": "高风险动作必须记录；日志查询受权限控制；日志保留周期按配置执行。"
      },
      {
        "id": "audit_06",
        "sourceName": "权限变更日志",
        "name": "权限变更日志",
        "description": "查看用户、角色、菜单授权、数据范围和省份参数变更日志。",
        "interactions": "角色筛选、变更对象、变更前后对比、导出。",
        "validation": "权限变更需记录变更前后内容、操作者、审批结果和生效时间。"
      },
      {
        "id": "audit_07",
        "sourceName": "登录访问日志",
        "name": "登录访问日志",
        "description": "查看登录、退出、密码修改、强制下线、访问异常和 IP 访问记录。",
        "interactions": "用户筛选、IP 筛选、访问结果、异常原因、导出。",
        "validation": "登录失败、异地登录、强制下线等安全事件需单独标记。"
      }
    ]
  },
  {
    "id": "system",
    "sourceName": "系统设置",
    "name": "系统设置",
    "features": [
      {
        "id": "system_00",
        "sourceName": "修改密码",
        "name": "修改密码",
        "description": "用户修改登录密码，适用于首次登录、密码过期或主动修改。",
        "interactions": "填写原密码、新密码、确认新密码，提交修改。",
        "validation": "密码不少于8位，需包含数字、字母和特殊字符；新密码与确认密码一致；密码默认90天过期。"
      },
      {
        "id": "system_01",
        "sourceName": "用户管理",
        "name": "用户管理",
        "description": "管理系统用户、所属区划、机构、部门、联系电话、邮箱和状态。",
        "interactions": "行政区划筛选、关键字查询、添加用户、修改、删除、重置密码、角色权限。",
        "validation": "用户名唯一；行政区划与机构二级联动；新建用户首次登录必须修改密码。"
      },
      {
        "id": "system_02",
        "sourceName": "角色管理",
        "name": "角色管理",
        "description": "维护角色并授权系统菜单和操作权限。",
        "interactions": "添加、修改、删除、授权、权限树勾选。",
        "validation": "角色编码唯一；高风险权限需单独授权；授权变更需记录日志。"
      },
      {
        "id": "system_04",
        "sourceName": "数据备份",
        "name": "数据备份",
        "description": "支持数据库或业务数据备份记录管理。",
        "interactions": "备份任务、手动备份、备份列表、下载/恢复申请。",
        "validation": "备份任务需记录时间、范围、结果；恢复为高风险操作，需审批和审计；备份文件需加密存储。"
      },
      {
        "id": "system_03",
        "sourceName": "在线用户",
        "name": "在线用户",
        "description": "查看当前在线用户并支持强制下线。",
        "interactions": "在线列表、按区划/机构筛选、强制下线。",
        "validation": "仅管理员可强制下线；不能越权查看上级或非授权范围用户；强制下线留痕。"
      },
      {
        "id": "system_05",
        "sourceName": "省份参数",
        "name": "省份参数",
        "description": "按省份维护平台运行参数，包含审批总开关、业务审批开关和审批层级。",
        "interactions": "选择省份、开启/关闭审批、配置报告卡/接口/共享/年报/高风险操作审批、保存参数。",
        "validation": "审批开关按省份生效；关闭审批时隐藏审批菜单并按原业务路径执行；开启审批后相关业务进入审批待办。"
      }
    ]
  },
  {
    "id": "approval",
    "sourceName": "审批管理",
    "name": "审批管理",
    "features": [
      {
        "id": "approval_01",
        "sourceName": "审批人工作台",
        "name": "审批人工作台",
        "description": "集中展示当前审批账号可处理的待审、已处理、抄送和转办任务。",
        "interactions": "待我审批、已处理、抄送我的、转办给我、业务类型筛选、详情、通过、退回、驳回、转办、批量处理。",
        "validation": "仅显示当前角色和数据范围内的待审任务；退回/驳回必须填写意见；审批结果回写业务状态。"
      },
      {
        "id": "approval_02",
        "sourceName": "我发起的",
        "name": "我发起的",
        "description": "查看本人发起的审批事项和流程进度。",
        "interactions": "按业务类型/状态查询、查看审批轨迹、撤回、催办。",
        "validation": "仅流程未处理或允许撤回时可撤回；催办需记录时间和对象。"
      },
      {
        "id": "approval_03",
        "sourceName": "报告卡审核",
        "name": "报告卡审核",
        "description": "对提交后的报告卡按县区、地市、省级节点进行审核。",
        "interactions": "报告卡详情、质控结果、通过、退回、驳回、审批意见、轨迹。",
        "validation": "质控错误不得通过；退回需指定修正项；通过后进入下一节点或正式库。"
      },
      {
        "id": "approval_04",
        "sourceName": "接口入库审核",
        "name": "接口入库审核",
        "description": "对 HIS、死因、协查等临时库数据入正式库前进行审核。",
        "interactions": "批次列表、校验结果、错误明细、通过入库、退回处理。",
        "validation": "仅校验通过或人工处理完成的数据可入库；重卡风险需先处理或标记。"
      },
      {
        "id": "approval_05",
        "sourceName": "数据共享审批",
        "name": "数据共享审批",
        "description": "审批共享申请，确认共享范围、脱敏策略、交付方式和有效期。",
        "interactions": "申请详情、策略选择、同意、退回、驳回、审批意见、交付授权。",
        "validation": "同意必须选择已发布脱敏策略；超范围申请不得通过；审批通过后才可生成交付包。"
      },
      {
        "id": "approval_06",
        "sourceName": "年报发布审批",
        "name": "年报发布审批",
        "description": "对结构化年报发布、归档和外部报送进行审批确认。",
        "interactions": "年报预览、数据准备度、问题清单、通过发布、退回修正。",
        "validation": "存在未关闭的问题清单时不得发布；发布后版本不可直接修改。"
      },
      {
        "id": "approval_07",
        "sourceName": "高风险操作审批",
        "name": "高风险操作审批",
        "description": "审批作废卡物理删除、数据恢复、权限变更、规则发布等高风险操作。",
        "interactions": "风险事项列表、影响范围、审批意见、通过、驳回。",
        "validation": "高风险操作需二次确认并写入审计；权限变更需记录变更前后内容。"
      },
      {
        "id": "approval_08",
        "sourceName": "审批流程配置",
        "name": "审批流程配置",
        "description": "按省份和业务类型配置审批节点、角色、动作和退回策略。",
        "interactions": "流程模板、节点配置、角色绑定、发布、停用、版本查看。",
        "validation": "流程必须包含开始和结束节点；节点角色不能为空；已发布流程修改需生成新版本。"
      }
    ]
  },
  {
    "id": "sharing",
    "sourceName": "数据共享",
    "name": "数据共享",
    "features": [
      {
        "id": "sharing_01",
        "sourceName": "共享申请",
        "name": "共享申请",
        "description": "授权机构或研究项目在线申请使用肿瘤登记数据。",
        "interactions": "申请表、数据范围选择、用途说明、附件上传、提交、撤回。",
        "validation": "申请人需实名认证或账号授权；数据范围不得超过申请人可申请范围；用途、有效期、联系人必填。"
      },
      {
        "id": "sharing_02",
        "sourceName": "共享记录",
        "name": "共享记录",
        "description": "查看已提交、审批中、已通过、已交付和已失效的共享申请全生命周期记录。",
        "interactions": "状态筛选、申请详情、审批轨迹、交付包、下载记录、撤回。",
        "validation": "共享审批统一进入审批管理；共享记录只展示业务状态和后续交付信息。"
      },
      {
        "id": "sharing_03",
        "sourceName": "脱敏策略",
        "name": "脱敏策略",
        "description": "配置共享数据的字段脱敏、过滤和汇总规则。",
        "interactions": "策略新增、字段规则、预览、发布、停用。",
        "validation": "身份证、电话、详细地址等敏感字段必须默认脱敏；策略发布需审批或高权限；策略变更留痕。"
      },
      {
        "id": "sharing_04",
        "sourceName": "文件交付",
        "name": "文件交付",
        "description": "生成脱敏文件包并提供受控下载。",
        "interactions": "生成文件、预览、下载链接、有效期、下载限制、文件标识。",
        "validation": "文件只包含审批通过范围数据；下载需校验有效期和下载限制；每次下载记录用户、时间、IP 和文件版本。"
      },
      {
        "id": "sharing_05",
        "sourceName": "接口服务",
        "name": "接口服务",
        "description": "为授权机构提供受控 API、受控数据服务或介质同步服务。",
        "interactions": "服务申请、鉴权参数、接口范围、使用限制、启停、连通性检查。",
        "validation": "接口服务必须绑定审批通过的共享范围和脱敏策略；调用需鉴权和审计。"
      },
      {
        "id": "sharing_06",
        "sourceName": "使用监控",
        "name": "使用监控",
        "description": "监控共享文件下载、API 调用、受控数据服务访问和异常使用行为。",
        "interactions": "访问趋势、下载记录、调用明细、异常告警、强制失效。",
        "validation": "超过有效期、次数、调用限额或异常 IP 访问需告警并可停用共享服务。"
      }
    ]
  }
];
