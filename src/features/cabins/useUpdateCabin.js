import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export function useUpdateCabin() {
  const queryClient = useQueryClient();

  const { mutate: updateCabin, isLoading: isUpdating } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success('cabin successfully updated!');
      queryClient.invalidateQueries({
        queryKey: ['cabin'],
      });
    },

    onError: (err) => toast.error(err.message),
  });

  return { updateCabin, isUpdating };
}
