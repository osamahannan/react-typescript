import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetUserDetails, setUserDetails } from '../actions/userActions';
import { Typography, Stepper, Step, StepLabel } from '@mui/material';
import ProfileStep from './ProfileStep';
import AddressStep from './AddressStep';
import { AppDispatch } from '../store/configureStore';
import ReactDataTables from "./ReactDataTables";
import "datatables.net-dt/css/jquery.dataTables.css";

export interface FormProfileValues {
  name: string;
  age: number;
  sex: string;
  mobile: string;
  idType: string;
  idNumber?: string;
}

export interface FormAddressValues {
  address?: string;
  state?: string;
  city?: string;
  country?: string;
  pincode?: string;
}

const Form: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const [activeStep, setActiveStep] = useState<number>(0);

  const handleNext = (data: FormProfileValues) => {
    dispatch(setUserDetails(data));
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handlePrev = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (data: FormAddressValues) => {
    dispatch(resetUserDetails());
    setActiveStep(0);
  };

  const steps = ['Step 1', 'Step 2'];

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <ProfileStep onNext={handleNext} />;
      case 1:
        return <AddressStep onPrev={handlePrev} onSubmit={handleSubmit} />;
      default:
        return null;
    }
  };

  return (
    <div className='form'>
      <Typography variant="h4" gutterBottom className='heading'>
        User Registration
      </Typography>
      <Stepper activeStep={activeStep} alternativeLabel className='step-container'>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className='form-list-container'>
        {activeStep === steps.length ? (
          <div>
            <Typography variant="h5" gutterBottom>
              Registration Successful
            </Typography>
          </div>
        ) : (
          <>
            <div>
              {getStepContent(activeStep)}
            </div>
            <div className='table-container'>
              <ReactDataTables />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Form;

