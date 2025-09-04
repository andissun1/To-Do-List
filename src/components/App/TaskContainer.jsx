import { useState } from 'react';
import { TaskWithDeleteOption } from './Task';
import { Editor } from './Editor';

export function TaskItem({ id, title, updateTask, completed, links, user }) {
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
          user={user}
        />
      ) : (
        <TaskWithDeleteOption
          id={id}
          completed={completed}
          handleEdit={handleEdit}
          title={title}
          links={links}
          user={user}
        />
      )}
    </>
  );
}
