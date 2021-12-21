// react-dom、react-dom/server、 react-native、 react-test-renderer、 react-art  >>>>>> 渲染器s
// ? I updated React to 16.3.1, but didn't update ReactDOM. https://stackoverflow.com/questions/49662743/context-components-in-react-16-3-are-invalid/49677020#49677020

// * 负责更新dom <<<<<<<< setState读取由React Dom设置的this.updater
Component.setState = function (partialState, callback) {
  // setState所做的一切就是委托渲染器创建这个组件的实例
  this.updater.enqueueSetState(this, partialState, callback, "setState");
};


// * 不同的平台有不同的updater
// React DOM 内部
const inst = new YourComponent();
inst.props = props;
inst.updater = ReactDOMUpdater;

// React DOM Server 内部
const inst = new YourComponent();
inst.props = props;
inst.updater = ReactDOMServerUpdater;

// React Native 内部
const inst = new YourComponent();
inst.props = props;
inst.updater = ReactNativeUpdater;
