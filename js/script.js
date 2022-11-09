const addButton = document.querySelector('#addButton');


const peoples = [
    {
        name: 'Luis',
        lastName: 'felipe',
        year: 19,
        email: 'luis.felippe@academico.ifpb.edu.br',
        city: 'sjp'
    },
    {
        name: 'kaue',
        lastName: 'ronald',
        year: 20,
        email: 'kaue.ronald@academico.ifpb.edu.br',
        city: 'sjp'
    },{
        name: 'matheus',
        lastName: 'nunes',
        year: 20,
        email: 'matheus.nunes@academico.ifpb.edu.br',
        city: 'sjp'
    } 
]

let name = 'luis'

localStorage.setItem('peoples', JSON.stringify(peoples)); // salva o array em localstorage, é preciso salva-lo em JSON, por isso a conversão..

let arrayPeoples = localStorage.getItem('peoples'); // recupero o array peoples do localstorage, ele vem em JSON e não objeto!

console.log(JSON.parse(arrayPeoples)[1].name); // exibo o array, sendo q preciso converte-lo antes em objeto novamente, aqui exibo o primeiro objeto do array sendo sua propriedade nome.

localStorage.removeItem('item') //remove o item do localstorage

localStorage.clear();

///////////////////////////////////////////////////////////////// INICIO ////////////////////


const scheduleItems = [];
const dateItems = [];




document.addEventListener('load', ()=>{
    let datesJSON = localStorage.getItem('dateItems');
    let arrayDates = JSON.parse(datesJSON);

    if(arrayDates!=null || arrayDates[0]!=null){
        arrayDates.forEach(objDate => {
            dateItems.push(objDate);
            addDate(objDate.day, objDate.month, objDate.year, objDate.dayOfWeek);
        });
    }

    let scheduleJSON = localStorage.getItem('scheduleItems');
    let arraySchedule = JSON.parse(scheduleJSON);

    if(arraySchedule!=null || arraySchedule[0]!=null){
        arraySchedule.forEach(objSchedule => {
            scheduleItems.push(objSchedule);
        });
    }
})



const buttonDate = document.querySelectorAll('.eventos');

// Adiciona evento de click as datas
buttonDate.forEach(button => {
    button.addEventListener('click', ()=>{
        let scheduleJSON = localStorage.getItem('scheduleItems');
        let scheduleArray = JSON.parse(scheduleJSON);
        let dateCurrentButton = button.querySelector('#diaMes').innerHTML+'/'+button.querySelector('#ano').innerHTML

        if(!scheduleArray || scheduleArray[0]==null){
                let boxTarefas = document.querySelector('.box-tarefas');
                let element = document.querySelector('#alertNoActivities');
                if(element){
                    boxTarefas.removeChild(element);
                }
                let h1 = document.createElement('h1');
                h1.appendChild(document.createTextNode('Ainda não há tarefas para essa data, adicione alguma clicando no botão abaixo!'));
                h1.setAttribute('id', 'alertNoActivities');
                boxTarefas.appendChild(h1);
            
        // Adiciona atividade na lista referente à data
        }else{
            let boxTarefas = document.querySelector('.box-tarefas');
            let blocoTarefas = document.querySelectorAll('.blocoTarefas');
            //verificando se já existe algum bloco de tarefas, para então limpar-los da tela antes de adicionar os blocos referentes a data
            if(blocoTarefas){
                blocoTarefas.forEach(bloco => {
                    boxTarefas.removeChild(bloco);
                });
            }

            scheduleArray.forEach(activity => {
                addActivityContainer(activity.name, activity.description, activity.date);
            });
    
        }
    })

});


// Adiciona as atividades no localstorage
function addActivityLocalStorage (name, description, date){
    localStorage.removeItem('scheduleItems');
    let obj = {
        name: name,
        description: description,
        date: date
    }

    scheduleItems.push(obj);
    localStorage.setItem('scheduleItems', JSON.stringify(scheduleItems));
}




// Adiciona uma atividade no container
function addActivityContainer(title, description, date){
    let boxTarefas = document.querySelector('.box-tarefas');
    let dateActivity = document.querySelector('#dateActivity');
    dateActivity.innerHTML = date;
    
    let divBlocoTarefas = document.createElement('div');
    divBlocoTarefas.setAttribute('class', 'blocoTarefas');
    let h1 = document.createElement('h1');
    h1.setAttribute('id', 'tipoTarefa');
    h1.appendChild(document.createTextNode(title));
    let h2 = document.createElement('h2');
    h2.setAttribute('id', 'tarefa');
    let p = document.createElement('p');
    p.setAttribute('id', 'descricao');
    p.appendChild(document.createTextNode(description));
    h2.appendChild(p);
    let imgLapis = document.createElement('img');
    imgLapis.setAttribute('id','lapis');
    imgLapis.setAttribute('src', '../assets/pen-icon.svg');
    imgLapis.setAttribute('alt', 'Lapis de editar');
    h2.appendChild(imgLapis);
    let imgLixeiro = document.createElement('img');
    imgLixeiro.setAttribute('id','lixeiro');
    imgLixeiro.setAttribute('src', '../assets/trash-icon.svg');
    imgLixeiro.setAttribute('alt', 'excluir');
    h2.appendChild(imgLixeiro);
    divBlocoTarefas.appendChild(h1);
    divBlocoTarefas.appendChild(h2);
    boxTarefas.appendChild(divBlocoTarefas);


}



// Adiciona uma data à barra lateral
function addDate(Day, Month, Year, dayOfWeek){

    const boxDates = document.querySelector('.box-dates');
    let buttonDate = document.createElement('button')

    buttonDate.setAttribute('class', 'eventos');
    let pMonth = document.createElement('p');
    pMonth.appendChild(document.createTextNode(`${Day}/${Month}`));
    pMonth.setAttribute('id','diaMes');
    let pYear = document.createElement('p');
    pYear.appendChild(document.createTextNode(Year));
    pYear.setAttribute('id','ano');
    let h2DayToday = document.createElement('h2');
    h2DayToday.setAttribute('id', 'diaHoje');
    let pToday = document.createElement('p');
    pToday.appendChild(document.createTextNode(dayOfWeek));
    pToday.setAttribute('id', 'hoje');
    h2DayToday.appendChild(pToday);
    buttonDate.appendChild(pMonth);
    buttonDate.appendChild(pYear);
    buttonDate.appendChild(h2DayToday);

    boxDates.appendChild(buttonDate);


}