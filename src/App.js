import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import MidArea from "./components/MidArea";
import PreviewArea from "./components/PreviewArea";
import { DragDropContext } from "react-beautiful-dnd";
import { actionData } from "./util/data";
import "./CSS/app.css";
import { v4 as uuid } from "uuid";
import { useToast } from "@chakra-ui/react";

export default function App() {
  const toast = useToast();
  const [cat, setCat] = useState("");
  const [catStyle, setCatStyle] = useState({ position: "absolute" });
  const [cards, setCards] = useState(actionData);
  const [actionCards, setActionCards] = useState([]);
  const [catSize, setCatSize] = useState("medium");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    initializeCat();
  }, [cat]);

  function initializeCat() {
    cat && (cat.style.position = "absolute");
  }

  function handleSetDelete() {
    setHistory([...history, actionCards]);
    setActionCards([]);
  }

  function handleCatMove() {
    if (!catStyle.hasOwnProperty("top")) {
      catStyle["top"] = 0;
      catStyle.top += 20;
    }
    catStyle.top += 20;
    cat.style.top = `${catStyle.top}px`;
    setCatStyle(catStyle);
    console.log(cat.style.top);
  }

  function rotateDeg(direction, value = 15) {
    if (!catStyle.hasOwnProperty("deg")) {
      catStyle["deg"] = 0;
    }

    let rotateBy = catStyle.deg;
    if (direction === "left") {
      rotateBy -= value;
    } else {
      rotateBy += value;
    }

    catStyle.deg = rotateBy;
    cat.style.transform = `rotate(${rotateBy}deg)`;
    setCatStyle(catStyle);
    console.log(cat.style.transform);
  }

  function handleDataOrder(result) {
    console.log(result, "dragResult");
    if (result && result.destination && result.source) {
      if (
        result.destination.droppableId === "actionDrop" &&
        result.source.droppableId === "droppable"
      ) {
        handleDropToMidArea(result);
        return;
      }

      if (
        result.source.droppableId === "droppable" &&
        result.destination.droppableId === "droppable"
      ) {
        handleDragResultChange(result);
        return;
      }
    }
  }

  function handleDragResultChange(result) {
    const newCardsList = [...cards];
    const [removed] = newCardsList.splice(result.source?.index, 1);
    console.log(removed);
    newCardsList.splice(result.destination?.index, 0, removed);
    setCards(newCardsList);
  }

  function handleDropToMidArea(result) {
    const dropped = cards[result.source.index];
    const newList = [...actionCards, { ...dropped, id: uuid() }];
    console.log(newList, "NEW");
    setActionCards(newList);
  }

  function handleDeleteAction(id) {
    let filterList = [...actionCards];
    filterList = filterList.filter((item) => item.id !== id);
    setActionCards(filterList);
  }

  function handlePlayActions() {
    // console.log(actionCards, "actions");
    actionCards.forEach((card, index) => {
      const type = card.type;
      const direction = card?.direction;
      const actionValue = card?.actionValue;
      setTimeout(() => {
        play(type, direction, actionValue);
      }, index * 1000);
    });
  }

  function play(type, direction, value = 20) {
    console.log(type, direction, value);
    switch (type) {
      case "Move": {
        const currentXposi = cat.offsetLeft;
        const currentYposi = cat.offsetTop;

        let x = currentXposi;
        let y = currentYposi;

        if (direction === "up") {
          y -= value;
        } else if (direction === "down") {
          y += value;
        } else if (direction === "left") {
          x -= value;
        } else if (direction === "right") {
          x += value;
        }

        handleXYAxis(x, y, catSize);
        return;
      }

      case "Rotate": {
        rotateDeg(direction, value);
        return;
      }

      case "Size": {
        setCatSize(value);
        return;
      }

      default: {
        return;
      }
    }
  }

  function handleXYAxis(xaxis = 0, yaxis = 0, catSize) {
    // e.preventDefault();

    if (isNaN(Number(xaxis)) || isNaN(Number(yaxis))) {
      toast({
        title: "Axis should have a number value",
        duration: 9000,
        isClosable: true,
        position: "top-right",
        status: "error",
      });
      return;
    }
    const containerWidth = document.querySelector(".cat-container").offsetWidth;

    const containerHeight =
      document.querySelector(".cat-container").offsetHeight;

    const currentXposi = cat.offsetLeft;
    const currentYposi = cat.offsetTop;

    console.log(containerHeight, containerWidth, "height", "weidth");
    console.log(yaxis, xaxis, "yaxis", "xaxis");

    if (Number(xaxis) && Number(xaxis) < 0) {
      cat.style.left = `0px`;
    }

    if (Number(xaxis) && Number(yaxis) < 0) {
      cat.style.top = `0px`;
    }

    if (Number(xaxis) >= 0) {
      let xbuffer = 80;
      if (catSize === "small") {
        xbuffer = 40;
      } else if (catSize === "big") {
        xbuffer = 150;
      }

      console.log(cat.style.left, "LEFT", xaxis);

      cat.style.left = `${
        Number(xaxis + currentXposi) > containerWidth
          ? containerWidth - xbuffer
          : Number(xaxis)
      }px`;

      console.log(cat.style.left, "LEFT");
    }

    if (Number(yaxis) >= 0) {
      let ybuffer = 100;
      if (catSize === "small") {
        ybuffer = 60;
      } else if (catSize === "big") {
        ybuffer = 150;
      }

      if (Number(yaxis) === 0 && catSize === "small") {
        cat.style.top = "-20px";
        return;
      }

      console.log(cat.style.top, "TOP", yaxis);

      cat.style.top = `${
        Number(yaxis + currentYposi) > containerHeight
          ? containerHeight - ybuffer
          : Number(yaxis)
      }px`;

      console.log(cat.style.top, "TOP");
    }
  }

  return (
    <div className="">
      <div className="navbar">
        <img
          className="scratch-logo"
          src="https://scratch.mit.edu/static/assets/90fb0caa5319c39b24946476dd32bb0d.svg"
          alt="Scratch"
        />
      </div>
      <DragDropContext onDragEnd={handleDataOrder}>
        <div className="containerrr">
          <div className="sidebar">
            <Sidebar
              handleCatMove={handleCatMove}
              rotateDeg={rotateDeg}
              cards={cards}
              handlePlayActions={handlePlayActions}
            />
            <MidArea
              actionCards={actionCards}
              handleDeleteAction={handleDeleteAction}
              handleSetDelete={handleSetDelete}
            />
          </div>
          <div className="preview">
            <PreviewArea
              setCat={setCat}
              cat={cat}
              handleXYAxis={handleXYAxis}
              catSize={catSize}
              setCatSize={setCatSize}
              history={history}
            />
          </div>
        </div>
      </DragDropContext>
    </div>
  );
}
