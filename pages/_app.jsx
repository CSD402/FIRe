import { StoreProvider, createStore, persist } from 'easy-peasy';
import Layout from '../components/Layout';
import model from '../models/index';
import { ToastContainer } from 'react-toastify';

import 'reactjs-popup/dist/index.css';
import 'react-toastify/dist/ReactToastify.css';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';
import '../styles/map.css';
import '../styles/globals.css';
import '../styles/google-translate.css';

const store = createStore(persist(model, { allow: ['accountModel'] }));

function MyApp({ Component, pageProps }) {
    return (
        <StoreProvider store={store}>
            <ToastContainer />
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </StoreProvider>
    );
}
export default MyApp;
