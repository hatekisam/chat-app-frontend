import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setProfileRoute } from "../utils/APIRoutes";

export default function SetProfile() {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
      navigate("/login");
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    const user = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const { data: responseData } = await axios.post(
          `${setProfileRoute}/${user._id}`,
          {
            image: event.target.result,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (responseData.isSet) {
          user.isImageSet = true;
          user.image = responseData.image;
          localStorage.setItem(
            process.env.REACT_APP_LOCALHOST_KEY,
            JSON.stringify(user)
          );
          navigate("/");
        } else {
          toast.error("Error setting image. Please try again.", toastOptions);
        }
      } catch (error) {
        toast.error("Error setting image. Please try again.", toastOptions);
      }
    };
    reader.readAsDataURL(e.target.image.files[0]);
  };

  return (
    <>
      <Container>
        <div className="title-container">
          <h1>Select an image as your profile picture</h1>
        </div>
        <form onSubmit={onSubmit}>
          <input type="file" name="image" />
          <button type="submit" className="submit-btn">
            Set as Profile Picture
          </button>
        </form>
        <ToastContainer />
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  background-color: white;
  height: 100vh;
  width: 100vw;

  .title-container {
    h1 {
      color: #4e0eff;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  input[type="file"] {
    margin-top: 1rem;
    padding: 0.5rem;
    border-radius: 0.4rem;
    border: 1px solid #ddd;
    width: 100%;
  }

  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #3e00ff;
    }
  }
`;
