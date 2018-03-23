/* eslint no-underscore-dangle: off */
import uuidv4 from 'uuid/v4';

export const getId = () => uuidv4();
export const getName = (id, name) => {
  const result = name !== undefined ? name : id;
  return result;
};
export function mergeProps(props, name, store) {
  return (
    '_reactInternalInstance' in this &&
    '_context' in this._reactInternalInstance &&
    typeof this._reactInternalInstance._context === 'object' &&
    !('store' in this._reactInternalInstance._context) ?
      { ...props, name, store } :
      { ...props, name }
  );
}
