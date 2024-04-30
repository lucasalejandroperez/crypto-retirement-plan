import React from 'react';

import './styles.scss';
type Props = React.ComponentProps<'button'>;

export const SecondaryButton = ({ children, ...rest }: Props) => {
  return (
    <div>
      <button className="secondary-button" {...rest}>
        {children}
      </button>
    </div>
  );
};
