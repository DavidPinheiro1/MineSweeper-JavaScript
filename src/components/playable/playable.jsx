import { useState, useEffect } from "react";
import { findAllInRenderedTree } from "react-dom/test-utils";

export default function Playable({coord, clicked_left, clicked_right,cordsCarregadas, cordsSuspeitas, cordsProvavel, cordsNovo, cordsBombas, clickAutomatic, level})
{
    //botao esquerdo
    const redirect=(event)=>
    {
        clicked_left({coord})
    }

    //botao direito
    const redirectRight=(event)=>
    {
        event.preventDefault();
        clicked_right({coord})
    }

    let imagem="default.png";

    if(cordsNovo.includes(coord))
    {
        imagem = "novo.png"
    }
    else if(cordsProvavel.includes(coord))
    {
        imagem = "provavel.png"
    }
    else if(cordsSuspeitas.includes(coord))
    {
        imagem = "presenca.png"
    }
     

    if(cordsCarregadas.includes(coord))
    {
        if(cordsBombas.includes(coord))
        {
            imagem ="mina.png"
        }

        else
        {
            //dividir a coordenada em parte numerica e de caracter
            //0A => 0, A
            let numericalPart = coord.match(/\d+/g)[0];//0
            let characterPart = coord.match(/[^\d]+/g)[0];//A

            let numberBombs =0;

            //verificar quantas bombas
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
                let limite;
                let limite2;
                if(level==1)
                {
                    limite=9;
                    limite2=9;
                }
                else if(level==2)
                {
                    limite=16;
                    limite2=16;
                }
                else if(level==3)
                {
                    limite=30;
                    limite2=16;
                }
                const automaticClick = []

                //buscar coordenadas de quadrados à volta
                characterPart = String.fromCharCode(characterPart.charCodeAt(0) - 1)
                numericalPart -= 1
                
                for(let i=0;i<3;i++)
                {
                    if(!cordsCarregadas.includes(numericalPart+characterPart))
                    {
                        if(numericalPart>=0 && numericalPart<limite && characterPart>="A" && characterPart<String.fromCharCode(65 + limite2))
                        {
                            automaticClick.push(numericalPart+characterPart)
                        }
                    }
                    numericalPart += 1
                }
                numericalPart -= 3
                characterPart = String.fromCharCode(characterPart.charCodeAt(0) +2)
                for(let i=0;i<3;i++)
                {
                    if(!cordsCarregadas.includes(numericalPart+characterPart))
                    {
                        if(numericalPart>=0 && numericalPart<limite && characterPart>="A" && characterPart<String.fromCharCode(65 + limite2))
                            {
                                automaticClick.push(numericalPart+characterPart)
                            }
                    }
                    numericalPart += 1
                }
                characterPart = String.fromCharCode(characterPart.charCodeAt(0) -1)
                numericalPart -= 3
                if(!cordsCarregadas.includes(numericalPart+characterPart))
                {
                    if(numericalPart>=0 && numericalPart<limite && characterPart>="A" && characterPart<String.fromCharCode(65 + limite2))
                        {
                            automaticClick.push(numericalPart+characterPart)
                        }
                }
                numericalPart += 2
                if(!cordsCarregadas.includes(numericalPart+characterPart))
                {
                    if(numericalPart>=0 && numericalPart<limite && characterPart>="A" && characterPart<String.fromCharCode(65 + limite2))
                        {
                            automaticClick.push(numericalPart+characterPart)
                        }
                }
                
                //setCordsCarregadas([...cordsCarregadas,...automaticClick])
                if (automaticClick.length != 0)
                {
                    clickAutomatic(...automaticClick)
                }
                

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
        }
        
        
    }

    
    //ao chegar, verificar em que arrays está e comportar se accordingly
    return(
        <div id={coord} onClick={redirect} onContextMenu={redirectRight}>
            <img id="imagens" src= {`/assets/images/${imagem}`} /></div>
    );
}