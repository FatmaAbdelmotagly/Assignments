var createCounter = function(init) {
    let realValue=init;
        function increment (){
            return ++init;
        }
        function decrement (){
            return --init;
        }
        function reset (){
            init=realValue
            return realValue;
        }
        return{increment,decrement,reset}
};


