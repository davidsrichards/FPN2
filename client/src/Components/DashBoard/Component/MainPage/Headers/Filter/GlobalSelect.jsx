import { useEffect } from "react";

function GlobalSelect({ action, options, state, handlechange}) {

  return (
    <select
    value={state}
    onChange={handlechange}
      name="option"
      id=""
      className="mt-1 block  text-base border-gray-500  focus:ring-indigo-500 sm:text-sm outline-none sha-dow w-full p-2 rounded-full appearance-auto"
    >
      <option value="" disabled  hidden>{action}</option>
      {options?.map((op, i) =>(
          <option value={op.name} key={i}  name="option">{op?.name}</option>
        ))}
    
      

    </select>
  );
}

export default GlobalSelect;
