import { useState, useMemo } from 'react';

import Footer from '../footer';
import TaskList from '../task-list';
import NewTaskForm from '../new-task-form';
import Context from '../../context';

export default function App() {
  const [todoData, setTodoData] = useState([]);
  const [activeButton, setActiveButton] = useState('all');
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
    setTodoData(() => {
      const element = createTodoItem(task, date, minutes, seconds, isTimer);
      setMaxId(maxId + 1);
      return [...todoData, element];
    });
  };





  const newArray = (oldArray, newItem, idx) => [...oldArray.slice(0, idx), newItem, ...oldArray.slice(idx + 1)];




  

  const doneCount = todoData.filter((el) => el.done).length;
  const todoCount = todoData.length - doneCount;



  const footer = useMemo(
    () =>{
      const deleteItemCompleted = () => {
        const newArr = [...todoData].filter((el) => !el.done);
        setTodoData(() => newArr);
      };
      const clickButtonFilter = (name) => {
        setActiveButton(name);
      };
     return ({ todoCount, deleteItemCompleted, clickButtonFilter, activeButton });
    } ,
    [todoCount, activeButton, todoData]
  );
  const taskList = useMemo(
    () =>{

      const onChandgeTime = (id, minutes, seconds) => {
        // eslint-disable-next-line no-shadow
        setTodoData((todoData) => {
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
        setTodoData(() => {
          const idx = todoData.findIndex((el) => el.id === id);
          const oldItem = todoData[idx];
          const newItem = {
            ...oldItem,
            done: !oldItem.done,
            isChecked: !oldItem.isChecked,
          };
    
          return newArray(todoData, newItem, idx);
        });
      };

      const onRename = (id) => {
        setTodoData(() => {
          const idx = todoData.findIndex((el) => el.id === id);
          const oldItem = todoData[idx];
          const newItem = {
            ...oldItem,
    
            isRename: !oldItem.isRename,
          };
    
          return newArray(todoData, newItem, idx);
        });
      };
    
      const deleteItem = (id) => {
        setTodoData(() => {
          const idx = todoData.findIndex((el) => el.id === id);
          return [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
        });
      };


     return ({ todoData, deleteItem, onToggleDone, onRename, onChandgeTime, activeButton });
    } ,
    [todoData,   activeButton]
  );
  return (
    <section className="todoapp">
      <NewTaskForm onItemAdded={addItem} />
      <section className="main">
        <Context.Provider value={taskList}>
          <TaskList />
        </Context.Provider>
        <Context.Provider value={footer}>
          <Footer />
        </Context.Provider>
      </section>
    </section>
  );
}
