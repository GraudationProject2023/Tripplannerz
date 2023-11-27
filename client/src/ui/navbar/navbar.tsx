import {useState, useEffect, useRef} from 'react';
import { Menu, Button, Drawer, Form, Cascader, Table, Input, Col } from 'antd';
import { BellOutlined, UserOutlined } from '@ant-design/icons';

import { MoveToMain } from '@/application/navbar/routes/moveToMain';

import styles from '@/ui/navbar/navbar.module.css';
import { NavbarButton } from '@/ui/navbar/button/navbarButton';
import { InnerMenu } from '@/ui/navbar/innerMenu/innerMenu';

function Navbar() {
    return(
        <Menu mode="horizontal" theme="light" className={styles.navbarContainer}>
        <Menu.Item><NavbarButton name='TripPlannerz' style={{width: '200px'}} onClick={MoveToMain} /></Menu.Item>
        <Menu.Item>
          <NavbarButton name='여행 계획' style={{width: '200px'}} onClick={toggleTravelButton} />
          {travelButton && <InnerMenu /> }
        </Menu.Item>
        <Menu.Item>
            <Input 
              style={{width: '400px', textAlign:'center'}} 
              value={searchTerm} 
              placeholder="여행 일정을 검색하세요"
              onChange={handleChange}
              onKeyPress={(event) => 
              handleSearch(navigate, event, searchTerm)}
             />
        </Menu.Item>
        <Menu.Item>
            <BellOutlined 
              style={{width: '100px', justifyContent: 'center'}}  
              onClick={handleOpenNotice}
            /> 
            <Drawer
             title="알림"
             onClose={handleCloseNotice}
             visible={noticeOpen}
            >
            <h5>알림: {messages.length}개</h5>
            <hr />
            {messages.map((text, index) => (<>
              <li key={text}>
                <Button>
                  {text}
                </Button>
              </li>
              <br />
              </>
            ))}
            </Drawer>
        </Menu.Item>
        <Menu.Item>
          <UserOutlined style={{width: '100px', justifyContent: 'center'}} onClick={openMyPage} />
          <Drawer
            title="사용자 정보"
            onClose={closeMypage}
            visible={esOpen}
          >
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
        </Menu.Item>
      </Menu>
    )
}

export default Navbar