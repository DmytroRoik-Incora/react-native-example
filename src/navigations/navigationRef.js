import * as React from 'react';
import { StackActions } from '@react-navigation/routers';

// ...

export function push(name, params) {
  navigationRef.current && navigationRef.current.dispatch(StackActions.push(name, params));
}
export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current && navigationRef.current.navigate(name, params);
}
