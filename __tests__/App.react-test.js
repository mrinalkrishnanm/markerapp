import RouteItem from '../src/RouteList/RouteItem.js';

import App from '../src/App.js';
import ReactDOM from 'react-dom';
import React from 'react';
import { mount } from 'enzyme';
import TestUtils from 'react-addons-test-utils';
import RouteList from '../src/RouteList/RouteList.js';


test('RouteItem received props', () => {
  const route = { destination:{lat: 13.0826802, lng: 80.27071840000008},
  destination_address:"Chennai, Tamil Nadu, India",source:{lat: 28.7040592, lng: 77.10249019999992},source_address:"Delhi, India" };
  const wrapper = mount(
    <RouteItem route={route} />
  );
  const p = wrapper.find('h2');
  expect(p.text()).toBe("Chennai, Tamil Nadu, India to Delhi, India");
});


describe('RouteItem', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        const route = { destination:{lat: 13.0826802, lng: 80.27071840000008}, destination_address:"Chennai, Tamil Nadu, India",source:{lat: 28.7040592, lng: 77.10249019999992},source_address:"Delhi, India" };
        ReactDOM.render(<RouteItem route={route} history={null}/>, div);
    });
});

describe('RouteList', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        const route = [{destination:{lat: 13.0826802, lng: 80.27071840000008}, destination_address:"Chennai, Tamil Nadu, India",source:{lat: 28.7040592, lng: 77.10249019999992},source_address:"Delhi, India" }];
        ReactDOM.render(<RouteList routes={route} history={null}/>, div);
    });
});

describe('App', () => {
    it('Submit button calls a function', () => {
        const page = <App />;
		const pageMounted = mount(page);
		const button = pageMounted.find('.submit');
		expect(button.length).toBe(1);
		button.simulate('click'); 
	});
});



