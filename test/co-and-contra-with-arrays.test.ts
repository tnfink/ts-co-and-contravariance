import {
    addCatToArray,
    Animal,
    Cat,
    Dog,
    Employee, EmployeeWithPersonnelNumber, Person, Pet, PetWithTaxNumber,
    printAnimal,
    printAnimalArray,
    printROFPArrayOfAnimals,
    printROFPArrayOfTaxNumbers,
    printTaxNumbers
} from '../src/co-and-contra-with-arrays';

//import * as ROFP from 'fp-ts/ReadonlyArray';

describe('Basic covariance', () => {
    it('I can print a dog', () => {
        const dog = new Dog("Hasso", "123");
        printAnimal(dog);
    });
    it('I can print a cat', () => {
        const cat = new Cat("Miriam");
        printAnimal(cat);
    });
});


describe('Covariance with Arrays', () => {

    it('I can print an animal array of a cat and a dogs', () => {
        const hasso = new Dog("Hasso", "12345");
        const miriam = new Cat("Miriam");
        const animals: Animal[] = [hasso, miriam];
        printAnimalArray(animals);
    });
    it('I can print a dog array of two dogs', () => {
        const dogs: Dog[] = [new Dog("Hasso", "3456"), new Dog("Pluto", "7890")];
        printAnimalArray(dogs);
    });
    it('I can add a cat to animals', () => {
        const animals: Animal[] = [new Dog("Hasso", "321"), new Cat("Catty")];
        addCatToArray(animals);
        printAnimalArray(animals);
        // Type mismatch: printTaxNumbers(animals);
    });
    it('I canbot add a cat to readonly animals', () => {
        const animals: readonly Animal[] = [new Dog("Hasso", "321"), new Cat("Catty")];
        // type mismatch
        //addCatToArray(animals);
        //printAnimalArray(animals);
        // Type mismatch: printTaxNumbers(animals);
        console.log(animals);
    });
    it('I can add a cat to dogs, even if it is not a good thing', () => {
        const dogs: Dog[] = [new Dog("Hasso", "654"), new Dog("Rufus", "987")];
        addCatToArray(dogs);
        printAnimalArray(dogs);
        printTaxNumbers(dogs); // hidden error, swallowed null pointer exception
    });
    it('I can print a list of employees because of structural compatibility :-(', () => {
        const employees: Employee[] = [new Employee("kind", "name", "taxnumber")]

        printAnimalArray(employees);
        addCatToArray(employees);
        printTaxNumbers(employees);
    });
});

describe('Covariance with functional Read Only Arrays', () => {
    it("I can print an animal array of a cat and a dogs", () => {
        const hasso = new Dog("Hasso", "12345");
        const miriam = new Cat("Miriam");
        const animals: Animal[] = [hasso, miriam];
        printROFPArrayOfAnimals(animals);
    });
    it('I can print a dog array of two dogs', () => {
        const dogs: Dog[] = [new Dog("Hasso", "3456"), new Dog("Pluto", "7890")];
        printROFPArrayOfAnimals(dogs);
    });
    it('I can print an employee array of two dogs :-(', () => {
        const employees: Employee[] = [new Employee("kind", "name", "taxnumber")]
        printROFPArrayOfAnimals(employees);
        printROFPArrayOfTaxNumbers(employees);
    });
    it('I cannot print cats as dogs :-)', () => {
        const cats: readonly Cat[] = [new Cat("Catty")];
        console.log(cats);
        // compile error - printROFPArrayOfTaxNumbers(cats);
    });
})

describe('Covariance with functional writable Arrays', () => {
    it("I can print an animal array of a cat and a dogs", () => {
        const hasso = new Dog("Hasso", "12345");
        const miriam = new Cat("Miriam");
        const animals: Animal[] = [hasso, miriam];
        console.log(animals);
        //printWFPArrayOfAnimals(fromArray(animals));
    });
})

describe ('Structural Compatibility', () => {
    it('I can assign things that are semantically different', () => {
        const myKitty = new PetWithTaxNumber("kitty", "12345678");
        const meAtWork = new EmployeeWithPersonnelNumber("Torsten Fink", "MI5-007");
        const neighboursDog : Pet = meAtWork;
        const neighbour : Person = myKitty;

        console.log("neighboursDog:");
        console.log(neighboursDog)
        console.log("neighbour:");
        console.log(neighbour)
    });
    it('I can assign array of things that are semantically different', () => {
        const myPets : Pet[] = [new Pet("kitty")];
        const myTaxedPets : PetWithTaxNumber[] = [new PetWithTaxNumber("taxed kitty", "12334")];
        const myPersons : Person[] = [new Person("Me Person")];
        const myEmployees : EmployeeWithPersonnelNumber[] = [new EmployeeWithPersonnelNumber("Myself", "ABCDEFG")];

        let otherPets = myPets;
        otherPets = myTaxedPets;
        otherPets = myPersons;

        let otherTaxedPets = myTaxedPets;
        // otherTaxedPets = myPets; structural incompatible
        otherTaxedPets = myEmployees;


        console.log("otherPets:");
        console.log(otherPets)
        console.log("otherTaxedPets:");
        console.log(otherTaxedPets)
    });
})