import { Component } from 'react';

import Footer from '../footer';
import TaskList from '../task-list';
import NewTaskForm from '../new-task-form';

export default class App extends Component {
  maxId = 100;

  state = {
    tododata: [],
    activebutton: 'all',
  };

  addItem = (task, date, minutes, seconds, isTimer) => {
    this.setState(({ tododata }) => {
      const element = this.createTodoItem(task, date, minutes, seconds, isTimer);
      const newArray = [...tododata, element];
      return {
        tododata: newArray,
      };
    });
  };

  deleteItem = (id) => {
    this.setState(({ tododata }) => {
      const idx = tododata.findIndex((el) => el.id === id);
      const newArray = [...tododata.slice(0, idx), ...tododata.slice(idx + 1)];
      return {
        tododata: newArray,
      };
    });
  };

  deleteItemCompleted = () => {
    const newArr = [...this.state.tododata].filter((el) => !el.done);
    this.setState(() => ({
      tododata: newArr,
    }));
  };

  onNewLabel = (newLabel, id) => {
    this.setState(({ tododata }) => {
      const idx = tododata.findIndex((el) => el.id === id);
      const oldItem = tododata[idx];
      const newItem = {
        ...oldItem,
        label: newLabel,
      };

      const newArray = this.newArray(tododata, newItem, idx);
      return {
        tododata: newArray,
      };
    });
  };

  newArray = (oldArray, newItem, idx) => {
    const newArray = [...oldArray.slice(0, idx), newItem, ...oldArray.slice(idx + 1)];

    return newArray;
  };

  onRename = (id) => {
    this.setState(({ tododata }) => {
      const idx = tododata.findIndex((el) => el.id === id);
      const oldItem = tododata[idx];
      const newItem = {
        ...oldItem,

        isRename: !oldItem.isRename,
      };

      const newArray = this.newArray(tododata, newItem, idx);
      return {
        tododata: newArray,
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ tododata }) => {
      const idx = tododata.findIndex((el) => el.id === id);
      const oldItem = tododata[idx];
      const newItem = {
        ...oldItem,
        done: !oldItem.done,
        isChecked: !oldItem.isChecked,
      };

      const newArray = this.newArray(tododata, newItem, idx);
      return {
        tododata: newArray,
      };
    });
  };

  onChandgeTime = (id, minutes, seconds) => {
    this.setState(({ tododata }) => {
      const idx = tododata.findIndex((el) => el.id === id);
      const oldItem = tododata[idx];
      const newItem = {
        ...oldItem,
        minutes,
        seconds,
      };

      const newArray = this.newArray(tododata, newItem, idx);
      return {
        tododata: newArray,
      };
    });
  };

  createTodoItem(label, date, minutes, seconds, isTimer) {
    return {
      label,
      done: false,
      id: this.maxId++,
      isChecked: false,
      isRename: false,
      createDate: date,
      minutes,
      seconds,
      isTimer,
    };
  }

  render() {
    const { tododata, activebutton } = this.state;
    const doneCount = tododata.filter((el) => el.done).length;
    const todoCount = tododata.length - doneCount;

    this.clickButtonFilter = (name) => {
      this.setState({ activebutton: name });
    };

    return (
      <section className="todoapp">
        <NewTaskForm onItemAdded={this.addItem} />
        <section className="main">
          <TaskList
            data={tododata}
            onDeleted={this.deleteItem}
            onToggleDone={this.onToggleDone}
            onRename={this.onRename}
            onNewLabel={this.onNewLabel}
            onChandgeTime={this.onChandgeTime}
            activeButton={activebutton}
          />
          <Footer
            todoCount={todoCount}
            onDeleteCompletedItem={this.deleteItemCompleted}
            clickButtonFilter={this.clickButtonFilter}
            activeButton={activebutton}
          />
        </section>
      </section>
    );
  }
}
