/*jshint esversion:6 */
import React from 'react';
import ReactDOM from 'react-dom';
import TodoContainer from '../components/TodoContainer';
import AddTodo from '../components/AddTodo';
import Todos from '../components/Todos';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter });
describe('TodoContainer', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow( < TodoContainer / > );
    });
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render( < TodoContainer / > , div);
        ReactDOM.unmountComponentAtNode(div);
    });
    it('should start with an empty list', () => {
        expect(wrapper.state('todos')).toEqual([]);
    });
    it('addTodoHandler(todo) should add items to the list', () => {
        let item1 = { title: "Item1", id: 1, check: false }
        wrapper.instance().addTodoHandler(item1);
        expect(wrapper.state('todos')).toEqual([item1]);
    });
    it('deleteTodoHandler(id) should delete items from the list', () => {
        let item1 = { title: "Item1", id: 1, check: false }
        let item2 = { title: "Item2", id: 2, check: false }
        wrapper.instance().addTodoHandler(item1);
        wrapper.instance().addTodoHandler(item2);
        wrapper.instance().deleteTodoHandler(1);
        expect(wrapper.state('todos')).toEqual([item2]);
    });
    it('checkTodoHandler(id) should the check the item from the list', () => {
        let item1 = { title: "Item1", id: 1, check: false }
        let item2 = { title: "Item2", id: 2, check: false }

        let expected = [
            { title: "Item1", id: 1, check: false },
            { title: "Item2", id: 2, check: true }
        ]
        wrapper.instance().addTodoHandler(item1);
        wrapper.instance().addTodoHandler(item2);
        wrapper.instance().checkTodoHandler(2);
        expect(wrapper.state('todos')).toEqual(expected);
    });
    it('passes addTodoHandler to the AddTodo', () => {
        const addTodo = wrapper.find(AddTodo);
        const getTodoHandler = wrapper.instance().addTodoHandler;
        expect(addTodo.prop('onSubmit')).toEqual(getTodoHandler);
    });
    it('checks addTodohandler passed to AddTodo is working', () => {

        const addTodo = wrapper.find(AddTodo);
        let item1 = { title: "Item1", id: 1, check: false };
        addTodo.prop('onSubmit')(item1);
        expect(wrapper.state('todos')).toEqual([item1]);

    });
    it('passes checkTodoHandler,deleteTodoHandler and state to the Todos', () => {
        const todos = wrapper.find(Todos);
        const state = wrapper.state('todos');
        const onCheck = wrapper.instance().checkTodoHandler;
        const onDelete = wrapper.instance().deleteTodoHandler;
        expect(todos.prop('onCheck')).toEqual(onCheck);
        expect(todos.prop('onDelete')).toEqual(onDelete);
        expect(todos.prop('todos')).toEqual(state);
    });
    it('checks checkTodoHandler and state passed to the Todos is working', () => {
        const todos = wrapper.find(Todos);
        let item1 = { title: "Item1", id: 1, check: false };
        let item2 = { title: "Item2", id: 2, check: false };
        wrapper.instance().addTodoHandler(item1);
        wrapper.instance().addTodoHandler(item2);
        todos.prop('onCheck')(2);
        let expected = [
            { title: "Item1", id: 1, check: false },
            { title: "Item2", id: 2, check: true }
        ]
        expect(wrapper.state('todos')).toEqual(expected);
    });
    it('checks deleteTodoHandler and state passed to the Todos is working', () => {
        const todos = wrapper.find(Todos);
        let item1 = { title: "Item1", id: 1, check: false };
        let item2 = { title: "Item2", id: 2, check: false };
        wrapper.instance().addTodoHandler(item1);
        wrapper.instance().addTodoHandler(item2);
        todos.prop('onDelete')(2);
        let expected = [
            { title: "Item1", id: 1, check: false }
        ]
        expect(wrapper.state('todos')).toEqual(expected);
    });

});