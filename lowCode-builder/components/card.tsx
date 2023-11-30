import { Button, Form, Input, Card as FromCard } from 'antd';
import { PageFormBuilder } from 'dynamic-builder';
import React, { useState } from 'react';

export default function Card(props: any) {
  const {
    control: { target, value },
    field: {
      metaData: { width = 300, jsonName, children, tabList, activeTabKey },
    },
  } = props;

  const [activeTabKey1, setActiveTabKey1] = useState<string>(activeTabKey);

  const [closeViewModel, setCloseViewModel] = useState(undefined as any);

  const onTab1Change = (key: string) => {
    setActiveTabKey1(key);
  };

  const childrenData = () => {
    if (children) {
      return React.createElement(ModelContent as any, {
        children,
        jsonName,
        target,
        setCloseViewModel,
        viewModel: value,
        key: activeTabKey1,
      });
    } else if (tabList) {
      const component = tabList.filter((e: any) => e.key === activeTabKey1)[0]
        .children;

      return (
        // @ts-ignore
        <ModelContent
          key={activeTabKey1}
          children={component}
          target={target}
          viewModel={value}
          setCloseViewModel={setCloseViewModel}
        ></ModelContent>
      );
    }
  };

  return (
    <FromCard
      {...props.field.metaData}
      activeTabKey={activeTabKey1}
      style={{ width: width }}
      onTabChange={onTab1Change}
    >
      {childrenData()}
    </FromCard>
  );
}

@PageFormBuilder({})
class ModelContent {
  [x: string]: any;

  constructor(props: any) {
    this.parent = props;
    const { jsonName, target: fatherComponent, children } = props;
    this.props = fatherComponent.target;
    if (children && Array.isArray(children)) {
      this.setJson({ fields: children });
    } else if (jsonName) {
      this.loadJson({
        jsonName,
      });
    }
  }

  onPropsChange = (props: any) => {
    const { viewModel = {} } = props;

    if (JSON.stringify(this.viewModel) !== JSON.stringify(viewModel)) {
      this.viewModel.label = viewModel.label;
    }
  };

  componentDidUpdate() {
    this.parent.setCloseViewModel(() => this);
  }
}
