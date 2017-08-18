import RouteItem from '../src/RouteList/RouteItem.js';
import Map from '../src/Map.js';
import React from 'react';
import { mount } from 'enzyme';

test('RouteItem received props', () => {
  const todo = { destination:{lat: 13.0826802, lng: 80.27071840000008},
destination_address:"Chennai, Tamil Nadu, India",source:{lat: 28.7040592, lng: 77.10249019999992},source_address:"Delhi, India" };
  const wrapper = mount(
    <RouteItem route={todo} />
  );
  const p = wrapper.find('h2');
  expect(p.text()).toBe("Chennai, Tamil Nadu, India to Delhi, India");
});