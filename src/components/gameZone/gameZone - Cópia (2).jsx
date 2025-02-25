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

    function bombas()
    {
        let bombas;
        if(level==1)
        {
            bombas=10;
        }
        else if(level==2)
        {
            bombas = 40;
        }
        else if(level==3)
        {
            bombas = 99;
        }

        const locations = [];
        const semLocations = [];
        let passar;
        for(let i=0;i<bombas;i++)
        {
            passar = false;
            if(level==1)
            {
                while(passar==false)
                {
                    const randomNumber = Math.floor(Math.random() * 9);

                    const randomIndex = Math.floor(Math.random() * 9);
                    const randomLetter = String.fromCharCode(65 + randomIndex);
                    const final = randomNumber+randomLetter;
                    if(!locations.includes(final))
                    {
                        locations.push(final)
                        passar=true;
                    }
                }
            }
            else if(level==2)
            {
                while(passar==false)
                {
                    const randomNumber = Math.floor(Math.random() * 16);

                    const randomIndex = Math.floor(Math.random() * 16);
                    const randomLetter = String.fromCharCode(65 + randomIndex);
                    const final = randomNumber+randomLetter;
                    if(!locations.includes(final))
                    {
                        locations.push(final)
                        passar=true;
                    }
                }
            }
            else if(level==3)
            {
                while(passar==false)
                {
                    const randomNumber = Math.floor(Math.random() * 30);

                    const randomIndex = Math.floor(Math.random() * 16);
                    const randomLetter = String.fromCharCode(65 + randomIndex);
                    const final = randomNumber+randomLetter;
                    if(!locations.includes(final))
                    {
                        locations.push(final)
                        passar=true;
                    }
                }
            }
        }
        let repetir,repetir2;
        if (level==1)
        {
            repetir=9
            repetir2=9
        }
        else if(level==2)
        {
            repetir=16
            repetir2=16
        }
        else if(level==3)
        {
            repetir=30
            repetir2=16
        }

        let start_number=0;
        let start_letter="A";
        for(let i=0;i<repetir;i++)
        {
            start_letter="A"
            for(let i=0;i<repetir2;i++)
            {
                if(!locations.includes(start_number+start_letter))
                {
                    semLocations.push(start_number+start_letter)
                }
                start_letter = String.fromCharCode(start_letter.charCodeAt(0) + 1);
            }
            start_number++;
        }
        setCordsBombas(locations)
        setCordsSemBombas(semLocations)
    }

    useEffect(()=>{
        coor();
        bombas();
        
    },[gameStarted]);

    useEffect(()=>{
        if(JSON.stringify(cordsSemBombas.sort()) == JSON.stringify(cordsCarregadas.sort()))
            {
                //setVitoriaDerrota(1)
            }
        //verificar se bombs carregadas == sem bombas, se sim, ganhou
    },);

    function clicked_left(coords)
    {
        coords = coords.coord
        if(!cordsCarregadas.includes(coords) && !cordsSuspeitas.includes(coords) && !cordsProvavel.includes(coords))
        {
            setCordsCarregadas([...cordsCarregadas, coords]);
            if(cordsBombas.includes(coords))
            {
                //setVitoriaDerrota(2)
            }
        }
        


        
        //const index = cordsCarregadas.findIndex(obj => obj.coord == "0A");
    }

    function clicked_right(coords)
    {
        coords = coords.coord
        if(!cordsCarregadas.includes(coords))
        {
            if(cordsSuspeitas.includes(coords))
                {
                    let index = cordsSuspeitas.indexOf(coords);
                    while(index!=-1)
                    {
                        if (index !== -1) {
                            cordsSuspeitas.splice(index, 1);
                        }
                        index = cordsSuspeitas.indexOf(coords);
                    }
                    
                    
                      setCordsProvavel([...cordsProvavel, coords])
                }
                
                else if(cordsProvavel.includes(coords))
                {
                    let index = cordsProvavel.indexOf(coords);
                    while(index!=-1)
                        {
                            if (index !== -1) {
                                cordsProvavel.splice(index, 1);
                            }
                            index = cordsProvavel.indexOf(coords);
                        }
                        setCordsProvavel([...cordsProvavel])
                        
                }
                else
                {
                    setCordsSuspeitas([...cordsSuspeitas, coords])
                }
        }
    }


    return(
        <div id="gamezone">
            <div id="playable_zone" className={getName()}>
            {coordenadas.map(
                (elemento,indice)=><Playable coord={elemento} clicked_left={clicked_left} clicked_right={clicked_right} cordsCarregadas={cordsCarregadas} cordsSuspeitas={cordsSuspeitas} cordsProvavel={cordsProvavel}  cordsBombas={cordsBombas} setCordsCarregadas={setCordsCarregadas} key={indice}/>)
            }

            

            </div>
        </div>

    );
}