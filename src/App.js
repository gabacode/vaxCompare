import React, {useState} from 'react';
import Select, { createFilter } from "react-select";
import MenuList from "./components/MenuList";
import Vax from "./components/Vax";
import comuni from "./lib/elenco-comuni-siciliani.json";
import Compare from "./components/Compare";

const options = comuni.map(item => (
  {
    value: item.comune_codice_istat.substring(1),
    label: item.comune_denominazione + " (" + item.provincia_sigla + ")"
  } 
));
export default function Home() {
  const [isLoading,setIsLoading] = useState(true)
  const [istat, setIstat] = useState(82053);
  const [istat2, setIstat2] = useState(87015);
  const [c1, setC1] = useState({});
  const [c2, setC2] = useState({});

  const handleChange = (selectedOption) => {
    setIstat(selectedOption.value)
  };
  const handleChange2 = (selectedOption) => {
    setIstat2(selectedOption.value)
  };

  const sendC1 = (index) => {
    setC1({data: index, loading: false});
  };
  const sendC2 = (index) => {
    setC2({data: index, loading: false});
  };
  const sendLoad = (index) => {
    setIsLoading(index);
  }

  return (
    <div className="container main">
      <div className="row">
        <div className="col-12 col-md-4">
          <Select
            filterOption={createFilter({ ignoreAccents: false })}
            options={options}
            onChange={handleChange}
            components={{MenuList}}
          />
          <Vax istat={istat} sendData={sendC1} sendLoad={sendLoad}/>
        </div>
        <div className="col-12 col-md-4">
          <h1 style={{textAlign:'center'}}>Vax Compare</h1>
          {c1.loading === false && c2.loading === false ?
          <Compare c1={c1} c2={c2}/>
          : "Caricamento..."
          }
         </div>
        <div className="col-12 col-md-4">
          <Select
            filterOption={createFilter({ ignoreAccents: false })}
            options={options}
            onChange={handleChange2}
            components={{MenuList}}
          />
          <Vax istat={istat2} sendData={sendC2} sendLoad={sendLoad}/>
        </div>
      </div>
    </div>
  );
}