import { MainSection } from '../../components/MainSection/MainSection';
import { PlanSections } from '../../components/PlanSections/PlanSections';
import { WhyEthereum } from '../../components/WhyEthereum/WhyEthereum';
import './styles.scss';

export const Home = () => {
  return (
    <>
      <MainSection />
      <PlanSections />
      <WhyEthereum />
    </>
  );
};
