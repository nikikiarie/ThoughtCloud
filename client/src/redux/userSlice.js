import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name:"",
    email:"",
    profilePic:"",
    token:"",
    _id:""
  }

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log(action.payload)
      console.log(action.payload)
      state.name = action.payload.name
      state.email = action.payload.email
      state.profilePic = action.payload.profilePic
      // state.token = action.payload.token
      state._id = action.payload._id
    },
    setToken: (state, action) => {
      console.log(action.payload)
      console.log(state.token)

      state.token = action.payload
    },
    logOut:(state) => {
      console.log(state)
      state.name = ""
      state.email = ""
      state.profilePic = ""
      state.token = "",
        state._id = ""
    }
  },
})


export const { setUser, setToken, logOut } = userSlice.actions

export default userSlice.reducer