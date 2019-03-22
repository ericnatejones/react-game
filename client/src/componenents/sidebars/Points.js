import React from 'react';
import './points.css'
import { withInterfaceStore } from '../../shared/InterfaceStore';

const Points = (props) => {
  
    return (
      <div className="points-box">
        <h2>YOU ARE {props.user.username}!</h2>
        <img src={props.user.imgUrl} alt={props.user.username}/>
        <h2>POINTS: {props.points}</h2>
      </div>
    );
}

export default withInterfaceStore(Points);