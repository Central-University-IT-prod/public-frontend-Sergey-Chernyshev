import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStore } from "../../store/goalSlice";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function LoginPage(){
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.goal.userData);
    const [loginFormData, setLoginFormData] = useState({
        username: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [redirected, setRedirected] = useState(false);

    const handleLoginChange = (e) => {
        setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const storedData = JSON.parse(localStorage.getItem("usersData"));
        const userExists =
            storedData &&
            storedData.find(
                (user) =>
                    user.userData.username === loginFormData.username &&
                    user.userData.password === loginFormData.password
            );

        if (userExists) {
            dispatch(updateStore(userExists));
            
            const newUser = {
                username: loginFormData.username,
                password: loginFormData.password,
            };
            toast('Успешно! Переадресация', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                onClose: ()=>{
                    if (!redirected) {
                        localStorage.setItem("usersLogin", JSON.stringify(newUser)); 
                        navigate('/profile');
                        setRedirected(true);
                    }
                }
            });
        } else {
            setErrorMessage("Неправильный логин или пароль");
            toast('Неправильный логин или пароль!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }
    };
    
    useEffect(() => {
        if (JSON.parse(localStorage.getItem("usersLogin")) && !redirected) {
            toast('Переадресация!', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                onClose: ()=>{
                    navigate('/profile');
                    setRedirected(true);
                }
            })
        }
    }, [redirected]);

    return(
        <div className="container">
        <div className="background">
            <div className="shape"></div>
            <div className="shape"></div>
        </div>
        <form className="login-form" onSubmit={handleLogin}>
            <h3>Вход</h3>

            <label htmlFor="username">Имя пользователя</label>
            <input
                type="text"
                name="username"
                placeholder="Login"
                id="username"
                value={loginFormData.username}
                onChange={handleLoginChange}
            />

            <label htmlFor="password">Пароль</label>
            <input
                type="password"
                placeholder="Пароль"
                name="password" 
                id="password"
                value={loginFormData.password}
                onChange={handleLoginChange}
            />
            <div className="errorMessage">{errorMessage}</div>
            <button type="submit">Войти</button>
            <Link to="/reg">
              <div className="dopLink">Нет аккаунта? -Зарегестрируйтесь</div>
            </Link>  
        </form>
        <ToastContainer />
    </div>

    )

}

export default LoginPage
