import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const CoinsDisplay = styled.div`
  margin: 15px auto;
  padding: 10px 5px;
  width: 80vw;
  border: 1px solid lightgrey;
  cursor: pointer;
  border-radius: 25px;
  :hover {
    background: gold;
  }
`;
function MiningInfo() {
  const [coins, setCoins] = useState(0);
  window.setInterval(() => {
    getCoins();
  }, 1000);
  const getCoins = () => {
    axios
      .get("http://localhost:5000/coins")
      .then(res => {
        setCoins(res.data.coins);
      })
      .catch();
  };

  return (
    <div className="MiningInfo">
      <CoinsDisplay>
        <p style={{ fontSize: "2rem", fontWeight: 700 }}>{coins}</p>
      </CoinsDisplay>
    </div>
  );
}

export default MiningInfo;
