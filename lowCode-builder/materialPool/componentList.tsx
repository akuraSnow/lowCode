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
                row: 0,
                column: 1,
                columnSpan: 12,
                labelCol: 6,
                wrapperCol: 24,
                layout: 'vertical',
              },
              action: {
                onchange: {
                  name: 'changeLabel',
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
                row: 2,
                column: 1,
                columnSpan: 12,
                labelCol: 12,
                wrapperCol: 24,
                layout: 'vertical',
              },
              action: {
                onblur: {
                  name: 'getData',
                  params: {
                    type: 'dataBinding',
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
              id: 'switch1',
              type: 'switch',
              label: 'dataSource',
              dataBinding: {
                path: 'hasdataSource',
              },
              layoutDefinition: {
                order: '0',
              },
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
              layoutDefinition: {
                order: '1',
              },
              visibility: 'hidden',
            },
            {
              id: 'switch2',
              type: 'switch',
              label: 'labelAction',
              dataBinding: {
                path: 'haslabelAction',
              },
              layoutDefinition: {
                order: '2',
              },
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
              layoutDefinition: {
                order: '3',
              },
              visibility: 'hidden',
            },

            {
              id: 'switch3',
              type: 'switch',
              label: 'visibility',
              dataBinding: {
                path: 'hasvisibility',
              },
              layoutDefinition: {
                order: '4',
              },
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
              dataSourceAction: 'getDataSource',
              metaData: {
                path: 'visibility',
              },
              dataBinding: {
                path: 'visibility',
              },
              layoutDefinition: {
                order: '5',
              },
              visibility: 'hidden',
            },

            {
              id: 'switch4',
              type: 'switch',
              label: 'validators',
              dataBinding: {
                path: 'hasvalidators',
              },
              layoutDefinition: {
                order: '6',
              },
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
              layoutDefinition: {
                order: '7',
              },
              visibility: 'hidden',
            },
          ],
        },
      ],
    },
  },
];

// {
//   id: 'Checkbox',
//   type: 'checkbox',
//   label: '其他属性',
//   dataBinding: {
//     path: 'transfer',
//   },
//   layoutDefinition: {
//     row: 2,
//     column: 1,
//     columnSpan: 12,
//     labelCol: 12,
//     wrapperCol: 24,
//     layout: 'vertical',
//   },
//   metaData: {
//     titles: ['事件', '已选绑定']
//   },
//   action: {
//     onchange: {
//       name: 'getData',
//       params: {
//         type: 'dataBinding',
//       },
//     },
//   },
// },
// {
//   id: 'dataSource',
//   type: 'codeeditor',
//   label: 'dataSource',
//   dataBinding: {
//     path: 'dataSource',
//   },
//   layoutDefinition: {
//     row: 1,
//     column: 1,
//     columnSpan: 12,
//     labelCol: 12,
//     wrapperCol: 24,
//     layout: 'vertical',
//   },
//   action: {
//     onchange: {
//       name: 'getData',
//       params: {
//         type: 'dataSource',
//       },
//     },
//   },
// },

// {
//   id: 'labelAction',
//   type: 'codeeditor',
//   label: 'labelAction',
//   dataBinding: {
//     path: 'labelAction',
//   },
//   layoutDefinition: {
//     row: 4,
//     column: 1,
//     columnSpan: 12,
//     labelCol: 12,
//     wrapperCol: 24,
//     layout: 'vertical',
//   },
//   action: {
//     onchange: {
//       name: 'getData',
//       params: {
//         type: 'labelAction',
//       },
//     },
//   },
// },
// {
//   id: 'validators',
//   type: 'codeeditor',
//   label: 'validators',
//   dataBinding: {
//     path: 'validators',
//   },
//   layoutDefinition: {
//     row: 6,
//     column: 0,
//     columnSpan: 12,
//     wrapperCol: 24,
//     layout: 'vertical',
//   },
//   action: {
//     onchange: {
//       name: 'getData',
//       params: {
//         type: 'validators',
//       },
//     },
//   },
// },
// {
//   id: 'visibility',
//   type: 'codeeditor',
//   label: 'visibility',
//   dataBinding: {
//     path: 'visibility',
//   },
//   layoutDefinition: {
//     row: 8,
//     column: 0,
//     columnSpan: 12,
//     wrapperCol: 24,
//     layout: 'vertical',
//   },
//   action: {
//     onchange: {
//       name: 'getData',
//       params: {
//         type: 'visibility',
//       },
//     },
//   },
// },
