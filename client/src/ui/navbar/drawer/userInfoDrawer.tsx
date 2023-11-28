import {Button, Col, Drawer, Table} from 'antd';
import { UserOutlined } from "@ant-design/icons"

export const UserInfoDrawer = ({onClick, onClose, visible}) => {
    return(
        <>
         <UserOutlined style={{width: '100px', justifyContent: 'center'}} />
          <Drawer title="사용자 정보" onClose={onClose} visible={visible}>
            <Table>
            <Col title="이름" key="name" />
            <Col title="성별" key="gender" />
            <Col title="이메일" key="email" />
            <Col title="선호도" key="rank" />
            </Table>
            <hr />
          <Button style={{ width: '330px', borderColor: 'black'}}>마이페이지</Button>
          <br />
          <br />
          <Button style={{ width: '330px', borderColor: 'black'}}>로그아웃</Button>
          </Drawer>
        </>
    )
}