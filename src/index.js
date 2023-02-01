import { createRoot } from 'react-dom/client';
import { Component } from 'react';

import './components/index.css';

import Footer from './components/footer';
import TaskList from './components/task-list';
import NewTaskForm from './components/new-task-form';

class App extends Component {
  maxId = 100;

  state = {
    tododata: [],
    activebutton: 'all',
  };

  addItem = (task, date) => {
    this.setState(({ tododata }) => {
      const element = this.createTodoItem(task, date);
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

  createTodoItem(label, date) {
    return {
      label,
      done: false,
      id: this.maxId++,
      isChecked: false,
      isRename: false,
      createDate: date,
    };
  }

  filterButton(data, nameFilter) {
    switch (nameFilter) {
      case 'all':
        return data;
      case 'active':
        return data.filter((el) => !el.done);
      case 'completed':
        return data.filter((el) => el.done);
      default:
        return data;
    }
  }

  render() {
    const { tododata, activebutton } = this.state;
    const doneCount = tododata.filter((el) => el.done).length;
    const todoCount = tododata.length - doneCount;

    const visibleItems = this.filterButton(tododata, activebutton);
    this.clickButtonFilter = (name) => {
      this.setState({ activebutton: name });
    };

    return (
      <section className="todoapp">
        <NewTaskForm onItemAdded={this.addItem} />
        <section className="main">
          <TaskList
            data={visibleItems}
            onDeleted={this.deleteItem}
            onToggleDone={this.onToggleDone}
            onRename={this.onRename}
            onNewLabel={this.onNewLabel}
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

const container = document.getElementById('root');

createRoot(container).render(<App />);
