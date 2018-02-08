import React, { Component } from "react";
import "./App.css";
import Header from "./header/Header";
import uuidv1 from "uuid";
import autoBind from "react-autobind";

class App extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    const ref = this;
    ref.state = {
      todos: [],
      condition: false
    };
  }

  addtodos() {
    const ref = this;
    ref.setState({
      condition: !ref.state.condition
    });
  }

  canceltodos() {
    const ref = this;
    ref.setState({
      condition: !ref.state.condition
    });
  }

  addtodo() {
    const ref = this;
    const title = ref.refs.name.value;
    const task = ref.refs.task.value;
    let taskObj = {
      Project: title,
      Task: task,
      completed: false,
      id: uuidv1()
    };
		ref.state.todos.push(taskObj);
		ref.setState({todos: ref.state.todos, condition: !ref.state.condition})
		ref.refs.name.value = '';
		ref.refs.task.value = '';
		console.log(ref.state.todos)
		localStorage.setItem('Todo', JSON.stringify(ref.state.todos))
  }
	
  handleChecked(e, el) {
		const data = this.state.todos.find(todo => todo.id === el.id)
    if (e.target.checked) {
			data.completed = !data.completed
			localStorage.setItem('Todo', JSON.stringify(this.state.todos))
			this.setState({todos: this.state.todos})
    } else{
			data.completed = !data.completed
			this.setState({todos: this.state.todos})
			localStorage.setItem('Todo', JSON.stringify(this.state.todos))
		}
  }

	componentWillMount(){
		const todos = JSON.parse(localStorage.getItem('Todo')) || [];
		this.setState({todos})
	}
  render() {
    const ref = this;
    return (
      <div className={ref.state.condition ? "App todosadding" : "App"}>
        <div className="wrapper">
          <Header header={this.state.condition} todo={this.state.todos}/>
          <div className="body">
            <div className={ref.state.condition ? "main hide" : "main"}>
              <section>
                {ref.state.todos.map((el, i) => {
                  return (
                    <div className="todos" key={el.id}>
                      <div className="todos_checkbox">
                        <input
                          type="checkbox"
													checked={el.completed ? true : false}
                          id={i}
                          onChange={(e, id) => this.handleChecked(e, el)}
                        />
                        <label htmlFor={i} />
                      </div>
                      <div className="todos_details">
                        <div className="project">{el.Project}</div>
                        <div className="task">{el.Task}</div>
                      </div>
                    </div>
                  );
                })}
              </section>
              <div className="addTodos">
                <button onClick={ref.addtodos.bind(ref)}>
                  <div className="line_width" />
                  <div className="line_height" />
                </button>
              </div>
            </div>
            <div
              className={
                ref.state.condition ? "inputTodos show" : "inputTodos hide"
              }
            >
              <div className="add_project">
                <div className="text">Project</div>
                <input
                  type="text"
                  placeholder="Enter Project Name"
                  ref="name"
                />
              </div>
              <div className="add_task">
                <div className="text">Task</div>
                <input
                  type="text"
                  placeholder="Enter Task Details"
                  ref="task"
                />
              </div>
              <div className="main_button">
                <button className="cancel" onClick={ref.canceltodos.bind(ref)}>
                  Cancel
                </button>
                <button className="save" onClick={ref.addtodo}>
                  save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
