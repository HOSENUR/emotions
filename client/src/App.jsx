import { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";

export default function App() {
  const [text, setText] = useState("");
  const [data, setData] = useState("");
  useEffect(() => {
    const clear = setTimeout(() => {
      if (text.length > 0) {
        console.log("run")
        Axios.post("https://emotions-server.herokuapp.com/popsicle", {
          text: text.toLowerCase(),
        }).then((res) => {
          setData(res.data.res);
        });
      }
    }, 1000);

    return () => clearInterval(clear);
  }, [text]);
  return (
    <div className="font-patrick sm:text-lg md:text-3xl flex items-center justify-center h-screen bg-black">
      <div>
        <div className="my-4">
          <label htmlFor="comment" className="block  text-white">
            Write Some Text 📝
          </label>
          <div className="mt-1">
            <textarea
              name="comment"
              id="comment"
              className="shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 block  sm:text-lg  md:text-3xl border-gray-300 rounded-md"
              onChange={(e) => setText(e.target.value)}
            />
          </div>
        </div>
        <div className="my-4">
          <label htmlFor="comment" className="block  text-white">
            To Emoji ✨
          </label>
          <div className="mt-1">
            <textarea
              name="comment"
              id="comment"
              className="shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 block  sm:text-lg md:text-3xl border-gray-300 rounded-md"
              defaultValue={data}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
