import React from "react";
import classNames from "classnames";
import * as axios from "axios";

import removeSvg from "../../assets/img/remove.svg"

import {Badge} from "../../components";

import "./list.scss"


export const List = ({items, isRemovable, onClick, onRemove}) => {
    const removeList = (list) => {
        if (window.confirm("Вы действительно хотите удалить список?")) {
            axios.delete("http://localhost:3001/lists/" + list.id).then(() => {
                onRemove(list.id);
            })
        }
    };

    return (
        <ul onClick={onClick} className="list">
            {items.map((item, id) =>
                <li key={item + id} className={classNames(item.className, {active: item.active})}>
                    <i>
                        {item.icon ? <img src={item.icon} alt=""/> : <Badge color={item.color.name}/>}
                    </i>
                    <span>{item.name}</span>
                    {isRemovable &&
                    <img className="list__remove-icon"
                         src={removeSvg} alt="Remove icon"
                         onClick={() => removeList(item)}/>}
                </li>
            )}
        </ul>
    )
};