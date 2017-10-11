import * as React from 'react';

export interface Props {
  index: string;
  focus: boolean;
}

export default class IndexItem extends React.Component<Props, {}> {
  constructor() {
    super();
  }

  render() {
    const { index } = this.props;

    return (
      <div
        role="navigation-item"
        data-rsi-index={index}
        style={{
          padding: '.1rem',
        }}
      >
        <span data-rsi-index={index}>{index}</span>
      </div>
    )
  }
}