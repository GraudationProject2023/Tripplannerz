export const createTripTableFirstRow = [
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
        )
    },
    {
        title: '2) 여행 제목',
        dataIndex: 'title',
        width: 200, 
        render: () => (
        <Form.Item label="여행 제목" name="title" style={{ display: 'flex', alignItems: 'center' }}>
          <Input style={{marginLeft: '10%', width: '200px'}} onChange={(e) => setTitle(e.target.value)} />
        </Form.Item>
        ), 
    },
    {
        title: '3) 모집 인원',
        dataIndex: 'capacity',
        width: 200, 
        render: () => (
          <Form.Item label={`모집 인원 ${Math.ceil(memberCapacity / 10)}명`} name="capcity">
            <Slider onChange={(e) => setMemberCapacity(e)} />
          </Form.Item>
        ),
    },
]

export const createTripTableSecondRow = [
    {
        title: '4) 모집 마감 날짜',
        dataIndex: 'deadlineDate',
        width: 100,
        render: () => (
          <Form.Item label="모집 마감 날짜">
            <DatePicker onChange={(date, dateString) => setDate(dateString)} />
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
]