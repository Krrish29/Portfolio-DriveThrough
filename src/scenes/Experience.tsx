import { useRef, Suspense } from "react";
import { Physics } from "@react-three/rapier";
import Ground from "../components/world/Ground";
import Road from "../components/world/Road";
import SkyAndLights from "../components/world/SkyAndLights";
import Trees from "../components/world/Trees";
import Lake from "../components/world/Lake";
import Mountains from "../components/world/Mountains";
import StreetLights from "../components/world/StreetLights";
import Boundaries from "../components/world/Boundaries";
import WelcomeArch from "../components/world/WelcomeArch";
import GasStation from "../components/world/GasStation";
import ParkedCars from "../components/world/ParkedCars";
import Pedestrians from "../components/world/Pedestrians";
import Cones from "../components/world/Cones";
import SkidMarks from "../components/world/SkidMarks";
import Coins from "../components/world/Coins";
import Buildings from "../components/buildings/Buildings";
import Car, { type CarHandle } from "../components/car/Car";
import CameraRig from "../components/car/CameraRig";
import IntroFlythrough from "../components/car/IntroFlythrough";
import { useProximity } from "../hooks/useProximity";

function SceneContent() {
  const carHandle = useRef<CarHandle>(null);
  useProximity(carHandle);

  return (
    <>
      <SkyAndLights />

      <Physics gravity={[0, -22, 0]}>
        <Ground />
        <Boundaries />
        <Buildings />
        <Trees />
        <WelcomeArch />
        <GasStation />
        <ParkedCars />
        <Pedestrians />
        <Car ref={carHandle} />
        <Coins />
      </Physics>

      <Road />
      <SkidMarks />
      <Cones />
      <Lake />
      <Mountains />
      <StreetLights />

      <IntroFlythrough />
      <CameraRig carHandle={carHandle} />
    </>
  );
}

export default function Experience() {
  return (
    <Suspense fallback={null}>
      <SceneContent />
    </Suspense>
  );
}
