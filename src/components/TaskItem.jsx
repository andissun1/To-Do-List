import React, { useState } from 'react';
import { TaskWithDeleteOption } from './DeleteTask';
import { Editor } from './Editor';

export function TaskItem({ id, title, deleteTask, updateTask, completed, links }) {
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
        <TaskWithDeleteOption
          id={id}
          completed={completed}
          handleEdit={handleEdit}
          title={title}
          links={links}
          deleteTask={deleteTask}
        />
      )}
    </>
  );
}
