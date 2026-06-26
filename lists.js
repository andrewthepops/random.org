/*
========================================
HIDDEN CUSTOM ORDER (EDIT ONLY HERE)
========================================
Example:
[2,0,1] = 3rd item first, then 1st, then 2nd
Leave empty [] = normal random shuffle
*/
const PICK_ORDER = [3,2,1,0];   // 👈 HIDDEN CONTROL

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

    // 🔒 IF CUSTOM ORDER EXISTS (HIDDEN LOGIC)
    if(PICK_ORDER.length > 0){

        PICK_ORDER.forEach((i, pos) => {

            if(items[i] !== undefined){
                result += (pos + 1) + ". " + items[i] + "\n";
            }

        });

    } else {

        // 🎲 SECURE RANDOM SHUFFLE
        let arr = [...items];

        for(let i = arr.length - 1; i > 0; i--){
            const j = crypto.getRandomValues(new Uint32Array(1))[0] % (i + 1);
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }

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
