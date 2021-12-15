import React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';

function Restaurant() {
  let params = useParams();
  let { id } = params;

  console.log(params);
  return <div className='App'>Hello World</div>;
}

export default Restaurant;
