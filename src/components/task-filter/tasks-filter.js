import { Component } from 'react';
import PropTypes from 'prop-types';

export default class TaskFilter extends Component {
  buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ];
  render() {
    const { clickButtonFilter, activeButton } = this.props;
    const buttonFilter = this.buttons.map(({ name, label }) => {
      const isActive = activeButton === name;
      const classButtonFilter = isActive ? 'selected' : '';

      return (
        <li key={name}>
          <button className={classButtonFilter} onClick={() => clickButtonFilter(name)}>
            {label}
          </button>
        </li>
      );
    });

    return <ul className="filters">{buttonFilter}</ul>;
  }
}

TaskFilter.propTypes = {
  clickButtonFilter: PropTypes.func,
  activeButton: PropTypes.string,
};
