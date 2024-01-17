// +++++++++++++++++++
// TypeScript Overview
// +++++++++++++++++++

/**
 * Fundamentals
 * Advanced Types
    * Type Aliases
    * Union/Intersection
    * Literal Types
    * Nullable Types
    * Optional Chaining
    * Nullish Coalescing Operator
    * Type Assertions
    * Unkown/Never Types
 * Classes
    * Creating Classes
    * Index Signature Property
    * Inheritance
    * Overriding
    * Polymorphism
    * Abstract Classes
    * Interfaces
 * Generics
    * Generic Classes
    * Generic Functions
    * Generic Interfaces
    * Generic Constraints
    * Extending Generic Classes
    * The keyof Operator
    * Type Mapping
 * Decorators
    * Class Decorators
    * Parameterized Decorators
    * Method Decorators
    * Decorator Compositions
    * Accessor Decorators
    * Property Decorators
    * Parameter Decorators
 * Modules
 */


// ============
// Fundamentals
// ============


const enum Size {
    Small = 3,
    Medium,
    Large,
}
let mySize: Size = Size.Medium;

console.log(mySize);

function calculateTax2(income: number, taxYear: number): number {
    if (taxYear < 2022) return income * 1.2;
    return income;
}

console.log(calculateTax(50_000, 2021));

let log: any = (message: string) => console.log(message);



// ==============
// Advanced Types
// ==============


// Type Aliases


type Employee = {
    readonly id: number;
    name: string;
    retire: (date: Date) => void; // signature for the method declared in type alias
};

let employee: Employee = {
    id: 1,
    name: "",
    retire: (date: Date) => {
        console.log(date); // initialize the implementation for this method
    },
};

// the alternative to this to declare a variable employee (declare all fields and methods)
// and then initialize it (set all fields and methods again):

/*
let employee : {
    readonly id: number,
    name: string,
    retire: (date: Date) => void
    
} = {
    id: 123456789,
    name: 'Alex',
    retire: (date: new Date()) => {
        console.log(date)
    };
}
*/

// or just make an Employee type alias so that for a new Employee
// we only need to initialize the Employee type

employee.name = "Alex";


// Union Types / Intersection Types


function kg_To_Lbs(weight: number | string): number {
    // this function takes in a weight that can either be a string or a number
    // this function then uses typeof to check which type and deals with it accordingly
    if (typeof weight == "number") return weight * 2.2;
    else return parseInt(weight) * 2.2;
}

/*
// type intersection in action
type UIWidget = Draggable & Resizeable

let myWidget : UiWidget = {
    drag () => {},
    resize () => {}
}

*/


// Literal Types


type Quantity = 50 | 100;
let quantity: Quantity = 50;
// alternative:
// let quantity: 50 | 100 = 50;

type Metric = "cm" | "inch";


// Nullable Types


// this nullable function
function SayHello(name: string | null | undefined): void {
    if (name) console.log(name.toUpperCase());
    else console.log("undefiled or null");
}

// is able to take in 'null'
SayHello(null);


// Optional Property Access


type Customer = {
    birthday?: Date;
};

function findCustomer(id: number): Customer | null {
    return id === 0 ? null : { birthday: new Date() };
}

let customer = findCustomer(0);

// optional property access operator
console.log(customer?.birthday?.getUTCFullYear());

// optional element access operator:
/*
// suppose we have an array 'customers'

console.log(customers?.[0])
(instead of :
if (customers !== null && customers !== undefined) console.log(customers[0]);)

*/


// Nullish Coalescing Operator


let speed: number | null = null; // literal variable 'speed'
let ride = {
    // new object 'ride' with field 'speed'
    // nullish coalescing operator
    speed: speed ?? 30,
    // alternative speed: speed !== null ? speed : 30
};


// Type Assertions


// "we know more about the type of this object than compiler"

// let phone = <HTMLInputElement>document.getElementById("phone");
// or
// let phone = document.getElementById('phone') as HTMLInputElement

// we can now access the 'value' field:
// phone.value;


// The Unknown Type


// note: 'unknown' is preferred to 'any' because the compiler forces type narrowing
// note: using any gives us access to all methods

function render(document: unknown) {
    if (typeof document === "string") {
        document.toUpperCase;
        return null;
    }
    // or if it's not a built in type:
    // if (document instanceof === wordDocument)
    if (typeof document === "number") return document * 2.2;
    else return null;
}


// The Never Type


function processEvents(): never {
    while (true) {
        // Do stuff
    }
}
// processEvents()
// console.log("hello world"); // note that this line will never get executed -> infinite loop
// note: can configure config json "allowUnreachableCode" to true or false

function reject(message: string): never {
    throw new ErrorEvent(message + ", so fuck you!");
}
// reject('...')
// console.log("hello!");


// EXERCISES


let users = [
    { name: "John Smith", age: 30, occupation: "Software engineer" },
    { name: "Kate Muller", age: 28 },
];

type User2 = {
    name: string,
    age: 30,
    occupation?: string
    address?: string
};


type Bird = {
    fly: () => void,
};

type Fish = {
    swim: () => void,
};

type Pet = Bird | Fish;

type Weekday = 'Monday' | 'Tuesday' | 'Wednesday'; // literal type

function getUser() : null | User2 {
    if ( 5 < 6 )
        return null;
    else
        return { name: 'Alex', age: 30 };
}

let user = getUser();

// simplify:
// console.log(user && user.address ? user.address.street: undefined);
// console.log(user?.address?.address);
// let x = foo !== null && foo !== undefined ? foo : bar();
// let x = foo ?? bar();



// =======
// Classes
// =======


// Creating Classes


class Account {
    // note: fields only exist in TypeScript
    readonly id: number;
    readonly owner: string;
    nickname?: string;
    private _balance: number;

    constructor(id: number, owner: string, balance: number){
        this.id = id;
        this.owner = owner;
        this._balance = balance;
    }

    /*
    or

    constructor(public readonly id: num, public readonly owner: string, 
        private _balance : string)
    + remove fields...

    */

    private print_hello() : void {
        console.log("hello!")
    }

    deposit(amount: number) : void {
        this.print_hello();
        if ( amount <0 ) 
            throw new Error('invalid amount');
        this._balance += amount;
    }
    
    get balance() : number { // getter
        return this._balance;
    }

    set balance(value: number) {
        this._balance = value;
    }
}


// Index Signature Property


let account = new Account(123456789,'Alex',1000);
console.log(account.balance);


class SeatAssignment{
    // index signature property:
    [seatNumber: string]: string;
}

let seats = new SeatAssignment();
seats.A1 = 'Mosh';
seats['A1'] = 'Mosh';
seats.A2 = 'John';

// note: static fields are weird

class Ride {
    private static _activeRides = 0;
    start() {Ride._activeRides ++;}
    stop() {Ride._activeRides --;}
    static get activeRides() {return Ride._activeRides;}
}

let ride1 = new Ride();
ride1.start();

let ride2 = new Ride();
ride2.start();

console.log(Ride.activeRides);


// Inheritance


class Person {
    constructor(public firstName : string, public lastName : string){}
    get fullName() : string {
        return this.firstName + " " + this.lastName;
    }
    protected walk () { // protected: private but gets inherited
        console.log("Walking")
    }
}

class Student extends Person {
    constructor(public studentId: number, firstName: string, lastName: string) {
        super(firstName,lastName);
    }
    takeTest() {
        console.log('Taking a test');
    }
}

let student = new Student(1, 'John', 'Smith');
// student.walk;
student.takeTest;


// Overriding


class Teacher extends Person {
    override get fullName() : string {
        return "Professor " +  this.firstName + " " + this.lastName;
    }
}


// Polymorphism


printNames([
    new Student(239, 'Alexander', 'MacKenzie'),
    new Teacher('Hello', 'There'),
    new Person('John', 'Smith')
])

function printNames(people : Person[]) {
    for(let person of people){
        console.log(person.fullName);
    }
}


// Abstract Classes


abstract class Shape {
    constructor(public colour : string){}
    abstract render() : void;
}

class Circle extends Shape {
    constructor(colour: string){
        super(colour);
    }
    override render() {
        console.log('hello, i am a shape of colour ' + this.colour)
    }
}

// abstract class Calendar {
//    constructor(public name: string){};
    
//    abstract addEvent(): void;
//    abstract removeEvent(): void;
// }


// Interfaces


interface CanCalendar {
    name: string;
    addEvent(): void;
    removeEvent(): void;
}

interface CloudCalendar extends CanCalendar {
    sync(): void;
}

class GoogleCalendar implements CanCalendar {
    constructor(public name : string){};
    addEvent(): void {
        throw new Error("Method not implemented.");
    }
    removeEvent(): void {
        throw new Error("Method not implemented.");
    }
    
}

// note: interfaces and types can be user interchangeably

// interface:
interface Pearson {
    name : string;
}

let pearson : Pearson = {
    name: 'Alex',
}

// type:
type Pearsone = {
    name: string;
}

let pearsone : Pearsone = {
    name: 'Alex',
}

type SuperCalendar = {
    name: string;
    year: string;
}

class MyCalendar implements SuperCalendar{
    constructor(public name: string, public year: string){};    
}

class Person2 { 
    constructor(public firstName: string, public lastName: string) {}
    getFullName() {
        return this.firstName + " " + this.lastName;
    }
} 

// a class Logger that takes in the name of a file and provides a method for writing to the file

class Logger {
    name : string;
    constructor(name: string){
        this.name = name;
    }
    writeToFile(message: string) {console.log(message);
    };
}

class Employee2 extends Person2 {
    constructor(public salary : number, name: string, year: string){
        super(name, year);
    }
}

interface Address{
    street: string;
    city: string;
    zipCode: number;
}

interface Employee3{
    name: string;
    salary: string;
    address: Address;
}


// ===============
// Generic Classes
// ===============


class KeyValuePair<K,V>{
    public key : K;
    public value : V;
    constructor(key: K, value: V){
        this.key = key;
        this.value = value;
    }
}

class KeyValuePair2<K,V>{
    constructor(public key: K, public value: V){};
}

let pair = new KeyValuePair<string,string>('Alex', 'cherry')
let pair2 = new KeyValuePair<string,string>('John', 'banana')


// Generic Functions


class ArrayUtils {
    wrapInArray<T>(value: T){
        return [value];
    }
}

let myUtils = new ArrayUtils();

let numbers = myUtils.wrapInArray(1)
let letters = myUtils.wrapInArray('A');

function wrapInArray<T>(value: T){
    if (typeof value === 'string'){
    console.log('input was a string');
    return [value];
    }
    else
    console.log('instance was something other than a string');
    return [value];
}

let numbers2 = wrapInArray(123);
let letters2 =  wrapInArray('123');


// Generic Interfaces


// https://mywebsite.com/users
// https://mywebsite.com/products

interface Result<T>{
    data: T | null,
    error: string | null;
}

function fetch<T>(url: string): Result<T>{
    console.log('followed this url ' + url)
    return { data: null, error: null };
}

interface User {
    username: string;
}

interface Product {
    title : string;
}

let result = fetch<Product>('url');


// Generic Constraints


interface CanCustomer2 {
    name: string;
    age: number;
}

class Consumer {
    constructor(public name: string, public vigour: number){}
}

class IKEAConsumer extends Consumer {
    constructor(public houseType: string, name: string, vigour: number){
        super(name, vigour)
    }
}

class goodCustomer implements CanCustomer2{
    name: string;
    age: number;
    constructor(name: string,age:number){
        this.name = name;
        this.age = age;
    }
}

// note: T extends [something]

function echo<T extends CanCustomer2> (value: T){
    return value;
}

echo(new goodCustomer('Alex', 20));
echo({name: 'Bobby', age: 25});


// Extending Generic Classes


interface Product4{
    name: string;
    price: number;
}

class Tool implements Product4{
    name: string;
    price: number;
    constructor(name: string, price: number){
        this.name = name;
        this.price = price;
    }
}

class Store<T>{
    protected _objects: T[] = [];
    add(obj: T){
        this._objects.push(obj);
    }
    get objects(){
        return this._objects;
    }
    find(property: keyof T, value: unknown){
        return this._objects.find(obj => obj[property] === value);
    }
}

// Pass on the generic type parameter
class CompressibleStore<T> extends Store<T>{
    compress(){}
}

// Restrict the generic type parameter
class SearchableStore<T extends {name: string}> extends Store<T>{
    find2(name: string) : T | undefined{
        // we can now do obj.name because compiler knows that T must have a name field
        return this._objects.find(obj => obj.name = name);
    }
}

// Fix the generic type parameter
class ProductStore extends Store<Product4>{
    filterByCategory(category: string): Product[]{
        console.log(category);
        return [];
    }
}


// The KeyOf Operator


class Store2<T>{
    protected _objects: T[] = [];
    add(obj: T){
        this._objects.push(obj);
    }
    get objects(){
        return this._objects;
    }
    // take a look at the following line:
    find(property: keyof T, value: unknown){
        return this._objects.find(obj => obj[property] === value);
    }
}

// note: keyof T: union type of all the properties of T
// note: find takes in a certian property and compares it to a certain value
// it does this because it looks for a certain obj in objects such that 
// obj[property] (meaning the given property of obj) has a value equal to [value]

let store = new Store<Product4>()
store.add({name: 'a', price: 100})
store.find('name', 'a');
store.find('price', 1);
// store.find('nonexistent', 3)
// note that the line above generates a compile time error


// Type Mapping



interface Product{
    name: string;
    price: number;
}

// note: we can use type mapping to make a similar interface that is readonly

type readOnlyProduct = {
    readonly [K in keyof Product]: Product[K];
}

// let's go one step farther with generics:

type readOnly<T> = {
    readonly [K in keyof T]: T[K];
}

// now we can convert anything to readonly:

let product : readOnly<Product> = {
    title: "a",
    name: "b",
    price: 1
}

// more type mapping hax:

type Optional<T> = {
    [K in keyof T]?: T[K];
}

// remember: (keyof T) is a union type of all the fields in generic type T
// for instance: 
interface Person {
    name: string;
    age: number;
    email: string;
}
// keyof Person is "name" | "age" | "email".

// moar type mapping hax:

type Nullable<T> = {
    [K in keyof T]: T[K] | null;
}

// note: most of these are built in. Look at all TypeScript utility types here: 
// https://www.typescriptlang.org/docs/handbook/utility-types.html

// Exercises

// 1
// convert the following to a generic function:

// function echo2(arg) { return arg; }

function echo2<T>(arg: T) {return arg; }

// 2
// the following does not compile because "obj is missing name." Solve the problem:
/* 
function printName<T>(obj: T){
    console.log(obj.name);
}
 */

// implement a generic constraint:
function printName<T extends { name: string }>(obj: T){
    console.log(obj.name);
}

// 3
/* An Entity should have a unique identifier. 
The type of identifier, however, is dependent on the use case. 
In some cases, the ID might be a number, in other cases, it might be a string, GUID, etc. 
Represent the entity using a generic class.  */

class Entity<T>{
    constructor(public identifier : T) {};
}

// 4

// given the following
interface User { 
    userId:number; 
    username:string;
}
// what does (keyof User) return?

// 'userId' | 'username'



// ==========
// Decorators
// ==========


// Class Decorators


function Component(constructor: Function){
    // every object in javaScript has a 'prototype' from which it 
    // inherits various properties and methods.
    // we can add new properties and methods to the prototype
    // then any class with this decorator will inherit these properties/methods
    console.log('Component Decorator Called');
    constructor.prototype.uniqueID = Date.now();
    constructor.prototype.insertInDOM = () => {
        console.log("inserting the component in the DOM");
    }
}

@Component
class ProfileComponent{
    // stuff
}

let myComponent = new ProfileComponent();

// note: we can solve the same problem by making a class called 
// Component and having ProfileComponenet extend that class

// I haven't figured out why I cannot acccess uniqueID below:
// console.log(myComponent.uniqueID);
// console.log(ProfileComponent.prototype.uniqueID);


// Parameterized Decorators


type ComponentOptions = {
    selector : string;
}

function Component2(options: ComponentOptions){

    return (constructor: Function) => {
        console.log('Component2 Decorator Called');
        constructor.prototype.options = options;
        constructor.prototype.uniqueID = Date.now();
        constructor.prototype.insertInDOM = () => {
            console.log("inserting the component in the DOM");
        }
    }
}

@Component2({selector: '#my_profile'})
class ProfileComponenet{
    // stuff
}


// Decorator Composition


// new decorator 'Pipe'
function Pipe(constructor: Function){
    console.log('Pipe Decorator Called');
    constructor.prototype.pipe = true;
}

// apply both 'Pipe' and 'Component2' to ProfileComponent2
@Component2({selector: '#my_profile'})
@Pipe
class ProfileComponenet2{
    // stuff
}

// note: @Pipe gets applied first, because components are functions:
// f(g(x))


// Method Decorators


// note: parameters for function: Log([object that owns the target method], [name of the target method], [descriptor object])
// note: every property in an object has a 'descriptor' object that describes that object
// more on TypeScript decorators: https://www.typescriptlang.org/docs/handbook/decorators.html

function Log(target: any, methodName: string, descriptor: PropertyDescriptor){
    // type assertion (tell compiler it's a function):
    const original = descriptor.value as Function; 
    // replace the implementatino (value) of our function:
    descriptor.value = function(...args: any) { 
        console.log('=== begin log ===');
        original.call(this, ...args);
        console.log('=== end log   ===');
    }
    // note: an arrow function will not work because they don't have access to 'this'
}

class Emu{
    @Log
    say(message: string){
        console.log('Emu says: ' + message);
    }
}

let myEmu = new Emu();
myEmu.say('Hi there');


// Accessor Decorators


function Capitalize2(target: any, methodName: string, descriptor: PropertyDescriptor){
    const original = descriptor.get;
    descriptor.get = function(){
        const result = original?.call(this);
        return (typeof result === 'string') ? (result as string).toUpperCase() : result;
    }
}

function SayHello2(target: any, methodName: string, descriptor: PropertyDescriptor){
    descriptor.get = function(){
        return 'Hello!';
    }
}

class My_Person{
    constructor(public firstName: string, public lastName: string){};

    @SayHello2
    @Capitalize
    get fullName(){
        return this.firstName + ' ' + this.lastName;
    }
}

let person = new My_Person('Bobby', 'Tyler');
console.log(person.fullName);


// Property Decorators


function SmallestLength(length: number){ // parametarized decorator
    return (target: any, propertyName: string) => { 
        let value: string;
        const descriptor : PropertyDescriptor = {
            get(){
                return value;
            },
            set(newValue: string){
                if (newValue.length < length)
                    throw new Error(`${propertyName} should be at least ${length} long`)
            value = newValue;
            }
        }
        Object.defineProperty(target, propertyName,descriptor);
    }
}

// property decorator that takes in a number and returns a decorator function which throws an error if the property is not at least that long

class User4 {
    @SmallestLength(4)
    password: string;
    constructor(password: string){
        this.password = password;
    }
}

let myUser3 = new User4('1234');
// let myUser4 = new User4('123'); // throws an error


// Parameter Decorators


type WatchedParameters = {
    methodName: string;
    parameterIndex: number;
}

const watchedParameters: WatchedParameters[] = [];

function Watch (target: any, methodName: string, parameterIndex: number){
    watchedParameters.push({methodName, parameterIndex});
}

class Vehicle {
    constructor(public color: string){}
    drive(@Watch speed: string){
        console.log(`Driving at ${speed}`);
    }
}

console.log(watchedParameters);


// Exercises


// 1
// create a decorator for adding a sauce to Pizza instances:
/* 
@Sauce('pesto')
class Pizza{}

...

function Sauce(type: string){
    return (constructor: Function) => {
        constructor.prototype.sauce = type;
    };
}

*?


// =======
// Modules
// =======



// Creating & Using Modules

// see src/shapes.ts
import { Circle2 as BigCircle } from './shapes';

let myCircle = new BigCircle('green',2);
console.log(myCircle.colour);


// Module Formats




*/
