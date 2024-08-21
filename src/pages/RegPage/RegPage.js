import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {registerUser} from "../../store/goalSlice";
import { Link, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RegPage(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [redirected, setRedirected] = useState(false);
    const [registerFormData, setRegisterFormData] = useState({
        username: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState("");





    const handleRegisterChange = (e) => {
        setRegisterFormData({
            ...registerFormData,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegister = (e) => {
        e.preventDefault();
        const storedData = JSON.parse(localStorage.getItem("usersData"));

        const userExists =
            storedData &&
            storedData.find(
                (user) =>
                    user.userData.username === registerFormData.username &&
                    user.userData.password === registerFormData.password
            );

        if (userExists) {
            setErrorMessage(
                "Пользователь с такими данными уже зарегестрирован"
            );
            toast('Пользователь с такими данными уже зарегестрирован!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
            });
        } else {
            const newUser = {
                username: registerFormData.username,
                password: registerFormData.password,
            };
            dispatch(registerUser(newUser));
            toast('Аккаунт создан! Переадресация', {
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
            <form className="login-form" onSubmit={handleRegister}>
                <h3>Регистрация</h3>

                <label htmlFor="username">Имя пользователя</label>
                <input
                    type="text"
                    name="username"
                    placeholder="Логин"
                    id="username"
                    value={registerFormData.username}
                    onChange={handleRegisterChange}
                />

                <label htmlFor="password">Пароль</label>
                <input
                    type="password"
                    placeholder="Пароль"
                    name="password" 
                    id="password"
                    value={registerFormData.password}
                    onChange={handleRegisterChange}
                />
                <div className="errorMessage">{errorMessage}</div>
                <button type="submit">Зарегестрироваться</button>
                <Link to="/login">
                <div className="dopLink">Есть аккаунт? -Войдите!</div>
                </Link> 
            </form>
            <ToastContainer />

        </div>

    )

}

export default RegPage