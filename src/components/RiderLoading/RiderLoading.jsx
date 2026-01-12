import Lottie from "react-lottie";
import RiderLoadingAnimation from '../../assets/json/rider.json'

const RiderLoading = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <div className="max-w-sm relative">
        <Lottie
          options={{
            animationData: RiderLoadingAnimation,
            autoplay: true,
            loop: true,
          }}
        ></Lottie>
      </div>
    </div>
  );
};

export default RiderLoading;