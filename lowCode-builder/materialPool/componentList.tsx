import skeleton from '../skeleton/index';
let componentList: any = [];

for (const key in skeleton) {
  componentList.push(skeleton[key]);
}

export default componentList;

export const attributeJson = [
  {
    id: 'card',
    type: 'card',
    label: '静态属性',
    dataBinding: {
      path: 'static',
    },
    layoutDefinition: {
      order: '0',
    },
    metaData: {
      width: '100%',
      activeTabKey: 'static',
      tabProps: {
        size: 'small',
      },
      tabList: [
        {
          key: 'static',
          tab: '静态属性',
          children: [
            {
              id: 'label',
              type: 'input',
              label: '文本内容',
              dataBinding: {
                path: 'label',
              },
              layoutDefinition: {
                layout: 'vertical',
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
              layoutDefinition: {
                layout: 'vertical',
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
              },
              layoutDefinition: {},
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
              layoutDefinition: {},
              visibility: 'hidden',
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
                path: 'hasvalidators',
              },
              layoutDefinition: {},
              action: {
                onchange: {
                  name: 'switchProperties',
                  params: {
                    type: 'validators',
                  },
                },
              },
            },
            {
              id: 'validators',
              type: 'select',
              dataSourceAction: 'getDataSource',
              metaData: {
                path: 'calculator',
                mode: 'multiple',
              },
              dataBinding: {
                path: 'validators',
              },
              layoutDefinition: {},
              visibility: 'hidden',
              action: {
                onchange: {
                  name: 'setValidators',
                  params: {
                    type: 'validators',
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
              layoutDefinition: {},
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
              layoutDefinition: {},
              visibility: 'hidden',
              action: {
                onchange: {
                  name: 'setVisibility',
                  params: {
                    type: 'visibility',
                  },
                },
              },
            },
          ],
        },
        {
          key: 'bindFun',
          tab: '方法属性',
          children: [
            {
              id: 'switch2',
              type: 'switch',
              label: 'labelAction',
              dataBinding: {
                path: 'haslabelAction',
              },
              layoutDefinition: {},
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
                path: 'staticData',
              },
              dataBinding: {
                path: 'labelAction',
              },
              layoutDefinition: {},
              visibility: 'hidden',
            },
          ],
        },
      ],
    },
  },
];
