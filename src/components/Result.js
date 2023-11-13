import React, { useState ,useEffect} from 'react'
import axios from 'axios';

import { Bar} from "react-chartjs-2";
import { BarElement,  CategoryScale,Chart as ChartJS,Legend, LinearScale,Title, Tooltip } from "chart.js";
import './Result.css';
import LogoutButton from './LogoutButton';

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
    const barBackground = {
        id:'barBackground',
        beforeDatasetsDraw(chart,args,pluginOptions){
            const {ctx, chartArea: { top, bottom,left,right,width,height} }= chart;
            ctx.save();
            ctx.fillStyle = '#F5DEB3';
            ctx.fillRect(left, top, width,height);
        }
      }
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
            position:'right',
          },

          barBackground,

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

      let lead = 0;
      if(totalVotesA > totalVotesB){
        lead=totalVotesA;
      }
      else if(totalVotesA < totalVotesB){
        lead=totalVotesB;
      }
      else if(totalVotesA == totalVotesB){
        lead=0;
      }
    
      return (
        <>
        <LogoutButton />
        <div className='result-body'>
            <h1 className='result-head'>Election 2023 is Ongoing!</h1>
           <div className='wrap-up-container'>
                <div className='lc'>
                    <div className='chart-container'>

                        <h4 className='bar-head'>Bar Representation of Election 2023</h4>
                        <Bar className='bar' plugins={[barBackground]} data={data} options={options} />
                    </div>
                </div>
                <div className='live-updates'>
                    <h1>Live Updates</h1>
                    <h4>Check here to see who is in leading Now</h4>
                    <p>
                        {
                            lead === totalVotesA 
                                ? (
                                    <p className='lead1-text'><b>BJP Party</b> is leading now by &nbsp;
                                        {totalVotesA-totalVotesB}
                                                {
                                                    (
                                                        totalVotesA-totalVotesB > 1 
                                                        ? (<p className='lead1-text'>votes.</p>)
                                                        :(<p className='lead1-text'>vote.</p>)
                                                    )
                                                }
                                    </p>
                                )
                                :(lead === totalVotesB ?
                                     (
                                        <p className='lead2-text'><b>Congress Party </b>is leading now by &nbsp;
                                            {totalVotesB-totalVotesA}
                                            {
                                                (
                                                    totalVotesB-totalVotesA > 1 
                                                    ? (<p className='lead2-text'>votes.</p>)
                                                    :(<p className='lead2-text'>vote.</p>)
                                                )
                                            }
                                        </p>
                                      )
                                :(<p className='tie-text'>Both the parties are equal now...</p>))
                        }
                    </p>
                </div>
            </div>
        </div>
        </>
      );
};


export default Result;