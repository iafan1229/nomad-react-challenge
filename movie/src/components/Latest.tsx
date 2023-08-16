import { useState, useEffect } from "react";
import { options } from "../api/api";
import styled from "styled-components";
import Popup from "./Popup";

const MovieScreen = styled.div`
  height: 80vh;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  transition: opacity 0.7s;
  &:hover {
    opacity: 0.7;
  }
  div.title {
    position: absolute;
    bottom: 5vw;
    left: 10vh;
    width: 40vw;
    h1 {
      padding-bottom: 2vh;
    }
    p {
    }
  }
`;

export default function Latest({ title }: { title: string }) {
  const [screen, setScreen] = useState<any>({});
  const [id, setId] = useState<null | string>(null);
  const [sendId, setSendId] = useState<number>(0);

  async function getTopMovie() {
    const id = await fetch(
      `https://api.themoviedb.org/3/${title}/popular?language=ko-KR&page=1`,
      options
    )
      .then((res) => res.json())
      .then((res) => res.results[0].id);

    await fetch(
      `https://api.themoviedb.org/3/${title}/${id}?language=ko-KR`,
      options
    )
      .then((response) => response.json())
      .then((response) => setScreen(response))
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    getTopMovie();
  }, []);
  useEffect(() => {
    if (Object.keys(screen).length) {
      setId(screen.id);
      setSendId(screen.id);
    }
  }, [screen]);
  return (
    <>
      <MovieScreen
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${screen.backdrop_path})`,
        }}
        onClick={() => setId("screen")}
      >
        <div className="title">
          <h1>{screen.title}</h1>
          <p>{screen.overview}</p>
        </div>
      </MovieScreen>
      {id === "screen" && (
        <Popup idProp={id} setIdProp={setId} sendId={sendId} title={title} />
      )}
    </>
  );
}
