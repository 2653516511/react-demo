import React, { useState, useEffect } from "react";

function Child(props) {
  console.log("rerender:");

  const [result, setResult] = useState("");
  const { fetchData } = props;

  useEffect(() => {
    fetchData().then((result) => {
      setResult(result);
    });
  }, [fetchData]);
  
  return (
    <>
      <div>query:{props.query}</div>
      <div>result:{result}</div>
    </>
  );
}

export function Parent() {
  const [query, setQuery] = useState("react");

  const fetchData = () => {
    const url = "https://hn.algolia.com/api/v1/search?query=" + query;
    return fetch(url).then((x) => x.text());
  };

  return (
    <div>
      <input onChange={(e) => setQuery(e.target.value)} value={query} />
      <Child fetchData={fetchData} query={query} />
    </div>
  );
}


export default function App() {
  
  const [count, setCount] = useState(0);
  const [name, setName] = useState('Star');
  
  // 调用三次setCount便于查看更新队列的情况
  const countPlusThree = () => {
    setCount(count+1);
    setCount(count+2);
    setCount(count+3);
    setCount(count+4);
  }
  return (
    <div className='App'>
      <p>{name} Has Clicked <strong>{count}</strong> Times</p>
      <button onClick={countPlusThree}>Click *4</button>
    </div>
  )
}
