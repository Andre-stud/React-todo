import { useContext } from 'react';

import Context from '../../context';
import TaskFilter from '../task-filter';

function Footer() {
  const { todoCount, deleteItemCompleted, clickButtonFilter, activeButton } = useContext(Context);
  return (
    <footer className="footer">
      <span className="todo-count">{todoCount} items left</span>
      <TaskFilter clickButtonFilter={clickButtonFilter} activeButton={activeButton} />
      <button type="button" className="clear-completed" onClick={deleteItemCompleted}>
        Clear completed
      </button>
    </footer>
  );
}

export default Footer;
