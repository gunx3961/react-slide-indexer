import * as React from 'react';

export interface Props {
  index: string;
  sectionRef: React.Ref<any>;
}

export default class IndexedSection extends React.Component<Props, {}> {
  constructor() {
    super();
  }

  render() {
    return (
      <div
        ref={this.props.sectionRef}
        role="section"
      >
        {this.props.children}
      </div>
    );
  }
}
