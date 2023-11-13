import React, { useState ,useEffect} from 'react'
import axios from 'axios';
import { Bar} from "react-chartjs-2";
import { BarElement,  CategoryScale,Chart as ChartJS,Legend, LinearScale,Title, Tooltip } from "chart.js";


ChartJS.register(CategoryScale, LinearScale, BarElement,Title,Tooltip,Legend);
function Result() {
    const [results, setResults] = useState([]);

    useEffect(() => {
        axios.get("https://655086627d203ab6626de137.mockapi.io/vote").then(
        (response) => {
            console.log(response.data);
            setResults(response.data);
        },
        (err) => {
            console.log(err);
        });
    },[]);


    const totalVotesA = results.map((item) => item.partyA).reduce((prev,curr) => prev+curr,0);
    const totalVotesB = results.map((item) => item.partyB).reduce((prev,curr) => prev+curr,0);
    
    const options={
        indexAxis:'y',
        elements:{
          bar:{
            borderWidth:1,
          }
        },
        responsive:true,
        plugins:{
          legend:{
            position:'right'
          },
          title:{
            display:true,
            text:' India Election 2023'
          }
        }
      }
      
      const data = {
        labels:["Election 2023"],
        datasets: [
          {
            label: "BJP",
            data: [totalVotesA,30],
            backgroundColor: "orange",
          },
          {
            label:'Congress',
            data:[totalVotesB],
            backgroundColor:'green'
          },
      
        ],
      
      }
    
      return (
        <>
          <Bar data={data} options={options} />
        </>
      );
};


export default Result;