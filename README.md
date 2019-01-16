# About
This game was created to improve my JavaScript skills and learn how ReactJS works.
Code wasn't written by experienced ReactJS developer.

# Installation
- Run `yarn install`

- Run `yarn start`
- go to http://localhost:3000

# Libraries/Technologies
- [Bootstrap](https://getbootstrap.com/)
- [ReactJS](https://reactjs.org)
- [TypeScript](https://www.typescriptlang.org/)
- [Yarn](https://yarnpkg.com/lang/en/)
- [Sass](https://sass-lang.com/)
- [FontAwesome](https://fontawesome.com/)

# Game rules
Goal of this game is find all bombs on a field. 
To reveal field click left mouse button on it.
To add flag click right mouse button.
When you click empty fields then it will reveal all the closest empty fields and closest number fields.

# How it's works
When you go to the page script will show you a modal with form. 
The form has basic validation, you can't pass higher values or lower than the implemented range. 
Range for bombs' quantity is calculated dynamically and depends on width and height value. 
When you pass form then script shows game field.
Game stops in two cases:
- The user clicked on bomb field
- The user found all bombs

In app we have few fields types:
- Undefined - temporary field created during field render
- Bomb - if you click it then u lose
- Empty - field which doesn't have bomb in neighbour
- Value - field which has bombs in neighbour, it value depends on the neares bombs' quantity

# About scripts
I tried to separate logic and render components.
- Logic should have only algorithms and states
- Render should only render view

# Important things in react (based on own problems)
- ReactJS use two elements to hold data:
    - props - brings external data to component
    - state - hold some data in a component

- ReactJS refresh component when some of these elements changed
It works asynchronously, to set state we should use `this.setState()` method. 
- When you change state property more than once ReactJS will refresh view only once with the newest values.
- There is a problem with mutability, when we change state then we should create new instance of state property, we shouldn't change 'old' value.
ReactJS delivers us methods where we can compare 'old' value with 'new'. with mutability it's not possible.
- It's important to know basic components methods, e.g. it helps to disable some refresh actions or helps when we want to do something only once, during component render.
- To avoid mixing logic and render actions we should use callbacks (e.g. we want to show bomb when the user click field. Method should be implemented in logic component and we should send it as a props to render component)
- ReactJS doesn't works well with TypeScript. When you are not experienced developer you shouldn't use it in your projects.

# Known bugs
- When you click on a empty field then is a possibility that one of the field will not change status
- This game is not designed for large fields (like 100x100), browser will kill it when you start this type of game
- Code needs some refactor (better names, performance improvements)