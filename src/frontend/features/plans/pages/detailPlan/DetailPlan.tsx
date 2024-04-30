import { useEffect, useState } from 'react';
import { BiDetail } from 'react-icons/bi';
import { PlanTypes } from '../../../../constants/constants';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import { HeirParam } from '../../../../interfaces/plansInterfaces';
import { addHeirAsync, getPlanDetailAsync, removeHeirAsync } from '../../../../redux/slices/plansSlice';
import { getPercentageForHeirs, transformToPlanType } from '../../../../utils/retirementPlanUtils';
import { PageContainer } from '../../../../components/PageContainer/PageContainer';
import { Box } from '../../components/Box/Box';
import { convertUnixTimestampToDate } from '../../../../utils/dateUtils';
import { PrimaryButton } from '../../../../components/PrimaryButton/PrimaryButton';
import { EthAmount } from '../../components/EthAmount/EthAmount';
import { SecondaryButton } from '../../../../components/SecondaryButton/SecondaryButton';
import { ModalAddHeir } from '../../components/ModalAddHeir/ModalAddHeir';
import './styles.scss';

export const DetailPlan = () => {
  const dispatch = useAppDispatch();
  const { selectedAccount } = useAppSelector((state) => state.web3.reducer);

  const { plan } = useAppSelector((state) => state.plans.reducer);
  const [heirModalOpen, setHeirModalOpen] = useState(false);

  const setNewHeir = (newHeir: HeirParam) => {
    const newHeirs: HeirParam[] = [];
    newHeirs.push(newHeir);
    dispatch(addHeirAsync({ heirs: newHeirs }));
  };

  const handleRemoveHeir = (address: string) => {
    dispatch(removeHeirAsync({ address }));
  };

  const handleAddHeir = () => {
    setHeirModalOpen(true);
  };

  const closeModal = () => {
    setHeirModalOpen(false);
  };

  useEffect(() => {
    if (selectedAccount) {
      dispatch(getPlanDetailAsync());
    }
  }, [dispatch, selectedAccount]);

  return (
    <PageContainer>
      <ModalAddHeir modalIsOpen={heirModalOpen} setNewHeir={setNewHeir} closeModal={closeModal} />
      <Box icon={<BiDetail size={25} />} title="Retirement Detail Plan">
        <div className="detail-plan">
          <div>
            Plan: <strong>{transformToPlanType(plan.planType)}</strong>
          </div>
          <div>Expire in: {convertUnixTimestampToDate(plan.dataAvailableToWithdraw)}</div>
          <div>
            Total amount: <EthAmount amount={plan.amount} />
          </div>
          {plan.planType === PlanTypes.FLEXIBLE && (
            <div>Next Proof of life: {convertUnixTimestampToDate(plan.nextDateOfProofOfLife)}</div>
          )}
          <hr />
          {plan.heirs && plan.heirs.length > 0 && (
            <>
              <h2>Heirs</h2>
              {plan.heirs.map((heir: any, index: number) => (
                <div key={index} className="heir">
                  <div className="name-address">
                    <div>Name: {heir.name} </div>
                    <label className="address" title={heir.heirAddress}>
                      Address: {heir.heirAddress}
                    </label>
                    <div>{getPercentageForHeirs(plan.heirs.length)}%</div>
                  </div>
                  <SecondaryButton type="button" onClick={() => handleRemoveHeir(heir.heirAddress)}>
                    Remove
                  </SecondaryButton>
                </div>
              ))}
              <PrimaryButton onClick={handleAddHeir}>Add new Heir</PrimaryButton>
            </>
          )}
        </div>
      </Box>
    </PageContainer>
  );
};
