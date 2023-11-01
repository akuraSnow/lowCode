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
    // this.viewModel = {
    //   model1: fa
    // };
  }

  showModel(params: any) {
    console.log(
      'params: ',
      this.target.updateField([
        { id: 'model111', metaData: { title: 'fff', open: true } },
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

  openModels(res: any) {
    console.log('res: ', res);
    console.log('openModels', this);

    this.target.updateField([
      {
        id: 'table',
        metaData: {
          open: true,
          title: '111',
        },
      },
    ]);
    // this.viewModel.model1 = true;
  }

  calculatorDataBtn() {
    return <div>fdfsadsd</div>;
  }

  handleCancel(params: any) {
    this.viewModel.model1 = false;
  }

  getModelLabel() {
    console.log('this.target: ', this);
    return this.target.label;
  }

  getInputAction() {
    return 'fdfd';
  }
}
