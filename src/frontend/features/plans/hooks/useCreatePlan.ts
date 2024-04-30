import { FormEvent, useState } from 'react';
import { ethers } from 'ethers';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import { HeirParam } from '../../../interfaces/plansInterfaces';
import { PlanTypes } from '../../../constants/constants';
import { convertDateToUnixTimestamp } from '../../../utils/dateUtils';
import { createPlanAsync } from '../../../redux/slices/plansSlice';
import { enqueueSnackbar } from 'notistack';

const getPlanType = (): number => {
  const urlParams = new URLSearchParams(window.location.search);
  const type = urlParams.get('type');

  let planType = PlanTypes.BASIC;

  switch (type?.toLocaleLowerCase()) {
    case 'basic':
      planType = PlanTypes.BASIC;
      break;
    case 'inheritance':
      planType = PlanTypes.INHERITANCE;
      break;
    case 'flexible':
      planType = PlanTypes.FLEXIBLE;
      break;
    default:
      break;
  }

  return planType;
};

export const useCreatePlan = () => {
  const dispatch = useAppDispatch();
  const [planType, setPlanType] = useState(getPlanType());
  const [amount, setAmount] = useState('');
  const [dateAvailableToWithdraw, setDateAvailableToWithdraw] = useState('');
  const [heirs, setHeirs] = useState<HeirParam[]>([]);
  const [heirModalOpen, setHeirModalOpen] = useState(false);
  const [totalDaysToProofOfLife, setTotalDaysToProofOfLife] = useState('');
  const [transactionSent, setTransactionSent] = useState(false);

  const setNewHeir = (newHeir: HeirParam) => {
    setHeirs([...heirs, newHeir]);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let isValid = true;

    if (!amount || Number(amount) === 0) {
      enqueueSnackbar('Amount is required', { variant: 'error' });
      isValid = false;
    }

    if (!dateAvailableToWithdraw) {
      enqueueSnackbar('Date is required', { variant: 'error' });
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const unixTime = convertDateToUnixTimestamp(dateAvailableToWithdraw);
    dispatch(
      createPlanAsync({
        planType,
        amount: ethers.utils.parseEther(amount),
        dateAvailableToWithdraw: unixTime,
        heirs,
        totalDaysToProofOfLife: Number(totalDaysToProofOfLife)
      })
    ).then(() => {
      setTransactionSent(true);
    });
  };

  const handleAddHeir = () => {
    setHeirModalOpen(true);
  };
  const handleRemoveHeir = (index: number) => {
    const heirsFiltered = heirs.filter((heir, i) => i !== index);

    setHeirs(heirsFiltered);
  };

  const closeModal = () => {
    setHeirModalOpen(false);
  };

  return {
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
  };
};
