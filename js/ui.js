let expenses = [];

const expenseForm = document.querySelector(".expense-form");
const expenseName = document.querySelector("#expense-name");
const expenseAmount = document.querySelector("#amount");
const expenseCategory = document.querySelector("#expense-category");
const totalAmount = document.querySelector(".total-amount");

const expenseList = document.querySelector(".expense-list ul");
const emptyList = document.querySelector(".empty-state");

const filterCategory = document.querySelector("#filter-category");
const filterAmount = document.querySelector("#filter-amount");
const resetBtn = document.querySelector("#reset-filter");

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
    totalAmount.innerText = total;

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