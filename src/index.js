import './styles.css';
import { ready } from "./utils";


let buttons,
    clickedButton = "",
    validInput = false;

// Really like this - super extra credit. I didn't localize mine properly. JMG
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
});

function initialize() {
    buttons = document.getElementsByClassName('btn');
    //* Add all event listeners
    document.getElementById('bill-amount2').addEventListener('input', handleAmountChange, false);
    // super nice. I might have used a buttons.forEach(btn => btn.addEventListener('click', handleButtonClick)) -- JMG
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', handleButtonClick);
    };
    //Retrieve preferred tip from web stoarge on application start
    // EXTRA CREDIT !
    if (clickedButton === "" && localStorage.tip !== undefined) {
        clickedButton = localStorage.tip;
        handleButtonActivation(clickedButton);
    };
}

function handleButtonClick(evt) {
    // Ha! Naming things is hard. ;) -- JMG
    handleButtonActivation(this.id);
    //update web storage
    localStorage.tip = this.id;
    clickedButton = this.id;
    processTip(clickedButton);
};

function handleAmountChange(evt) {
    validateInput(document.getElementById('bill-amount2').value);
    if ((clickedButton === "" && localStorage.tip === undefined)) {
        //show error for missing tip selection
        document.getElementById('tipComment').classList.add('error');
        document.getElementById('tipComment').classList.remove('hidden');
        document.getElementById('tipComment').textContent = 'Select tip percent';
    }
    else {
        processTip(clickedButton);
    }
};
function processTip(tipButton) {
    let tip = 0;
    let billAmount = document.getElementById('bill-amount2').value;
    validateInput(billAmount);

    if (validInput) {
        document.getElementById('bill-amount2').classList.remove('error');
        // if (tipButton === undefined && localStorage.tip !== undefined) {
        //     tipButton === localStorage.tip
        // }
        // Petty, but maybe a switch here would have been cleaner? I have an allergy to nested if/else if. JMG
        if (tipButton === '10Button') {
            tip = 10;
        }
        else if (tipButton === '15Button') {
            tip = 15;
        }
        else if (tipButton === '20Button') {
            tip = 20;
        }
        else (tip === 0)
            ;
            // DANG! Destructuring! NICE! -- JMG
        const [tipAmount, totalAmount] = calculateTip(billAmount, tip);
        //handleButtonActivation(tipButton);
        document.getElementById('calculatedCard1').classList.remove('hidden');
        document.getElementById('tipComment').classList.remove('error', 'hidden');
        document.getElementById('tipComment').textContent = `You are tipping ${tip} %`;
        document.getElementById('billAmount').textContent = `Bill Amount: ${formatter.format(billAmount)}`;
        document.getElementById('tipPercent').textContent = `Tip Percentage: ${tip} %`;
        document.getElementById('tipAmount').textContent = `Amount of Tip: ${formatter.format(tipAmount)}`;
        document.getElementById('totalAmount').textContent = `Total to be Paid: ${formatter.format(totalAmount)}`;
    }
}


function validateInput(billAmount) {
    //check if billAmount is invalid - NAN, negative or not entered
    if (isNaN(billAmount) || billAmount < 0 || billAmount.length === 0) {
        //show red border around input and hide calculated values
        document.getElementById('bill-amount2').classList.add('error');
        document.getElementById('calculatedCard1').classList.add('hidden');
        document.getElementById('tipComment').classList.add('hidden');
        validInput = false;
    }
    else {
        validInput = true;
    }
}

function handleButtonActivation(tipButton) {
    //disable clicked button and enable others
    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].id == tipButton) {
            buttons[i].classList.add('disabled')
            buttons[i].classList.remove('enabled');
            buttons[i].removeEventListener('click', handleButtonClick);
        }
        else {
            buttons[i].classList.remove('disabled');
            buttons[i].classList.add('enabled');
            buttons[i].addEventListener('click', handleButtonClick);
        }
    }
}

function calculateTip(billAmount, tipPercent) {
    let tipAmount = parseFloat(parseFloat(billAmount * (tipPercent / 100)).toFixed(2));
    let totalAmount = parseFloat(parseFloat(billAmount) + tipAmount).toFixed(2);
    return [tipAmount, totalAmount];
}

ready(initialize);

/*
Some notes.

First off, fantastic. Really nicely done. I hope you enjoyed it.
The only thing I would add, other than the little comments above, is maybe put some of these functions in other files and import them in here.
It makes the dependencies clearer. But A++ work.



*/

