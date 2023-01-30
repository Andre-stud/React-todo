import PropTypes from 'prop-types';

import Task from '../task';

function TaskList({ data, onDeleted, onToggleDone, onRename, onNewLabel }) {
  const elements = data.map((el) => {
    const { id, ...itemProps } = el;

    return (
      <li key={id}>
        <Task
          {...itemProps}
          id={id}
          onDeleted={() => onDeleted(id)}
          onToggleDone={() => onToggleDone(id)}
          onRename={() => onRename(id)}
          onNewLabel={onNewLabel}
        />
      </li>
    );
  });
  return <ul className="todo-list">{elements}</ul>;
}

TaskList.propTypes = {
  id: PropTypes.number,
};

export default TaskList;
