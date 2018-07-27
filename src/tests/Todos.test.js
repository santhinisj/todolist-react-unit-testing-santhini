/*jshint esversion:6 */
import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow,mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Todos from '../components/Todos';
import { spy } from 'sinon';

configure({ adapter: new Adapter });

describe('Todos', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow( < Todos / > );
    });
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render( < Todos / > , div);
        ReactDOM.unmountComponentAtNode(div);
    });
    it('should render zero items', () => {
    const wrapper = shallow(<Todos items={[]}/>);
    expect(wrapper.find('li')).toHaveLength(0);
  });

  it('should render undefined items', () => {
    const wrapper = shallow(<Todos items={undefined}/>);
    expect(wrapper.find('li')).toHaveLength(0);
  });

  it('should render some items', () => {
    const items = ['Sam Adams', 'Resin', 'Octoberfest'];
    const wrapper = shallow(<Todos todos={items}/>);
    expect(wrapper.find('li')).toHaveLength(3);
  });
  it('should call deleteElement when delete is clicked', () => {
        const deleteItemSpy = spy();
        let item1 = { title: "Item1", id: 1, check: false }
        let wrapper = shallow(<Todos onDelete={deleteItemSpy} todos={[item1]} />);
        const deleteButton = wrapper.find('button');
        deleteButton.simulate('click');
        console.log(deleteButton);
        expect(deleteItemSpy.calledOnce).toEqual(true);
        expect(deleteItemSpy.calledWith(1)).toEqual(true);
  });
  it('should call checkElement when check is clicked', () => {
        const checkItemSpy = spy();
        let item1 = { title: "Item1", id: 1, check: false }
        let wrapper = shallow(<Todos onCheck={checkItemSpy} todos={[item1]} />);
        const checkButton = wrapper.find('input');
        checkButton.simulate('click');
        console.log(checkButton);
        expect(checkItemSpy.calledOnce).toEqual(true);
        expect(checkItemSpy.calledWith(1)).toEqual(true);
  });



});