import { useReducer, createContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import HomeComp from "./component/HomeComp";
import LoginComp from "./component/LoginComp";
import MenuComp from "./component/MenuComp";
import Publik from "./component/Publik";
import RegisterComp from "./component/RegisterComp";
import Transaksi from "./component/Transaksi";

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
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
        <AuthContext.Provider value={{state, dispatch}} >
        <MenuComp/>
          <Routes>
              <Route path="/" element={<Publik/>}/>
              <Route path="/login" element={<LoginComp/>}/>
              <Route path="/dashboard" element={<HomeComp/>}/>
              <Route path="/transaksi" element={<Transaksi/>}/>
              <Route path="/register" element={<RegisterComp/>}/>
          </Routes>
        </AuthContext.Provider>
    </div>

  );
}

export default App;
