import '@/App.css';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import router from '@/routes';
import store from '@/store';

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </Provider>
  );
}

export default App;
