import { useState, useEffect } from "react";
import Playable from "../playable/playable"

export default function GameZone({level, gameStarted,setVitoriaDerrota})
{

    const [coordenadas, setCoordenadas] = useState([]);//armazenar coordenadas originais
    const [cordsCarregadas, setCordsCarregadas] = useState([]); // coordenadas ja selecionadas
    const [cordsSuspeitas, setCordsSuspeitas] = useState([]); // coordenadas declaradas como suspeitas
    const [cordsProvavel, setCordsProvavel] = useState([]); // coordenadas declaradas como possiveis
    const [cordsBombas, setCordsBombas] = useState([]); // coordenadas das bombas
    const [cordsSemBombas, setCordsSemBombas] = useState([]); // coordenadas sem bombas

    const getName = () =>
    {
        let nome = "nada"
        if(level==0)
        {
            nome="nada"
        }
        else if(level==1)
        {
            nome="small"
        }
        else if(level==2)
        {
            nome="medium"
        }
        else if(level==3)
        {
            nome="big"
        }
        return nome;
    }
    //arranjar coordenadas
    function coor()
    {
        let letter = "A";
        let number = 0;
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
        let temp = []
        for(let i=0;i<limite;i++)
        {
            letter="A";
            for(let i=0;i<limite2;i++)
            {
                temp.push(number+letter)
                letter = String.fromCharCode(letter.charCodeAt(0) + 1);
            }
            number++;
        }
        setCoordenadas(temp);
        

    }
    useEffect(()=>{
        coor();
    },[gameStarted]);


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


    function clicked_left(coord)
    {
        
        if(!contain(cordsSuspeitas, coord) && !contain(cordsProvavel, coord) && !contain(cordsCarregadas, coord))
        {
            
            if(contain(cordsBombas, coord))
            {
                setVitoriaDerrota(2)
            }
            else
            {
                setCordsCarregadas([...cordsCarregadas,coord])
            }
            //verificar se vitoria
            //organizar array dos carregados e coords sem bombas e comparar (chatgpt)
            //se igual, setVitoriaDerrota(1)
            //quando der vitoria, aparecer winner (so aparecer quando vitoria==1 esperar 10 segundos para mudar o gamestarted)
        }
    }
    function encontrarIndex(array, valor)
    {
        let indix = -1
        array.forEach(function (element, i) {
            if(element.coord == valor)
            {
                indix = i;
            }
        });
        return indix
    }

    function clicked_right(coord)
    {
        if(!contain(cordsCarregadas, coord))
        {
            if(contain(cordsSuspeitas, coord))
            {
                
                const indexToRemove= encontrarIndex(cordsSuspeitas,coord);
                if (indexToRemove !== -1) 
                {
                    cordsSuspeitas.splice(indexToRemove, 1);
                }
                setCordsProvavel([...cordsProvavel, coord])
            }
            
            else if(contain(cordsProvavel, coord))
            {
                const indexToRemove= encontrarIndex(cordsProvavel,coord);
                if (indexToRemove !== -1) 
                {
                    cordsProvavel.splice(indexToRemove, 1);
                }
            }
            else
            {
                setCordsSuspeitas([...cordsSuspeitas, coord])
            }
        }
    }


    return(
        <div id="gamezone">
            <div id="playable_zone" className={getName()}>
            {coordenadas.map(
                (elemento,indice)=><Playable coord={elemento} clicked_left={clicked_left} clicked_right={clicked_right} cordsCarregadas={cordsCarregadas} cordsSuspeitas={cordsSuspeitas} cordsProvavel={cordsProvavel}  cordsBombas={cordsBombas} key={indice}/>)
            }

            

            </div>
        </div>

    );
}