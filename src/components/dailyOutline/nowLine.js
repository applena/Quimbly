import React from 'react';

function NowLine(props) {
  const nowLineStyle = {
    width: '100%',
    height: '5px',
    borderBottom: '5px solid darkred',
    position: 'absolute',
    top: props.nowLineLocation
  }

  setInterval(() => {
    const currentTime = new Date();
    const minutes = currentTime.getMinutes();
    props.setCurrentMinutes(minutes);
  }, 10000);



  return (
    <div style={nowLineStyle} id="now-line"></div>
  )
}

export default NowLine;