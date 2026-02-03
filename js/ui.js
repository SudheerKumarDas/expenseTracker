let expenses = [];

const expenseForm = document.querySelector(".expense-form");
const expenseName = document.querySelector("#expense-name");
const expenseAmount = document.querySelector("#amount");
const expenseCategory = document.querySelector("#expense-category");
const totalAmount = document.querySelector(".total-amount");

const expenseList = document.querySelector(".expense-list ul");
const emptyList = document.querySelector(".empty-state");

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

