import httpClient                                                from "./httpClient";
import {ITrackerHeaders, ITrackerQueueImport, ITrackerQueueTask} from "../interfaces/ITracker";

const QueueService = {
    getAllQueues: async (page?: number): Promise<{ success: boolean, data?: ITrackerQueueImport[], headers?: ITrackerHeaders }> => {
        try {
            const {status, data, headers} = await httpClient.get(`/queues/`, {params: {page: !!page ? page : 1}});

            return {
                success: true,
                data: data,
                headers
            }
        } catch (e) {
            return {
                success: false
            }
        }
    },
    getAllTasksByQueue: async (key: string, page?: number): Promise<{ success: boolean, data?: ITrackerQueueTask[], headers?: ITrackerHeaders }> => {
        try {
            const {status, data, headers} = await httpClient.post(`/issues/_search`,
                {
                    query: `Queue: ${key} Status: open "Sort by": Updated DESC`
                },
                {
                    params:
                        {
                            page: !!page ? page : 1,
                            expand: 'workflow, agile'
                        }
                });

            return {
                success: true,
                data: data,
                headers
            }
        } catch (e) {
            return {
                success: false
            }
        }
    },
    changeTaskSprint: async (key: string, sprintId: number): Promise<{ success: boolean }> => {
        try {
            const {status, data, headers} = await httpClient.patch(`/issues/${key}`,
                {
                    sprint: `[{"id":"${sprintId}"}]`
                },);

            return {
                success: true
            }
        } catch (e) {
            return {
                success: false
            }
        }
    },
}
export default QueueService;