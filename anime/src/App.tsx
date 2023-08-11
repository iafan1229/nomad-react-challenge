import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import { AnimatePresence, motion } from "framer-motion";
import styled from 'styled-components';

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 30px;
  width: 500px;
  height: 500px;
`;

const Box = styled(motion.div)`
  position: relative;
  background: white;
  border-radius: 30px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrap = styled.div<Props>`
  position: fixed;
  top:0;
  left:0;
  right:0;
  bottom:0;
  width: 100vw;
  height: 100vh;
  display: ${({show})=> show ? 'flex' :'none'};
  background-color:rgba(0,0,0,.5) ;
  justify-content: center;
  align-items: center;
`;

const Modal = styled(motion.div)`
  z-index:5;
  position: absolute;
  width: 235px;
  height: 235px;
  border-radius: 30px;
  background-color: #fff;
`;

const Ball = styled(motion.span)`
  display: inline-block;
  width: 50px;
  height: 50px;
  background: lightgray;
  border-radius: 50%;
  position: absolute;
  z-index: 10;
`;

const Button = styled(motion.button)`
  margin-top: 30px;
`;

interface Props{
  show: number | null;
}

function App() {
  const [id, setId] = useState<number | null>(null);
  const [ballId, setBallId] = useState<2|3>(2);

  const variants = {
    open: { opacity: 1 },
    closed: {opacity: 0 },
  }

  const handleBall = () => {
    if(ballId===2){
      setBallId(3)
    }else{
      setBallId(2)
    }
  }

  
  return (
    <>
      <Grid>
        {[1, 2, 3, 4].map(el => <Box layoutId={el+' '} layout key={el} onClick={() => setId(el)} whileHover={{scale: 1.1}}>
          {el === ballId ? <Ball layoutId='circle' animate={{opacity:1}}></Ball> : null}
        </Box>)}
      </Grid>  
     {id ?   
        <AnimatePresence>
          <ModalWrap show={id}>
            <Modal 
              layoutId={id+' '}
              animate={id ? "open" : "closed"}
              variants={variants}
              onClick={() => setId(null)}>content</Modal>
          </ModalWrap>
        </AnimatePresence>
    : null}
      <Button whileHover={{scale: 1.1, color: ballId===2 ?'red':'green'}} onClick={handleBall}>Switch</Button>
    </>
  );
}

export default App;
