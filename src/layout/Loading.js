import React from 'react';
import './Loading.scss';

function Loading({small}) {
  return (
    <div className={`lds-roller ${small && 'small'}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Loading;
