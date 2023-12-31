import {
  Box,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { gray } from "tailwindcss/colors";
import { v4 as uuid } from "uuid";

function SetModal({
  onOpenSet,
  isOpenSet,
  onCloseSet,
  name,
  openSet,
  handleRestore,
}) {
  //   console.log(name, openSet);
  return (
    <>
      {/* <Button onClick={onOpenSet}>Open Modal</Button> */}

      <Modal isOpen={isOpenSet} onClose={onCloseSet}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{name} Details.</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ul>
              {openSet.length > 0 &&
                openSet.map((set, index) => (
                  <List pl={"2rem"} listStyleType="disc" key={`${uuid()}`}>
                    <ListItem
                      style={{
                        textTransform: "uppercase",
                        fontWeight: 500,
                        fontSize: "small",
                        letterSpacing: "1px",
                        wordSpacing: "4px",
                        //   color: "white",
                      }}
                    >
                      {set.value}
                    </ListItem>
                  </List>
                ))}
            </ul>
          </ModalBody>

          <ModalFooter>
            <Box
              display={"flex"}
              gap={"1rem"}
              flexDirection={"column"}
              justifyContent={"start"}
            >
              <Box>
                Want to restore this set of events a your current events in you
                Drop Events container?
              </Box>
              <Button
                onClick={() => {
                  handleRestore(openSet);
                  onCloseSet();
                }}
                colorScheme="blue"
                mr={3}
              >
                Restore
              </Button>
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SetModal;
