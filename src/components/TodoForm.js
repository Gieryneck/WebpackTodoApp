import React from 'react';
import style from '../sass/TodoForm.sass';

class TodoForm extends React.Component {

    constructor(props) {
        super(props);
        //console.log(this.props);
        this.state = {

            value: '',
            invalidInput: false, 
        };
        
      
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }


    handleChange(event) {

        this.setState({value: event.target.value}); // event.target.value to value inputa na którym dokonuje sie event(pisanie)   
    }

    handleSubmit(event) {
        
        event.preventDefault(); // na event wysłania formularza blokujemy domyślną akcję (przesłanie na serwer)

        if(this.state.value.trim().length === 0) {
            
            this.setState({invalidInput: true});
            setTimeout( () => (this.setState({invalidInput: false})), 1000);
            return
        } 

        /* 
          powyżej: nie chcemy pustych submitow,
          trim() kasuje whitespace na pocz i koncu stringa, jesli dlugosc po 
          usunieciu whitespace jest 0 to nie submitujemy
        */
        
        this.props.submitForm(this.state.value);
        this.setState({value:''});
    }

    render() {

        const invalidInput = this.state.invalidInput;
        
        return (
            <div className={style.TodoForm}>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="newItem">New todo:</label>
                    <input id="newItem" type="text" onChange={this.handleChange} value={this.state.value}/>
                    <input type="submit" value="Add" onClick={this.handleSubmit}/>
                </form>
                <div>
                    {invalidInput ? (<p>You cannot add an empty todo!</p>) : (null)} 
                </div>
            </div>
        ); // powyzej ternary operator - shorthand dla if else:    invalidInput ? kod dla TRUE : kod dla FALSE
    }
} 




export default TodoForm;

/* 
https://reactjs.org/docs/forms.html


Labeling
Every HTML form control, such as <input> and <textarea>, needs to be labeled accessibly. We need to provide 
descriptive labels that are also exposed to screen readers.

Note that the for attribute is written as htmlFor in JSX:

<label htmlFor="namedInput">Name:</label>
<input id="namedInput" type="text" name="name"/>
Notifying the user of errors*/