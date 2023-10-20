import React, { useState } from 'react';

import { Controlled as ControlledEditorComponent } from 'react-codemirror2';
import 'codemirror/addon/display/autorefresh';

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
        options={{
          autoRefresh: true,
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
