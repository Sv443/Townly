import React, { useEffect } from "react";

import { game, init as initGame } from "lib/game";
import { Xy } from "lib/Xy";

export default function App()
{
    useEffect(() => {
        initGame();

        game.start();

        const xy = new Xy();

        game.add(xy);
    }, []);


    return (
        <h3>Townly lol</h3>
    );
}
