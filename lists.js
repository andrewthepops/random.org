/*
========================================
HIDDEN ORDER (HUMAN FRIENDLY)
1 = first item
2 = second item
3 = third item
========================================
Example:
[3,1,2]
means:
3rd item → 1st
1st item → 2nd
2nd item → 3rd
*/
const PICK_ORDER = [477,60,408,549,28,569,31,558,642,562,313,391,77,181,591,166,101,581,297,276,169,88,525,260,56,604,131,108,596,503];

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
        alert("Please enter a list");
        return;
    }

    const items = input
        .split("\n")
        .map(x => x.trim())
        .filter(Boolean);

    let result = "";

    // =========================
    // MODE 1: HIDDEN ORDER MODE
    // =========================
    if(PICK_ORDER.length > 0){

        PICK_ORDER.forEach((num, pos) => {

            const index = num - 1; // 🔥 convert to real index

            if(items[index] !== undefined){
                result += (pos + 1) + ". " + items[index] + "\n";
            }

        });

    }

    // =========================
    // MODE 2: RANDOM MODE
    // =========================
    else {

        let arr = secureShuffle([...items]);

        arr.forEach((item, i) => {
            result += (i + 1) + ". " + item + "\n";
        });

    }

    document.getElementById("output").textContent = result;
}

function copyOutput(){
    navigator.clipboard.writeText(
        document.getElementById("output").textContent
    );
    alert("Copied!");
}
