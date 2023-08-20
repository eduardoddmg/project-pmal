import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Box, Button, ButtonGroup } from "@chakra-ui/react";

export const SignaturePad = () => {
  const signatureCanvasRef = useRef();
  const [color, setColor] = useState("#000000");
  const [eraserMode, setEraserMode] = useState(false);

  const handleColorChange = (newColor) => {
    setColor(newColor);
    setEraserMode(false);
  };

  const handleClear = () => {
    signatureCanvasRef.current.clear();
  };

  const handleToggleEraser = () => {
    setEraserMode(!eraserMode);
  };

  const handleDownload = () => {
    const dataUrl = signatureCanvasRef.current.toDataURL("image/png");
    const anchor = document.createElement("a");
    anchor.href = dataUrl;
    anchor.download = "signature.png";
    anchor.click();
  };

  return (
    <Box border={`2px solid ${color}`} p="4" rounded="md">
      <ButtonGroup mb="2">
        <Button colorScheme="blue" onClick={() => handleColorChange("#000000")}>
          Black
        </Button>
        <Button colorScheme="red" onClick={() => handleColorChange("#FF0000")}>
          Red
        </Button>
        <Button
          colorScheme="green"
          onClick={() => handleColorChange("#00FF00")}
        >
          Green
        </Button>
        <Button colorScheme="blue" onClick={() => handleColorChange("#0000FF")}>
          Blue
        </Button>
      </ButtonGroup>
      <SignatureCanvas
        ref={signatureCanvasRef}
        penColor={color}
        canvasProps={{ width: window.innerWidth, height: 200, className: "signatureCanvas" }}
        onEnd={() => {
          if (eraserMode) {
            signatureCanvasRef.current.clear();
          }
        }}
      />
      <ButtonGroup mt="2">
        <Button onClick={handleClear}>Clear</Button>
        <Button onClick={handleDownload}>Download Signature</Button>
      </ButtonGroup>
    </Box>
  );
};
