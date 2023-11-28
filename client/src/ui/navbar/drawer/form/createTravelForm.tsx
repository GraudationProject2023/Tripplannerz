import { useState } from 'react';
import { Button, Cascader, DatePicker, Form, Input, Upload, Table} from 'antd';
import ImgCrop from 'antd-img-crop';
import Slider from 'rc-slider';

import { Trip } from '@/domain/TripList';

import { updateTripInfo } from '@/application/navbar/updateTripInfo';
import { SubmitTripInfoToServer } from '@/application/navbar/submitTripInfoToServer';

import { TripCategoryCascaderOption } from "@/lib/info/tripCategoryCascaderOption";
import { majorCategories, minorCategories, subCategories } from "@/lib/info/tripCatergoryList";


export const CreateTravelForm = () => {

  const [tripInfo, setTripInfo] = useState<Trip>({})

  const handleTripTitleChange = (event) => {setTripInfo((prevInfo) => updateTripInfo(prevInfo, 'title', event.target.value))};
  const handleTripRecuritNumChange = (event) => {setTripInfo((prevInfo) => updateTripInfo(prevInfo, 'recruitNum', event))};
  const handleTripCloseRecruitDateChange = (event) => {setTripInfo((prevInfo) => updateTripInfo(prevInfo, 'closeRecruitDate', event))};

  const createTripTableFirstRow = [
    {
      title: '1) 사진 업로드',
      dataIndex: 'imageUpload',
      width: 200, 
      render: () => (
        <>
        <ImgCrop rotationSlider>
        <Upload
          action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
          listType="picture-card"
          fileList={image}
          onChange={onImageChange}
          onPreview={onImagePreview}
        >
          {image.length < 5 && '+ Upload'}
        </Upload>
        </ImgCrop>
        </>
      ),
    },
    {
      title: '2) 여행 제목',
      dataIndex: 'title',
      width: 200, 
      render: () => (
        <Form.Item label="여행 제목" name="title" style={{ display: 'flex', alignItems: 'center' }}>
          <Input style={{marginLeft: '10%', width: '200px'}} onChange={handleTripTitleChange} />
        </Form.Item>
      ),
    },
    {
      title: '3) 모집 인원',
      dataIndex: 'capacity',
      width: 200, 
      render: () => (
        <Form.Item label={tripInfo.recruitNum ? `모집 인원 ${Math.ceil(tripInfo.recruitNum / 10)}명` : ""} name="capcity">
          <Slider onChange={handleTripRecuritNumChange} />
        </Form.Item>
      ),
    },
  ];

  const createTripTableSecondRow = [
    {
      title: '4) 모집 마감 날짜',
      dataIndex: 'deadlineDate',
      width: 100,
      render: () => (
        <Form.Item label="모집 마감 날짜">
          <DatePicker onChange={(_date, dateString) => handleTripCloseRecruitDateChange(dateString)} />
        </Form.Item>
      ),
    },
    {
      title: '5) 여행 시작 날짜',
      dataIndex: 'startDate',
      width: 100,
      render: () => (
        <Form.Item label="여행 시작 날짜">
          <DatePicker selected={currentMonth} onChange={(date,dateString) => handleCurrentMonthChange(dateString)} placeholderText="가는 날 선택" popperPlacement="bottom-start" />
        </Form.Item>
      ),
    },
    {
      title: '6) 여행 종료 날짜',
      dataIndex: 'endDate',
      width: 100,
      render: () => (
        <Form.Item label="여행 종료 날짜">
          <DatePicker selected={nextMonth} filterDate={disableNextMonthDates} onChange={(date,dateString) => handleNextMonthChange(dateString)} placeholderText="오는 날 선택" popperPlacement="bottom-start" />
        </Form.Item>
      ),
    },
  ];

  const initialData = [{}];

    return(
        <>
        <h5>1. 여행 장소 선택</h5>
        <Form onFinish={SubmitTripInfoToServer}>
        <Cascader onChange={handleCascaderChange} size="large" placeholder="지역을 선택하세요"  options = {TripCategoryCascaderOption(majorCategories, minorCategories, subCategories)}/>
        </Form>
        <hr />
        <h5>2. 여행 정보 입력</h5>
        <br />
        <Form onFinish={SubmitTripInfoToServer}>
        <Table
         columns={createTripTableFirstRow}
         dataSource={initialData}
         bordered
         pagination={false}
         rowKey={(record, index) => index}
        />
        <Table
         columns={createTripTableSecondRow}
         dataSource={initialData}
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