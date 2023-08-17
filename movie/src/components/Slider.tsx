import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { options } from "../api/api";
import Popup from "./Popup";

const SlideWrap = styled.div`
  position: relative;
  width: 100%;

  .slider-box {
    display: flex;
    justify-content: space-around;
    &:nth-of-type(2) {
      display: none;
    }
  }
  .combine-text {
    transform: scale(1);
    position: relative;
    transition: all 0.4s;
    &:hover {
      transform: scale(1.2);
      span {
        opacity: 1;
      }
    }
    span {
      position: absolute;
      display: block;
      bottom: 0;
      width: 100%;
      background: rgba(0, 0, 0, 0.7);
      padding: 10px 0;
      color: #fff;
      text-align: center;
      opacity: 0;
    }
  }
  button {
    position: absolute;
    width: 30px;
    height: 100%;
    top: 0;
    background: #303030;
    color: #fff;
    cursor: pointer;
    svg {
      font-size: 18px;
    }
    &:first-of-type {
      left: 0;
    }
    &:last-of-type {
      right: 0;
    }
  }
`;

const Box = styled(motion.div)`
  background-color: white;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 2px 3px rgba(0, 0, 0, 0.06);
  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

// animation
const boxVariants = {
  entry: (back: boolean) => ({
    x: back ? -500 : 500,
    opacity: 0,
  }),
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.0 },
  },
  exit: (back: boolean) => ({
    x: back ? 500 : -500,
    opacity: 0,
    transition: { duration: 1.0 },
  }),
};

export default function Slider({
  movieData,
  title,
}: {
  movieData: string | any[];
  title: string;
}) {
  const [movieList, setMovieList] = useState<any>([]);
  const [movieIdx, setMovieIdx] = useState(1);
  const [showingMovieList, setShowingMovieList] = useState<any>([]);
  const [back, setBack] = useState(false);
  const [id, setId] = useState<null | string>(null);
  const [sendId, setSendId] = useState<number>(0);

  const nextPlease = () => {
    setBack(false);
    setMovieIdx((prevMovieIdx) => (prevMovieIdx >= 6 ? 1 : prevMovieIdx + 1));
  };
  const prevPlease = () => {
    setBack(true);
    setMovieIdx((prevMovieIdx) => (prevMovieIdx <= 1 ? 6 : prevMovieIdx - 1));
  };

  async function getData(api: string | any[]) {
    if (Array.isArray(api)) {
      setMovieList(api);
    } else
      await fetch(api, options)
        .then((response) => response.json())
        .then((response) => setMovieList(response.results))
        .catch((err) => console.error(err));
  }

  useEffect(() => {
    getData(movieData);
  }, [movieData?.[0]?.original_title]);

  useEffect(() => {
    setShowingMovieList([...movieList].splice(movieIdx - 1, 6));
  }, [movieList, movieIdx]);
  return (
    <SlideWrap>
      <AnimatePresence custom={back}>
        <motion.div
          className="slider-box"
          custom={back}
          variants={boxVariants}
          initial="entry"
          animate="center"
          exit="exit"
          key={movieIdx}
          layout={false}
        >
          {showingMovieList.map((el: any, idx: number) => {
            return (
              <div className="combine-text">
                <Box
                  layoutId={
                    Array.isArray(movieData)
                      ? el.backdrop_path
                      : movieData + idx + " "
                  }
                  layout
                  key={
                    Array.isArray(movieData)
                      ? el.backdrop_path
                      : movieData + idx + " "
                  }
                  onClick={() => {
                    setId(
                      Array.isArray(movieData)
                        ? el.backdrop_path
                        : movieData + idx
                    );
                    setSendId(el.id);
                  }}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${el.poster_path}`}
                    alt={el.title}
                  />
                </Box>
                <span>{el.title}</span>
              </div>
            );
          })}
        </motion.div>
      </AnimatePresence>
      {id && (
        <Popup idProp={id} setIdProp={setId} sendId={sendId} title={title} />
      )}
      <button onClick={prevPlease}>
        <BiSolidLeftArrow />
      </button>
      <button onClick={nextPlease}>
        <BiSolidRightArrow />
      </button>
    </SlideWrap>
  );
}
