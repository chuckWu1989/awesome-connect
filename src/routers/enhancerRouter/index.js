import router from '../../hocs/router';
import { getId, getName, mergeProps } from '../../controllers/enhancerController';
import enhancer from '../../hocs/enhancer';

const method = {
  getId,
  getName,
  mergeProps,
};

export default (WrappedComponent, store) => router(method)(enhancer(WrappedComponent, store));
