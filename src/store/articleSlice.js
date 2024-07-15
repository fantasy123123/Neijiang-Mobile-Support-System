import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    title: '',
    content: '',
};

const articleSlice = createSlice({
    name: 'article',
    initialState:{
        title: '',
        content: ''
    },
    reducers: {
        setEditedArticle(state, action) {
            state.title = action.payload.title;
            state.content = action.payload.content;
        },
        clearEditedArticle(state) {
            state.title = '';
            state.content = '';
        },
    },
});

export const { setEditedArticle, clearEditedArticle } = articleSlice.actions;
export default articleSlice.reducer;
