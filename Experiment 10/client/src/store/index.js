import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Defaults
axios.defaults.withCredentials = true;
const API_URL = 'http://localhost:3010/api';

// --- Auth & Todo Async Thunks ---
export const fetchUser = createAsyncThunk('auth/fetchUser', async () => {
    const res = await axios.get(`${API_URL}/auth/me`);
    return res.data.user;
});

export const loginUser = createAsyncThunk('auth/login', async (credentials) => {
    const res = await axios.post(`${API_URL}/auth/login`, credentials);
    return res.data.user;
});

export const logoutUser = createAsyncThunk('auth/logout', async () => {
    await axios.get(`${API_URL}/auth/logout`);
    return null;
});

// Todo Thunks (Level 1)
export const addTodo = createAsyncThunk('auth/addTodo', async (text) => {
    const res = await axios.post(`${API_URL}/auth/todos`, { text });
    return res.data.todos;
});

export const toggleTodo = createAsyncThunk('auth/toggleTodo', async (id) => {
    const res = await axios.put(`${API_URL}/auth/todos/${id}`);
    return res.data.todos;
});

export const deleteTodo = createAsyncThunk('auth/deleteTodo', async (id) => {
    const res = await axios.delete(`${API_URL}/auth/todos/${id}`);
    return res.data.todos;
});

// --- Auth Slice ---
const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, loading: true, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.fulfilled, (state, action) => { state.user = action.payload; state.loading = false; })
            .addCase(fetchUser.rejected, (state) => { state.user = null; state.loading = false; })
            .addCase(loginUser.fulfilled, (state, action) => { state.user = action.payload; })
            .addCase(loginUser.rejected, (state, action) => { state.error = action.error.message; })
            .addCase(logoutUser.fulfilled, (state) => { state.user = null; })
            .addCase(addTodo.fulfilled, (state, action) => { state.user.todos = action.payload; })
            .addCase(toggleTodo.fulfilled, (state, action) => { state.user.todos = action.payload; })
            .addCase(deleteTodo.fulfilled, (state, action) => { state.user.todos = action.payload; });
    }
});

// --- Post Slice (Level 2/3) ---
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const res = await axios.get(`${API_URL}/post`);
    return res.data.data;
});

export const createPost = createAsyncThunk('posts/createPost', async (content) => {
    const res = await axios.post(`${API_URL}/post`, { content });
    return res.data.data;
});

export const toggleLike = createAsyncThunk('posts/toggleLike', async (id) => {
    const res = await axios.put(`${API_URL}/post/${id}/like`);
    return { id, likes: res.data.likes };
});

const postSlice = createSlice({
    name: 'posts',
    initialState: { items: [], loading: false },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => { state.loading = true; })
            .addCase(fetchPosts.fulfilled, (state, action) => { state.items = action.payload; state.loading = false; })
            .addCase(createPost.fulfilled, (state, action) => { state.items.unshift(action.payload); })
            .addCase(toggleLike.fulfilled, (state, action) => {
                const post = state.items.find(p => p._id === action.payload.id);
                if (post) post.likes = action.payload.likes;
            });
    }
});

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        posts: postSlice.reducer
    }
});
