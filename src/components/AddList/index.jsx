import React, {useState} from "react";


import addSvg from "../../assets/img/add.svg";
import closeSvg from "../../assets/img/close.svg";

import {List} from "../List";
import {Badge} from "../Badge";

import "./addList.scss";

export const AddList = ({colors, onAdd}) => {
    const [visiblePopup, setVisiblePopup] = useState(false);
    const [selectedColor, setSelectedColor] = useState(colors[0].id);
    const [inputValue, setInputValue] = useState("");

    const onClose = () => {
        setVisiblePopup(!visiblePopup);
        setInputValue("");
        setSelectedColor(colors[0].id);
    };

    const addList = () => {
        if (!inputValue) {
            alert("Введите название списка");
            return;
        }
        const color = colors.filter(c => c.id === selectedColor)[0].name;
        onAdd({id: Math.random(), name: inputValue, color });
        onClose()
    };


    return (
        <div className="add-list">
            <List onClick={onClose} items={[
                {
                    className: "list__add-button",
                    icon: addSvg,
                    name: "Добавить список"
                },
            ]}
            />
            {visiblePopup &&
            <div className="add-list__popup">
                <img onClick={onClose} src={closeSvg} alt="" className="add-list__popup-close-btn"/>

                <input className="field" type="text" placeholder="Название списка"
                       value={inputValue} onChange={e => setInputValue(e.target.value)}/>

                <div className="add-list__popup-colors">
                    <ul>
                        {colors.map((color) =>
                            <Badge
                                onClick={() => setSelectedColor(color.id)}
                                key={color.id}
                                color={color.name}
                                className={selectedColor === color.id && "active"}
                            />
                        )}
                    </ul>
                </div>
                <button onClick={addList} className="button">Добавить</button>
            </div>}

        </div>
    )
}