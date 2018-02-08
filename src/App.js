import React, { Component } from 'react';
import './App.css';
import Header from './header/Header'

class App extends Component {
	constructor(props){
		super(props)
		const ref = this;
		ref.state = {
			todos: [
				{
					"Project": "Work",
					"Task": "Create a report for the previous week"
				},
				{
					"Project": "Personal",
					"Task": "Enrol the doctor tomorrow"
				},
				{
					"Project": "Work",
					"Task": "Write to Julia about conference"
				},
				{
					"Project": "Femily",
					"Task": "Pick up my son from school"
				},
				{
					"Project": "Study",
					"Task": "Make a presentation on topic \"web design\""
				},
				{
					"Project": "Femily",
					"Task": "Buy vegetables for salad (tomatoes, cucumbers)"
				},
			],
			condition: false,
			completed: []
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
		let taskObj = {"Project": title, "Task": task}
		ref.setState({
			todos: this.state.todos.concat(taskObj),
			condition: !ref.state.condition			
		})
	}

	handleChecked(e, i) {
		console.log(e.target.checked, i)
	}

    render() {
    	const ref = this;
        return (
            <div className={ref.state.condition ? "App todosadding": "App"}>
            	<div className="wrapper">
            		<Header header={this.state.condition}/>
            		<div className="body">
            			<div className={ref.state.condition ? "main hide": "main"}>
	            			<section>
	            				{
									ref.state.todos.map((el,i) => {
										return (
											<div className="todos">
												<div className="todos_checkbox">
													<input type="checkbox" id={i} onChange={(e, i) => this.handleChecked(e, i)}/>
													<label for={i}></label>
												</div>
												<div className="todos_details">
													<div className="project">{el.Project}</div>
													<div className="task">{el.Task}</div>
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
            				</div>
            				<div className="add_task">
        						<div className="text">Task</div>
								<input type="text" placeholder="Enter Task Details" ref="task"/>
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