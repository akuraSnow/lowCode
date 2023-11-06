import { Link } from 'umi';
import React from 'react';
import { PageFormBuilder } from 'dynamic-builder';

@PageFormBuilder({
  jsonName: 'config/calculatorData.json',
  provider: [],
})
export default class CalculatorData {
  [x: string]: any;

  constructor(props: any) {}

  showModel(params: any) {
    this.viewModel.modal1 = {
      name: 'fdf',
      code: 'ddddd',
    };

    this.updateField([
      { id: 'model111', metaData: { title: '新增', open: true } },
    ]);
  }

  getCalculatorData(res: any) {
    console.log('res: ', res);

    return Promise.resolve([
      {
        key: '1',
        name: 'required',
        firstName: 'fdf',
        content: 32,
        operate: <div>fff</div>,
      },
    ]);
  }

  getCalData(res: any) {
    console.log('res: ', res);

    return Promise.resolve([
      {
        key: '1',
        name: 'required',
        firstName: 'fdf',
        content: 32,
        operate: <div>fff</div>,
      },
    ]);
  }

  openModels(res: any) {
    console.log('res: ', res);
    console.log('openModels', this.viewModel);

    this.updateField([
      {
        id: 'model111',
        metaData: {
          open: true,
          title: '编辑',
        },
      },
    ]);
  }

  calculatorDataBtn() {
    return <div>fdfsadsd</div>;
  }

  handleCancel(params: any, self: any) {
    this.updateField([
      {
        id: 'model111',
        metaData: {
          open: false,
        },
      },
    ]);
  }

  getInputAction() {
    return 'fdfd';
  }
}
