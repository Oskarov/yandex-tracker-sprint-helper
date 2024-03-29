import React             from 'react';
import {IPerformerItem}  from "../../../../../interfaces/IPerformers";
import {TASK_TYPES_ENUM} from "../../../../../interfaces/ITask";
import {useSelector}     from "react-redux";
import {TStore}          from "../../../../../store/store";
import styles            from './metrics.module.scss';
import {Tooltip}         from "@mui/material";

interface MetricsProps {
    performer: IPerformerItem
}

const Metrics: React.FC<MetricsProps> = ({performer}) => {

    const {app} = useSelector((state: TStore) => ({
        app: state.app,
    }));

    let taskSum = 0;
    let noWorking = 0

    performer.tasks.forEach(task => {
        if ([TASK_TYPES_ENUM.MEETINGS, TASK_TYPES_ENUM.REVIEW, TASK_TYPES_ENUM.VACATION, TASK_TYPES_ENUM.HOLLYDAYS].includes(task.type)) {
            noWorking = noWorking + task.capacity;
        } else {
            taskSum = taskSum + task.capacity;
        }
    });

    const sprintSize = app.sprintSize - noWorking;
    return <div className={styles.metrics}>[
        <Tooltip title="Общее капасити спринта исполнителя за вычетом отвлекающих факторов">
            <div className={styles.support}>{taskSum}/{sprintSize}</div>
        </Tooltip>
        ]
    </div>;
}

export default Metrics;
