import { Link } from 'umi';
import React from 'react';
import { PageFormBuilder } from 'dynamic-builder';
import {
  deleteJsonByPath,
  getJsonByPath,
  updateJsonByPath,
} from '@/services/api';

@PageFormBuilder({
  jsonName: 'config/staticData/index.json',
  provider: [],
})
export default class VisibilityData {
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

  async getVisibilityData() {
    return new Promise(async (res) => {
      const { data } = await getJsonByPath({ path: 'staticData' });

      res(
        data.map((item: any, index: any) => {
          item.key = index;
          return item;
        }),
      );
    });
  }

  async deleteVisibility(res: any) {
    await deleteJsonByPath({ ...res, path: 'staticData' });
    const dataSource = await this.getVisibilityData();
    this.updateField([
      {
        id: 'table',
        dataSource,
      },
    ]);
  }

  openModels(res: any) {
    this.viewModel.model1 = {
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

  async handleOk(params: any, self: any) {
    await updateJsonByPath({ ...params, path: 'staticData' });
    const dataSource = await this.getVisibilityData();
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
}
