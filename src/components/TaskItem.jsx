import React, { useState } from 'react';
import { DeleteTask } from './DeleteTask';
import { Editor } from './Editor';

export function TaskItem({ id, title, deleteTask, updateTask, completed }) {
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => setIsEdit((prevState) => !prevState);

  return (
    <>
      {isEdit ? (
        <Editor
          id={id}
          updateTask={updateTask}
          title={title}
          handleEdit={handleEdit}
          completed={completed}
        />
      ) : (
        <DeleteTask
          id={id}
          completed={completed}
          handleEdit={handleEdit}
          title={title}
          deleteTask={deleteTask}
        />
      )}
    </>
  );
}
