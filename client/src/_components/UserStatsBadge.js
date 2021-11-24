import {useContext, useEffect, useState} from "react";
import {Badge} from "reactstrap";
import {ReactReduxContext} from "react-redux";


export default function UserStatsBadge({color}){


    const {store} = useContext(ReactReduxContext);
    const [userInfo, setUserInfo] = useState(null)

    useEffect(() => {
        const userId = store?.getState()?.authentication?.user?.message?._id
        if(!userId) {
            setUserInfo(null)
            return
        }
        fetch('/api/userInfo/' + userId)
            .then(response => response.json())
            .then(data => setUserInfo(data))
            .catch(e => alert(e.message)) //fixme alert

        return () => setUserInfo(null)

    }, [store, "this should be triggered on login change"]) //fixme

    if (!store?.getState()?.authentication?.user?.message?._id){
        return null
    }
    let badge
    if (!userInfo){
        badge =  <Badge pill color={color} > Loading... </Badge>
    } else {
        badge = <Badge pill color={color}> ({userInfo.gamesStarted}|{userInfo.gamesWon}|{userInfo.gamesFinished}) </Badge>
    }

    return <div className="d-flex flex-column justify-content-center h-100">{badge}</div>
}