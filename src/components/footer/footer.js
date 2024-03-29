import PropTypes from 'prop-types';

import TaskFilter from '../task-filter';

function Footer({
 todoCount, onDeleteCompletedItem, clickButtonFilter, activeButton,
}) {
  return (
    <footer className="footer">
      <span className="todo-count">
        {todoCount}
        {' '}
        items left
      </span>
      <TaskFilter clickButtonFilter={clickButtonFilter} activeButton={activeButton} />
      <button type="button" className="clear-completed" onClick={onDeleteCompletedItem}>
        Clear completed
      </button>
    </footer>
  );
}

Footer.propTypes = {
  todoCount: PropTypes.number,
  onDeleteCompletedItem: PropTypes.func,
  clickButtonFilter: PropTypes.func,
  activeButton: PropTypes.string,
};

Footer.defaultProps = {
  todoCount: 0,
  onDeleteCompletedItem: undefined,
  clickButtonFilter: undefined,
  activeButton: 'all',
};

export default Footer;
