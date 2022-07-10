import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';

// Define a type for the slice state
interface PredictionState {
  currentStep: number,
  sourceImgData: Blob | null,
  newImgData: string,
  smileData: string,
  predictionResult: Array<prediction>
}

type prediction = {
  name: string,
  result: boolean,
  runtime: string
}

// Define the initial state using that type
const initialState: PredictionState = {
  currentStep: 0,
  sourceImgData: null,
  newImgData: '',
  smileData: '',
  predictionResult: []
};

export const predictionSlice = createSlice({
  name: 'prediction',
  initialState,
  reducers: {
    updateCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    updateSourceImgData: (state, action: PayloadAction<Blob | null>) => {
      state.sourceImgData = action.payload;
    },
    updateNewImgData: (state, action: PayloadAction<string>) => {
      state.newImgData = action.payload;
    },
    updateSmileData: (state, action: PayloadAction<string>) => {
      state.smileData = action.payload;
    },
    updatePredictionResult: (state, action: PayloadAction<Array<prediction>>) => {
      state.predictionResult = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  updateCurrentStep,
  updateSourceImgData,
  updateNewImgData,
  updateSmileData,
  updatePredictionResult,
} = predictionSlice.actions;

// Other code such as selectors can use the imported `RootState` type
const selectCurrentStep =  (state: RootState) => state.prediction.currentStep;
const selectSourceImgData = (state: RootState) => state.prediction.sourceImgData;
const selectNewImgData = (state: RootState) => state.prediction.newImgData;
const selectSmileData = (state: RootState) => state.prediction.smileData;
const selectPredictionResult = (state: RootState) => state.prediction.predictionResult;

export {
  selectCurrentStep,
  selectSourceImgData,
  selectNewImgData,
  selectSmileData,
  selectPredictionResult
};

export default predictionSlice.reducer;