import { Button, Drawer } from "antd"
import { BellOutlined } from "@ant-design/icons"

export const NoticeDrawer = ({onClick, onClose, visible, messages}) => {
    return(
        <>
        <BellOutlined style={{width: '100px', justifyContent: 'center'}} onClick={onClick}/> 
        <Drawer
            title="알림"
            onClose={onClose}
            visible={visible}
        >
        <h5>알림: {messages.length}개</h5>
        <hr />
        {messages.map((text, index) => (
            <>
            <li key={index}>
                <Button>{text}</Button>
            </li>
            <br />
            </>
        ))}
        </Drawer>
        </>
    )
}