import { useState, useCallback } from 'react';

import { useAppStore } from 'store';

import { action } from 'mobx';

export const useTodo = () => {
  const {
    addTodo,
    deleteTodo,
    filterTodo,
    completeTodo,
    setNewTodoItem,
    checkedItems,
    setCheckedItems,
  } = useAppStore();

  const handleTodoCheck = useCallback(
    (id) => (event) => {
      const newCheckedItems = [...checkedItems];
      if (!event.currentTarget.checked) {
        const index = checkedItems.indexOf(id);
        newCheckedItems.splice(index, 1);
      } else {
        newCheckedItems.push(id);
      }

      setCheckedItems(newCheckedItems);
    },
    [checkedItems],
  );

  const handleAddTodo = action((id, name, isComplete) => () => {
    addTodo({ id: id, name: name, isComplete: isComplete });
    setNewTodoItem('');
  });

  const handleNewTodo = action((event) => {
    setNewTodoItem(event.currentTarget.value);
  });

  const handleDeleteToDo = action(() => {
    deleteTodo(checkedItems);
    checkedItems.splice(0, checkedItems.length);
  });

  const handleFilterTodo = action((filter) => (event) => {
    filterTodo(filter, event.currentTarget.checked);
  });
  const handleCompleteTodo = action(() => {
    completeTodo(checkedItems);
  });

  return {
    checkedItems,
    handleTodoCheck,
    handleAddTodo,
    setNewTodoItem,
    handleNewTodo,
    handleDeleteToDo,
    handleCompleteTodo,
    handleFilterTodo,
  };
};
