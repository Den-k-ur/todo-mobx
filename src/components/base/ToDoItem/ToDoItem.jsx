import React from 'react';

import styles from './ToDoItem.module.css';
import { observer } from 'mobx-react-lite';

export const ToDoItem = observer(({ description, onChange, value }) => {
  return (
    <div className={styles.ToDoItem}>
      <input type="checkbox" checked={value} onChange={onChange} />
      <p>{description}</p>
    </div>
  );
});
