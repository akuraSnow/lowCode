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
    let fields: any = sessionStorage.getItem('name');
    console.log('fields: ', fields);

    this.setJson(JSON.parse(fields));
  }
}

export default connect(({ treeData }: any) => ({
  treeData,
}))(Home);
