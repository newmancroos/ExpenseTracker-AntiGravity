import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTransaction } from '../features/transactions/transactionSlice';
import { useSelector } from 'react-redux';

function TransactionForm() {
    const [text, setText] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('Other');
    const [type, setType] = useState('expense');

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const onSubmit = (e) => {
        e.preventDefault();

        dispatch(addTransaction({
            user_id: user.user_id,
            description: text,
            amount: +amount,
            category,
            type,
            date: new Date().toISOString()
        }));
        setText('');
        setAmount(0);
    };

    return (
        <section className='form mb-10'>
            <form onSubmit={onSubmit} className="bg-white p-6 rounded-lg shadow-md">
                <div className='form-group mb-4'>
                    <label htmlFor='text' className="block text-gray-700 font-bold mb-2">Description</label>
                    <input
                        type='text'
                        name='text'
                        id='text'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className='form-group mb-4'>
                    <label htmlFor='amount' className="block text-gray-700 font-bold mb-2">Amount</label>
                    <input
                        type='number'
                        name='amount'
                        id='amount'
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex gap-4 mb-4">
                    <div className='form-group flex-1'>
                        <label htmlFor='type' className="block text-gray-700 font-bold mb-2">Type</label>
                        <select name="type" id="type" value={type} onChange={(e) => setType(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>
                    </div>
                    <div className='form-group flex-1'>
                        <label htmlFor='category' className="block text-gray-700 font-bold mb-2">Category</label>
                        <input
                            type='text'
                            name='category'
                            id='category'
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
                <div className='form-group'>
                    <button className='btn btn-block w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300' type='submit'>
                        Add Transaction
                    </button>
                </div>
            </form>
        </section>
    );
}

export default TransactionForm;
