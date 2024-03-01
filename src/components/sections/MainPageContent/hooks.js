import { useState, useCallback } from 'react';

export const useTodo = () => {
  const [checkedItems, setCheckedItems] = useState([]);

  const handleTodoCheck = useCallback(
    (id, checked) => {
      const newCheckedItems = [...checkedItems];
      if (!checked) {
        const index = checkedItems.indexOf(id);
        newCheckedItems.splice(index, 1);
      } else {
        newCheckedItems.push(id);
      }

      setCheckedItems(newCheckedItems);
    },
    [checkedItems],
  );

  return {
    checkedItems,
    handleTodoCheck,
  };
};
