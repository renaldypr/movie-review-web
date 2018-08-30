function average(array) {
    let sum = 0;
    array.forEach(element => {
        sum += element
    })

    return (sum/array.length).toFixed(1)
}

module.exports = average;