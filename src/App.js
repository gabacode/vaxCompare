import React, {useState} from 'react';
import Select, { createFilter } from "react-select";
import MenuList from "./components/MenuList";
import Vax from "./components/Vax";
import comuni from "./lib/elenco-comuni-siciliani.json";

const options = comuni.map(item => (
  {
    value: item.comune_codice_istat.substring(1),
    label: item.comune_denominazione + " (" + item.provincia_sigla + ")"
  } 
));

export default function Home() {

  const [istat, setIstat] = useState(82053);
  const [istat2, setIstat2] = useState(87015);

  const handleChange = (selectedOption) => {
    setIstat(selectedOption.value)
  };
  const handleChange2 = (selectedOption) => {
    setIstat2(selectedOption.value)
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-6">
          {/* <h1>{istat}</h1> */}
          <Select
            filterOption={createFilter({ ignoreAccents: false })}
            options={options}
            onChange={handleChange}
            components={{MenuList}}
          />
          <Vax istat={istat}/>
        </div>
        <div className="col-12 col-md-6">
          {/* <h1>{istat2}</h1> */}
          <Select
            filterOption={createFilter({ ignoreAccents: false })}
            options={options}
            onChange={handleChange2}
            components={{MenuList}}
          />
          <Vax istat={istat2}/>
        </div>
      </div>
    </div>
  );
}