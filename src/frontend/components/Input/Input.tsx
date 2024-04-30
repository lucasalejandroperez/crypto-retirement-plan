import React from 'react';
import './styles.scss';

type Props = React.ComponentProps<'input'>;

export const Input = ({ children, ...rest }: Props) => {
  return (
    <div>
      <input className="input" {...rest}>
        {children}
      </input>
    </div>
  );
};
