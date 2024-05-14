import { apiService } from '../services/api';
import { useQuery } from 'react-query';

export function useLogs(action: string) {
    const query = useQuery({
        queryKey: ['logs', action],
        queryFn: ({ queryKey }) => {
            const [_key, action] = queryKey;
            return apiService.getAllLogs(action);
        },
    });

    return query;
}
