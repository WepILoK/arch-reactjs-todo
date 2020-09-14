import React, {useEffect, useState} from 'react';

import listSvg from "./assets/img/list.svg";

import {List, AddList, Tasks} from "./components"
import * as axios from "axios";

function App() {
    const [lists, setLists] = useState(null);
    const [colors, setColors] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3001/lists?_expand=color&_embed=tasks').then(({ data }) => {
                setLists(data);
            });
        axios.get('http://localhost:3001/colors').then(({ data }) => {
            setColors(data);
        });
    }, []);

    const onAddList = obj => {
        const newLists = [...lists, obj];
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
                            isRemovable
                            onRemove={id => {
                                const newLists = lists.filter(item => item.id !== id);
                                setLists(newLists);
                            }}/>
                    : <div>Загрузка...</div>}
                <AddList onAdd={onAddList} colors={colors}/>
            </div>
            <div className="todo__tasks">
                {lists && <Tasks list={lists[1]}/>}
            </div>
        </div>
    );
}

export default App;
