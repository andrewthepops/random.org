const PICK_ORDER = [
    477,60,408,549,28,569,31,558,642,562,
    313,391,77,181,591,166,101,581,297,276,
    169,88,525,260,56,604,131,108,596,503
];

// ==========================
// 🔥 DEFAULT TIMESTAMP HERE
// You can manually edit this anytime
// ==========================
let DEFAULT_TIMESTAMP = "2026-06-25 10:03:05 UTC";

function secureShuffle(arr){
    for(let i = arr.length - 1; i > 0; i--){
        const j = crypto.getRandomValues(new Uint32Array(1))[0] % (i + 1);
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function processList(){

    const input = document.getElementById("input").value.trim();
    const outputEl = document.getElementById("output");

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
    // ORDER MODE
    // =========================
    if(PICK_ORDER.length > 0){

        let usedAny = false;

        PICK_ORDER.forEach((num, pos) => {

            const index = num - 1;

            if(index >= 0 && index < items.length){
                result += (pos + 1) + ". " + items[index] + "\n";
                usedAny = true;
            }
        });

        if(!usedAny){
            result = "No valid items matched PICK_ORDER.\n";
        }

    }
    // =========================
    // RANDOM MODE
    // =========================
    else {

        const shuffled = secureShuffle([...items]);

        shuffled.forEach((item, i) => {
            result += (i + 1) + ". " + item + "\n";
        });
    }

    // =========================
    // OPTIONAL TIMESTAMP
    // =========================
    if(document.getElementById("showTime").checked){

        result += "\nTimestamp: " + DEFAULT_TIMESTAMP;
    }

    outputEl.textContent = result;
}

function copyOutput(){
    navigator.clipboard.writeText(
        document.getElementById("output").textContent
    ).then(() => {
        alert("Copied!");
    }).catch(() => {
        alert("Copy failed");
    });
}
