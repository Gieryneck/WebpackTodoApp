import React from 'react';
import style from '../sass/Title.sass';

const Title = props => <h1 className={style.Title}><span>Todos!</span> Total count: <span>{props.todosCount}</span></h1>


export default Title;