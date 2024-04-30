import { PlanTypes } from '../../../../constants/constants';
import { PageContainer } from '../../../../components/PageContainer/PageContainer';
import { MdCreateNewFolder } from 'react-icons/md';
import { Box } from '../../components/Box/Box';
import { TransactionSent } from '../../components/TransactionSent/TransactionSent';
import { PrimaryButton } from '../../../../components/PrimaryButton/PrimaryButton';
import { SecondaryButton } from '../../../../components/SecondaryButton/SecondaryButton';
import { ModalAddHeir } from '../../components/ModalAddHeir/ModalAddHeir';
import { Input } from '../../../../components/Input/Input';
import { Select } from '../../../../components/Select/Select';
import { useCreatePlan } from '../../hooks/useCreatePlan';
import './styles.scss';

export const CreatePlan = () => {
  const {
    planType,
    setPlanType,
    amount,
    setAmount,
    dateAvailableToWithdraw,
    setDateAvailableToWithdraw,
    heirs,
    totalDaysToProofOfLife,
    setTotalDaysToProofOfLife,
    transactionSent,
    handleSubmit,
    handleAddHeir,
    handleRemoveHeir,
    setNewHeir,
    heirModalOpen,
    closeModal
  } = useCreatePlan();

  return (
    <PageContainer>
      <ModalAddHeir modalIsOpen={heirModalOpen} setNewHeir={setNewHeir} closeModal={closeModal} />
      <Box icon={<MdCreateNewFolder size={25} />} title="Create new plan">
        {transactionSent ? (
          <TransactionSent />
        ) : (
          <div className="create-plan">
            <form onSubmit={handleSubmit}>
              <div className="field-container">
                <label htmlFor="plans">Plan Type</label>
                <Select name="plans" id="plans" value={planType} onChange={(e) => setPlanType(Number(e.target.value))}>
                  <option value={0}>Basic</option>
                  <option value={1}>Inheritance</option>
                  <option value={2}>Flexible</option>
                </Select>
              </div>
              <div className="field-container">
                <label htmlFor="amount">Amount</label>
                <Input
                  type="number"
                  id="amount"
                  placeholder="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className="field-container">
                <label htmlFor="dateToAvailableToWithdraw">Available to withdraw</label>
                <Input
                  type="date"
                  id="dateToAvailableToWithdraw"
                  value={dateAvailableToWithdraw}
                  onChange={(e) => setDateAvailableToWithdraw(e.target.value)}
                />
              </div>
              {planType === PlanTypes.FLEXIBLE && (
                <div className="field-container">
                  <label htmlFor="totalDaysToProofOfLife">Period of days to give Proof of Life</label>
                  <Input
                    type="text"
                    id="totalDaysToProofOfLife"
                    value={totalDaysToProofOfLife}
                    placeholder="Amount of days"
                    onChange={(e) => setTotalDaysToProofOfLife(e.target.value)}
                  />
                </div>
              )}
              {(planType === PlanTypes.INHERITANCE || planType === PlanTypes.FLEXIBLE) && (
                <div className="heir-container">
                  <h3>Heirs</h3>
                  {heirs.map((h: any, index: number) => (
                    <div key={index} className="heir">
                      <div className="name-address">
                        <div>Name: {h.name} </div>
                        <label className="address-container" title={h.heirAddress}>
                          Address: {h.heirAddress}
                        </label>
                      </div>
                      <SecondaryButton type="button" onClick={() => handleRemoveHeir(index)}>
                        Remove
                      </SecondaryButton>
                    </div>
                  ))}
                  <SecondaryButton type="button" onClick={handleAddHeir}>
                    Add Heir
                  </SecondaryButton>
                </div>
              )}
              <div className="button-container">
                <PrimaryButton type="submit">Create Plan</PrimaryButton>
              </div>
            </form>
          </div>
        )}
      </Box>
    </PageContainer>
  );
};
