import React from 'react';
import { Link } from 'react-router-dom';
import Quiz from './Quiz';

const Home = () => {
  return (
    <div>
        <Link to="/quiz">
        <button >Start Quiz</button>
        </Link>
     
    </div>
  );
}

export default Home;
