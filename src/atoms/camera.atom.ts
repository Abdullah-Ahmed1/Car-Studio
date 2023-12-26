import { atom } from "jotai";
import { Camera } from "three";
export const CameraAtom = atom<Camera | null>(null);
