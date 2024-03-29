import {createSlice, PayloadAction}                              from '@reduxjs/toolkit';
import {IPerformerItem, IPerformersState, IPerformerTaskPayload} from "../interfaces/IPerformers";
import {ITask}                                                              from "../interfaces/ITask";
import {
    IProjects,
    ITrackerBoard,
    ITrackerNoMemoState,
    ITrackerQueueImport, ITrackerSprint,
    ITrackerState
} from "../interfaces/ITracker";

const initialState: ITrackerNoMemoState= {
    boards: [],
    sprints: []
}

const trackerNoMemoSlice = createSlice({
    name: 'trackerNoMemo',
    initialState: initialState,
    reducers: {
        changeBoards: (state, {payload}: PayloadAction<ITrackerBoard[]>) => {
            return {
                ...state,
                boards: payload
            };
        },
        changeSprints: (state, {payload}: PayloadAction<ITrackerSprint[]>) => {
            return {
                ...state,
                sprints: payload
            };
        },

    }
})

export const trackerNoMemoReducer = trackerNoMemoSlice.reducer;
export const {
    changeBoards,
    changeSprints
} = trackerNoMemoSlice.actions;
