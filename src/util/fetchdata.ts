import axios from "axios";

export default function fetchRoomdata(id: string) {
    return axios.get("http://localhost:3000/api/searchroom", {
      params: {
        id: id
      }
    })
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
       console.error(error);
       throw error;
    });
}

export function fetchGenerateId() {
  return axios.get("http://localhost:3000/api/generateid")
  .then((response) => {
      return response.data;
  })
  .catch((error) => {
     console.error(error);
     throw error;
  });
}