import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import AuthStack from './app/Navigation/AuthStack';
import AppStack from "./app/Navigation/AppStack";
import Auth from "./app/Service/Auth";
import { useDispatch, useSelector } from "react-redux";
import { setUser, getUser } from "./app/Redux/reducer/user";

function App() {

  const dispatch = useDispatch()

  const { useUser, login } = useSelector(state => state.User)
  const [loginChk, setloginChk] = useState(true);

  useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
    let data = await Auth.getAccount()
    if (data != null) {
      dispatch(setUser(data))
      setloginChk(false)
    } else {
      setloginChk(false)
    }
  }

  if (loginChk) {
    return null
  }

  return (
    <NavigationContainer>
      {login ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default App;
