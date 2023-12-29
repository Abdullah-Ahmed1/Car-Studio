import { atom } from "jotai";
import { OrbitControlsProps } from "@react-three/drei";

export const RotationCameraAtom = atom<OrbitControlsProps | null>(null);
