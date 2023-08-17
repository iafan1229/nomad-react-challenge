import React, { useState } from "react";
import { createGlobalStyle } from "styled-components";
import Header from "./components/Header";
import Content from "./components/Content";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";

const GlobalStyle = createGlobalStyle`
  *{
    margin: 0 ;
    padding: 0 ;
    box-sizing: border-box;
  }
  a{
    color: #000;
    text-decoration: none;
  }
  @media screen and (max-width: 500px) {
    body{
      padding: 0 5vw;
    }
  }
`;

function App() {
  const [searchResult, setSearchResult] = useState<any>({});
  console.log(searchResult);
  return (
    <div style={{ height: "150vh" }}>
      <GlobalStyle />
      <Content>
        <Header result={setSearchResult} />
        <Outlet context={{ searchResult }} />
      </Content>
      <Footer />
    </div>
  );
}

export default App;
