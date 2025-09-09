1) Difference between var, let, and const:
Answer: 
var:  function-scoped, can be redeclared, can be updated.

let: block-scoped, can be updated, but not redeclared in same scope.

const: block-scoped, cannot be reassigned (constant).

2) Difference between map(), forEach(), and filter():
Answer:

map(): creates a new array with transformed values.

forEach(): just loops through array, no return.

filter(): creates a new array with items that pass a condition.

3) Arrow functions in ES6:
Answer:
A compact way to write functions. They use => and automatically use the surrounding this (no own this).

4) Destructuring assignment in ES6:
Answer: 
A way to unpack values from arrays/objects into variables.

const [a, b] = [1, 2];  
const {name, age} = person;

5) Template literals in ES6:
Answer:
Strings written with backticks (`).
They support multi-line strings and ${} interpolation.
Different from + concatenation because it’s cleaner and easier.