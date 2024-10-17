import { useEffect, useState } from "react";
import Filter from "./Headers/Filter/Filter";
import Headers from "./Headers/Headers";
import Table from "./Headers/Table/Table";
import NavigationBar from "./NavigationBar/NavigationBar";

function MainPage() {
  return (
    <div
      className={`mt-12 flex flex-col items-center justify-center w-full p-2`}
    >
      <Headers />
      <Table />
    </div>
  );
}

export default MainPage;
