import { useState, useEffect } from "react";

export default function Playable({coord, clicked_left, clicked_right,cordsCarregadas, cordsSuspeitas, cordsProvavel, cordsBombas})
{
    const redirect=(event)=>
    {
        clicked_left({coord})
    }

    const redirectRight=(event)=>
    {
        event.preventDefault();
        clicked_right({coord})
    }

    let imagem="default.png";
    
    if(cordsProvavel.includes(coord))
    {
        imagem = "provavel.png"
    }
    else if(cordsSuspeitas.includes(coord))
    {
        imagem = "presenca.png"
    }
    else if(cordsCarregadas.includes(coord))
    {
        console.log("aqui")
        if(cordsBombas.includes(coord))
        {
            imagem ="mina.png"
        }
        else
        {

            let numericalPart = coord.match(/\d+/g)[0];
            let characterPart = coord.match(/[^\d]+/g)[0];

            let numberBombs =0;

            characterPart = String.fromCharCode(characterPart.charCodeAt(0) - 1)
            numericalPart -= 1
            for(let i=0;i<3;i++)
            {
                if(cordsBombas.includes(numericalPart+characterPart))
                {
                    numberBombs++;
                }
                numericalPart += 1
            }
            numericalPart -= 3
            characterPart = String.fromCharCode(characterPart.charCodeAt(0) +2)
            for(let i=0;i<3;i++)
            {
                if(cordsBombas.includes(numericalPart+characterPart))
                {
                    numberBombs++;
                }
                numericalPart += 1
            }
            characterPart = String.fromCharCode(characterPart.charCodeAt(0) -1)
            numericalPart -= 3
            if(cordsBombas.includes(numericalPart+characterPart))
            {
                numberBombs++;
            }
            numericalPart += 2
            if(cordsBombas.includes(numericalPart+characterPart))
            {
                numberBombs++;
            }
            numericalPart -=1
            
            if(numberBombs==0)
            {
                imagem="clicked.png"
            }
            else if(numberBombs==1)
            {
                imagem="1.png"
            }
            else if(numberBombs==2)
            {
                imagem="2.png"
            }
            else if(numberBombs==3)
            {
                imagem="3.png"
            }
            else if(numberBombs==4)
            {
                imagem="4.png"
            }
            else if(numberBombs==5)
            {
                imagem="5.png"
            }
            else if(numberBombs==6)
            {
                imagem="6.png"
            }
            else if(numberBombs==7)
            {
                imagem="7.png"
            }
            else if(numberBombs==8)
            {
                imagem="8.png"
            }

            //ver quantidade de bombas

            //se forem 0, por clicked e meter as de à volta nas bombas carregadas
        }
        
        
    }

    
    //ao chegar, verificar em que arrays está e comportar se accordingly
    return(
        <div id={coord} onClick={redirect} onContextMenu={redirectRight}><img id="imagens" src= {`/assets/images/${imagem}`} /></div>
    );
}