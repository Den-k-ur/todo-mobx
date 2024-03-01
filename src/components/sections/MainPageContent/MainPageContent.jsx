import React, { useState } from 'react';

import { observer } from 'mobx-react-lite';

import { ToDoItem } from 'components/base/ToDoItem';

import styles from './MainPageContent.module.css';

import { useTodo } from './hooks';

import { action } from 'mobx';

import { useAppStore } from 'store';

export const MainPageContent = observer(() => {
  const { TodoList, addTodo, deleteTodo, completeTodo, filterTodo } = useAppStore();
  const [newTodoItem, setNewTodoItem] = useState('');
  const { checkedItems, handleTodoCheck } = useTodo();

  return (
    <div className={styles.mainPageBlock}>
      {TodoList.length > 0 && (
        <div className={styles.todoBlock}>
          {TodoList.map((item) => (
            <ToDoItem
              onChange={(e) => {
                handleTodoCheck(item.id.toString(), e.currentTarget.checked);
              }}
              key={item.id}
              description={item.isComplete ? `${item.name} (Выполнено)` : item.name}
            />
          ))}
        </div>
      )}
      <input
        type="text"
        className={styles.addToDoInput}
        onChange={(e) => setNewTodoItem(e.currentTarget.value)}
        value={newTodoItem}
      />
      <div className={styles.buttonsBlock}>
        <button
          disabled={newTodoItem.length < 1}
          onClick={action(() => {
            addTodo({ id: Date.now().toString(), name: newTodoItem, isComplete: false });
            setNewTodoItem('');
          })}
        >
          Добавить задачу
        </button>
        <button
          disabled={checkedItems.length < 1}
          onClick={action(() => {
            deleteTodo(checkedItems);
            checkedItems.splice(0, checkedItems.length);
          })}
        >
          Удалить задачу
        </button>
        <button
          disabled={checkedItems.length < 1}
          onClick={action(() => completeTodo(checkedItems))}
        >
          Выполнить задачу
        </button>
      </div>
      <div className={styles.filtersBlock}>
        <div className={styles.flitersStyle}>
          <input
            type="checkbox"
            className={styles.addToDoInput}
            onChange={(e) => filterTodo(true, e.currentTarget.checked)}
          />
          <p>Показать только выполненные задачи</p>
        </div>
        <div className={styles.flitersStyle}>
          <input
            type="checkbox"
            className={styles.addToDoInput}
            onChange={(e) => filterTodo(false, e.currentTarget.checked)}
          />
          <p>Показать только не выполненные задачи</p>
        </div>
      </div>
    </div>
  );
});
