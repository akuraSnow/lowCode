import { Link } from 'umi';
import React from 'react';
import { PageFormBuilder } from 'dynamic-builder';
import {
  deleteVisibility,
  getVisibility,
  updateVisibility,
} from '@/services/api';

@PageFormBuilder({
  jsonName: 'config/visibilityData/index.json',
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
      const { data } = await getVisibility();

      res(
        data.map((item: any, index: any) => {
          item.key = index;
          return item;
        }),
      );
    });
  }

  async deleteVisibility(res: any) {
    await deleteVisibility(res);
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

  async handleCancel(params: any, self: any) {
    await updateVisibility(params);
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
}
