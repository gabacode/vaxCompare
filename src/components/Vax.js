import React, { useState, useEffect, useCallback } from "react";
import ProgressBar from 'react-bootstrap/ProgressBar';
import axios from 'axios';

export default function Vax({istat}){
    const [isLoading,setIsLoading] = useState(true)
    let [data, setResponseData] = useState('');

    const fetchData = useCallback(async () => {
        axios({
            "method": "GET",
            "url": `https://dati.regione.sicilia.it/api/3/action/datastore_search?resource_id=30e9d3ea-0c7c-40c0-846b-a36f173028fe&q=${istat}`
            })
            .then((response) => {
            setResponseData(response.data.result)
            fetchData();
            setIsLoading(false);
            })
            .catch((error) => {
            alert(error)
            })
        }, [])
        useEffect(() => {
            fetchData()
        }, [fetchData])

    const risultati = data.records;
    let totVax = [];
    let totTarget = [];
         
    return(
        isLoading ? 'Caricamento...' :
        <div>
            <h3 style={{marginBottom:'0px',marginTop:'10px'}}>{risultati[0].Comune}</h3>
            <small>Ultima Rilevazione: {risultati[0].fineIntervallo.substring(0, 10)}</small>
            {risultati.map((record, i) => {
                totVax.push(parseInt(record.Vaccinati));
                totTarget.push(parseInt(record.Target));
                return(
                    <div style={{marginBottom:'10px'}} key={i}>
                    <p style={{marginBottom:'0px',marginTop:'10px'}}>
                        Età: {record.classeEta}
                    </p>
                    <ProgressBar now={Math.round(record.Vaccinati/record.Target*100)} />
                    <small style={{float:'right'}}>{record.Vaccinati} su {record.Target} ({Math.round(record.Vaccinati/record.Target*100)}%)</small>
                    </div>
                    )
                }
            )
            }
            <p style={{marginBottom:'0px',marginTop:'10px'}}>Totali:</p>
            <ProgressBar now={Math.round(totVax.reduce((a, b) => a + b, 0)/totTarget.reduce((a, b) => a + b, 0)*100)} />
            <small style={{float:'right'}}>
                {totVax.reduce((a, b) => a + b, 0)} su {totTarget.reduce((a, b) => a + b, 0)} ({Math.round(totVax.reduce((a, b) => a + b, 0)/totTarget.reduce((a, b) => a + b, 0)*100)}%)
            </small>
        </div>
        )
    }
