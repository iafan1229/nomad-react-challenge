import { useState, useEffect } from "react";
import styled from "styled-components";
import Slider from "../components/Slider";
import Screen from "../components/Latest";

// style
const Wrapper = styled.div`
  justify-content: center;
  align-items: center;
  flex-direction: column;
  h2 {
    width: 100%;
    padding: 0 10px;
    padding-bottom: 10px;
    padding-top: 30px;
    text-align: left;
  }
`;

// render
function Tv() {
  return (
    <Wrapper>
      <Screen title="tv" />
      <h2>Airing Today</h2>
      <Slider
        title="tv"
        movieData="https://api.themoviedb.org/3/tv/airing_today?language=ko-KR&page=1"
      />
      <h2>On the Air</h2>
      <Slider
        title="tv"
        movieData="https://api.themoviedb.org/3/tv/on_the_air?language=ko-KR&page=1"
      />
      <h2>Popular</h2>
      <Slider
        title="tv"
        movieData="https://api.themoviedb.org/3/tv/popular?language=ko-KR&page=1"
      />
    </Wrapper>
  );
}

export default Tv;
