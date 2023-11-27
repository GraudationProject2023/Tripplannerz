import { useState } from "react";
import { Drawer } from "antd"

import { NavbarButton } from "@/ui/navbar/button/navbarButton";
import { CreateTravelForm } from "@/ui/navbar/drawer/form/createTravelForm";

export const CreateTravelDrawer = () => {
    
    const [toggleCreateTravelModal, setToggleCreateTravelModal] = useState<boolean>(false);
    
    const handleOpenCreateTravelModal = () => setToggleCreateTravelModal(true);
    const handleCloseCreateTravelModal = () => setToggleCreateTravelModal(false);

    return(
      <>
        <NavbarButton name="일정생성" style={{width: '100px'}} onClick={handleOpenCreateTravelModal} />
        <Drawer title= "여행 생성" style={{width: '100%', height: '620px', overflowY: 'auto'}} placement="top" onClose={handleCloseCreateTravelModal} visible={toggleCreateTravelModal}>
        <CreateTravelForm />
        </Drawer>
    </>
    )
}