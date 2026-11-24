"use strict";
class User {
    Id;
    name;
    email;
    password;
    phone;
    age;
    constructor(Id, name, email, password, phone, age) {
        if (age < 18 || age > 60)
            throw new Error("Age must be between 18 and 60");
        this.Id = Id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.age = age;
    }
    displayInfo() {
        console.log({
            name: this.name,
            age: this.age,
            email: this.age,
            phone: this.phone
        });
    }
}
const user1 = new User(1, "fatma abdo ", "123@gmail.com", "123456", 123456789, 22);
user1.displayInfo();

