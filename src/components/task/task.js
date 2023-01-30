import { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

export default class Task extends Component {
  state = {
    label: this.props.label,
  };

  onLabelChandge = (e) => {
    this.setState({ label: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onNewLabel(this.state.label, this.props.id);
    this.props.onRename(this.props.id);
  };

  render() {
    const { label, onDeleted, onToggleDone, done, isChecked, onRename, isRename, createDate } = this.props;

    let classNames = 'view';
    if (done) {
      classNames = 'completed';
    }
    if (isRename) {
      return (
        <form className={classNames} onSubmit={this.onSubmit}>
          <input className="new-todo" autoFocus value={this.state.label} onChange={this.onLabelChandge} />
        </form>
      );
    } else {
      return (
        <div className={classNames}>
          <input className="toggle" type="checkbox" checked={isChecked} onChange={onToggleDone} />
          <label>
            <span className="description" onClick={onToggleDone}>
              {label}
            </span>
            <span className="created">
              {'created ' +
                formatDistanceToNow(createDate, {
                  includeSeconds: true,
                })}
              {' ago'}
            </span>
          </label>
          <button className="icon icon-edit" onClick={onRename}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
      );
    }
  }
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
