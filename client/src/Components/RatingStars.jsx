import React from "react";

const RatingStars = ({ rating, size }) => {
  const fullStars = Math.floor(rating);
  let hasHalfStar = rating % 1 !== 0;

  const renderStars = () => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<span key={i} className={`text-yellow-500 ${size}`}>&#9733;</span>);
      } else if (hasHalfStar) {
        stars.push(<span key={i} className={`text-yellow-500 ${size}`}>&#9734;</span>);
        hasHalfStar = false; // Avoid displaying more than one half star
      } else {
        stars.push(<span key={i} className={`text-yellow-500 ${size}`}>&#9734;</span>);
      }
    }
    return stars;
  };

  return (
    <div className="flex items-center">
      <div className="mr-1">{renderStars()}</div>
      <span className={`text-sm text-gray-500 ${size}`}>{rating}</span>
    </div>
  );
};

export default RatingStars;