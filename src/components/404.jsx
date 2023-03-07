import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function PageNotFound() {
    const navigate = useNavigate()
      useEffect(async () => {
        if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
          navigate("/login");
        } else {
          navigate("/")
        }
      }, []);
  return <p>fasdfasdfasd Error</p>;
}
