const privateRouter = (navigate, token, location) => {
    if (token) {
        navigate('/');
    } else {
        if (location.pathname != '/signUp') {
            navigate('/SignIn');
        } else {
            navigate('/signUp');
        }
    }
};
export default privateRouter;
