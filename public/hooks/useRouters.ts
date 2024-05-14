import { CustomerManagementData, RouterData, apiService } from '../services/api';
import { useMutation, useQuery } from 'react-query';

export function useRouters() {
    const query = useQuery({
        queryFn: () => apiService.getAllRouters(),
        queryKey: 'routers',
    });

    return query;
}

export function useCreateRouter() {
    const mutate = useMutation({
        mutationFn: (data: RouterData) => apiService.createRouter(data),
        mutationKey: 'routers',
    });

    return mutate;
}

export function useCustomerAssociation() {
    const mutate = useMutation({
        mutationFn: ({ routerId, data }: { routerId: number; data: CustomerManagementData }) => apiService.customerAssociation(routerId, data),
        mutationKey: 'routers',
    });

    return mutate;
}

export function useUpdateRouter() {
    const mutate = useMutation({
        mutationFn: ({ routerId, data }: { routerId: number; data: RouterData }) => apiService.updateRouter(routerId, data),
        mutationKey: 'routers',
    });

    return mutate;
}

export function useChangeRouterStatus() {
    const mutate = useMutation({
        mutationFn: (routerId: number) => apiService.changeRouterStatus(routerId),
        mutationKey: 'routers',
    });

    return mutate;
}

export function useDeleteRouter() {
    const mutate = useMutation({
        mutationFn: (routerId: number) => apiService.deleteRouter(routerId),
        mutationKey: 'routers',
    });

    return mutate;
}
