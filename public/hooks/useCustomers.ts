import { CustomerData, apiService } from '../services/api';
import { useMutation, useQuery } from 'react-query';

export function useCustomers() {
    const query = useQuery({
        queryFn: () => apiService.getAllCustomers(),
        queryKey: 'customers',
    });

    return query;
}

export function useCustomersToAdd() {
    const query = useQuery({
        queryFn: () => apiService.getCustomersToAdd(),
        queryKey: 'customers',
    });

    return query;
}

export function useCreateCustomer() {
    const mutate = useMutation({
        mutationFn: (data: CustomerData) => apiService.createCustomer(data),
        mutationKey: 'customers',
    });

    return mutate;
}

export function useUpdateCustomer() {
    const mutate = useMutation({
        mutationFn: ({ customerId, data }: { customerId: number; data: CustomerData }) => apiService.updateCustomer(customerId, data),
        mutationKey: 'customers',
    });

    return mutate;
}

export function useChangeCustomerStatus() {
    const mutate = useMutation({
        mutationFn: (customerId: number) => apiService.changeCustomerStatus(customerId),
        mutationKey: 'customers',
    });

    return mutate;
}

export function useDeleteCustomer() {
    const mutate = useMutation({
        mutationFn: (customerId: number) => apiService.deleteCustomer(customerId),
        mutationKey: 'customers',
    });

    return mutate;
}
