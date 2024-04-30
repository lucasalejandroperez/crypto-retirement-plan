import React from 'react';
import { TransparentBox } from '../../../../components/box/TransparentBox/TransparentBox';

interface Props {
  children: React.ReactNode;
  maxWidth?: string;
  height?: string;
}

export const MemberCard = ({ children, maxWidth, height }: Props) => {
  return (
    <TransparentBox maxWidth={maxWidth} height={height}>
      <div>{children}</div>
    </TransparentBox>
  );
};
