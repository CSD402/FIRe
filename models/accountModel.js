import { thunk, action } from 'easy-peasy';
import cookies from 'react-cookies';
import { toast } from 'react-toastify';
import jwt_decode from 'jwt-decode';

// eslint-disable-next-line
export default {
    // STORE
    // 0 -> None
    // 1 -> Citizen
    // 2 -> Police
    type: 0,

    logged_in: false,
    token: null,
    client_data: {},
    police_data: {},

    // THUNKS
    policeLogin: thunk(async (actions, { data, toggleLoader }) => {
        toggleLoader(true);
        fetch(`${process.env.NEXT_PUBLIC_API}/police-officer/login`, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }),
            body: JSON.stringify(data),
        })
            .then(async (resp) => {
                const res = await resp.json();

                if (resp.status === 201) {
                    actions.setToken(res.bearer);

                    let policeData = jwt_decode(res.bearer);
                    actions.setPoliceData(policeData.officer);
                    toast.dark('Logged in Successfully!');
                } else {
                    toast.error(res.message);
                    actions.logout();
                }
            })
            .catch((e) => {
                toast.error('Internal Server Error');
                console.log(e);
                actions.logout();
            })
            .finally(() => {
                toggleLoader(false);
            });
    }),

    clientLogin: thunk(async (actions, { data, toggleLoader }) => {
        toggleLoader(true);
        fetch(`${process.env.NEXT_PUBLIC_API}/user/login/`, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }),
            body: JSON.stringify(data),
        })
            .then(async (resp) => {
                const res = await resp.json();

                if (resp.status === 201) {
                    actions.setToken(res.bearer);

                    let userData = jwt_decode(res.bearer);
                    actions.setClientData(userData.user);
                    toast.dark('Logged in Successfully!');
                } else {
                    toast.error(res.message);
                    actions.logout();
                }
            })
            .catch((e) => {
                toast.error('Internal Server Error');
                console.log(e);
                actions.logout();
            })
            .finally(() => {
                toggleLoader(false);
            });
    }),

    clientRegister: thunk(async (actions, { data, toggleLoader }) => {
        toggleLoader(true);
        console.log(data);
        fetch(`${process.env.NEXT_PUBLIC_API}/user`, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }),
            body: JSON.stringify(data),
        })
            .then(async (resp) => {
                const res = await resp.json();

                if (resp.status === 201) {
                    // console.log(res);
                    actions.setToken(res.bearer);

                    let userData = jwt_decode(res.bearer);
                    // console.log(userData);
                    actions.setClientData(userData.user);
                    toast.dark('Registered in successfully');
                } else {
                    toast.error(res.message);
                    // console.log(res);
                    actions.logout();
                }
            })
            .catch((e) => {
                toast.error('Internal Server Error');
                console.log(e);
                actions.logout();
            })
            .finally(() => {
                toggleLoader(false);
            });
    }),

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
        cookies.save('firetoken', `${token}`);
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
