import { PageContainer } from '../../../../components/PageContainer/PageContainer';
import './styles.scss';

export const Documentation = () => {
  return (
    <PageContainer>
      <div className="documentation">
        <h1>Documentation</h1>
        <p>
          Welcome to our Crypto Retirement Plan platform, where we offer an innovative solution for investing in your
          future using blockchain technology, specifically on the Polygon network. Our plans are designed to fit
          different needs and investment goals, ensuring that your money is safe and grows over time.
        </p>
        <h2>How Does It Work?</h2>
        <p>
          Our crypto retirement plans are based on smart contracts on the Polygon network, providing a secure and
          transparent way to manage your investments. By choosing one of our plans, you are locking your funds until a
          specific date you decide, with the flexibility to add more funds at any time. Depending on the plan you
          choose, you have the option to designate heirs and, in some cases, offer the possibility of withdrawing funds
          before the maturity date under certain conditions.
        </p>
        <h2>Available Plans</h2>
        <p>
          <strong>Basic:</strong> This plan is ideal for those who wish to lock their money until a desired date. It
          offers the simplicity of adding more funds whenever you want without the possibility of early withdrawal.
        </p>
        <p>
          <strong>Inheritance:</strong> In addition to the features of the Basic plan, the Inheritance plan allows you
          to designate heirs who will be able to access the funds after the maturity date. Its an excellent way to
          ensure that your loved ones are beneficiaries of your investment.
        </p>
        <p>
          <strong>Flexible:</strong>{' '}
          {`The most versatile plan, which includes all the advantages of the Inheritance plan
          with the addition of the 'Proof of Life' option. If proof of life (a mechanism to confirm that the plan holder
          is still alive) is not provided, heirs may opt to withdraw the funds before the maturity date.`}
        </p>
        <h2>Why Polygon?</h2>
        <p>
          <strong>Security:</strong> Decentralization and cryptography are the cornerstones of security on Polygon. The
          network is maintained by globally distributed nodes, making it difficult for attacks or manipulations.
          Cryptography secures transactions and protects data through public and private keys, hash algorithms, and
          digital signatures.
        </p>
        <p>
          <strong>Strong Currency:</strong> Polygon enjoys wide adoption and acceptance in the blockchain industry,
          making it a commonly traded currency in cryptocurrency markets. With an extensive user base and upward trends
          in the market, Polygon represents significant investment potential.
        </p>
        <p>
          <strong>Popularity:</strong> Polygon is highly programmable, allowing developers to create custom applications
          and tokens. This has led to a large number of projects and applications on the network, supported by an active
          developer community and wide business adoption.
        </p>
        <h2>Getting Started</h2>
        <p>
          To start investing in your future with our crypto retirement plans, simply select the plan that best suits
          your needs and follow the instructions to lock your funds. Our platform is intuitive and easy to use, ensuring
          that your investment experience is smooth and secure.
        </p>
      </div>
    </PageContainer>
  );
};
