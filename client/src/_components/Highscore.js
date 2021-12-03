import {createRef, useEffect, useState} from "react";
import {Container, Table} from "reactstrap";
import PopupAlert from "./PopupAlert";


export default function Highscore() {
    /**
     * This component displays the ranking of the top players.
     *
     * @component
     * @return Highscore component
     */

    const [ranking, setRanking] = useState([]);
    const [thrownError, setThrownError] = useState(null)
    let pageHeader = createRef();

    const fetchRankingData = () => {
        fetch('/api/ranking/')
            .then(response => response.json())
            .then(data => setRanking(data))
            .catch(e => setThrownError(e))

        return () => setRanking([])

    }

    useEffect(() => {
        fetchRankingData()
    }, []);

    return (
        <>
            <PopupAlert state={{thrownError, setThrownError}}/>
            <div
                style={{
                    backgroundImage:
                        "url(/img/winner.jpg)",
                }}
                className="page-header page-header-xs"
                data-parallax={true}
                ref={pageHeader}
            >
            </div>

            <Container>
                <p className="h1 mb-5">Highscore Ranking</p>

                <Table>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Username</th>
                        <th>Games won</th>
                        <th>Games Finished</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        ranking.map((val, index) => {
                                return (
                                    <tr key={val._id}>
                                        <td>{index + 1}</td>
                                        <td>{val.username}</td>
                                        <td>{val.gamesWon}</td>
                                        <td>{val.gamesFinished}</td>
                                    </tr>
                                )
                            }
                        )
                    }
                    </tbody>
                </Table>
            </Container>
        </>
    )

}