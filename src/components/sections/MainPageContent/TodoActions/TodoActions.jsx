import React from 'react';

import { useAppStore } from 'store';
import { observer } from 'mobx-react-lite';

import { useTodo } from '../hooks';

import styles from './TodoActions.module.css';

export const TodoActions = observer(() => {
  const { newTodoItem, checkedItems } = useAppStore();
  const { handleAddTodo, handleDeleteToDo, handleCompleteTodo } = useTodo();
  const buttonDisabled = checkedItems.length < 1;

  return (
    <div className={styles.buttonsBlock}>
      <button
        disabled={newTodoItem.length < 1}
        onClick={handleAddTodo(Date.now().toString(), newTodoItem, false)}
      >
        Добавить задачу
      </button>
      <button disabled={buttonDisabled} onClick={handleDeleteToDo}>
        Удалить задачу
      </button>
      <button disabled={buttonDisabled} onClick={handleCompleteTodo}>
        Выполнить задачу
      </button>
    </div>
  );
});
