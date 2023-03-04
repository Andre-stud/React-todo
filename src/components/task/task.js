import { useState, useEffect} from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

export default function Task({
  label,
  seconds,
  minutes,
  isTimer,
  id,
  done,
  isChecked,
  isRename,
  createDate,

  onDeleted,
  onToggleDone,
  onRename,
  onChandgeTime,
}) {

  

  const [taskState, setTaskState] = useState({
    taskLabel: label,
    submitLabel: label,
    count: `${minutes}:${seconds}`,
    workCount: false,
    isTimer,
  });

  const { taskLabel, count, workCount } = taskState;
  
  let timerMinutes = minutes;

  useEffect(() => {

    let intervalId;
    let timerSeconds = seconds;
    if (workCount && !isTimer) {
      intervalId = setInterval(() => {
        timerSeconds++;

        if (timerSeconds === 60) {
          timerMinutes++;

          timerSeconds = 0;
        }

        onChandgeTime(id, timerMinutes, timerSeconds);
        setTaskState(()=>({ ...taskState, count: `${timerMinutes}:${timerSeconds}` }));
      }, 1000);
    }

    if (workCount && isTimer) {
      intervalId = setInterval(() => {
        timerSeconds--;
        if (timerSeconds === -1) {
          timerSeconds = 0;
          if (timerMinutes >= 1) {
            timerMinutes--;
            timerSeconds = 59;
          } else {
            clearInterval(intervalId);
          }
        }
        onChandgeTime(id, timerMinutes, timerSeconds);
        setTaskState(()=>({ ...taskState, count: `${timerMinutes}:${timerSeconds}` }));
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [workCount, isChecked, seconds, isTimer, id, timerMinutes, onChandgeTime, taskState]);


  const onKeyDown = (e) => {
    if (e.keyCode === 27) {
      setTaskState({ ...taskState, taskLabel: taskState.submitLabel });
      onRename(id);
    }
  };

  const onBlur = () => {
    setTaskState({ ...taskState, taskLabel: taskState.submitLabel });
    onRename(id);
  };

  const onLabelChandge = (e) => {
    setTaskState({ ...taskState, taskLabel: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setTaskState({ ...taskState, submitLabel: taskState.taskLabel });
    onRename(id);
  };

  const play = () => {
    if (!done) {
      setTaskState({ ...taskState, workCount: true });
    }
  };

  const stop = () => {
    setTaskState({ ...taskState, workCount: false });
  };

  const checked = () => {
    setTaskState({ ...taskState, workCount: false });
    onToggleDone(id);
  };

  const changeName = () => {
    setTaskState({ ...taskState, workCount: false });
    onRename(id);
  };

  let classNames = 'view';
  if (done) {
    classNames = 'completed';
  }
  if (isRename) {
    return (
      <form className={classNames} onSubmit={onSubmit}>
        <input
          className="new-todo"
          autoFocus
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          value={taskLabel}
          onChange={onLabelChandge}
        />
      </form>
    );
  }
  return (
    <div className={classNames}>
      <input className="toggle" type="checkbox" onChange={checked} checked={isChecked} />
      <label htmlFor={id}>
        <span className="description" onClick={checked} aria-hidden="true">
          {taskLabel}
        </span>
        <span className="timer">
          <button type="button" aria-label="icon icon-play" className="icon icon-play" onClick={play} />
          <button type="button" id={id} aria-label="icon icon-pause" className="icon icon-pause" onClick={stop} />
          {count}
        </span>
        <span className="description">
          {`created ${formatDistanceToNow(createDate, { includeSeconds: true })} ago`}
        </span>
      </label>
      <button type="button" aria-label="icon-edit" className="icon icon-edit" onClick={changeName} />
      <button type="button" aria-label="icon-destroy" className="icon icon-destroy" onClick={onDeleted} />
    </div>
  );
}

Task.propTypes = {
  label: PropTypes.string,
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  done: PropTypes.bool,
  isChecked: PropTypes.bool,
  onRename: PropTypes.func,
  isRename: PropTypes.bool,
};

Task.defaultProps = {
  label: '',
  onDeleted: undefined,
  onToggleDone: undefined,
  done: false,
  isChecked: false,
  onRename: undefined,
  isRename: false,
};
