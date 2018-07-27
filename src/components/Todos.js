/* jshint esversion:6 */
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { render } from 'react-dom';

class Todos extends Component {
    deleteElement(id) {
        console.log('id');
        this.props.onDelete(id);
    }
    checkElement(id) {
        this.props.onCheck(id);
    }
    render() {
        let todoItems;
        if (this.props.todos) {
            // console.log(this.props);
            todoItems = this.props.todos.map(todo => {
                // console.log(todo);
                return ( 
                    <li className = "todoItem" >
                    <input type = "checkbox" onClick = { this.checkElement.bind(this,todo.id) }/>
                    { todo.title }
                    <button onClick = { this.deleteElement.bind(this,todo.id) } >Delete</button> 
                    </li>
                );
            })
        }
        return ( < div className = "Todos" > { todoItems } < /div>);
        }
    }
Todos.propTypes = {
    todos: PropTypes.array,
    onDelete: PropTypes.func.isRequired,
    onCheck: PropTypes.func.isRequired
}
export default Todos;