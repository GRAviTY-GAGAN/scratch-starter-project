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
} from "@chakra-ui/react";
import React from "react";
import { gray, red } from "tailwindcss/colors";
import { FaRegEye } from "react-icons/fa";

function HistoryModal({ isOpen, onOpen, onClose, history }) {
  console.log(history, "HISTORY");
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
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                      bg={gray[200]}
                      borderRadius={"5px"}
                      pl={"10px"}
                      mb={"5px"}
                    >
                      <Box>Set {index + 1}</Box>
                      <Button bg={"transparent"} _hover={{ bg: "transparent" }}>
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
      </Modal>
    </>
  );
}

export default HistoryModal;
