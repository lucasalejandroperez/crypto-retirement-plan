import { ReactNode } from 'react';
import './styles.scss';

interface Props {
  children: ReactNode;
  maxWidth?: string;
  height?: string;
  margin?: string;
}

export const TransparentBox = ({ children, maxWidth = 'initial', height = 'initial', margin = 'initial' }: Props) => {
  return (
    <div className="transparent-box" style={{ maxWidth, height, margin }}>
      {children}
    </div>
  );
};
