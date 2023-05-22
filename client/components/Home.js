import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import AllFlights from './AllFlights';
import Pagination from './Pagination';
import axios from 'axios';
import { SearchBar } from './SearchBar';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import { FiPlusCircle, FiMinusCircle } from 'react-icons/fi';

/**
 * COMPONENT
 */

export const Home = (props) => {
  const { username } = props;
  const [flights, setFlights] = useState([]);
  const [cities, setCities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(20);
  window;

  useEffect(() => {
    fetchCities();
  }, []);

  const handleDecrementTravelers = (event) => {
    const trav = document.getElementById('travelers-num');
    let num = parseInt(trav.innerHTML);
    if (num > 1) {
      num--;
    }
    trav.innerHTML = num;
  };

  const handleIncrementTravelers = (event) => {
    const trav = document.getElementById('travelers-num');
    let num = parseInt(trav.innerHTML);
    if (num < 6) {
      num++;
    }
    trav.innerHTML = num;
  };

  const handleSearchButton = (event) => {
    event.preventDefault();
    const fromFull = event.target.from.value;
    const fromSlice = fromFull.lastIndexOf('-');
    const destinationFull = event.target.destination.value;
    const destSlice = destinationFull.lastIndexOf('-');
    const from = fromFull.slice(fromSlice + 1) || 'empty';
    const destination = destinationFull.slice(destSlice + 1) || 'empty';

    fetchData(from, destination);
  };
  const fetchCities = async () => {
    const { data } = await axios.get('/api/airports');

    setCities(data);
  };
  const fetchData = async (from, destination) => {
    const { data } = await axios.get(
      `/api/flights/travelapi/${from}/${destination}`
    );
    if (Object.keys(data.data).length === 0) {
      window.alert('No Flights Available!');
    }
    setFlights(data.data);
  };
  //get current post
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = Object.entries(flights).slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  //Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <React.Fragment>
      <div className='box-container'>
        <div className='booking-container'>
          <h3 className='booking-title'>Book Your Flights {username}</h3>
          <div className='booking-travelers'>
            <div onClick={handleDecrementTravelers} className='traveler-button'>
              <FiMinusCircle className='add-minus-button' />
            </div>
            <p id='travelers'>Travelers</p>

            <div onClick={handleIncrementTravelers} className='traveler-button'>
              <FiPlusCircle className='add-minus-button' />
            </div>
          </div>
          <p id='travelers-num' className='traveler-number'>
            1
          </p>
          <SearchBar handleSearchButton={handleSearchButton} cities={cities} />
        </div>
      </div>
      <div className='cards-background'>
        <AllFlights flights={currentPosts} />
      </div>
      <div className='page'>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={Object.entries(flights).length}
          paginate={paginate}
        />
      </div>
    </React.Fragment>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
