import React from 'react';

import styles from './ToDoItem.module.css';
import { observer } from 'mobx-react-lite';

export const ToDoItem = observer(({ description, onChange }) => {
  return (
    <div className={styles.ToDoItemStyles}>
      <input type="checkbox" onChange={onChange} />
      <p>{description}</p>
    </div>
  );
});
