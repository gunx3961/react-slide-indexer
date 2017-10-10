import React from 'react';
import { mount } from 'enzyme';
import IndexItem from '../IndexItem';

describe('IndexItem', () => {
  it('should render a span', () => {
    const indexItem = mount(<IndexItem index="a" focus={false} />);
    expect(indexItem.find('span').length).toBe(1);
  });

  it('should render the given index', () => {
    const indexItem = mount(<IndexItem index="b" focus={false} />);
    expect(indexItem.find('span').text()).toBe('b');
    indexItem.setProps({ index: 'c' });
    expect(indexItem.find('span').text()).toBe('c');
  });


  it('should have a data-attr with the given index', () => {
    const indexItem = mount(<IndexItem index="d" focus={false} />);
    expect(indexItem.find('div').prop('data-rsi-key')).toBe('d');
    indexItem.setProps({ index: 'e' });
    expect(indexItem.find('div').prop('data-rsi-key')).toBe('e');
  });
});
