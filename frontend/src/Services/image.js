import axios from "axios";

export async function getDestinationImage(destination) {
  try {
    const url = `https://source.unsplash.com/1200x700/?${destination},travel`;

    return url;
  } catch (error) {
    console.log(error);
    return "";
  }
}