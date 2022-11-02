import { readFileSync } from "fs";
import { BasicInfo } from "../../entities/player/basicInfo";
import { Player } from "../../entities/player/player";
import { Stats } from "../../entities/player/stats";
import { Answer, promptSaveExit, Question, SaveData } from "../../entities/prompt";

export async function runIntroduction(): Promise<Player> {
    let continueLetterResponse = await promptStep1()
    let continueLetterResponseForJoke = await promptStep2(continueLetterResponse)
    let continueLetterResponseForReals = await promptStep3()
    let raceResponse = await promptStep4()
    let nameResponse = await promptStep5(raceResponse)
    let ageResponse = await promptStep6()

    let basicInfo: BasicInfo = new BasicInfo(nameResponse.response, Number(ageResponse.response))
    let stats: number[][] = Stats.getStatsSetEduStyle()
    let rollNumberResponse = await promptStep7(basicInfo, stats) // "2"
    let statIndexesResponse = await promptStep8() // 513420

    const rollNumberIndex = Number(rollNumberResponse.response) - 1
    let userBig6: number[] = stats[rollNumberIndex]
    let finalStats: Stats = createStats(userBig6, statIndexesResponse.response)

    let player: Player = new Player(basicInfo, finalStats)

    await promptStep9(player)
    return player

}

function createStats(big6: number[], indexes: string): Stats {
    let stats: Stats = new Stats()
    for (let i = 0; i < indexes.length; i++) {
        switch (Number(indexes[i])) {
            case 0:
                stats.strength = big6[i]
                break
            case 1:
                stats.dexterity = big6[i]
                break
            case 2:
                stats.constitution = big6[i]
                break
            case 3:
                stats.wisdom = big6[i]
                break
            case 4:
                stats.intelligence = big6[i]
                break
            case 5:
                stats.charisma = big6[i]
                break
            default:
                throw new Error("This should never happen. There is a validation before that is wrong")
        }
    }
    return stats
}

async function promptStep1(): Promise<Answer> {
    const introductionText1 = await readFileSync("src/story/introduction/1/introduction.txt")
    const saveData: SaveData = { currentCap: 0, currentStep: 1 }
    let responseIntroduction = await promptSaveExit(introductionText1.toString(), saveData);
    return responseIntroduction
}

async function promptStep2(previousResponse: Answer): Promise<Answer> {
    let introductionText2
    const saveData: SaveData = { currentCap: 0, currentStep: 2 }
    let currentResponse = previousResponse
    while (currentResponse.response !== "m") {
        if (!introductionText2) {
            introductionText2 = await readFileSync("src/story/introduction/2/repeat.txt")
        }
        currentResponse = await promptSaveExit(introductionText2.toString(), saveData)
    }
    return currentResponse
}

async function promptStep3(): Promise<Answer> {
    const saveData: SaveData = { currentCap: 0, currentStep: 3 }
    let textStep3 = await readFileSync("src/story/introduction/3/joke.txt")
    let answer: Answer
    do {
        answer = await promptSaveExit(textStep3.toString(), saveData)
    } while (answer.response !== "n")
    return answer
}

async function promptStep4(): Promise<Answer> {
    const saveData: SaveData = { currentCap: 0, currentStep: 4 }
    let textStep4 = await readFileSync("src/story/introduction/4/createJoke.txt")
    return await promptSaveExit(textStep4.toString(), saveData)
}

async function promptStep5(prevAnswer: Answer): Promise<Answer> {
    const saveData: SaveData = { currentCap: 0, currentStep: 5 }
    let textStep5 = await readFileSync("src/story/introduction/5/chooseName.txt")
    let textToDisplay = textStep5.toString()
    textToDisplay = textToDisplay.replace("_character_", prevAnswer.response)
    return await promptSaveExit(textToDisplay, saveData)
}

async function promptStep6(): Promise<Answer> {
    const saveData: SaveData = { currentCap: 0, currentStep: 6 }
    let textStep5 = await readFileSync("src/story/introduction/6/chooseAge.txt")
    return await promptSaveExit(textStep5.toString(), saveData)
}

async function promptStep7(basicInfo: BasicInfo, stats: number[][]): Promise<Answer> {
    const saveData: SaveData = { currentCap: 0, currentStep: 7 }
    let textStep5 = await readFileSync("src/story/introduction/7/repeatData.txt")

    let textToDisplay = textStep5.toString()
    textToDisplay = textToDisplay.replace("_name_", basicInfo.name)
    textToDisplay = textToDisplay.replace("_age_", basicInfo.age.toString())


    textToDisplay = textToDisplay.replace("_roll1_", stats[0].toString())
    textToDisplay = textToDisplay.replace("_roll2_", stats[1].toString())
    textToDisplay = textToDisplay.replace("_roll3_", stats[2].toString())

    let answer: Answer = await promptSaveExit(textToDisplay.toString(), saveData)
    while (!["1", "2", "3"].includes(answer.response)) {
        answer = await promptSaveExit("Please, use only 1, 2 or 3", saveData)
    }
    return answer
}

async function promptStep8(): Promise<Answer> {
    const saveData: SaveData = { currentCap: 0, currentStep: 8 }
    let textStep5 = await readFileSync("src/story/introduction/8/statAssignment.txt")
    let answer: Answer = await promptSaveExit(textStep5.toString(), saveData)
    while (!answer.response.match(/^(?!.*(.).*\1)[012345]+$/)) {
        answer = await promptSaveExit("Insert only 6 numbers from 0 to 5", saveData)
    }
    return answer
}

async function promptStep9(player: Player): Promise<void> {
    const saveData: SaveData = { currentCap: 0, currentStep: 9 }
    let textStep5 = await readFileSync("src/story/introduction/9/congratulations.txt")
    let textToDisplay = textStep5.toString()
    textToDisplay = textToDisplay.replace("_description_", player.toString())
    await promptSaveExit(textToDisplay, saveData)

}