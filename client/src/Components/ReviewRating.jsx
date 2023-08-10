import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const StarRating = ({ rating }) => {
  const MAX_STARS = 5;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  return (
    <>
      {Array.from({ length: fullStars }, (_, index) => (
        <FaStar key={index} className="text-yellow-500 inline-flex" />
      ))}
      {hasHalfStar && <FaStarHalfAlt className="text-yellow-500 inline-flex" />}
      {Array.from({ length: MAX_STARS - Math.ceil(rating) }, (_, index) => (
        <FaRegStar key={index} className="text-yellow-500 inline-flex" />
      ))}
    </>
  );
};

export default StarRating;