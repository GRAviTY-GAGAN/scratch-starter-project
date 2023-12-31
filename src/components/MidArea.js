import React from "react";
import { Droppable } from "react-beautiful-dnd";
import "../CSS/MidArea.css";
import { IoTrashBin } from "react-icons/io5";
import { v4 as uuid } from "uuid";
import { Button, Tooltip } from "@chakra-ui/react";

export default function MidArea({
  actionCards,
  handleDeleteAction,
  handleSetDelete,
}) {
  return (
    <div className="flex-1 h-full overflow-auto midarea-main-container">
      <div className="flex justify-between items-center">
        <div className="font-bold">{"Drop Events"}</div>{" "}
        <Tooltip
          borderRadius={"5px"}
          label="Delete current set of actions to save it in the history."
          bg="red.600"
          placement="auto-start"
        >
          <Button onClick={handleSetDelete} p={0} w={"fit-content"}>
            <IoTrashBin />
          </Button>
        </Tooltip>
      </div>
      <Droppable droppableId="actionDrop">
        {(provided) => (
          <div
            className="mid-action-container border mt-2"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {actionCards.map((actionCard, index) => (
              <div key={actionCard.id} className="card">
                <div>{actionCard.value}</div>
                <div onClick={() => handleDeleteAction(actionCard.id)}>
                  <IoTrashBin />
                </div>
              </div>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
