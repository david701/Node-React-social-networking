import React from 'react';

const Rating = ({ stars = 5 }) => {
  const starsRated = [];
  for (let i = 0; i < stars; i += 1) {
    starsRated.push(<li className="" key={i} />);
		// starsRated.push(<li className="filled" key={i} />);
  }
  return (
    <ul className="rating-display">
      {starsRated}
    </ul>
  );
};

export default Rating;
