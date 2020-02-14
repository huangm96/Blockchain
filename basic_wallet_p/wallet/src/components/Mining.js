import React, { useState } from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(3)
    }
  }
}));

const Button = styled.div`
  margin: 15px auto;
  padding: 15px 5px;
  width: 200px;
  border: 1px solid lightgrey;
  cursor: pointer;
  border-radius: 25px;
  :hover {
    background: gold;
  }
`;

function Mining() {
  const [mining, setMining] = useState(false);
  const classes = useStyles();

    const handleMiningStart = () => {
        setMining(true)
    }
    const handleMiningStop = () => {
        setMining(false)
    }
  return (
    <div className="Mining">
      {mining ? (
        <>
          <Button onClick={handleMiningStop}>Stop Minding</Button>
          <div className={classes.root} style={{margin:"0px auto",width:"80vw"}}>
            <LinearProgress />
          </div>
        </>
      ) : (
        <Button onClick={handleMiningStart}>Start Minding</Button>
      )}
    </div>
  );
}

export default Mining;
