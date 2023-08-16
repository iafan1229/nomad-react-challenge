import React, { useEffect, useState, useRef, SetStateAction } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { options } from "../api/api";
import { AiFillCloseCircle } from "react-icons/ai";

const ModalWrap = styled.div<Props>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  display: ${({ show }) => (show ? "flex" : "none")};
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

const Modal = styled(motion.div)`
  z-index: 5;
  position: absolute;
  overflow-y: auto;
  width: 500px;
  border-radius: 30px;
  background-color: #fff;
  padding: 3vw;
  iframe {
    width: 100%;
  }
  p {
    padding: 3px 0;
    color: #000;
    &:last-of-type {
      padding-bottom: 3vh;
    }
  }
  span {
    color: #000;
    position: absolute;
    top: 10px;
    right: 10px;
    svg {
      width: 40px;
      height: 40px;
    }
  }
`;

interface Props {
  show: number | null;
}

const variants = {
  open: { opacity: 1 },
  closed: { opacity: 0 },
};

function Popup({
  idProp,
  setIdProp,
  sendId,
  title,
}: {
  idProp: string | null;
  setIdProp: React.Dispatch<SetStateAction<string | null>>;
  sendId: number;
  title: string;
}) {
  console.log(sendId);
  const [iframeObj, setIframeObj] = useState<any>({});
  const [screen, setScreen] = useState<any>({});

  async function getDetail(title: string, sendId: number) {
    //비디오 가져옴
    await fetch(
      `https://api.themoviedb.org/3/${title}/${sendId}/videos?language=ko-KR`,
      options
    )
      .then((response) => response.json())
      .then((response) => setIframeObj(response.results[0]))
      .catch((err) => console.error(err));
    //상세정보 가져옴
    await fetch(
      `https://api.themoviedb.org/3/${title}/${sendId}?language=ko-KR`,
      options
    )
      .then((response) => response.json())
      .then((response) => setScreen(response))
      .catch((err) => console.error(err));
  }
  useEffect(() => {
    if (sendId && title) {
      getDetail(title, sendId);
    }
  }, [sendId, title]);

  console.log(iframeObj, screen);
  return (
    <>
      <AnimatePresence>
        <ModalWrap show={idProp ? 1 : 0}>
          <Modal
            layoutId={idProp + " "}
            animate={idProp ? "open" : "closed"}
            variants={variants}
          >
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${iframeObj?.key}?autoplay=1`}
              title={iframeObj?.name}
              allowFullScreen
            ></iframe>
            <div className="des">
              <p>개봉일: {screen.release_date}</p>
              <p>상영 시간: {screen.runtime}분</p>
              <p>정보: {screen.overview}</p>
            </div>
            <span className="close" onClick={() => setIdProp(null)}>
              <AiFillCloseCircle />
            </span>
          </Modal>
        </ModalWrap>
      </AnimatePresence>
    </>
  );
}

export default Popup;
