import React, {useState} from "react";


import addSvg from "../assets/img/add.svg";
import {List} from "./List";


export const AddButtonList = () => {
    const [state, setState] = useState();

    return (
        <List items={[
            {
                className: "list__add-button",
                icon: addSvg,
                name: "Добавить папку"
            },
        ]}
        />
    )
}