// import React from "react";

const When = props => {
  return props.condition ? props.children : null;
};

export default When;