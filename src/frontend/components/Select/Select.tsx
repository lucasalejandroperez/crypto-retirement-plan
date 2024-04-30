import React from 'react';
import './styles.scss';

type Props = React.ComponentProps<'select'>;

export const Select = ({ children, ...rest }: Props) => {
  return (
    <div>
      <select className="select" {...rest}>
        {children}
      </select>
    </div>
  );
};
