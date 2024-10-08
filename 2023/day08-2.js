
import fs from 'fs'

const file = fs.readFileSync('./data/input8.txt', { encoding: 'utf-8' })

const split = file.split('\n\n')

const sequence = split[0].split('')
const number_sequence = sequence.map(x => x === 'L' ? 0 : 1)

const instruction_lines = split[1].split('\n')
instruction_lines.pop()

const instructions = instruction_lines.map(x => {
  const split = x.split('=')
  const origin = split[0].trim()
  const map = split[1].split(',').map(x => x.trim().replace('(', '').replace(')', ''))
  return {
    origin, map
  }
})

const starts = instructions.filter(x => x.origin.endsWith('A')).map(x => ({ value: x.origin, steps: 0 }))
// const end = 'ZZZ'

const instruction_map = instructions.reduce((a, b) => {
  a[b.origin] = b.map
  return a
}, {})


for (const start of starts) {
  while (!start.value.endsWith('Z')) {
    for (const index of number_sequence) {
      const current_map = instruction_map[start.value]
      start.value = current_map[index]
      // console.log(index, current_map, start)
      start.steps++
    }
  }
}


const steps = starts.map(x => x.steps)

steps.sort()
const gcd = (a, b) => {
  return !b ? a : gcd(b, a % b)
}
const lcm = (a, b) => {
  return (a * b) / gcd(a, b)
}

console.log(steps)

let multiple = steps[0]
for (const step of steps) {
  multiple = lcm(multiple, step)
}

console.log(multiple)
