import { Menu } from "antd";

import { MoveToSearch } from "@/application/navbar/routes/moveToSearch";
import { MoveToBill } from "@/application/navbar/routes/moveToBill";

import { NavbarButton } from "@/ui/navbar/button/navbarButton";
import { CreateTravelDrawer } from "@/ui/navbar/drawer/createTravelDrawer";

export const InnerMenu = () => {
  return(
    <>
      <Menu.Item><CreateTravelDrawer /></Menu.Item>
      <Menu.Item><NavbarButton name="일정조회" style={{width: '100px'}} onClick={MoveToSearch} /></Menu.Item>
      <Menu.Item><NavbarButton name="여행경비" style={{width: '100px'}} onClick={MoveToBill}/></Menu.Item>
    </>
  );
}