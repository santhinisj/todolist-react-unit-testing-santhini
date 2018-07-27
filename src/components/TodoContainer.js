/* jshint esversion:6 */
import React, { Component } from 'react';
import { render } from 'react-dom';
import AddTodo from './AddTodo';
import Todos from './Todos';
// import uuid from 'uuid';
class TodoContainer extends Component {
    state = {
        todos: []
    }
    addTodoHandler = (todo) => {
        let prevTodos = [...this.state.todos, todo];   
        this.setState({ todos: prevTodos });
    }
    deleteTodoHandler = (id) => {
        let prevTodos = this.state.todos;
        let todosAfterDeletion = prevTodos.filter(todo => todo.id != id);
        this.setState({ todos: todosAfterDeletion });

    }
    checkTodoHandler = (id) => {
        let prevTodos = this.state.todos;
        let todosAfterUpdation = prevTodos.map(todo => {
            if (todo.id === id)
                todo.check = !todo.check;
            return todo;
        })
        this.setState({ todos: todosAfterUpdation });

    }
    render() {
        return (
            <div className = "TodoContainer" >
            <h1> TODOLIST</h1>
            <AddTodo onSubmit ={ this.addTodoHandler }/>
            <Todos todos = { this.state.todos }
            onCheck = { this.checkTodoHandler }
            onDelete = { this.deleteTodoHandler }
            />
            </div>


        )
    }
}
export default TodoContainer;