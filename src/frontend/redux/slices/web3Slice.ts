import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ethers } from 'ethers';
import CryptoRetirementAbi from '../../contractsData/CryptoRetirementPlan.json';
import CryptoRetirementAddress from '../../contractsData/CryptoRetirementPlan-address.json';

export interface Web3State {
  loading: boolean;
  cryptoRetirementPlan: any;
  selectedAccount: string;
}

interface Web3InitialStateProps {
  reducer: Web3State;
}

const initialState: Web3InitialStateProps = {
  reducer: {
    loading: false,
    cryptoRetirementPlan: null,
    selectedAccount: ''
  }
};

export const setWeb3HandlerAsync = createAsyncThunk('web3/setWeb3Handler', async () => {
  const accounts = await window.ethereum.request({
    method: 'eth_requestAccounts'
  });

  const selectedAccount = accounts[0];

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const cryptoRetirementPlan = new ethers.Contract(CryptoRetirementAddress.address, CryptoRetirementAbi.abi, signer);

  return {
    cryptoRetirementPlan,
    selectedAccount
  };
});

export const resetWeb3State = createAction('web3/resetState');

export const web3Slice = createSlice({
  name: 'web3',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setWeb3HandlerAsync.pending, (state) => {
        state.reducer.loading = true;
      })
      .addCase(setWeb3HandlerAsync.fulfilled, (state, action) => {
        state.reducer.loading = false;
        state.reducer.cryptoRetirementPlan = action.payload.cryptoRetirementPlan;
        state.reducer.selectedAccount = action.payload.selectedAccount;
      })
      .addCase(setWeb3HandlerAsync.rejected, (state) => {
        state.reducer.loading = false;
      })
      .addCase(resetWeb3State, (state) => {
        state.reducer.loading = false;
        state.reducer.cryptoRetirementPlan = null;
        state.reducer.selectedAccount = '';
      });
  }
});

export default web3Slice.reducer;
