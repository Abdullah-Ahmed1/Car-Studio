import gsap from "gsap";
import * as THREE from "three";
import * as React from "react";
import { useAtomValue } from "jotai";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { RotationCameraAtom } from "../../atoms/rotationCamera.atom";

export default function SideSelection() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const rotationCamera = useAtomValue(RotationCameraAtom);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleFront = () => {
    if (
      rotationCamera &&
      rotationCamera.object &&
      Math.trunc(rotationCamera?.object?.position.x) == 0 &&
      Math.trunc(rotationCamera?.object?.position.y) == 0 &&
      Math.trunc(rotationCamera?.object?.position.z) == -3
    ) {
      const modelTimeLine = gsap.timeline();

      const radius = 3;
      const duration = 0.5; // Adjust the duration as needed

      modelTimeLine.to(rotationCamera?.object?.position, {
        x: radius * Math.cos(THREE.MathUtils.degToRad(0)),
        y: 0,
        z: radius * Math.sin(THREE.MathUtils.degToRad(0)),
        duration,
        ease: "Power0.easeInOut",
      });

      modelTimeLine.to(rotationCamera?.object?.position, {
        x: 4 * Math.cos(THREE.MathUtils.degToRad(90)),
        y: 0,
        z: 4 * Math.sin(THREE.MathUtils.degToRad(90)),
        duration,
        ease: "Power0.easeInOut",
      });
    } else {
      if (rotationCamera && rotationCamera.object)
        gsap.to(rotationCamera?.object?.position, {
          x: 0,
          y: 0,
          z: 4,
          ease: "Power1.easeInOut",
        });
    }
  };
  const handleBack = () => {
    if (!rotationCamera) return;
    if (
      rotationCamera &&
      rotationCamera.object &&
      Math.trunc(rotationCamera?.object?.position.x) == 0 &&
      Math.trunc(rotationCamera?.object?.position.y) == 0 &&
      Math.trunc(rotationCamera?.object?.position.z) == 3
    ) {
      const modelTimeLine = gsap.timeline();

      const radius = 3;
      const duration = 0.5;
      modelTimeLine.to(rotationCamera?.object?.position, {
        x: radius * Math.cos(THREE.MathUtils.degToRad(0)),
        y: 0,
        z: radius * Math.sin(THREE.MathUtils.degToRad(0)),
        duration,
        ease: "Power0.easeInOut",
      });

      modelTimeLine.to(rotationCamera?.object?.position, {
        x: 4 * Math.cos(THREE.MathUtils.degToRad(270)),
        y: 0,
        z: 4 * Math.sin(THREE.MathUtils.degToRad(270)),
        duration,
        ease: "Power0.easeInOut",
      });
    } else if (
      rotationCamera &&
      rotationCamera.object &&
      Math.trunc(rotationCamera?.object?.position.x) == 0 &&
      Math.trunc(rotationCamera?.object?.position.y) == 4 &&
      Math.trunc(rotationCamera?.object?.position.z) == 1
    ) {
      const modelTimeLine = gsap.timeline();

      const radius = 3;
      const duration = 0.5;
      modelTimeLine.to(rotationCamera?.object?.position, {
        x: radius * Math.cos(THREE.MathUtils.degToRad(180)),
        y: 0,
        z: radius * Math.sin(THREE.MathUtils.degToRad(180)),
        duration,
        ease: "Power0.easeInOut",
      });

      modelTimeLine.to(rotationCamera?.object?.position, {
        x: 4 * Math.cos(THREE.MathUtils.degToRad(270)),
        y: 0,
        z: 4 * Math.sin(THREE.MathUtils.degToRad(270)),
        duration,
        ease: "Power0.easeInOut",
      });
    } else {
      if (rotationCamera && rotationCamera.object)
        gsap.to(rotationCamera?.object?.position, {
          x: 0,
          y: 0,
          z: -4,
          ease: "Power1.easeInOut",
        });
    }
  };
  const handleLeft = () => {
    if (
      rotationCamera &&
      rotationCamera.object &&
      Math.trunc(rotationCamera?.object?.position.x) == 3 &&
      Math.trunc(rotationCamera?.object?.position.y) == 0 &&
      Math.trunc(rotationCamera?.object?.position.z) == 0
    ) {
      const modelTimeLine = gsap.timeline();

      const radius = 3;
      const duration = 0.5;
      modelTimeLine.to(rotationCamera?.object?.position, {
        x: radius * Math.cos(THREE.MathUtils.degToRad(90)),
        y: 0,
        z: radius * Math.sin(THREE.MathUtils.degToRad(90)),
        duration,
        ease: "Power0.easeInOut",
      });

      modelTimeLine.to(rotationCamera?.object?.position, {
        x: 4 * Math.cos(THREE.MathUtils.degToRad(180)),
        y: 0,
        z: 4 * Math.sin(THREE.MathUtils.degToRad(180)),
        duration,
        ease: "Power0.easeInOut",
      });
    } else {
      if (rotationCamera && rotationCamera.object)
        gsap.to(rotationCamera?.object?.position, {
          x: -4,
          y: 0,
          z: 0,
          duration: 1,
          ease: "Power1.easeInOut",
          paused: false,
        });
    }
  };
  const handleRight = () => {
    if (
      rotationCamera &&
      rotationCamera.object &&
      Math.trunc(rotationCamera?.object?.position.x) == -3 &&
      Math.trunc(rotationCamera?.object?.position.y) == 0 &&
      Math.trunc(rotationCamera?.object?.position.z) == 0
    ) {
      const modelTimeLine = gsap.timeline();

      const radius = 3;
      const duration = 0.5;
      modelTimeLine.to(rotationCamera?.object?.position, {
        x: radius * Math.cos(THREE.MathUtils.degToRad(90)),
        y: 0,
        z: radius * Math.sin(THREE.MathUtils.degToRad(90)),
        duration,
        ease: "Power0.easeInOut",
      });

      modelTimeLine.to(rotationCamera?.object?.position, {
        x: 4 * Math.cos(THREE.MathUtils.degToRad(0)),
        y: 0,
        z: 4 * Math.sin(THREE.MathUtils.degToRad(0)),
        duration,
        ease: "Power0.easeInOut",
      });
    } else {
      if (rotationCamera && rotationCamera.object)
        gsap.to(rotationCamera?.object?.position, {
          x: 4,
          y: 0,
          z: 0,
          duration: 1,
          ease: "Power1.easeInOut",
          paused: false,
        });
    }
  };
  const handleTop = () => {
    const modelTimeLine = gsap.timeline();
    if (
      rotationCamera &&
      rotationCamera.object &&
      Math.trunc(rotationCamera?.object?.position.x) == 0 &&
      Math.trunc(rotationCamera?.object?.position.y) == 4 &&
      Math.trunc(rotationCamera?.object?.position.z) == 1
    )
      return;
    if (!rotationCamera || !rotationCamera.object) return;
    console.log("reachedddddddd");
    if (
      rotationCamera &&
      rotationCamera.object &&
      Math.trunc(rotationCamera?.object?.position.x) == 0 &&
      Math.trunc(rotationCamera?.object?.position.y) == 0 &&
      Math.trunc(rotationCamera?.object?.position.z) == -3
    ) {
      const modelTimeLine = gsap.timeline();

      const radius = 3;
      const duration = 0.5; // Adjust the duration as needed

      modelTimeLine.to(rotationCamera?.object?.position, {
        x: radius * Math.cos(THREE.MathUtils.degToRad(0)),
        y: 0,
        z: radius * Math.sin(THREE.MathUtils.degToRad(0)),
        duration,
        ease: "Power0.easeInOut",
      });

      modelTimeLine.to(rotationCamera?.object?.position, {
        x: 4 * Math.cos(THREE.MathUtils.degToRad(90)),
        y: 0,
        z: 4 * Math.sin(THREE.MathUtils.degToRad(90)),
        duration,
        ease: "Power0.easeInOut",
      });
      modelTimeLine.to(rotationCamera?.object?.position, {
        x: 0,
        y: 10,
        z: 4,
        duration: 1,
        ease: "Power1.easeInOut",
        paused: false,
      });
    } else {
      modelTimeLine.to(rotationCamera?.object?.position, {
        x: 0,
        y: 0,
        z: 4,
        duration: 1,
        ease: "Power1.easeInOut",
        paused: false,
      });
      modelTimeLine.to(rotationCamera?.object?.position, {
        x: 0,
        y: 10,
        z: 4,
        duration: 1,
        ease: "Power1.easeInOut",
        paused: false,
      });
    }
  };

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <VisibilityIcon style={{ color: "white" }} />
      </IconButton>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleFront}>Front</MenuItem>
        <MenuItem onClick={handleBack}>Back</MenuItem>
        <MenuItem onClick={handleLeft}>Left</MenuItem>
        <MenuItem onClick={handleRight}>Right</MenuItem>
        <MenuItem onClick={handleTop}>Top</MenuItem>
      </Menu>
    </div>
  );
}
