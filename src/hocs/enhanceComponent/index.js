import React, { Component } from 'react';

const enhanceConnect = (WrappedComponent, store) => (
  class extends Component {
    static defaultProps = {

    }
    static propTypes = {

    }
    render() {
      return (
        <WrappedComponent {...ownProps} />
      );
    }
  }
)
