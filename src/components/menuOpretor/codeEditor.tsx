import React, { useEffect, useState } from 'react';
import Editor from './editor';

export default function CodeEditor(props: any): any {
  const [js, setJs] = useState('function (){\n  return [];\n}\n');
  return (
    <div style={{ width: '100%' }}>
      <Editor language="javascript" value={js} onChange={setJs} />
    </div>
  );
}
