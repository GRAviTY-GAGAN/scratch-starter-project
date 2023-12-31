import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { gray, red } from "tailwindcss/colors";
import { FaRegEye } from "react-icons/fa";
import SetModal from "./SetModal";
import { v4 as uuid } from "uuid";

function HistoryModal({ isOpen, onOpen, onClose, history, handleRestore }) {
  const [openSet, setOpenSet] = useState("");
  const [name, setName] = useState("");
  const {
    isOpen: isOpenSet,
    onOpen: onOpenSet,
    onClose: onCloseSet,
  } = useDisclosure();

  function handleSetOpen(set) {
    setOpenSet(set);
    setTimeout(() => {
      onOpenSet();
    }, 100);
  }

  // console.log(history, "HISTORY");
  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sets Deleted.</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box style={{ color: red[500] }}>
              {!history.length && "No history available!"}
            </Box>
            <Box>
              {history.length > 0 && (
                <Box>
                  {history.map((history, index) => (
                    <Box
                      key={`${uuid()}`}
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                      bg={gray[200]}
                      borderRadius={"5px"}
                      pl={"10px"}
                      mb={"5px"}
                    >
                      <Box>Set {index + 1}</Box>
                      <Button
                        onClick={() => {
                          setName(`Set ${index + 1}`);
                          handleSetOpen(history);
                        }}
                        bg={"transparent"}
                        _hover={{ bg: "transparent" }}
                      >
                        <FaRegEye />
                      </Button>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </ModalBody>

          <ModalFooter>
            {/* <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button> */}
            Sets deleted from the drop events container will appear here.
          </ModalFooter>
        </ModalContent>
        <SetModal
          name={name}
          openSet={openSet}
          isOpenSet={isOpenSet}
          onCloseSet={onCloseSet}
          onOpenSet={onOpenSet}
          handleRestore={handleRestore}
        />
      </Modal>
    </>
  );
}

export default HistoryModal;
