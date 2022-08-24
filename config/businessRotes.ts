// 业务菜单

export default [
  {
    path: '/customerManage',
    name: '客户管理',
    access: 'hasMenu',
    icon: 'DesktopOutlined',
    routes: [
      {
        path: '/customerManage',
        redirect: '/customerManage/loan',
      },
      {
        path: '/customerManage/loan',
        name: '借款企业管理',
        access: 'hasMenu',
        component: './customerManage/loan',
      },
      {
        path: '/customerManage/loan/detail',
        name: '借款企业管理详情',
        // access: 'hasMenu',
        component: './customerManage/loan/Detail',
      },
      {
        path: '/customerManage/cooperate',
        name: '合作企业管理',
        access: 'hasMenu',
        component: './customerManage/cooperateClient',
      },
      {
        path: '/customerManage/cooperate/detail',
        name: '合作企业管理详情',
        // access: 'hasMenu',
        component: './customerManage/cooperateClient/Detail',
      },
      {
        path: '/customerManage/menu',
        name: '菜单管理',
        access: 'hasMenu',
        icon: 'SettingOutlined',
        component: './customerManage/menu',
      },
    ],
  },
  {
    path: '/creditLoanManage',
    name: '信贷管理',
    access: 'hasMenu',
    icon: 'DesktopOutlined',
    routes: [
      {
        path: '/creditLoanManage',
        redirect: '/creditLoanManage/creditManage',
      },
      {
        path: '/creditLoanManage/creditManage',
        name: '授信管理',
        access: 'hasMenu',
        component: './creditLoanManage/creditManage',
      },
      {
        path: '/creditLoanManage/creditManage/detail',
        name: '授信管理详情',
        component: './creditLoanManage/creditManage/Detail',
      },
      {
        path: '/creditLoanManage/inventoryManage',
        name: '库存管理',
        access: 'hasMenu',
        routes: [
          {
            path: '/creditLoanManage/inventoryManage/search',
            name: '库存查询',
            access: 'hasMenu',
            component: './creditLoanManage/inventoryManage/search',
          },
          {
            path: '/creditLoanManage/inventoryManage/enter',
            name: '入库管理',
            access: 'hasMenu',
            component: './creditLoanManage/inventoryManage/enter',
          },
          {
            path: '/creditLoanManage/inventoryManage/enter/detail',
            name: '入库管理详情',
            // access: 'hasMenu',
            component: './creditLoanManage/inventoryManage/enter/Detail',
          },
          {
            path: '/creditLoanManage/inventoryManage/delivery',
            name: '出库管理',
            access: 'hasMenu',
            component: './creditLoanManage/inventoryManage/delivery',
          },
        ],
      },
    ],
  },
  {
    path: '/riskMonitoring',
    name: '风险监控',
    access: 'hasMenu',
    icon: 'DesktopOutlined',
    routes: [
      {
        path: '/riskMonitoring',
        redirect: '/riskMonitoring/ruleCenter',
      },
      {
        path: '/riskMonitoring/ruleCenter',
        name: '规则中心',
        access: 'hasMenu',
        routes: [
          {
            path: '/riskMonitoring/ruleCenter/collateralRules',
            name: '押品规则配置',
            access: 'hasMenu',
            component: './riskMonitoring/ruleCenter/collateralRules',
          },
        ],
      },
    ],
  },
  {
    path: '/basicManage',
    name: '基础管理',
    access: 'hasMenu',
    icon: 'DesktopOutlined',
    routes: [
      {
        path: '/basicManage',
        redirect: '/basicManage/productManage',
      },
      {
        path: '/basicManage/productManage',
        name: '商品管理',
        access: 'hasMenu',
        routes: [
          {
            path: '/basicManage/productManage',
            redirect: '/basicManage/productManage/product',
          },
          {
            path: '/basicManage/productManage/product',
            name: '商品管理',
            access: 'hasMenu',
            component: './basicManage/productManage/product',
          },
        ],
      },
      {
        path: '/basicManage/warehouseManage',
        name: '仓储管理',
        access: 'hasMenu',
        routes: [
          {
            path: '/basicManage/warehouseManage',
            redirect: '/basicManage/warehouseManage/warehouse',
          },
          {
            path: '/basicManage/warehouseManage/warehouse',
            name: '仓储管理',
            access: 'hasMenu',
            component: './basicManage/warehouseManage/warehouse',
          },
        ],
      },
      {
        path: '/basicManage/contractManage',
        name: '合同管理',
        access: 'hasMenu',
        routes: [
          {
            path: '/basicManage/contractManage',
            redirect: '/basicManage/contractManage/agreement',
          },
          {
            path: '/basicManage/contractManage/agreement',
            name: '合同协议列表',
            access: 'hasMenu',
            component: './basicManage/contractManage/agreement',
          },
          {
            path: '/basicManage/contractManage/templates',
            name: '合同模板管理',
            access: 'hasMenu',
            component: './basicManage/contractManage/templates',
          },
        ],
      },
    ],
  },
]
