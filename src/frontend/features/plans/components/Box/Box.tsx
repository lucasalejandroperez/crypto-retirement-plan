import React from 'react';
import { IconBox } from '../../../../components/box/IconBox/IconBox';
import { LineDivision } from '../../../../components/LineDivison/LineDivision';

import './styles.scss';

type Props = {
  children: React.ReactNode;
  title: string;
} & ({ image?: any; icon?: never } | { image?: never; icon?: React.ReactNode });

export const Box = ({ children, image, icon, title }: Props) => {
  return (
    <div className="box">
      <section>
        <IconBox image={image} icon={icon} />
        <h1>{title}</h1>
        <LineDivision />
        <div className="content">{children}</div>
      </section>
    </div>
  );
};
