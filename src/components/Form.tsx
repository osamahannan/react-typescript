import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUserList, resetUserDetails, setUserDetails } from '../actions/userActions';
import { Typography, Stepper, Step, StepLabel } from '@mui/material';
import ProfileStep from './ProfileStep';
import AddressStep from './AddressStep';
import { AppDispatch, RootState } from '../store/configureStore';
import ReactDataTables from "./ReactDataTables";
import "datatables.net-dt/css/jquery.dataTables.css";
import { UserData } from '../reducers/userListReducer';
import { toast } from 'react-toastify';
import { createTheme, Theme } from '@mui/material/styles';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';

export const customTheme = (outerTheme: Theme) =>
  createTheme({
    palette: {
      mode: outerTheme.palette.mode,
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '--TextField-brandBorderColor': '#cdcfd1',
            '--TextField-brandBorderHoverColor': '#1C1C1C',
            '--TextField-brandBorderFocusedColor': '#1C1C1C',
            '& label.Mui-focused': {
              color: 'var(--TextField-brandBorderFocusedColor)',
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: 'var(--TextField-brandBorderColor)',
          },
          root: {
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: 'var(--TextField-brandBorderHoverColor)',
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: 'var(--TextField-brandBorderFocusedColor)',
            },
          },
        },
      },
      MuiFilledInput: {
        styleOverrides: {
          root: {
            '&::before, &::after': {
              borderBottom: '2px solid var(--TextField-brandBorderColor)',
            },
            '&:hover:not(.Mui-disabled, .Mui-error):before': {
              borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
            },
            '&.Mui-focused:after': {
              borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
            },
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          root: {
            '&::before': {
              borderBottom: '2px solid var(--TextField-brandBorderColor)',
            },
            '&:hover:not(.Mui-disabled, .Mui-error):before': {
              borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
            },
            '&.Mui-focused:after': {
              borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
            },
          },
        },
      },
    },
  });

export interface FormProfileValues {
  name: string;
  age: number;
  sex: string;
  mobile: string;
  idType: string;
  idNumber: string;
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

  const stepOneFormData = useSelector((state: RootState) => state?.user?.userDetails);
  // const userList = useSelector((state: RootState) => state?.userList?.users);

  const [activeStep, setActiveStep] = useState<number>(0);

  const handleNext = (data: FormProfileValues) => {
    dispatch(setUserDetails(data));
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleReset = () => {
    dispatch(resetUserDetails());
    setActiveStep(0);
  };

  const handlePrev = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (data: FormAddressValues) => {
    try {
      const userData: UserData = { ...stepOneFormData, ...data };
      // const updatedUserList = [...userList, userData]
      dispatch(addUserList(userData));
      dispatch(resetUserDetails());
      setActiveStep(0);
      toast.success("User added successfully", {
        position: "top-right",
        autoClose: 2000
      })
    } catch (e) {
      toast.error("Oops, something went wrong!", {
        position: "top-right",
        autoClose: 2000
      })
      console.log("error -----> ", e)
    }
  };

  const change = (e: React.ChangeEvent) => {
    const value = (e.target as HTMLInputElement).value
    const name = (e.target as HTMLInputElement).name
    const data = {
      [name]: value
    }
    dispatch(setUserDetails(data));
  }

  const steps = ['Step 1', 'Step 2'];

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <ProfileStep onNext={handleNext} onReset={handleReset} handleChange={change} />;
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

