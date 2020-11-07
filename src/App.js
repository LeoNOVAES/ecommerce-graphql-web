import logo from './logo.svg';
import './App.css';

import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client' 
import UploadForm from './components/UploadForm';


const client = new ApolloClient({
  link: createUploadLink({
    uri: 'http://localhost:3000/graphql'
  }),
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <UploadForm></UploadForm>
    </ApolloProvider>  
  );
}

export default App;
