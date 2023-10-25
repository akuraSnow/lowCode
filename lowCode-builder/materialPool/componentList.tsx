import skeleton from '../skeleton/index';
console.log('skeleton: ', skeleton);

let componentList: any = [];

for (const key in skeleton) {
  console.log('skeleton: ', skeleton[key]);

  componentList.push(skeleton[key]);
}

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
          value: 'label',
        },
      },
    },
  },

  {
    id: 'dataBinding',
    type: 'input',
    label: 'dataBinding',
    dataBinding: {
      path: 'dataBinding',
    },
    layoutDefinition: {
      row: 2,
      column: 1,
      columnSpan: 12,
      labelCol: 12,
      wrapperCol: 24,
      layout: 'vertical',
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
  },
];

export default componentList;
