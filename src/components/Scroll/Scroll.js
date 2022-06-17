import React from 'react';

const Scroll = (props) => {
  return (
    <div style={{ overflow: 'scroll', overflowX: 'hidden', height:"90vh", padding:0}}>
      {props.children}
    </div>
  );
};

export default Scroll;