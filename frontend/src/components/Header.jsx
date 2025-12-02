import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/');
    };

    return (
        <header className='header flex justify-between items-center p-5 border-b border-gray-200 bg-white shadow-sm'>
            <div className='logo font-bold text-xl'>
                <Link to='/'>ExpenseTracker</Link>
            </div>
            <ul className='flex items-center space-x-4'>
                {user ? (
                    <li>
                        <button className='btn flex items-center space-x-2 text-gray-600 hover:text-gray-900' onClick={onLogout}>
                            <FaSignOutAlt /> <span>Logout</span>
                        </button>
                    </li>
                ) : (
                    <>
                        <li>
                            <Link to='/login' className='flex items-center space-x-2 text-gray-600 hover:text-gray-900'>
                                <FaSignInAlt /> <span>Login</span>
                            </Link>
                        </li>
                        <li>
                            <Link to='/register' className='flex items-center space-x-2 text-gray-600 hover:text-gray-900'>
                                <FaUser /> <span>Register</span>
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </header>
    );
}

export default Header;
