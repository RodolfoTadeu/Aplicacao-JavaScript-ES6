import {elements} from './base'


export const getInputs = () => {

    let input = {
        type: elements.inputType.value,
        description: elements.inputDescription.value,
        value: elements.inputValue.value    
    }  
    return input  
};

export const renderItem = (obj, type) => {
    let html;

    // Renderiza UI
    if (type === 'inc') {
         
        html = `
            <div class="item clearfix" id="inc-${obj.id}">
                <div class="item__description">${obj.description}</div>
                <div class="right clearfix">
                    <div class="item__value">${formatNumber(obj.value, type)}</div>
                    <div class="item__delete">
                        <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                    </div>
                </div>
            </div>
        `
        elements.incomeContainer.insertAdjacentHTML('beforeend', html)
        ; 
    }else if (type === 'exp') {
        
        html = `
            <div class="item clearfix" id="exp-${obj.id}">
                <div class="item__description">${obj.description}</div>
                <div class="right clearfix">
                    <div class="item__value">${formatNumber(obj.value, type)}</div>
                    <div class="item__percentage">21%</div>
                    <div class="item__delete">
                        <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                    </div>
                </div>
            </div>
        `
        elements.expenseContainer.insertAdjacentHTML('beforeend', html)
        ;
    }   
};

export const clearResults = () => {
    elements.inputDescription.value = '';
    elements.inputValue.value = '';    
};

export const focus = () => {
    elements.inputType.focus();
};

export const displayBudget = (obj) => {
    var type;

    obj.budget > 0 ? type = 'inc' : type = 'exp';

    elements.budgetLabel.textContent = formatNumber(obj.budget, type);
    elements.incomeLabel.textContent = formatNumber(obj.totalIcome, 'inc');
    elements.expenseLabel.textContent = formatNumber(obj.totalExpense, 'exp');
    

    if(obj.percentage > 0) {
        elements.percentageLabel.textContent = obj.percentage + '%'
    }else {
        elements.percentageLabel.textContent = '---'
    }
};

const nodeListForEach = (list, callback) => {
    for(var i = 0; i < list.length; i++) {
        callback(list[i], i);
    }
};

export const displayPercentages = (percentages) => {
    let fields;  

    fields = document.querySelectorAll('.item__percentage');    
    
    nodeListForEach(fields, (current, index) => {
        
        if(percentages[index] > 0) {
            current.textContent = percentages[index] + '%';
        }else {
            current.textContent = '---';
        }
    });
};

export const displayMonth = () => {
    let now, day, months, month, year ;

    now = new Date();
    months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    month = now.getMonth();
    day = now.getDate();

    year = now.getFullYear();
    elements.dataLabel.textContent = `${day} de ${months[month]} de ${year}`; 
};

export const changedType = () => {
    let fields;

    fields = document.querySelectorAll('.add__type' + ',' + '.add__description' + ',' + '.add__value');

    nodeListForEach(fields, function(cur) {
        cur.classList.toggle('red-focus')
    });

    elements.btn.classList.toggle('red')
 
};

export const deleteListItem = (selectorID) => {
    let el = document.getElementById(selectorID);
    el.parentNode.removeChild(el);
};

const formatNumber = (num, type) => {
    var numSplit, int, dec, type;

    num = Math.abs(num);
    num = num.toFixed(2);

    numSplit = num.split('.');
    
    int = numSplit[0];

    if(int.length > 3) {
        int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
    }

    dec = numSplit[1];   

    return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;

}

