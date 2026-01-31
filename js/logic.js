function addExpenses(expenses, id, title, amount, category){
    expenses.push({
        id : id,
        title : title,
        amount : amount,
        category : category,
        date : new Date()
    })
}

function deleteExpenses(expenses,id){
    for(let i=0;i<expenses.length;i++){
        if(expenses[i].id === id){
            expenses.splice(i,1);
            break;
        }
    }
    return expenses;
}

function totalExpenses(expenses){
    let sum=0;
    for(let i=0;i<expenses.length;i++){
        sum = sum + expenses[i].amount;
    }
    return sum;
}

function filterByCategory(expenses,category){
    const filteredExpenses = [];
    for(let i=0;i<expenses.length;i++){
        if(expenses[i].category === category){
            filteredExpenses.push(expenses[i]);
        }
    }
    return filteredExpenses;
}