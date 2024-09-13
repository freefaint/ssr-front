import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@/6_shared/lib/reactQuery';

export const withQueryClient = (component: () => React.ReactNode) => () =>
	(
		<QueryClientProvider client={queryClient}>
			{component()}
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
