import React from 'react';
import GuessPegs from '../GuessPegs/GuessPegs';
import GuessScore from '../GuessScore/GuessScore';

const GuessRow = (props) => (
  <div className='flex-h'>
    Guess Row #
    <GuessPegs />
    <GuessScore />
  </div>
);

export default GuessRow;
