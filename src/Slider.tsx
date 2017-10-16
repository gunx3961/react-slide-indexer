import * as React from 'react';

import IndexItem from './IndexItem';

export interface Props {
  onRequestNavigation: { (index: string): void };
  indexes: Array<string>;
  className: string;
  indexItemClassName: string;
}

export interface State {
  clientX: number;
}

export default class Slider extends React.Component<Props, State> {
  constructor() {
    super();
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);

    this.state = {
      clientX: 0,
    };
  }

  getIndexByCoordinate(x: number, y: number): string {
    const target = document.elementFromPoint(x, y);
    if (!target) return null;
    return target.getAttribute('data-rsi-index');
  }

  handleTouchStart(ev: React.TouchEvent<any>): void {
    ev.preventDefault();

    const { clientX, clientY } = ev.touches[0];
    this.setState({ clientX });
    const index = this.getIndexByCoordinate(clientX, clientY);
    if (!index) return;
    this.props.onRequestNavigation(index);
  }

  handleTouchMove(ev: React.TouchEvent<any>): void {
    const index = this.getIndexByCoordinate(this.state.clientX, ev.touches[0].clientY);

    if (!index) return;
    this.props.onRequestNavigation(index);
  }

  handleTouchEnd() {
  }


  render() {
    const indexes = this.props.indexes.map(index => (
      <IndexItem
        className={this.props.indexItemClassName}
        key={index}
        index={index}
        focus={false}
      />
    ));

    return (
      <div
        className={this.props.className}
        role="navigation"
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
      >
        {indexes}
      </div>
    );
  }
}
