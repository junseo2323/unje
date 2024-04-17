import { Dragcal } from "@/components/Dragcal";
import axios from 'axios';

export default function Home() {
  function fetchData(id: string) {
   
    axios.get("http://localhost:3000/api/searchroom", { id: id })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  

  fetchData("3DRXU1");
  
  return (
    <main>
      <Dragcal />
    </main>
  );
}
