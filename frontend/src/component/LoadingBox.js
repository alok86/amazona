import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
function LoadingBox() {
  return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">loading...</span>
    </Spinner>
  );
}

export default LoadingBox;
