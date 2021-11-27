import { thunk, action } from 'easy-peasy';
import cookies from 'react-cookies';
import { toast } from 'react-toastify';

// eslint-disable-next-line
export default {
    // STORE
    // 0 -> None
    // 1 -> Citizen
    // 2 -> Police
    type: 1,

    logged_in: false,
    token: null,
    client_data: {},
    police_data: {},

    // THUNKS
    policeLogin: thunk(
        async (
            actions,
            {
                email,
                password,
                //  toggleLoader
            },
        ) => {
            fetch(`/api/police/auth/login/`, {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                }),
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            })
                .then(async (resp) => {
                    const res = await resp.json();

                    if (resp.status === 202) {
                        actions.setToken(res.token);
                        actions.setPoliceData(res.police_data);
                        toast.dark('Logged in Successfully!');
                    } else {
                        toast.error(res.message);
                        actions.logout();
                    }
                })
                .catch((e) => {
                    toast.error('Internal Server Error');
                    // console.log(e);
                    actions.logout();
                })
                .finally(() => {
                    // toggleLoader(false);
                });
        },
    ),

    clientLogin: thunk(
        async (
            actions,
            {
                email,
                password,
                //  toggleLoader
            },
        ) => {
            fetch(`/api/client/auth/login/`, {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                }),
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            })
                .then(async (resp) => {
                    const res = await resp.json();

                    if (resp.status === 202) {
                        actions.setToken(res.token);
                        actions.setClientData(res.client_data);
                        toast.dark('Logged in Successfully!');
                    } else {
                        toast.error(res.message);
                        actions.logout();
                    }
                })
                .catch((e) => {
                    toast.error('Internal Server Error');
                    // console.log(e);
                    actions.logout();
                })
                .finally(() => {
                    // toggleLoader(false);
                });
        },
    ),

    clientRegister: thunk(
        async (
            actions,
            {
                email,
                password,
                fullName,
                number,
                aadhar,
                address,
                // toggleLoader,
            },
        ) => {
            fetch(`/api/auth/register/`, {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                }),
                body: JSON.stringify({
                    email: email,
                    password: password,
                    full_name: fullName,
                    number: number,
                    aadhar: aadhar,
                    address: address,
                }),
            })
                .then(async (resp) => {
                    const res = await resp.json();

                    if (resp.status === 201) {
                        // console.log(res);
                        actions.setToken(res.token);
                        actions.setClientData(res.client_data);
                        toast.dark('Registered in successfully');
                    } else {
                        toast.error(res.message);
                        // console.log(res);
                        actions.logout();
                    }
                })
                .catch((e) => {
                    toast.error('Internal Server Error');
                    // console.log(e);
                    actions.logout();
                })
                .finally(() => {
                    toggleLoader(false);
                });
        },
    ),

    verifyUser: thunk(async (actions) => {
        let savedToken = cookies.load('firetoken');

        if (savedToken === undefined) {
            actions.logout();
        } else
            fetch(`/api/auth/verifyUser`, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Authorization: savedToken,
                }),
            })
                .then(
                    async (res) => {
                        let resp = await res.json();

                        if (res.status === 202)
                            actions.setClientData(resp.client_data);
                        else {
                            actions.logout();
                        }
                    },
                    (err) => {
                        // console.log(err);
                        actions.logout();
                    },
                )
                .catch((e) => {
                    // console.log(e);
                    actions.logout();
                });
    }),

    // ACTIONS
    setToken: action(async (state, token) => {
        cookies.save('firetoken', `Token ${token}`, {
            expires: new Date('03-23-2022'),
        });
        state.token = token;
    }),
    setClientData: action(async (state, data) => {
        const token = cookies.load('firetoken');
        state.token = token;
        state.logged_in = true;
        state.client_data = data;
        state.type = 1;
    }),
    setPoliceData: action(async (state, data) => {
        const token = cookies.load('firetoken');
        state.token = token;
        state.logged_in = true;
        state.police_data = data;
        state.type = 2;
    }),
    logout: action((state) => {
        // console.log('Logging out');
        cookies.remove('firetoken');
        state.type = 0;
        state.logged_in = false;
        state.token = null;
        state.client_data = {};
    }),
};
