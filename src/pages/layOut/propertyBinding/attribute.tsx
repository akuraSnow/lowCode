import { chooseComponentSubject, updateDataSubject } from '@/services';
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

  constructor(props: any) {
    chooseComponentSubject.subscribe((res: any) => {
      if (!iocContainer.skeleton.has(res.type)) {
        this.setJson({
          fields: [],
        });
      } else {
        const json = iocContainer.skeleton.get(res.type);
        const jsonData = attributeJson.filter((item: any) =>
          json.hasOwnProperty(item.id),
        );

        this.setJson({
          fields: jsonData,
        });

        this.viewModel = json;
      }
    });

    this.changeLabel = debounce(this.changeLabel, 1000);
  }

  changeLabel(params: any) {
    const { value } = params;
    console.warn('value: ', value);

    updateDataSubject.next({
      name: value,
      value: JSON.parse(JSON.stringify(this.viewModel))[value],
    });
  }
}

export default connect(({ treeData }: any) => ({
  treeData,
}))(Attribute);
