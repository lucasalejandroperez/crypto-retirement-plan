import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { About } from '../features/landing/pages/About/About';
import { ContactUs } from '../features/landing/pages/ContactUs/ContactUs';
import { Documentation } from '../features/landing/pages/Documentation/Documentation';
import { Faq } from '../features/landing/pages/Faq/Faq';
import { Home } from '../features/landing/pages/Home/Home';
import { Team } from '../features/landing/pages/Team/Team';
import { AddDeposit } from '../features/plans/pages/AddDeposit/AddDeposit';
import { CreatePlan } from '../features/plans/pages/CreatePlan/CreatePlan';
import { DetailPlan } from '../features/plans/pages/DetailPlan/DetailPlan';
import { ProofOfLife } from '../features/plans/pages/ProofOfLife/ProofOfLife';
import { WithdrawHeir } from '../features/plans/pages/WithdrawHeir/WithdrawHeir';
import { WithdrawOwner } from '../features/plans/pages/WithdrawOwner/WithdrawOwner';
import { useAppSelector } from '../hooks/reduxHooks';
import { Footer } from '../layout/Footer/Footer';
import { Navbar } from '../layout/Navbar/Navbar';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
import { AbsoluteLoader } from '../components/AbsoluteLoader/AbsoluteLoader';

export const AppRouter = () => {
  const { selectedAccount } = useAppSelector((state) => state.web3.reducer);
  const { loading } = useAppSelector((state) => state.plans.reducer);

  return (
    <BrowserRouter>
      <Navbar />
      {loading && <AbsoluteLoader />}
      <Routes>
        <Route element={<PrivateRoutes isAuthenticated={selectedAccount.length > 0} />}>
          <Route path="/add-deposit" element={<AddDeposit />} />
          <Route path="/create-plan" element={<CreatePlan />} />
          <Route path="/detail-plan" element={<DetailPlan />} />
          <Route path="/proof-of-life" element={<ProofOfLife />} />
          <Route path="/withdraw-heir" element={<WithdrawHeir />} />
          <Route path="/withdraw-owner" element={<WithdrawOwner />} />
        </Route>
        <Route element={<PublicRoutes />}>
          <Route element={<Home />} path="/" />
          <Route element={<About />} path="/about" />
          <Route element={<Documentation />} path="/documentation" />
          <Route element={<Team />} path="/team" />
          <Route element={<ContactUs />} path="/contact-us" />
          <Route element={<Faq />} path="/faq" />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};
