let popup = document.getElementById('popup');
let blurr = document.getElementById('blur');
const Budgetbtn = document.getElementById('addBudget');
const budgtvalue = document.getElementById('budgtvalue');
const budgetAmountError = document.getElementById('budgetAmountError');
const addBudgetbtn = document.getElementById('addBudgetbtn');
const totalBudget = document.getElementById('totalBudget');
const expenditureVal = document.getElementById('expenditureVal');
const date = document.getElementById('date');
const balance = document.getElementById('balance');
const addCategory = document.getElementById('addCategory');
const catExpense = document.getElementById('catExpense');
const chkBudget = document.getElementById('chkBudget');
const catError = document.getElementById('catError');
const amountError = document.getElementById('amountError');
const listItems = document.getElementById('list-items');
const listing = document.getElementById('listing');


let time = new Date();
let month = time.toLocaleString('default', {month : 'long'});
let day = time.getDate();
let year = time.getFullYear();

let myDate = `${month} ${day} ${year}`;
date.innerText = myDate;
console.log(myDate)
let tempAmount = 0;
Budgetbtn.addEventListener('click', ()=> {
    
    tempAmount = Number(budgtvalue.value);
    
    if(tempAmount <= 0 || tempAmount === ""){
        budgetAmountError.classList.add('show');
    }else{
        totalBudget.innerText = tempAmount;
        budgetAmountError.classList.remove('show');
    popup.classList.remove('open-popup');
    blurr.classList.remove('active');
    }
});

addBudgetbtn.addEventListener('click', ()=>{
    popup.classList.add('open-popup');
    blurr.classList.add('active');
});
let category = "";
let expPrize = [];
chkBudget.addEventListener('click', ()=>{
    category = addCategory.value;
    let value = {
        id: expPrize.length+1,
        catName : addCategory.value,
        cost: Number(catExpense.value)
    }
    expPrize.push({...value});
    console.log(expPrize)
    let totalCost = 0;
    
    for (let i = 0; i < expPrize.length; i++) {
        totalCost += expPrize[i].cost;
    }
    
let remainingBalance = tempAmount - totalCost;
if(tempAmount <= 0){
    alert("Please add budget");

}else if(category === "" ){
    catError.classList.add('show');

}else if(totalCost <= 0){
    catError.classList.remove('show');
    amountError.classList.add('show');
    

}else if(remainingBalance <0){
    alert('Insufficient Budget Amount');
}
else if(remainingBalance >=0){
    
    amountError.classList.remove('show');
    expenditureVal.innerText = totalCost;
    balance.innerText = remainingBalance;
}

expList();

});


function expList(){
    const myDiv = document.createElement('li');
    expPrize.forEach((exp)=>{
        
        myDiv.innerHTML = '';
        myDiv.id = `${exp.id}`;
        myDiv.innerHTML = `<div>${exp.catName}</div> <div><span>${exp.cost}</span><button class="delBtn" id="${exp.id}"><i class="fa fa-trash-o" ></i></button></div>`;
        listing.appendChild(myDiv);
        const delBtn = myDiv.querySelector('.delBtn');
        
        delBtn.addEventListener('click', () => {
           deleteExp(exp.id);
            myDiv.remove();
        
        })
        
    })
    
};
 deleteExp = (id) => {
    expPrize = expPrize.filter(exp => exp.id !== id);
}

