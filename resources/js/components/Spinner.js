import React from 'react';

export default props => {
  return (
    <div className="d-flex justify-content-center">
      <div
        className="spinner-grow text-primary"
        role="status"
        style={{ width: props.width, height: props.height }}
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}
