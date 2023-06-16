import { Stack } from "@mui/material";
import { categories } from "../utils/constants";

const Sidebar = ({ selectedCategory, setSelectedCategory }) => (
  <Stack
    direction="row"
    sx={{
      overflowY: "auto",
      height: { sx: "auto", md: "90vh" },
      flexDirection: { md: "column" },
    }}
  >
    {categories.map((item) => (
      <button
        key={item.name}
        className="category-btn"
        onClick={() => setSelectedCategory(item.name)}
        style={{
          background: item.name === selectedCategory && "#FC1503",
          color: "white",
          fontWeight: "700",
          whiteSpace: "nowrap",
        }}
      >
        <span
          style={{
            color: item.name === selectedCategory ? "white" : "red",
            marginRight: "0.75rem",
          }}
        >
          {item.icon}
        </span>
        <span
          style={{
            opacity: item.name === selectedCategory ? "1" : "0.75",
            fontFamily: "poppins",
            fontWeight: "500",
          }}
        >
          {item.name}
        </span>
      </button>
    ))}
  </Stack>
);

export default Sidebar;
