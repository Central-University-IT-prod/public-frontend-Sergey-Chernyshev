import React, { useState } from 'react';
import Style from './EditHabitsBtn.module.css';

const EditHabitsBtn = ({ onClick }) => {
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        onClick(); 
        setClicked(!clicked);
    }

    return (
        <div className={Style.EditHabitsBtn} onClick={handleClick}>
            {clicked ? "-" : "Del"}
        </div>
    );
}

export default EditHabitsBtn;
