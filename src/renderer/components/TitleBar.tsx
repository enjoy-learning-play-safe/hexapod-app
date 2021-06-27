import React from 'react';

interface Props {}

const TitleBar = (props: Props) => {
  return (
    <div
      className="electron-draggable"
      style={{
        width: '100%',
        height: 40,
        backgroundColor: 'cyan',
      }}
    >
      titlebar goes here
    </div>
  );
};

export default TitleBar;
