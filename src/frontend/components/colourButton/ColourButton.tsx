import React from 'react';

import { RightArrow } from '../../assets/colourButton/rightArrow';
import './styles.scss';

type Props = {
  text?: string;
} & React.ComponentProps<"button">

export const ColourButton = ({ text, ...rest }: Props) => {
  return (
    <button className="colour-button" type="button" {...rest}>
      <div className="colour-button-content-container">
        <div>{text}</div>
        <div className="colour-button-icon-container">
          <RightArrow className="colour-button-svg" />
        </div>
      </div>
    </button>
  );
};
