
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Dashboard = () => {
    return (
        <section className="flex gap-10 ">
            
            {/* Sidebar */}
            <div className=" w-[14%] hidden lg:flex flex-col sticky top-0 h-screen overflow-auto">
                <Sidebar />
            </div>

            {/* Content Section */}
            <div className="w-[85%] min-h-screen mx-auto">
                <Outlet />
            </div>

        </section>
    );
};

export default Dashboard;
