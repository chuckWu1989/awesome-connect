import lodash from 'lodash';
import { connect as reduxConnect } from 'react-redux';
import enhancerRouter from '../../routers/enhancerRouter';

export const getMapStateToProps = (mapStateToProps, defaultProps) => (
  typeof mapStateToProps === 'function' ?
    (state, props) => (
      mapStateToProps(state, lodash.merge({}, defaultProps, props))
    ) :
    null
);
export const getMapDispatchToProps = (mapDispatchToProps, defaultProps) => (
  typeof mapDispatchToProps === 'function' ?
    (dispatch, props) => (
      mapDispatchToProps(dispatch, lodash.merge({}, defaultProps, props))
    ) :
    null
);
export const getMergeProps = (mergeProps, defaultProps) => (
  typeof mergeProps === 'function' ?
    (stateProps, dispatchProps, props) => (
      mergeProps(
        stateProps, dispatchProps, lodash.merge({}, defaultProps, props),
      )
    ) :
    null
);
export const connect = store => (
  (mapStateToProps = null, mapDispatchToProps = null, mergeProps = null) => (
    (component, type = {}) => {
      if (typeof component !== 'function') {
        const error = new TypeError('The component must be a function', 'connect');
        if (process.env.NODE_ENV !== 'production') {
          console.error(error.toString());
        }
        throw error;
      }
      const { defaultProps = {} } = component;
      const newMapStateToProps = getMapStateToProps(mapStateToProps, defaultProps);
      const newMapDispatchToProps = getMapDispatchToProps(mapDispatchToProps, defaultProps);
      const newMergeProps = getMergeProps(mergeProps, defaultProps);
      const ConnectComponent = reduxConnect(
        newMapStateToProps,
        newMapDispatchToProps,
        newMergeProps,
      )(component);
      const HOC = enhancerRouter(ConnectComponent, store);
      Object.keys(type).forEach((key) => {
        HOC[key] = type[key];
      });
      return HOC;
    }
  )
);
