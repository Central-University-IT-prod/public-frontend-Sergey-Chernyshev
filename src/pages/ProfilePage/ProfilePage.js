import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeGoalData,
    exitUser,
    resetState,
    saveGoalData,
    setUniqId,
} from "../../store/goalSlice";
import Push from "push.js";
import { Link, useNavigate } from "react-router-dom";
import FriendsBlock from "../../components/ProfileComponents/FriendsBlock/FriendsBlock";
import { RandomKeyGenerator } from "../../functions/RandomKeyGenerator/RandomKeyGenerator";

const ProfilePage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userData = useSelector((state) => state.goal.userData)

    const exitHandleClick = () => {
        dispatch(exitUser());
        dispatch(resetState());
        dispatch(setUniqId());
        localStorage.removeItem("usersLogin");
    };
    useEffect(() => {    
        if (JSON.parse(localStorage.getItem("usersLogin")) === null) {
          navigate("/login")
      }
    }, [userData]);



    const [jsonData, setJsonData] = useState(null);

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
  
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result);
          setJsonData(data);
          console.log(data)
          data.habits.forEach(element => {
            let total = 0
            let type
            if (element.period === "daily")  {
              total = 86400
              type = "day"

            }
            if (element.period === "weekly")  {
              total = 86400*7
              type = "week"

            }
            if (element.period === "monthly")  {
              total = 86400*7*31
              type = "month"
            }

            const newData = {
              "id": RandomKeyGenerator(12),
              "description": "",
              "task": element.title,
              "time": {
                  "creationTime": Math.floor(new Date(element.addDate).getTime() / 1000),
                  "periodStart": Math.floor(new Date(element.addDate).getTime() / 1000),
                  "totalTime": total,
                  "timeEnd": 0,
                  "type": type,
                  "months": element.period === "monthly" ? 1 : 0,
                  "weeks": element.period === "weekly" ? 1 : 0,
                  "days": element.period === "dayly" ? 1 : 0,
                  "hours": 0,
                  "minutes": 0
              },
              "taskParam": {
                  "numFrom": 0,
                  "numTo": 1000,
              },
              "done": false,
              "progressTimeLine": [
                  {
                      "type": "create",
                      "time": 1711420853,
                      "done": false,
                      "progress": "0"
                  }
              ],
              "tagsId": [
                  "Ndl188UhdS"
              ]
            }
            console.log(newData)

            dispatch(saveGoalData(newData))

          });



          
        




        } catch (error) {
          console.error('Error parsing JSON file:', error);
        }
      };
  
      reader.readAsText(file);
    };

    


    return (
      <div className="profilePage">
        <div className="ProfileBlock">
          <div className="ProfileBlock__logo">
            <div className="logo"></div>
          </div>
          <div className="ProfileBlock__username">{userData.username}</div>
          <div className="ProfileBlock__exit" onClick={exitHandleClick}>выйти</div>

          <div className="friendsBlock">
            <div className="friendsBlock__titte">Друзья:</div>
              <FriendsBlock />
          </div>

          <div > Настройки:</div>
          <div>Файл:</div>
          <input type="file" accept=".json" onChange={handleFileChange} />
        </div>
      </div>

    )
};

export default ProfilePage;
