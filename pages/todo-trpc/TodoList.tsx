import { Todo } from '@prisma/client';
import type { TodoItem } from '../../database/todoItems';
import { trpc } from '../../trpc/client';
import React, { useState } from 'react';

export function TodoList({ todoItemsInitial }: { todoItemsInitial: Todo[] }) {
  const [todoItems, setTodoItems] = useState(todoItemsInitial);
  const [draft, setDraft] = useState('');
  return (
    <>
      <ul>
        {todoItems.map((todoItem, i) => (
          <li key={i}>{todoItem.text}</li>
        ))}
        <li>
          <form
            onSubmit={async (ev) => {
              ev.preventDefault();
              const { todoItems } = await trpc.onNewTodo.mutate(draft);
              setDraft('');
              setTodoItems(todoItems);
            }}
          >
            <input
              type="text"
              onChange={(ev) => setDraft(ev.target.value)}
              value={draft}
            />{' '}
            <button type="submit">Add to-do</button>
          </form>
        </li>
      </ul>
    </>
  );
}
