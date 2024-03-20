import React            from 'react';
import ListOfPerformers from "./listOfPerformers/listOfPerformers";
import Backlog          from "./backlog/backlog";
import styles           from "./main.module.scss";
import Control          from "./control/control";
import Settings         from "./settings/settings";
import Header           from "./header/header";
import Projects         from "./projects/projects";

interface MainProps {

}

const Main: React.FC<MainProps> = ({}) => {
    return <div className={styles.main}>
        <Header/>
        <ListOfPerformers/>
        <Backlog/>
        <Projects/>
        <Control/>
        <Settings/>
    </div>;
}

export default Main;
