import { Link } from 'umi';
import React from 'react';
import { PageFormBuilder } from 'dynamic-builder';

@PageFormBuilder({
  jsonName: 'config/calculatorData.json',
  provider: [],
})
export default class CalculatorData {
  [x: string]: any;

  private label = '新增';

  constructor(props: any) {
    this.viewModel = {
      model1: {},
    };
  }

  showModel(params: any) {
    console.log(
      'params: ',
      this.target.updateField([
        { id: 'model111', metaData: { title: '新增', open: true } },
      ]),
    );
    // this.viewModel.model1 = true;
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

    this.target.updateField([
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
    console.log('params: ', params);
    console.log('self: ', self);

    // this.viewModel
    console.log('this.viewModel: ', this.viewModel);
    this.target.updateField([
      {
        id: 'model111',
        metaData: {
          open: false,
        },
      },
    ]);
  }

  getModelLabel() {
    console.log('this.target: ', this);
    return this.target.label;
  }

  getInputAction() {
    return 'fdfd';
  }
}
