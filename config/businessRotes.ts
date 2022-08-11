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
        name: '借款客户管理',
        access: 'hasMenu',
        component: './customerManage/loan',
      },
      {
        path: '/customerManage/loan/detail',
        name: '借款客户管理详情',
        // access: 'hasMenu',
        component: './customerManage/loan/Detail',
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
