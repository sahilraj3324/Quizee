import React from 'react';
import { Link } from 'react-router-dom';
import Quiz from './Quiz';

const Home = () => {
  return (
    <div>
        <Link to="/quiz">
        <button  className='px-6 py-3 rounded-lg font-medium border transition-all text-lg shadow-sm w-full hover:bg-indigo-600 hover:text-white'>Start Quiz</button>
        </Link>
     
    </div>
  );
}

export default Home;
