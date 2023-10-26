import React, { Fragment, useCallback, useEffect, useState } from 'react';
import './index.css';

export default function UnitComponent(props: any) {
  const { ElementList, Component } = props;
  const { Element, field, control } = ElementList;
  const [, updateState]: any = useState();
  const handleForceupdateMethod = useCallback(() => updateState({}), []);

  useEffect(() => {
    const observable = Component.subscript(field, (res: any) => {
      // console.log('res: ', res);
      handleForceupdateMethod();
    });

    // return () => Component.remove(observable);
  }, []);

  return field.visibility !== 'hidden' ? (
    <Element field={field} control={control} />
  ) : null;
}
