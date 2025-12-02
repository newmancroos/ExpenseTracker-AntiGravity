import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/transactions';

// Async thunks
export const getTransactions = createAsyncThunk('transactions/getAll', async (userId, thunkAPI) => {
    try {
        const response = await axios.get(API_URL + '?user_id=' + userId);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const addTransaction = createAsyncThunk('transactions/add', async (transactionData, thunkAPI) => {
    try {
        const response = await axios.post(API_URL, transactionData);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const deleteTransaction = createAsyncThunk('transactions/delete', async (id, thunkAPI) => {
    try {
        const response = await axios.delete(API_URL + '/' + id);
        return id;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

const initialState = {
    transactions: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

export const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        reset: (state) => {
            state.transactions = [];
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTransactions.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTransactions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.transactions = action.payload;
            })
            .addCase(getTransactions.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.message;
            })
            .addCase(addTransaction.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addTransaction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.transactions.push(action.payload);
            })
            .addCase(addTransaction.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.message;
            })
            .addCase(deleteTransaction.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteTransaction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.transactions = state.transactions.filter((transaction) => transaction.id !== action.payload);
            })
            .addCase(deleteTransaction.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.message;
            });
    },
});

export const { reset } = transactionSlice.actions;
export default transactionSlice.reducer;
