import { FormEvent, useState } from 'react';
import { SiEthereum } from 'react-icons/si';
import { ethers } from 'ethers';
import { enqueueSnackbar } from 'notistack';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import { addDepositAsync } from '../../../../redux/slices/plansSlice';
import { transformToPlanType } from '../../../../utils/retirementPlanUtils';
import { PageContainer } from '../../../../components/PageContainer/PageContainer';
import { Box } from '../../components/Box/Box';
import { TransactionSent } from '../../components/TransactionSent/TransactionSent';
import { PrimaryButton } from '../../../../components/PrimaryButton/PrimaryButton';
import { convertUnixTimestampToDate } from '../../../../utils/dateUtils';
import { Input } from '../../../../components/Input/Input';
import './styles.scss';

export const AddDeposit = () => {
  const dispatch = useAppDispatch();
  const { plan } = useAppSelector((state) => state.plans.reducer);

  const [amount, setAmount] = useState('');
  const [transactionSent, setTransactionSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!amount || Number(amount) === 0) {
      enqueueSnackbar('Amount is required', { variant: 'error' });
      return;
    }

    if (amount && Number(amount) > 0) {
      dispatch(addDepositAsync({ amount: ethers.utils.parseEther(amount) })).then(() => {
        setTransactionSent(true);
      });
    }
  };

  return (
    <PageContainer>
      <Box icon={<SiEthereum size={25} />} title="Add Deposit">
        {transactionSent ? (
          <TransactionSent />
        ) : (
          <div className="add-deposit">
            <span>
              Plan: <strong>{transformToPlanType(plan.planType)}</strong>
            </span>
            <span>Available to withdraw: {convertUnixTimestampToDate(plan.dataAvailableToWithdraw)}</span>
            <span>Remember that your money will be locked until the date of withdraw</span>
            <form onSubmit={handleSubmit}>
              <div className="amount-container">
                <label htmlFor="amount">Amount</label>
                <Input
                  type="number"
                  id="amount"
                  name="amount"
                  placeholder="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className="button-container">
                <PrimaryButton type="submit">Add deposit</PrimaryButton>
              </div>
            </form>
          </div>
        )}
      </Box>
    </PageContainer>
  );
};
