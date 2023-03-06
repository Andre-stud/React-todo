import TaskFilter from '../task-filter';

function Footer({ todoCount, deleteItemCompleted, clickButtonFilter, activeButtonFilter }) {
  return (
    <footer className="footer">
      <span className="todo-count">{todoCount} items left</span>
      <TaskFilter clickButtonFilter={clickButtonFilter} activeButtonFilter={activeButtonFilter} />
      <button type="button" className="clear-completed" onClick={deleteItemCompleted}>
        Clear completed
      </button>
    </footer>
  );
}

export default Footer;
