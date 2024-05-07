import './App.css';
import { Provider } from 'react-redux';
import { ReactElement, StrictMode } from 'react';
import store from '@/store';
import AuthProvider from '@/features/auth/providers/AuthProvider';
import AppRoutes from '@/routes';
import { ErrorBoundary } from 'react-error-boundary';
import RouteErrorFallback from '@/components/RouteErrorFallback';

const App = (): ReactElement => {
  return (
    <StrictMode>
      <ErrorBoundary FallbackComponent={RouteErrorFallback}>
        <AuthProvider>
          <Provider store={store}>
            <div className="App">
              <AppRoutes />
            </div>
          </Provider>
        </AuthProvider>
      </ErrorBoundary>
    </StrictMode>

  );
}

export default App;
