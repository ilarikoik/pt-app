import { Box, AppBar, Tabs, Tab } from "@mui/material";
import { useState } from "react";
import Asiakkaat from "./Asiakkaat";
import Tunnit from "./Tunnit";
import "../index.css";

export default function TabsMui() {
  const [tab, setTab] = useState(0);

  return (
    <div>
      <Box>
        <AppBar position="relative" color="warning">
          <Tabs
            value={tab}
            onChange={(e, newVal) => setTab(newVal)}
            variant="fullWidth"
            centered
            textColor="inherit"
          >
            <Tab
              label="Kaikki Asiakkaat"
              style={{ fontSize: "20px", backgroundColor: "orange" }}
            ></Tab>
            <Tab label="tulevat Tunnit" style={{ fontSize: "20px" }}></Tab>
          </Tabs>
        </AppBar>
        {tab === 0 && <Asiakkaat></Asiakkaat>}
        {tab === 1 && <Tunnit></Tunnit>}
      </Box>
    </div>
  );
}
