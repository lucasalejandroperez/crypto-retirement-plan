import { PageContainer } from '../../../../components/PageContainer/PageContainer';
import { MemberCard } from '../../components/MemberCard/MemberCard';
import lucasImg from '../../../../assets/team/lucas.jpg';
import christianImg from '../../../../assets/team/christian.jpg';

import './styles.scss';

export const Team = () => {
  return (
    <PageContainer>
      <div className="team">
        <h1>Team</h1>
        <div className="team-container">
          <MemberCard>
            <div className="content">
              <h3>Lucas Perez</h3>
              <img src={lucasImg} alt="Lucas Perez" />
              <p>
                {`Software Developer for more than 10 years, with experience in different technologies.
                  Currently immersed into full stack web development with React and NodeJS. Passionate of cryptocurrencies and blockchain.`}
              </p>
              <div>
                Cofounder of{' '}
                <a href="https://valoneta.com" target="_blank" rel="noreferrer">
                  valoneta.com
                </a>
                .
              </div>
              <div>Author of the book {`"Adelántese y descubra el mundo cripto."`}</div>
            </div>
          </MemberCard>
          <MemberCard>
            <div className="content">
              <h3>Christian Perez</h3>
              <img src={christianImg} alt="Christian Perez" />
              <p>{`FullStack Software Developer for more than 10 years in multiple technologies, such as React, NodeJS. Master in Blockchain Engineering.`}</p>
              <div>
                Master in{' '}
                <a
                  href="https://ebis.certifiedme.eu/c4/polygon/certificate.php?sca=0xb0f0d0261001016fbb32d8c8214af445a9eae9d7&loc=VKUPSKVFKF&ed=CTDTzyJ7bTCXke8aFKoHzoDT67H0vouZ-VxbVAUZehpx1A4VR&pd=0&tc=0xd36425904165e12c728b0d65cead7c7fb8fb6d58dae7ddce495f1c89de1dfed7"
                  target="_blank"
                  rel="noreferrer"
                >
                  Blockchain Engineering
                </a>
                .
              </div>
              <div>
                Cofounder of{' '}
                <a href="https://valoneta.com" target="_blank" rel="noreferrer">
                  valoneta.com
                </a>
                .
              </div>
              <div>Author of the book {`"Adelántese y descubra el mundo cripto."`}</div>
            </div>
          </MemberCard>
        </div>
      </div>
    </PageContainer>
  );
};
