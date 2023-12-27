import { atom } from "jotai";
import { PerspectiveCamera } from "three";
export const CameraAtom = atom<PerspectiveCamera | null>(null);
