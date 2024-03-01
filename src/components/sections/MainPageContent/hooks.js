import { useState, useCallback } from 'react';

import { useAppStore } from 'store';

import { action } from 'mobx';

export const useTodo = () => {
  const [checkedItems, setCheckedItems] = useState([]);
  const [newTodoItem, setNewTodoItem] = useState('');

  const { addTodo, deleteTodo, filterTodo, completeTodo } = useAppStore();

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

  const handleAddTodo = action((id, name, isComplit) => () => {
    addTodo({ id: id, name: name, isComplit: isComplit });
    setNewTodoItem('');
  });

  const handleNewTodo = useCallback((event) => {
    setNewTodoItem(event.currentTarget.value);
  }, []);

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
    newTodoItem,
    setNewTodoItem,
    handleNewTodo,
    handleDeleteToDo,
    handleCompleteTodo,
    handleFilterTodo,
  };
};
