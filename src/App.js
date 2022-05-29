import { useReducer, createContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import HomeComp from "./component/HomeComp";
import LoginComp from "./component/LoginComp";
import MenuComp from "./component/MenuComp";
import RegisterComp from "./component/RegisterComp";

//Context
export const AuthContext = createContext()

//Inisiasi State
const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
}

const reducer = (state, action) =>{
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user))
      localStorage.setItem("token", JSON.stringify(action.payload.token))
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
      token: action.payload.token
    }
    case "LOGOUT":
      localStorage.clear()
      return{
        ...state,
        isAuthenticated: false,
        user: null
      }
      default:
        return state
  }
}


function App() {
  let navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(()=>{
    if(!state.isAuthenticated){
      navigate('/')
    }if(state.isAuthenticated){
      navigate('/homepage')
    }
  },[state])

  return (
    <div>
        <AuthContext.Provider value={{state, dispatch}} >
        <MenuComp/>
          <Routes>
              <Route path="/" element={<LoginComp/>}/>
              <Route path="/homepage" element={<HomeComp/>}/>
              <Route path="/register" element={<RegisterComp/>}/>
          </Routes>
        </AuthContext.Provider>
    </div>

  );
}

export default App;
