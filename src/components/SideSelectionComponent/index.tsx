import * as React from "react";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { CameraAtom } from "../../atoms/camera.atom";
import { useAtomValue } from "jotai";
import gsap from "gsap";

export default function SideSelection() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const camera = useAtomValue(CameraAtom);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleFront = () => {
    if (!camera) return;
    gsap.to(camera.position, {
      x: 0,
      y: 0,
      z: 10,
      ease: "Power1.easeInOut",
    });
  };
  const handleBack = () => {
    if (!camera) return;
    gsap.to(camera.position, {
      x: 0,
      y: 0,
      z: -10,
      ease: "Power1.easeInOut",
    });
  };
  const handleLeft = () => {
    if (!camera) return;
    gsap.to(camera.position, {
      x: -10,
      y: 0,
      z: 0,
      duration: 1,
      ease: "Power1.easeInOut",
      paused: false,
    });
  };
  const handleRight = () => {
    if (!camera) return;
    gsap.to(camera.position, {
      x: 10,
      y: 0,
      z: 0,
      duration: 1,
      ease: "Power1.easeInOut",
      paused: false,
    });
  };
  const handleTop = () => {
    if (!camera) return;
    gsap.to(camera.position, {
      x: 0,
      y: 10,
      z: 0,
      duration: 1,
      ease: "Power1.easeInOut",
      paused: false,
    });
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
