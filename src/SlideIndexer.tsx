import * as React from 'react';

import Slider from './Slider';
import IndexedSection from './IndexedSection';
import getOffsetTop from './utils/getOffsetTop';
import getDeltaY from './utils/getDeltaY';

export interface Props {
  getContainer?: { (): HTMLElement };
  sliderClassName?: string;
  indexItemClassName?: string;
}

export interface State {
  container: HTMLElement;
}

export default class SlideIndexer extends React.Component<Props, State> {
  static defaultProps: Partial<Props> = {
    getContainer: () => document.documentElement,
    sliderClassName: 'rsi-slider',
    indexItemClassName: 'rsi-index-item',
  };

  sections: { [index: string]: HTMLElement };

  constructor() {
    super();
    this.handleNavigation = this.handleNavigation.bind(this);

    this.sections = {};
  }

  componentDidMount() {
    this.setState({ container: this.props.getContainer() });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.getContainer !== nextProps.getContainer) {
      this.setState({ container: this.props.getContainer() });
    }
  }

  handleNavigation(index: string): void {
    const { container } = this.state;

    if (container === document.documentElement) {
      container.scrollTop = getOffsetTop(this.sections[index]);
    } else {
      container.scrollTop += getDeltaY(this.sections[index], container);
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
      if (child.type !== IndexedSection) return null;

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
          className={this.props.sliderClassName}
          indexItemClassName={this.props.indexItemClassName}
          indexes={indexes}
          onRequestNavigation={this.handleNavigation}
        />
        {children}
      </div>
    );
  }
}

