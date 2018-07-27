/*jshint esversion:6 */
import React, { Component } from 'react';
import uuid from 'uuid';
import { PropTypes } from 'prop-types';
import Todos from './Todos';

class AddTodo extends Component {
    state={
        term :''
    }
    setText=(event) =>{
       this.setState({term: event.target.value});
        
      }
    handleSubmit(e) {
        let newTodo = {
            id: uuid.v4(),
            title: this.state.term,
            check: false
        }
        this.props.onSubmit(newTodo);
        this.setState({term:''})
       
    }
    render() {
        return ( 
        <div>
            <h3>Add a new item:</h3>
            <input value={this.state.term} onChange={this.setText}/>
            <button onClick = {this.handleSubmit.bind(this)} value = 'submit'>Add</button> 
        </div>
        )
    }
}

AddTodo.propTypes = {
    onSubmit: PropTypes.func.isRequired
}
export default AddTodo;