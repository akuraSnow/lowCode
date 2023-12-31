import { PageFormBuilder } from 'dynamic-builder';
import {
  deleteJsonByPath,
  getJsonByPath,
  updateJsonByPath,
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
      const { data } = await getJsonByPath({ path: 'calculator' });
      if (data && data.length) {
        res(
          data.map((item: any, index: any) => {
            item.key = index;
            item.edit = true;
            return item;
          }),
        );
      } else {
        res([]);
      }
    });
  }

  async deleteCalculator(res: any) {
    await deleteJsonByPath({ ...res, path: 'calculator' });
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

  async handleOk(params: any, self: any) {
    await updateJsonByPath({ ...this.viewModel.modal1, path: 'calculator' });
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
