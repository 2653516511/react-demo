import React, { useState, useCallback, useEffect } from "react";

let lastAddClick
export default function FunTest(props) {

  const [count, setCount] = useState(0);
  const [name, setName] = useState({
    username: 'name1',
    password: '',
    like: ['read', 'jump']
  });
  // 调用三次setCount便于查看更新队列的情况
  const countPlusThree = () => {
    // ? 有多个，那么是每一个都会执行一次，还是只执行最后一个？批量更新？
    setCount(count+1);
    setCount(count+2);
    setCount(count+3);
    setCount(count+4);

    const tem = name
    tem.like = ['sing']
    // tem.like.push('sing')
    setName(tem)

  }
  return (
    <div className='App'>
      <p>{name.like} <strong>{count}</strong> Times</p>
      <button onClick={countPlusThree}>Click *4</button>
    </div>
  )
//   const [state, setState] = useState(1);

//   const [num, setNum] = useState(0);
//   const func = (stat) => {
//       stat && console.log('+++++++++++state', stat);

//       setState(2);
//       console.log('+++++++++++state', stat);

//       setTimeout(() => {
        
//           console.log('+++++++++++++after', stat)
//       }, 1000);
      
//   }
//   const fun = () => (console.log('fun', num))

  
// //   const addClick = useCallback(
// //       () => {
// //         setNum(num + 1)
// //       },
// //       [num],
// //   )
// //   console.log(lastAddClick === fun);
// //   lastAddClick = fun;

//   return (
//     <div>
//       this is function test
//       <p>
//         {state}: {num}
//       </p>
//       <button onClick={() => setState({ number: state.number + 1 })}>
//         traditionalAdd
//       </button>
//       <button onClick={() => func(state)}>newAdd</button>
//     </div>
//   );
}
