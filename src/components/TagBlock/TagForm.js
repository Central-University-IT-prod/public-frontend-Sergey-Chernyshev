import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TagBlock from "./TagBlock";

// Компонент формы с тегами
const TagForm = ({ setTags = () => { }, scale = 1, formatPage= 0 }) => {
    const storeData = useSelector((state) => state.goal.habitsTags);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTags, setSelectedTags] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleTagClick = (tagId) => {
        if (!selectedTags.includes(tagId)) {
            setSelectedTags([...selectedTags, tagId]);
        } else {
            setSelectedTags(selectedTags.filter((id) => id !== tagId));
        }
    };
    useEffect(() => {
        setTags(selectedTags)
    }, [selectedTags])

    const filteredTags = storeData.filter((tag) =>
        tag.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const isOnClickEmpty = (setTags.toString() === "() => {}");
    const isformatPage = (formatPage === 0);
    // console.log(formatPage)
    return (
        <div className="addHabit__form" style={scale!==1 ? { transform: 'scale('+scale+')', width: 'calc(100% / ' + scale + ')', height: 'calc(100% / ' + scale + ')'  } : {}}>

            <label>Теги:</label>
            <div className="form__allTags">
                <input
                    className="form__inputHabit inptHbt-sm"
                    style={{ minWidth: "300px" }}
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Поиск"
                />
                {filteredTags.map((tag, index) => (
                    !tag.automated || !isformatPage?
                        (<TagBlock
                            key={index}
                            id={index}
                            tagId={tag.id}
                            title={tag.title}
                            counter="10"
                            color={tag.color}
                            onClick={!isOnClickEmpty ? () => handleTagClick(tag.id) : () => {}}
                            linkPage={!isformatPage ? formatPage : undefined}
                        />) : ''
                ))}
            </div>
        </div>
    );
};

export default TagForm;
