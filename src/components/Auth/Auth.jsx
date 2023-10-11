import React from 'react'

export let authContextApi = React.createContext(null)
function Auth({children}) {

  let [user, setUser] = React.useState(null)


  let login = (user)=> {
    setUser(user)
  }

  let logout = ()=> {
    setUser(null)
  }

  return (
    <authContextApi.Provider value={{user, login, logout}}>
        {children}
    </authContextApi.Provider>
  )
}

export default Auth