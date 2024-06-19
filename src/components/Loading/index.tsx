import React from "react";
import Lottie from "lottie-react";
import loadingAnimation from "./animation.json";

type LoadingPropType = {};

const Loading: React.FC<LoadingPropType> = () => {
  return <Lottie animationData={loadingAnimation} loop={true} />;
};

export default Loading;
