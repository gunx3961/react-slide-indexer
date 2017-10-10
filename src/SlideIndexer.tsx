import React from 'react';

import Slider from './Slider';
import getOffsetTop from './utils/getOffsetTop';
import getDeltaY from './utils/getDeltaY';

export interface Props {
  container?: HTMLElement;
}


export default class SlideIndexer extends React.PureComponent<Props, {}> {
  static defaultProps: Partial<Props> = {
    container: document.documentElement,
  };

  sections: { [index: string]: HTMLElement };

  constructor() {
    super();
    this.sections = {};
  }

  componentWillUnmount() {
    this.sections = {};
  }

  handleNavigation(index: string): void {
    const { container } = this.props;
    if (container === document.documentElement) {
      container.scrollTop = getOffsetTop(this.sections[index]);
    } else {
      container.scrollTop = getDeltaY(this.sections[index], container);
    }
  }

  render() {
    const {
      children: childrenProp,
    } = this.props;
    const indexes: Array<string> = [];
    const children = React.Children.map(childrenProp, (child) => {
      if (!React.isValidElement<any>(child)) return null;
      // if (!React.isValidElement<{ index: string }>(child)) return null;

      const index = child.props.index;
      indexes.push(index);
      return React.cloneElement(child, {
        sectionRef: (el) => { this.sections[index] = el; }
      });
    });

    return (
      <div
        role="slide-indexer"
      >
        <Slider
          indexes={indexes}
          onRequestNavigation={this.handleNavigation}
        />
        {children}
      </div>
    );
  }
}

