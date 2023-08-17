import { useState, useEffect } from "react";
import styled from "styled-components";
import Slider from "../components/Slider";
import Screen from "../components/Latest";
import { useOutletContext } from "react-router-dom";
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
function Movie() {
  const {
    searchResult: { movie },
  } = useOutletContext() as any;
  const [newData, setNewData] = useState<any[]>([]);

  useEffect(() => {
    if (!movie) return;
    setNewData([...movie]);
  }, [movie?.[0]?.original_title]);

  return (
    <Wrapper>
      {Object.keys(newData).length === 0 && (
        <>
          <Screen title="movie" />
          <h2>Popular Movies</h2>
          <Slider
            title="movie"
            movieData="https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1"
          />
          <h2>Top Rated Movies</h2>
          <Slider
            title="movie"
            movieData="https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1"
          />
          <h2>Upcoming</h2>
          <Slider
            title="movie"
            movieData="https://api.themoviedb.org/3/movie/upcoming?language=ko-KR&page=1"
          />
        </>
      )}
    </Wrapper>
  );
}

export default Movie;
