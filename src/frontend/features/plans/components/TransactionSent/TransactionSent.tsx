import { useNavigate } from 'react-router-dom';
import { SecondaryButton } from '../../../../components/SecondaryButton/SecondaryButton';
import './styles.scss';

export const TransactionSent = () => {
  const navigate = useNavigate();

  const handleClickHome = () => {
    navigate('/');
  };
  return (
    <div className="transaction-sent">
      <p>Your transaction has been sent, this may take a few minutes to be approved by the blockchain, please wait.</p>
      <SecondaryButton onClick={handleClickHome}>Go Home</SecondaryButton>
    </div>
  );
};
