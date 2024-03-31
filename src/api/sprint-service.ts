import httpClient                      from "./httpClient";
import {ITrackerHeaders, ITrackerUser} from "../interfaces/ITracker";

const SprintService = {
    getAllUsers: async (page?: number): Promise<{ success: boolean, data?: ITrackerUser[], headers?: ITrackerHeaders }> => {
        try {
            const {status, data, headers} = await httpClient.get(`/users/`, {params: {page: !!page ? page : 1}});

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

}
export default SprintService;