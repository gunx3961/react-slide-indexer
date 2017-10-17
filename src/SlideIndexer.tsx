import * as React from 'react';
import * as Portal from 'react-portal';

import Slider from './Slider';
import IndexedSection from './IndexedSection';
import getOffsetTop from './utils/getOffsetTop';
import getDeltaY from './utils/getDeltaY';

export interface Props {
  getContainer?: { (): HTMLElement };
  sliderClassName?: string;
  indexItemClassName?: string;
  currentIndexItemClassName?: string;
  onNavigation?: { (container: HTMLElement): void };
}

export interface State {
  container: HTMLElement;
  currentIndex?: string;
}

export default class SlideIndexer extends React.Component<Props, State> {
  static defaultProps: Partial<Props> = {
    getContainer: () => document.documentElement,
    sliderClassName: 'rsi-slider',
    indexItemClassName: 'rsi-index-item',
    currentIndexItemClassName: 'rsi-focus',
  };

  sections: { [index: string]: HTMLElement };
  indexes: Array<string>;

  constructor() {
    super();
    this.handleNavigation = this.handleNavigation.bind(this);
    // this.getCurrentIndex = this.getCurrentIndex.bind(this);
    this.handleContainerScroll = this.handleContainerScroll.bind(this);

    this.state = {
      container: document.documentElement,
    };
    this.sections = {};
    this.indexes = [];
  }

  componentDidMount() {
    const container = this.props.getContainer();
    this.setState({ container });

    container.addEventListener('scroll', this.handleContainerScroll, false);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.getContainer !== nextProps.getContainer) {
      this.state.container.removeEventListener('scroll', this.handleContainerScroll, false);
      const newContainer = this.props.getContainer();
      this.setState({ container: newContainer });
      newContainer.addEventListener('scroll', this.handleContainerScroll, false);
    }
  }

  componentWillUnmount() {
    this.state.container.removeEventListener('scroll', this.handleContainerScroll, false);
  }


  handleNavigation(index: string): void {
    const { container } = this.state;
    const { onNavigation } = this.props;

    // TODO: don't do anything if offsetTop not changed
    if (container === document.documentElement) {
      container.scrollTop = getOffsetTop(this.sections[index]);
    } else {
      container.scrollTop += getDeltaY(this.sections[index], container);
    }

    if (onNavigation) onNavigation(container);
  }

  getCurrentIndex?(): string {
    const { container } = this.state;
    const { indexes, sections } = this;

    if (container === document.documentElement) {
      for (let i = 0; i < indexes.length; i++) {
        if (getOffsetTop(sections[indexes[i]]) > container.scrollTop) return indexes[i - 1];
      }
    } else {
      for (let i = 0; i < indexes.length; i++) {
        const deltaY = getDeltaY(sections[indexes[i]], container);
        if (deltaY > 0) return indexes[i - 1];
      }
    }
  }

  handleContainerScroll(): void {
    this.setState({
      currentIndex: this.getCurrentIndex(),
    });
  }

  render() {
    const {
      children: childrenProp,
    } = this.props;
    const indexes: Array<string> = [];
    const children = React.Children.map(childrenProp, (child) => {
      if (!React.isValidElement<any>(child)) return null;
      if (child.type !== IndexedSection) return null;

      const index = child.props.index;
      indexes.push(index);
      return React.cloneElement(child, {
        sectionRef: (el) => { this.sections[index] = el; }
      });
    });
    this.indexes = indexes;

    return (
      <div
        role="slide-indexer"
      >
        <Portal isOpened={true}>
          <Slider
            className={this.props.sliderClassName}
            indexItemClassName={this.props.indexItemClassName}
            currentIndexItemClassName={this.props.currentIndexItemClassName}
            indexes={indexes}
            onRequestNavigation={this.handleNavigation}
            currentIndex={this.state.currentIndex}
          />
        </Portal>
        {children}
      </div>
    );
  }
}

