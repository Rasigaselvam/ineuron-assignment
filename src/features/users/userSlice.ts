import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { store } from '../../store'

const initialState = {
  loading: false,
  users: [],
  error: ''
}

// Generates pending, fulfilled and rejected action types
export const fetchUsers = createAsyncThunk('user/fetchUsers', () => {
  return axios
    .get('https://blue-journalist-bbrpv.ineuron.app:4000/users')
    .then(response => response.data.data)
})

const userSlice = createSlice({
  name: 'user',
  initialState: {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    age: "",
    loading: false,
    users: [],
    error: "",
    errorMessage: "",
  },
  reducers: {
      addUsers: (state: any, action: { payload: any }) => {
        let data = action.payload
      axios.post('https://blue-journalist-bbrpv.ineuron.app:4000/user/create', data)
  .then(response => {
    store.dispatch(fetchUsers())
     return response.data.data
  });
    },
    deleteUser: (state: any, action: { payload: any }) => {
      let data = action.payload
      axios.delete(`https://blue-journalist-bbrpv.ineuron.app:4000/user/${data.id}`) 
  .then(response => {
    if(response.data.message = "Deleted user"){
    store.dispatch(fetchUsers())
    }
   return response.data.data;
  });
  },
  EditUsers: (state: any, action: { payload: any }) => {
    let data = action.payload
    axios.patch(`https://blue-journalist-bbrpv.ineuron.app:4000/user/${data._id}`, data) 
.then(response => {
  store.dispatch(fetchUsers())
 return response.data.data;

});
},
  },
  extraReducers: builder => {
    builder.addCase(fetchUsers.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false
      state.users = action.payload
      state.error = ''
    })
    builder.addCase(fetchUsers.rejected, (state) => {
      state.loading = false
      state.users = []
    })
  }
})
export const { addUsers, deleteUser, EditUsers } = userSlice.actions;
export default userSlice.reducer