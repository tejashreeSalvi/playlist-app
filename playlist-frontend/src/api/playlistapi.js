import { serverInstance } from "../axios.config";

export async function get_playlist() {
  try {
    return await serverInstance.get("/playlist/songs");
  } catch (error) {
    console.error("Error fetching playlist:", error);
    throw error;
  }
}
