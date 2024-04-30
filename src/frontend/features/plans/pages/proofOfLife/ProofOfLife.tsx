import { useState } from 'react';
import { GiHeartBeats } from 'react-icons/gi';
import { PageContainer } from '../../../../components/PageContainer/PageContainer';
import { useAppDispatch } from '../../../../hooks/reduxHooks';
import { giveProofOfLifeAsync } from '../../../../redux/slices/plansSlice';
import { Box } from '../../components/Box/Box';
import { TransactionSent } from '../../components/TransactionSent/TransactionSent';
import { PrimaryButton } from '../../../../components/PrimaryButton/PrimaryButton';

export const ProofOfLife = () => {
  const dispatch = useAppDispatch();

  const [transactionSent, setTransactionSent] = useState(false);

  const handleClickProofOfLife = () => {
    dispatch(giveProofOfLifeAsync()).then(() => {
      setTransactionSent(true);
    });
  };

  return (
    <PageContainer>
      <Box icon={<GiHeartBeats size={25} />} title="Withdraw">
        {transactionSent ? (
          <TransactionSent />
        ) : (
          <PrimaryButton onClick={handleClickProofOfLife}>Give Proof Of Life</PrimaryButton>
        )}
      </Box>
    </PageContainer>
  );
};
