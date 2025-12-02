import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import TransactionForm from '../components/TransactionForm';
import TransactionItem from '../components/TransactionItem';
import Spinner from '../components/Spinner';
import { getTransactions, reset } from '../features/transactions/transactionSlice';

function Dashboard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const { transactions, isLoading, isError, message } = useSelector(
        (state) => state.transactions
    );

    useEffect(() => {
        if (isError) {
            console.log(message);
        }

        if (!user) {
            navigate('/login');
        } else {
            dispatch(getTransactions(user.user_id));
        }

        // return () => {
        //   dispatch(reset());
        // };
    }, [user, navigate, isError, message, dispatch]);

    if (isLoading) {
        return <Spinner />;
    }

    const income = transactions
        .filter(t => t.type === 'income')
        .reduce((acc, t) => acc + t.amount, 0);

    const expense = transactions
        .filter(t => t.type === 'expense')
        .reduce((acc, t) => acc + t.amount, 0);

    const balance = income - expense;

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <section className='heading mb-8'>
                <h1 className="text-4xl font-bold text-gray-800">Welcome {user && user.username}</h1>
                <p className="text-gray-600">Here is your financial dashboard</p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500">
                    <h3 className="text-gray-500 uppercase text-sm font-bold">Balance</h3>
                    <p className="text-2xl font-bold text-gray-800">${balance.toFixed(2)}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-500">
                    <h3 className="text-gray-500 uppercase text-sm font-bold">Income</h3>
                    <p className="text-2xl font-bold text-green-600">${income.toFixed(2)}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-red-500">
                    <h3 className="text-gray-500 uppercase text-sm font-bold">Expense</h3>
                    <p className="text-2xl font-bold text-red-600">${expense.toFixed(2)}</p>
                </div>
            </div>

            <TransactionForm />

            <section className='content'>
                {transactions.length > 0 ? (
                    <div className='transactions'>
                        {transactions.map((transaction) => (
                            <TransactionItem key={transaction.id} transaction={transaction} />
                        ))}
                    </div>
                ) : (
                    <>
                        <h3 className="text-center text-gray-500 mt-8">You have not set any transactions</h3>
                        <pre className="mt-4 p-4 bg-gray-200 rounded text-xs overflow-auto">
                            {JSON.stringify({ transactions, isLoading, isError, message, user }, null, 2)}
                        </pre>
                    </>
                )}
            </section>
        </div>
    );
}

export default Dashboard;
