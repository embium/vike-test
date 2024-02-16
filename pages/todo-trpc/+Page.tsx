import React, { useState } from 'react';
import { useData } from 'vike-react/useData';
import { TodoList } from './TodoList';
import { Todo } from '@prisma/client';

export default function Page() {
  const todoItemsInitial = useData<Todo[]>();
  return (
    <>
      <h1>To-do List</h1>
      <TodoList todoItemsInitial={todoItemsInitial} />
      <Counter />
    </>
  );
}

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      This page is interactive:
      <button
        type="button"
        onClick={() => setCount((count) => count + 1)}
      >
        Counter {count}
      </button>
    </div>
  );
}
