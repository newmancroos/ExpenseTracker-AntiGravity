import { useDispatch } from 'react-redux';
import { deleteTransaction } from '../features/transactions/transactionSlice';
import { FaTrash } from 'react-icons/fa';

function TransactionItem({ transaction }) {
    const dispatch = useDispatch();

    return (
        <div className={`transaction flex justify-between items-center p-4 mb-2 rounded-lg shadow-sm border-l-4 ${transaction.type === 'income' ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}`}>
            <div>
                <h3 className="font-bold text-gray-800">{transaction.description}</h3>
                <p className="text-sm text-gray-500">{new Date(transaction.date).toLocaleDateString()} - {transaction.category}</p>
            </div>
            <div className="flex items-center gap-4">
                <span className={`font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.type === 'income' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
                </span>
                <button onClick={() => dispatch(deleteTransaction(transaction.id))} className="text-gray-400 hover:text-red-500 transition duration-300">
                    <FaTrash />
                </button>
            </div>
        </div>
    );
}

export default TransactionItem;
