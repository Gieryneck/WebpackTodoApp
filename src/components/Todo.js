import React from 'react';
import style from '../sass/Todo.sass';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faHandPointRight } from '@fortawesome/fontawesome-free-regular';


let Todo = props => <li className={style.Todo} onClick={props.remove.bind(this, props.item.id)}><FontAwesomeIcon className={style.hand} icon={faHandPointRight} />{props.item.text}</li>

export default Todo;
//<i class="far fa-hand-point-right"></i>


/* 

    WYJAŚNIENIE BINDA:


<button type="submit" onClick={this.props.removeTaskFunction(todo)}>Submit</button>

"My question is: Why does mine onClick function fire on render and how to make it not to?"


"Because you are CALLING that function instead of passing the function to onClick, change that line to this:"

<button type="submit" onClick={() => { this.props.removeTaskFunction(todo) }}>Submit</button>

OR

"Instead of calling the function, bind the value to the function:"

this.props.removeTaskFunction.bind(this, todo)


https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind

*/