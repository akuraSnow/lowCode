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
      console.log('res: ', res);
      this.componentData = res;
      if (!iocContainer.skeleton.has(type)) {
        this.setJson({
          fields: [],
        });
      } else {
        const json = iocContainer.skeleton.get(type);
        const jsonData = attributeJson.filter((item: any) =>
          json.hasOwnProperty(item.id),
        );

        // this.viewModel = {
        //   ...json,
        //   ...executeJs,
        //   label
        // };

        this.setJson({
          fields: jsonData,
        });
      }
    });

    this.changeLabel = debounce(this.changeLabel, 1000);
    this.getData = debounce(this.getData, 1000);
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
    console.log('value: ', type);
    console.log('value: ', this.target.componentData);
    const { id } = this.target.componentData;

    updateFunSubject.next({
      id,
      type,
      value: JSON.parse(JSON.stringify(this.viewModel))[type],
    });
  }
}

export default connect(({ treeData }: any) => ({
  treeData,
}))(Attribute);
