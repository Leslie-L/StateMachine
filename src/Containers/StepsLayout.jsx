import React from 'react';
import { Welcome } from '../Components/Welcome'
import { Search } from '../Components/Search';
import { Passengers } from '../Components/Passengers';
import { Tickets } from '../Components/Tickets';
import './StepsLayout.css';

export const StepsLayout = ({ state, send }) => {
  const renderContent = () => {
    if (state.matches('inicial')) return <Welcome send={send} />
    if (state.matches('search')) return <Search send={send} />
    if (state.matches('tickets')) return <Tickets send={send} context={state.context}/>
    if (state.matches('passangers')) return <Passengers send={send} state={state} />
    
    
    return null;
  };

  return (
    <div className='StepsLayout' >
      {renderContent()}
    </div>
  );
}; 