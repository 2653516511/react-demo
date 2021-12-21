// ...

function mountIndeterminateComponent(
    _current,
    workInProgress,
    Component,
    renderExpirationTime,
  ) {
   
   /** 省略准备阶段代码 **/ 
    // ...
    
    // value就是渲染出来的APP组件
    let value;
  
    value = renderWithHooks(
      null,
      workInProgress,
      Component,
      props,
      context,
      renderExpirationTime,
    );
    /** 省略无关代码 **/ 
    }
    workInProgress.tag = FunctionComponent;
    reconcileChildren(null, workInProgress, value, renderExpirationTime);
    return workInProgress.child;
}