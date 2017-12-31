import React from 'react';
import style from '../../sass/App.sass';
import Title from '../Title.js';
import TodoList from '../TodoList.js';
import TodoForm from '../TodoForm.js';



// to bedzie jeden z naszych react containerow, nie renderuje sam w sobie żadnej struktury (tylko div okalajacy calosc aplikacji)
// jego zadaniem jest gromadzenie informacji w stanach, oraz zmiana i przekazywanie tych danych innym elementom reactowym  

class App extends React.Component {

    constructor(props) {

        super(props);

        this.state = {

            data: [{
                id: 1,
                    text: 'clean room'
                }, {
                id: 2,
                    text: 'wash the dishes'
                }, {
                id: 3,
                    text: 'feed my cat'
                }]
        };

    }

    addTodo = (val) => { // arrow fction bo uzywamy potem "this"

        const uuidv4 = require('uuid/v4');

        const todo = {

            id: uuidv4(), // generator losowych wartosci, npm install --save uuid
            text: val,
        };
        
        const data = [...this.state.data, todo]// spread operator, w tym wypadku dziala jak push. data jest tablica obiektow
        console.log(data);
        this.setState({data: data});
    }

    removeTodo = (id, e) => { // "e" to event ktory odpalil sie na onClicku, 
        //nie potrzebjemy go akurat tutaj ale warto wiedziec ze onClick dodaje po drodze parametr ktory mozna wykorzystac

        const remainder = this.state.data.filter( todo => todo.id !== id); // zwraca tylko te todo ktore maja id rozne od id usuwanego todo
        this.setState({data: remainder});
    }

    render() {
        
        // style.TodoApp - uzywamy loadera CSS
        return (
            <div className = {style.TodoApp}>
                <Title todosCount = {this.state.data.length}/>
                <TodoForm submitForm = {this.addTodo}/>
                {this.state.data.length !== 0 ? (<TodoList data = {this.state.data} remove={this.removeTodo}/>) : (null)}    
            </div>
        );
    }
}

export default App;