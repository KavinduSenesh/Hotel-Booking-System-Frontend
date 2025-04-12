import {useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";
import {loginUser} from "../utils/ApiFunctions.js";

const Login = () => {
    const [errorMessage, setErrorMessage] = useState("")
    const [login, setLogin] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate()

    const handleInputChange = (e) => {
        setLogin({...login, [e.target.name] : e.target.value})
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        const success = await loginUser(login)
        if (success) {
            const token = success.token
            const decodedToken = jwtDecode(token)
            localStorage.setItem("token", token)
            localStorage.setItem("userId", decodedToken.sub)
            localStorage.setItem("userRpl", decodedToken.roles.join(","))
            navigate("/login")
            window.location.reload()
        }else {
            setErrorMessage("Invalid email or password")
        }
        setTimeout(() => {
            setErrorMessage("")
        }, 4000)
    }

    return(
        <div>

        </div>
    )
}
