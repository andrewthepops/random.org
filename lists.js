function secureRandom(max){
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return array[0] % max;
}

function shuffle(arr){
    for(let i = arr.length - 1; i > 0; i--){
        const j = secureRandom(i + 1);
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

/*
========================
HIDDEN PICK ORDER
Edit only this line:
========================
Example:
[2,0,1] = custom order
[] = normal order
*/
const PICK_ORDER = [];

function processList(){

    const input = document.getElementById("input").value.trim();

    if(!input){
        alert("Please enter a list");
        return;
    }

    let items = input.split("\n").map(x => x.trim()).filter(Boolean);

    // shuffle first
    items = shuffle(items);

    let result = "";

    if(PICK_ORDER.length > 0){

        PICK_ORDER.forEach((index, i) => {
            if(items[index] !== undefined){
                result += (i + 1) + ". " + items[index] + "\n";
            }
        });

    } else {

        items.forEach((item, i) => {
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
