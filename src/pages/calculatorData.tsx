import { Link } from 'umi';
import React from 'react';
import { PageFormBuilder } from 'dynamic-builder';
import {
  deleteCalculator,
  getCalculator,
  updateCalculator,
} from '@/services/api';

@PageFormBuilder({
  jsonName: 'config/calculatorData/index.json',
  provider: [],
})
export default class CalculatorData {
  [x: string]: any;

  constructor() {}

  showModel(params: any) {
    this.viewModel.model1 = {
      name: '',
      content: '',
    };
    this.updateField([
      { id: 'model111', metaData: { title: '新增', open: true } },
    ]);
  }

  async getCalculatorData() {
    return new Promise(async (res) => {
      const { data } = await getCalculator();
      console.log('data: ', data);

      res(
        data.map((item: any, index: any) => {
          item.key = index;
          return item;
        }),
      );
    });
  }

  async deleteCalculator(res: any) {
    await deleteCalculator(res);
    const dataSource = await this.getCalculatorData();
    this.updateField([
      {
        id: 'table',
        dataSource,
      },
    ]);
  }

  openModels(res: any) {
    this.viewModel.modal1 = {
      name: res.name,
      content: res.content,
    };

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

  async handleCancel(params: any, self: any) {
    await updateCalculator(params);
    const dataSource = await this.getCalculatorData();
    this.updateField([
      {
        id: 'model111',
        metaData: {
          open: false,
        },
      },
      {
        id: 'table',
        dataSource,
      },
    ]);
  }
}
