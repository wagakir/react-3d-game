import React from "react";
import BasicScene from "../BasicScene";
import styles from "./BabylonCanvas.module.css";
const BabylonCanvas: React.FC = () => {
  const babylonCanvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = babylonCanvasRef.current;
    if (canvas) {
      new BasicScene(canvas);
    }
  }, []);
  return (
    <>
      <canvas ref={babylonCanvasRef} className={styles.canvas}></canvas>
    </>
  );
};

export default BabylonCanvas;
