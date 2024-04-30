import { useNavigate } from 'react-router-dom';
import backgroundMainSection from '../../../../assets/home/home-bg-element-1.png';
import { ColourButton } from '../../../../components/ColourButton/ColourButton';
import { SecondaryButton } from '../../../../components/SecondaryButton/SecondaryButton';
import { useAppSelector } from '../../../../hooks/reduxHooks';
import { validateMetamask } from '../../../../utils/retirementPlanUtils';

export const MainSection = () => {
  const { selectedAccount } = useAppSelector((state) => state.web3.reducer);
  const navigate = useNavigate();

  const handleStartPlan = () => {
    if (validateMetamask()) {
      return;
    }

    if (selectedAccount) {
      navigate('/create-plan');
    }
  };

  const handleClickReadDocs = () => {
    navigate('/documentation');
  };

  return (
    <section className="main-section">
      <img className="main-section-image" src={backgroundMainSection} alt="background-main" />
      <div className="content-container">
        <div className="title">
          Save your retirement
          <br />
          plan with <span>Crypto</span>
        </div>
        <span className="subtitle">
          Invest in your <b>future</b> with our blockchain-based <b>retirement plans</b>.
        </span>
        <div className="buttons-container">
          <ColourButton text="Start a plan" onClick={handleStartPlan} />
          <SecondaryButton onClick={handleClickReadDocs}>Read docs</SecondaryButton>
        </div>
        <p className="content-footer">
          built on <span>POLYGON</span>
        </p>
      </div>
    </section>
  );
};
