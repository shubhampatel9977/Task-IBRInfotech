import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUserInfo = createAsyncThunk('getUserInfo', async() => {
    axios.defaults.headers.get['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem("IBR-token"))}`;
    const response = await axios.get(`http://localhost:8080/api/user/details`)
    return response.data.data;
});

export const updateUser = createAsyncThunk('updateUser', async(payload) => {
    axios.defaults.headers.post['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem("IBR-token"))}`;
    const response = await axios.post(`http://localhost:8080/api/user/update`, payload, 
        {
        headers: {
          "Content-Type": "multipart/form-data",
        }}
    )
    return response.data.data;
});

export const getUserList = createAsyncThunk('getUserList', async() => {
    axios.defaults.headers.get['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem("IBR-token"))}`;
    const response = await axios.get(`http://localhost:8080/api/user/all`)
    return response.data.data;
});

export const getRequestList = createAsyncThunk('getRequestList', async() => {
    axios.defaults.headers.get['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem("IBR-token"))}`;
    const response = await axios.get(`http://localhost:8080/api/friends/requests`)
    return response.data.data;
});

export const getFriendsList = createAsyncThunk('getFriendsList', async() => {
    axios.defaults.headers.get['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem("IBR-token"))}`;
    const response = await axios.get(`http://localhost:8080/api/friends/list`)
    return response.data.data;
});

export const sendFriendRequest = createAsyncThunk('sendFriendRequest', async(payload) => {
    axios.defaults.headers.post['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem("IBR-token"))}`;
    const response = await axios.post(`http://localhost:8080/api/friends/send-request`, payload)
    return response.data.data;
});

export const acceptRequest = createAsyncThunk('acceptRequest', async(id) => {
    axios.defaults.headers.post['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem("IBR-token"))}`;
    const response = await axios.post(`http://localhost:8080/api/friends/requests/${id}/accept`)
    return response.data.data;
});

export const declineRequest = createAsyncThunk('declineRequest', async(id) => {
    axios.defaults.headers.delete['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem("IBR-token"))}`;
    const response = await axios.delete(`http://localhost:8080/api/friends/requests/${id}/decline`)
    return response.data.data;
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo: {},
        usersList: [],
        requestList: [],
        friendsList: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUserInfo.fulfilled, (state, action) => {
            state.userInfo = action.payload
        })
        builder.addCase(getUserList.fulfilled, (state, action) => {
            state.usersList = action.payload
        })
        builder.addCase(getRequestList.fulfilled, (state, action) => {
            state.requestList = action.payload
        })
        builder.addCase(getFriendsList.fulfilled, (state, action) => {
            state.friendsList = action.payload
        })
    }
    
});

export default userSlice.reducer;
