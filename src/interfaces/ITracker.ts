import {ITask} from "./ITask";

export interface ITrackerQueueImport {
    id: number,
    key: string,
    name: string,
    description: string
}

export interface ITrackerQueueTask {
    pass?: boolean,
    id: string,
    key: string,
    summary: string,
    statusType: {
        value: string,
    },
    description: string,
    type: {
        id: string,
        key: string,
        display: string
    },
    priority: {
        key: string,
        display: string,
    }
    status: {
        key: string,
        display: string,
    }
    components?: {
        id: string,
        display: string
    }[],
    project?: {
        id: string,
        display: string
    },
    originalEstimation?: string
}

export interface IProjects {
    [id: string]: {
        name: string,
        isOpen: boolean,
        tasks: ITask[]
    }
}

export interface ITrackerHeaders {
    "X-Total-Count": number
    "x-total-pages": number
}

export interface ITrackerState {
    queues: ITrackerQueueImport[],
    projects: IProjects
}