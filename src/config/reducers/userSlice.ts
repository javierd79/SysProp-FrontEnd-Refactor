import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

type User = {
  username: string;
  password: string;
}

type UserState = {
  user: User | null
}

const initialState: UserState = {
  user: null
}

const history = useHistory();

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUser: (state) => {
      const user = localStorage.getItem('user');
      if (user) {
        state.user = JSON.parse(user);
      }
    },
    destroy: (state) => {
      state.user = null
      localStorage.removeItem('user')
      history.push('/login');
    },
    validateUser: (state) => {
      const user = localStorage.getItem('user');
      if (user) {
        const { username, password } = JSON.parse(user);
         axios.get(`https://sysprop-production.up.railway.app/usuarios?username=${username}&password=${password}`, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }).then(() => {
          return true
        }).catch(() => {
          localStorage.removeItem('user');
          history.push('/login');
          state.user = null;
          return false
        })
      }
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    }
  }
});

export const { getUser, setUser, destroy, validateUser } = userSlice.actions;

export default userSlice.reducer;