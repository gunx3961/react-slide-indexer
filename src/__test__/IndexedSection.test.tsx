import * as React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import IndexedSection from '../IndexedSection';

describe('IndexedSection', () => {
  // it('should render a heading', () => {
  //   const section = mount(
  //     <IndexedSection
  //       index="f"
  //       sectionRef={() => { }}
  //     >
  //       <span>foobar</span>
  //     </IndexedSection>
  //   );

  //   const heading = section.find('div[role="heading"]');
  //   expect(heading).toHaveLength(1);
  //   expect(heading.text()).toBe('f');
  // });

  it('should call ref function properly', () => {
    const sectionRef = sinon.spy();
    const section = mount(
      <IndexedSection
        index="f"
        sectionRef={sectionRef}
      >
        <span>foo</span>
      </IndexedSection>
    );
    expect(sectionRef.calledOnce).toBeTruthy();
    expect(sectionRef.args[0][0]).toBeInstanceOf(HTMLDivElement);
  });

  it('should render the children prop as it is', () => {
    const section = mount(
      <IndexedSection
        index="f"
        sectionRef={() => { }}
      >
        <div>foo</div>
        <div>bar</div>
      </IndexedSection>
    );

    expect(section.find('div[role="section"]').children()).toHaveLength(2);
    expect(section.contains([
      <div>foo</div>,
      <div>bar</div>,
    ])).toBeTruthy();
  });

  // it('should throw an error when being rendered without index props', () => {
  //   expect(() => {
  //     mount(<IndexedSection sectionRef={() => { }} />);
  //   }).toThrow();
  // });
});
