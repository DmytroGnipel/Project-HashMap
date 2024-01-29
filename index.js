class HashMap {
    constructor () {
        this.buckets = [1, 2, 3, 4, 5, 6, 7, 8, 8, 10, 11, 12, 13]//dummy array
        this.buckets[15] = undefined//set initial array length === 16
}

    capacity() {//get amount of filled elems in the array
        return this.buckets.reduce((current, next) => {
            next ? next = 1 : next = 0
            return current + next
        }, 0)
    }

    loadFactor () {//percentage of the array fullness relatively to current length
        return (this.capacity() / this.buckets.length) * 100
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

}

const student = new HashMap
student.set('name', 'Dimon')
console.log(student.buckets)


