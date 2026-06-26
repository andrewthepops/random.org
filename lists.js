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
const PICK_ORDER = [3,0,1,2];

function processList(){

    const input = document.getElementById("input").value.trim();

    if(!input){
        alert("Please enter a list");
        return;
    }

    // ORIGINAL LIST (DO NOT SHUFFLE YET)
    const originalItems = input
        .split("\n")
        .map(x => x.trim())
        .filter(Boolean);

    let result = "";

    // If custom order exists
    if(PICK_ORDER.length > 0){

        PICK_ORDER.forEach((i, pos) => {

            if(originalItems[i] !== undefined){
                result += (pos + 1) + ". " + originalItems[i] + "\n";
            }

        });

    } else {

        // default shuffle mode (secure)
        let items = originalItems;

        // Fisher-Yates shuffle
        for(let i = items.length - 1; i > 0; i--){
            const j = crypto.getRandomValues(new Uint32Array(1))[0] % (i + 1);
            [items[i], items[j]] = [items[j], items[i]];
        }

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
