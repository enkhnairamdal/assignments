import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
axios.interceptors.request.use((config) => {
  console.log("Request sent to: ", config.url);
  return config;
});
function App() {
  const [name, setName] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8800/categories").then((res) => {
      const { data, status } = res;
      if (status === 200) {
        setName(data);
      } else {
        alert(`Aldaa garlaa: ${status}`);
      }
    });
  }, []);
  return (
    <>
      {name.map((listItem) => (
        <div>
          {listItem.name}
          <img src={listItem.Image}></img>
          {listItem.Text}
        </div>
      ))}
    </>
  );
}

export default App;
