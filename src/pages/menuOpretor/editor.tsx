import React, { useState } from 'react';

import { Controlled as ControlledEditorComponent } from 'react-codemirror2';
import 'codemirror/addon/display/autorefresh';

import styles from './index.less';

const Editor = ({ language, value, height = '200px', onChange }: any) => {
  const handleChange = (editor: any, data: any, value: any) => {
    onChange(value);
  };
  return (
    <div className={styles.editorContainer}>
      <ControlledEditorComponent
        onBeforeChange={handleChange}
        autoScroll={true}
        value={value}
        options={{
          autoRefresh: true,
          lineWrapping: true,
          lint: true,
          mode: language,
          lineNumbers: true,
          outerHeight: 100,
        }}
      />
    </div>
  );
};
export default Editor;
