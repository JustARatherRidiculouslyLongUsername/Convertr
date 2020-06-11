 
/*
Functions
*/

function removeAllOptions() {
	let options = document.querySelectorAll('.removable');
	for (let element of options) {
		element.remove();
	}
}

function createOption(optionText) {

    // add an option called 'optionText' to both dropdowns
    for (let n of ['1', '2']) {
    	let dropdownSelector = `#unit-dropdown-${n}`;
        let name = `group-${n}`; // the name attribute of the radiobutton which goes inside the label
        let id = `${n}-${optionText.toLowerCase()}`; // eg: 1-inches, 2-kilograms
        
        // <label></label>
        let label = document.createElement('label');
        
        // <label class="option removable"></label>
        label.className = "option removable";

        label.innerHTML = 
        `<input type="radio" class="unit-option" name="${name}" id="${id}" onclick="displayOutput()">
        <span class="title animated"><i class="icon icon-arrow-right"></i>${optionText}</span>`;


        document.querySelector(dropdownSelector).appendChild(label);

    }

}




//START OF MAIN COVERSION FUNCTION//
function convertUnits(conv_val, conv_from, conv_to, measureName) {

    // If the selected option is temperature

    if (measureName === 'temperature') {

        let celsius_value = {
            celsius: conv_val,
            kelvin: conv_val - 273.15,
            fahrenheit: (conv_val - 32) * 5/9
        }[conv_from];


        let output = {
            celsius: celsius_value,
            kelvin: celsius_value + 273.15,
            fahrenheit: (celsius_value * 9/5) + 32
        }[conv_to];


        return Math.round(10000*output)/10000;
    }

    // If the selected option is Date

    else if (measureName === 'date') {
            // convert a Gregorian date to Julian a Date.
            if (conv_from === 'gregorian' && conv_to === 'julian') {


                let date_object = new Date(conv_val);

                let n = conv_val.substring(0,2);

                n = parseInt(n);
                n = Math.trunc(n*3/4 - 5/4);

                date_object.setDate(date_object.getDate()-n);

                return date_object.toISOString().substr(0, 10);
            }

            // convert a Julian date to Gregorian a Date.
            else if (conv_from === 'julian' && conv_to === 'gregorian') {

                let date_object = new Date(conv_val);

                let n = conv_val.substring(0,2);

                n = parseInt(n);
                n = Math.trunc(n*3/4 - 2);

                date_object.setDate(date_object.getDate() + n);

                return date_object.toISOString().substr(0, 10);     
            }

            // return the input for the same type of calendar
            else {
                return conv_val;
            }
        }

    // if other options are choosen then it refers the dictionary
    const conversions = {
        mass: {
            stone:6.350293,
            kilograms:1,
            pounds:0.453592
        },

        length: {
            centimeters:0.01,
            inches : 0.0254,
            yards:0.9144, 
            meters:1, 
            kilometers:1000,
            miles: 1609.3
        },

        speed: {
            "km/h": 1,
            "mi/h": 1.60934,
            knots: 1.852
        },

        currency: {
            aed: 1,
            gbp: 4.65,
            usd: 3.67,
        }

    }[measureName];


    return Math.round( 10000 * conv_val * conversions[conv_from] / conversions[conv_to]) / 10000;

}

// END OF MAIN COVERSION FUNCTION//





//Function to get inputs and run the conversion function//
function displayOutput() {

    // 1. gets the value from the unit selector 
    const selectedMeasure = document.querySelector('input[name="group-0"]:checked').id;



    // 2. gets the units selected from 2nd and 3rd dropbox
    const dropdownselcted1 = document.querySelector('input[name="group-1"]:checked').id;
    const dropdownselcted2 = document.querySelector('input[name="group-2"]:checked').id;


    // 3. stores input in a varibale
    let userinput = document.getElementById("input-1").value;

    if (selectedMeasure !== 'date') {
    	userinput = parseFloat(userinput);
    }


    // 4. run the function
    let output = convertUnits(userinput, dropdownselcted1.substring(2), dropdownselcted2.substring(2),selectedMeasure);
    

    // 5. sets the value to the output (#input-2) box
    document.getElementById("input-2").value = output;
}


function dateconverter(input1) {
	input1 = document.getElementById('input-1').value;
}


/*
End of functions
*/




 // (START) Adds Units to 2nd and 3rd drop down box based on measure unit selected


let length_option = document.querySelector('#length');

// When this option is clicked,
length_option.addEventListener('click', () => {


    // 1. remove what is previously in it
    removeAllOptions();

    // 2. add the new units to choose from
    createOption("Inches");
    createOption("Centimeters");
    createOption("Yards");
    createOption("Meters");
    createOption("Miles");
    createOption("Kilometers");

    // Set default values
    document.getElementById('1-inches').checked = true;
    document.getElementById('2-centimeters').checked = true;

    document.getElementById('input-1').type = 'number';
    document.getElementById('input-2').type = 'number';

    document.getElementById('input-1').value = 1;
    displayOutput();

});



let mass_option = document.querySelector('#mass');

// When this option is clicked,
mass_option.addEventListener('click', () => {

    // 1. remove what is previously in it
    removeAllOptions();

    // 2. add the new units to choose from
    createOption("Pounds");
    createOption("Kilograms");
    createOption("Stone");

    document.getElementById('1-kilograms').checked = true;
    document.getElementById('2-pounds').checked = true;

    document.getElementById('input-1').type = 'number';
    document.getElementById('input-2').type = 'number';

    document.getElementById('input-1').value = 1;
    displayOutput();


    
});


let speed_option = document.querySelector('#speed');

// When this option is clicked,
speed_option.addEventListener('click', () => {

    // 1. remove what is previously in it
    removeAllOptions();

    // 2. add the new units to choose from
    createOption("Mi/h");
    createOption("Km/h");
    createOption("Knots");

    document.getElementById('1-km/h').checked = true;
    document.getElementById('2-mi/h').checked = true;

    document.getElementById('input-1').type = 'number';
    document.getElementById('input-2').type = 'number';

    document.getElementById('input-1').value = 1;
    displayOutput();
    
});


let temperature_option = document.querySelector('#temperature');

// When this option is clicked,
temperature_option.addEventListener('click', () => {

    // 1. remove what is previously in it
    removeAllOptions();

    // 2. add the new units to choose from
    createOption("Fahrenheit");
    createOption("Celsius");
    createOption("Kelvin");

    document.getElementById('1-celsius').checked = true;  
    document.getElementById('2-fahrenheit').checked = true;

    document.getElementById('input-1').type = 'number';
    document.getElementById('input-2').type = 'number';

    document.getElementById('input-1').value = 1;
    displayOutput();
    
});


let date_option = document.querySelector('#date');

// When this option is clicked,
date_option.addEventListener('click', () => {

    // 1. remove what is previously in it
    removeAllOptions();

    // 2. add the new units to choose from
    createOption("Gregorian");
    createOption("Julian");

    document.getElementById('1-gregorian').checked = true;
    document.getElementById('2-julian').checked = true;

    // accept date input instead of floats
    document.getElementById('input-1').type = 'date';
    document.getElementById('input-1').max = '9999-12-31';
    document.getElementById('input-2').type = 'date';

    // set default value === current date
    let curdate = new Date().toISOString().substr(0, 10);
    document.getElementById('input-1').value = curdate;
    displayOutput();

    
});


let currency_option = document.querySelector('#currency');

// When this option is clicked,
currency_option.addEventListener('click', () => {

     // 1. remove what is previously in it
     removeAllOptions();

    // 2. add the new units to choose from
    createOption("AED");
    createOption("USD");
    createOption("GBP");

    document.getElementById('1-usd').checked = true;
    document.getElementById('2-aed').checked = true;

    document.getElementById('input-1').type = 'number';
    document.getElementById('input-2').type = 'number';

    document.getElementById('input-1').value = 1;
    displayOutput();
    
});

// (END) Adds Units to 2nd and 3rd drop down box based on measure unit selected


document.getElementById('input-1').addEventListener('input', displayOutput);



// Swap the input and output fields when the arrows are clicked
document.querySelector('#arrows-container').addEventListener('click', () => {

    // switch text inputs
    let value1 = document.getElementById('input-1').value;
    let value2 = document.getElementById('input-2').value;

    document.getElementById('input-1').value = value2;
    document.getElementById('input-2').value = value1;

    // switch dropdown inputs
    let unit1 = document.querySelector('input[name="group-1"]:checked').id;
    let unit2 = document.querySelector('input[name="group-2"]:checked').id;

    unit1 = unit1.replace('1', '2');
    unit2 = unit2.replace('2', '1');

    document.getElementById(unit1).checked = true;
    document.getElementById(unit2).checked = true;

});


document.querySelector('#currency').click();
