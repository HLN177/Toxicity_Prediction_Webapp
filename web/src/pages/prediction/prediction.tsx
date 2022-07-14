import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import { STEPS, STEPS_ENUM } from '../../constant/prediction.const';
import ImageSelectPage from './imageSelectPage';
import SmileGenPage from './smileGeneratePage';
import ValidatePage from './validationPage';
import PredictPage from './predictPage';
import { useAppSelector, useAppDispatch } from '../../store/hook';
import {
  selectCurrentStep,
  selectSourceImg,
  selectSourceImgData,
  updateCurrentStep,
} from '../../store/prediction/predictionReducer';

function PredictionPage() {
  const currentStep = useAppSelector(selectCurrentStep);
  const sourceImg = useAppSelector(selectSourceImg);
  const sourceImgData = useAppSelector(selectSourceImgData);
  const dispatch = useAppDispatch();
  const [enableNext, setEnableNext] = useState(false);

  useEffect(() => {
    validateSteps();
  }, [currentStep, sourceImg, sourceImgData]);

  const handleNext = () => {
    dispatch(updateCurrentStep(currentStep + 1));
  };

  const handleBack = () => {
    dispatch(updateCurrentStep(currentStep - 1));
  };

  const handleReset = () => {
  };

  const handlePageSwitch = () => {
    switch (currentStep) {
      case STEPS_ENUM.SELECT_SOURCE:
        return (<ImageSelectPage />);
      case STEPS_ENUM.GENERATE_SMILE:
        return (<SmileGenPage />);
      case STEPS_ENUM.VALIDATE_SMILE:
        return (<ValidatePage />);
      case STEPS_ENUM.PREDICT:
        return (<PredictPage />);
      default:
        break;
    }
  };

  const validateSteps = () => {
    let isValid = false;
    switch (currentStep) {
      case STEPS_ENUM.SELECT_SOURCE:
        sourceImg && sourceImgData.fileData && sourceImgData.fileName && (isValid = true);
        break;
      case STEPS_ENUM.GENERATE_SMILE:
      case STEPS_ENUM.VALIDATE_SMILE:
      case STEPS_ENUM.PREDICT:
      default:
        break;
    }
    setEnableNext(isValid);
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        p: '20px'
      }}
    >
      <Stepper activeStep={currentStep}>
        {STEPS.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {handlePageSwitch()}
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Button
          color="inherit"
          disabled={currentStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          Back
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button
          disabled={enableNext === false}
          onClick={handleNext}
        >
          {currentStep === STEPS.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </Box>
    </Box>
  );
}

export default PredictionPage;