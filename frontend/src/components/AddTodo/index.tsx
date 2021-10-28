import { TodoContext } from 'contexts/TodoContext';
import { ChangeEvent, Dispatch, FC, SetStateAction, useContext, useState } from 'react';
import { Toast } from 'utils';
// import { Todo } from 'types/todo.type';
// import { v4 as uuidv4 } from 'uuid';
import './index.css';

export const AddTodoComponent: FC<{ setAddFlag: Dispatch<SetStateAction<boolean>> }> = ({
  setAddFlag,
}) => {
  const { addTodo } = useContext(TodoContext);
  const [text, setText] = useState<string>('');

  const addTodoHandle = async (): Promise<void> => {
    // const todo: Todo = {
    //   id: uuidv4(),
    //   title: text,
    //   createdAt: new Date(),
    //   updateAt: new Date(),
    // };
    // addTodo(todo);
    if (text.trim().length === 0) {
      Toast('Error!!', 'Todo name cannot be empty!!!!!', 'danger');
      return;
    }
    await addTodo({ todoName: text });
    setAddFlag(false);
    setText('');
  };

  return (
    <div className="form-add-todo">
      <input
        type="text"
        value={text}
        placeholder="Todo name"
        onInput={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
      />
      <button type="button" className="saveBtn" onClick={() => addTodoHandle()}>
        Save
      </button>
    </div>
  );
};
