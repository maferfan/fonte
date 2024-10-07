import { Popular } from "../../components/Popular/Popular";
import { Navbar } from "../../components/Navbar/Navbar";
import { Sidebar } from "../../components/Sidebar/Sidebar";


export const Template = () => {
  
  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <Popular />
      </div>
    </div>
  );
};
