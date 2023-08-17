import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { faker } from "@faker-js/faker";

console.log(faker);
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
  const [script, setScript] = useState("// 5\nname: name.firstName");
  const [generate, setGenerate] = useState([]);
  const [blocks, setBlocks] = useState([]);

  const onRun = () => {
    try {
      const res = processScript();

      if (res) {
        const { total, props } = res;

        let newBlocks = [];

        Array.from({ length: total }).forEach((_) => {
          const block = {};

          props.forEach((prop) => {
            const paths = prop.value.split(".");

            const func = faker[paths[0]][paths[1]];

            if (func) {
              block[prop.key] = func();
            }
          });

          newBlocks.push(block);
        });

        setBlocks(newBlocks);
        console.log(newBlocks);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const firstRegex = /\/\/\s(\d)/;
  const propRegex = /(\w+)\:(.+)/;

  const processScript = () => {
    const splitted = script.split("\n");

    const firstLine = splitted[0];

    const matchLine = firstLine.match(firstRegex);

    if (matchLine) {
      const total = Number(matchLine[1]);
      const props = [];

      splitted.slice(1).forEach((item) => {
        const matchItem = item.match(propRegex);

        if (matchItem) {
          props.push({
            key: matchItem[1].trim(),
            value: matchItem[2].trim(),
          });
        }
      });

      return {
        total,
        props,
      };
    } else {
      return false;
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
      <div className="mt-8 flex flex-col gap-4">
        {blocks.map((block, blockIndex) => (
          <div key={blockIndex} className="flex flex-col gap-2 py-1">
            {Object.keys(block).map((item) => (
              <div key={item} className="flex items-center gap-4">
                <div className="">{item}</div>
                <input
                  value={block[item]}
                  className="w-full p-2 bg-slate-100 rounded-md"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
