
class Human {

    constructor(name, age, heightInInches, eyecolor) {
        this.name = name
        this.age = age
        this.heightInInches = heightInInches
        this.eyecolor = eyecolor
    }

    speak() {
        console.log(this.name)
    }
}

class Animal {
    constructor (species, age) {
     this.species = species
     this.age = age   
    }

    speak() {
        console.log('Sleeping---')
    }
}

export default function algs() {
    
    let human = new Human(0,10,10,10)
    human.speak()
    





    return (
        null
    )
}