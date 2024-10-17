import { useSelector } from "react-redux";
import Components from "./Components/Components";
import Filter from "./Components/DashBoard/Component/MainPage/Headers/Filter/Filter";

function App() {
  const { showDialog } = useSelector((state) => state.admissionSlice);
  return (
    <div className={`${showDialog && "dim"}`}>
      <Components />
    </div>
  );
}

export default App;
