import axios from "axios";

export const getConfig = () => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1NDhmYzUwNS1iYWI4LTQ2ZTgtOTU0ZC03ZjFmYTRmZmE5MTciLCJyb2xlIjoiRU1QTE9ZRVIiLCJ0eXBlIjoiTUFOQUdFUiIsInN0YXR1cyI6IkFDVElWRSIsImFjY2Vzc19zY29wZSI6e30sInR5cCI6IkJlYXJlciIsImF1ZCI6Im5vcm1hbCBhY2NvdW50IiwiaWF0IjoxNzE2ODg4NjY3LCJleHAiOjE3MTY4OTU4Njd9.HoB29QLkpysB8eqWDlhufdlPWFACx541FjFneaM-_X4'
  
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : null,
    },
  };
};

export const axionInstance = axios.create({
  baseURL: 'http://localhost:3000/api/v2',
});