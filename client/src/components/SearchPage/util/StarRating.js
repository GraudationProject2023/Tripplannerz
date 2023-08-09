import React from "react";

const StarRating = ({ rating, onRatingChange }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div>
      <span>Rate: </span>
      {stars.map((star) => (
        <Star
          key={star}
          filled={star <= rating}
          onClick={() => onRatingChange(star)}
        />
      ))}
    </div>
  );
};

const Star = ({ filled, onClick }) => {
  return (
    <span
      style={{ cursor: "pointer", color: filled ? "gold" : "gray" }}
      onClick={onClick}
    >
      ★
    </span>
  );
};

export default StarRating;
