import { getSingleStat } from "../../utils/diceUtils"

interface IStats {
    strength: number
    dexterity: number
    constitution: number
    wisdom: number
    intelligence: number
    charisma: number
}

export class Stats implements IStats {
    strength: number = -1
    dexterity: number = -1
    constitution: number = -1
    wisdom: number = -1
    intelligence: number = -1
    charisma: number = -1

    constructor(stats?: IStats) {
        if (stats) {
            this.strength = stats.strength
            this.dexterity = stats.dexterity
            this.constitution = stats.constitution
            this.wisdom = stats.wisdom
            this.intelligence = stats.intelligence
            this.charisma = stats.charisma
        }
    }

    static getStatsSetEduStyle(): number[][] {
        let sets: number[][] = []
        const setQuantity = 3
        const setSize = 7
        const dicePerStat = 4
        for (let i = 0; i < setQuantity; i++) {
            let set: number[] = []
            for (let j = 0; j < setSize; j++) {
                set.push(getSingleStat(dicePerStat))
            }
            const finalSet = set.sort((a, b) => b - a).slice(0, 6)
            sets.push(finalSet)
        }
        return sets
    }

    toString(): string {
        return `
            Strength: ${this.strength}
            Dexterity: ${this.dexterity}
            Constitution: ${this.constitution}
            Wisdom: ${this.wisdom}
            Intelligence: ${this.intelligence}
            Charisma: ${this.charisma}
        `
    }

}