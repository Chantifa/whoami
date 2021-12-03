import {useContext, useEffect, useState} from "react";
import {Badge} from "reactstrap";
import {ReactReduxContext, useSelector} from "react-redux";
import PopupAlert from "./PopupAlert";

export default function UserStatsBadge({color}){
    /**
     * This component returns the user infos in the header as badge item.
     *
     * @component
     * @param {string} color background color of badge
     * @return badge component
     */

    const authInfo = useSelector(state => state.authentication.user.message._id)
    const {store} = useContext(ReactReduxContext);
    const [userInfo, setUserInfo] = useState(null)
    const [thrownError, setThrownError] = useState(null)

    useEffect(() => {
        let isMounted = true
        const fetchUserInfo = () => {

            if(!authInfo) {
                setUserInfo(null)
                return
            }

            fetch('/api/userInfo/' + authInfo)
                .then(response => response.json())
                .then(data => isMounted && setUserInfo(data))
                .catch(e => setThrownError(e))

            return () => setUserInfo({})

        }

        fetchUserInfo();
        return () => isMounted = false

    }, [authInfo]);

    if (!store?.getState()?.authentication?.user?.message?._id){
        return <PopupAlert state={{thrownError, setThrownError}}/>
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

    return <div className="d-flex flex-column justify-content-center h-100">{badge}
        <PopupAlert state={{thrownError, setThrownError}}/>
    </div>
}