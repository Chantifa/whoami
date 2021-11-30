import {createRef, useEffect, useState} from "react";
import {Container, Table} from "reactstrap";


export default function Highscore() {

    const [ranking, setRanking] = useState([]);
    let pageHeader = createRef();

    const fetchRankingData = () => {
        fetch('/api/ranking/')
            .then(response => response.json())
            .then(data => setRanking(data))
            .catch(e => {
                alert(e.message)
            }) // fixme alert

        return () => setRanking([])

    }

    useEffect(() => {
        fetchRankingData()
    }, []);

    return (
        <>
            <div
                style={{
                    backgroundImage:
                        "url(" + require("../assets/img/winner.jpg").default + ")",
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