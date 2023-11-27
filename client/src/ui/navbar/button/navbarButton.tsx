import { Button } from 'antd';
import type { NavbarButtonProps } from '@/ui/navbar/button/navbarButton.types';

export const NavbarButton = ({name, style, onClick}: NavbarButtonProps) => {
    return(
        <Button style={style} onClick={onClick}>
          {name}
        </Button>
    )
}