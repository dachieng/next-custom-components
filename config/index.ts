import axios from "axios";

export const getConfig = () => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1NDhmYzUwNS1iYWI4LTQ2ZTgtOTU0ZC03ZjFmYTRmZmE5MTciLCJyb2xlIjoiRU1QTE9ZRVIiLCJ0eXBlIjoiTUFOQUdFUiIsInN0YXR1cyI6IkFDVElWRSIsImFjY2Vzc19zY29wZSI6e30sInR5cCI6IkJlYXJlciIsImF1ZCI6Im5vcm1hbCBhY2NvdW50IiwiaWF0IjoxNzE2ODgwNjY4LCJleHAiOjE3MTY4ODc4Njh9.NxTfvp9nJSs10tpTjp7l8fRxb1EHLqmhGOcemwcBy58'
  
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