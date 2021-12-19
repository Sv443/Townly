import { Act } from "../../lib/Act";
import { initGame } from "../../lib/game";

document.addEventListener("DOMContentLoaded", async () => {
    const game = initGame();

    await game.start();

    game.add(new Act());
});
