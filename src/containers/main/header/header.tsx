import React                      from 'react';
import styles                     from './header.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {TStore}                   from "../../../store/store";
import RefreshIcon                from '@mui/icons-material/Refresh';
import ToJson                     from "./toJson/toJson";
import FromJson                   from "./fromJson/fromJson";
import FromTracker                from "./fromTracker/fromTracker";
import ToggleAllProjects          from "./toggleAllProjects/toggleAllProjects";
import {getAllTasksByQueueKey}    from "../../../effects/trackerEffect";
import ToTracker                  from "./toTracker/toTracker";

interface HeaderProps {

}

const Header: React.FC<HeaderProps> = () => {
    const lastQueue = useSelector((state: TStore) => state.app.lastQueue);
    const dispatch = useDispatch();
    return <div className={styles.header}>
        <div className={styles.title}>Планирование спринта</div>
        <div className={styles.buttons}>
            <ToJson/>
            <FromJson/>
            <FromTracker/>
            <ToggleAllProjects/>
        </div>
        {!!lastQueue && <div className={styles.buttons}>
            <div>{lastQueue.name}</div>
            <RefreshIcon onClick={() => {
                dispatch(getAllTasksByQueueKey(lastQueue?.key))
            }}/>
        </div>}
        <div className={styles.buttons}>
            <ToTracker/>
        </div>
    </div>;
}

export default Header;
