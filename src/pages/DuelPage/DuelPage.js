import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RandomKeyGenerator } from '../../functions/RandomKeyGenerator/RandomKeyGenerator';
import { Link } from 'react-router-dom';
import { createNewTag } from '../../store/goalSlice';
import HabitBlock from '../../components/HabitBlock/HabitBlock';
import './duelPage.css';

const DuelPage = () => {
    const habitsData = useSelector(state => state.goal);
    const userData = useSelector(state => state.goal.userData);
    const [competitions, setCompetitions] = useState(JSON.parse(localStorage.getItem("competions")) || []);
    const comp = JSON.parse(localStorage.getItem("competions")) || [];
    const [competitionName, setCompetitionName] = useState('');
    const [selectedFriend, setSelectedFriend] = useState('');
    const dispatch = useDispatch();

    const handleFriendSelection = (friendId) => {
        setSelectedFriend(friendId);
    };




    const handleIncrement = (competitionId, player) => {
        let updatedCompetitions = comp.map(item => {
            if (item.uId === competitionId) {
                if (player === 'my') {
                    item.habitMy.taskParam.numFrom++;
                }
                if (player === 'friend') {
                    item.habitFriend.taskParam.numFrom++;
                }
            }
            return item;
        });

        localStorage.setItem("competions", JSON.stringify(updatedCompetitions));
    };




    const handleDecrement = (competitionId, player) => {
        let updatedCompetitions = comp.map(item => {
            if (item.uId === competitionId) {
                if (player === 'my') {
                    item.habitMy.taskParam.numFrom--;
                }
                if (player === 'friend') {
                    item.habitFriend.taskParam.numFrom--;
                }
            }
            return item;
        });

        localStorage.setItem("competions", JSON.stringify(updatedCompetitions));

    };

    const handleSubmit = () => {
        if (selectedFriend !== "") {
            const dataCompetition = {
                "title": competitionName,
                "uId": RandomKeyGenerator(5),
                "usernameCreator": userData.username,
                "usernameFriend": selectedFriend,
                "habitAdd": false,
                "habitMy": -1,
                "habitFriend": -1,
            };

            const newTag = {
                id: dataCompetition.uId,
                title: "Соревнование:" + competitionName,
                color: "#F75D64",
                automated: false
            };
            dispatch(createNewTag(newTag));
            let compData = JSON.parse(localStorage.getItem("competions")) || [];
            compData.unshift(dataCompetition);
            localStorage.setItem("competions", JSON.stringify(compData));
        }
    };


    const checkWinner = (item) => {
        if (item.habitMy.taskParam && item.habitFriend.taskParam) {
            if (item.habitMy.taskParam.numFrom >= item.habitMy.taskParam.numTo) {
                return item.usernameCreator;
            } else if (item.habitFriend.taskParam.numFrom >= item.habitFriend.taskParam.numTo) {
                return item.usernameFriend;
            }
        }
        return null;
    };
    

    return (
        <div className="page-container">
            <h1>Создание состязания</h1>
            <div className="input-container">
                <label htmlFor="competitionName">Название состязания:</label>
                <input
                    type="text"
                    id="competitionName"
                    className="dualeInp"
                    value={competitionName}
                    onChange={e => setCompetitionName(e.target.value)}
                />
            </div>
            <div className="friend-selection-container">
                <h2>Выберите друга для приглашения:</h2>
                {userData.friends.map((friend, index) => (
                    <div key={index}>
                        <div className="radio-container">
                            <input
                                type="radio"
                                id={`friend_${index}`}
                                name="selectedFriend"
                                value={friend.username}
                                checked={selectedFriend === friend.username}
                                onChange={() => handleFriendSelection(friend.username)}
                                className="radio-input"
                            />
                            <label htmlFor={`friend_${index}`} className="radio-label">{`Друг ${friend.username}`}</label>
                        </div>
                    </div>
                ))}
            </div>

            <div className='competition__desk'>*Чтобы добавить привычку в соревнование, создайте ее на <Link to="/tasks">странице привычек</Link> и добавь tag с названием воревнования</div>
            <div className="button-container">
                <button className="button" onClick={handleSubmit}>Создать состязание</button>
            </div>

            <div className='competitionOnWaitinf'>
                <div className='competitionOnWaitinf__title'>Соревнования в ожидании добавления</div>
                {comp.map((item, index) => {


                    if (!item.habitAdd && (item.usernameCreator === userData.username || item.usernameFriend === userData.username)) {
                        return <p key={index}>{item.title}</p>;
                    }
                    return null;
                })}
            </div>
            <div className='competitionOnWaitinf'>
                <div className='competitionOnWaitinf__title'>Соревнования Созданные</div>
                {comp.map((item, index) => {
                    const winner = checkWinner(item);

                    if (item.habitAdd && (item.usernameCreator === userData.username)) {
                        return (
                            <div className='habitBlock' key={index}>
                                <p>{item.title}</p>
                                <div className='creatorInfo'>
                                    <p>{item.usernameCreator}</p>
                                    <div className='habitInfo'>
                                        <div>{item.habitMy.task}</div>
                                        <div>{item.habitMy.taskParam.numFrom} / {item.habitMy.taskParam.numTo}</div>
                                        <button onClick={() => handleIncrement(item.uId, 'my')}>+</button>
                                        <button onClick={() => handleDecrement(item.uId, 'my')}>-</button>
                                    </div>
                                </div>
                                <div className='friendInfo'>
                                    <p>{item.usernameFriend}</p>
                                    <div className='habitInfo'>
                                        <div>{item.habitFriend.task}</div>
                                        <div>{item.habitFriend.taskParam.numFrom} / {item.habitFriend.taskParam.numTo}</div>
                                    </div>
                                </div>
                                {winner && <p>{`Победитель: ${winner}`}</p>}
                            </div>
                        );
                    } 
                    if (item.habitAdd && (item.usernameCreator === userData.username || item.usernameFriend === userData.username)) {
                        return (
                            <div className='habitBlock' key={index}>
                                <p>{item.title}</p>
                                <div className='creatorInfo'>
                                    <p>{item.usernameFriend}</p>
                                    <div className='habitInfo'>
                                        <div>{item.habitFriend.task}</div>
                                        <div>{item.habitFriend.taskParam.numFrom} / {item.habitFriend.taskParam.numTo}</div>
                                        <button onClick={() => handleIncrement(item.uId, 'friend')}>+</button>
                                        <button onClick={() => handleDecrement(item.uId, 'friend')}>-</button>
                                    </div>
                                </div>
                                <div className='friendInfo'>
                                    <p>{item.usernameCreator}</p>
                                    <div className='habitInfo'>
                                        <div>{item.habitMy.task}</div>
                                        <div>{item.habitMy.taskParam.numFrom} / {item.habitMy.taskParam.numTo}</div>
                                    </div>
                                </div>
                                {winner && <p>{`Победитель: ${winner}`}</p>}
                            </div>
                        );
                    } 
                    
                    
                    else {
                        return null;
                    }
                })}
            </div>

        </div>
    );
};

export default DuelPage;

