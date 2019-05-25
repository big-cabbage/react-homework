import React, {PureComponent} from 'react';
import './TodoList.css';

class TodoList extends PureComponent
{
    state = {
        todoList:[
            {
                id:0,
                content:"test",
                cross: false
            }
        ],
        count: 1
    }

    handleClick = ()=>{
        const content = this.todoContent.value;
        const list = this.state.todoList.concat({
            id:this.state.count,
            content: content,
            cross: false
        });
        this.setState({todoList:list, count: this.state.count+1});
        // this.todoContent.value = "";
    }

    handleDelete = (id, e)=>{
        e.stopPropagation();
        let index = -1;
        for(var i =0; i< this.state.todoList.length; i++)
        {
            if(this.state.todoList[i].id === id)
            {
                index = i;
            }
        }
        if(index > -1)
        {
            this.state.todoList.splice(index,1);
            let list = this.state.todoList.concat();
            this.setState({todoList: list});
        }
        console.log("id: " + id);
        console.log("length: " + this.state.todoList.length);
    }

    handleFinished = (id, e)=>{
        e.stopPropagation();
        let index = -1;
        for(var i =0; i< this.state.todoList.length; i++)
        {
            if(this.state.todoList[i].id === id)
            {
                index = i;
            }
        }
        if(index > -1)
        {
            this.state.todoList[index].cross = !this.state.todoList[index].cross;
            let list = this.state.todoList.concat();
            this.setState({todoList: list});
        }
    }

    render()
    {
        const listItems = this.state.todoList.map(i=>{
                            return(
                                <li className="TodoList-li">
                                    <span className="TodoList-task" onClick={this.handleFinished.bind(this, i.id)} style={{textDecoration: i.cross?'line-through':'none'}}>{i.content}</span>
                                    <button className="TodoList-delete" type="primary" size="small" onClick={this.handleDelete.bind(this, i.id)}>x</button>
                                </li>
                            )
                        })
        return(
            <div>
                <div><h1>TODO LIST!!</h1></div>
                <div>
                    <ul className="TodoList-ul">
                        {listItems}
                    </ul>
                </div>
                <div>
                    <input type="text" ref={e=>this.todoContent = e}/>
                    <input type="button" onClick={this.handleClick.bind(this)} value="ADD"/>
                </div>
            </div>
        );
    }
}

export default TodoList