import * as React from 'react';
import SlideIndexer from '../SlideIndexer';
import IndexedSection from '../IndexedSection';
import Slider from '../Slider';
import { mount } from 'enzyme';

describe('A suite', () => {
  it('should render without any exceptions', () => {
    const indexer = mount(<SlideIndexer />);
    expect(indexer).toHaveLength(1);
  });

  it('should render sections properly', () => {
    const sections = Array.from(new Array(5), (v, i) => `${i}`).map((v) => (
      <IndexedSection index={v} key={v} sectionRef={() => { }}>
        <div>{v}</div>
      </IndexedSection>
    ));

    const indexer = mount(
      <SlideIndexer>
        {sections}
      </SlideIndexer>
    );

    const instance = indexer.instance() as SlideIndexer;
    expect(Object.keys(instance.sections)).toHaveLength(sections.length);
    expect(instance.sections['3']).toBeInstanceOf(HTMLDivElement);

    const slider = indexer.find(Slider);
    expect(slider.prop('indexes')).toEqual(Array.from(new Array(5), (v, i) => `${i}`));
  });

  it('should use the root element as default container', () => {
    const indexer = mount(<SlideIndexer />);
    expect(indexer.state('container')).toBe(document.documentElement);
  });

  it('should only accept IndexedSection as a child', () => {
    const sections = Array.from(new Array(5), (v, i) => `${i}`).map((v) => (
      <IndexedSection index={v} key={v} sectionRef={() => { }}>
        <div>{v}</div>
      </IndexedSection>
    ));

    const indexer = mount(
      <SlideIndexer>
        <div>foo</div>
        {sections}
        <div>bar</div>
      </SlideIndexer>
    );

    const instance = indexer.instance() as SlideIndexer;
    expect(Object.keys(instance.sections)).toHaveLength(sections.length);
    expect(indexer.find('div[role="slide-indexer"]').children()).toHaveLength(sections.length + 1);
  });
});
