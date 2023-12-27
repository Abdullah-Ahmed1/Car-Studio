import { atom } from "jotai";
import { PerspectiveCamera, OrthographicCamera } from "three";
export const CameraAtom = atom<PerspectiveCamera | OrthographicCamera | null>(null);
