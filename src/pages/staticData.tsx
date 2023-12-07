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
export default class staticData {
  [x: string]: any;

  staticDataList: any = [];
  tableMetaData: any = {};
  columns: any = [
    {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      render: [
        {
          type: 'save',
          element: '<div>保存</div>',
          onclick: {
            name: 'saveData',
          },
        },
      ],
    },
  ];

  constructor() {}

  showModel(params: any) {
    this.viewModel.model1 = {
      name: '',
      rowName: '',
      content: '',
    };

    this.staticDataList = [];
    this.columns = [
      {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        render: [
          {
            type: 'save',
            element: '<div>保存</div>',
            onclick: {
              name: 'saveData',
            },
          },
        ],
      },
    ];
    this.tableMetaData = {
      columns: this.columns,
      editable: true,
    };
    this.updateField([
      { id: 'model111', metaData: { title: '新增', open: true } },
    ]);
  }

  async getStaticData() {
    return new Promise(async (res) => {
      const { data } = await getJsonByPath({ path: 'staticData' });

      if (data && data.length) {
        res(
          data.map((item: any, index: any) => {
            item.key = index;
            return item;
          }),
        );
      } else {
        res([]);
      }
    });
  }

  async deleteStaticData(res: any) {
    await deleteJsonByPath({ ...res, path: 'staticData' });
    const dataSource = await this.getStaticData();
    this.updateField([
      {
        id: 'table',
        dataSource,
      },
    ]);
  }

  openModels(res: any) {
    const metaData: any = new Function(`return ${res.content}`)();
    const columns: any[] = [
      {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        render: [
          {
            type: 'save',
            element: '<div>保存</div>',
            onclick: {
              name: 'saveData',
            },
          },
        ],
      },
    ];

    for (const key in metaData[0]) {
      if (Object.prototype.hasOwnProperty.call(metaData[0], key)) {
        if (!['key'].includes(key)) {
          columns.push({
            title: key,
            dataIndex: key,
            key: key,
          });
        }
      }
    }

    this.viewModel.model1 = {
      name: res.name,
      rowName: '',
      content: metaData,
    };

    this.staticDataList = metaData;
    this.columns = columns;
    this.tableMetaData = {
      columns,
      editable: true,
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

  getTableMetaData() {
    return this.props.tableMetaData;
  }

  modelTableDataSource() {
    return this.props.staticDataList;
  }

  async handleOk(params: any, self: any) {
    const { viewModel } = params;

    const sendData = {
      name: viewModel.name,
      content: JSON.stringify(params.props.staticDataList),
    };

    await updateJsonByPath({ ...sendData, path: 'staticData' });
    const dataSource = await this.getStaticData();
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

  saveData(newData: any) {
    console.log('newData: ', newData);
    this.props.staticDataList = newData;

    this.updateField([
      {
        id: 'table222',
        dataSource: newData,
      },
    ]);
  }

  addCol() {
    const { rowName } = this.viewModel;

    const hasCol = this.props.columns.some((e: any) => e.dataIndex === rowName);

    if (rowName && !hasCol) {
      this.props.columns.push({
        title: rowName,
        dataIndex: rowName,
        key: rowName,
      });
      this.updateField([
        {
          id: 'table222',
          metaData: {
            columns: this.props.columns,
          },
        },
      ]);
    }
  }

  removeCol() {
    const { rowName } = this.viewModel;

    if (rowName) {
      this.props.columns = this.props.columns.filter(
        (e: any) => e.key !== rowName,
      );

      this.props.staticDataList = this.props.staticDataList.map((item: any) => {
        delete item[rowName];
        return item;
      });
      this.updateField([
        {
          id: 'table222',
          metaData: {
            columns: this.props.columns,
          },
        },
      ]);
    }
  }

  addRow() {
    let newData: any = {};
    const columns = this.props.columns;
    for (const key in columns) {
      newData[columns[key].dataIndex] = undefined;
    }
    newData.key = this.props.staticDataList.length + 1;
    this.props.staticDataList.push(newData);

    this.updateField([
      {
        id: 'table222',
        dataSource: JSON.parse(JSON.stringify(this.props.staticDataList)),
      },
    ]);
  }
}
