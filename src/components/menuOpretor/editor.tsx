import React, { useState } from 'react';

import { Controlled as ControlledEditorComponent } from 'react-codemirror2';
import 'codemirror/addon/display/autorefresh';

import styles from './index.less';
import { debounce, throttle } from 'lodash';

const Editor = ({ language, value, height = '200px', onChange }: any) => {
  return (
    <div className={styles.editorContainer}>
      <ControlledEditorComponent
        onBeforeChange={throttle((editor: any, data: any, val: any) => {
          onChange(val);
        }, 10)}
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
