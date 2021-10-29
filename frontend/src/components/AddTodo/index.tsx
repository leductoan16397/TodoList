import { TodoContext } from 'contexts/TodoContext';
import { ChangeEvent, Dispatch, FC, SetStateAction, useContext, useState } from 'react';
import { Toast } from 'utils';
import './index.css';

export const AddTodoComponent: FC<{ setAddFlag: Dispatch<SetStateAction<boolean>> }> = ({
  setAddFlag,
}) => {
  const { addTodo } = useContext(TodoContext);
  const [text, setText] = useState<string>('');
  const [adding, setAdding] = useState(false);

  const addTodoHandle = async (): Promise<void> => {
    if (text.trim().length === 0) {
      Toast('Error!!', 'Todo name cannot be empty!!!!!', 'danger');
      return;
    }
    setAdding(true);
    await addTodo({ todoName: text });
    setAdding(false);
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
      <button type="button" disabled={adding} className="saveBtn" onClick={() => addTodoHandle()}>
        Save
      </button>
    </div>
  );
};
