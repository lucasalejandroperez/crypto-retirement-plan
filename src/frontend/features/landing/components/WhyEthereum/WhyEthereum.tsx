import { MdSecurity } from 'react-icons/md';
import { SiHiveBlockchain } from 'react-icons/si';
import { IoIosPeople } from 'react-icons/io';
import { GradientLine } from '../../../../components/GradientLine/GradientLine';
import { Card } from '../Card/Card';

export const WhyEthereum = () => {
  return (
    <section className="why-eth-section">
      <div className="bg" />
      <div className="container">
        <div className="gradient-line-container">
          <GradientLine />
        </div>
        <span className="title">Why Polygon?</span>
        <div className="boxes">
          <Card
            title="SECURITY"
            subtitle="Based on decentralization and cryptography. Decentralization implies that the network is maintained and verified by a network of nodes distributed around the world, making it difficult to manipulate or attack from a single point of failure. Cryptography ensures transaction security and data protection through the use of public and private keys, hash algorithms and digital signatures."
            icon={<MdSecurity size={25} />}
            maxWidth="356px"
            height="424px"
          />
          <Card
            title="STRONG CURRENCY"
            subtitle="MATIC has wide adoption and acceptance in the blockchain industry, making it a commonly traded currency in cryptocurrency markets and used for transactions and payments in various projects on the network. As one of the most popular cryptocurrencies with a wide user base, ETH has high investment potential and has demonstrated an upward trend in the cryptocurrency market in recent years."
            icon={<SiHiveBlockchain size={25} />}
            maxWidth="356px"
            height="424px"
          />
          <Card
            title="THE MOST POPULAR"
            subtitle="It is highly programmable and allows developers to create custom applications and tokens on the network, which has led to the creation of a large number of projects and applications on the network. Polygon has a very active developer community and a large number of companies that are building solutions on the platform. This has led to widespread adoption and use of the network."
            icon={<IoIosPeople size={25} />}
            maxWidth="356px"
            height="424px"
          />
        </div>
      </div>
    </section>
  );
};
