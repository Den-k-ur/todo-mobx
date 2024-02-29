import React from 'react';

import styles from './ToDoItem.module.css';

export const ToDoItem = ({ description }) => {
  return (
    <div className={styles.ToDoItemStyles}>
      <input type="checkbox" />
      <p>{description}</p>
    </div>
  );
};
