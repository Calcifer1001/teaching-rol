export class BasicInfo {
    name: string
    age: number

    constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }

    toString() {
        return `${this.name}, a ${this.age} year old`
    }
}