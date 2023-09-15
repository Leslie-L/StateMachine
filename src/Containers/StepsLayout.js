import React from 'react';
import { Welcome } from './Welcome';
import { Search } from './Search';
import { Passengers } from './Passengers';
import { Tickets } from './Tickets';
import './StepsLayout.css';

export const StepsLayout = ({ state, send }) => {
  const renderContent = () => {
    return <Welcome />;
  };

  return (
    <div className='StepsLayout'>
      {renderContent()}
    </div>
  );
}; 