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
//
// - https://www.typescriptlang.org/docs/handbook/type-inference.html
//  Type Inference, aber sehr minimal
//
//  - https://medium.com/@thejameskyle/type-systems-covariance-contravariance-bivariance-and-invariance-explained-35f43d1110f8
//    netter Überblick
// anschauen:
// - Discriminated Unions


// =======================================================
//  Domain Model
// =======================================================


export abstract class Animal {
    protected constructor(protected readonly kind: string,
                          protected readonly name: string) {
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
        .map((animal:Animal) => animal.toString())
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

export function printROFPArray(animals: ReadonlyArray<Animal>) {
    animals.forEach((animal: Animal) => {
        console.log(animal.toString())
    })
}