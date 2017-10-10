import React from 'react';

export interface Props {
  index: string;
  focus: boolean;
}

export default class IndexItem extends React.Component<Props, {}> {
  render() {
    const { index } = this.props;

    return (
      <div
        role="navigation-item"
        data-rsi-key={index}
      >
        <span>{index}</span>
      </div>
    )
  }
}