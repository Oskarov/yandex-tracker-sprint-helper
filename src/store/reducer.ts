import {performersReducer} from "../slices/performers";
import {tasksReducer}      from "../slices/tasks";
import {appReducer}        from "../slices/app";
import {modalReducer}      from "../slices/modal";
import {trackerReducer}    from "../slices/tracker";

const reducer = {
    performers: performersReducer,
    tasks: tasksReducer,
    app: appReducer,
    modal: modalReducer,
    tracker: trackerReducer
};
export default reducer;
