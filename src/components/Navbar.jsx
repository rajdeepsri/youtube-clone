import { Stack } from "@mui/material";
import { Link } from "react-router-dom";

import SearchBar from "./SearchBar";
import Lottie from "lottie-react";
import animationData from "../lotties/yt-logo.json";

const Navbar = () => (
  <Stack
    direction="row"
    alignItems="center"
    px={{ xs: "0.6rem", sm: "1.5rem" }}
    py={1.5}
    sx={{
      position: "sticky",
      zIndex: "99",
      background: "#000",
      top: 0,
      justifyContent: { xs: "space-between", sm: "flex-start" },
    }}
    style={{
      background: `linear-gradient(180deg, rgba(43,43,43,1) 0%, rgba(0,0,0,1) 75%)`,
    }}
  >
    <Link to="/" style={{ display: "flex", alignItems: "center" }}>
      {/* <img src={logo} alt="logo" height={45} /> */}
      <Lottie
        speed={0.5}
        animationData={animationData}
        style={{
          height: "50px",
        }}
      />
    </Link>
    <Stack sx={{ mx: { xs: "none", sm: "auto" } }}>
      <SearchBar />
    </Stack>
  </Stack>
);

export default Navbar;
