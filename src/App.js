import React, {useState} from 'react';
import {List} from "./components/List/";

import listSvg from "./assets/img/list.svg";
import {AddList} from "./components/AddList";
import DB from "./assets/db.json"
import {Tasks} from "./components/Tasks";

function App() {
    const [lists, setLists] = useState(DB.lists.map(items => {
        items.color = DB.colors.filter(color => color.id === items.colorId)[0].name
        return items
    }));

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
                <List items={lists} isRemovable onRemove={(list)=>console.log(list)}/>
                <AddList onAdd={onAddList} colors={DB.colors}/>
            </div>
            <div className="todo__tasks">
                <Tasks/>
            </div>
        </div>
    );
}

export default App;
