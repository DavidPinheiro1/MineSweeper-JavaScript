import { useState, useEffect } from "react";
import Timer from "../timer/timer.component"
import Winner from "../winner/winner"
import Swal from "sweetalert2";

export default function Panel({gameStarted, setGameStarted, level, setLevel, setVitoriaDerrota, vitoriaDerrota})
{

    const [isBackground, setBackground] = useState("#00e1ffeb")


    const handleLevelChange = (event) => {
        const { value } = event.currentTarget;
        setLevel(value);
    };

    const [tempo, setTempo] = useState(0);
    const [win, setWin] = useState(0);

    const startGame = (event) => {
        if(gameStarted)
        {
            setGameStarted(false);
            setVitoriaDerrota(0);
            setBackground("#00e1ffeb")
        }
        else
        {
            setGameStarted(true);
            setVitoriaDerrota(0);
            setBackground("red")
        }
    };


    useEffect(()=>{
        let time;
        const acabarJogo = ()=>{
          if(gameStarted)
            {
              setGameStarted(false);
            }
          
          clearInterval(time)
        }

        
        if(vitoriaDerrota==1)
          { 
            Swal.fire({
              title: "Bom Trabalho!",
              icon: "success"
            });
          }
          else if(vitoriaDerrota==2)
          {
            Swal.fire({
              icon: "error",
              title: "Oops... Acionaste uma bomba!",
            });
      
            time = setTimeout(acabarJogo, 10000);
          }
    },[vitoriaDerrota]);


    return(
        <div id="control_panel">
            <select id="nivel" onChange={handleLevelChange} disabled={gameStarted}>
                <option value="0">Seleccione...</option>
                <option value="1">Básico (9x9(10 minas))</option>
                <option value="2">Intermédio (16x16(40 minas))</option>
                <option value="3">Avançado (30x16(99 minas))</option>
                <option value="4">Random (50x20(110 minas))</option>
          </select>


            <button
            type="button"
            id="btPlay"
            style={{backgroundColor:isBackground}}
            disabled={level == "0"}
            onClick={startGame}
            >
                {!gameStarted ? "Iniciar Jogo" : "Terminar Jogo"}
            </button>
            <p>{gameStarted?<Timer setTempo={setTempo} vitoriaDerrota={vitoriaDerrota}/>:""}</p>
            <p>{vitoriaDerrota==1?<Winner level={level} tempo={tempo} setWin={setWin}/>:""}</p>

        </div>

    );

}