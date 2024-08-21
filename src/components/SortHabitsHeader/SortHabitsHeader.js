import React from 'react';
import TagForm from '../TagBlock/TagForm';
import TagBlock from '../TagBlock/TagBlock';
import { Link } from 'react-router-dom';

function SortHabitsHeader() {
  return (
    <div className="AllHabits__sortHabitsHeader">
      <h1 className="sortHabitsHeader__title">Все цели</h1>
      <section className="section__sortHabits__form">
        <TagForm scale={0.6} formatPage="tasks" />
        <Link to='/tasks'>
          <TagBlock
            title={"Сбросить"}
            color={"#FFFFFF"}
            scale={0.6}
          />
        </Link>
        <Link to='/tasks?filterClear=1'>
          <TagBlock
            title={"Скрыть пустые"}
            color={"#FFFFFF"}
            scale={0.6}
          />
        </Link>
      </section>
    </div >
  );
}

export default SortHabitsHeader;
