import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { faker as fakergen } from "@faker-js/faker";

console.log(fakergen);
// Object.keys(faker).forEach((item) => {
//   const category = faker[item];

//   if (!!category.faker) {
//     const funcKeys = Object.keys(category);
//     funcKeys.forEach((funcKey) => {
//       console.log(funcKey, typeof category[funcKey]);
//     });
//   }
// });

function App() {
  const [count, setCount] = useState(0);
  const [script, setScript] = useState("");
  const [generate, setGenerate] = useState([]);

  const onRun = () => {
    try {
      let faker = fakergen;
      const repeat = (count, cb) => {
        const res = [];

        Array.from({ length: count }).forEach((_, index) => {
          const cbRes = cb(index);
          res.push(cbRes);
        });

        setGenerate(res);
      };

      const setInputs = (arr) => {
        setGenerate(arr);
      };

      const res = eval(script);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <div className="">
        <textarea
          value={script}
          onChange={(e) => setScript(e.target.value)}
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder="Write script..."
          className="w-full bg-slate-100 p-3"
        ></textarea>
      </div>
      <button
        onClick={onRun}
        className="bg-orange-600 text-white px-5 py-2 rounded-md mt-2"
      >
        Run
      </button>
      <div className="mt-8 flex flex-col gap-2">
        {generate.map((line, lineIndex) => (
          <div key={lineIndex} className="">
            <input
              value={line}
              className="w-full p-2 bg-slate-100 rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
