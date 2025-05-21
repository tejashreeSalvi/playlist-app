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

        // Dynamically generate columns based on the keys of the first object
        // if (data.length > 0) {
        //   const dynamicColumns = Object.keys(data[0]).map((key) => ({
        //     title: key.toUpperCase(), // Title will be the uppercase version of the key
        //     field: key, // Field will match the key name in the object
        //   }));
        //   console.log(dynamicColumns);
        //   setColumns(dynamicColumns);
        // }
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
