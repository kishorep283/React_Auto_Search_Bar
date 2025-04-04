import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "./search.css"
const Search_component = () => {
    const[input,setInput]=useState("");
    const[Data,setData]=useState([]);
    const[focus,setFocus]=useState(false);
    console.log(input)
    const FetchData =async()=>{
        if (input.trim() === '') {
            setData([]);
            return;
        }
        console.log("api call")
        let {data}=await axios.get(`https://dummyjson.com/recipes/search?q=`+input);
        setData(data.recipes)
    }
    useEffect(()=>{
          const timer = setTimeout(FetchData,500);
          return ()=>{
            clearTimeout(timer)
          }
    },[input])
    console.log(Data)
  return (
    <>
        <h2>React  Auto Complete SearchBar</h2>
        <div style={{marginBottom:"70%"}}>
        <div style={{marginTop:"5%",display:"flex",flexDirection:"column"}}>
            <input type="text" style={{padding:"10px",width:"30vw",borderRadius:"10px",borderColor:"blue"}} placeholder='enter item' value={input} onChange={(e)=>setInput(e.target.value)} onFocus={()=>setFocus(true)} onBlur={()=>setFocus(false)}/>
            {focus && <div style={{display:"flex",flexDirection:"column",width:"30vw",border:"2px solid black",padding:"10px",maxHeight:"500px",overflowY:"scroll"}}>
                {Data.map((item)=>(
                    <span key={item.id} className='span'>{item.name}</span>
                ))}
            </div>}
        </div>
        </div>
    </>
  )
}

export default Search_component