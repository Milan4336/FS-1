import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// ============================================================
// DEMO MODE — All data lives in localStorage. No backend needed.
// Pre-loaded demo accounts:
//   shepard@nexus.io  / demo123  (Admin)
//   garrus@nexus.io   / demo123  (User)
// ============================================================

const FAKE_DELAY = 500;
const delay = (ms = FAKE_DELAY) => new Promise(r => setTimeout(r, ms));

// --- Persistent localStorage helpers ---
const load = (key, fallback) => {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
};
const save = (key, value) => localStorage.setItem(key, JSON.stringify(value));

// --- Demo Seed Data ---
const SEED_USERS = {
    'shepard@nexus.io': {
        _id: 'u1', name: 'Commander Shepard', email: 'shepard@nexus.io',
        role: 'admin', password: 'demo123',
        todos: [
            { _id: 't1', text: 'Verify Citadel Security', completed: true },
            { _id: 't2', text: 'Calibrate Main Battery', completed: false },
        ]
    },
    'garrus@nexus.io': {
        _id: 'u2', name: 'Garrus Vakarian', email: 'garrus@nexus.io',
        role: 'user', password: 'demo123',
        todos: [
            { _id: 't3', text: 'Spotting for Shepard', completed: true }
        ]
    }
};

const SEED_POSTS = [
    {
        _id: 'p1',
        content: 'The Nexus is officially operational. All systems are green. Transmitting status to all sectors.',
        author: { _id: 'u1', name: 'Commander Shepard' },
        likes: ['u2'],
        comments: [],
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString()
    },
    {
        _id: 'p2',
        content: 'Calibration complete. Does anyone have a spare thermal clip?',
        author: { _id: 'u2', name: 'Garrus Vakarian' },
        likes: [],
        comments: [],
        createdAt: new Date(Date.now() - 3600000).toISOString()
    }
];

// Initialize localStorage with seed data if first time
const initStorage = () => {
    if (!localStorage.getItem('nexus_e10_users')) {
        save('nexus_e10_users', SEED_USERS);
    }
    if (!localStorage.getItem('nexus_e10_posts')) {
        save('nexus_e10_posts', SEED_POSTS);
    }
};
initStorage();

// --- Helpers to read/write from localStorage ---
const getUsers = () => load('nexus_e10_users', SEED_USERS);
const getPosts = () => load('nexus_e10_posts', SEED_POSTS);
const savePosts = (posts) => save('nexus_e10_posts', posts);
const saveUsers = (users) => save('nexus_e10_users', users);

// ============================================================
// AUTH THUNKS
// ============================================================
export const fetchUser = createAsyncThunk('auth/fetchUser', async (_, { rejectWithValue }) => {
    const session = load('nexus_e10_session', null);
    if (!session) return rejectWithValue('No session');
    const users = getUsers();
    const user = users[session.email];
    if (!user) return rejectWithValue('User not found');
    const { password, ...safe } = user;
    return safe;
});

export const loginUser = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
    await delay();
    const users = getUsers();
    const user = users[credentials.email?.toLowerCase()];
    if (!user || user.password !== credentials.password) {
        return rejectWithValue('Invalid credentials. Try demo123.');
    }
    const { password, ...safe } = user;
    save('nexus_e10_session', { email: safe.email });
    return safe;
});

export const logoutUser = createAsyncThunk('auth/logout', async () => {
    localStorage.removeItem('nexus_e10_session');
    return null;
});

// ============================================================
// TODO THUNKS
// ============================================================
const genId = () => '_' + Math.random().toString(36).substr(2, 9);

export const addTodo = createAsyncThunk('auth/addTodo', async (text, { getState }) => {
    await delay(300);
    const { user } = getState().auth;
    const users = getUsers();
    const u = users[user.email];
    u.todos.push({ _id: genId(), text, completed: false });
    saveUsers(users);
    return u.todos;
});

export const toggleTodo = createAsyncThunk('auth/toggleTodo', async (id, { getState }) => {
    await delay(200);
    const { user } = getState().auth;
    const users = getUsers();
    const u = users[user.email];
    const todo = u.todos.find(t => t._id === id);
    if (todo) todo.completed = !todo.completed;
    saveUsers(users);
    return u.todos;
});

export const deleteTodo = createAsyncThunk('auth/deleteTodo', async (id, { getState }) => {
    await delay(200);
    const { user } = getState().auth;
    const users = getUsers();
    const u = users[user.email];
    u.todos = u.todos.filter(t => t._id !== id);
    saveUsers(users);
    return u.todos;
});

// ============================================================
// POST THUNKS
// ============================================================
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    await delay();
    return getPosts().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
});

export const createPost = createAsyncThunk('posts/createPost', async (content, { getState }) => {
    await delay(400);
    const { user } = getState().auth;
    const newPost = {
        _id: genId(),
        content,
        author: { _id: user._id, name: user.name },
        likes: [],
        comments: [],
        createdAt: new Date().toISOString()
    };
    const posts = getPosts();
    posts.unshift(newPost);
    savePosts(posts);
    return newPost;
});

export const toggleLike = createAsyncThunk('posts/toggleLike', async (id, { getState }) => {
    await delay(200);
    const { user } = getState().auth;
    const posts = getPosts();
    const post = posts.find(p => p._id === id);
    if (!post) return;
    const idx = post.likes.indexOf(user._id);
    if (idx === -1) post.likes.push(user._id);
    else post.likes.splice(idx, 1);
    savePosts(posts);
    return { id, likes: post.likes };
});

// ============================================================
// SLICES
// ============================================================
const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, loading: true, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.fulfilled, (state, action) => { state.user = action.payload; state.loading = false; })
            .addCase(fetchUser.rejected, (state) => { state.user = null; state.loading = false; })
            .addCase(loginUser.fulfilled, (state, action) => { state.user = action.payload; state.error = null; })
            .addCase(loginUser.rejected, (state, action) => { state.error = action.payload; })
            .addCase(logoutUser.fulfilled, (state) => { state.user = null; })
            .addCase(addTodo.fulfilled, (state, action) => { if (state.user) state.user.todos = action.payload; })
            .addCase(toggleTodo.fulfilled, (state, action) => { if (state.user) state.user.todos = action.payload; })
            .addCase(deleteTodo.fulfilled, (state, action) => { if (state.user) state.user.todos = action.payload; });
    }
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
                const post = state.items.find(p => p._id === action.payload?.id);
                if (post) post.likes = action.payload.likes;
            });
    }
});

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        posts: postSlice.reducer,
    }
});
