// Interesting Links
// - https://codewithstyle.info/Strict-function-types-in-TypeScript-covariance-contravariance-and-bivariance/
//   Compiler-Flag to disable bivariant check
//
// - https://github.com/microsoft/TypeScript/issues/1394
//  Analyse von Problemen bei TS
//  "Outputs are always covariant and arguments are usually contravariant. The only point where we'd need an
//  annotation is when an argument is also used as an output. I think it would be a lot easier to grasp if all type constructors and generics came equipped with their associated map functions, since then you just look at what order the mapped functions get applied."
//
// - https://www.typescriptlang.org/docs/handbook/type-compatibility.html
//  Grundlagen Typ-Kompatibilität, Strukturell vs. Nominal
//  dort die Definition von "Function Parameter Bivariance"
// Definition der strikten Checks:
// https://www.typescriptlang.org/tsconfig#strictFunctionTypes
//
// - https://www.typescriptlang.org/docs/handbook/type-inference.html
//  Type Inference, aber sehr minimal
//
//  - https://medium.com/@thejameskyle/type-systems-covariance-contravariance-bivariance-and-invariance-explained-35f43d1110f8
//    netter Überblick
// anschauen:
// - Discriminated Unions

// anpassen: der funktionale Aspekt raus und nur "readonly" dazu

// =======================================================
//  Domain Model
// =======================================================

export abstract class Animal {
    protected constructor(readonly kind: string,
                          readonly name: string) {
    }

    public abstract toString(): string;
}

export class Dog extends Animal {
    constructor(name: string, readonly taxNumber: string) {
        super("Dog", name);
    }

    public toString(): string {
        return "Dog -" + this.name + " (" + this.taxNumber + ")";
    }
}

export class Cat extends Animal {
    constructor(name: string) {
        super("Cat", name);
    }

    public toString(): string {
        return "Cat -" + this.name;
    }
}

export class Employee {
    constructor(readonly kind: string, readonly name: string, readonly taxNumber: string) {
    }
}

// =======================================================
//  Basic
// =======================================================

export function printAnimal(animal: Animal) {
    console.log(animal.toString());
}


// =======================================================
//  Arrays
// =======================================================

// Covariance

export function printAnimalArray(animals: Animal[]) {
    const output =
        animals
            .map((animal: Animal) => animal.toString())
            .join(", ");
    console.log(output);
}

export function printTaxNumbers(dogs: Dog[]) {
    const output =
        dogs
            .map((dog) => dog.taxNumber)
            .join(", ");
    console.log(output);
}

// Contravariance

export function addCatToArray(animals: Animal[]) {
    animals.push(new Cat("The added cat!"));
}

// =======================================================
//  fp-ts
// =======================================================

export function printROFPArrayOfAnimals(animals: readonly Animal[]) {
    let output = animals
        .map((animal: Animal) => animal.toString())
        .join(", ");
    console.log(output)
}

export function printROFPArrayOfTaxNumbers(dogs: readonly Dog[]) {
    let output = dogs
        .map((dog: Dog) => dog.taxNumber)
        .join(", ");
    console.log(output)
}

// =======================================================
//  Structural Compatibility
// =======================================================

export class Pet {
    constructor(readonly name:string) {
    }
}
export class PetWithTaxNumber extends Pet {
    constructor(readonly name:string, readonly number:string) {
        super(name);
    }
}
export class Person {
    constructor(readonly name:string) {
    }
}

export class EmployeeWithPersonnelNumber extends Person {
    constructor(readonly name:string, readonly number:string) {
        super (number)
    }
}

