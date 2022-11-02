export function rollDie(sides: number): number {
    return Math.floor(Math.random() * sides + 1)
}

export function rollDice(sides: number, qty: number): number[] {
    let results: number[] = []
    for (let i = 0; i < qty; i++) {
        results.push(rollDie(sides))
    }
    return results
}

export function getSingleStat(diceQuantity: number): number {
    let results: number[] = []
    for (let i = 0; i < diceQuantity; i++) {
        results.push(rollDie(6))
    }
    return results.sort((a, b) => b - a).slice(0, 3).reduce((acc, curr) => acc + curr)
}