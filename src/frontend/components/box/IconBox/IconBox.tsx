import { ReactNode } from 'react';
import './styles.scss';

type Props = 
  | { image?: any; icon?: never }
  | { image?: never; icon?: ReactNode };


export const IconBox = ({ image, icon }: Props) => {
  return (
    <div className="icon-box">
      {
        image !== undefined 
        ?
        <img src={image} alt="icon image" />
        :
        icon
      }
    </div>
  );
};
