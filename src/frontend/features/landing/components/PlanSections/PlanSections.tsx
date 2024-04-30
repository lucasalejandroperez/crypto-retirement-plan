import { SiBlockchaindotcom } from 'react-icons/si';
import { GiFlexibleStar } from 'react-icons/gi';
import { TbHierarchy } from 'react-icons/tb';
import { LineDivision } from '../../../../components/LineDivison/LineDivision';
import { Card } from '../Card/Card';
import { useNavigate } from 'react-router-dom';
import { validateMetamask } from '../../../../utils/retirementPlanUtils';

export const PlanSections = () => {
  const navigate = useNavigate();

  const handleClickBasicPlan = () => {
    const isValid = validateMetamask();

    if (isValid) {
      navigate('/create-plan?type=Basic');
    }
  };

  const handleClickInheritancePlan = () => {
    const isValid = validateMetamask();

    if (isValid) {
      navigate('/create-plan?type=Inheritance');
    }
  };

  const handleClickFlexiblePlan = () => {
    const isValid = validateMetamask();

    if (isValid) {
      navigate('/create-plan?type=Flexible');
    }
  };

  return (
    <section className="plans-section">
      <div className="card-background" />
      <div>
        <div className="card-title">
          <LineDivision />
          <span>Select the plan that fits your needs powered by Polygon</span>
        </div>
        <div className="cards-container">
          <Card
            title="BASIC"
            subtitle="Lock your money until your desire date. You can add more money anytime you want. You cannot whithdraw your money before the desire date."
            icon={<SiBlockchaindotcom size={25} />}
            buttonText="Select plan"
            maxWidth="356px"
            height="400px"
            onClick={handleClickBasicPlan}
          />
          <Card
            title="INHERITANCE"
            subtitle="Lock your money until your desire date. You can add more money anytime you want. You cannot whithdraw your money before the expire date. You can add heirs to your plan. Your heirs could withdraw the money after the expiration date."
            icon={<TbHierarchy size={25} />}
            buttonText="Select plan"
            maxWidth="356px"
            height="400px"
            onClick={handleClickInheritancePlan}
          />
          <Card
            title="FLEXIBLE"
            subtitle="Lock your money until your desire date. You can add more money anytime you want. You cannot whithdraw your money before the expire date. You can add heirs to your plan. Your heirs have the opportunity to withdraw the money before the expiration date if you don't give the proof of life."
            icon={<GiFlexibleStar size={25} />}
            buttonText="Select plan"
            maxWidth="356px"
            height="400px"
            onClick={handleClickFlexiblePlan}
          />
        </div>
      </div>
    </section>
  );
};
