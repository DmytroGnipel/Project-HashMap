class HashMap {
    constructor () {
        this.buckets = []
        this.buckets[15] = null//set initial array length === 16
}

    #loadFactor () {//percentage of the array fullness relatively to current length
        return this.length() / this.buckets.length * 100
    }

    #hash(key) {//get hash code of the key
        let hashCode = 0
        const magicNumber = 13
        for (let i = 0; i < key.length; i++) 
        hashCode = magicNumber * hashCode + key.charCodeAt(i)    
        return hashCode % this.buckets.length
    }

    #setAmountOfBuckets(number) {//set length for new arays
        this.buckets[number] = undefined
    }

    #checkLoading() {//chek whether the loadFactor have reached 75 or no. 
                    //If so then create new array and set for it new length (x2)
        if (this.#loadFactor() >= 75) {//check fullness of the array
            const oldLength = this.buckets.length//get old array length
            const newLength = oldLength * 2//get new array length
            this.buckets = []//get new array
            this.#setAmountOfBuckets(newLength - 1)//set length for new array
        }
    }

    set(key, value) {
        this.#checkLoading()
        const index = this.#hash(key)
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bound");
        }
        else {
        let object = {}
        object[key] = value
        this.buckets[index] = object
        }
    }
    //Take one argument as a key and returns the value that is assigned to this key.
    // If a key is not found, return null
    get(key) {
        const index = this.#hash(key)
        if (this.buckets[index] && this.buckets[index][key])
            return this.buckets[index][key]
        return null
    }
    //Take a key as an argument and returns true or false based on
    // whether or not the key is in the hash map
    has(key) {
        const index = this.#hash(key)
        if (this.buckets[index] && this.buckets[index][key])
            return true
        return false
    }
    //Take a key as an argument. If the given key is in the hash map, 
    //it remove the entry with that key and return true. 
    //If the key isn’t in the hash map, it return false.
    remove(key) {
        const index = this.#hash(key)
        if (this.buckets[index] && this.buckets[index][key]) {
            delete this.buckets[index]
            return true
        }
        return false
    }

    length() {//get amount of filled elements in the array
        return this.buckets.reduce((current, next) => {
            next ? next = 1 : next = 0
            return current + next
        }, 0)
    }
    //remove all entries in the hash map
    clear() {
        this.buckets.forEach((elem, index, array) => {
            delete array[index]
        })
    }
    //return an array containing all the keys inside the hash map
    keys() {
        const keysArray = []
        this.buckets.forEach(elem => {
            if (elem) keysArray.push(Object.keys(elem)[0])
        })
    return keysArray
    }
    //return an array containing all the values
    values() {
        const valuesArray = []
        for (const elem of this.buckets) {
            if (elem) valuesArray.push(elem[Object.keys(elem)[0]])
        }
        return valuesArray
    }
    //returns an array that contains each key, value pair. 
    //Example: [[firstKey, firstValue], [secondKey, secondValue]]
    entries() {
        const array = []
        for (const elem of this.buckets) {
            if (elem) {
                const subArray = []
                subArray.push(Object.keys(elem)[0], elem[Object.keys(elem)[0]])
                array.push(subArray)
            }
        }
        return array
    }
}
//class HashSet that behaves the same as a HashMap but only contains keys with no values
class HashSet {
    constructor() {
        this.buckets = []
        this.buckets[15] = null
    }

    #setAmountOfBuckets(number) {
        this.buckets[number - 1] = null
    }

    #hash(key) {
        let hashCode = 0
        let magicNumber = 31
        for (let i = 0; i < key.length; i++) {
            hashCode = magicNumber * hashCode + key.charCodeAt(i)
        }
        return hashCode % this.buckets.length
    }
    
    #loadFactor() {
        return this.length() / this.buckets.length * 100
    }

    #checkLoading() {
        if (this.#loadFactor() >= 75) {
            const oldLength = this.buckets.length
            const newLength = oldLength * 2
            this.buckets = []
            this.#setAmountOfBuckets(newLength)
        }
    }

    set(key) {
        this.#checkLoading()
        const index = this.#hash(key)
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bound");
        }
        else {
            this.buckets[index] = key
        }
    }

    has(key) {
        const index = this.#hash(key)
        if (this.buckets[index] && this.buckets[index] === key)
        return true
        return false
    }

    remove(key) {
        const index = this.#hash(key)
        if (this.buckets[index] && this.buckets[index] === key) {
            delete this.buckets[index]
            return true
        }
        return false
    }

    length() {
        return this.buckets.reduce((current, next) => {
            next ? next = 1 : next = 0
            return current + next
        }, 0)
    }

    clear() {
        this.buckets = []
        this.#setAmountOfBuckets(16)
    }

    keys() {
        const keysArray = []
        this.buckets.forEach(elem => {
            if (elem) keysArray.push(elem)
        })
    return keysArray
    }
}

/*
            testing functions of the HashMap class
            
const students = new HashMap
console.log(students)//empty array
console.log(students.length())//length === 0
students.set('Sara', 'Smith')
students.set('John', 'Johnson')
students.set('Ed', 'Sheeran')
students.set('Nicolaus', 'Otto')
console.log(students.length())//4
console.log(students.get('Ed'))//Sheeran
console.log(students.get('Vladimir'))//null
console.log(students.has('Ed'))//true
console.log(students.has('Vladimir'))//false
students.remove('Ed')
console.log(students)
console.log(students.length())//3
console.log(students.keys())//[ 'Sara', 'Nicolaus', 'John' ]
console.log(students.values())//[ 'Smith', 'Otto', 'Johnson' ]
console.log(students.entries())//[ [ 'Sara', 'Smith' ], [ 'Nicolaus', 'Otto' ], [ 'John', 'Johnson' ] ]
students.clear()
console.log(students.length())//0

            testing functions of the HashSet class

const workers = new HashSet
console.log(workers)
console.log(workers.length())//0
workers.set('developer')
workers.set('engineer')
workers.set('carpenter')
workers.set('tailor')
console.log(workers)
console.log(workers.length())//4
console.log(workers.has('tailor'))//true
console.log(workers.has('accountant'))//true
workers.remove('tailor')
console.log(workers)
console.log(workers.keys())//[ 'developer', 'carpenter', 'engineer' ]
workers.clear()
console.log(workers)//[ <15 empty items>, null ]
*/






