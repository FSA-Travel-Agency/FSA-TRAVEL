import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import AllFlights from './AllFlights';
import Pagination from './Pagination';
import axios from 'axios';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
export const SearchBar = ({ handleSearchButton, cities }) => {
  return (
    <form onSubmit={handleSearchButton}>
      <div className='input-from-to'>
        <label htmlFor='from'></label>
        <input
          list='data1'
          name='from'
          type='text'
          placeholder='Leaving from...'
        />
        <datalist id='data1'>
          {cities.map((obj) => {
            return (
              <option key={obj.id}>
                {obj.city}-{obj.IATA}
              </option>
            );
          })}
        </datalist>

        <BsFillArrowRightCircleFill size={70} />
        <label htmlFor='destination'></label>
        <input
          list='data1'
          name='destination'
          type='text'
          placeholder='Going to...'
        />
      </div>
      <button type='submit' className='form-button'>
        Search
      </button>
    </form>
  );
};
