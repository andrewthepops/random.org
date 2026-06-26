function secureRandom(max){

    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return array[0] % max;
}

// Fisher-Yates shuffle (secure)
function shuffle(arr){

    for(let i=arr.length-1;i>0;i--){

        const j = secureRandom(i+1);

        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
}

function processList(){

    const input = document.getElementById("input").value.trim();
    const orderInput = document.getElementById("order").value.trim();

    if(!input){
        alert("Please enter a list");
        return;
    }

    let items = input.split("\n").map(x=>x.trim()).filter(Boolean);

    // shuffle list first
    items = shuffle(items);

    let result = "";

    // if user defined order
    if(orderInput){

        const order = orderInput.split(",").map(x=>parseInt(x.trim())-1);

        order.forEach((index, i)=>{
            if(items[index] !== undefined){
                result += (i+1) + ". " + items[index] + "\n";
            }
        });

    } else {

        // default order
        items.forEach((item,i)=>{
            result += (i+1) + ". " + item + "\n";
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
