import { useState } from 'react';
import Lottie from 'react-lottie-player';
import animationData from './animation.json';

type AddButtonPropTypes = {
  width?: number
  height?: number
  onClick: ()=> void
}
const AnimatedButton: React.FC<AddButtonPropTypes> = ( {onClick, width = 100, height= 100 } ) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    onClick();
    setTimeout(() => setIsClicked(false), 1000); // reset after animation
  };

  return (
    <button onClick={handleClick} className="flex items-center justify-center">
      <Lottie
        loop={true}
        play={!isClicked}
        animationData={animationData}
        style={{ width, height }}
      />
    </button>
  );
};

export default AnimatedButton;
