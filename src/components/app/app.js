import { useState } from 'react';

import Footer from '../footer';
import TaskList from '../task-list';
import NewTaskForm from '../new-task-form';

export default function App() {
  const [taskListData, setTaskListData] = useState([]);
  const [activeButtonFilter, setActiveButtonFilter] = useState('all');
  const [maxId, setMaxId] = useState(100);

  const createTodoItem = (label, date, minutes, seconds, isTimer) => ({
    label,
    done: false,
    id: maxId,
    isChecked: false,
    isRename: false,
    createDate: date,
    minutes,
    seconds,
    isTimer,
  });

  const addItem = (task, date, minutes, seconds, isTimer) => {
    setTaskListData(() => {
      const element = createTodoItem(task, date, minutes, seconds, isTimer);
      setMaxId(maxId + 1);
      return [...taskListData, element];
    });
  };

  const newArray = (oldArray, newItem, idx) => [...oldArray.slice(0, idx), newItem, ...oldArray.slice(idx + 1)];

  const doneCount = taskListData.filter((el) => el.done).length;
  const todoCount = taskListData.length - doneCount;

  const onChandgeTime = (id, minutes, seconds) => {
    setTaskListData((todoData) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      const newItem = {
        ...oldItem,
        minutes,
        seconds,
      };

      return newArray(todoData, newItem, idx);
    });
  };

  const onToggleDone = (id) => {
    setTaskListData(() => {
      const idx = taskListData.findIndex((el) => el.id === id);
      const oldItem = taskListData[idx];
      const newItem = {
        ...oldItem,
        done: !oldItem.done,
        isChecked: !oldItem.isChecked,
      };

      return newArray(taskListData, newItem, idx);
    });
  };

  const onRename = (id) => {
    setTaskListData(() => {
      const idx = taskListData.findIndex((el) => el.id === id);
      const oldItem = taskListData[idx];
      const newItem = {
        ...oldItem,

        isRename: !oldItem.isRename,
      };

      return newArray(taskListData, newItem, idx);
    });
  };

  const deleteItem = (id) => {
    setTaskListData(() => {
      const idx = taskListData.findIndex((el) => el.id === id);
      return [...taskListData.slice(0, idx), ...taskListData.slice(idx + 1)];
    });
  };

  const deleteItemCompleted = () => {
    const newArr = [...taskListData].filter((el) => !el.done);
    setTaskListData(() => newArr);
  };
  const clickButtonFilter = (name) => {
    setActiveButtonFilter(name);
  };

  return (
    <section className="todoapp">
      <NewTaskForm onItemAdded={addItem} />
      <section className="main">
        <TaskList
          todoData={taskListData}
          deleteItem={deleteItem}
          onToggleDone={onToggleDone}
          onRename={onRename}
          onChandgeTime={onChandgeTime}
          activeButtonFilter={activeButtonFilter}
        />
        <Footer
          todoCount={todoCount}
          deleteItemCompleted={deleteItemCompleted}
          clickButtonFilter={clickButtonFilter}
          activeButtonFilter={activeButtonFilter}
        />
      </section>
    </section>
  );
}
