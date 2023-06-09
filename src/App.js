import React, { useEffect, useState } from 'react';
import data from './assets/data.json';
import values from './assets/values.json';
import Select from 'react-select';
import Speech from 'react-speech';

function App() {
  const [selectedOption, setSelectedOption] = useState('');
  var [options, setOptions] = useState();

  useEffect(()=>{
    setOptions(Object.keys(data).sort().map(item=>({
      label:item,
      value:item
    })))
  },[])

  const handleSearchChange = (selectedOption) => {
    setSelectedOption(selectedOption)
  }

  const previous = () => {
    const idx = options.indexOf(selectedOption);
    if(idx > 0) {
      setSelectedOption(options[options.indexOf(selectedOption) - 1])
    }
  }

  const next = () => {
    const idx = options.indexOf(selectedOption);
    if (idx < options.length - 1) {
      setSelectedOption(options[options.indexOf(selectedOption) + 1])
    }
  }

  const random = () => {
    document.getElementById("random").disabled = true;
    options = shuffle(options)
  }

  function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  const {value: itemData} = selectedOption

  const btnStyle = {
    backgroundColor: "#4CAF50",
    border: 'none',
    color: "#FFFFF",
    padding: "5px",
    textAlign: "center",
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    marginTop: '10px'
  }

  return (
    <div>
      <h1 style={{textAlign: 'center'}}>GRE Word Search</h1>
      <div style={{width: '40%', margin: 'auto'}}>
        <Select
          value={selectedOption}
          onChange={handleSearchChange}
          options={options}
        />
        <button id='random' style={btnStyle} onClick={random}>Random</button>
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
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10%'}}>
            <button style={btnStyle} onClick={previous}>Prev</button>
            <button style={btnStyle} onClick={next}>Next</button>
          </div>
        </div>
      }
      </div>
    </div>
  );
}

export default App;