import "./list.css"

export default function List({usersArr, isFirst, isLoding, err}) {
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
                usersArr.map((userObj) => {
                    return <Card userObj={userObj} />
                })
            }
        </div>
    )

}

