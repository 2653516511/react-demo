// memoizedState: 存储state



export function RenderWithHooks(
    current: Fiber | null,
    workInProgress: Fiber,
    Component: any,
    props: any,
    refOrContext: any,
    nextRenderExpirationTime: ExpirationTime,
  ): any {
    renderExpirationTime = nextRenderExpirationTime;
    currentlyRenderingFiber = workInProgress;

    // ! step 1: 
    nextCurrentHook = current !== null ? current.memoizedState : null;
  
    // The following should have already been reset
    // currentHook = null;
    // workInProgressHook = null;
  
    // remainingExpirationTime = NoWork;
    // componentUpdateQueue = null;
  
    // didScheduleRenderPhaseUpdate = false;
    // renderPhaseUpdates = null;
    // numberOfReRenders = 0;
    // sideEffectTag = 0;
  
    // TODO Warn if no hooks are used at all during mount, then some are used during update.
    // Currently we will identify the update render as a mount because nextCurrentHook === null.
    // This is tricky because it's valid for certain types of components (e.g. React.lazy)
  
    // Using nextCurrentHook to differentiate between mount/update only works if at least one stateful hook is used.
    // Non-stateful hooks (e.g. context) don't get added to memoizedState,
    // so nextCurrentHook would be null during updates and mounts.
    
    ReactCurrentDispatcher.current =
      nextCurrentHook === null
        ? HooksDispatcherOnMount
        : HooksDispatcherOnUpdate;
    
  
    let children = Component(props, refOrContext);
  
    if (didScheduleRenderPhaseUpdate) {
      do {
        didScheduleRenderPhaseUpdate = false;
        numberOfReRenders += 1;
  
        // Start over from the beginning of the list
        nextCurrentHook = current !== null ? current.memoizedState : null;
        nextWorkInProgressHook = firstWorkInProgressHook;
  
        currentHook = null;
        workInProgressHook = null;
        componentUpdateQueue = null;
  
        ReactCurrentDispatcher.current = __DEV__
          ? HooksDispatcherOnUpdateInDEV
          : HooksDispatcherOnUpdate;
  
        children = Component(props, refOrContext);
      } while (didScheduleRenderPhaseUpdate);
  
      renderPhaseUpdates = null;
      numberOfReRenders = 0;
    }
  
    // We can assume the previous dispatcher is always this one, since we set it
    // at the beginning of the render phase and there's no re-entrancy.
    ReactCurrentDispatcher.current = ContextOnlyDispatcher;
  
    const renderedWork: Fiber = (currentlyRenderingFiber: any);
  
    renderedWork.memoizedState = firstWorkInProgressHook;
    renderedWork.expirationTime = remainingExpirationTime;
    renderedWork.updateQueue = (componentUpdateQueue: any);
    renderedWork.effectTag |= sideEffectTag;
  
    // This check uses currentHook so that it works the same in DEV and prod bundles.
    // hookTypesDev could catch more cases (e.g. context) but only in DEV bundles.
    const didRenderTooFewHooks =
      currentHook !== null && currentHook.next !== null;
  
    renderExpirationTime = NoWork;
    currentlyRenderingFiber = null;
  
    currentHook = null;
    nextCurrentHook = null;
    firstWorkInProgressHook = null;
    workInProgressHook = null;
    nextWorkInProgressHook = null;
  
    remainingExpirationTime = NoWork;
    componentUpdateQueue = null;
    sideEffectTag = 0;
  
    // These were reset above
    // didScheduleRenderPhaseUpdate = false;
    // renderPhaseUpdates = null;
    // numberOfReRenders = 0;
  
    return children;
  }
  

// ReactFiberHooks.js
export type Hook = {
  memoizedState: any, // 记录当前useState应该返回的结果

  baseState: any,
  baseUpdate: Update<any, any> | null,
  queue: UpdateQueue<any, any> | null, // 缓存队列，存储多次更新行为

  next: Hook | null, // 指向下一次useState对应的Hook对象
};
// ReactFiberHooks.js
export function renderWithHooks(
  current: Fiber | null,
  workInProgress: Fiber,
  Component: any,
  props: any,
  refOrContext: any,
  nextRenderExpirationTime: ExpirationTime,
): any {

  renderExpirationTime = nextRenderExpirationTime;
  currentlyRenderingFiber = workInProgress;
 
  // ? 区分首次 or 更新 ？ say no
  // * 如果current的值为空，说明还没有hook对象被挂载。
  // * 不为空，根据hook对象结构可知，current.memoizedState指向下一个current。
  nextCurrentHook = current !== null ? current.memoizedState : null; 

  // ? 区分首次 or 更新 ？ say yes
  // * 用nextCurrentHook的值来区分mount和update，设置不同的dispatcher
  ReactCurrentDispatcher.current =
      nextCurrentHook === null
      // 初始化时
        ? HooksDispatcherOnMount
  		// 更新时
        : HooksDispatcherOnUpdate;
  
  // * 此时已经有了新的dispatcher,在调用Component时就可以拿到新的对象
  let children = Component(props, refOrContext);
  
  // * 重置
  ReactCurrentDispatcher.current = ContextOnlyDispatcher;

  const renderedWork: Fiber = (currentlyRenderingFiber: any);

  // * 更新memoizedState和updateQueue
  renderedWork.memoizedState = firstWorkInProgressHook;
  renderedWork.updateQueue = (componentUpdateQueue: any);
  
  // ...
}

  