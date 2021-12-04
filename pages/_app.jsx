import { useEffect } from 'react';
import useScript from '../hooks/useScript';
import { StoreProvider, createStore, persist } from 'easy-peasy';
import Layout from '../components/Layout';
import model from '../models/index';
import { ToastContainer } from 'react-toastify';

import 'reactjs-popup/dist/index.css';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';

const store = createStore(persist(model, { allow: ['accountModel'] }));

function MyApp({ Component, pageProps }) {
    useScript(
        'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit',
    );
    const googleTranslateElementInit = () => {
        /* eslint-disable no-new */
        new window.google.translate.TranslateElement(
            {
                pageLanguage: 'hi',
                layout: window.google.translate.TranslateElement.FloatPosition
                    .TOP_LEFT,
            },
            'google_translate_element',
        );
    };

    useEffect(() => {
        window.googleTranslateElementInit = googleTranslateElementInit;
    }, []);

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
