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
    const {
 label, onDeleted, onToggleDone, done, isChecked, onRename, isRename, createDate,
} = this.props;

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
    }
      return (
        <div className={classNames}>
          <input className="toggle" type="checkbox" checked={isChecked} onChange={onToggleDone} />
          <label>
            <span className="description" onClick={onToggleDone} aria-hidden="true">
              {label}
            </span>
            <span className="created">
              {`created ${
                formatDistanceToNow(createDate, {
                  includeSeconds: true,
                })}`}
              {' ago'}
            </span>
          </label>
          <button type="button" aria-label="icon-edit" className="icon icon-edit" onClick={onRename} />
          <button type="button" aria-label="icon-destroy" className="icon icon-destroy" onClick={onDeleted} />
        </div>
      );
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

Task.defaultProps = {
  label: '',
  onDeleted: undefined,
  onToggleDone: undefined,
  done: false,
  isChecked: false,
  onRename: undefined,
  isRename: false,
};
