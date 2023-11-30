import React, { HTMLAttributes, useEffect, useState } from 'react';
import { connect } from 'umi';
import { ContainerWidth } from './propertyItem/containerWidth';
import InputType from './propertyItem/inputType';
import SelectType from './propertyItem/selectType';
import { operateItem } from '@/utils';
import { iocContainer } from 'dynamic-builder';
import Data from '@/pages/data';
import { cloneDeep } from 'lodash';

const obj: any = {
  width: ContainerWidth,
  text: InputType,
  select: SelectType,
};

const Property = (props: any) => {
  const {
    optionList,
    treeData: { count, chooseKey, functionObj },
    dispatch,
  } = props;

  const [dataList, setDataList] = useState([]);

  console.log('count: ', count);

  const componentList = [
    {
      name: '文本内容',
      type: 'text',
      path: 'label',
      outFunction: (obj: any) => {
        updateDataSubject('label', obj.label, {});
      },
    },
    {
      name: '绑定key',
      type: 'text',
      path: 'path',
      outFunction: (value: any) => {
        updateDataSubject('dataBinding', value, {});
      },
    },
    {
      name: '数据源',
      type: 'select',
      path: 'dataSourceAction',
      option: getOptionList('staticData'),
      outFunction: (value: any) => {
        const funValue = value
          ? optionList.staticData.filter((e: any) => e.name === value)[0]
          : undefined;
        const optionVal = funValue
          ? { [value]: `function main(){ return ${funValue.content};}` }
          : undefined;
        updateDataSubject('dataSourceAction', value, value && optionVal);
      },
    },
    {
      name: '验证规则',
      type: 'select',
      path: 'validator',
      mode: 'multiple',
      option: getOptionList('calculator'),
      outFunction: (value: any) => {
        const calculatorValue = value
          ? optionList.calculator.filter((e: any) => value.includes(e.name))
          : undefined;
        const funValue: any = {};
        (calculatorValue || []).forEach(({ name, content }: any) => {
          funValue[name] = content;
        });

        const data = (calculatorValue || []).map((e: any) => ({
          name: e.name,
        }));
        updateDataSubject('validator', data, funValue);
      },
    },
    {
      name: '显示状态',
      type: 'select',
      path: 'visibility',
      option: [
        { label: '隐藏', value: 'hidden' },
        { label: '必填', value: 'required' },
        { label: '禁用', value: 'disable' },
      ],
      outFunction: (value: any) => {
        updateDataSubject('visibility', value, {});
      },
    },
    {
      name: '文本方法',
      type: 'select',
      path: 'labelAction',
      option: getOptionList('visibility'),
      outFunction: (value: any) => {
        const funValue = value
          ? optionList.visibility.filter((e: any) => e.name === value)[0]
          : undefined;
        const Val = funValue ? { [value]: funValue.content } : undefined;
        updateDataSubject('labelAction', value, Val);
      },
    },
  ];

  useEffect(() => {
    setDataList([]);
    operateItem(count, chooseKey, (element: any) => {
      console.log('element: ', element);

      const { type, validator } = element;

      element.validator = validator
        ? validator.map((item: any) => item.name)
        : undefined;

      if (iocContainer && iocContainer.skeleton.get(type)) {
        const { staticProperties = [] } = iocContainer.skeleton.get(type);

        const elementData: any = componentList
          .filter((item: any) => staticProperties.includes(item.path))
          .map((item: any) => {
            if (item.path === 'path') {
              item.defaultVal = element.dataBinding && element.dataBinding.path;
            } else {
              item.defaultVal = element[item.path];
            }

            item.key = element.key;
            return item;
          });

        setTimeout(() => {
          setDataList(elementData);
        });
      }
    });
  }, [chooseKey]);

  function getOptionList(key: string) {
    return (optionList[key] || []).map(({ name }: any) => {
      return { value: name, label: name };
    });
  }

  function updateDataSubject(name: any, value: any, optionVal: any) {
    let newFunctionObj: any = JSON.parse(JSON.stringify(functionObj));
    const newCont = operateItem(
      props.treeData.count,
      chooseKey,
      (element: any) => {
        element[name] = cloneDeep(value);
        return element;
      },
    );

    newFunctionObj = { ...newFunctionObj, ...optionVal };
    dispatch({
      type: 'treeData/changeTree',
      payload: { count: newCont, functionObj: newFunctionObj },
    });
  }

  const attributeList = () => {
    return dataList.map((item: any, index: number) => {
      const Element = obj[item.type];
      return <Element {...item} key={`${index} + ${item.key}`}></Element>;
    });
  };

  return <div>{attributeList()}</div>;
};

export default connect(({ treeData }: any) => ({
  treeData,
}))(Property);
