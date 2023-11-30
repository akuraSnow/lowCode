import {
  chooseComponentSubject,
  updateDataSubject,
  updateFunSubject,
} from '@/services';
import { PageFormBuilder, iocContainer } from 'dynamic-builder';
import {
  attributeJson,
  widthContainerJson,
  heightContainerJson,
} from '../../../../lowCode-builder/materialPool/componentList';
import { connect } from 'umi';
import { cloneDeep, debounce, throttle } from 'lodash';
import { operateItem } from '@/utils';

@PageFormBuilder({
  json: [],
  provider: [],
})
class Attribute {
  [x: string]: any;

  private componentData: any;
  private chooseKey: any;

  constructor(props: any) {
    const { optionList } = props;

    this.optionList = optionList;

    this.changeStaticBind = debounce(this.changeStaticBind, 1000);
    this.getData = debounce(this.getData, 1000);
  }

  componentDidMount() {}

  onPropsChange(props: any) {
    this.props = props;
    const {
      optionList,
      container,
      treeData: { count, chooseKey },
    } = this.props;
    if (chooseKey !== this.chooseKey) {
      operateItem(cloneDeep(count), chooseKey, (element: any, i: any) => {
        if (element.type == 'container') {
          this.handleContainer(element);
        } else {
          this.handleComponent(element);
        }
      });
      this.chooseKey = chooseKey;
    }

    if (JSON.stringify(optionList) !== JSON.stringify(this.optionList)) {
      this.optionList = optionList;
    }
  }

  handleContainer(element: any) {
    const {
      treeData: { count, chooseKey },
    } = this.props;

    const keyList = chooseKey.split('-');
    const parentKey = keyList.splice(0, keyList.length - 1).join('-');

    operateItem(cloneDeep(count), parentKey, (element: any, i: any) => {
      const { type } = element;
      const { width: elWidth, height: elHeight } = element.children.filter(
        (item: any) => item.key === chooseKey,
      )[0];

      let viewModel: any;
      let json: any;
      let scaleValue: any;

      if (type === 'rowContainer') {
        json = widthContainerJson;
        scaleValue = elWidth;
      } else {
        json = heightContainerJson;
        scaleValue = elHeight;
      }

      if (!scaleValue) {
        viewModel = {
          scaleValue: 100,
          unit: '%',
        };
      } else {
        const isPx = scaleValue.indexOf('px') > -1;
        const value = scaleValue
          ? isPx
            ? scaleValue.replace('px', '')
            : scaleValue.replace('%', '')
          : 100;
        viewModel = {
          scaleValue: value,
          unit: isPx ? 'px' : '%',
        };
      }

      this.setJson({ fields: [] });

      setTimeout(() => {
        this.setJson({ fields: json });
      }, 10);

      this.viewModel.scaleValue = viewModel.scaleValue;
      this.viewModel.unit = viewModel.unit;
    });
  }

  handleComponent(element: any) {
    const {
      label,
      type,
      dataBinding,
      dataSource,
      visibility,
      validator,
      labelAction,
    } = element;
    if (!iocContainer.skeleton.has(type)) {
      this.setJson({
        fields: [],
      });
    } else {
      const hasvisibility = !!visibility;
      const hasdataSource = !!dataSource;
      const haslabelAction = !!labelAction;
      const hasvalidators = !!validator;

      this.viewModel = {
        label: label,
        dataBinding,
        visibility,
        labelAction,
        hasvisibility,
        hasdataSource,
        haslabelAction,
        hasvalidators,
      };

      this.setJson({ fields: [] });

      setTimeout(() => {
        this.setJson({
          fields: attributeJson,
        });
      }, 10);
    }
  }

  checkVisible(params: any) {
    const {
      field: {
        dataBinding: { path },
      },
    } = params;
    return this.viewModel[`has${path}`] ? 'visible' : 'hidden';
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

  getDataSource(res: any) {
    const {
      field: {
        metaData: { path },
      },
    } = res;

    const data = this.optionList[path].map((item: any) => {
      const { name, content } = item;
      return {
        label: name,
        value: name,
      };
    });
    return data;
  }

  changeWidth({ type }: any) {
    console.log('params: ', type);

    const {
      dispatch,
      treeData: { count, chooseKey },
    } = this.props;

    const newCont = operateItem(count, chooseKey, (element: any) => {
      const scale = `${this.viewModel.scaleValue || 100}${
        this.viewModel.unit || '%'
      }`;
      element[type] = scale;
      return element;
    });

    dispatch({
      type: 'treeData/changeTree',
      payload: { count: newCont },
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
    const funValue = this.optionList[type].filter(
      (e: any) => e.name === value,
    )[0];

    updateDataSubject.next({
      name: 'dataSourceAction',
      value: value,
      optionList: { [value]: `function main(){ return ${funValue.content};}` },
    });
  }
  setValidators(params: any) {
    const { type } = params;
    const value = JSON.parse(JSON.stringify(this.viewModel))[type];
    const calculatorValue = this.optionList.calculator.filter((e: any) =>
      value.includes(e.name),
    );
    const funValue: any = {};
    calculatorValue.forEach(({ name, content }: any) => {
      funValue[name] = content;
    });

    updateDataSubject.next({
      name: 'validator',
      value: calculatorValue.map((e: any) => ({ name: e.name })),
      optionList: funValue,
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
    const { id } = this.componentData;
    updateFunSubject.next({ id, type, value });
  }

  getData(params: any) {
    const { type } = params;
    const { id } = this.componentData;

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
