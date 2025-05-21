import React from "react";
import { Scatter, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
} from "chart.js";

ChartJS.register(
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale
);

const ChartsComponent = ({ songs }) => {
  // Scatter chart for danceability
  const scatterData = {
    datasets: [
      {
        label: "Danceability",
        data: songs.map((song) => ({
          x: song.danceability,
          y: song.title, // Assuming `name` is the song title
        })),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  // Histogram for song duration
  const durationData = {
    labels: songs.map((song, _id) => `Song ${_id + 1}`),
    datasets: [
      {
        label: "Duration (seconds)",
        data: songs.map((song) => song.duration_ms),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };

  // Bar chart for acoustics and tempo
  const barData = {
    labels: songs.map((song) => song.title),
    datasets: [
      {
        label: "Acoustics",
        data: songs.map((song) => song.acousticness),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
      {
        label: "Tempo",
        data: songs.map((song) => song.tempo),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  return (
    <div>
      <h2>Scatter Chart: Danceability</h2>
      <Scatter data={scatterData} />

      <h2>Histogram: Song Duration</h2>
      <Bar
        data={durationData}
        options={{
          indexAxis: "y", // Makes the bar chart horizontal
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
          },
          scales: {
            x: {
              beginAtZero: true,
            },
          },
        }}
        height={400} // Adjust height
        width={800} // Adjust width
      />

      <h2>Bar Chart: Acoustics and Tempo</h2>
      <Bar data={barData} />
    </div>
  );
};

export default ChartsComponent;
