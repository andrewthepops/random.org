/*
First 30 positions are fixed by PICK_ORDER.
Everything else is added afterwards in random order.
*/

const PICK_ORDER = [
    477,60,408,549,28,569,31,558,642,562,
    313,391,77,181,591,166,101,581,297,276,
    169,88,525,260,56,604,131,108,596,503
];

// Change this whenever you want.
const DEFAULT_TIMESTAMP = "2026-06-25 10:03:05 UTC";

function secureShuffle(arr){

    for(let i = arr.length - 1; i > 0; i--){
        const j = crypto.getRandomValues(new Uint32Array(1))[0] % (i + 1);
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
}

function processList(){

    const input = document.getElementById("input").value.trim();

    if(!input){
        alert("Please enter a list.");
        return;
    }

    const items = input
        .split("\n")
        .map(x => x.trim())
        .filter(Boolean);

    let result = "";
    let position = 1;

    // Track which original items were already used
    const used = new Set();

    // First: fixed order
    PICK_ORDER.forEach(num => {

        const index = num - 1;

        if(index >= 0 && index < items.length){

            result += position + ". " + items[index] + "\n";
            position++;

            used.add(index);
        }

    });

    // Collect remaining items
    const remaining = [];

    items.forEach((item, index) => {

        if(!used.has(index)){
            remaining.push(item);
        }

    });

    // Shuffle remaining items
    secureShuffle(remaining);

    // Append them
    remaining.forEach(item => {

        result += position + ". " + item + "\n";
        position++;

    });

    // Always add timestamp
    result += "\nTimestamp: " + DEFAULT_TIMESTAMP;

    document.getElementById("output").textContent = result;
}

function copyOutput(){

    navigator.clipboard.writeText(
        document.getElementById("output").textContent
    );

    alert("Copied!");

}
