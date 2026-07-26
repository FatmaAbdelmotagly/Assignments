//prob 1 :
console.log(Number("123") + 7);

//prob 2 :
let value = 0;
if (!value) console.log("invalid");
else console.log("valid");

//prob 3 :
for (let i = 1; i <= 10; i++) {
  if (i % 2 == 0) continue;
  console.log(i);
}

//prob 4 :
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 21];
let evenNumbers = numbers.filter((num) => num % 2 == 0);
console.log(evenNumbers);

//prob 5 :
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
console.log([...arr1, ...arr2]);

//prob 6 :
let day = 1;
switch (day) {
  case 1:
    console.log("sunday");
    break;
  case 2:
    console.log("monday");
    break;
  case 3:
    console.log("tuesday");
    break;
  case 4:
    console.log("wednsday");
    break;
  case 5:
    console.log("thursday");
    break;
  case 6:
    console.log("friday");
    break;
  case 7:
    console.log("saturday");
    break;
  default:
    console.log("nit a valid day");
}

//prob 7 :
let strings = ["fatma", "abd", "elmotagly"];
let length = strings.map((str) => str.length);
console.log(length);

//prob 8 :
let num = 15;
if (num % 3 == 0 && num % 5 == 0) console.log("Divisible by both");
else if (num % 3 == 0) console.log("Divisible by 3 only");
else if (num % 5 == 0) console.log("Divisible by 5 only");
else console.log("not divisible by either 3 nor 5");

//prob 9 :
let num1 = 5;
const square = (num) => num ** 2;
console.log(square(num1));

//prob 10 :
const person = {
  name: "fatma",
  age: "21",
};

function dis(obj) {
  const { name, age } = obj;
  return `i'm ${name} and i'm ${age} old`;
}
console.log(dis(person));

//prob 11 :
function sum(...nums) {
  let total = 0;
  for (let num of nums) {
    total += num;
  }
  return total;
}
console.log(sum(1, 2, 3, 4, 5));

//prob 12 :
function printSuccess() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("success");
    }, 3000);
  });
}
printSuccess().then((val) => {
  console.log(val);
});

//prob 13 :
let arr = [1, 2, 3, 4];
function largest(array) {
  let max = Number.MIN_VALUE;
  for (num of array) {
    if (max < num) max = num;
  }
  return max;
}
console.log(largest(arr));

//prob 14 :
function keys(obj) {
  return Object.keys(obj);
}
console.log(keys(person));

//prob 15 :
let string = "The quick brown fox";
function spliter(str) {
  return str.split(" ");
}
console.log(spliter(string));
///////////////////////////////////////////////////////////////
/*
  1) for..of vs for..each :
  for each is simpler for basic operations, while for of gives you more control over the loop.
  for each : we use it if we want to do an action for every element - or if we don't want to stop the loop early - we can't use break or continue with it - don't need await to work sequentially
  for of : use it if you want to stop the loop early - we can use break and continue - works sequentially with await
------------------------------------------------------------------------------------------------------------------------------------
  2) hoisting : JS processes declarations before executing the code
            let VS var
   console.log(x); // undefined
    var x = 10;

   console.log(k);// reference error
   let k =10;


   TDZ : the period during which a let or const variable exists in its scope but cannot be accessed yet


   {
     (TDZ starts here)
    console.log(name); // ReferenceError
     let name = "Fatma";
     (TDZ ends here)
    console.log(name); // Fatma 
}

--------------------------------------------------------------------------------------------------------------
3) the main difference between == and === is type coercion
5=="5" // true (convert the type and compares the value ) - loose equality
5=="5" // false  (compares both the value and the data type )- Strict equality

--------------------------------------------------------------------------------------------------------------
4) 
HOW IT WORKS =>
try {
  (Code that might cause an error)
} catch (error) {
  ( Code that handles the error)
}
 
it's important to use with async operations because it can fail for many reasons
(invalid data /  API errors / rejected promise / network errors)
-------------------------------------------------------------------------------------------------------------
5) 
the difference is who causes the type change
 if it's manually(by using a function or operation) ==> conversion

 const num = "10";
 const convertedNum = Number(num);

 if JS automatically converts a value's type ==> Coercion (Implicit Conversion)

 const result = "5" + 2;
 console.log(result);  //52 - result is a string
 */