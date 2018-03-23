import React from 'react';
import toJson from 'enzyme-to-json';
import enhancer from '../../src/hocs/enhancer';
import EnhancerModel from '../../src/models/EnhancerModel';
import enhancerRouter from '../../src/routers/enhancerRouter';
import * as controller from '../../src/controllers/enhancerController';

const { shallow } = global;

describe('enhancer', () => {
  describe('model', () => {
    it('should define properties properly', () => {
      const model = new EnhancerModel();
      expect(model).toMatchSnapshot();
    });
  });
  describe('hoc', () => {
    it('should render properly', () => {
      const WrappedComponent = () => <div />;
      const store = undefined;
      const OutputComponent = enhancer(WrappedComponent, store);
      const tree = toJson(shallow(<OutputComponent />));
      expect(tree).toMatchSnapshot();
    });
    it('should call methods during lifecycle', () => {
      const WrappedComponent = () => <div />;
      const store = undefined;
      const OutputComponent = enhancer(WrappedComponent, store);
      const ownProps = {
        name: 'test',
        getId: jest.fn(() => 'test'),
        getName: jest.fn(() => 'test'),
        mergeProps: jest.fn(() => ({})),
      };
      shallow(
        <OutputComponent {...ownProps} />,
        { lifecycleExperimental: true },
      ).shallow();
      expect(ownProps.getId).toHaveBeenCalledTimes(1);
      expect(ownProps.getName).toHaveBeenCalledTimes(1);
      expect(ownProps.mergeProps).toHaveBeenCalledTimes(1);
    });
  });
  describe('router', () => {
    it('should pass correct properties', () => {
      const WrappedComponent = () => <div />;
      const store = undefined;
      const OutputComponent = enhancerRouter(WrappedComponent, store);
      const props = shallow(<OutputComponent />).props();
      expect('getId' in props).toBeTruthy();
      expect('getName' in props).toBeTruthy();
      expect('mergeProps' in props).toBeTruthy();
    });
  });
  describe('controller', () => {
    describe('getId', () => {
      it('should generate uuid', () => {
        const id = controller.getId();
        expect(typeof id).toBe('string');
      });
    });
    describe('getName', () => {
      it('should get name if name is defined', () => {
        const name = 'name';
        const id = 'id';
        const result = controller.getName(id, name);
        expect(result).toBe(name);
      });
      it('should get id if name is undefined', () => {
        const name = undefined;
        const id = 'id';
        const result = controller.getName(id, name);
        expect(result).toBe(id);
      });
    });
    describe('mergeProps', () => {
      const store = { test: '123' };
      const name = 'name';
      const props = { myProps: 'props' };
      it('should return props, name and store if _context exists in _reactInternalInstance and store is undefined', () => {
        const self = { _reactInternalInstance: { _context: {} } };
        const result = controller.mergeProps.call(self, props, name, store);
        expect(result.name).toBe(name);
        expect(result.store).toBe(store);
        expect(result.myProps).toBe(props.myProps);
      });
      it('should return props and name if _context is undefined or store is defined', () => {
        const self = { _reactInternalInstance: { _context: { store: '123' } } };
        const result = controller.mergeProps.call(self, props, name, store);
        expect(result.name).toBe(name);
        expect(result.store).toBeUndefined();
        expect(result.myProps).toBe(props.myProps);
      });
    });
  });
});
