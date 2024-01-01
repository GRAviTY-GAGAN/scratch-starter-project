import React, { useEffect, useState } from "react";
import CatSprite from "./CatSprite";
import { BsArrowsVertical, BsArrows } from "react-icons/bs";
import "../CSS/PreviewArea.css";
import {
  Box,
  Button,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { blue, green, white } from "tailwindcss/colors";
import { FaHistory } from "react-icons/fa";
import HistoryModal from "./HistoryModal.js";

export default function PreviewArea({
  setCat,
  cat,
  history,
  catSize,
  setCatSize,
  handleRestore,
  handlePlayActions,
  show,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  let [xaxis, setXaxis] = useState(0);
  let [yaxis, setyaxis] = useState(0);

  const toast = useToast();

  useEffect(() => {
    setCat(document.querySelector(".cat"));
  }, []);

  useEffect(() => {
    handleSizeChange();
  }, [catSize]);

  function handleSizeChange() {
    cat && (cat.style.width = "50px !important");
    // console.log("first");
  }

  function handleReset() {
    if (cat) {
      cat.style.transform = `rotate(0deg)`;
      setXaxis(0);
      setyaxis(0);
      setCatSize("medium");
      handleForm("", true);
    }
  }

  function handleForm(e, reset) {
    e && e.preventDefault();

    // handleXYAxis(xaxis, yaxis, catSize);

    if (reset) {
      xaxis = 0;
      yaxis = 0;
    }

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

      cat.style.left = `${
        Number(xaxis) > containerWidth
          ? containerWidth - xbuffer
          : Number(xaxis)
      }px`;
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

      cat.style.top = `${
        Number(yaxis) > containerHeight
          ? containerHeight - ybuffer
          : Number(yaxis)
      }px`;
    }
  }

  return (
    <div
      name="preview"
      className="h-full overflow-y-auto pr-2 preview-main-container"
    >
      <div className="flex flex-col ">
        <div className="border relative bg-white preview-action-container cat-container">
          <div
            style={{ width: "fit-content" }}
            className="cat w-fit transition-all ease-linear duration-300"
          >
            {show.show && (
              <Box
                bg={green[300]}
                textAlign={"center"}
                color={"white"}
                borderRadius={"5px"}
                fontWeight={500}
              >
                {show.value}
              </Box>
            )}
            <CatSprite catSize={catSize} />
          </div>
        </div>
        <div className=" mt-5 form">
          <form
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                // document.querySelector(".submitBtn").click();
              }
            }}
            className="flex gap-6 justify-evenly items-center flex-wrap"
            onSubmit={handleForm}
          >
            <div className=" flex gap-3 items-center">
              <div className="flex gap-1 items-center">
                <div>
                  <BsArrows />
                </div>
                <div className=" mb-1">x</div>
              </div>
              <div
                style={{ width: "fit-content" }}
                className="border bg-white input border-black rounded-lg px-2"
              >
                <input
                  value={xaxis}
                  onChange={(e) => setXaxis(e.target.value)}
                  className=" outline-none w-14 rounded-lg"
                  type="text"
                />
              </div>
            </div>
            <div className=" flex gap-3 items-center">
              <div className="flex gap-1 items-center">
                <div>
                  <BsArrowsVertical />
                </div>
                <div className=" mb-1">y</div>
              </div>
              <div
                style={{ width: "fit-content" }}
                className="border input border-black rounded-lg px-2"
              >
                <input
                  value={yaxis}
                  onChange={(e) => setyaxis(e.target.value)}
                  className=" outline-none w-14 rounded-lg"
                  type="text"
                />
              </div>
            </div>
            <div onClick={handleReset} className="reset-button">
              Reset
            </div>

            <div className="flex gap-2 size">
              <div onClick={() => setCatSize("small")}>Small</div>
              <div onClick={() => setCatSize("medium")}>Medium</div>
              <div onClick={() => setCatSize("big")}>Big</div>
            </div>
            <button className="submitBtn" type="submit"></button>
          </form>
        </div>
        <div>
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={"1rem"}
            mt={"2rem"}
          >
            <Tooltip bg={blue[500]} label="History of deleted set of actions">
              <Button
                display={"flex"}
                gap={"0.5rem"}
                alignItems={"center"}
                justifyContent={"center"}
                _hover={{ bg: blue[700] }}
                color={white}
                bg={blue[700]}
                onClick={onOpen}
                className="historyBtn"
              >
                <FaHistory /> <Text mb={"3px"}>History</Text>
              </Button>
            </Tooltip>
            <Button
              display={"flex"}
              gap={"0.5rem"}
              alignItems={"center"}
              justifyContent={"center"}
              _hover={{ bg: blue[700] }}
              pb={"5px"}
              color={white}
              bg={blue[700]}
              onClick={() => handlePlayActions()}
              className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
            >
              {"Play"}
              {/* <Icon name="flag" size={15} className="text-green-600 mx-2" /> */}
              {""}
            </Button>
          </Box>
        </div>
        <div>
          <HistoryModal
            history={history}
            isOpen={isOpen}
            onClose={onClose}
            onOpen={onOpen}
            handleRestore={handleRestore}
          />
        </div>
      </div>
    </div>
  );
}
