import { Input } from 'antd';

export const NavbarInput = ({style, value, placeholder, onChange, onKeyDown }) => {
    return(
        <Input 
            style={style}
            value={value}
            placeholder = {placeholder}
            onChange={onChange}
            onKeyDown={onKeyDown}
        />
    )
}