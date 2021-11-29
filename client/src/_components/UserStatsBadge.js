import {useContext, useEffect, useState} from "react";
import {Badge} from "reactstrap";
import {ReactReduxContext, useSelector} from "react-redux";

export default function UserStatsBadge({color}){

    const authInfo = useSelector(state => state.authentication.user.message._id)
    const {store} = useContext(ReactReduxContext);
    const [userInfo, setUserInfo] = useState(null)

    useEffect(() => {
        const fetchUserInfo = () => {

            if(!authInfo) {
                setUserInfo(null)
                return
            }

            fetch('/api/userInfo/' + authInfo)
                .then(response => response.json())
                .then(data => setUserInfo(data))
                .catch(e => alert(e.message)) //fixme alert

            return () => setUserInfo({})

        }

        fetchUserInfo();

    }, [authInfo]);

    if (!store?.getState()?.authentication?.user?.message?._id){
        return null
    }

    let badge

    if (!userInfo){
        badge =  <Badge pill color={color} > Loading... </Badge>
    } else {
        badge = <Badge pill color={color}>
            <i className="nc-icon nc-button-play me-1"/>
            Started: {userInfo.gamesStarted}
            <i className="nc-icon nc-chart-bar-32 me-1 ms-4"/>
            Won: {userInfo.gamesWon}
            <i className="nc-icon nc-check-2 me-1 ms-4"/>
            Finished: {userInfo.gamesFinished}</Badge>
    }

    return <div className="d-flex flex-column justify-content-center h-100">{badge}</div>
}