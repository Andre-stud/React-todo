import { useState, useEffect, useCallback } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

export default function Task({
  label,
  timeValue,
  isTimer,
  id,
  done,
  isRename,
  createDate,
  onDeleted,
  onToggleDone,
  onRename,
  onChandgeTime,
}) {
  
  const countValue = useCallback((value) => {
    const minutes = Math.trunc(value / 60);
    const seconds = value - minutes * 60;

    const time = `${minutes}:${seconds}`;
    return time;
  }, []);

  const [taskState, setTaskState] = useState({
    taskLabel: label,
    submitLabel: label,
    count: countValue(timeValue),
    workCount: false,
    isTimer,
  });

  const { taskLabel, count, workCount } = taskState;

  useEffect(() => {
    let intervalId;

    if (workCount && !isTimer) {
      intervalId = setInterval(() => {
        timeValue++;

        onChandgeTime(id, timeValue);
        setTaskState(() => ({ ...taskState, count: countValue(timeValue) }));
      }, 1000);
    }

    if (workCount && isTimer) {
      // eslint-disable-next-line consistent-return
      intervalId = setInterval(() => {
        timeValue--;

        if (timeValue === 0) {
          setTaskState(() => ({ ...taskState, count: countValue(timeValue), workCount: false }));

          return clearInterval(intervalId);
        }
        onChandgeTime(id, timeValue);
        setTaskState(() => ({ ...taskState, count: countValue(timeValue) }));
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [countValue, id, isTimer, onChandgeTime, taskState, timeValue, workCount]);

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

  let isChecked = false;
  let classNames = 'view';
  if (done) {
    classNames = 'completed';
    isChecked = true;
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
      <button type="button" aria-label="icon-edit" className="icon icon-edit" onClick={onRename} />
      <button type="button" aria-label="icon-destroy" className="icon icon-destroy" onClick={onDeleted} />
    </div>
  );
}

Task.propTypes = {
  label: PropTypes.string,
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  done: PropTypes.bool,
  onRename: PropTypes.func,
  isRename: PropTypes.bool,
};

Task.defaultProps = {
  label: '',
  onDeleted: undefined,
  onToggleDone: undefined,
  done: false,
  onRename: undefined,
  isRename: false,
};
