import React from 'react';
import style from '../sass/TodoList.sass';
import Todo from './Todo.js';

const TodoList = props => 

    <ul className={style.TodoList}>
        {props.data.map((todo) => <Todo key={todo.id} item={todo} remove={props.remove.bind(this)}/>)}
    </ul> 

export default TodoList;
