import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Servicepage = () => {
  const servicessSelector = useSelector((state) => {
    return {
      services: state.services.services,
    };
  });
  console.log(servicessSelector);

  return <div>{}</div>;
};

export default Servicepage;
