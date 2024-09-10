import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "./CountrySearch.module.css"
const XcountriesSearch=()=>{
    const[flagData,setFlagData]=useState([]);
    const[filteredData,setFilteredData]=useState([]);

    const getFlagData=async(url)=>{
        try{
     const response=await axios.get(url);
     setFlagData(response.data);
     setFilteredData(response.data);
     console.log(response.data);
        }
        catch(err){
            console.error("Error fetching data:",err);
        }
    }

const filterName=(val)=>{
    const filteredNameData=flagData.filter((flag)=>flag.name.common.toLowerCase().includes(val.toLowerCase()));
    setFilteredData(filteredNameData);

    }

useEffect(()=>{
    getFlagData("https://restcountries.com/v3.1/all");
},[]);
    return(
        <>
        <input type="text" style={{width:"50%",marginTop:"2rem",height:"2rem"}} placeholder="Search for countries..." onChange={(e)=>filterName(e.target.value)}/>
           <div className={style.mainDiv} >
          {filteredData.map((flag)=>(<div className={style.countryCard} key={flag.cca3}>
            <img src={flag.flags.png} alt={flag.name.common}  height={80} width={80} style={{paddingTop:"1rem"}}/>
            <p>{flag.name.common}</p>
        </div>))}
    </div></>)
    
}
export default XcountriesSearch;