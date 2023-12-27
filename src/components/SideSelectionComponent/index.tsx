import * as React from "react";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useAtom } from "jotai";
import { SideAtom } from "../../atoms/side.atom";

export default function SideSelection() {
  const [side, setSide] = useAtom(SideAtom);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleFront = () => {};
  const handleBack = () => {};
  const handleLeft = () => {};
  const handleRight = () => {};

  return (
    <div>
      {/* <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Dashboard
      </Button> */}
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
      </Menu>
    </div>
  );
}
