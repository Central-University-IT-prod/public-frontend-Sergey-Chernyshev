import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const TagBlock = ({ title, counter, color, onClick = () => { }, tagId, linkPage = 0, scale = 1 }) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
    onClick(tagId);
  };

  const isOnClickEmpty = onClick.toString() === "() => {}";
  const isLinkPageEmpty = (linkPage === 0);
  const tagBlockContent = (
    <div
      className="form__tagBlock"
      style={{
        backgroundColor: isActive ? color : 'transparent',
        borderColor: color,
        transform: scale !== 1 ? 'scale(' + scale + ')' : '',
        width: scale !== 1 ? 'calc(100% / ' + scale + ')' : '',
        height: scale !== 1 ? 'calc(100% / ' + scale + ')' : ''
      }}
      onClick={isOnClickEmpty ? undefined : handleClick}
    >
      <div className="tagBlock__title" style={{ color: isActive ? "#16171B" : color }}>{title}</div>
      <div className="tagBlock__counter" style={{ backgroundColor: color }}>{counter}</div>
    </div>
  );

  return !isLinkPageEmpty ? (
    <Link to={`/${linkPage}?idTag=${tagId}`} className="tag-block-link">
      {tagBlockContent}
    </Link>
  ) : tagBlockContent;
};

export default TagBlock;
