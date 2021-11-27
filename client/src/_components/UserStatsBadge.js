import {useContext, useEffect, useState} from "react";
import {Badge} from "reactstrap";
import {ReactReduxContext} from "react-redux";


export default function UserStatsBadge({color}){


    const {store} = useContext(ReactReduxContext); // FIXME: you don't need to create context -> useSelector() / store is already added in App()
    const [userInfo, setUserInfo] = useState(null)

    useEffect(() => {
        const userId = store?.getState()?.authentication?.user?.message?._id // fixme: does not render - it loads after refresh
        if(!userId) {
            setUserInfo(null)
            return
        }
        fetch('/api/userInfo/' + userId)
            .then(response => response.json())
            .then(data => setUserInfo(data))
            .catch(e => alert(e.message)) //fixme alert - 500er Error is throwing "unexpected token p in json at position 0"

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