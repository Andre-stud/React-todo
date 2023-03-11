import { useState } from 'react';

export default function NewTaskForm({ onItemAdded }) {
  const [taskData, setTaskData] = useState({
    label: '',
    minutes: '',
    seconds: '',
    isTimer: true,
  });

  const onLabelChandge = (e) => {
    setTaskData({ ...taskData, label: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let { minutes, seconds, isTimer } = taskData;

    minutes = Number(minutes);
    seconds = Number(seconds);

    if (!minutes && !seconds) {
      isTimer = false;
    }

    if (!minutes) {
      minutes = 0;
    }

    if (!seconds) {
      seconds = 0;
    }

    const timeValue = minutes * 60 + seconds;

    onItemAdded(taskData.label, new Date(), timeValue, isTimer);

    setTaskData({ label: '', minutes: '', seconds: '', isTimer: true });
  };

  const onMinChandge = (e) => {
    setTaskData({ ...taskData, minutes: e.target.value });
  };

  const onSecChandge = (e) => {
    setTaskData({ ...taskData, seconds: e.target.value });
  };

  return (
    <>
      <h1>todos</h1>
      <form className="new-todo-form" onSubmit={onSubmit}>
        <input
          type="text"
          required="required"
          className="new-todo"
          placeholder="Task"
          onChange={onLabelChandge}
          value={taskData.label}
          autoFocus
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          type="number"
          max="99"
          min="0"
          onChange={onMinChandge}
          value={taskData.minutes}
          autoFocus
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          type="number"
          max="59"
          min="0"
          onChange={onSecChandge}
          value={taskData.seconds}
          autoFocus
        />
        <input type="submit" className="submit-input" />
      </form>
    </>
  );
}
