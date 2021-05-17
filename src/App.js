import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [numOfMatches, setNumOfMatches] = useState(25);
  const [prevBotNum, setPrevBotNum] = useState(0);
  const [prevHumanNum, setPrevHumanNum] = useState(0);
  let newNum;
  let newNumOfMatches = numOfMatches;

  let testFunc = (num) => {
    if (numOfMatches === 0) {
      winFunc();
      return;
    } else {
      newNum = num;
      if (numOfMatches < newNum) {
        return;
      }

      if (
        (numOfMatches > 0 && numOfMatches > newNum) ||
        (numOfMatches > 0 && numOfMatches === newNum)
      ) {
        newNumOfMatches = newNumOfMatches - newNum;
      } else {
        return;
      }
      if (
        numOfMatches === 0 ||
        numOfMatches < newNum ||
        newNumOfMatches === 0
      ) {
        winFunc();
      } else {
        botMove();
      }
      setPrevHumanNum(prevHumanNum + newNum);
      setNumOfMatches(newNumOfMatches);
    }
  };

  let botMove = () => {
    setTimeout(() => {
      if ((numOfMatches <= 5 && prevBotNum % 2 !== 0) || numOfMatches <= 3) {
        newNum = 1;
      } else if (numOfMatches <= 5 && prevBotNum % 2 === 0) {
        newNum = 2;
      } else if (prevBotNum <= 15) {
        newNum = Math.floor(Math.random() * (4 - 1) + 1);
      }

      if (
        (numOfMatches > 0 && numOfMatches > newNum) ||
        (numOfMatches > 0 && numOfMatches === newNum)
      ) {
        newNumOfMatches = newNumOfMatches - newNum;
      } else {
        return;
      }
      setPrevBotNum(prevBotNum + newNum);
      setNumOfMatches(newNumOfMatches);
    }, 750);
  };

  let winFunc = () => {
    if (numOfMatches === 0 && prevHumanNum % 2 === 0) {
      return <h1>human vin</h1>;
    } else if (numOfMatches === 0 && prevBotNum % 2 === 0) {
      return <h1>bot vin</h1>;
    }
  };

  let newGameHandler = () => {
    setPrevBotNum(0);
    setPrevHumanNum(0);
    setNumOfMatches(25);
  };

  return (
    <div className="App">
      <h1>
        на столе {numOfMatches}
        {numOfMatches === 1
          ? " спичка"
          : numOfMatches >= 2 && numOfMatches <= 4
            ? " спички"
            : numOfMatches >= 5 && numOfMatches <= 20
              ? " спичек"
              : numOfMatches === 21
                ? " спичка"
                : numOfMatches >= 22 && numOfMatches < 25
                  ? " спички"
                  : " спичек"}
      </h1>
      <div className="btn" onClick={() => testFunc(1)}>
        взять 1 спичку
      </div>
      <div className="btn" onClick={() => testFunc(2)}>
        взять 2 спички
      </div>
      <div className="btn" onClick={() => testFunc(3)}>
        взять 3 спички
      </div>
      <br />
      <div className="textWrapper">
        <div className="numBox">
          у бота {prevBotNum}
          {prevBotNum === 1
            ? " спичка"
            : prevBotNum >= 2 && prevBotNum <= 4
              ? " спички"
              : prevBotNum >= 5 && prevBotNum <= 20
                ? " спичек"
                : prevBotNum === 21
                  ? " спичка"
                  : prevBotNum >= 22 && prevBotNum < 25
                    ? " спички"
                    : " спичек"}
        </div>
        <div className="numBox">
          у меня {prevHumanNum}
          {prevHumanNum === 1
            ? " спичка"
            : prevHumanNum >= 2 && prevHumanNum <= 4
              ? " спички"
              : prevHumanNum >= 5 && prevHumanNum <= 20
                ? " спичек"
                : prevHumanNum === 21
                  ? " спичка"
                  : prevHumanNum >= 22 && prevHumanNum < 25
                    ? " спички"
                    : " спичек"}
        </div>
      </div>
      <div>{winFunc()}</div>

      <br />
      {numOfMatches === 0 ? (
        <div className="btn" onClick={() => newGameHandler()}>
          начать новую игру
        </div>
      ) : (
          ""
        )}
    </div>
  );
}
