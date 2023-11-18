import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import api from '../../../api'
import { UserState } from '../../../types/UserType';

const data = localStorage.getItem('loginData') !== null 
  ? JSON.parse(String(localStorage.getItem('loginData'))) 
  : [];

const initialState: UserState = {
  users: [],
  error: null,
  isLoading: false,
  searchTerm: '',
  ban: false,
  isLoggedIn: data.isLoggedIn,
  userData: data.userData,
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await api.get('/mock/e-commerce/users.json');
  return response.data;
});

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    searchUser: (state, action) => {
      state.searchTerm = action.payload;
    },
    sortUsers: (state, action) => {
      const sortMethod = action.payload;
      if (sortMethod == 'AtoZ') {
        state.users.sort((a,b) => a.firstName.localeCompare(b.firstName)); // Sort the names of the users in ascending order
      }
      else if (sortMethod == 'ZtoA') {
        state.users.sort((a,b) => b.firstName.localeCompare(a.firstName)); // Sort the names of the users in descending order
      }
      else if(sortMethod == 'ascendingId') {
        state.users.sort((a,b) => a.id - b.id); // Sort the id of the users in ascending order
      }
      else if(sortMethod == 'descendingId') {
        state.users.sort((a,b) => b.id - a.id); // Sort the id of the users in descending order
      }
    },
    updateUser: (state, action) => {
      const { id, firstName, lastName } = action.payload;
      const foundUser = state.users.find((user) => user.id == id);
      if(foundUser) {
        foundUser.firstName = firstName;
        foundUser.lastName = lastName;
        state.userData = foundUser;
        localStorage.setItem('loginData', JSON.stringify({
          isLoggedIn: state.isLoggedIn,
          userData: state.userData,
        }));
      }
    },
    deleteUser: (state, action) => {
      const filterUsers = state.users.filter((user) => user.id !== action.payload);
      state.users = filterUsers;
    },
    banUser: (state, action) => {
      const foundUser = state.users.find((user) => user.id == action.payload);
      if (foundUser) {
        foundUser.ban = !foundUser.ban;
      }
    },
    login: (state, action) => {
      state.isLoggedIn = true;
      state.userData = action.payload;
      localStorage.setItem('loginData', JSON.stringify({
        isLoggedIn: state.isLoggedIn,
        userData: state.userData,
      }));
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userData = null;
      localStorage.setItem('loginData', JSON.stringify({
        isLoggedIn: state.isLoggedIn,
        userData: state.userData,
      }));
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
    }
  },
  extraReducers(builder) {
    builder
    .addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.isLoading = false;
    })
    .addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "ERROR!";
    })
  }
})

export const { searchUser, sortUsers, addUser, updateUser, deleteUser, banUser, login, logout } = userSlice.actions;
export default userSlice.reducer;