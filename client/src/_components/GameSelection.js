import {Route} from "react-router-dom";
import {useRouteMatch} from "react-router-dom/cjs/react-router-dom";
import {createRef, useContext, useEffect, useState} from 'react';
import Game from "./Game";
import {ReactReduxContext} from "react-redux";
import {
    Button,
    Col,
    Container,
    Input,
    ListGroup,
    ListGroupItem,
    ListGroupItemHeading,
    ListGroupItemText,
    Row
} from "reactstrap";

import PopupAlert from "./PopupAlert";

export default function GameSelection() {
    /**
     * This component shows created rooms and allows the user to select a game lobby.
     *
     * @component
     * @return GameSelection component
     */

    function UserList(props) {
        return <Col><h2 className="h5">{props.title}</h2> {props.user.length === 0
            ? <p className="text-muted fs-6"> Anybody here yet! </p>
            : <ul>{props.user.map((value, index) => <li key={index}>{value}</li>)}
            </ul>}
        </Col>
    }

    function GameSelectionItem(props) {

        return <ListGroupItem tag="a" href={/game/ + props.game.roomName}>

            <ListGroupItemHeading>
                {props.game.roomName}({props.game.phase})
            </ListGroupItemHeading>
            <ListGroupItemText tag={"div"} className="container-fluid">
                <Row>
                    <UserList user={props.game.players} title="Playing"/>
                    <UserList user={props.game.viewers} title="Viewing"/>
                </Row>

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
    const [thrownError, setThrownError] = useState(null)
    const {store} = useContext(ReactReduxContext);

    let pageHeader = createRef();

    useEffect(() => {
        setUser(store.getState().authentication.user.message.name)
    }, [store])

    useEffect(() => {
        fetch("/api/games")
            .then(response => response.json())
            .then(json => setGames(json))
            .catch(e => setThrownError(e))
    }, [refresh])

    let {path} = useRouteMatch();

    const handleSelectedChange = (event) => setSelectedGame(event.target.value);

    return (
        <>
            <PopupAlert state={{thrownError, setThrownError}}/>
            <div
                style={{
                    backgroundImage:
                        "url(/img/galaxy.jpg)",
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
                <Container>

                    <h1>Game Overview</h1>
                    <ListGroup>
                        {games.map((value, key) => <GameSelectionItem key={key} game={value}/>)}
                    </ListGroup>
                    <Button onClick={setRefresh.bind(null, refresh + 1)}>Refresh</Button>
                    <Input type="text" maxLength="12" minLength="4" value={selectedGame}
                           onChange={handleSelectedChange}/>
                    <a href={"/game/" + selectedGame} className="btn btn-success"> Join Room</a>
                </Container>
            </Route>
        </>
    )
}
