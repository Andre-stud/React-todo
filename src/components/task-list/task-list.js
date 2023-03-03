import PropTypes from 'prop-types';
import { useContext } from 'react';

import Context from '../../context';
import Task from '../task';

function TaskList() {
  const { todoData, deleteItem, onToggleDone, onRename, onChandgeTime, activeButton } = useContext(Context);

  const elements = todoData.map((el) => {
    const { id, ...itemProps } = el;

    let displayClass;

    if (activeButton === 'all') {
      displayClass = '';
    }
    if ((activeButton === 'active' && !el.done) || (activeButton === 'completed' && el.done)) {
      displayClass = '';
    }
    if ((activeButton === 'active' && el.done) || (activeButton === 'completed' && !el.done)) {
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
