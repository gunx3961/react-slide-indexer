import React from 'react';

import IndexItem from './IndexItem';

export interface Props {
  onRequestNavigation: { (index: string): void };
  indexes: Array<string>;
}

export interface State {
  clientX: number;
}

export default class IndexedSection extends React.PureComponent<Props, State> {
  constructor() {
    super();

    this.state = {
      clientX: 0,
    };
  }

  getKeyByCoordinate(x: number, y: number): string {
    const target = document.elementFromPoint(x, y);
    if (!target) return null;
    return target.getAttribute('data-rsi-index');
  }

  handleTouchStart(ev: React.TouchEvent<any>): void {
    ev.preventDefault();

    const { clientX, clientY } = ev.touches[0];
    this.setState({ clientX });
    const index = this.getKeyByCoordinate(clientX, clientY);
    if (!index) return;
    this.props.onRequestNavigation(index);
  }

  handleTouchMove(ev: React.TouchEvent<any>): void {
    const key = this.getKeyByCoordinate(this.state.clientX, ev.touches[0].clientY)
    if (!key) return;
    this.props.onRequestNavigation(key);
  }

  handleTouchEnd() {
  }


  render() {
    const indexes = this.props.indexes.map(index => (
      <IndexItem

      />
    ));

    return (
      <div
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
