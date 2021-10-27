import { TodoContext } from 'contexts/TodoContext';
import { ChangeEvent, Dispatch, FC, SetStateAction, useContext, useState } from 'react';
import { Todo } from 'types/todo.type';
import { v4 as uuidv4 } from 'uuid';

export const AddTodoComponent: FC<{ setAddFlag: Dispatch<SetStateAction<boolean>> }> = ({
  setAddFlag,
}) => {
  const { addTodo } = useContext(TodoContext);
  const [text, setText] = useState<string>('');

  const addTodoHandle = (): void => {
    const todo: Todo = {
      id: uuidv4(),
      title: text,
      createdAt: new Date(),
      updateAt: new Date(),
    };
    addTodo(todo);
    setAddFlag(false);
    setText('');
  };

  return (
    <div>
      <input
        type="text"
        value={text}
        onInput={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
      />
      <button type="button" className="saveBtn" onClick={() => addTodoHandle()}>
        Save
      </button>
    </div>
  );
};
