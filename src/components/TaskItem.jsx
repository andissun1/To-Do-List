import React, { useState, useEffect } from 'react';
import { TaskWithDeleteOption } from './DeleteTask';
import { Editor } from './Editor';
import { useNavigate, useParams } from 'react-router-dom';

export function TaskItem({ id, title, deleteTask, updateTask, completed, SERVER_URL }) {
  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState({});
  const params = useParams();
  const navigate = useNavigate();

  if (!id) {
    useEffect(() => {
      async function getData() {
        const request = await fetch(`http://localhost:3000/todos/${params.id}`);
        if (request.status === 404) {
          navigate('/404');
        } else {
          const item = await request.json();
          setData(item);
        }
      }
      getData();
    }, []);
  }

  const handleEdit = () => setIsEdit((prevState) => !prevState);

  return (
    <>
      {isEdit ? (
        <Editor
          id={id || data.id}
          title={title || data.title}
          completed={completed || data.completed}
          updateTask={updateTask}
          handleEdit={handleEdit}
        />
      ) : (
        <TaskWithDeleteOption
          id={id || data.id}
          title={title || data.title}
          completed={completed || data.completed}
          handleEdit={handleEdit}
          deleteTask={deleteTask}
        />
      )}
    </>
  );
}
