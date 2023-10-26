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
    label: 'label',

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
    id: 'dataSource',
    type: 'codeeditor',
    label: 'dataSource',
    dataBinding: {
      path: 'dataSource',
    },
    layoutDefinition: {
      row: 1,
      column: 1,
      columnSpan: 12,
      labelCol: 12,
      wrapperCol: 24,
      layout: 'vertical',
    },
    action: {
      onchange: {
        name: 'getData',
        params: {
          type: 'dataSource',
        },
      },
    },
  },

  {
    id: 'dataBinding',
    type: 'input',
    label: 'dataBinding',
    dataBinding: {
      path: 'path',
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
      onchange: {
        name: 'getData',
        params: {
          type: 'dataBinding',
        },
      },
    },
  },
  {
    id: 'labelAction',
    type: 'codeeditor',
    label: 'labelAction',
    dataBinding: {
      path: 'labelAction',
    },
    layoutDefinition: {
      row: 4,
      column: 1,
      columnSpan: 12,
      labelCol: 12,
      wrapperCol: 24,
      layout: 'vertical',
    },
    action: {
      onchange: {
        name: 'getData',
        params: {
          type: 'labelAction',
        },
      },
    },
  },
  {
    id: 'validators',
    type: 'codeeditor',
    label: 'validators',
    dataBinding: {
      path: 'validators',
    },
    layoutDefinition: {
      row: 6,
      column: 0,
      columnSpan: 12,
      wrapperCol: 24,
      layout: 'vertical',
    },
    action: {
      onchange: {
        name: 'getData',
        params: {
          type: 'validators',
        },
      },
    },
  },
  {
    id: 'visibility',
    type: 'codeeditor',
    label: 'visibility',
    dataBinding: {
      path: 'visibility',
    },
    layoutDefinition: {
      row: 8,
      column: 0,
      columnSpan: 12,
      wrapperCol: 24,
      layout: 'vertical',
    },
    action: {
      onchange: {
        name: 'getData',
        params: {
          type: 'visibility',
        },
      },
    },
  },
];
