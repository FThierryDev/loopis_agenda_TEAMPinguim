
let scheduleItems = [];
let dateItems = [];


document.addEventListener('load', loadPage())

function loadPage(){
    // Adiciona um bloco com a data atual, caso não exista valores na variavel de datas do localstorage

 
        let dateItemsJSON = localStorage.getItem('dateItems');
        let arrayDateItems = JSON.parse(dateItemsJSON);
        if(!arrayDateItems || arrayDateItems[0]==null){
            // Pegando a data atual
            let date = new Date(); 

            let currentMonth = date.getMonth(); // mês atual
            let currentDay = date.getDate(); // dia atual
            let currentYear = date.getFullYear();  // ano atual
            let dayOfWeek = date.getDay();  // dia da semana em indice, sendo 0 o domingo e continua..
            let dayOfWeekText;

            switch(dayOfWeek){
                case 0: dayOfWeekText = 'Domingo';
                break;
                case 1: dayOfWeekText = 'Segunda';
                break;
                case 2: dayOfWeekText = 'Terça';       
                break;
                case 3: dayOfWeekText = 'Quarta';
                break;
                case 4: dayOfWeekText = 'Quinta';
                break;
                case 5: dayOfWeekText = 'Sexta';
                break;
                case 6: dayOfWeekText = 'Sabádo';
                break;
            }
            
            let objDateToday = {
                day: currentDay,
                month: currentMonth+1,
                year: currentYear,
                dayOfWeek: dayOfWeekText
            }
            dateItems.push(objDateToday);
            localStorage.setItem('dateItems', JSON.stringify(dateItems));  
            dateItems=[];     
        }

            let datesLocalJSON = localStorage.getItem('dateItems');
            let arrayCurrentDateItems = JSON.parse(datesLocalJSON);

            arrayCurrentDateItems.forEach(objDate => {
                dateItems.push(objDate);
                addDate(objDate.day, objDate.month, objDate.year, objDate.dayOfWeek);

            });

            let scheduleItemsJSON = localStorage.getItem('scheduleItems');
            let arrayScheduleItems = JSON.parse(scheduleItemsJSON);
            if(arrayScheduleItems!=null){
                arrayScheduleItems.forEach(element => {
                    scheduleItems.push(element);
                });
            }

        
}

// Evento no botão do modal que CONFIRMA a EXCLUSÃO da atividade
let confirmRemoveModal = document.querySelector('.confirm-remove-item');


confirmRemoveModal.addEventListener('click', ()=>{
    let modal = document.querySelector('#modal');
    let modalRemoveItem = document.querySelector('.modal-remove-item');
    closeModal(modal, modalRemoveItem)

    let titleActivity = document.querySelector('#titleActivity').innerHTML;
    let date = '';
    scheduleItems.forEach(activity=>{
        if(titleActivity==activity.title){
            let index = scheduleItems.indexOf(activity);
            scheduleItems.splice(index, 1);
            date = activity.date;
        }
    });
    localStorage.removeItem('scheduleItems');
    localStorage.setItem('scheduleItems', JSON.stringify(scheduleItems));
    
    

    let buttonsDate = document.querySelectorAll('.eventos')
    buttonsDate.forEach(button=>{
        let diaMes = button.querySelector('#diaMes').innerHTML;
        let ano = button.querySelector('#ano').innerHTML;
        let chars = diaMes.split('/');
        let dateButton = `${ano}-${chars[1]}-${chars[0]}`
        if(date==dateButton){
            button.dispatchEvent(new Event('click'));
        }
    })


})

// Evento no botão que CANCELA a exclusão do modal
let buttonCancelRemove = document.querySelector('.cancel-remove-item');
buttonCancelRemove.addEventListener('click', ()=>{
    let modal = document.querySelector('#modal');
    let modalRemoveItem = document.querySelector('.modal-remove-item');
    closeModal(modal, modalRemoveItem)
})


// Evento no botão que confirma a edição de uma atividade
let confirmEditButton = document.querySelector('#confirmEditButton');
confirmEditButton.addEventListener('click', ()=>{
    let modal = document.querySelector('#modal');
    let modalAlterActivity = document.querySelector('#modal-alterar-atividade');

    let alterItemTitle = document.querySelector('#alterItemTitle').innerHTML;
    let chars = alterItemTitle.split('Atividade: ');
    let oldNameActivity = chars[1];
    let date = document.querySelector('.date-alter').value
    scheduleItems.forEach(activity => {
        if(activity.title==oldNameActivity){
            let name = document.querySelector('.name-modal-alter-atividade').value
            let descricao = document.querySelector('.textAlterDesc').value
            let date = document.querySelector('.date-alter').value
            activity.title = name;
            activity.description = descricao;
            activity.date = date;
        }
    });
    localStorage.removeItem('scheduleItems');
    localStorage.setItem('scheduleItems', JSON.stringify(scheduleItems));

    let buttonsDate = document.querySelectorAll('.eventos')
    buttonsDate.forEach(button=>{
        let diaMes = button.querySelector('#diaMes').innerHTML;
        let ano = button.querySelector('#ano').innerHTML;
        let chars = diaMes.split('/');
        let dateButton = `${ano}-${chars[1]}-${chars[0]}`
        if(date==dateButton){
            button.dispatchEvent(new Event('click'));
        }
    })

    closeModal(modal, modalAlterActivity);

 
    
})

// Evento no botão que cancela a edição de uma atividade
let cancelEditButton = document.querySelector('#cancelEditButton');
cancelEditButton.addEventListener('click', ()=>{
    let modal = document.querySelector('#modal');
    let modalAlterAtividade = document.querySelector('#modal-alterar-atividade');
    closeModal(modal, modalAlterAtividade);

})



// Abrir o modal de inserção de datas
let addDateButton = document.querySelector('#add-date-button');
addDateButton.addEventListener('click', ()=>{
    let modal = document.querySelector('#modal');
    let modalAddDate = document.querySelector('.add-date-modal');
    openModal(modal, modalAddDate);
})

// Fechar o modal de inserção de datas
let buttonCloseModalDate = document.querySelector('#button-close-modal-date');
buttonCloseModalDate.addEventListener('click', ()=>{
    let modal = document.querySelector('#modal');
    let modalAddDate = document.querySelector('.add-date-modal');
    closeModal(modal, modalAddDate)
})



// Evento para botão que ADICIONA uma DATA no localstorage
let buttonAddDate = document.querySelector('#button-add-date');
buttonAddDate.addEventListener('click', ()=>{
    let inputDateValue = document.querySelector('#scheduleDate');
    let dateValue = inputDateValue.value;
    let chars = dateValue.split('-')

    let dateMethod = new Date(chars[0],chars[1]-1,chars[2]);
    let dayOfWeek = dateMethod.getDay();
    let dayOfWeekText;
    switch(dayOfWeek){
        case 0: dayOfWeekText = 'Domingo';
        break;
        case 1: dayOfWeekText = 'Segunda';
        break;
        case 2: dayOfWeekText = 'Terça';       
        break;
        case 3: dayOfWeekText = 'Quarta';
        break;
        case 4: dayOfWeekText = 'Quinta';
        break;
        case 5: dayOfWeekText = 'Sexta';
        break;
        case 6: dayOfWeekText = 'Sabádo';
        break;
    }


    let objDateToday = {
        day: chars[2],
        month: chars[1],
        year: chars[0],
        dayOfWeek: dayOfWeekText
    }
    let dataItemsJSON = localStorage.getItem('dateItems');
    let arrayDateItems = JSON.parse(dataItemsJSON);
    dateItems = [];
    arrayDateItems.push(objDateToday);
    dateItems = arrayDateItems;
    localStorage.removeItem('dateItems');
    localStorage.setItem('dateItems', JSON.stringify(dateItems));
    location.reload()
})

// Evento para ABRIR o modal de adição de atividades
let addActivityButton = document.querySelector('#add-activity-button');
addActivityButton.addEventListener('click', ()=>{

    let alert = document.querySelector('#alert-equal-name');
    let valueStyleAlert = alert.getAttribute('style');
    // Verifica se existe o alerta de atividades iguais ou preencha campo na tela, se sim remove ele  
    if(valueStyleAlert){

        alert.setAttribute('style', 'display: none')
    }   

        let addDateInput = document.querySelector('.addDateInput')
        let dateActivity = document.querySelector('#dateActivity').innerHTML
        let chars = dateActivity.split('/')
        let newDate = `${chars[2]}-${chars[1]}-${chars[0]}`;
        addDateInput.setAttribute('value', newDate);

        let modal = document.querySelector('#modal');
        let modalFormAdd = document.querySelector('#modal-form-add');
        openModal(modal, modalFormAdd);
        // Limpando inputs do modal
        let nameInput = document.querySelector('.addNameInput').value='';
        let descInput = document.querySelector('.addDescInput').value='';

   
})

// Evento no botão que FECHA o modal de adição de atividades
    let closeAddModal = document.querySelector('#close-addModal');
    closeAddModal.addEventListener('click', ()=>{
        let modal = document.querySelector('#modal');
        let modalFormAdd = document.querySelector('#modal-form-add');
        closeModal(modal, modalFormAdd);
    })

// Função que fecha o modal
    function closeModal(divModal, formModal){
        divModal.setAttribute('style', 'display: none');
        formModal.setAttribute('style', 'display: none');
    }
// Função que abre o modal
    function openModal(divModal, formModal){
        divModal.setAttribute('style', 'display: flex');
        formModal.setAttribute('style', 'display: flex ');
    }


// Evento no botão que salva uma atividade em localstorage
let confirmButton = document.querySelector('#confirmButtonAdd');
confirmButton.addEventListener('click', ()=>{
    let alert = document.querySelector('#alert-equal-name');
    let valueStyleAlert = alert.getAttribute('style');
    // Verifica se existe o alerta de atividades iguais na tela, se sim remove ele  
    let text = alert.querySelector('#alert-equal-name-text');
    if(text){
        text.innerHTML='';
    }     

    let nameInput = document.querySelector('.addNameInput').value;
    let descInput = document.querySelector('.addDescInput').value;
    let dateInput = document.querySelector('.addDateInput').value;
    let count = 0;

    scheduleItems.forEach(element=>{
        if(element.title===nameInput && element.date===dateInput){
            count ++;
        }
    })


    if(count>0 || nameInput=='' || descInput==''){
        if(nameInput=='' || descInput==''){
            alert.setAttribute('style', 'display: flex;')
            text.innerHTML='Preencha todos os campos!'
            return
        }
        alert.setAttribute('style', 'display: flex;')
        text.innerHTML='Não é possivel adicionar atividades com o mesmo nome!'
       
       
    }else{
        addActivityLocalStorage(nameInput, descInput, dateInput);

        let modal = document.querySelector('#modal');
        let modalFormAdd = document.querySelector('#modal-form-add');
        closeModal(modal, modalFormAdd);

        let buttonsDate = document.querySelectorAll('.eventos')
        buttonsDate.forEach(button=>{
            let diaMes = button.querySelector('#diaMes').innerHTML;
            let ano = button.querySelector('#ano').innerHTML;
            let chars = diaMes.split('/');
            let date = `${ano}-${chars[1]}-${chars[0]}`
            if(dateInput==date){
                button.dispatchEvent(new Event('click'));
            }
        })


 
    }

}) 



// Adiciona uma atividade no localstorage
function addActivityLocalStorage (name, description, date){

    let obj = {
        title: name,
        description: description,
        date: date
    }

    scheduleItems.push(obj);
    localStorage.removeItem('scheduleItems');
    localStorage.setItem('scheduleItems', JSON.stringify(scheduleItems));

    let dateButtons = document.querySelectorAll('.eventos');
    dateButtons.forEach(dateButton => {
        let dayMonth = dateButton.querySelector('#diaMes').innerHTML
        let year = dateButton.querySelector('#ano').innerHTML
        let chars = dayMonth.split('/');
        let newDate = `${year}-${chars[1]}-${chars[0]}`
        if(newDate == date){
            
            dateButton.dispatchEvent(new Event('click'));
        }
    });
    
}


// Adiciona uma atividade no container
function addActivityContainer(title, description, date){
    let boxTarefas = document.querySelector('.box-tarefas');
    let dateActivity = document.querySelector('#dateActivity');

    let chars = date.split('-')
    let newDate = `${chars[2]}/${chars[1]}/${chars[0]}`;
    
    dateActivity.innerHTML = newDate;
    
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


// Evento de click das datas
const buttonDate = document.querySelectorAll('.eventos');
buttonDate.forEach(button => {
    button.addEventListener('click', ()=>{
        let scheduleJSON = localStorage.getItem('scheduleItems');
        let scheduleArray = JSON.parse(scheduleJSON);
        let dayMonth = button.querySelector('#diaMes').innerHTML
        let year = button.querySelector('#ano').innerHTML
        let chars = dayMonth.split('/');
        let dateButton = `${chars[0]}/${chars[1]}/${year}`
        let newDate = `${year}-${chars[1]}-${chars[0]}`

        // mudando a data do titulo do container
            let dateActivity = document.querySelector('#dateActivity') 

            dateActivity.innerHTML = "";
            dateActivity.appendChild(document.createTextNode(dateButton))

        let thereActivity = 0;  
        scheduleArray.forEach(element=>{
            if(element.date==newDate){
                thereActivity++;
            }
        })

        let boxTarefas = document.querySelector('.box-tarefas');
        let blocoTarefas = document.querySelectorAll('.blocoTarefas');
        //verificando se já existe algum bloco de tarefas, para então limpar-los da tela antes de adicionar os blocos referentes a data
        if(blocoTarefas){
            blocoTarefas.forEach(bloco => {
                boxTarefas.removeChild(bloco);
            });
        }

        if(thereActivity==0){
                let boxTarefas = document.querySelector('.box-tarefas');
                let element = document.querySelector('#alertNoActivities');
                if(element){
                    boxTarefas.removeChild(element);
                }
                let h1 = document.createElement('h1');
                h1.appendChild(document.createTextNode('Ainda não há tarefas para essa data, adicione alguma clicando no botão abaixo!'));
                h1.setAttribute('id', 'alertNoActivities');
                h1.style.textAlign = "center";
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
            // Adiciona as atividades na tela que correspondem a data do botão que foi clicado
            let count = 0;
            scheduleArray.forEach(activity => {
                if(newDate === activity.date){
                    addActivityContainer(activity.title, activity.description, activity.date)
                    count ++;
                }
            });
            //verificando se existe o alerta de que não há atividades, caso exista limpe ele da tela
            let element = document.querySelector('#alertNoActivities');
            if(element){
                boxTarefas.removeChild(element);
            }

            // Abrir o modal para edição de atividades
            let blocoTarefa = document.querySelectorAll('.blocoTarefas')
            blocoTarefa.forEach(bloco => {
                
                let lapis = bloco.querySelector('#lapis');
                lapis.addEventListener('click', ()=>{
                    let modal = document.querySelector('#modal');
                    let modalAlterarAtividade = document.querySelector('#modal-alterar-atividade')
                    openModal(modal, modalAlterarAtividade);
                    let alterItemTitle = document.querySelector('#alterItemTitle');
                    alterItemTitle.innerHTML='';
                    let titleTarefa = bloco.querySelector('#tipoTarefa').innerHTML;
                    let descTarefa = bloco.querySelector('#descricao').innerHTML;
                    alterItemTitle.appendChild(document.createTextNode(`Atividade: ${titleTarefa}`));
                    let nameAlterAtividade = document.querySelector('.name-modal-alter-atividade');
                    nameAlterAtividade.setAttribute('value', titleTarefa);
                    let textAlterDesc = document.querySelector('.textAlterDesc');
                    textAlterDesc.setAttribute('value', descTarefa);
                    let dateActivity = document.querySelector('#dateActivity').innerHTML;
                    let chars = dateActivity.split('/');
                    let newDate = `${chars[2]}-${chars[1]}-${chars[0]}`
                    let inputDateAlter = document.querySelector('.date-alter');
                    inputDateAlter.setAttribute('value', newDate);
                })
  
                

                // Abrir o modal para excluir atividade
                let lixeiro = bloco.querySelector('#lixeiro');
                lixeiro.addEventListener('click', ()=>{
                    let modal = document.querySelector('#modal');
                    let modalRemoveItem = document.querySelector('.modal-remove-item');
                    openModal(modal, modalRemoveItem);
                    let nameActivity = bloco.querySelector('#tipoTarefa').innerHTML
                    let titleActivity = document.querySelector('#titleActivity');
                    titleActivity.innerHTML = '';
                    titleActivity.appendChild(document.createTextNode(nameActivity));
                })
            });


        }
    })

});






