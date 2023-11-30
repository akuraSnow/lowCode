import skeleton from '../skeleton/index';
let componentList: any = [];

for (const key in skeleton) {
  componentList.push(skeleton[key]);
}

export default componentList;

export const attributeJson = [
  {
    id: 'label',
    type: 'input',
    label: '文本内容',
    dataBinding: {
      path: 'label',
    },
    layout: {
      layout: 'vertical',
      grid: '0',
    },
    action: {
      onblur: {
        name: 'changeStaticBind',
        params: {
          type: 'label',
        },
      },
    },
  },
  {
    id: 'dataBinding',
    type: 'input',
    label: '绑定key',
    dataBinding: {
      path: 'dataBinding.path',
    },
    layout: {
      layout: 'vertical',
      grid: '1',
    },
    action: {
      onblur: {
        name: 'changeStaticBind',
        params: {
          type: 'dataBinding',
        },
      },
    },
  },
  {
    id: 'switch1',
    type: 'switch',
    label: '数据源',
    dataBinding: {
      path: 'hasdataSource',
      grid: '2',
    },
    layout: {},
    action: {
      onchange: {
        name: 'switchProperties',
        params: {
          type: 'dataSource',
        },
      },
    },
  },
  {
    id: 'dataSource',
    type: 'select',
    dataSourceAction: 'getDataSource',
    metaData: {
      path: 'staticData',
      showSearch: true,
    },
    dataBinding: {
      path: 'dataSource',
    },
    layout: {},
    visibility: 'hidden',
    visibilityAction: 'checkVisible',
    action: {
      onchange: {
        name: 'setDataSource',
        params: {
          type: 'dataSource',
        },
      },
    },
  },

  {
    id: 'switch4',
    type: 'switch',
    label: '验证规则',
    dataBinding: {
      path: 'hasvalidator',
    },
    layout: {},
    action: {
      onchange: {
        name: 'switchProperties',
        params: {
          type: 'validator',
        },
      },
    },
  },
  {
    id: 'validator',
    type: 'select',
    dataSourceAction: 'getDataSource',
    metaData: {
      path: 'calculator',
      mode: 'multiple',
    },
    dataBinding: {
      path: 'validator',
    },
    layout: {},
    visibility: 'hidden',
    visibilityAction: 'checkVisible',
    action: {
      onchange: {
        name: 'setValidators',
        params: {
          type: 'validator',
        },
      },
    },
  },
  {
    id: 'switch3',
    type: 'switch',
    label: '显示状态',
    dataBinding: {
      path: 'hasvisibility',
    },
    layout: {},
    action: {
      onchange: {
        name: 'switchProperties',
        params: {
          type: 'visibility',
        },
      },
    },
  },
  {
    id: 'visibility',
    type: 'select',
    dataSource: [
      { label: '隐藏', value: 'hidden' },
      { label: '必填', value: 'required' },
      { label: '禁用', value: 'disable' },
    ],
    metaData: {
      path: 'visibility',
    },
    dataBinding: {
      path: 'visibility',
    },
    layout: {},
    visibility: 'hidden',
    visibilityAction: 'checkVisible',
    action: {
      onchange: {
        name: 'setVisibility',
        params: {
          type: 'visibility',
        },
      },
    },
  },

  {
    id: 'switch2',
    type: 'switch',
    label: 'labelAction',
    dataBinding: {
      path: 'haslabelAction',
    },
    layout: {},
    action: {
      onchange: {
        name: 'switchProperties',
        params: {
          type: 'labelAction',
        },
      },
    },
  },
  {
    id: 'labelAction',
    type: 'select',
    dataSourceAction: 'getDataSource',
    metaData: {
      path: 'dataSource',
    },
    dataBinding: {
      path: 'labelAction',
    },
    layout: {},
    visibility: 'hidden',
    visibilityAction: 'checkVisible',
    action: {
      onchange: {
        name: 'setDataSource',
        params: {
          type: 'dataSource',
        },
      },
    },
  },
];

export const widthContainerJson = [
  {
    id: 'width',
    type: 'number',
    label: 'width',
    dataBinding: {
      path: 'scaleValue',
    },
    layout: {
      grid: '0 0',
    },
    action: {
      onblur: {
        name: 'changeWidth',
        params: {
          type: 'width',
        },
      },
    },
  },
  {
    id: 'widthUnit',
    type: 'select',
    dataSource: [
      {
        label: 'px',
        value: 'px',
      },
      {
        label: '%',
        value: '%',
      },
    ],
    dataBinding: {
      path: 'unit',
    },
    layout: {
      grid: '0 1',
    },
    action: {
      onchange: {
        name: 'changeWidth',
        params: {
          type: 'width',
        },
      },
    },
  },
];

export const heightContainerJson = [
  {
    id: 'height',
    type: 'number',
    label: 'height',
    dataBinding: {
      path: 'scaleValue',
    },
    layout: {
      grid: '0 0',
    },
    action: {
      onblur: {
        name: 'changeWidth',
        params: {
          type: 'height',
        },
      },
    },
  },
  {
    id: 'heightUnit',
    type: 'select',
    dataSource: [
      {
        label: 'px',
        value: 'px',
      },
      {
        label: '%',
        value: '%',
      },
    ],
    dataBinding: {
      path: 'unit',
    },
    layout: {
      grid: '0 1',
    },
    action: {
      onchange: {
        name: 'changeWidth',
        params: {
          type: 'height',
        },
      },
    },
  },
];
