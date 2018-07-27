/*jshint esversion:6 */
import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow,mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AddTodo from '../components/AddTodo';
import { spy } from 'sinon';
import TodoContainer from '../components/TodoContainer';

configure({ adapter: new Adapter });

describe('AddTodo', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow( < AddTodo / > );
    });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render( < AddTodo / > , div);
        ReactDOM.unmountComponentAtNode(div);
    });
    it('should contain an input and a button', () => {
        expect(wrapper.containsMatchingElement(<input/>)).toEqual(true);
        expect(wrapper.containsMatchingElement(<button>Add</button>)).toEqual(true);
    });
    it('should accept input', () => {
        let wrapper =mount(<AddTodo/>);
        const input = wrapper.find('input');
        input.simulate('change', {target: { value: 'Resin' }});
        expect(wrapper.state('term')).toEqual("Resin");
        // expect(input.prop('value')).toEqual("Resin");
  });
  it('should call handleSubmit when Add is clicked', () => {
        const addItemSpy = spy();
        let wrapper = shallow(<AddTodo onSubmit={addItemSpy}/>);
        wrapper.setState({term: 'Octoberfest'});
        const addButton = wrapper.find('button');
        addButton.simulate('click');
        expect(addItemSpy.calledOnce).toEqual(true);
        // expect(addItemSpy.calledWith(title:'Octoberfest')).toEqual(true);
  });



});