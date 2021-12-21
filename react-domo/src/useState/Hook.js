// React.js
import {
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useDebugValue,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "./ReactHooks";
// ReactHooks.js
export function useState<S>(initialState: (() => S) | S) {
  const dispatcher = resolveDispatcher();
  return dispatcher.useState(initialState);
}
// ReactHooks.js
function resolveDispatcher() {
    const dispatcher = ReactCurrentDispatcher.current;
    return dispatcher;
  }
// * >>>>>>>>>>> ReactCurrentDispatcher.current.useState(initialState)

// ReactFiberHooks.js
export type Hook = {
  memoizedState: any, // 记录当前useState应该返回的结果

  baseState: any,
  baseUpdate: Update<any, any> | null,
  queue: UpdateQueue<any, any> | null, // 缓存队列，存储多次更新行为

  next: Hook | null, // 指向下一次useState对应的Hook对象
};
