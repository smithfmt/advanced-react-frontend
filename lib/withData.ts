import withApollo, { InitApolloClient } from 'next-with-apollo';
import ApolloClient, { Operation } from 'apollo-boost';
import { endpoint } from '../config';

interface CreateClientProps {
  headers?: Record<string, string | string[] | undefined>;
}

const createClient: InitApolloClient<CreateClientProps> = ({ headers }: CreateClientProps): ApolloClient<CreateClientProps> => {
  return new ApolloClient<CreateClientProps>({
    uri: process.env.NODE_ENV === 'development' ? endpoint : endpoint,
    request: async (operation: Operation): Promise<void> => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
        },
        headers,
      });
    },
  });
};

export default withApollo<CreateClientProps>(createClient);