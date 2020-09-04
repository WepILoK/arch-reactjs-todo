import React from "react";
import classNames from "classnames";

import {Badge} from "../Badge";

import "./list.scss"


export const List = ({items, isRemovable, onClick}) => {
    return (
        <ul onClick={onClick} className="list">
            {items.map((item, id) =>
                <li key={item+id} className={classNames(item.className, {active: item.active})}>
                    <i>
                        {item.icon ? <img src={item.icon} alt=""/> : <Badge color={item.color}/>}
                    </i>
                    <span>{item.name}</span>
                </li>
            )}
        </ul>
    )
};