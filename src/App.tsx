import '@/App.css';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { StrictMode } from 'react';
import router from '@/routes';
import store from '@/store';
import AuthProvider from './features/auth/providers/AuthProvider';

const App = (): JSX.Element => {
  return (
    <StrictMode>
      <AuthProvider>
        <Provider store={store}>
          <div className="App">
            <RouterProvider router={router} />
          </div>
        </Provider>
      </AuthProvider>
    </StrictMode>

  );
}

export default App;
