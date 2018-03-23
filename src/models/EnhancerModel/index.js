import { DefineProps, DefaultValue, Type, BaseModel } from 'model-decorator';
import PropTypes from 'prop-types';

class EnhancerModel extends BaseModel {
  @DefineProps()
  @Type(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
  name

  @DefineProps()
  @Type(PropTypes.func)
  @DefaultValue(() => {})
  getId

  @DefineProps()
  @Type(PropTypes.func)
  @DefaultValue(() => {})
  getName

  @DefineProps()
  @Type(PropTypes.func)
  @DefaultValue(() => {})
  mergeProps
}

export default EnhancerModel;
