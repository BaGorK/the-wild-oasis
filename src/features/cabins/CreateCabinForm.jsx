import styled from 'styled-components';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createCabin } from '../../services/apiCabins';
import FormRow from '../../ui/FormRow';

const FormRow2 = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();

  const { errors } = formState;
  console.log(errors);

  const queryClient = useQueryClient();
  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success('new cabin successfully created!');
      queryClient.invalidateQueries({
        queryKey: ['cabin'],
      });
      reset();
    },

    onError: (err) => toast.error(err.message),
  });

  const submitHandler = (data) => {
    mutate(data);
  };

  const submitErrorHandler = (error) => {
    // console.log(error);
  };

  return (
    <Form onSubmit={handleSubmit(submitHandler, submitErrorHandler)}>
      <FormRow label='Cabin name' error={errors?.name?.message}>
        <Input
          {...register('name', {
            required: 'this field is required',
          })}
          type='text'
          id='name'
          disabled={isCreating}
        />
      </FormRow>

      <FormRow label='Maximum capacity' error={errors?.maxCapacity?.message}>
        <Input
          type='number'
          id='maxCapacity'
          disabled={isCreating}
          {...register('maxCapacity', {
            required: 'this field is required',
            min: {
              value: 1,
              message: 'capacity should be atleast one',
            },
          })}
        />
      </FormRow>

      <FormRow error={errors?.regularPrice?.message} label='Regular price'>
        <Input
          type='number'
          id='regularPrice'
          disabled={isCreating}
          {...register('regularPrice', {
            required: 'this field is required',
            min: {
              value: 1,
              message: 'capacity should be atleast one',
            },
          })}
        />
      </FormRow>

      <FormRow error={errors?.discount?.message} label='Discount'>
        <Input
          type='number'
          id='discount'
          disabled={isCreating}
          defaultValue={0}
          {...register('discount', {
            required: 'this field is required',
            validate: (value) =>
              value <= getValues().regularPrice ||
              'Discount should be less than the regular price',
          })}
        />
      </FormRow>

      <FormRow
        error={errors?.description?.message}
        label='Description for website'
      >
        <Textarea
          type='number'
          id='description'
          disabled={isCreating}
          defaultValue=''
          {...register('description', {
            required: 'this field is required',
          })}
        />
      </FormRow>

      <FormRow label='Cabin photo'>
        <FileInput id='image' accept='image/*' />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation='secondary' type='reset'>
          Cancel
        </Button>
        <Button disabled={isCreating}>Edit cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
