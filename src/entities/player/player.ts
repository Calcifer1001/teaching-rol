import { BasicInfo } from "./basicInfo";
import { Stats } from "./stats";

export class Player {
    basicInfo: BasicInfo
    stats: Stats

    constructor(basicInfo: BasicInfo, stats: Stats) {
        this.basicInfo = basicInfo
        this.stats = stats
    }

    toString() {
        return `You are sir crap a lot, I mean... ${this.basicInfo.toString()}... living... thing and your stats are \n${this.stats.toString()}`
    }
}