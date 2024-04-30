import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { BiMoneyWithdraw } from 'react-icons/bi';
import { useAppDispatch } from '../../../../hooks/reduxHooks';
import { withdrawCapitalHeirAsync } from '../../../../redux/slices/plansSlice';
import { PageContainer } from '../../../../components/PageContainer/PageContainer';
import { Box } from '../../components/Box/Box';
import { TransactionSent } from '../../components/TransactionSent/TransactionSent';
import { PrimaryButton } from '../../../../components/PrimaryButton/PrimaryButton';
import { Input } from '../../../../components/Input/Input';
import './styles.scss';

export const WithdrawHeir = () => {
  const dispatch = useAppDispatch();
  const [address, setAddress] = useState<string>('');
  const [transactionSent, setTransactionSent] = useState(false);

  const handleClickWithdraw = () => {
    if (address.length > 0) {
      dispatch(withdrawCapitalHeirAsync({ address })).then(() => {
        setTransactionSent(true);
      });
    } else {
      enqueueSnackbar('Address is required', { variant: 'error' });
    }
  };

  return (
    <PageContainer>
      <Box icon={<BiMoneyWithdraw size={25} />} title="Withdraw">
        {transactionSent ? (
          <TransactionSent />
        ) : (
          <div className="withdraw-heir">
            <div className="address-container">
              <label htmlFor="address">{`Plan owner's address`}</label>
              <Input
                type="text"
                id="address"
                value={address}
                placeholder="Address"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="button-container">
              <PrimaryButton type="button" onClick={handleClickWithdraw}>
                Withdraw
              </PrimaryButton>
            </div>
          </div>
        )}
      </Box>
    </PageContainer>
  );
};
