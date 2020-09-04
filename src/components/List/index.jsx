import React from "react";
import classNames from "classnames";

import "./list.scss"


export const List = ({items, isRemovable}) => {
    return (
        <ul className="list">
            {items.map((item, id) =>
                <li key={item+id} className={classNames(item.className, {active: item.active})}>
                    <i>
                        {item.icon ? <img src={item.icon} alt=""/> : <i className={`badge badge--${item.color}`}></i>}
                    </i>
                    <span>{item.name}</span>
                </li>
            )}
        </ul>
    )
};