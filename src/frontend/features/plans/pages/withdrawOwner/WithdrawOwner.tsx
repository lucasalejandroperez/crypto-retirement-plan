import { useState } from 'react';
import { BiMoneyWithdraw } from 'react-icons/bi';
import { PageContainer } from '../../../../components/PageContainer/PageContainer';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import { withdrawCapitalOwnerAsync } from '../../../../redux/slices/plansSlice';
import { Box } from '../../components/Box/Box';
import { TransactionSent } from '../../components/TransactionSent/TransactionSent';
import { PrimaryButton } from '../../../../components/PrimaryButton/PrimaryButton';
import { EthAmount } from '../../components/EthAmount/EthAmount';
import './styles.scss';

export const WithdrawOwner = () => {
  const { plan } = useAppSelector((state) => state.plans.reducer);
  const dispatch = useAppDispatch();

  const [transactionSent, setTransactionSent] = useState(false);

  const handleClickWithdraw = () => {
    dispatch(withdrawCapitalOwnerAsync()).then(() => {
      setTransactionSent(true);
    });
  };

  return (
    <PageContainer>
      <Box icon={<BiMoneyWithdraw size={25} />} title="Withdraw">
        {transactionSent ? (
          <TransactionSent />
        ) : (
          <div className="withdraw-owner">
            <p>You are available to make the withdraw of your plan</p>
            <p>
              Total amount: <EthAmount amount={plan.amount} />
            </p>
            <div className="button-container">
              <PrimaryButton type="button" onClick={handleClickWithdraw}>
                Withdraw all
              </PrimaryButton>
            </div>
          </div>
        )}
      </Box>
    </PageContainer>
  );
};
