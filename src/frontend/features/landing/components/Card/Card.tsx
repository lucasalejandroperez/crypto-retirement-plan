import { ReactNode } from 'react';
import { IconBox } from '../../../../components/box/IconBox/IconBox';
import { TransparentBox } from '../../../../components/box/TransparentBox/TransparentBox';
import { SecondaryButton } from '../../../../components/SecondaryButton/SecondaryButton';
import './styles.scss';

type Props = {
  title: string;
  subtitle: string;
  buttonText?: string;
  maxWidth?: string;
  height?: string;
  onClick?: () => void;
} & ({ image?: any; icon?: never } | { image?: never; icon?: ReactNode });

export const Card = ({
  title,
  subtitle,
  image,
  icon,
  buttonText,
  maxWidth = 'initial',
  height = 'initial',
  onClick
}: Props) => {
  return (
    <TransparentBox maxWidth={maxWidth} height={height}>
      <div className="card">
        <IconBox image={image} icon={icon} />
        <span>{title}</span>
        <span>{subtitle}</span>
        {buttonText && (
          <div className="card__button-container">
            <SecondaryButton onClick={onClick}>{buttonText}</SecondaryButton>
          </div>
        )}
      </div>
    </TransparentBox>
  );
};
