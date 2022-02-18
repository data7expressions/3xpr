
const date = new Date()

const date2 = new Date(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate())

console.log(date2.toISOString())
console.log(date.toISOString())
console.log(date)
