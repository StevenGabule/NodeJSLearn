function asyncFunction(callback) {
    setTimeout(callback, 200)
}

// called closure 
// using an anonymous function to preserve a global variable's value
let color = 'blue';
(color => {
    asyncFunction(() => console.log('The color is: ', color));
})(color);

color ='green';