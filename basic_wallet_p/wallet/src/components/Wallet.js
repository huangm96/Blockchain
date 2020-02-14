import React, { useState, useEffect } from "react";
import UserInfo from "./UserInfo"
import Mining from "./Mining"
import MiningInfo from "./MiningInfo"
function Wallet() {
   
  return (
    <div className="Wallet">
          <UserInfo />
          {/* <Mining /> */}
          <MiningInfo/>
    </div>
  );
}

export default Wallet;
