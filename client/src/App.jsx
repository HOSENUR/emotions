import { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";

export default function App() {
  const [text, setText] = useState("");
  const [data, setData] = useState("");
  useEffect(() => {
    const clear = setTimeout(() => {
      if (text.length > 0) {
        setData("Processing ⌛")
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
    <div className="min-h-screen bg-black font-patrick">
      <div className="bg-rose-500 w-full text-center "><a href="https://github.com/HOSENUR/emotions"> Star ✨ me on GitHub</a></div>
      <div className="h-5/6 my-2  w-full flex-col   flex items-center justify-center  ">
           <label htmlFor="comment" className="block  text-white">
          Write Some Text 📝
        </label>
        <textarea
          className="m-2 p-2 w-10/12 md:w-8/12 focus:ring-indigo-500 focus:border-indigo-500  rounded"
          name=""
          id=""
          cols="30"
          onChange={(e) => setText(e.target.value)}
          rows="10" />
        <label htmlFor="comment" className="block  text-white">
          To Emoji ✨
        </label>
        <textarea 
        value={data} 
        onChange={(e) => setData(e.target.value)} 
        className="m-2 p-2 w-10/12 md:w-8/12 focus:ring-indigo-500 focus:border-indigo-500 rounded" name="comment" id="comment" cols="30" rows="10" />

      </div>
      <div className="text-center text-lg text-white ">Built with ♡ & TensorFlow by <a className="text-rose-400" href="https://nur.codes">hosenur</a> </div>
    </div>
    // <div className="font-patrick sm:text-lg md:text-3xl flex items-center justify-center h-screen bg-black">
    //   <div>
    //     <div className="my-4">
    //       <label htmlFor="comment" className="block  text-white">
    //         Write Some Text 📝
    //       </label>
    //       <div className="mt-1">
    //         <textarea
    //           name="comment"
    //           id="comment"
    //           className="shadow-sm p-2 w-full focus:ring-indigo-500 focus:border-indigo-500 block  sm:text-lg  md:text-3xl border-gray-300 rounded-md"
    //           onChange={(e) => setText(e.target.value)}
    //         />
    //       </div>
    //     </div>
    //     <div className="my-4">
    //       <label htmlFor="comment" className="block  text-white">
    //         To Emoji ✨
    //       </label>
    //       <div className="mt-1">
    //         <textarea
    //           name="comment"
    //           id="comment"
    //           className="shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 block  sm:text-lg md:text-3xl border-gray-300 rounded-md"
    //           defaultValue={data}
    //         />
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
