import axios from "axios";
import React from "react";
import { Card } from "./components/card";
import { ToastContainer } from "react-toastify";
import { Form } from "./components/form";
import Header from "./components/header";
function App() {
  const [data, setData] = React.useState([]);

  const getData = () => {
    axios.get("http://localhost:3600/todos").then((res) => {
      setData(res.data);
    });
  };

  React.useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <ToastContainer autoClose={1000} />
      <Header />
      <div className="mt-[20px] flex flex-col justify-center items-center gap-[10px]">
        <Form reFetch={getData} />
        {data.reverse().map((item) => (
          <Card reFetch={getData} key={item.id} {...item} />
        ))}
      </div>
    </>
  );
}

export default App;
