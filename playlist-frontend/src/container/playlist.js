import React, { useEffect, useState } from "react";
import { Tabs, Tab, Box, Typography } from '@mui/material';
import { get_playlist } from "../api/playlistapi";
import CustomTable from "../component/CustomTable";
import ChartsComponent from "../component/ChartsComponent";

const PlaylistTable = () => {
  const [tableData, setSongs] = useState([]);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    const getSongs = async () => {
      try {
        const response = await get_playlist();
        const data = response?.data?.items;
        console.log("Data:", data);
        setSongs(data);

    
      } catch (err) {
        setError(err.message);
      }
    };

    getSongs();
  }, []);


  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Tabs value={selectedTab} onChange={handleTabChange}>
        <Tab label="Table View" />
        <Tab label="Chart View" />
      </Tabs>

      {selectedTab === 0 && <CustomTable data={tableData} />}
      {selectedTab === 1 && <ChartsComponent songs={tableData} />}
    </Box>
  );
};

export default PlaylistTable;
