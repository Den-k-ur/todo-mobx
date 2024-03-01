import React from 'react';
import { useTodo } from '../hooks';
import { observer } from 'mobx-react-lite';

import styles from './TodoFilters.module.css';

export const TodoFilters = observer(() => {
  const { handleFilterTodo } = useTodo();

  return (
    <div className={styles.filtersBlock}>
      <div className={styles.flitersStyle}>
        <input type="checkbox" className={styles.addToDoInput} onChange={handleFilterTodo(true)} />
        <p>Показать только выполненные задачи</p>
      </div>
      <div className={styles.flitersStyle}>
        <input type="checkbox" className={styles.addToDoInput} onChange={handleFilterTodo(false)} />
        <p>Показать только не выполненные задачи</p>
      </div>
    </div>
  );
});
