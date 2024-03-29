import {Dispatch}                           from 'redux';
import {addPerformer, editTaskForPerformer} from "../slices/performers";
import {generateRandomString}               from "../utils/generateRandomString";
import QueueService                         from "../api/queue-service";
import {changeProjects, changeQueues}       from "../slices/tracker";
import {IProjects, ITrackerQueueTask}       from "../interfaces/ITracker";
import {store}                              from "../store/store";
import calculateHoursFromTrackerTack        from "../utils/calculateHoursFromTrackerTack";
import CalculateTypeFromTrackerTack  from "../utils/calculateTypeFromTrackerTack";
import {changeBoards, changeSprints} from "../slices/trackerNoMemo";

export const getAllQueuesAction = () => {
    return async function (dispatch: Dispatch<any>) {
        const response = await QueueService.getAllQueues();
        if (response.success && response.data) {
            let result = [...response.data];

            if (response.headers && response.headers["x-total-pages"] > 1) {
                const totalPages = response.headers["x-total-pages"];
                const getNewResult = async (page: number) => {
                    setTimeout(async () => {
                        const response = await QueueService.getAllQueues(page);
                        if (response.data?.length) {
                            result = [...result, ...response.data];
                            if (page < totalPages) {
                                await getNewResult(++page);
                            } else {
                                dispatch(changeQueues(result));
                            }
                        }
                    }, 1000);
                }
                await getNewResult(2);
            } else {
                dispatch(changeQueues(result));
            }
        }
    }
}

export const getAllBoardsAction = () => {
    return async function (dispatch: Dispatch<any>) {
        const response = await QueueService.getAllBoards();
        if (response.success && response.data) {
            let result = [...response.data];

            if (response.headers && response.headers["x-total-pages"] > 1) {
                const totalPages = response.headers["x-total-pages"];
                const getNewResult = async (page: number) => {
                    setTimeout(async () => {
                        const response = await QueueService.getAllBoards(page);
                        if (response.data?.length) {
                            result = [...result, ...response.data];
                            if (page < totalPages) {
                                await getNewResult(++page);
                            } else {
                                dispatch(changeBoards(result));
                            }
                        }
                    }, 1000);
                }
                await getNewResult(2);
            } else {
                dispatch(changeBoards(result));
            }
        }
    }
}

export const getAllTasksByQueueKey = (queueKey: string) => {
    return async function (dispatch: Dispatch<any>) {
        const response = await QueueService.getAllTasksByQueue(queueKey);
        if (response.success && response.data) {
            let result = [...response.data];

            if (response.headers && response.headers["x-total-pages"] > 1) {
                const totalPages = response.headers["x-total-pages"];
                const getNewResult = async (page: number) => {
                    setTimeout(async () => {
                        const response = await QueueService.getAllTasksByQueue(queueKey, page);
                        if (response.data?.length) {
                            result = [...result, ...response.data];
                            if (page < totalPages) {
                                await getNewResult(++page);
                            } else {
                                dispatch(setTasksFromTracker(result));
                            }
                        }
                    }, 1000);
                }
                await getNewResult(2);
            } else {
                dispatch(setTasksFromTracker(result));
            }
        }
    }
}

export const getAllTasksBySprintId = (id: number, forRemove: boolean) => {
    return async function (dispatch: Dispatch<any>) {
        const response = await QueueService.getAllTasksBySprint(id);
        if (response.success && response.data) {
            let result = [...response.data];

            if (response.headers && response.headers["x-total-pages"] > 1) {
                const totalPages = response.headers["x-total-pages"];
                const getNewResult = async (page: number) => {
                    setTimeout(async () => {
                        const response = await QueueService.getAllTasksBySprint(id, page);
                        if (response.data?.length) {
                            result = [...result, ...response.data];
                            if (page < totalPages) {
                                await getNewResult(++page);
                            } else {
                                if (forRemove){
                                    dispatch(removeSprintFromTasks(result, id));
                                }
                            }
                        }
                    }, 1000);
                }
                await getNewResult(2);
            } else {
                if (forRemove){
                    dispatch(removeSprintFromTasks(result, id));
                }
            }
        }
    }
}

export const removeSprintFromTasks = (tasks:ITrackerQueueTask[], sprintToRemoveId:number) => {
    return async function (dispatch: Dispatch<any>) {
        tasks.forEach((task, idx)=>{
            setTimeout(async ()=>{
                const response = await QueueService.changeTaskSprint(task.id, null, sprintToRemoveId);
            }, 1000 * idx+1)
        })
    }
}



export const getAllSprintsByBoardId = (id: number) => {
    return async function (dispatch: Dispatch<any>) {
        const response = await QueueService.getAllSprintsByBoardId(id);
        if (response.success && response.data) {
            let result = [...response.data];

            if (response.headers && response.headers["x-total-pages"] > 1) {
                const totalPages = response.headers["x-total-pages"];
                const getNewResult = async (page: number) => {
                    setTimeout(async () => {
                        const response = await QueueService.getAllSprintsByBoardId(id, page);
                        if (response.data?.length) {
                            result = [...result, ...response.data];
                            if (page < totalPages) {
                                await getNewResult(++page);
                            } else {
                                dispatch(changeSprints(result));
                            }
                        }
                    }, 1000);
                }
                await getNewResult(2);
            } else {
                dispatch(changeSprints(result));
            }
        }
    }
}

export const setTasksFromTracker = (trackerTasks: ITrackerQueueTask[]) => {
    return async function (dispatch: Dispatch<any>) {
        const performers = store.getState().performers.items;
        const projects: IProjects = {};
        trackerTasks.forEach(trackerTask => {
            let pass = false;
            let taskFirstComponent = trackerTask.components?.length ? trackerTask.components[0].display : '';
            performers.forEach(performer => {
                performer.tasks.forEach(task => {
                    if (task.number === trackerTask.key) {
                        pass = true;
                        dispatch(editTaskForPerformer({
                            performerUuid: performer.uuid,
                            task: {
                                uuid: task.uuid,
                                number: task.number,
                                name: trackerTask.summary,
                                project: trackerTask.project?.display || '',
                                capacity: trackerTask.originalEstimation ? calculateHoursFromTrackerTack(trackerTask.originalEstimation) : task.capacity,
                                type: CalculateTypeFromTrackerTack(trackerTask.type.key),
                                component: taskFirstComponent,
                                hasEstimate: !!trackerTask.originalEstimation,
                                inSomeSprint: true
                            }
                        }))
                    }
                })
            });
            if (!pass) {
                const project = trackerTask.project?.id ? trackerTask.project?.id : '0';
                let projectTasks = projects[project]?.tasks || [];
                let projectOpen = projects[project]?.isOpen || true;
                projects[project] = {
                    name: trackerTask.project?.display || 'Без проекта',
                    isOpen: projectOpen,
                    tasks: [...projectTasks, {
                        uuid: generateRandomString(10),
                        number: trackerTask.key,
                        name: trackerTask.summary,
                        project: trackerTask.project?.display || '',
                        capacity: trackerTask.originalEstimation ? calculateHoursFromTrackerTack(trackerTask.originalEstimation) : 1,
                        type: CalculateTypeFromTrackerTack(trackerTask.type.key),
                        component: taskFirstComponent,
                        hasEstimate: !!trackerTask.originalEstimation,
                        inSomeSprint: true
                    }]
                }
            }
        });
        dispatch(changeProjects(projects));
    }
}
