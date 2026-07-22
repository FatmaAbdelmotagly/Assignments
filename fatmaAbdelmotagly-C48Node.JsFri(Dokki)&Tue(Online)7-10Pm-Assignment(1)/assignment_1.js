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
let day =1;
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
let strings =["fatma","abd","elmotagly"];
let length=strings.map(
    (str)=>(str.length)
)
console.log(length);
