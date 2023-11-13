import {
  chooseComponentSubject,
  updateDataSubject,
  updateFunSubject,
} from '@/services';
import { PageFormBuilder, iocContainer } from 'dynamic-builder';
import { attributeJson } from '../../../../lowCode-builder/materialPool/componentList';
import { connect } from 'umi';
import { debounce, throttle } from 'lodash';

@PageFormBuilder({
  json: [],
  provider: [],
})
class Attribute {
  [x: string]: any;

  private componentData: any;

  constructor(props: any) {
    console.log('props: ', props);
    const { optionList } = props;

    this.optionList = optionList;

    chooseComponentSubject.subscribe((res: any) => {
      const { label, type, executeJs } = res;

      this.componentData = res;

      if (type !== 'container') {
        if (!iocContainer.skeleton.has(type)) {
          this.setJson({
            fields: [],
          });
        } else {
          const json = iocContainer.skeleton.get(type);

          const staticJson = attributeJson.filter((item: any) =>
            json.staticProperties.hasOwnProperty(item.id),
          );
          const bindingMethod = attributeJson.filter((item: any) =>
            json.staticProperties.hasOwnProperty(item.id),
          );

          // const jsonData = attributeJson.filter((item: any) =>
          //   json.hasOwnProperty(item.id),
          // );

          this.viewModel = {
            ...json,
            ...executeJs,
            label,
          };

          this.setJson({
            fields: attributeJson,
          });
        }
      } else {
        this.setJson({
          fields: [
            {
              id: '2',
              type: 'input',
              label: 'width',
              dataBinding: {
                path: 'width',
              },
              layoutDefinition: {
                row: 0,
                column: 0,
                labelCol: 4,
                wrapperCol: 16,
                columnSpan: 12,
                order: '00',
              },
              action: {
                onblur: {
                  name: 'changeWidth',
                },
              },
            },
          ],
        });
      }
    });

    this.changeLabel = debounce(this.changeLabel, 1000);
    this.getData = debounce(this.getData, 1000);
  }

  getDataSource(res: any) {
    console.log('res: ', res);

    const {
      field: {
        metaData: { path },
      },
    } = res;

    const data = this.props.optionList[path].map((item: any) => {
      const { name, content } = item;
      return {
        label: name,
        value: content,
      };
    });
    console.log('data: ', data);
    return data;
  }

  switchProperties(params: any) {
    const { type } = params;
    console.log('type: ', type);
    console.log('type: ', this.viewModel[`has${type}`]);

    this.updateField([
      {
        id: type,
        visibility: this.viewModel[`has${type}`] ? 'required' : 'hidden',
      },
    ]);
  }

  changeWidth() {
    console.warn('value: ', this.viewModel);

    updateDataSubject.next({
      name: 'width',
      value: JSON.parse(JSON.stringify(this.viewModel))['width'],
    });
  }

  changeLabel(params: any) {
    const { type } = params;

    updateDataSubject.next({
      name: type,
      value: JSON.parse(JSON.stringify(this.viewModel))[type],
    });
  }

  getData(params: any) {
    const { type } = params;
    const { id } = this.props.componentData;

    console.log(this.viewModel);

    updateFunSubject.next({
      id,
      type,
      value: JSON.parse(JSON.stringify(this.viewModel))[type],
    });
  }
}

export default connect(({ treeData }: any) => ({
  treeData,
}))(Attribute as any);
