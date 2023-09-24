import { useState } from "react";
import { Select } from "./components/Select";

type OptionsProps = {
  label: string;
  value: string | number;
}

const options = [
  { label: "First", value: 1 },
  { label: "Second", value: 2 },
  { label: "Third", value: 3 },
  { label: "Fourth", value: 4 },
  { label: "Fifth", value: 5 },
];

function App() {
  const [value1, setValue1] = useState<OptionsProps[]>([options[0]])
  const [value2, setValue2] = useState<OptionsProps | undefined>(options[0])
  return (
    <>
      <Select multiple options={options} value={value1} onChange={(e) => setValue1(e)}/>
      <br/>
      <Select options={options} value={value2} onChange={(e) => setValue2(e)}/>
    </>
  );
}

export default App;
