import React, { useEffect, useState } from 'react';
import data from './assets/data.json';
import values from './assets/values.json';
import Select from 'react-select';
import Speech from 'react-speech';

function App() {
  const [selectedOption, setSelectedOption] = useState('');
  const [options, setOptions] = useState();
 
  useEffect(()=>{
    console.log(Object.keys(data).sort())
    setOptions(Object.keys(data).sort().map(item=>({
      label:item,
      value:item
    })))
  },[])

  const handleSearchChange = (selectedOption) => {
    setSelectedOption(selectedOption)
  }

  const {value: itemData}=selectedOption

  return (
    <div>
      <h1 style={{textAlign: 'center'}}>GRE Word Search</h1>
      <div style={{width: '40%', margin: 'auto'}}>
        <Select
          value={selectedOption}
          onChange={handleSearchChange}
          options={options}
        />
      </div>
      <div key={itemData} style={{width:'80%', margin:'auto'}}>
      {
        selectedOption == '' ? <h2>Please select a word</h2> : <div>
          <div style={{textAlign: 'left'}}>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <h2 style={{paddingRight: '10px'}}>{itemData}</h2>
              <Speech
                text={itemData}
                pitch="1"
                rate="0.9"
                displayText="Play"
                textAsButton
                />
            </div>
            <h3>Meaning: {values[itemData]?.[0].meaning}</h3>
            <h3>Sentence: {values[itemData]?.[0].sentence}</h3>
          </div>
          <img src={data[itemData]} alt={itemData} style={{width:'100%'}} />
        </div>
      }
      </div>
    </div>
  );
}

export default App;