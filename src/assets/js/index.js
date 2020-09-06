import Data from './models/Budget'
import * as budgetView from './views/budgetView'
import {elements} from './views/base'
import '..'

const state = {};

window.state = state

// Controller  atualiza o orçamento
const updateBudget = () => {
    let budget;

    // 1. Calcula o orçamento
    state.data.calculateBudget();

    // 2. Retorna o orçamento
    budget = state.data.getBudget();

    // 3.Mostra o orçamento na UI 
    budgetView.displayBudget(budget)
}

const updatePercenages = () => {
    let percentages;

    // 1. Calcula porcentagem
    state.data.calculatePercentages()

    // 2. Lê a porcentagem da controller do orçamento
    percentages = state.data.getPercentages()
   
    // 3. Atualiza a UI com a nova porcentagem 
    budgetView.displayPercentages(percentages);

}


const ctrlAddItem = () => {
    let input, newItem;  
    
    // 1. Obtem os dados do campo do input
    input = budgetView.getInputs();  
    
    if (input.description !== '' && !isNaN(input.value) && input.value > 0) {

        // 2. Adiciona o item do orçamento da controller orçamento 
        if(!state.data) state.data = new Data();
        newItem = state.data.addItem(input.type, input.description, input.value);
        console.log('NOVO ITEM', newItem);
        // 3. Adiciona o item na UI
        budgetView.renderItem(newItem, input.type);
    
        // 4. Limpa os campos
        budgetView.clearResults()
    
        // 5. Dá foco no input 
        budgetView.focus();
    
        // 6. Calcula e atualiza o orçamento
        updateBudget();

        // 7. Calcula e atualiza a porcentagens
        updatePercenages()
    }
}

//Restaura renda ou despesas ao recarregar a página

window.addEventListener('load', () => {
  
    state.data = new Data()  

    state.data.readStorage()
    state.data.readStorageBudgetIncMinusExp()
   
    state.data.data.allItems.exp.forEach(expense => budgetView.renderItem(expense, 'exp'))
    state.data.data.allItems.inc.forEach(income => budgetView.renderItem(income, 'inc'))

    state.data.data.budget = updateBudget()        
})

const ctrlDeleteItem = (event) => {
    let itemID, splitID, type, ID;

    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id; 

    if(itemID) {

        splitID = itemID.split('-');
        type = splitID[0];
        ID = parseInt(splitID[1]);

        // 1. Deleta o item da estrutura de dados
        state.data.deleteItem(type, ID)

        // 2. Deleta o item da UI
        budgetView.deleteListItem(itemID)

        // 3. Atualiza e mostra o novo orçamento
        updateBudget();

        // 4. Calcula e atualiza a porcetagem
        updatePercenages
    }
}



const setupEventListener = () => {

    elements.btn.addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', event => {
        if(event.keyCode === 13 || event.which === 13) {
            ctrlAddItem();
        }    
    });

    elements.container.addEventListener('click', ctrlDeleteItem);
    
    elements.inputType.addEventListener('change', budgetView.changedType);
    

    budgetView.displayBudget({
            budget: 0,
            totalIcome: 0,
            totalExpense: 0,
            percentage: -1
    });

    budgetView.displayMonth();
}
setupEventListener();



