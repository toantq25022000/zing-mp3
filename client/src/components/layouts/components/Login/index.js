import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from '@material-ui/lab';

import Image from '../Image';
import styles from './Login.module.scss';
import FormControl from '../FormControl';
import FormInput from '../FormInput';
import { authSlice } from '~/redux/features/auth/authSlice';
import instance from '~/utils/axios';
import LoaderWithOVerlay from '../LoaderWithOverLay';

const cx = classNames.bind(styles);

function Login() {
    const [textDontHaveAcc, setTextDontHaveAcc] = useState('');
    const [pathName, setPathName] = useState('');
    const [title, setTitle] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [disabledBtnSubmit, setDisabledBtnSubmit] = useState(true);
    const [error, setError] = useState({
        fullName: {
            invalid: false,
            message: '',
        },
        emailExist: {
            invalid: false,
            isLock: false,
            message: '',
        },
        emailInvalid: {
            invalid: false,
            message: '',
        },
    });

    const [loading, setLoading] = useState(false);
    const [messageError, setMessageError] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.toke);
    const passwordRef = useRef();
    const emailRef = useRef();

    const checkErrorBeforeSubmit = () => {
        switch (pathName) {
            case '/login':
                if (email.length === 0) {
                    setDisabledBtnSubmit(true);
                    return;
                }
                if (error.emailExist.isLock && password.length >= 8) {
                    setDisabledBtnSubmit(false);
                } else {
                    setDisabledBtnSubmit(true);
                }

                break;

            default:
                if (
                    !error.fullName.invalid &&
                    error.emailExist.isLock &&
                    !error.emailInvalid.invalid &&
                    password.length >= 8
                ) {
                    setDisabledBtnSubmit(false);
                } else {
                    setDisabledBtnSubmit(true);
                }
                break;
        }
    };

    useEffect(() => {
        const handlePathNameUrl = () => {
            const pathNameUrl = window.location.pathname;
            setPathName(pathNameUrl);
            setTextDontHaveAcc(pathNameUrl === '/login' ? 'Bạn chưa có tài khoản? ' : 'Bạn đã có tài khoản? ');
            setTitle(pathNameUrl === '/login' ? 'Đăng nhập vào Zing MP3' : 'Đăng ký tài khoản Zing MP3');
        };

        handlePathNameUrl();
    }, [navigate, dispatch, token]);

    useEffect(() => {
        if (user) {
            navigate('/');
        }
        handleResetValueInput();
    }, [navigate, user]);

    useEffect(() => {
        checkErrorBeforeSubmit();
    });

    const handleSignUpSignIn = (e) => {
        e.preventDefault();

        navigate(pathName === '/login' ? '/register' : '/login');
    };

    const handleResetValueInput = () => {
        passwordRef.current.value = '';
        emailRef.current.value = '';
        setDisplayName('');
        setEmail('');
        setPassword('');
        setMessageError('');
        setError((prev) => ({
            ...prev,
            fullName: {
                invalid: false,
                message: '',
            },
            emailInvalid: {
                invalid: false,
                message: '',
            },
            emailExist: {
                invalid: false,
                message: '',
            },
        }));
    };

    const handleFullName = (value) => {
        const trimValue = value.trim();
        const lengthTrimSplitValue = value.trim().split(' ').length;

        const splitFullName = value.split(' ')[2] === '' && value.split(' ')[2] === 'undefined';
        const checkLengAndValueSplit =
            trimValue.split(' ').length > 1 && trimValue.split(' ')[lengthTrimSplitValue - 1];

        const checkValidFullName = !!trimValue && !!checkLengAndValueSplit ? true : splitFullName;

        setError((prev) => ({
            ...prev,
            fullName: {
                invalid: !checkValidFullName,
                message: checkValidFullName ? '' : 'Tên của bạn không hợp lệ',
            },
        }));
    };

    const handleBlurFullName = (e) => {
        handleFullName(e.target.value);
    };

    const handleChangeFullName = (e) => {
        setDisplayName(e.target.value);
        handleFullName(e.target.value);
    };

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const handelChangeEmail = async (e) => {
        setEmail(e.target.value);

        const valueEmail = e.target.value.trim();

        if (valueEmail.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/)) {
            setError((prev) => ({
                ...prev,
                emailInvalid: {
                    invalid: false,
                    message: '',
                },
            }));
            try {
                const checkExistEmail = await instance.get(`auth/check-exists?field=email&value=${valueEmail}`);

                if (pathName === '/login' ? !checkExistEmail.is_exists : checkExistEmail.is_exists) {
                    setError((prev) => ({
                        ...prev,
                        emailExist: {
                            invalid: true,
                            isLock: false,
                            message: pathName !== '/login' ? 'Email đã được sử dụng' : 'Email chưa được sử dụng',
                        },
                    }));

                    return;
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            setError((prev) => ({
                ...prev,
                emailExist: {
                    invalid: false,
                    isLock: false,
                    message: '',
                },
            }));

            return;
        }
        setError((prev) => ({
            ...prev,
            emailExist: {
                invalid: false,
                isLock: true,
                message: '',
            },
        }));
    };

    const handleBlurEmail = (e) => {
        const valueEmail = e.target.value.trim();

        if (!valueEmail.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            setError((prev) => ({
                ...prev,
                emailInvalid: {
                    invalid: true,
                    message: 'Email không hợp lệ',
                },
            }));
        } else {
            setError((prev) => ({
                ...prev,
                emailInvalid: {
                    invalid: false,
                    message: '',
                },
            }));
        }
    };

    const handleRegisterWithEmail = async () => {
        if (disabledBtnSubmit) return;
        try {
            const getSignupWithEmail = await instance.post('auth/signup-with-email', {
                email,
                password,
                full_name: displayName,
            });

            dispatch(authSlice.actions.setToken(getSignupWithEmail.accessToken));
            localStorage.setItem('token-user-zm3', getSignupWithEmail.accessToken);

            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    const handleLoginWithEmail = async () => {
        if (disabledBtnSubmit) return;
        try {
            setLoading(true);
            setTimeout(() => {}, 2000);
            setMessageError('');
            const response = await instance.post('/auth/login', {
                email,
                password,
            });
            if (response) {
                dispatch(authSlice.actions.setToken(response.accessToken));
                localStorage.setItem('token-user-zm3', response.accessToken);
                // setLoading(false);
                navigate('/');
            }
        } catch (error) {
            setMessageError(error.response.data.message);
        }
        setLoading(false);
    };

    const handleKeydownEnterPassword = (e) => {
        if (e.key === 'Enter') {
            pathName === '/login' ? handleLoginWithEmail() : handleRegisterWithEmail();
        }
    };

    return (
        <div className={cx('wrapper', 'hasBg')}>
            {loading && <LoaderWithOVerlay />}
            <div className={cx('container')}>
                <div className={cx('content')}>
                    <div className={cx('header')}>
                        <Link to="/">
                            <Image
                                className={cx('logo')}
                                src="https://upload.wikimedia.org/wikipedia/vi/5/5e/Zing_official_logo.png"
                                alt="logo"
                            />
                        </Link>
                        <h1 className={cx('title')}>{title}</h1>
                    </div>

                    <div className={cx('body')}>
                        <div className={cx('mainStep')}>
                            {messageError && (
                                <Alert severity="error" style={{ width: '100%', fontSize: '1.4rem' }}>
                                    {messageError}
                                </Alert>
                            )}
                            <div className={cx('formBody')}>
                                {pathName === '/register' && (
                                    <FormControl>
                                        <FormInput
                                            label="Tên của bạn?"
                                            placeholder="Họ và tên của bạn"
                                            name="display_name"
                                            maxLength="50"
                                            defaultValue={displayName}
                                            autoComplete="off"
                                            invalid={error.fullName.invalid}
                                            message={error.fullName.message}
                                            onChange={handleChangeFullName}
                                            onBlur={handleBlurFullName}
                                        ></FormInput>
                                    </FormControl>
                                )}
                                <FormControl>
                                    <FormInput
                                        inputRef={emailRef}
                                        label="Email"
                                        placeholder="Địa chỉ email"
                                        name="email"
                                        maxLength="50"
                                        defaultValue={email}
                                        invalid={error.emailExist.invalid || error.emailInvalid.invalid}
                                        message={error.emailExist.message || error.emailInvalid.message}
                                        onChange={handelChangeEmail}
                                        onBlur={pathName === '/register' ? handleBlurEmail : () => {}}
                                    ></FormInput>
                                </FormControl>

                                <FormControl>
                                    <FormInput
                                        inputRef={passwordRef}
                                        placeholder="Mật khẩu"
                                        name="password"
                                        type="password"
                                        maxLength="50"
                                        defaultValue={password}
                                        autoComplete="password"
                                        help={pathName === '/register' && 'Gợi ý: Mật khẩu cần có ít nhất 8 kí tự'}
                                        onChange={handleChangePassword}
                                        onKeyDown={handleKeydownEnterPassword}
                                    ></FormInput>
                                </FormControl>

                                <button
                                    className={cx('submitBtn')}
                                    onClick={pathName === '/login' ? handleLoginWithEmail : handleRegisterWithEmail}
                                    disabled={loading || disabledBtnSubmit}
                                >
                                    <span className={cx('btnText')}>
                                        {pathName === '/login' ? 'Đăng nhập' : 'Đăng ký'}
                                    </span>
                                </button>
                            </div>
                        </div>
                        <p className={cx('dontHaveAcc')}>
                            {textDontHaveAcc}
                            <Link to={pathName === '/login' ? '/register' : '/login'} onClick={handleSignUpSignIn}>
                                {pathName === '/login' ? 'Đăng ký' : 'Đăng nhập'}
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
