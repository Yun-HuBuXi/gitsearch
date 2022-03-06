import  Search from "./components/search/search"
import List from './components/List/list';
import { useState } from "react";

function App() {
  let [usersArr,setUsers] = useState([]) 
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



  return (
    <div className="container">
      <Search handleUsers={handleUsers} handleErr={handleErr} handleFirst={handleFirst} handleLoding={handleLoding} />
      <List usersArr={usersArr} isFirst={isFirst} isLoding={isLoding} err={err} />
    </div>
  );
}

export default App;
