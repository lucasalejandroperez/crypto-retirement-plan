import React from 'react';

import './styles.scss';

interface Props {
  children: React.ReactNode;
}

export const PageContainer = ({ children }: Props) => {
  return <div className="pageContainer">{children}</div>;
};
