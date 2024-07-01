import React from 'react';
import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Loading from './components/Loading';

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(), // In-memory cache for Apollo Client
});

const App: React.FC = () => (
    <ApolloProvider client={client}>
        <Router>
            <React.Suspense fallback={<Loading />}>
                <Switch>
                    <Route path="/" component={LandingPage} exact />
                </Switch>
            </React.Suspense>
        </Router>
    </ApolloProvider>
);

export default App;
