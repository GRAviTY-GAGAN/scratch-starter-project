import React, { useEffect, useState } from "react";
import Icon from "./Icon";
import { Draggable, Droppable } from "react-beautiful-dnd";
import "../CSS/Sidebar.css";

export default function Sidebar({
  handleCatMove,
  rotateDeg,
  handlePlayActions,
  cards,
}) {
  return (
    <div className="w-60 sidebar-main-container flex-none h-full bg-white overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200">
      <div className="font-bold"> {"Events"} </div>
      <div
        onClick={handlePlayActions}
        className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
      >
        {"Play"}
        {/* <Icon name="flag" size={15} className="text-green-600 mx-2" /> */}
        {""}
      </div>
      <div className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
        {"Say Hello!"}
      </div>
      <div className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
        {"Repeat"}
      </div>
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
