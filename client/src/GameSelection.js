import {Route} from "react-router-dom";
import {useRouteMatch} from "react-router-dom/cjs/react-router-dom";
import Game from "./Game";


function GameSelection() {

    let {path, url} = useRouteMatch();

    return <>
        <Route path={`${path}/:id`}>
            <Game userName="usernameplaceholder"/>
        </Route>
        <Route exact path={path}>
            Start a new game
        </Route>
        <div dangerouslySetInnerHTML={{__html: `<!-- ${url} -->`}}/>
    </>

}

export default GameSelection
