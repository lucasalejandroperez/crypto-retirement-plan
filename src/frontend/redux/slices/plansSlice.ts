import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ethers } from 'ethers';
import { enqueueSnackbar } from 'notistack';
import { HeirParam, PlanParams } from '../../interfaces/plansInterfaces';
import { RootState } from '../store';
import { parseBlockchainErrorMessage } from '../../utils/parseBlockchainErrorMessage';

export interface PlansState {
  loading: boolean;
  plan: any;
  error: string | undefined;
}

interface AddDepositProps {
  amount: ethers.BigNumber;
}

interface WithdrawCapitalHeirProps {
  address: string;
}

interface RemoveHeirProps {
  address: string;
}

interface AddHeirProps {
  heirs: HeirParam[];
}

interface Props {
  reducer: PlansState;
}

const initialState: Props = {
  reducer: {
    loading: false,
    plan: null,
    error: ''
  }
};

export const createPlanAsync = createAsyncThunk(
  'plans/createPlan',
  async ({ planType, amount, dateAvailableToWithdraw, heirs, totalDaysToProofOfLife }: PlanParams, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const planParams: PlanParams = {
        planType,
        amount,
        dateAvailableToWithdraw,
        heirs,
        totalDaysToProofOfLife
      };

      await state.web3.reducer.cryptoRetirementPlan.createPlan(planParams, { value: amount });

      enqueueSnackbar('Transaction sent!', { variant: 'success' });
    } catch (err: any) {
      console.error('error: ', err);
      const errorMessage = parseBlockchainErrorMessage(err);
      enqueueSnackbar(errorMessage, { variant: 'error' });
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getPlanDetailAsync = createAsyncThunk('plans/getPlanDetail', async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState() as RootState;

    if (state.web3.reducer.cryptoRetirementPlan) {
      const addressOwner = state.web3.reducer.selectedAccount;
      const planTemp: PlanParams = await state.web3.reducer.cryptoRetirementPlan.getPlanDetail(addressOwner);

      if (planTemp.dateAvailableToWithdraw.toString() === '0') {
        return null;
      }
      const plan = {
        amount: planTemp.amount.toString(),
        commission: planTemp?.commission?.toString(),
        dataAvailableToWithdraw: planTemp.dateAvailableToWithdraw.toString(),
        heirs: planTemp.heirs,
        nextDateOfProofOfLife: planTemp?.nextDateOfProofOfLife?.toString(),
        planType: planTemp.planType,
        totalDaysToProofOfLife: Number(planTemp.totalDaysToProofOfLife.toString())
      };

      return plan;
    }
  } catch (err: any) {
    console.error('error: ', err);
    const errorMessage = parseBlockchainErrorMessage(err);
    enqueueSnackbar(errorMessage, { variant: 'error' });
    return thunkAPI.rejectWithValue(err);
  }
});

export const withdrawCapitalOwnerAsync = createAsyncThunk('plans/withdrawOwner', async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState() as RootState;

    await state.web3.reducer.cryptoRetirementPlan.withdrawCapitalOwner();
  } catch (err: any) {
    console.log('error: ', err);
    const errorMessage = parseBlockchainErrorMessage(err);
    enqueueSnackbar(errorMessage, { variant: 'error' });
    return thunkAPI.rejectWithValue(err);
  }
});

export const addDepositAsync = createAsyncThunk('plans/addDeposit', async ({ amount }: AddDepositProps, thunkAPI) => {
  try {
    const state = thunkAPI.getState() as RootState;

    await state.web3.reducer.cryptoRetirementPlan.addDeposit({ value: amount });

    enqueueSnackbar('Transaction sent!', { variant: 'success' });
  } catch (err: any) {
    console.error('error: ', err);
    const errorMessage = parseBlockchainErrorMessage(err);
    enqueueSnackbar(errorMessage, { variant: 'error' });
    return thunkAPI.rejectWithValue(err);
  }
});

export const giveProofOfLifeAsync = createAsyncThunk('plans/giveProofOfLife', async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState() as RootState;

    await state.web3.reducer.cryptoRetirementPlan.giveProofOfLife();

    enqueueSnackbar('Transaction sent!', { variant: 'success' });
  } catch (err: any) {
    console.error('error: ', err);
    const errorMessage = parseBlockchainErrorMessage(err);
    enqueueSnackbar(errorMessage, { variant: 'error' });
    return thunkAPI.rejectWithValue(err);
  }
});

export const withdrawCapitalHeirAsync = createAsyncThunk(
  'plans/withdrawCapitalHeir',
  async ({ address }: WithdrawCapitalHeirProps, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;

      await state.web3.reducer.cryptoRetirementPlan.withdrawCapitalHeir(address);

      enqueueSnackbar('Transaction sent!', { variant: 'success' });
    } catch (err: any) {
      const errorMessage = parseBlockchainErrorMessage(err);
      console.error('error: ', err);
      enqueueSnackbar(errorMessage, { variant: 'error' });
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const removeHeirAsync = createAsyncThunk('plans/removeHeir', async ({ address }: RemoveHeirProps, thunkAPI) => {
  try {
    const state = thunkAPI.getState() as RootState;

    await state.web3.reducer.cryptoRetirementPlan.removeHeir(address);

    enqueueSnackbar('Transaction sent!', { variant: 'success' });

    return address;
  } catch (err: any) {
    console.error('error: ', err);
    const errorMessage = parseBlockchainErrorMessage(err);
    enqueueSnackbar(errorMessage, { variant: 'error' });
    return thunkAPI.rejectWithValue(err);
  }
});

export const addHeirAsync = createAsyncThunk('plans/addHeir', async ({ heirs }: AddHeirProps, thunkAPI) => {
  try {
    const state = thunkAPI.getState() as RootState;

    await state.web3.reducer.cryptoRetirementPlan.addHeirs(heirs);

    enqueueSnackbar('Transaction sent!', { variant: 'success' });
  } catch (err: any) {
    console.error('error: ', err);
    const errorMessage = parseBlockchainErrorMessage(err);
    enqueueSnackbar(errorMessage, { variant: 'error' });
    return thunkAPI.rejectWithValue(err);
  }
});

export const resetPlansState = createAction('plans/resetState');

export const plansSlice = createSlice({
  name: 'plans',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPlanAsync.pending, (state) => {
        state.reducer.loading = true;
      })
      .addCase(createPlanAsync.fulfilled, (state) => {
        state.reducer.loading = false;
      })
      .addCase(createPlanAsync.rejected, (state, action) => {
        state.reducer.loading = false;
        state.reducer.error = action.error.message;
      })
      .addCase(getPlanDetailAsync.pending, (state) => {
        state.reducer.loading = true;
      })
      .addCase(getPlanDetailAsync.fulfilled, (state, action) => {
        state.reducer.loading = false;
        state.reducer.plan = action.payload;
      })
      .addCase(getPlanDetailAsync.rejected, (state, action) => {
        state.reducer.loading = false;
        state.reducer.error = action.error.message;
      })
      .addCase(withdrawCapitalOwnerAsync.pending, (state) => {
        state.reducer.loading = true;
      })
      .addCase(withdrawCapitalOwnerAsync.fulfilled, (state) => {
        state.reducer.loading = false;
      })
      .addCase(withdrawCapitalOwnerAsync.rejected, (state, action) => {
        state.reducer.loading = false;
        state.reducer.error = action.error.message;
      })
      .addCase(addDepositAsync.pending, (state) => {
        state.reducer.loading = true;
      })
      .addCase(addDepositAsync.fulfilled, (state) => {
        state.reducer.loading = false;
      })
      .addCase(addDepositAsync.rejected, (state, action) => {
        state.reducer.loading = false;
        state.reducer.error = action.error.message;
      })
      .addCase(giveProofOfLifeAsync.pending, (state) => {
        state.reducer.loading = true;
      })
      .addCase(giveProofOfLifeAsync.fulfilled, (state) => {
        state.reducer.loading = false;
      })
      .addCase(giveProofOfLifeAsync.rejected, (state, action) => {
        state.reducer.loading = false;
        state.reducer.error = action.error.message;
      })
      .addCase(withdrawCapitalHeirAsync.pending, (state) => {
        state.reducer.loading = true;
      })
      .addCase(withdrawCapitalHeirAsync.fulfilled, (state) => {
        state.reducer.loading = false;
      })
      .addCase(withdrawCapitalHeirAsync.rejected, (state, action) => {
        state.reducer.loading = false;
        state.reducer.error = action.error.message;
      })
      .addCase(addHeirAsync.pending, (state) => {
        state.reducer.loading = true;
      })
      .addCase(addHeirAsync.fulfilled, (state) => {
        state.reducer.loading = false;
      })
      .addCase(addHeirAsync.rejected, (state, action) => {
        state.reducer.loading = false;
        state.reducer.error = action.error.message;
      })
      .addCase(removeHeirAsync.pending, (state) => {
        state.reducer.loading = true;
      })
      .addCase(removeHeirAsync.fulfilled, (state, action) => {
        state.reducer.plan.heirs = state.reducer.plan.heirs.filter(
          (heir: HeirParam) => heir.heirAddress !== action.payload
        );
        state.reducer.loading = false;
      })
      .addCase(removeHeirAsync.rejected, (state, action) => {
        state.reducer.loading = false;
        state.reducer.error = action.error.message;
      })
      .addCase(resetPlansState, (state) => {
        state.reducer.loading = false;
      });
  }
});

export default plansSlice.reducer;
