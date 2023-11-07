import React, { useCallback, useEffect, useState } from 'react';
import './index.css';

export default function UnitComponent(props: any) {
  const { ElementList, Component } = props;
  const { Element, field: newField, control } = ElementList;
  const [field, setField] = useState(newField);
  const [, updateState]: any = useState();
  const handleForceupdateMethod = useCallback(() => updateState({}), []);

  useEffect(() => {
    const observable = Component.subscript(field, (res: any) => {
      setField(res.field);
      handleForceupdateMethod();
    });

    return () => Component.unsubscript(observable);
  }, []);

  return field.visibility !== 'hidden' ? (
    <Element field={field} control={control} />
  ) : (
    <div></div>
  );
}
