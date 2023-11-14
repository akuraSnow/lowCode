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

    this.changeStaticBind = debounce(this.changeStaticBind, 1000);
    this.getData = debounce(this.getData, 1000);
  }

  componentDidMount() {
    console.log(this);

    chooseComponentSubject.subscribe((res: any) => {
      console.log('res: ', res);
      const { label, type, dataBinding, dataSource, visibility } = res;

      this.componentData = res;

      if (type !== 'container') {
        if (!iocContainer.skeleton.has(type)) {
          this.setJson({
            fields: [],
          });
        } else {
          const json = iocContainer.skeleton.get(type);

          // setTimeout(() => {
          //   this.viewModel = {
          //     label,
          //     dataBinding,
          //     dataSource,
          //     visibility
          //   };
          // })

          this.setJson({
            fields: attributeJson,
          });

          this.viewModel = {
            static: {
              label: 'fdfd',
            },
          };
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
  }

  getDataSource(res: any) {
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
    updateDataSubject.next({
      name: 'width',
      value: JSON.parse(JSON.stringify(this.viewModel))['width'],
    });
  }

  changeStaticBind(params: any) {
    const { type } = params;
    const value = JSON.parse(JSON.stringify(this.viewModel))[type];
    if (Object.prototype.toString.call(value) === '[object Object]') {
      delete value.__path__;
    }

    updateDataSubject.next({
      name: type,
      value: value,
    });
  }

  setDataSource(params: any) {
    const { type } = params;
    const value = JSON.parse(JSON.stringify(this.viewModel))[type];
    updateDataSubject.next({
      name: type,
      value: new Function(`return ${value}`)(),
    });
  }
  setValidators(params: any) {
    const { type } = params;
    const value = JSON.parse(JSON.stringify(this.viewModel))[type];
    const validatorList = value.map((fn: any) => ({ name: value }));

    updateDataSubject.next({
      name: type,
      value: validatorList,
    });
  }
  setVisibility(params: any) {
    const { type } = params;
    const value = JSON.parse(JSON.stringify(this.viewModel))[type];

    updateDataSubject.next({
      name: type,
      value,
    });
  }

  setField(type: any, value: any) {
    const { id } = this.props.componentData;
    updateFunSubject.next({ id, type, value });
  }

  getData(params: any) {
    const { type } = params;
    const { id } = this.props.componentData;

    console.log(JSON.parse(JSON.stringify(this.viewModel))[type]);

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
