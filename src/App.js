import React, { Component } from 'react';
import './App.css';
import Header from './header/Header';
import uuidv1 from 'uuid';
import autoBind from 'react-autobind';

class App extends Component {
	constructor(props){
		super(props);
		autoBind(this)
		const ref = this;
		ref.state = {
			todos: [
				
			],
			condition: false,
			errors: '',
			unfinished: 0
		}
	}

	addtodos() {
		const ref = this;
		ref.setState({
			condition: !ref.state.condition
		})
	}

	canceltodos() {
		const ref = this;
		ref.setState({
			condition: !ref.state.condition
		})
	}

	addtodo() {
		const ref = this;
		const title = ref.refs.name.value;
		const task = ref.refs.task.value;
		if(title !== '' && task !== '') {
			let taskObj = {"Project": title, "Task": task, "id": uuidv1(), "completed" : false}
			ref.state.todos.push(taskObj)
			ref.setState({
				todos: ref.state.todos,
				condition: !ref.state.condition,
				errors: '',
				unfinished: ++ref.state.unfinished
			})
			localStorage.setItem('Todo', JSON.stringify(ref.state.todos));
			localStorage.setItem('Unfinished', JSON.stringify(ref.state.unfinished));
			ref.refs.task.value = '';
			ref.refs.name.value = '';
		} else if(!title){
			this.setState({errors: "Please Enter Some Title"})
		} else if(!task){
			this.setState({errors: "Please Enter Some Task"})
		}else{
			this.setState({
				errors: [
					{	
						title: "Please add title",
						task: "Please add task",
					}
				]
			})
		}
	}

	handleChecked(e, el) {
		const ref = this;
		const data = this.state.todos.find(todo => todo.id === el.id)
    	if (e.target.checked) {
			data.completed = !data.completed
			localStorage.setItem('Todo', JSON.stringify(this.state.todos))
			this.setState({
				todos: this.state.todos,
				unfinished: --ref.state.unfinished
			})
			localStorage.setItem('Unfinished', JSON.stringify(this.state.unfinished))
    	} else{
			data.completed = !data.completed
			this.setState({
				todos: this.state.todos,
				unfinished: ++ref.state.unfinished
			})
			localStorage.setItem('Todo', JSON.stringify(this.state.todos))
			localStorage.setItem('Unfinished', JSON.stringify(this.state.unfinished))
		}
  }

	deletetodo(el) {
		const ref = this
		this.setState({
			todos: this.state.todos.filter(todo => todo.id != el.id),
			unfinished: --ref.state.unfinished
		});
		localStorage.setItem('Todo', JSON.stringify(ref.state.todos.filter(todo => todo.id != el.id)));
		localStorage.setItem('Unfinished', JSON.stringify(this.state.unfinished))
	}

	componentWillMount(){
		const data = JSON.parse(localStorage.getItem('Todo')) || [];
		const unfinished = JSON.parse(localStorage.getItem('Unfinished')) || 0;
		this.setState({
			todos: data,
			unfinished: unfinished
		})
	}

    render() {
    	const ref = this;
    	let massage1 = ''
    	let massage2 = ''
    	if(ref.state.errors === "Please Enter Some Title") {
    		massage1 = "Please Enter Some Title"
    	} else if (ref.state.errors === "Please Enter Some Task") {
    		massage2 = "Please Enter Some Task"
    	}
        return (
            <div className={ref.state.condition ? "App todosadding": "App"}>
            	<div className="wrapper">
            		<Header header={ref.state.condition} open={ref.state.unfinished}/>
            		<div className="body">
            			<div className={ref.state.condition ? "main hide": "main"}>
	            			<section>
	            				{
									ref.state.todos.map((el,i) => {
										return (
											<div className="todos">
												<div className="todos_checkbox">
													<input type="checkbox" checked={el.completed ? true : false} id={i} onChange={(e, id) => this.handleChecked(e, el)}/>
													<label for={i}></label>
												</div>
												<div className="todos_details">
													<div className="project">{el.Project}</div>
													<div className="task">{el.Task}</div>
												</div>
												<div className="delete_todo">
													<button className="delete" onClick={() => ref.deletetodo(el)} id={i}>
														<div className="block"></div>
													</button>
												</div>
											</div>
										)
									})
	            				}
	            			</section>
	            			<div className="addTodos">
	            				<button onClick={ref.addtodos.bind(ref)}>
	            					<div className="line_width"></div>
	            					<div className="line_height"></div>
	            				</button>
	            			</div>
            			</div>
        				<div className={ref.state.condition ? "inputTodos show": "inputTodos hide"}>
            				<div className="add_project">
        						<div className="text">Project</div>
								<input type="text" placeholder="Enter Project Name" ref="name"/>
								<div className="errors">
									{massage1}
								</div>
            				</div>
            				<div className="add_task">
        						<div className="text">Task</div>
								<input type="text" placeholder="Enter Task Details" ref="task"/>
								<div className="errors">{massage2}</div>
            				</div>
            				<div className="main_button">
            					<button className="cancel" onClick={ref.canceltodos.bind(ref)}>Cancel</button>
            					<button className="save" onClick={ref.addtodo.bind(ref)}>save</button>
            				</div>
            			</div>
            		</div>
            	</div>
            </div>
        );
    }
}

export default App;