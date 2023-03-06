import PropTypes from 'prop-types';

import Task from '../task';

function TaskList({ todoData, deleteItem, onToggleDone, onRename, onChandgeTime, activeButtonFilter }) {
  const elements = todoData.map((el) => {
    const { id, ...itemProps } = el;

    let displayClass;

    if (activeButtonFilter === 'all') {
      displayClass = '';
    }
    if ((activeButtonFilter === 'active' && !el.done) || (activeButtonFilter === 'completed' && el.done)) {
      displayClass = '';
    }
    if ((activeButtonFilter === 'active' && el.done) || (activeButtonFilter === 'completed' && !el.done)) {
      displayClass = 'disnone';
    }

    return (
      <li className={displayClass} key={id}>
        <Task
          {...itemProps}
          id={id}
          onDeleted={() => deleteItem(id)}
          onToggleDone={() => onToggleDone(id)}
          onRename={() => onRename(id)}
          onChandgeTime={onChandgeTime}
        />
      </li>
    );
  });
  return <ul className="todo-list">{elements}</ul>;
}

TaskList.propTypes = {
  id: PropTypes.number,
};

TaskList.defaultProps = {
  id: 0,
};

export default TaskList;
