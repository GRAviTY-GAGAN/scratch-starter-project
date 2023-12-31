import React, { useEffect, useState } from "react";
import Icon from "./Icon";
import { Draggable, Droppable } from "react-beautiful-dnd";
import "../CSS/Sidebar.css";
import { Link } from "react-scroll";
import { Tooltip } from "@chakra-ui/react";
import { white } from "tailwindcss/colors";

export default function Sidebar({
  handleCatMove,
  rotateDeg,
  handlePlayActions,
  cards,
  say,
}) {
  return (
    <div className="w-60 sidebar-main-container flex-none h-full bg-white overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200">
      <div className="font-bold"> {"Events"} </div>
      <Link to="preview" smooth={true}>
        <Tooltip
          bg={"#855CD6"}
          color={white}
          placement="auto-start"
          label="Play the current set of actions available in the Drop Events container."
        >
          <div
            onClick={() => handlePlayActions()}
            className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
          >
            {"Play"}
            {/* <Icon name="flag" size={15} className="text-green-600 mx-2" /> */}
            {""}
          </div>
        </Tooltip>
      </Link>
      <Link to="preview" smooth={true}>
        <div
          onClick={() => say("Hello!")}
          className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        >
          {"Say Hello!"}
        </div>
      </Link>
      <Link to="preview" smooth={true}>
        <Tooltip
          bg={"#855CD6"}
          color={white}
          placement="auto-start"
          label="Repeat the nth-1 action set if available in the history"
        >
          <div
            onClick={() => handlePlayActions(true)}
            className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
          >
            {"Repeat"}
          </div>
        </Tooltip>
      </Link>
      <div className="font-bold"> {"Motion"} </div>
      <div
        onClick={handleCatMove}
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
      >
        {"Move 10 steps"}
      </div>
      <div
        onClick={() => rotateDeg("left")}
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
      >
        {"Turn left "}
        {/* <Icon name="undo" size={15} className="text-white mx-2" /> */}
        {"15 degrees"}
      </div>
      <div
        onClick={() => rotateDeg("right")}
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
      >
        {"Turn right "}
        {/* <Icon name="redo" size={15} className="text-white mx-2" /> */}
        {"15 degrees"}
      </div>
      <div className="font-bold capitalize header"> {"Drag events"} </div>
      <div>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              className="side-action-container"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {cards.map((card, index) => (
                <Draggable
                  key={card.id + card.id}
                  draggableId={`${card.id}`}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      className="side-card"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {card.value}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
}
