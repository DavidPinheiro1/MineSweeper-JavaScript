import { useState, useEffect } from "react";

export default function Playable({coord, clicked_left, clicked_right,cordsCarregadas, cordsSuspeitas, cordsProvavel, cordsBombas})
{

    function contain(array, included)
    {
        let teste = false
        array.forEach(element => {
            if(element.coord == included)
            {
                teste=true
            }
        });
        return teste
    }

    
    
    const redirect=(event)=>
    {
        clicked_left({coord})
    }

    const redirectRight=(event)=>
    {
        event.preventDefault();
        clicked_right({coord})
    }

    let imagem="mina.png";
    
    if(contain(cordsCarregadas, coord))
    {
        
        if(cordsBombas.includes(coord))
        {
            imagem="mina.png"
        }
        else
        {
            /*console.log(parseInt(numericalPart[0])+1)
            console.log(String.fromCharCode(characterPart[0].charCodeAt(0) + 1))*/
            //verificar minas à volta

            
            let numericalPart = coord.match(/\d+/g)[0];
            let characterPart = coord.match(/[^\d]+/g)[0];

            let numberBombs =0;

            characterPart = String.fromCharCode(characterPart.charCodeAt(0) - 1)
            numericalPart -= 1
            for(let i=0;i<3;i++)
            {
                

                if(contain(cordsBombas, numericalPart+characterPart))
                {
                    numberBombs++;
                }
                numericalPart += 1
            }
            numericalPart -= 3
            characterPart = String.fromCharCode(characterPart.charCodeAt(0) +2)
            for(let i=0;i<3;i++)
            {
                
                if(contain(cordsBombas, numericalPart+characterPart))
                    {
                        numberBombs++;
                    }
                    numericalPart += 1
            }
            numericalPart -= 2
            characterPart = String.fromCharCode(characterPart.charCodeAt(0) -1)
            numericalPart -= 1
            if(contain(cordsBombas, numericalPart+characterPart))
            {
                numberBombs++;
            }
            numericalPart += 2
            if(contain(cordsBombas, numericalPart+characterPart))
            {
                numberBombs++;
            }

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
        }
    }
    
    else if(contain(cordsSuspeitas, coord))
    {
        imagem="presenca.png"
    }
    
    else if(contain(cordsProvavel, coord))
    {
        imagem="provavel.png"
    }
    else
    {
        imagem="default.png"
    }
    
    //ao chegar, verificar em que arrays está e comportar se accordingly
    return(
        <div id={coord} onClick={redirect} onContextMenu={redirectRight}><img id="imagens" src= {`/assets/images/${imagem}`} /></div>
    );
}