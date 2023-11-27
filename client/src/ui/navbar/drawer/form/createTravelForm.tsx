import { Cascader, Button, Form, Table} from 'antd';

import { SubmitTripInfoToServer } from '@/application/navbar/submitTripInfoToServer';
import { TravelCategoryCascaderOption } from "@/lib/info/travelCategoryCascaderOption";
import { majorCategories, minorCategories, subCategories } from "@/lib/info/travelCatergoryList";

export const CreateTravelForm = () => {
    return(
        <>
        <h5>1. 여행 장소 선택</h5>
        <Form onFinish={SubmitTripInfoToServer}>
        <Cascader onChange={handleCascaderChange} size="large" placeholder="지역을 선택하세요"  options = {TravelCategoryCascaderOption(majorCategories, minorCategories, subCategories)}/>
        </Form>
        <hr />
        <h5>2. 여행 정보 입력</h5>
        <br />
        <Form onFinish={SubmitTripInfoToServer}>
        <Table
         columns={columnsRow1}
         dataSource={data}
         bordered
         pagination={false}
         rowKey={(record, index) => index}
        />
        <Table
         columns={columnsRow2}
         dataSource={data}
         bordered
         pagination={false}
         rowKey={(record,index) => index}
        />
        </Form>
        <Form.Item>
          <Button type="primary" htmlType="submit" onClick={SubmitTripInfoToServer}>등록</Button>
        </Form.Item>
        </>
    )
}