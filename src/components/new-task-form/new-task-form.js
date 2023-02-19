import { Component } from 'react';

export default class NewTaskForm extends Component {
  state = {
    label: '',
    minutes: '',
    seconds: '',
    isTimer: true,
  };

  onLabelChandge = (e) => {
    this.setState({ label: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    
    let {minutes, seconds, isTimer} = this.state;

    if(!minutes && !seconds){
      isTimer = false;
    }

    if(!minutes){
      minutes = 0;
    }

    if(!seconds){
      seconds = 0;
    }

    this.props.onItemAdded(this.state.label, new Date(), minutes, seconds, isTimer);
    this.setState({ label: '',
                    minutes: '',
                    seconds: '' 
                  });
  };

  onMinChandge = (e) =>{
    this.setState({ minutes: e.target.value });
  };

  onSecChandge = (e) =>{
    this.setState({ seconds: e.target.value });
  };

  render() {
    return (
      <>
      <h1>todos</h1>
      <form className="new-todo-form" onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          placeholder="Task"
          onChange={this.onLabelChandge}
          value={this.state.label}
          autoFocus
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          type="number"
          max="99"
          min="0"
          onChange={this.onMinChandge}
          value={this.state.minutes}
          autoFocus
        />
        <input
         className="new-todo-form__timer" 
         placeholder="Sec" 
         type="number"
         max="59"
         min="0"
         onChange={this.onSecChandge} 
         value={this.state.seconds} 
         autoFocus 
         />
        <input type="submit" className="submit-input" />
      </form>
      </>
    );
  }
}
