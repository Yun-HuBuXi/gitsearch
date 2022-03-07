import "./list.css"
import PubSub from "pubsub-js"
import { useState, useEffect } from "react"

export default function List() {

    let [usersArr, setUsers] = useState([])
    const handleUsers = (users) => {
        usersArr = users
        setUsers(usersArr)
    }

    let [isFirst, setIsFirst] = useState(true)
    const handleFirst = () => {
        setIsFirst(false)
    }

    let [isLoding, setIsLoding] = useState(false)
    const handleLoding = () => {
        isLoding = !isLoding
        setIsLoding(isLoding)
    }

    let [err, setErr] = useState('')
    const handleErr = (errs) => {
        err = errs 
        setErr(err)
    }

    useEffect(() => {
        const token = PubSub.subscribe("usersArr", (_,data) => {
            handleUsers(data)
            return () => {PubSub.unsubscribe(token)}
        })
    })
  
    useEffect(() => {
        const token = PubSub.subscribe("isFirst", (_,data) => {
            handleFirst()
            return () => {PubSub.unsubscribe(token)}
        })
    })

    useEffect(() => {
        const token = PubSub.subscribe("isLoding", (_,data) => {
            handleLoding()
            return () => {PubSub.unsubscribe(token)}
        })
    })

    useEffect(() => {
        const token = PubSub.subscribe("err", (_,data) => {
            handleErr(data)
            return () => {PubSub.unsubscribe(token)}
        })
    })

    function Card(props) {
        return (
            <div className="card">
              <a href={props.userObj.html_url} target="_blank" rel="noreferrer">
                <img alt="head_portrait" src={props.userObj.avatar_url} style={{width: '100px'}} />
              </a>
              <p className="card-text">{props.userObj.login}</p>
            </div>
        )
    }

    return (
        <div className="row">
            {
                isFirst ? <h2>欢迎使用，输入你想搜索的东西吧</h2> :
                isLoding ? <h2>Loding...</h2> :
                err ? <h2 style={{color:"red"}}>{err}</h2> :
                (usersArr.length===0) ? <h2 style={{color:"red"}}>什么都没有哦</h2> :
                usersArr.map((userObj) => {
                    return <Card userObj={userObj} key={userObj.id} />
                })
            }
        </div>
    )

}

