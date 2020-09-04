import React, {useState} from "react";


import addSvg from "../../assets/img/add.svg";
import closeSvg from "../../assets/img/close.svg";

import {List} from "../List";
import {Badge} from "../Badge";

import "./addList.scss";

export const AddList = ({colors}) => {
    const [visiblePopup, setVisiblePopup] = useState(false);
    const [selectedColor, setSelectedColor] = useState(colors[0].id);

    const ListMenuVisible = () => {
        setVisiblePopup(!visiblePopup)
    };

    return (
        <div className="add-list">
            <List onClick={ListMenuVisible} items={[
                {
                    className: "list__add-button",
                    icon: addSvg,
                    name: "Добавить список"
                },
            ]}
            />
            {visiblePopup &&
            <div className="add-list__popup">
                <img onClick={ListMenuVisible} src={closeSvg} alt="" className="add-list__popup-close-btn"/>
                <input className="field" type="text" placeholder="Название списка"/>
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
                <button className="button">Добавить</button>
            </div>}

        </div>
    )
}