// ReactFiberBeginWork.js
function beginWork(
    current: Fiber | null,
    workInProgress: Fiber,
    renderExpirationTime: ExpirationTime,
  ): Fiber | null {
    /** 省略与本文无关的部分 **/
  
    // 根据不同的组件类型走不同的方法
    switch (workInProgress.tag) {
      // 不确定组件
      case IndeterminateComponent: {
        const elementType = workInProgress.elementType;
        // 加载初始组件
        return mountIndeterminateComponent(
          current,
          workInProgress,
          elementType,
          renderExpirationTime,
        );
      }
      // 函数组件
      case FunctionComponent: {
        const Component = workInProgress.type;
        const unresolvedProps = workInProgress.pendingProps;
        const resolvedProps =
          workInProgress.elementType === Component
            ? unresolvedProps
            : resolveDefaultProps(Component, unresolvedProps);
        // 更新函数组件
        return updateFunctionComponent(
          current,
          workInProgress,
          Component,
          resolvedProps,
          renderExpirationTime,
        );
      }
      // 类组件
      case ClassComponent {
        /** 细节略 **/
        }

        // ...
    }
  