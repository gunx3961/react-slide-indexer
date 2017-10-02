import React from 'react';

export interface Props {
  index: string;
  sectionRef: React.Ref<any>;
  children?: React.ReactElement<any>;
}

export default class IndexedSection extends React.PureComponent<Props, {}> {
  render() {
    return (
      <div
        ref={this.props.sectionRef}
        role="section"
      >
        <div role="heading">{this.props.index}</div>
        {this.props.children}
      </div>
    );
  }
}
