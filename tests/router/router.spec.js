import React from 'react';
import toJson from 'enzyme-to-json';
import router from '../../src/hocs/router';

const { shallow } = global;

describe('router', () => {
  const WrappedComponent = () => <div />;
  const props = { test: 'test2' };
  it('should render properly', () => {
    const method = { default: 'test' };
    const RouterComponent = router(method)(WrappedComponent);
    const tree = toJson(shallow(<RouterComponent {...props} />));
    expect(tree).toMatchSnapshot();
  });
  it('should render properly if method is not defined', () => {
    const RouterComponent = router()(WrappedComponent);
    const tree = toJson(shallow(<RouterComponent {...props} />));
    expect(tree).toMatchSnapshot();
  });
});
