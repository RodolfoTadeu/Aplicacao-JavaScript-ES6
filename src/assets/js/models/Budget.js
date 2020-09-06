
class Income {
    
    constructor(id, description, value) {
        this.id = id,
        this.description = description,
        this.value = parseFloat(value)
    }   
}

class Expense extends Income {
    
    constructor(id, description, value) { 
        super(id, description, value),
        this.percentage = -1
    } 
    
    calcPercentage(totalIcome) {
        if(totalIcome > 0) {
            this.percentage = Math.round((this.value / totalIcome) * 100)
        }else {
            this.percentage = -1;
        }
    }

    getPercentage() {
        return this.percentage;
    }
} 

export default class Data { 

    constructor() {

        this.data = {

            allItems:  {
                exp: [],
                inc: []
            }, 

            totals: {
                exp: 0,
                inc: 0
            },
            budget: 0,
            percentage: -1
        }      
    }   

    addItem(type, des, val) {     

        let ID, newItem;

        // Create new ID
        if(this.data.allItems[type].length > 0) {
            ID = this.data.allItems[type][this.data.allItems[type].length - 1].id + 1;

        } else {
            ID = 0;
        }
        
        // Create new item based on 'inc' or 'exp' type
        if (type === 'exp') {
            newItem = new Expense(ID, des, val);
        }else if (type === 'inc') {
            newItem = new Income(ID, des, val)
        }

        // Push it into our data structure
        this.data.allItems[type].push(newItem);

        //Persist data in localStorage
        this.persistData(type) 

        return newItem;

    } 

    persistData(type) {
        if (type === 'exp') {

            localStorage.setItem('expense', JSON.stringify(this.data.allItems.exp))

        }else if (type === 'inc') {
            localStorage.setItem('income', JSON.stringify(this.data.allItems.inc))

        }
    }

    readStorage() {        
        const expense = JSON.parse(localStorage.getItem('expense'));
        const income = JSON.parse(localStorage.getItem('income'));

        if (expense) this.data.allItems.exp = expense;
       
        if (income) this.data.allItems.inc = income;
        
    }

    deleteItem(type, id) {
        let ids, index;
        ids = this.data.allItems[type].map(function(current) {
            return current.id;
        });

        index = ids.indexOf(id);

        if (index !== -1) {
            this.data.allItems[type].splice(index, 1);
            this.persistData(type) 
        }
    }

    calculateTotal(type) {
        let sum = 0;        
        this.data.allItems[type].forEach(cur => {
            sum += cur.value;
        });
        this.data.totals[type] = sum;
    }   

    calculateBudget() {
        
        // 1. Calculate total income and expenses
        this.calculateTotal('exp');
        this.calculateTotal('inc');
        

        // 2. Calculate the budget: income - expense
        this.data.budget = this.data.totals.inc - this.data.totals.exp; 
        this.persistDataBudgetIncMinusExp()

        // 3. Calculate the percentage of income that we spent 
        if(this.data.totals.inc > 0) {
            this.data.percentage = Math.round((this.data.totals.exp / this.data.totals.inc) * 100);        
        }else {
            this.data.percentage = -1;
            this.persistDataBudgetIncMinusExp()
        }
    }

    persistDataBudgetIncMinusExp() {     
        localStorage.setItem('calculateBudgetIncMinusExp', JSON.stringify(this.data.budget))   
    }

    readStorageBudgetIncMinusExp() {        
        const calculateBudgetIncMinusExp = JSON.parse(localStorage.getItem('calculateBudgetIncMinusExp'));

        if (calculateBudgetIncMinusExp) this.data.budget = calculateBudgetIncMinusExp;       
    }

    calculatePercentages() {
        this.data.allItems.exp.forEach(cur => {
            cur.calcPercentage(this.data.totals.inc);
        })
    }

    getPercentages() {
        let allPerc;
        allPerc = this.data.allItems.exp.map(cur => {
            //console.log(cur);
            return cur.getPercentage();            
        });
        return allPerc;
    }

    getBudget() {
        return {
            budget: this.data.budget,
            totalIcome: this.data.totals.inc,
            totalExpense: this.data.totals.exp,
            percentage: this.data.percentage
        }
    }

}





