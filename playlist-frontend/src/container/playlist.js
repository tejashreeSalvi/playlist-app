import React, { useEffect, useState } from "react";
import { get_playlist } from "../api/playlistapi";
import CustomTable from "../component/CustomTable";

const PlaylistTable = () => {
  const [tableData, setSongs] = useState([]);
  const [error, setError] = useState(null);

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

  return (
    <div>
      <h1>Song PlayList</h1>
      <CustomTable data={tableData} />
    </div>
  );
};

export default PlaylistTable;
