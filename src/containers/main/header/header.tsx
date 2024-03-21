import React                      from 'react';
import styles                     from './header.module.scss';
import AutoGraphIcon              from '@mui/icons-material/AutoGraph';
import {useDispatch, useSelector} from "react-redux";
import {setInformationOpen}       from "../../../slices/modal";
import {TStore}                   from "../../../store/store";
import {TASK_TYPES_ENUM}          from "../../../interfaces/ITask";
import {PERFORMER_TYPES_ENUM}     from "../../../interfaces/IPerformers";
import ToJson                     from "./toJson/toJson";
import FromJson                   from "./fromJson/fromJson";
import FromTracker                from "./fromTracker/fromTracker";

interface HeaderProps {

}

const Header: React.FC<HeaderProps> = () => {
    return <div className={styles.header}>
        <div className={styles.title}>Планирование спринта</div>
        <div className={styles.buttons}>
            <ToJson/>
            <FromJson/>
            <FromTracker/>
        </div>
    </div>;
}

export default Header;
