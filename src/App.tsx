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
  const [value, setValue] = useState<OptionsProps | undefined>(options[0])
  return (
    <>
      <Select options={options} value={value} onChange={(e) => setValue(e)}/>
    </>
  );
}

export default App;
