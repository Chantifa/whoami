import {Route} from "react-router-dom";
import {useRouteMatch} from "react-router-dom/cjs/react-router-dom";
import {createRef, useContext, useEffect, useState} from 'react';
import Game from "./Game";
import {ReactReduxContext} from "react-redux";
import {Button, Input, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText} from "reactstrap";

export default function GameSelection() {

    function GameSelectionItem(props) {

        /*{roomName: room,
            phase: this._phase.phase,
            players}*/

        return <ListGroupItem tag="a" href={/game/ + props.game.roomName}>

            <ListGroupItemHeading>
                {props.game.roomName}({props.game.phase})
            </ListGroupItemHeading>
            <ListGroupItemText>
                <code>{JSON.stringify(props.game)}</code>

            </ListGroupItemText>
        </ListGroupItem>
    }

    function getRandId() {
        const ID_LENGTH = 8
        return String(Math.floor(Math.random() * 10 ** ID_LENGTH)).padStart(ID_LENGTH, '0')
    }

    const [user, setUser] = useState("")
    const [games, setGames] = useState([])
    const [refresh, setRefresh] = useState(0)
    const [selectedGame, setSelectedGame] = useState(getRandId())
    const {store} = useContext(ReactReduxContext);

    let pageHeader = createRef();

    useEffect(() => {
        setUser(store.getState().authentication.user.message.name)
    }, [store])

    useEffect(() => {
        fetch("/api/games")
            .then(response => response.json())
            .then(json => setGames(json))
            .catch(e => alert(e.message)) //fixme alerts
    }, [refresh])

    let {path, url} = useRouteMatch();

    const handleSelectedChange = (event) => setSelectedGame(event.target.value);

    return (
        <>
            <div
                style={{
                    backgroundImage:
                        "url(" + require("../assets/img/galaxy.jpg").default + ")",
                }}
                className="page-header page-header-xs"
                data-parallax={true}
                ref={pageHeader}
            >
                <div className="filter"/>
            </div>
            <Route path={`${path}/:id`}>
                <Game userName={user}/></Route>
            <Route exact path={path}>
                <h1>Game Overview</h1>
                <ListGroup>
                    {games.map((value, key) => <GameSelectionItem key={key} game={value}/>)}
                </ListGroup>
                <Button onClick={setRefresh.bind(null, refresh + 1)}>Refresh</Button>
                <Input type="text" maxLength="12" minLength="4" value={selectedGame} onChange={handleSelectedChange}/>
                <a href={"/game/" + selectedGame} className="btn btn-success"> Join Room</a>
            </Route>
        </>
    )
}
