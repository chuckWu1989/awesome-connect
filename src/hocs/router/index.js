import React from 'react';

const router = (method = {}) => (
  WrappedComponent => (
    props => <WrappedComponent {...props} {...method} />
  )
);

export default router;
