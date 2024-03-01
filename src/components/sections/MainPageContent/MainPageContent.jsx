import React from 'react';

import { observer } from 'mobx-react-lite';

import { ToDoItem } from 'components/base/ToDoItem';

import styles from './MainPageContent.module.css';

import { useTodo } from './hooks';

import { useAppStore } from 'store';

export const MainPageContent = observer(() => {
  const { TodoList } = useAppStore();

  const {
    handleNewTodo,
    handleTodoCheck,
    newTodoItem,
    handleFilterTodo,
    checkedItems,
    handleDeleteToDo,
    handleAddTodo,
    handleCompleteTodo,
  } = useTodo();

  return (
    <div className={styles.mainPageBlock}>
      {TodoList.length > 0 && (
        <div className={styles.todoBlock}>
          {TodoList.map((item) => (
            <ToDoItem
              onChange={handleTodoCheck(item.id)}
              key={item.id}
              description={item.isComplete ? `${item.name} (Выполнено)` : item.name}
            />
          ))}
        </div>
      )}
      <input
        type="text"
        className={styles.addToDoInput}
        onChange={handleNewTodo}
        value={newTodoItem}
      />
      <div className={styles.buttonsBlock}>
        <button
          disabled={newTodoItem.length < 1}
          onClick={handleAddTodo(Date.now().toString(), newTodoItem, false)}
        >
          Добавить задачу
        </button>
        <button disabled={checkedItems.length < 1} onClick={handleDeleteToDo}>
          Удалить задачу
        </button>
        <button disabled={checkedItems.length < 1} onClick={handleCompleteTodo}>
          Выполнить задачу
        </button>
      </div>
      <div className={styles.filtersBlock}>
        <div className={styles.flitersStyle}>
          <input
            type="checkbox"
            className={styles.addToDoInput}
            onChange={handleFilterTodo(true)}
          />
          <p>Показать только выполненные задачи</p>
        </div>
        <div className={styles.flitersStyle}>
          <input
            type="checkbox"
            className={styles.addToDoInput}
            onChange={handleFilterTodo(false)}
          />
          <p>Показать только не выполненные задачи</p>
        </div>
      </div>
    </div>
  );
});
