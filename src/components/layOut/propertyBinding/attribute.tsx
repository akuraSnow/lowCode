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
          const jsonData = attributeJson.filter((item: any) =>
            json.hasOwnProperty(item.id),
          );

          this.viewModel = {
            ...json,
            ...executeJs,
            label,
          };

          this.setJson({
            fields: jsonData,
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

  changeWidth() {
    console.warn('value: ', this.viewModel);

    updateDataSubject.next({
      name: 'width',
      value: JSON.parse(JSON.stringify(this.viewModel))['width'],
    });
  }

  changeLabel(params: any) {
    const { type } = params;
    console.warn('value: ', type);

    updateDataSubject.next({
      name: type,
      value: JSON.parse(JSON.stringify(this.viewModel))[type],
    });
  }

  getData(params: any) {
    const { type } = params;
    const { id } = this.componentData;

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
