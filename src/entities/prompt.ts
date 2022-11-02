import { prompt } from "prompts"
import { Player } from "./player/player"

export interface Question {
    type: AnswerType
    name: string
    message: string
    validate?: Function // returns a boolean or an error message
    initial?: string
}

export interface Answer {
    response: string
}

export interface SaveData {
    player?: Player
    currentCap: number
    currentStep: number
}

export type AnswerType = 'text' | 'number' | Function

export async function promptSaveExit(message: string, currentData: SaveData): Promise<Answer> {
    let question: Question =
    {
        type: 'text',
        name: 'response',
        message: message,
    };
    let answer: Answer = await prompt(question);
    if (answer.response === 'q') process.exit(0)
    if (answer.response === 's') promptSave(currentData)
    return answer
}

async function promptSave(currentData: SaveData) {
    let question: Question =
    {
        type: 'text',
        name: 'response',
        message: "Enter file name",
    };
    let answer: Answer = await prompt(question);
    localStorage.setItem(answer.response, JSON.stringify(currentData))
}