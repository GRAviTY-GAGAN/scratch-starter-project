import React, { useEffect, useState } from "react";
import CatSprite from "./CatSprite";
import { BsArrowsVertical, BsArrows } from "react-icons/bs";
import "../CSS/PreviewArea.css";
import { Box, Button, Text, Tooltip, useDisclosure } from "@chakra-ui/react";
import { blue, white } from "tailwindcss/colors";
import { FaHistory } from "react-icons/fa";
import HistoryModal from "./HistoryModal.js";

export default function PreviewArea({
  setCat,
  cat,
  history,
  catSize,
  setCatSize,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [xaxis, setXaxis] = useState(0);
  const [yaxis, setyaxis] = useState(0);

  useEffect(() => {
    setCat(document.querySelector(".cat"));
  }, []);

  useEffect(() => {
    handleSizeChange();
  }, [catSize]);

  function handleSizeChange() {
    cat && (cat.style.width = "50px !important");
    console.log("first");
  }

  function handleReset() {
    if (cat) {
      setXaxis(0);
      setyaxis(0);
      setCatSize("medium");
    }
  }

  function handleForm(e) {
    e.preventDefault();

    // handleXYAxis(xaxis, yaxis, catSize);

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
    <div className="h-full overflow-y-auto pr-2 preview-main-container">
      <div className="flex flex-col ">
        <div className="border relative bg-white preview-action-container cat-container">
          <div
            style={{ width: "fit-content" }}
            className="cat w-fit transition-all ease-linear duration-300"
          >
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
          <Box display={"flex"} justifyContent={"center"} mt={"2rem"}>
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
              >
                <FaHistory /> <Text mb={"3px"}>History</Text>
              </Button>
            </Tooltip>
          </Box>
        </div>
        <div>
          <HistoryModal
            history={history}
            isOpen={isOpen}
            onClose={onClose}
            onOpen={onOpen}
          />
        </div>
      </div>
    </div>
  );
}
