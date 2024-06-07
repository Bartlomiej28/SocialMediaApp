import { createSlice } from "@reduxjs/toolkit";
/*
const userDataSlice = createSlice({
    name: 'userData',
    initialState:{
        data: [],
    },

    reducers:{
        setDataUser(state, action){
            state.data.push(action.payload);
        }
    }
})
*/

const userDataSlice = createSlice({
    name: 'userData',
    initialState:{
        photoURL: '',
        displayName: '',
        diagram: '',
        following: [],
        followers: [],
        id: '',
        likedPosts: []
    },

    reducers:{
        setDataUser(state, action){
            const data = action.payload;
            state.photoURL = data.photoURL;
            state.displayName = data.displayName;
            state.diagram = data.diagram;
            state.following = data.following;
            state.followers = data.followers;
            state.id = data.id;
            state.likedPosts = data.likedPosts;
        },

        follow(state, action){
            const followUser = action.payload;
            state.following = [...state.following, followUser];    
        },

        unfollow(state, action){
            const unfollowUser = action.payload;
            state.following = state.following.filter(item => item !== unfollowUser);  
        },

        changePhoto(state, action){
            const photoURL = action.payload;
            state.photoURL = photoURL;
        },
        
        changeName(state, action){
            const name = action.payload;
            state.displayName = name;
        },

        changeDiagram(state, action){
            const diagram = action.payload;
            state.diagram = diagram;
        },

        like(state, action){
            const likedPost = action.payload;
            state.likedPosts = [...state.likedPosts, likedPost]
        },

        unlike(state, action){
            const unlikePost = action.payload;
            state.likedPosts = state.likedPosts.filter(item => item !== unlikePost)
        }
    }
})

export const userDataActions = userDataSlice.actions
export default userDataSlice