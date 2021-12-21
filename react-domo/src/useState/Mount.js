// * 例子
const [state, setState] = useState(0);

// ReactFiberHooks.js
const HooksDispatcherOnMount: Dispatcher = {
    // ...
    useState: mountState,

    // ...
  };

//  * >>>>>>> ReactCurrentDispatcher.current.useState(initialState)
  // * 调用useState(0)返回的就是 HooksDispatcherOnMount.useState(0)，即下面的 mountState(0) 方法
function mountState<S>(
    initialState: (() => S) | S,
  ): [S, Dispatch<BasicStateAction<S>>] {
      // 访问Hook链表的下一个节点，获取到新的Hook对象
    const hook = mountWorkInProgressHook();

  // 如果入参是function则会调用，但是不提供参数
    if (typeof initialState === 'function') {
      initialState = initialState();
    }

  // state的初始化
    hook.memoizedState = hook.baseState = initialState;

  // queue的初始化
    const queue = (hook.queue = {
      last: null,
      dispatch: null,
      eagerReducer: basicStateReducer, // useState使用基础reducer
      eagerState: (initialState: any),
    });
      // 返回触发器dispatch
    const dispatch: Dispatch<BasicStateAction<S>,> 
      = (queue.dispatch = (dispatchAction.bind(
          null,
          //绑定当前fiber结点和queue
          ((currentlyRenderingFiber: any): Fiber),
          queue,
    ));
    // 返回初始state和触发器
    return [hook.memoizedState, dispatch];
  }
  
  // 对于useState触发的update action来说（假设useState里面都传的变量），basicStateReducer就是直接返回action的值
  function basicStateReducer<S>(state: S, action: BasicStateAction<S>): S {
    return typeof action === 'function' ? action(state) : action;
  }
  