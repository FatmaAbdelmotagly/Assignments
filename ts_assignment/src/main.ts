class User {
  private Id: number;
  public name: string;
  public email: string;
  private password: string;
  protected phone: string;
  public age: number;
  protected notebooks : NoteBook[] = []

  constructor(
    Id: number,
    name: string,
    email: string,
    password: string,
    phone: string,
    age: number,
    notebooks ?: NoteBook 
  ) {
    if (age < 18 || age > 60) throw new Error("Age must be between 18 and 60");

    this.Id = Id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.age = age;

  }
  displayInfo(){
    console.log({
        name : this.name,
        age : this.age,
        email : this.email,
        phone:this.phone 
    });
    
  }
  public addNoteBooks(notebook: NoteBook): void {
    this.notebooks.push(notebook);
  }
}
const user1 = new User(
  1,
  "fatma abdo ",
  "123@gmail.com",
  "123456",
  "23456789",
  22
);
user1.displayInfo();
class Note {
  public Id: number;
  public title: string;
  public content: string;
  public author: User;

  constructor(
    id: number,
    title: string,
    content: string,
    author: User
  ) {
    this.Id = id;
    this.title = title;
    this.content = content;
    this.author = author;
  }

  preview() {
    return `content: ${this.content.slice(0, 10)} 🌸`;
  }
}
class Admin extends User{
    public manageNotes(notebook: NoteBook, noteId: number): void {
    notebook.removeNote(noteId);
    console.log("Admin is managing notes");
  }   
}
class NoteBook{
  notes : Note[] = []

addNote(note: Note) {
        this.notes.push(note)
    }
    removeNote(noteId : number) {  
      this.notes = this.notes.filter(ele=> ele.Id != noteId)
    }
}
class storage<T> {
  private items: T[] = [];

  addItem(item: T) {
    this.items.push(item);
  }

  removeItem(item: T) {
    this.items = this.items.filter(ele => ele !== item);
  }

  getAllItems(): T[] {
    return this.items;
  }
}