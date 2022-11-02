import { Player } from './entities/player/player';
import { runIntroduction } from './story/introduction/introduction';

run()

async function run() {
    let player: Player = await runIntroduction()
}

