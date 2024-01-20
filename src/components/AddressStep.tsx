import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Typography, MenuItem } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FormAddressValues } from './Form';
import axios from 'axios';

interface AddressStepProps {
  onPrev: () => void;
  onSubmit: (data: FormAddressValues) => void;
}

const schema = yup.object().shape({
  address: yup.string().optional(),
  state: yup.string().optional(),
  city: yup.string().optional(),
  country: yup.string().optional(),
  pincode: yup.string().optional().matches(/^\d+$/, 'Invalid Pincode (Numeric only)'),
});

const AddressStep: React.FC<AddressStepProps> = ({ onPrev, onSubmit }) => {

  const [countryOptions, setCountryOptions] = useState<string[]>([]);

  useEffect(() => {
    const fetchCountryOptions = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const countries = response.data.map((country: any) => country.name.common);
        setCountryOptions(countries);
      } catch (error) {
        console.error('Error fetching country options:', error);
      }
    };

    fetchCountryOptions();
  }, []);

  const { register, handleSubmit, formState: { errors } } = useForm<FormAddressValues>({
    resolver: yupResolver(schema),
  });

  const handlePrev = () => {
    onPrev();
  };

  const onSubmitStep2: SubmitHandler<FormAddressValues> = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitStep2)} className='form-container'>
      <Typography variant="h6">Step 2: Address Detail</Typography>
      <TextField label="Address" {...register('address')} fullWidth margin="normal" />
      <div className="line-container">
        <TextField label="State" {...register('state')} fullWidth margin="normal" />
        <TextField label="City" {...register('city')} fullWidth margin="normal" />
      </div>
      <div className="line-container">
        <TextField
          label="Country"
          select
          {...register('country')}
          fullWidth
          margin="normal"
        >
          {countryOptions.map((country) => (
            <MenuItem key={country} value={country}>
              {country}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Pincode"
          {...register('pincode')}
          fullWidth
          margin="normal"
          error={!!errors.pincode}
          helperText={errors.pincode?.message}
        />
      </div>
      <div className='btn'>
        <Button type="button" variant="outlined" fullWidth onClick={handlePrev} className='button outlined'>
          Back
        </Button>
        <Button type="submit" variant="contained" fullWidth color="primary" className='button'>
          Submit
        </Button>
      </div>
    </form>
  );
};

export default AddressStep;
