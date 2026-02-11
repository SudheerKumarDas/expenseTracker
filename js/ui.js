let expenses = [];

const expenseForm = document.querySelector(".expense-form");
const expenseName = document.querySelector("#expense-name");
const expenseAmount = document.querySelector("#amount");
const expenseCategory = document.querySelector("#expense-category");
const totalAmountEle = document.querySelector(".total-amount");

const expenseList = document.querySelector(".expense-list ul");
const emptyList = document.querySelector(".empty-state");

const filterCategory = document.querySelector("#filter-category");
const filterAmount = document.querySelector("#filter-amount");
const resetBtn = document.querySelector("#reset-filter");

const foodTotalEle = document.querySelector(".food-total");
const clothingTotalEle = document.querySelector(".clothing-total");
const accessoriesTotalEle = document.querySelector(".accessories-total")
const randomTotalEle = document.querySelector(".random-total");
const highestExpenseEle = document.querySelector(".highest-expense");


const clearAllBtn = document.querySelector("#clear-all");

const storedExpenses = localStorage.getItem("expenses");
if(storedExpenses){
    expenses.push(...JSON.parse(storedExpenses));
}
renderExpenses(expenses);
updateSummary(expenses);
const total = getTotal(expenses);
totalAmountEle.innerText = total;


function saveExpenses(expenses){
    localStorage.setItem("expenses",JSON.stringify(expenses));
}

function getTotal(expenses){
    let total = 0;
    for(let i=0; i<expenses.length;i++){
        total += expenses[i].amount;
    }
    return total;
}

expenseForm.addEventListener("submit",function(e){
    e.preventDefault();

    const name = expenseName.value;
    const amount = Number(expenseAmount.value);
    const category = expenseCategory.value;

    if(!name || amount <= 0) return;

    const expense = {
        name,
        amount,
        category
    };

    expenses.push(expense);
    renderExpenses(expenses);
    console.log(expenses);

    const total = getTotal(expenses);
    totalAmountEle.innerText = total;
    updateSummary(expenses);

    saveExpenses(expenses);

    expenseName.value = "";
    expenseAmount.value = "";
    expenseCategory.value = "food";
})


function renderExpenses(expenses){
    expenseList.innerHTML = "";

    if(expenses.length === 0){
        expenseList.appendChild(emptyList);
        return;
    }
    for(let i=0;i<expenses.length;i++){
        const li = document.createElement("li");
        li.innerText = `${expenses[i].name} - RS. ${expenses[i].amount}`
        expenseList.appendChild(li);
    }
}



filterCategory.addEventListener("change",function(){
    const filteredExpenses = filterByCategory(expenses);
    renderExpenses(filteredExpenses);
})
function filterByCategory(expenses){
    let filterExpenses=[];
    if(filterCategory.value==="all"){
        filterExpenses = expenses;
    }
    else{
        for(let i=0;i<expenses.length;i++){
            if(expenses[i].category === filterCategory.value){
                filterExpenses.push(expenses[i]);
            }
        }
    }
    return filterExpenses;
}

function filterByAmount(expenses){
        let filterExpenses = [];
        const minAmount = Number(filterAmount.value);
        if(minAmount===0){
            filterExpenses = expenses;
        }else{
            for(let i=0;i<expenses.length;i++){
                if(expenses[i].amount<=minAmount){
                    filterExpenses.push(expenses[i]);
                }
            }          
        }
        return filterExpenses;
}

filterAmount.addEventListener("input",function(){
    const filtered = filterByAmount(expenses);
    renderExpenses(filtered);
})

resetBtn.addEventListener("click",function(){
    filterCategory.value="all";
    filterAmount.value="";
    renderExpenses(expenses);
})

function totalByCategory(expenses){
    let totals = {
        food : 0,
        clothing : 0,
        accessories : 0,
        random : 0
    }

    for(let i=0;i<expenses.length;i++){
        totals[expenses[i].category]+=expenses[i].amount;
    }

    return totals;
}

function getHighestExpense(expenses){
    let highest = 0;
    for(let i=0;i<expenses.length;i++){
        if(highest<=expenses[i].amount){
            highest=expenses[i].amount;
        }
    }
    return highest;
}

function updateSummary(expenses){
    const total = totalByCategory(expenses);
    const highest = getHighestExpense(expenses);

    foodTotalEle.innerText = total.food;
    clothingTotalEle.innerText = total.clothing;
    accessoriesTotalEle.innerText = total.accessories;
    randomTotalEle.innerText = total.random;
    highestExpenseEle.innerText = highest;
}

clearAllBtn.addEventListener("click",function(expenses){
    expenses.length=0;
    localStorage.removeItem("expenses");
    updateSummary(expenses);
    renderExpenses(expenses);
    totalAmountEle.innerText = 0;
})