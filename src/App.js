import React from 'react';
import {List} from "./components/List/";

import listSvg from "./assets/img/list.svg";
import {AddButtonList} from "./components/AddButtonList";

function App() {
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
                <List items={[
                    {
                        color: "green",
                        name: "Фронтенд"
                    },
                    {
                        color: "blue",
                        name: "Фронтенд"
                    },
                    {
                        color: "pink",
                        name: "Фронтенд"
                    },
                ]}
                      isRemovable
                />
                <AddButtonList/>
            </div>
            <div className="todo__tasks">
                <button>ff</button>
            </div>
        </div>
    );
}

export default App;
