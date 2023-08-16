import { Link } from "react-router-dom";
import styled from "styled-components";
import { FieldValues, useForm } from "react-hook-form";
import { BiSearchAlt } from "react-icons/bi";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { SetStateAction, useEffect, useState } from "react";
import { options } from "../api/api";

const HeaderStyle = styled(motion.header)`
  z-index: 10;
  height: 10vh;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1vw;
  ul {
    display: flex;
    align-items: center;
    gap: 30px;
    li {
      position: relative;
      &.on {
        &::before {
          content: "";
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          display: inline-block;
          width: 5px;
          height: 5px;
          background-color: red;
          border-radius: 50%;
        }
      }
      a {
        font-size: 25px;
        font-weight: bold;
        color: inherit;
      }
    }
  }
`;
const Search = styled.div`
  margin-left: 5vw;
  position: relative;
  input {
    width: 0;
    color: inherit;
    font-size: 18px;
  }
  span {
    cursor: pointer;
    position: absolute;
    top: 50%;
    left: -2vw;
    transform: translateY(-50%);
  }
  svg {
    width: 20px;
    height: 20px;
    color: inherit;
  }
  .search-content {
    position: absolute;
    top: calc(100% + 3px);
    left: 0;
    width: 100%;
    height: 30px;
    background-color: #fff;
  }
`;

const Input = styled(motion.input)`
  background-color: transparent;
  outline: none;
  border: none;
  border-bottom: 1px solid gray;
`;

export default function Header({
  result,
}: {
  result: React.Dispatch<SetStateAction<{}>>;
}) {
  const [openSearch, setOpenSearch] = useState(false);
  const { register, watch, handleSubmit } = useForm();
  const { scrollY } = useScroll();
  const [keyword, setKeyword] = useState<string>("");
  const [headerIdx, setHeaderIdx] = useState(0);

  const backgroundColor = useTransform(
    scrollY,
    [0, 300],
    ["rgba(0,0,0,0)", "rgba(0,0,0,0.8)"]
  );
  const color = useTransform(
    scrollY,
    [0, 300],
    ["rgba(255,255,255,1)", "rgba(255,255,255,1)"]
  );
  const watchedValue = watch("search");

  async function getData(keyword: string) {
    console.log(keyword);

    try {
      //영화먼저
      const mvResponse = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${keyword}&include_adult=false&language=ko-KR&page=1`,
        options
      );
      const mvData = await mvResponse.json();

      //다음tv
      const tvResponse = await fetch(
        `https://api.themoviedb.org/3/search/tv?query=${keyword}include_adult=false&language=ko-KR&page=1`,
        options
      );
      const tvData = await tvResponse.json();

      const mv = await mvData.results;
      const tv = await tvData?.result;

      if (!mv && !tv) return;
      return { movie: mv, tv: tv };
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  useEffect(() => {
    if (keyword) {
      getData(keyword).then((res) => res && result(res));
    }
  }, [keyword]);
  return (
    <HeaderStyle style={{ backgroundColor, color }}>
      <motion.ul>
        <motion.li
          layoutId="header0"
          onClick={() => setHeaderIdx(0)}
          className={headerIdx === 0 ? "on" : undefined}
        >
          <Link to="/">홈</Link>
        </motion.li>
        <motion.li
          layoutId="header1"
          onClick={() => setHeaderIdx(1)}
          className={headerIdx === 1 ? "on" : undefined}
        >
          <Link to="/tv">TV 시리즈</Link>
        </motion.li>
      </motion.ul>
      <Search>
        <form onSubmit={handleSubmit((data) => setKeyword(data.search))}>
          <Input
            type="text"
            {...register("search")}
            animate={{
              width: openSearch ? "180px" : 0,
              padding: openSearch ? "7px" : 0,
            }}
          />
        </form>
        <span onClick={() => setOpenSearch(!openSearch)}>
          <BiSearchAlt />
        </span>
      </Search>
    </HeaderStyle>
  );
}
