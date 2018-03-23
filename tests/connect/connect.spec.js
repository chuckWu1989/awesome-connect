import React from 'react';
import toJson from 'enzyme-to-json';
import * as controller from '../../src/controllers/connectController';

const { shallow } = global;

describe('connect', () => {
  describe('getMapStateToProps', () => {
    it('should return function if mapStateToProps is a function', () => {
      const defaultProps = {};
      const mapStateToProps = () => {};
      const result = controller.getMapStateToProps(mapStateToProps, defaultProps);
      expect(typeof result).toBe('function');
    });
    it('should return null if mapStateToProps is not a function', () => {
      const defaultProps = {};
      const mapStateToProps = undefined;
      const result = controller.getMapStateToProps(mapStateToProps, defaultProps);
      expect(result).toBe(null);
    });
    it('should get merged props if mapStateToProps is a function', () => {
      let result;
      const defaultProps = { default: 'test' };
      const props = { newProps: 'test2' };
      const mapStateToProps = (state, ownProps) => { result = ownProps; };
      controller.getMapStateToProps(mapStateToProps, defaultProps)(null, props);
      expect('default' in result && 'newProps' in result).toBeTruthy();
    });
  });
  describe('getMapDispatchToProps', () => {
    it('should return function if mapDispatchToProps is a function', () => {
      const defaultProps = {};
      const mapDispatchToProps = () => {};
      const result = controller.getMapDispatchToProps(mapDispatchToProps, defaultProps);
      expect(typeof result).toBe('function');
    });
    it('should return null if mapDispatchToProps is not a function', () => {
      const defaultProps = {};
      const mapDispatchToProps = undefined;
      const result = controller.getMapDispatchToProps(mapDispatchToProps, defaultProps);
      expect(result).toBe(null);
    });
    it('should get merged props if mapDispatchToProps is a function', () => {
      let result;
      const defaultProps = { default: 'test' };
      const props = { newProps: 'test2' };
      const mapDispatchToProps = (dispatch, ownProps) => { result = ownProps; };
      controller.getMapDispatchToProps(mapDispatchToProps, defaultProps)(null, props);
      expect('default' in result && 'newProps' in result).toBeTruthy();
    });
  });
  describe('getMergeProps', () => {
    it('should return function if mergeProps is a function', () => {
      const defaultProps = {};
      const mergeProps = () => {};
      const result = controller.getMergeProps(mergeProps, defaultProps);
      expect(typeof result).toBe('function');
    });
    it('should return null if mergeProps is not a function', () => {
      const defaultProps = {};
      const mergeProps = undefined;
      const result = controller.getMergeProps(mergeProps, defaultProps);
      expect(result).toBe(null);
    });
    it('should get merged props if mergeProps is a function', () => {
      let result;
      const defaultProps = { default: 'test' };
      const props = { newProps: 'test2' };
      const mergeProps = (stateProps, dispatchProps, ownProps) => { result = ownProps; };
      controller.getMergeProps(mergeProps, defaultProps)(null, null, props);
      expect('default' in result && 'newProps' in result).toBeTruthy();
    });
  });
  describe('connect', () => {
    it('should return function by calling once', () => {
      const result = controller.connect();
      expect(typeof result).toBe('function');
    });
    it('should return function by calling twice', () => {
      const result = controller.connect()();
      expect(typeof result).toBe('function');
    });
    it('should output console error if component is not a function and env is not production', () => {
      let err;
      console.error = jest.fn();
      try {
        controller.connect()()();
      } catch (e) {
        err = e;
      }
      expect(err).toBeDefined();
      expect(console.error).toHaveBeenCalledTimes(1);
    });
    it('should throw error only if component is not a function and env is production', () => {
      let err;
      process.env.NODE_ENV = 'production';
      console.error = jest.fn();
      try {
        controller.connect()()();
      } catch (e) {
        err = e;
      }
      process.env.NODE_ENV = 'test';
      expect(err).toBeDefined();
      expect(console.error).toHaveBeenCalledTimes(0);
    });
    it('should return a connected component if component is a function', () => {
      const component = () => <div />;
      component.defaultProps = { default: 'test' };
      const ConnectComponent = controller.connect()()(component);
      const tree = toJson(shallow(<ConnectComponent />));
      expect(tree).toMatchSnapshot();
    });
    it('should include type if type is defined', () => {
      const component = () => <div />;
      const type = { default: 'test', test: 'test2' };
      const ConnectComponent = controller.connect()()(component, type);
      expect('default' in ConnectComponent && 'test' in ConnectComponent).toBeTruthy();
    });
  });
});
