import React, { useEffect, useState } from 'react';
import Editor from './editor';

export default function CodeEditor(props: any): any {
  const [open, setOpen] = useState(props.open);
  const [js, setJs] = useState('function (){\n  return [];\n}\n');
  console.log('js: ', js);

  return (
    <div style={{ width: '100%' }}>
      <Editor language="javascript" value={js} setEditorState={setJs} />
    </div>
  );
}
