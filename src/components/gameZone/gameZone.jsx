import { useState, useEffect } from "react";
import Playable from "../playable/playable"


export default function GameZone({level, gameStarted,setVitoriaDerrota, showMines})
{

    //arrays para coordenadas
    const [coordenadas, setCoordenadas] = useState([]);//armazenar coordenadas originais
    const [cordsCarregadas, setCordsCarregadas] = useState([]); // coordenadas ja selecionadas
    const [cordsSuspeitas, setCordsSuspeitas] = useState([]); // coordenadas declaradas como suspeitas
    const [cordsProvavel, setCordsProvavel] = useState([]); // coordenadas declaradas como possiveis
    const [cordsNovo, setCordsNovo] = useState([]); 
    const [cordsBombas, setCordsBombas] = useState([]); // coordenadas das bombas
    const [cordsSemBombas, setCordsSemBombas] = useState([]); // coordenadas sem bombas


    //valor class da grid
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
        else if(level==4)
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
        else if(level==4)
        {
            limite=50;
            limite2=20;
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

    //arranjar coordenadas bombas e não bombas
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
        else if(level==4)
        {
            bombas = 110;
        }

        const locations = [];
        const semLocations = [];
        let passar;

        //cria as bombas
        for(let i=0;i<bombas;i++)
        {
            passar = false;
            if(level==1)
            {
                while(passar==false)
                {
                    let randomNumber = Math.floor(Math.random() * 9);//random number de 0 a 8

                    let randomIndex = Math.floor(Math.random() * 9); //random number de 0 a 8
                    let randomLetter = String.fromCharCode(65 + randomIndex); //convertido numero para letra
                    let final = randomNumber+randomLetter; // junta na coordenada final
                    if(!locations.includes(final)) //checka se ja existe
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
            else if(level==4)
            {
                while(passar==false)
                {
                    const randomNumber = Math.floor(Math.random() * 50);

                    const randomIndex = Math.floor(Math.random() * 20);
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
        else if(level==4)
        {
            repetir=50
            repetir2=20
        }

        let start_number=0;
        let start_letter="A";
        //criar coords sem bombas
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


    //funciona sempre que gameStarted mudar o valor
    useEffect(()=>{
        coor();
        bombas();
        
    },[gameStarted]);


    //funciona em cada render
    useEffect(()=>{
        if(cordsSemBombas.length != 0)
        {
            let temp;
            let minas;
            if(level==1)
            {
                temp=9*9;
                minas = 10;
            }
            else if(level==2)
            {
                temp=16*16;
                minas = 40;
            }
            else if(level==3)
            {
                temp=30*16;
                minas = 99;
            }
            else if(level==3)
            {
                temp=50*20;
                minas = 110;
            }
            if(cordsCarregadas.length==(temp-minas))
                {
                    setVitoriaDerrota(1)//nao funcioa
                }
                    }
                },);

    //sempre que carregares com botao esquerdo do rato
    function clicked_left(coords)
    {
        coords = coords.coord
        if(!cordsCarregadas.includes(coords) && !cordsSuspeitas.includes(coords) && !cordsProvavel.includes(coords) && !cordsNovo.includes(coords))
        {
            setCordsCarregadas([...cordsCarregadas, coords]);
            //derrota
            if(cordsBombas.includes(coords))
            {
                setVitoriaDerrota(2)
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
                    else if(level==4)
                        {
                            limite=50;
                            limite2=20;
                        }
                    let temp = []
                    for(let i=0;i<limite;i++)
                    {
                        letter="A";
                        for(let i=0;i<limite2;i++)
                        {
                            if(!cordsCarregadas.includes(number+letter))
                            {
                                temp.push(number+letter)
                            }
                            letter = String.fromCharCode(letter.charCodeAt(0) + 1);
                        }
                        number++;
                    }

                    setCordsCarregadas([...cordsCarregadas, ...temp])
            }
        }
    }


    //botao direito
    function clicked_right(coords)
    {
        coords = coords.coord
        if(!cordsCarregadas.includes(coords))
        {
            if(cordsSuspeitas.includes(coords))
                {
                    //tirar array suspeitas
                    let index = cordsSuspeitas.indexOf(coords);
                    while(index!=-1)
                    {
                        if (index !== -1) {
                            cordsSuspeitas.splice(index, 1);
                        }
                        index = cordsSuspeitas.indexOf(coords);
                    }
                    
                    //acrescenta ao array dsa provaveis
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
                        setCordsNovo([...cordsNovo, coords])
                        
                }

                else if(cordsNovo.includes(coords))
                    {
                        let index = cordsNovo.indexOf(coords);
                        while(index!=-1)
                            {
                                if (index !== -1) {
                                    cordsNovo.splice(index, 1);
                                }
                                index = cordsNovo.indexOf(coords);
                            }
                            setCordsNovo([...cordsNovo])
                            
                    }

                else
                {
                    setCordsSuspeitas([...cordsSuspeitas, coords])
                }
        }
    }

    //click automatic
    function clickAutomatic(...arrayAJuntar)
    {
        setCordsCarregadas([...cordsCarregadas,...arrayAJuntar])
        
    }

    return(
        <div id="gamezone">
            <div id="playable_zone" className={getName()}> 
            {coordenadas.map(
                (elemento,indice)=><Playable coord={elemento} clicked_left={clicked_left} clicked_right={clicked_right} cordsCarregadas={cordsCarregadas} cordsSuspeitas={cordsSuspeitas} cordsProvavel={cordsProvavel} cordsNovo={cordsNovo} cordsBombas={cordsBombas} clickAutomatic={clickAutomatic} level={level} key={indice}/>
            )
            }
            </div>
        </div>

    );
}