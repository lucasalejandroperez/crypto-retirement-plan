import React from 'react';
import './styles.scss';

type Props = React.ComponentProps<'button'>;

export const PrimaryButton = ({ children, ...rest }: Props) => {
  return (
    <div>
      <button className="primary-button" {...rest}>
        <div>{children}</div>
      </button>
    </div>
  );
};
