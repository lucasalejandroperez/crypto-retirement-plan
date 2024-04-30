import { PageContainer } from '../../../../components/PageContainer/PageContainer';
import './styles.scss';

export const Faq = () => {
  return (
    <PageContainer>
      <div className="faq">
        <h1>FAQ</h1>
        <h2>What is a Crypto Retirement Plan?</h2>
        <p>
          A Crypto Retirement Plan is an investment solution that leverages blockchain technology to allow users to lock
          funds in cryptocurrency until a specific date, ensuring security and growth potential. These plans are
          designed to cater to various needs and offer options for inheritance and flexibility.
        </p>
        <h2>Why should I choose Polygon for my retirement plan?</h2>
        <p>
          Polygon is one of the most secure, versatile, and globally adopted blockchain platforms. Thanks to its
          decentralized network and use of advanced cryptography, it provides a solid foundation for smart contracts
          that manage crypto retirement plans. Additionally, its currency, MATIC, is one of the most valuable and widely
          accepted cryptocurrencies, ensuring a strong and reliable investment.
        </p>
        <h2>How can I get started with a Crypto Retirement Plan?</h2>
        <p>
          To start, you need to select the type of plan you want (Basic, Inheritance, or Flexible), then, following the
          instructions on our platform, you will lock your funds in the corresponding smart contract. You can add
          additional funds at any time, according to the terms of your specific plan.
        </p>
        <h2>Can I withdraw my funds before the scheduled date?</h2>
        <p>Withdrawal of funds before the scheduled date depends on the type of plan:</p>
        <ul>
          <li>
            <strong>Basic:</strong> Does not allow early withdrawals.
          </li>
          <li>
            <strong>Inheritance:</strong> Does not allow early withdrawals, but designated heirs can withdraw the funds
            after the maturity date.
          </li>
          <li>
            <strong>Flexible:</strong> Allows heirs to withdraw funds before the maturity date if proof of life is not
            provided.
          </li>
        </ul>
        <h2>{`What is 'Proof of Life' and how does it work?`}</h2>
        <p>
          {`'Proof of Life' is a mechanism included in the Flexible plan that requires the plan holder to periodically
          demonstrate that they are alive, through a process defined in the smart contract. If this proof is not
          provided within the specified period, the designated heirs may opt to withdraw the funds.`}
        </p>
        <h2>How can I designate heirs in my plan?</h2>
        <p>
          When selecting an Inheritance or Flexible plan, you will have the option to designate one or more heirs when
          setting up your plan. This is done by providing the Polygon wallet addresses of your heirs, which are then
          registered in the smart contract associated with your plan.
        </p>
        <h2>Is it safe to invest in a Crypto Retirement Plan?</h2>
        <p>
          {`Yes, security is one of the main advantages of using blockchain technology for your crypto retirement.
            Polygon's smart contracts ensure that your funds are securely locked and can only be accessed according to
            predetermined conditions. Additionally, the decentralized nature of Polygon's blockchain protects against
            attacks and fraud.`}
        </p>
        <h2>Can I change the terms of my plan after creating it?</h2>
        <p>
          Once a plan has been created and locked in a smart contract, its specific terms, such as the maturity date and
          withdrawal conditions, cannot be modified. However, you can add additional funds and, depending on the type of
          plan, modify the list of heirs.
        </p>
        <h2>What happens if Polygon changes or updates its technology?</h2>
        <p>
          Polygon is constantly evolving and improving, but smart contracts already deployed on the blockchain remain
          unchanged. In the event of a significant update to Polygon, measures will be taken to ensure the compatibility
          and continuous operation of existing smart contracts, protecting your investment.
        </p>
        <h2>Where can I get more help or information?</h2>
        <p>
          If you have more questions or need assistance setting up your Crypto Retirement Plan, please do not hesitate
          to contact us through our support on the platform. We are here to help you secure your financial future with
          blockchain technology.
        </p>
      </div>
    </PageContainer>
  );
};
