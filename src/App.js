import React, {useEffect, useState} from 'react';
import * as axios from "axios";

import {List, AddList, Tasks} from "./components"

import listSvg from "./assets/img/list.svg";

function App() {
    const [lists, setLists] = useState(null);
    const [colors, setColors] = useState(null);
    const [activeItem, setActiveItem] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3001/lists?_expand=color&_embed=tasks').then(({data}) => {
            setLists(data);
        });
        axios.get('http://localhost:3001/colors').then(({data}) => {
            setColors(data);
        });
    }, []);

    const onAddList = obj => {
        const newLists = [...lists, obj];
        setLists(newLists);
    };

    const onAddTask = (listId, taskObj) => {
        const newLists = lists.map(item => {
            if (item.id === listId) {
                item.tasks = [...item.tasks, taskObj]
            }
            return item;
        })
        setLists(newLists);
    };

    const onEditListTitle = (id, title) => {
        const newLists = lists.map(item => {
            if (item.id === id) {
                item.name = title
            }
            return item
        });
        setLists(newLists);
    };

    return (
        <div className="todo">
            <div className="todo__sidebar">
                <List items={[
                    {
                        icon: listSvg,
                        name: "Все задачи",
                        active: true
                    }
                ]}
                      isRemovebel
                />
                {lists
                    ? <List items={lists}
                            onRemove={id => {
                                const newLists = lists.filter(item => item.id !== id);
                                setLists(newLists);
                            }}
                            onClickItem={item => {
                                setActiveItem(item)
                            }}
                            activeItem={activeItem}
                            isRemovable
                    />
                    : <div>Загрузка...</div>}
                <AddList onAdd={onAddList} colors={colors}/>
            </div>
            <div className="todo__tasks">
                {lists && activeItem &&
                <Tasks
                    onAddTask={onAddTask}
                    onEditTitle={onEditListTitle}
                    list={activeItem}
                />}
            </div>
        </div>
    );
}

export default App;
