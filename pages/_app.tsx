import type { AppProps } from 'next/app';
import { StoreProvider, createStore, persist } from 'easy-peasy';
import Layout from '../components/Layout';
import model from '../models/index';
import { ToastContainer, toast } from 'react-toastify';

import 'reactjs-popup/dist/index.css';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';

const store = createStore(persist(model, { allow: ['accountModel'] }));

function MyApp({ Component, pageProps }: AppProps) {
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
