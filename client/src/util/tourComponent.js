import React, { useRef, useState } from 'react';
import { EllipsisOutlined } from '@ant-design/icons';
import { Button, Tour } from 'antd';

export const TourComponent = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  const [open, setOpen] = useState(false);

  const steps = [
    {
      title: '여행 생성',
      description: '동행할 여행을 생성합니다.',
      target: () => ref1.current,
    },
    {
      title: '여행 조회',
      description: '다른 사람들이 생성한 여행들을 조회할 수 있습니다.',
      target: () => ref2.current,
    },
    {
      title: 'Other Actions',
      description: 'Click to see other actions.',
      target: () => ref3.current,
    },
  ];

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        TripPlannerz
      </Button>
      {open === true ? (
        <>
        <Button ref={ref1}>
            여행 생성
        </Button>
        <Button ref={ref2}>
            여행 조회
        </Button>
        <Button ref={ref3} icon={<EllipsisOutlined />} />
       </>
       ) :""}
      <Tour open={open} target={null} mask={false} onClose={() => setOpen(false)} steps={steps} />
    </>
  );
};
