import React, { createContext, useContext } from 'react';

import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';

class Store {
  constructor() {
    makeAutoObservable(this);
  }

  TodoList = [];
  defaultTodo = [];
  checkedItems = [];
  newTodoItem = '';

  setNewTodoItem = (item) => {
    this.newTodoItem = item;
  };

  setCheckedItems = (items, checked, id) => {
    if (!checked) {
      const index = this.checkedItems.indexOf(id);
      this.checkedItems.splice(index, 1);
    } else {
      this.checkedItems = [...this.checkedItems, ...items];
    }
  };

  addTodo = (item) => {
    this.TodoList.push(item);
    this.defaultTodo.push(item);
  };

  deleteTodo = (checkedItems) => {
    const newTodo = this.TodoList.filter(
      (item) => !checkedItems.some((check) => item.id === check),
    );
    this.TodoList = newTodo;
    this.defaultTodo = newTodo;
  };

  completeTodo = (checkedItems) => {
    this.TodoList.forEach((item) => {
      checkedItems.forEach((check, id) => {
        if (item.id === check) {
          item.isComplete = true;
          checkedItems.splice(id, 1);
        }
      });
    });
    this.defaultTodo = [...this.TodoList];
  };

  filterTodo = (isComplete, check) => {
    const filteredTodo = this.TodoList.filter((todo) => todo.isComplete === isComplete);
    check ? (this.TodoList = filteredTodo) : (this.TodoList = [...this.defaultTodo]);
  };
}

export const store = new Store();

const Context = createContext(null);

export const useAppStore = () => {
  const store = useContext(Context);
  if (!store) throw new Error('Use App store within provider!');

  return store;
};

export const StoreProvider = observer(({ children, ...props }) => {
  return <Context.Provider value={store}>{children}</Context.Provider>;
});
