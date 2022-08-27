export const getToken = () => {
    const token =
        localStorage.getItem('token-user-zm3') !== 'undefined'
            ? localStorage.getItem('token-user-zm3')
            : localStorage.removeItem('token-user-zm3');

    return token;
};
