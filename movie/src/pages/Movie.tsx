import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { images } from "../image-data";

// style
const Wrapper = styled(motion.div)`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const SlideWrap = styled.div`
  position: relative;
  width: 100%;
  .slider-box {
    display: flex;
    justify-content: space-around;
    gap: 10px;
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
    &:first-child {
      left: 0;
    }
    &:last-child {
      right: 0;
    }
  }
`;

const Box = styled(motion.div)`
  width: 250px;
  text-align: center;
  flex-shrink: 0;
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
    transition: { duration: 0.5 },
  },
  exit: (back: boolean) => ({
    x: back ? 500 : -500,
    opacity: 0,
    transition: { duration: 0.5 },
  }),
};

// render
function Movie() {
  const [visible, setVisible] = useState(0);
  const [direction, setDirection] = useState<null | string>(null);
  const [movieList, setMovieList] = useState<any>([]);
  const [movieIdx, setMovieIdx] = useState(1);
  const [showingMovieList, setShowingMovieList] = useState<any>([]);
  const [back, setBack] = useState(false);
  //박스마다 이미지 적용
  //   const imageIndex = wrap(0, images.length, visible);

  const nextPlease = () => {
    setDirection("left");
    setBack(false);
    setVisible((prev) => (prev + 1 === images.length ? 0 : prev + 1));
    setMovieIdx(movieIdx > 5 ? 1 : movieIdx + 1);
  };
  const prevPlease = () => {
    setDirection("right");
    setBack(true);
    setVisible((prev) => (prev - 1 < 0 ? images.length - 1 : prev - 1));
    setMovieIdx(movieIdx < 1 ? 5 : movieIdx - 1);
  };

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNzkzMzgxNTk4MzUzMmVhMWEyNzZjNzY5Nzg2OTFmMyIsInN1YiI6IjVlZTQzM2JhNWI0ZmVkMDAyMTY0Njg3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mGFW4VPjMiWiRveMguHGbxxRiaYJhQZsyJ50ybDS3rw",
      },
    };

    fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      options
    )
      .then((response) => response.json())
      .then((response) => setMovieList(response.results))
      .catch((err) => console.error(err));
  }, []);
  console.log(movieList);

  useEffect(() => {
    if (movieIdx) {
      setShowingMovieList([...movieList].splice(movieIdx - 1, 5));
    }
  }, [movieIdx]);

  useEffect(() => {
    setShowingMovieList([...movieList].splice(0, 5));
  }, [movieList]);

  console.log(showingMovieList);

  return (
    <Wrapper>
      <SlideWrap>
        <AnimatePresence>
          <motion.div
            className="slider-box"
            custom={back}
            variants={boxVariants}
            // src={images[visible]}
            initial={"entry"}
            animate="center"
            exit="exit"
            key={visible}
          >
            {showingMovieList.map((el: any, idx: number) => {
              return (
                <motion.div className="combine-text">
                  <Box>
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${el.poster_path}`}
                      alt={el.original_title}
                    />
                  </Box>
                  <span>{el.original_title}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
        <button onClick={prevPlease}>prev</button>
        <button onClick={nextPlease}>next</button>
      </SlideWrap>
    </Wrapper>
  );
}

export default Movie;
