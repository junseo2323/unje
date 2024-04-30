import axios from "axios";

export default function fetchRoomdata(id: string) {
    return axios.get(process.env.NEXT_PUBLIC_API_TEST+"/api/searchroom", {
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
  return axios.get(process.env.NEXT_PUBLIC_API_TEST+"/api/generateid")
  .then((response) => {
      return response.data;
  })
  .catch((error) => {
     console.error(error);
     throw error;
  });
}