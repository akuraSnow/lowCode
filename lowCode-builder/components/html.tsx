import React from 'react';

export default function Html(props: any) {
  const { field = { label: '' } } = props;
  return <span dangerouslySetInnerHTML={{ __html: field.label }}></span>;
}
