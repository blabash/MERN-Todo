import React, { Component } from 'react';

export default class CreateTodo extends Component {

    constructor(props) {
        super(props);

        this.onChangeTodo = this.onChangeTodo.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false,
        }
    }

    onChangeTodo(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        console.log(`Form submitted:`);
        console.log(`Todo Description: ${this.state.todo_description}`);
        console.log(`Todo Responsible: ${this.state.todo_responsible}`);
        console.log(`Todo Priority: ${this.state.todo_priority}`);
        console.log(`Todo Completed: ${this.state.todo_completed}`);

        this.setState({
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false,
        })
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Create New Todo</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                                className="form-control"
                                name="todo_description"
                                value={this.state.todo_description}
                                onChange={this.onChangeTodo}
                                />
                    </div>
                    <div className="form-group">
                        <label>Responsible: </label>
                        <input type="text"
                                className="form-control"
                                name="todo_responsible"
                                value={this.state.todo_responsible}
                                onChange={this.onChangeTodo}
                                />
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                    type="radio"
                                    name="todo_priority"
                                    id="priorityLow"
                                    value="Low"
                                    checked={this.state.todo_priority==='Low'}
                                    onChange={this.onChangeTodo}
                                    />
                            <label className="form-check-label">Low</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                    type="radio"
                                    name="todo_priority"
                                    id="priorityMedium"
                                    value="Medium"
                                    checked={this.state.todo_priority==='Medium'}
                                    onChange={this.onChangeTodo}
                                    />
                            <label className="form-check-label">Medium</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                    type="radio"
                                    name="todo_priority"
                                    id="priorityHigh"
                                    value="High"
                                    checked={this.state.todo_priority==='High'}
                                    onChange={this.onChangeTodo}
                                    />
                            <label className="form-check-label">High</label>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}