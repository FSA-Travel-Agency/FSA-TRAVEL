import React from 'react';
import { useState } from 'react';
import FlightCard from './FlightCard';
import DetailsCard from './DetailsCard';

function AllFlights(props) {
  const flights = props.flights;
  const [popUpContent, setPopUpContent] = useState([]);
  const [popUpToggle, setPopUpToggle] = useState(false);
  const changeContent = (flight) => {
    setPopUpContent([flight]);
    setPopUpToggle(!popUpToggle);
  };
  return (
    <div className='card-container'>
      {flights.map(([k, flight]) => {
        return (

          <FlightCard flight={flight} k={k} changeContent={changeContent} />
        );
      })}
      {popUpToggle && (
        <div className='pop-up-container' onClick={changeContent}>
          <div className='pop-up-body' onClick={(e) => e.stopPropagation()}>
            <div className='pop-up-header'>
              <button className='pop-up-x' onClick={changeContent}>
                X
              </button>
            </div>
            <div className='pop-up-content'>
              {popUpContent.map((flight) => {

                return <DetailsCard flight={flight} />;

              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllFlights;
