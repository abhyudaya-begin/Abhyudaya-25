import React from 'react';
import './card.css';
import asb from '../../../assets/ASB.jpg';
const Card = ({ url, name }) => {
  return (
    <div className="card">
      <img src={url} alt={name} className="card-image" draggable="true" />
      <p className="card-name">{name}</p>
    </div>
  );
};

export default Card;