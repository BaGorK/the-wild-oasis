/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';

import { createEditCabin } from '../../services/apiCabins';
import { useCreateCabin } from './useCreateCabin';

function CreateCabinForm({ cabinToUpdate = {} }) {
  const { id: editId, ...editValues } = cabinToUpdate;
  const isUpdateSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isUpdateSession ? editValues : {},
  });

  const { errors } = formState;

  const queryClient = useQueryClient();
  const { createCabin, isCreating } = useCreateCabin();

  const { mutate: updateCabin, isLoading: isUpdating } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success('cabin successfully updated!');
      queryClient.invalidateQueries({
        queryKey: ['cabin'],
      });
      reset();
    },

    onError: (err) => toast.error(err.message),
  });

  const isWorking = isCreating || isUpdating;

  const submitHandler = (data) => {
    const image = typeof data.image === 'string' ? data.image : data.image[0];

    if (isUpdateSession)
      updateCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          // eslint-disable-next-line no-unused-vars
          onSuccess: (data) => {
            // console.log(data); // this function gets the data that the mutation function returns.
            reset();
          },
        }
      );
    else
      createCabin(
        { ...data, image },
        {
          onSuccess: () => {
            reset();
          },
        }
      );
  };

  const submitErrorHandler = (error) => {
    console.log(error);
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
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label='Maximum capacity' error={errors?.maxCapacity?.message}>
        <Input
          type='number'
          id='maxCapacity'
          disabled={isWorking}
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
          disabled={isWorking}
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
          disabled={isWorking}
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
          disabled={isWorking}
          defaultValue=''
          {...register('description', {
            required: 'this field is required',
          })}
        />
      </FormRow>

      <FormRow label='Cabin photo'>
        <FileInput
          id='image'
          accept='image/*'
          {...register('image', {
            required: isUpdateSession ? false : 'this field is required',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation='secondary' type='reset'>
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isUpdateSession ? 'update cabin' : 'Create new cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
