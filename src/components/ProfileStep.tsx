import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Typography, MenuItem } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FormProfileValues } from './Form';
import { RootState } from '../store/configureStore';
import { useSelector } from 'react-redux';

interface ProfileStepProps {
  onNext: (data: FormProfileValues) => void;
  onReset: () => void;
  handleChange: (e: React.ChangeEvent) => void;
}

const ProfileStep: React.FC<ProfileStepProps> = ({ onNext, onReset, handleChange }) => {

  const stepOneFormData = useSelector((state: RootState) => state.user.userDetails);

  const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    age: yup.number().required("Age is required").positive("Age must be a positive number").integer(),
    sex: yup.string().required('Sex is required').oneOf(['Male', 'Female'], 'Invalid sex'),
    mobile: yup.string().required('Mobile is required')?.matches(/^[6-9]\d{9}$/, 'Invalid Indian Mobile Number'),
    idType: yup.string().required('ID Type is required').oneOf(['Aadhar', 'PAN'], 'Invalid ID Type'),
    idNumber: yup.string().required('ID Number is required').test(
      'id-validation',
      'Invalid ID Number',
      (value, { parent }) => {
        if (parent.idType === 'Aadhar') {
          return /^[2-9]\d{11}$/.test(value); // Aadhar validation
        } else if (parent.idType === 'PAN') {
          return /^[A-Za-z]{5}\d{4}[A-Za-z]$/.test(value); // PAN validation
        }
        return false;
      }
    ),
  });

  const { register, handleSubmit, formState: { errors } } = useForm<FormProfileValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormProfileValues> = (data: FormProfileValues) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='form-container'>
      <Typography variant="h6">Step 1: Personal Details</Typography>
      <div className='line-container'>
        <TextField
          label="Name"
          {...register('name')}
          error={!!errors.name}
          helperText={errors.name?.message}
          fullWidth
          margin="normal"
          value={stepOneFormData.name}
          onChange={handleChange}
        />
        <TextField
          label="Age"
          {...register('age')}
          error={!!errors.age}
          helperText={errors.age?.message}
          fullWidth
          margin="normal"
          type='number'
          value={stepOneFormData.age}
          onChange={handleChange}
        />
      </div>
      <div className="line-container">
        <TextField
          label="Sex"
          select
          {...register('sex')}
          error={!!errors.sex}
          helperText={errors.sex?.message}
          fullWidth
          margin="normal"
          value={stepOneFormData.sex}
          onChange={handleChange}
        >
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
        </TextField>
        <TextField
          label="Mobile"
          {...register('mobile')}
          error={!!errors.mobile}
          helperText={errors.mobile?.message}
          fullWidth margin="normal"
          type='number'
          value={stepOneFormData.mobile}
          onChange={handleChange}
        />
      </div>
      <div className="line-container">
        <TextField
          label="Govt Issued ID Type"
          select
          {...register('idType')}
          error={!!errors.idType}
          helperText={errors.idType?.message}
          fullWidth
          margin="normal"
          style={{ width: stepOneFormData.idType ? "50%" : "49%" }}
          value={stepOneFormData.idType}
          onChange={handleChange}
          className='idType'
        >
          <MenuItem value="Aadhar">Aadhar</MenuItem>
          <MenuItem value="PAN">PAN</MenuItem>
        </TextField>
        {stepOneFormData.idType === 'Aadhar' && (
          <TextField
            label="Govt Issued ID Number"
            {...register('idNumber')}
            error={!!errors.idNumber}
            helperText={errors.idNumber?.message}
            fullWidth
            margin="normal"
            style={{ width: "50%" }}
            value={stepOneFormData.idNumber}
            onChange={handleChange}
            className='idNumber'
          />
        )}
        {stepOneFormData.idType === 'PAN' && (
          <TextField
            label="Govt Issued ID Number"
            {...register('idNumber')}
            error={!!errors.idNumber}
            helperText={errors.idNumber?.message}
            fullWidth
            margin="normal"
            style={{ width: "50%" }}
            value={stepOneFormData.idNumber}
            onChange={handleChange}
            className='idNumber'
          />
        )}
      </div>
      <div className='btn'>
        <Button type="button" variant="outlined" fullWidth className='button outlined' onClick={onReset}>
          Reset
        </Button>
        <Button type="submit" variant="contained" fullWidth className='button'>
          Next
        </Button>
      </div>
    </form>
  );
};

export default ProfileStep;
