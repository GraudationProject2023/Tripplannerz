import {Button, Col, Drawer, Table} from 'antd';
import { UserOutlined } from "@ant-design/icons"

export const UserInfoDrawer = ({onClick, onClose, visible}) => {
    return(
        <>
         <UserOutlined style={{width: '100px', justifyContent: 'center'}} onClick={openMyPage} />
          <Drawer title="사용자 정보" onClose={onClose} visible={visible}>
            <Table dataSource={[{ name, gender, email, rank}]}>
            <Col title="이름" dataIndex="name" key="name" />
            <Col title="성별" dataIndex="gender" key="gender" render={(text) => (text ? text : '없음')} />
            <Col title="이메일" dataIndex="email" key="email" />
            <Col title="선호도" dataIndex="rank" key="rank" />
            </Table>
            <hr />
          <Button
            style={{
              width: '330px',
              borderColor: 'black'
            }}
            onClick={moveToMy}
          >
          마이페이지
          </Button>
          <br />
          <br />
          <Button
            onClick={Logout}
            style={{
              width: '330px',
              borderColor: 'black'
            }}
          >
            로그아웃
          </Button>
          </Drawer>
        </>
    )
}