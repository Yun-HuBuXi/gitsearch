import { useRef } from "react"
import axios from "axios"

export default function Search(props) {
    const refInput = useRef()
    const searchByClick = () => {
        //获取用户输入
        const value = refInput.current.value
        //修改first和loding
        props.handleFirst()
        props.handleLoding()
        //发生网络请求
        axios.get(`https://api.github.com/search/users?q=${value}`).then(
            (response) => {
                props.handleUsers(response.data.items)
                props.handleLoding() //修改loding
            },
            (error) => {
                props.handleErr(error.message)
                props.handleLoding() //修改loding
            } //不能传错误对象，要传error.message
        )
        
    }
    const searchByKey = (event) => {
        if (event.keyCode === 13) {
            searchByClick()
        }
    }
    return (
        <section className="jumbotron">
            <h3 className="jumbotron-heading">搜索GitHub 用户</h3>
            <div>
                <input ref={refInput} type="text" placeholder="输入关键词，点击或回车搜索" onKeyUp={searchByKey} />&nbsp;
                <button onClick={searchByClick} >搜索</button>
            </div>
        </section>
    )
}