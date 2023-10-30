import { Link } from 'umi';
import React from 'react';
import { PageFormBuilder } from 'dynamic-builder';

@PageFormBuilder({
  jsonName: 'config/calculatorData.json',
  provider: [],
})
export default class CalculatorData {
  [x: string]: any;

  constructor(props: any) {
    this.viewModel = { premium: 111 };
    let fields: any = sessionStorage.getItem('name');

    // this.setJson({
    //     fields: JSON.parse(fields),
    // });
  }

  showModel(params: any) {
    console.log('params: ', params);
  }
}
