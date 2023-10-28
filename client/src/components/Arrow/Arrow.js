import React from 'react';

const CustomArrow = ({ onClick, direction }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '1px',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        fontSize: '24px',
        color: '#333',
        zIndex: 1,
        ...(direction === 'next' ? { right: '10px' } : { left: '10px' }),
      }}
      onClick={onClick}
    >
      {direction === 'next' ? '→' : '←'}
    </div>
  );
};

export default CustomArrow;
