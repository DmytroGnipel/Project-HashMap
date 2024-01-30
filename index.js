class HashMap {
    constructor () {
        this.buckets = [1, 2, 3, 4, 5, 6, 7, 8, 8, 10, 11, 12, 13]//dummy array
        this.buckets[15] = undefined//set initial array length === 16
}

length() {//get amount of filled elems in the array that is 
    //returns the number of stored keys in the hash map
        return this.buckets.reduce((current, next) => {
            next ? next = 1 : next = 0
            return current + next
        }, 0)
    }

    loadFactor () {//percentage of the array fullness relatively to current length
        return this.length() / this.buckets.length * 100
    }

    hash(key) {//get hash code of the key
        let hashCode = 0
        const magicNumber = 13
        for (let i = 0; i < key.length; i++) 
        hashCode = magicNumber * hashCode + key.charCodeAt(i)    
        return hashCode % this.buckets.length
    }

    setAmountOfBuckets(number) {//set length for new arays
        this.buckets[number] = undefined
    }

    checkLoading() {//chek whether the loadFactor have reached 75 or no. 
                    //If so then create new array and set for it new length (x2)
        if (this.loadFactor() >= 75) {//check fullness of the array
            const oldLength = this.buckets.length//get old array length
            const newLength = oldLength * 2//get new array length
            this.buckets = []//get new array
            this.setAmountOfBuckets(newLength - 1)//set length for new array
        }
    }

    set(key, value) {
        this.checkLoading()
        const index = this.hash(key)
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
        for (let elem of this.buckets)
        if (elem && elem[key]) return elem[key]
        return null
    }
    //Take a key as an argument and returns true or false based on
    // whether or not the key is in the hash map
    has(key) {
        for (let elem of this.buckets)
        if (elem && elem[key]) return true
        return false
    }
    //Take a key as an argument. If the given key is in the hash map, 
    //it remove the entry with that key and return true. 
    //If the key isn’t in the hash map, it return false.
    remove(key) {
        let counter = 0
        for (let elem of this.buckets) {
            if (elem && elem[key]) {
                this.buckets[counter] = undefined
                return true
            }
        counter++  
        }
        return false
    }
}

const student = new HashMap
student.set('name', 'Dimon')
console.log(student.remove('name'))
console.log(student)


