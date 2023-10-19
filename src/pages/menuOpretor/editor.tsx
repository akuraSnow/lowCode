import React, { useState } from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';

import 'codemirror/theme/dracula.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/mdn-like.css';
import 'codemirror/theme/the-matrix.css';
import 'codemirror/theme/night.css';
import { Controlled as ControlledEditorComponent } from 'react-codemirror2';

import styles from './index.less';

const Editor = ({ language, value, setEditorState }: any) => {
  const handleChange = (editor: any, data: any, value: any) => {
    setEditorState(value);
  };
  return (
    <div className={styles.editorContainer}>
      <ControlledEditorComponent
        onBeforeChange={handleChange}
        value={value}
        className="code-mirror-wrapper"
        options={{
          lineWrapping: true,
          lint: true,
          mode: language,
          lineNumbers: true,
        }}
      />
    </div>
  );
};
export default Editor;
