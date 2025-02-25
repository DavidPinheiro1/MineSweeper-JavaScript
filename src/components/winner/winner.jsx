import { useState, useEffect } from "react";

export default function Winner({level, tempo, setWin})
{

    let pontos;
    if (level==1)
    {
        pontos =1000;
    }
    else if(level==2)
    {
        pontos =2000;
    }
    else if(level==3)
    {
        pontos =4000;
    }
    pontos = pontos/tempo;
    pontos = Math.round(pontos * 100) / 100
    setWin(pontos);
    return(
        <>Parabéns! Obteve {pontos} pontos!</>
    );
}