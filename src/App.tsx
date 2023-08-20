import '@/App.css';
import { Provider } from 'react-redux';
import { StrictMode, Suspense } from 'react';
import router from '@/routes';
import store from '@/store';
import AuthProvider from './features/auth/providers/AuthProvider';
import AppRoutes from '@/routes';

const App = (): JSX.Element => {
  return (
    <StrictMode>
      <AuthProvider>
        <Provider store={store}>
          <div className="App">
            <AppRoutes />
          </div>
        </Provider>
      </AuthProvider>
    </StrictMode>

  );
}

export default App;
