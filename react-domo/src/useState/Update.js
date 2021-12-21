// ReactFiberHooks.js

// 所以调用useState(0)返回的就是HooksDispatcherOnUpdate.useState(0)，也就是updateReducer(basicStateReducer, 0)

const HooksDispatcherOnUpdate: Dispatcher = {
    /** 省略其它Hooks **/
     useState: updateState,
  }
  
  function updateState(initialState) {
    return updateReducer(basicStateReducer, initialState);
  }

  // * 可以看到updateReducer的过程与传的initalState已经无关了，所以初始值只在第一次被使用
  
  // ...
  function updateReducer(reducer, initialArg, init) {
  // * 获取初始化时的 hook
    const hook = updateWorkInProgressHook();
    const queue = hook.queue;
  
    // * 开始渲染更新
    if (numberOfReRenders > 0) {

      const dispatch = queue.dispatch;

      if (renderPhaseUpdates !== null) {

        // * 获取Hook对象上的 queue，内部存有本次更新的一系列数据
        const firstRenderPhaseUpdate = renderPhaseUpdates.get(queue);
        if (firstRenderPhaseUpdate !== undefined) {
          renderPhaseUpdates.delete(queue);
          let newState = hook.memoizedState;
          let update = firstRenderPhaseUpdate;
          // * 获取更新后的state
          do {
            const action = update.action;
            // 此时的reducer是basicStateReducer，直接返回action的值
            newState = reducer(newState, action);
            update = update.next;
          } while (update !== null);
          
          // 对 更新hook.memoized 
          hook.memoizedState = newState;
          // * 返回新的 state，及更新 hook 的 dispatch 方法
          return [newState, dispatch];
        }

      }

    }
    
  // 对于useState触发的update action来说（假设useState里面都传的变量），basicStateReducer就是直接返回action的值
  function basicStateReducer<S>(state: S, action: BasicStateAction<S>): S {
    return typeof action === 'function' ? action(state) : action;
  }
  