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
    ],
  },
]
