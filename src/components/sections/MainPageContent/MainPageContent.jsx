import React from 'react';

import { ToDoItem } from 'components/base/ToDoItem';

import styles from './MainPageContent.module.css';

export const MainPageContent = () => {
  return (
    <div className={styles.mainPageBlock}>
      <div className={styles.todoBlock}>
        <ToDoItem description="hell" />
      </div>
      <input type="text" className={styles.addToDoInput} />
      <div className={styles.buttonsBlock}>
        <button>Добавить задачу</button>
        <button>Удалить задачу</button>
        <button>Выполнить задачу</button>
      </div>
    </div>
  );
};
