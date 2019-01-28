import './styles.css';

let buttons,
    clickedButton = "",
    validInput = false;

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
})

function initialize() {
    buttons = document.getElementsByClassName("btn");
    //* Add all event listeners
    document.getElementById("bill-amount2").addEventListener("input", handleAmountChange, false);
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", handleButtonClick);
    };
    //Retrieve preferred tip from web stoarge on application start
    if (clickedButton === "" && localStorage.tip !== undefined) {
        clickedButton = localStorage.tip;
        handleButtonActivation(clickedButton);
    };
}

function handleButtonClick(evt) {
    handleButtonActivation(this.id);
    //update web storage
    localStorage.tip = this.id;
    clickedButton = this.id;
    processTip(clickedButton);
};

function handleAmountChange(evt) {
    validateInput(document.getElementById("bill-amount2").value);
    if ((clickedButton === "" && localStorage.tip == undefined)) {
        //show error for missing tip selection
        document.getElementById("tipComment").classList.add("error");
        document.getElementById("tipComment").classList.remove("hidden");
        document.getElementById("tipComment").textContent = "Select tip percent";
    }
    else {
        processTip(clickedButton);
    }
}

function processTip(tipButton) {
    let tip = 0;
    let billAmount = document.getElementById("bill-amount2").value;
    validateInput(billAmount);

    if (validInput) {
        document.getElementById("bill-amount2").classList.remove("error");
        // if (tipButton === undefined && localStorage.tip !== undefined) {
        //     tipButton === localStorage.tip
        // }
        if (tipButton === "10Button") {
            tip = 10;
        }
        else if (tipButton === "15Button") {
            tip = 15;
        }
        else if (tipButton === "20Button") {
            tip = 20;
        }
        else (tip === 0)
            ;
        const [tipAmount, totalAmount] = calculateTip(billAmount, tip);
        //handleButtonActivation(tipButton);
        document.getElementById("calculatedCard1").classList.remove("hidden");
        document.getElementById("tipComment").classList.remove("error","hidden");
        document.getElementById("tipComment").textContent = `You are tipping ${tip} %`;
        document.getElementById("billAmount").textContent = `Bill Amount: ${formatter.format(billAmount)}`;
        document.getElementById("tipPercent").textContent = `Tip Percentage: ${tip} %`;
        document.getElementById("tipAmount").textContent = `Amount of Tip: ${formatter.format(tipAmount)}`;
        document.getElementById("totalAmount").textContent = `Total to be Paid: ${formatter.format(totalAmount)}`;
    }
}


function validateInput(billAmount) {
    //check if billAmount is invalid - NAN, negative or not entered
    if (isNaN(billAmount) || billAmount < 0 || billAmount.length === 0) {
        //show red border around input and hide calculated values
        document.getElementById("bill-amount2").classList.add("error");
        document.getElementById("calculatedCard1").classList.add("hidden");
        document.getElementById("tipComment").classList.add("hidden");
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
            buttons[i].classList.add("disabled")
            buttons[i].classList.remove("enabled");
            buttons[i].removeEventListener("click", handleButtonClick);
        }
        else {
            buttons[i].classList.remove("disabled");
            buttons[i].classList.add("enabled");
            buttons[i].addEventListener("click", handleButtonClick);
        }
    }
}

function calculateTip(billAmount, tipPercent) {
    let tipAmount = parseFloat(parseFloat(billAmount * (tipPercent / 100)).toFixed(2));
    let totalAmount = parseFloat(parseFloat(billAmount) + tipAmount).toFixed(2);
    return [tipAmount, totalAmount];
}

initialize();

