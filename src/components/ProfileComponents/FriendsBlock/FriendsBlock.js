import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addFriend } from '../../../store/goalSlice';

const FriendsBlock = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.goal.userData);
  const [searchValue, setSearchValue] = useState('');
  const [foundFriend, setFoundFriend] = useState(null);

  const findFriend = () => {
    const usersData = JSON.parse(localStorage.getItem('usersData')) || [];
    const foundUser = usersData.find(user => user.userData.username === searchValue);
    if (foundUser) {
      setFoundFriend(foundUser);
    } else {
      setFoundFriend(null);
    }
  };

  const addFoundFriend = () => {
    if (foundFriend) {
      dispatch(addFriend({
        "uId": foundFriend.userData.uId,
        "username": foundFriend.userData.username
    }));
    console.log(foundFriend)
    let usersData = JSON.parse(localStorage.getItem('usersData')) || [];

    usersData = usersData.map((value, index) => {
    if (value.userData.uId === foundFriend.userData.uId) {
        foundFriend.userData.friends.unshift({
            "uId": userData.uId,
            "username": userData.username
        })
        return foundFriend; 
    }
    return value;
      });
    localStorage.setItem("usersData", JSON.stringify(usersData))
      
    }
  };

  return (
    <div className="friends-block">
      <div className="friends-list">
        {userData && userData.friends && userData.friends.length > 0 ? (
          userData.friends.map((i, index) => (
            <Link to={`/profile/${i.uId}`} key={index} className="friend-link">
              <p>Друг {i.username}</p>
            </Link>
          ))
        ) : (
          <p className="no-friends-message">Друзей нет</p>
        )}
      </div>
      
      <div className="search-container">
        <input 
          type="text" 
          value={searchValue} 
          onChange={(e) => setSearchValue(e.target.value)} 
          placeholder="Введите имя друга"
          className="search-input"
        />
        <button onClick={findFriend} className="search-button">Найти друга</button>
      </div>

      {foundFriend && (
        <div>
          <p className="found-friend-message">Найденный друг: {foundFriend.userData.uId}</p>
          <button onClick={addFoundFriend} className="add-friend-button">Добавить в друзья</button>
        </div>
      )}
    </div>
  );
}

export default FriendsBlock;
