function processList(){

    const input = document.getElementById("input").value.trim();
    const orderInput = document.getElementById("order").value.trim();

    if(!input){
        alert("Please enter a list");
        return;
    }

    const items = input
        .split("\n")
        .map(x => x.trim())
        .filter(Boolean);

    let result = "";

    // CUSTOM ORDER (1-based input from user)
    if(orderInput){

        const order = orderInput
            .split(",")
            .map(x => parseInt(x.trim()) - 1);

        order.forEach((index, i) => {

            if(items[index] !== undefined){
                result += (i + 1) + ". " + items[index] + "\n";
            }

        });

    } else {

        // DEFAULT RANDOM SHUFFLE (secure)
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
