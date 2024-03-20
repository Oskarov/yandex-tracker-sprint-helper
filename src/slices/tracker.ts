import {createSlice, PayloadAction}                              from '@reduxjs/toolkit';
import {IPerformerItem, IPerformersState, IPerformerTaskPayload} from "../interfaces/IPerformers";
import {ITask}                                         from "../interfaces/ITask";
import {IProjects, ITrackerQueueImport, ITrackerState} from "../interfaces/ITracker";

const initialState: ITrackerState = {
    queues: [],
    projects: {}
}


const trackerSlice = createSlice({
    name: 'tracker',
    initialState: initialState,
    reducers: {
        changeQueues: (state, {payload}: PayloadAction<ITrackerQueueImport[]>) => {
            return {
                ...state,
                queues: payload
            };
        },
        changeProjects: (state, {payload}: PayloadAction<IProjects>) => {
            return {
                ...state,
                projects: payload
            };
        },
        removeTaskFromProject: (state, {payload}: PayloadAction<{projectId:string, taskUuid:string}>) => {
            return {
                ...state,
                projects: {
                    ...state.projects,
                    [payload.projectId] : {
                        ...state.projects[payload.projectId],
                        tasks: state.projects[payload.projectId].tasks.filter(i=>i.uuid !== payload.taskUuid)
                    }

                }
            };
        },
        changeProjectOpenState:(state, {payload}: PayloadAction<{projectId:string, isOpen:boolean}>) => {
            return {
                ...state,
                projects: {
                    ...state.projects,
                    [payload.projectId] : {
                        ...state.projects[payload.projectId],
                        isOpen: payload.isOpen
                    }
                }
            };
        },
    }
})

export const trackerReducer = trackerSlice.reducer;
export const {
    changeQueues,
    changeProjects,
    removeTaskFromProject,
    changeProjectOpenState
} = trackerSlice.actions;
