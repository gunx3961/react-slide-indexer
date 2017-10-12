import * as React from 'react';

export interface Props {
  index: string;
  focus: boolean;
  className: string;
}

export default class IndexItem extends React.Component<Props, {}> {
  constructor() {
    super();
  }

  render() {
    const { index } = this.props;

    return (
      <div
        className={this.props.className}
        role="navigation-item"
        data-rsi-index={index}
      >
        <span data-rsi-index={index}>{index}</span>
      </div>
    )
  }
}