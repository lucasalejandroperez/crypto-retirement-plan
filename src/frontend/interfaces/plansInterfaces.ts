import { ethers } from 'ethers';

export interface Heir {
  heirAddress: string;
  name: string;
  hasWithdrawn: boolean;
}

export interface HeirParam {
  heirAddress: string;
  name: string;
}
export interface PlanParams {
  planType: number;
  amount: ethers.BigNumber;
  dateAvailableToWithdraw: number;
  heirs: HeirParam[];
  totalDaysToProofOfLife: number;
  commission?: ethers.BigNumber;
  nextDateOfProofOfLife?: ethers.BigNumber;
}
