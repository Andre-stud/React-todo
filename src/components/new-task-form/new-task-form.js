import { Component } from 'react';

export default class NewTaskForm extends Component {
  state = {
    label: '',
  };

  onLabelChandge = (e) => {
    this.setState({ label: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onItemAdded(this.state.label, new Date());
    this.setState({ label: '' });
  };

  render() {
    return (
      <form className="header" onSubmit={this.onSubmit}>
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={this.onLabelChandge}
          value={this.state.label}
        />
      </form>
    );
  }
}
