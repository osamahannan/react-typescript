import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Typography, MenuItem } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FormProfileValues } from './Form';
import { UserDetails } from '../actions/userActions';

interface ProfileStepProps {
  onNext: any;
}

const ProfileStep: React.FC<ProfileStepProps> = ({ onNext }) => {

  const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    age: yup.number().required().positive().integer(),
    sex: yup.string().required('Sex is required').oneOf(['Male', 'Female'], 'Invalid sex'),
    mobile: yup.string().required('Mobile is required')?.matches(/^[6-9]\d{9}$/, 'Invalid Indian Mobile Number'),
    idType: yup.string().required('ID Type is required').oneOf(['Aadhar', 'PAN'], 'Invalid ID Type'),
    // idNumber: yup.string().when('idType', {
    //   is: (value) => value === 'Aadhar',
    //   then: yup.string(),
    //   otherwise: yup.string().when('idType', {
    //     is: (value) => value === 'PAN',
    //     then: yup.string(),
    //     otherwise: yup.string(),
    //   }),
    // }),
    // idNumber: yup.string().when('idType', {
    //   is: 'Aadhar',
    //   then: yup.string().matches(/^[2-9]\d{11}$/, 'Invalid Aadhar ID'),
    //   otherwise: yup.string().when('idType', {
    //     is: 'PAN',
    //     then: yup.string().matches(/^[A-Za-z0-9]{10}$/, 'Invalid PAN ID'),
    //     otherwise: yup.string(),
    //   }),
    // }),
  });

  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormProfileValues>({
    resolver: yupResolver(schema),
  });

  const idtype = watch('idType');

  const onSubmit: SubmitHandler<FormProfileValues> = (data : UserDetails) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='form-container'>
      <Typography variant="h6">Step 1: Personal Information</Typography>
      <div className='line-container'>
        <TextField
          label="Name"
          {...register('name')}
          error={!!errors.name}
          helperText={errors.name?.message}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Age"
          {...register('age')}
          error={!!errors.age}
          helperText={errors.age?.message}
          fullWidth
          margin="normal"
          type='number'
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
          style={{width: idtype ? "50%" : "49%"}}
        >
          <MenuItem value="Aadhar">Aadhar</MenuItem>
          <MenuItem value="PAN">PAN</MenuItem>
        </TextField>
        {idtype === 'Aadhar' && (
          <TextField
            label="Govt Issued ID Number"
            {...register('idNumber')}
            error={!!errors.idNumber}
            helperText={errors.idNumber?.message}
            fullWidth
            margin="normal"
            style={{width: "50%"}}
          />
        )}
        {idtype === 'PAN' && (
          <TextField
            label="Govt Issued ID Number"
            {...register('idNumber')}
            error={!!errors.idNumber}
            helperText={errors.idNumber?.message}
            fullWidth
            margin="normal"
            style={{width: "50%"}}
          />
        )}
      </div>
      <div className='btn'>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Next
        </Button>
      </div>
    </form>
  );
};

export default ProfileStep;
