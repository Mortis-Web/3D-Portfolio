import { Html, useProgress } from "@react-three/drei";

const CanvasLoader = () => {
  const { progress } = useProgress();
  return (
    <Html
      as="div"
      center
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        flexDirection: "column",
      }}
    >
      <span className="canvas-loader">
        <p
          style={{
            fontSize: 14,
            color: "#f1f1f1",
            fontWeight: 800,
            marginTop: 40,
          }}
        >
          {progress !== 0 ? `${progress.toFixed(2)}%` : "Loading..."}
        </p>
      </span>
    </Html>
  );
};

export default CanvasLoader;
