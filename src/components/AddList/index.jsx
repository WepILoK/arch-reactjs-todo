import React, {useEffect, useState} from "react";
import * as axios from "axios";

import addSvg from "../../assets/img/add.svg";
import closeSvg from "../../assets/img/close.svg";

import {List, Badge} from "../../components"

import "./addList.scss";

export const AddList = ({colors, onAdd}) => {
    const [visiblePopup, setVisiblePopup] = useState(false);
    const [selectedColor, setSelectColor] = useState(3);
    const [isLoading, setIsLoading] = useState(false);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        if (Array.isArray(colors)) {
            setSelectColor(colors[0].id);
        }
    }, [colors])

    const onClose = () => {
        setVisiblePopup(!visiblePopup);
        setInputValue("");
        setSelectColor(colors[0].id);
    };

    const addList = () => {
        if (!inputValue) {
            alert('Введите название списка');
            return;
        }

        setIsLoading(true);
        axios.post('http://localhost:3001/lists', {
            name: inputValue,
            colorId: selectedColor
        }).then(({data}) => {
            const color = colors.filter(c => c.id === selectedColor)[0].name;
            const listObj = {...data, color: {name: color}};
            onAdd(listObj);
            onClose();
        }).catch(() => {
            alert("Ошибка при добавлении списка")
        }).finally(() => {
            setIsLoading(false);
        });
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
                    {colors.map(color =>
                        <Badge
                            onClick={() => setSelectColor(color.id)}
                            key={color.id}
                            color={color.name}
                            className={selectedColor === color.id && "active"}
                        />
                    )}
                </div>
                <button onClick={addList} className="button">
                    {isLoading ? 'Добавление...' : 'Добавить'}
                </button>
            </div>}

        </div>
    )
}