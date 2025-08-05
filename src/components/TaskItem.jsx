import React, { useState } from 'react';
import { TaskWithDeleteOption } from './DeleteTask';
import { Editor } from './Editor';

export function TaskItem() {
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => setIsEdit((prevState) => !prevState);

  return (
    <>
      {isEdit ? (
        <Editor handleEdit={handleEdit} />
      ) : (
        <TaskWithDeleteOption handleEdit={handleEdit} />
      )}
    </>
  );
}
