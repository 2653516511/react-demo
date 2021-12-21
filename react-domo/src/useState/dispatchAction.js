function dispatchAction<S, A>(
    fiber: Fiber,
    queue: UpdateQueue<S, A>,
    action: A,
  ) {
  
     /** 省略Fiber调度相关代码 **/
    
    // 创建新的update, action就是我们setCount里面的值(count+1, count+2, count+3…)
      const update: Update<S, A> = {
        expirationTime,
        action,
        eagerReducer: null,
        eagerState: null,
        next: null,
      };
        
      // !重点：构建queue
      // queue.last是最近的一次更新，然后last.next开始是每一次的action
      const last = queue.last;
      if (last === null) {
        // 只有一个update, 自己指自己-形成环
        update.next = update;
      } else {
        const first = last.next;
        if (first !== null) {
          
          update.next = first;
        }
        last.next = update;
      }
      queue.last = update;
  
      /** 省略特殊情况相关代码 **/
      
      // 创建一个更新任务
      scheduleWork(fiber, expirationTime);
  
  }
  