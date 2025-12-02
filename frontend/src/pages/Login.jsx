import { useState, useEffect } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';

function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const { username, password } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess || user) {
            navigate('/');
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const userData = {
            username,
            password,
        };

        dispatch(login(userData));
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                <section className='heading text-center mb-6'>
                    <h1 className='text-3xl font-bold flex justify-center items-center gap-2 mb-2'>
                        <FaSignInAlt /> Login
                    </h1>
                    <p className='text-gray-600'>Login and start tracking</p>
                </section>

                <section className='form'>
                    <form onSubmit={onSubmit}>
                        <div className='form-group mb-4'>
                            <input
                                type='text'
                                className='form-control w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                                id='username'
                                name='username'
                                value={username}
                                placeholder='Enter your username'
                                onChange={onChange}
                            />
                        </div>
                        <div className='form-group mb-6'>
                            <input
                                type='password'
                                className='form-control w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                                id='password'
                                name='password'
                                value={password}
                                placeholder='Enter password'
                                onChange={onChange}
                            />
                        </div>
                        <div className='form-group'>
                            <button type='submit' className='btn btn-block w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition duration-300'>
                                Submit
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
}

export default Login;
