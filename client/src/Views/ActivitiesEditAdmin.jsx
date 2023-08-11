import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import NavBar from "../Components/NavBar";
import SideBarAdmin from "../Components/SideBarAdmin";
import ActivitiesAdmin from "../Components/ActivitisAdmin";
import { useParams } from "react-router-dom";
import { getPackageById } from "../Redux/Packages/packagesActions";

function ActivitiesAdminEdit() {
 
    const { id } = useParams();

    const dispatch = useDispatch()

    const tour = useSelector((state) => state.packages.packageDetails);


 useEffect(() => {
    dispatch(getPackageById(id));
  
  }, [id, dispatch]);

  
  return (
    <>
     <div className="bg-red-600">
        <NavBar className="mt-10"/>
      </div>
      <div className=" grid grid-cols-2 max-h-screen overflow-auto justify-center mb-10">
        <div className="flex  overflow-auto">
        <SideBarAdmin className="col-span-1" />
        </div>
        <div >
        <Tabs>
        <TabList className="font-bold text-lg justify-center rounded-xl  bg-red-600 text-white ">
              <Tab>Actividades</Tab>
            </TabList>

           <TabPanel className="fontPoppins col-span-3">


<ActivitiesAdmin tour={tour}/>

           </TabPanel>
           </Tabs>
</div>
</div>
    </>
  );
}

export default ActivitiesAdminEdit;
