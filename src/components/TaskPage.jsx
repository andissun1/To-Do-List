import { useState, useEffect } from 'react';
import { TaskWithDeleteOption } from './DeleteTask';
import { Editor } from './Editor';
import { useParams, useNavigate } from 'react-router-dom';
import { SERVER_URL } from '../constants';

export default function TaskPage() {
  const [isEdit, setIsEdit] = useState(false);
  const [taskData, setTaskData] = useState('');
  const params = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id, title, completed } = taskData;

  useEffect(() => {
    getData();
  }, [isEdit]);

  // Наблюдается проблема с частым рендерингом
  // console.log('Рендер');

  async function getData() {
    setIsLoading(true);
    try {
      const request = await fetch(SERVER_URL + params.id);
      if (request.status === 404) {
        navigate('/404');
        throw new Error('Не найдена задача');
      } else {
        const item = await request.json();
        setTaskData(item);
        setIsLoading(false);
      }
    } catch {
      setError(error);
    }
  }

  const handleEdit = () => setIsEdit((prevState) => !prevState);

  const deleteTask = async (id) => {
    try {
      const response = await fetch(SERVER_URL + '/' + id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'Application/json',
        },
      });

      if (!response.ok) throw new Error('Ошибка при удалении');

      navigate('/');
    } catch (error) {
      setError(error);
    }
  };

  const updateTask = async (id, payload) => {
    try {
      const response = await fetch(SERVER_URL + '/' + id, {
        method: 'PATCH',
        body: JSON.stringify({
          ...payload,
        }),
        headers: {
          'Content-Type': 'Application/json',
        },
      });

      if (!response.ok) throw new Error('Ошибка при запросе на редактирование');

      const updatedTask = await response.json();
      let updatedData = Object.values(taskData).map((taskData) =>
        taskData.id === id ? updatedTask : taskData
      );

      setTaskData(updatedData);
    } catch (error) {
      setError(error);
    }
  };

  if (isLoading) {
    return <h1 className="loader"></h1>;
  }

  return (
    <>
      <div className="stepBack" onClick={() => navigate('/')}>
        🔙
      </div>
      {isEdit ? (
        <Editor
          id={id}
          title={title}
          completed={completed}
          updateTask={updateTask}
          handleEdit={handleEdit}
        />
      ) : (
        <TaskWithDeleteOption
          id={id}
          title={title}
          completed={completed}
          handleEdit={handleEdit}
          deleteTask={deleteTask}
        />
      )}
    </>
  );
}
