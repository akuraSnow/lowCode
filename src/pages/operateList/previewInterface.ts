import { PageFormBuilder } from 'dynamic-builder';
import { connect } from 'umi';

@PageFormBuilder({
  json: [],
  provider: [],
})
class Home {
  [x: string]: any;

  constructor(props: any) {
    this.viewModel = { premium: 111 };
    let fields: any = sessionStorage.getItem("name");
  
    this.setJson({
      fields: JSON.parse(fields),
    });
  }



  getInputAction() {
    return '我是一个大写的人';
  }

  getViewModel() {
    console.log(this.viewModel);
  }

  convertLblPaymentAmount() {
    return {
      set: (value: any) => {
        return value;
      },
      get: (value: any) => {
        return value;
      },
    };
  }
}


export default connect(({ treeData }: any) => ({
  treeData,
}))(Home);
