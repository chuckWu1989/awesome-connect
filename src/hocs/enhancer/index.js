/* eslint function-paren-newline: ["error", "consistent"] */
import React, { Component } from 'react';
import { ViewModel } from 'model-decorator';
import EnhancerModel from '../../models/EnhancerModel';

const enhancer = (WrappedComponent, store) => (
  ViewModel(EnhancerModel)(
    class extends Component {
      constructor(props) {
        super(props);
        this.state = { id: undefined };
      }
      componentWillMount() {
        const { props: { model } } = this;
        this.setState({ id: model.getId.val() });
      }
      render() {
        const { state: { id }, props: { model, ...otherProps } } = this;
        const { name, getName, mergeProps } = model.getValues();
        const componentName = getName(id, name);
        const ownProps = mergeProps.call(this, otherProps, componentName, store);
        return (
          <WrappedComponent {...ownProps} />
        );
      }
    },
  )
);

export default enhancer;
