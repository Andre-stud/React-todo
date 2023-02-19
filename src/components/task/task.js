import { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

export default class Task extends Component {
  state = {
    taskLabel: this.props.label,
    count: `${this.props.minutes}:${this.props.seconds}`,
    workCount: false,
    isTimer: this.props.isTimer,
  };

  seconds = this.props.seconds;

  minutes = this.props.minutes;

  intervalId;

  componentDidUpdate(prevProps, prevState) {
    
    if (this.state.workCount !== prevState.workCount) {
      if(this.state.workCount && !this.state.isTimer){

        this.intervalId = setInterval(() => {
          if (!this.state.workCount || this.props.done) {
            this.setState({
              workCount: false
            });
            clearInterval(this.intervalId);
          }
        
          this.seconds++;
          if(this.seconds === 60){
            this.minutes++;
            this.seconds = 0;
          }

          this.props.onChandgeTime(this.props.id, this.minutes, this.seconds );
          this.setState({count: `${this.minutes}:${this.seconds}`});
          
        }, 1000);
      }

      if(this.state.workCount && this.state.isTimer){

        this.intervalId = setInterval(() => {
          if (!this.state.workCount || this.props.done) {
            this.setState({
              workCount: false
            });
            clearInterval(this.intervalId);
          }
        
          this.seconds--;
          if(this.seconds === -1){
            this.seconds = 0;
            if(this.minutes >= 1){
              this.minutes--;
              this.seconds = 59;
            }else{
              clearInterval(this.intervalId);
            }
          }
          this.props.onChandgeTime(this.props.id, this.minutes, this.seconds );
          this.setState({count: `${this.minutes}:${this.seconds}`});
        }, 1000);
      }
    }
  }

  componentWillUnmount(){
    clearInterval(this.intervalId);
  }

  onLabelChandge = (e) => {
    this.setState({ taskLabel: e.target.value });    
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onNewLabel(this.state.taskLabel, this.props.id);
    this.props.onRename(this.props.id);
  };

  play = () =>{
    if(!this.props.done){
      this.setState({
        workCount: true
      });
    }
  };

  stop = () =>{
    this.setState({
      workCount: false
    });
  };

  render() {

    const {
  onDeleted, onToggleDone, done, isChecked, onRename, isRename, createDate,
          } = this.props;

const {taskLabel, count} = this.state;

    let classNames = 'view';
    if (done) {
      classNames = 'completed';
    }
    if (isRename) {
      return (
        <form className={classNames} onSubmit={this.onSubmit}>
          <input className="new-todo" autoFocus value={taskLabel} onChange={this.onLabelChandge} />
        </form>
      );
    }
      return (
        <div className={classNames}>
          <input className="toggle" type="checkbox" checked={isChecked} onChange={onToggleDone} />
          <label htmlFor={`${this.props.id}`}>
            <span className="description" onClick={onToggleDone} aria-hidden="true">
              {taskLabel}
            </span>
            <span className='timer'>
              <button type="button" aria-label="icon icon-play" className="icon icon-play" onClick={this.play} />
              <button type="button" id={`${this.props.id}`} aria-label="icon icon-pause" className="icon icon-pause" onClick={this.stop} />
              {count}
            </span>
            <span className="description">
              {`created ${formatDistanceToNow(createDate, {includeSeconds: true, })} ago`}
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
