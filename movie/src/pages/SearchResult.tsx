import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Slider from "../components/Slider";

export default function SearchResult() {
  const {
    searchResult: { movie, tv },
  } = useOutletContext() as any;
  const [newMovieData, setMovieNewData] = useState<any[]>([]);

  const [newTvData, setNewTvData] = useState<any[]>([]);

  useEffect(() => {
    if (!movie) return;
    setMovieNewData([...movie]);
  }, [movie?.[0]?.original_title]);

  useEffect(() => {
    if (!tv) return;
    setNewTvData([...tv]);
  }, [tv?.[0]?.original_title]);
  console.log(tv);
  return (
    <>
      {newMovieData?.length ? (
        <div style={{ paddingTop: "10vh" }}>
          <h2>영화 검색결과</h2>
          <Slider title="movie" movieData={newMovieData} />
        </div>
      ) : (
        <></>
      )}
      {newTvData?.length ? (
        <div style={{ paddingTop: "10vh" }}>
          <h2>TV 검색결과</h2>
          <Slider title="tv" movieData={newTvData} />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
