/*
========================================
HIDDEN ORDER SYSTEM
========================================
*/

const PICK_ORDER = [
    477,60,408,549,28,569,31,558,642,562,
    313,391,77,181,591,166,101,581,297,276,
    169,88,525,260,56,604,131,108,596,503
];

function secureShuffle(arr){
    for(let i = arr.length - 1; i > 0; i--){
        const j = crypto.getRandomValues(new Uint32Array(1))[0] % (i + 1);
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function processList(){

    const inputEl = document.getElementById("input");
    const outputEl = document.getElementById("output");

    const input = inputEl.value.trim();

    if(!input){
        alert("Please enter a list");
        return;
    }

    const items = input
        .split("\n")
        .map(x => x.trim())
        .filter(Boolean);

    let result = "";

    // =========================
    // MODE 1: ORDER MODE
    // =========================
    if(PICK_ORDER.length > 0){

        let usedAny = false;

        PICK_ORDER.forEach((num, pos) => {

            const index = num - 1;

            // SAFE BOUND CHECK (IMPORTANT FIX)
            if(index >= 0 && index < items.length){
                result += (pos + 1) + ". " + items[index] + "\n";
                usedAny = true;
            }

        });

        // fallback if nothing matched (prevents “empty output bug”)
        if(!usedAny){
            result = "No valid items matched PICK_ORDER.\n";
        }

    }

    // =========================
    // MODE 2: RANDOM MODE
    // =========================
    else {

        const shuffled = secureShuffle([...items]);

        shuffled.forEach((item, i) => {
            result += (i + 1) + ". " + item + "\n";
        });
    }

    outputEl.textContent = result;
}

function copyOutput(){
    const text = document.getElementById("output").textContent;

    navigator.clipboard.writeText(text)
        .then(() => alert("Copied!"))
        .catch(() => alert("Copy failed"));
}
