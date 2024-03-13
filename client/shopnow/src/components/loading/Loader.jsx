import React from 'react';
import Loading from 'react-loading';
const Loader = () => {
  const container = {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <div style={container}>
      <Loading type="spinningBubbles" width={50} color="#0DA487" />
    </div>
  );
};

export default Loader;
