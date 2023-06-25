import { createSlice } from "@reduxjs/toolkit";

const nameTrainerSlice = createSlice({
    initialState: localStorage.getItem.nameTrainer ?? "",
    name : "nameTrainer",
    reducers : {
        setNameTrainerGlobal : (state,action) => {
            localStorage.setItem("nameTrainer",action.payload)
            return action.payload
        },
    },
});

export const {setNameTrainerGlobal} = nameTrainerSlice.actions;
export default nameTrainerSlice.reducer;