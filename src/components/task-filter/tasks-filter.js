import PropTypes from 'prop-types';

export default function TaskFilter({ clickButtonFilter, activeButtonFilter }) {
  const buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ];

  const buttonFilter = buttons.map(({ name, label }) => {
    const isActive = activeButtonFilter === name;
    const classButtonFilter = isActive ? 'selected' : '';

    return (
      <li key={name}>
        <button type="button" className={classButtonFilter} onClick={() => clickButtonFilter(name)}>
          {label}
        </button>
      </li>
    );
  });

  return <ul className="filters">{buttonFilter}</ul>;
}

TaskFilter.propTypes = {
  clickButtonFilter: PropTypes.func,
  activeButtonFilter: PropTypes.string,
};

TaskFilter.defaultProps = {
  clickButtonFilter: undefined,
  activeButtonFilter: 'all',
};
