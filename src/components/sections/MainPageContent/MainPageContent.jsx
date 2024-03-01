import React from 'react';

import { observer } from 'mobx-react-lite';

import { ToDoItem } from 'components/base/ToDoItem';

import styles from './MainPageContent.module.css';

import { useTodo } from './hooks';

import { useAppStore } from 'store';

import { TodoActions } from './TodoActions';

import { TodoFilters } from './TodoFilters';

export const MainPageContent = observer(() => {
  const { TodoList, newTodoItem } = useAppStore();

  const { handleNewTodo, handleTodoCheck } = useTodo();

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

      <TodoActions />
      <TodoFilters />
    </div>
  );
});
