import React, { useCallback, useEffect, useState } from 'react';
import './index.css';

export default function UnitComponent(props: any) {
  const { ElementList, Component } = props;
  const { Element, field: newField, control } = ElementList;
  const [field, setField] = useState(newField);
  const [, updateState]: any = useState();
  const handleForceupdateMethod = useCallback(() => updateState({}), []);

  useEffect(() => {
    const observable = Component.subscript(ElementList, (res: any) => {
      setField(JSON.parse(JSON.stringify(res.field)));
      handleForceupdateMethod();
    });

    return () => Component.unsubscript(observable);
  }, []);

  return field.visibility !== 'hidden' ? (
    <div className="component-box">
      <Element field={field} control={control} />
    </div>
  ) : (
    <></>
  );
}
