import { useState, useEffect } from "react";

export default function Timer({setTempo, vitoriaDerrota})
{
    const [seconds, setSeconds] = useState(0);


    useEffect(()=>{
        setTempo(seconds);
    },);

        const increase=() => {
            if(vitoriaDerrota!=1)
            {
                if(vitoriaDerrota==0)
                    {
                        setSeconds(seconds+1);
                    }

            }
        };
        const time = setTimeout(increase, 1000);
    return <>Tempo de jogo: {seconds}</>;
}