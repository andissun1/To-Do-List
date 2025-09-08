import { useState } from 'react';
import { TaskWithDeleteOption } from './Task';
import { Editor } from './Editor';

export function TaskItem({ task }) {
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => setIsEdit((prevState) => !prevState);

  return (
    <>
      {isEdit ? (
        <Editor task={task} handleEdit={handleEdit} />
      ) : (
        <TaskWithDeleteOption task={task} handleEdit={handleEdit} />
      )}
    </>
  );
}
