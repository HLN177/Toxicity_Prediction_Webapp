import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';

// Define a type for the slice state
interface PredictionState {
  currentStep: number,
  sourceImg: Blob | null,
  sourceImgData: SourceImgInput
  newImgData: string,
  smileData: string,
  predictionResult: Array<Prediction>
}

interface Prediction {
  name: string,
  result: boolean,
  runtime: string
}

interface SourceImgInput {
  fileName: string,
  fileData: string
}

// Define the initial state using that type
const initialState: PredictionState = {
  currentStep: 0,
  sourceImg: null,
  sourceImgData: {
    fileName: '',
    fileData: ''
  },
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
    updateSourceImg: (state, action: PayloadAction<Blob | null>) => {
      state.sourceImg = action.payload;
    },
    updateSourceImgData: (state, action: PayloadAction<SourceImgInput>) => {
      state.sourceImgData = action.payload;
    },
    updateNewImgData: (state, action: PayloadAction<string>) => {
      state.newImgData = action.payload;
    },
    updateSmileData: (state, action: PayloadAction<string>) => {
      state.smileData = action.payload;
    },
    updatePredictionResult: (state, action: PayloadAction<Array<Prediction>>) => {
      state.predictionResult = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  updateCurrentStep,
  updateSourceImg,
  updateSourceImgData,
  updateNewImgData,
  updateSmileData,
  updatePredictionResult,
} = predictionSlice.actions;

// Other code such as selectors can use the imported `RootState` type
const selectCurrentStep =  (state: RootState) => state.prediction.currentStep;
const selectSourceImg = (state: RootState) => state.prediction.sourceImg;
const selectSourceImgData = (state: RootState) => state.prediction.sourceImgData;
const selectNewImgData = (state: RootState) => state.prediction.newImgData;
const selectSmileData = (state: RootState) => state.prediction.smileData;
const selectPredictionResult = (state: RootState) => state.prediction.predictionResult;

export {
  selectCurrentStep,
  selectSourceImg,
  selectSourceImgData,
  selectNewImgData,
  selectSmileData,
  selectPredictionResult
};

export default predictionSlice.reducer;