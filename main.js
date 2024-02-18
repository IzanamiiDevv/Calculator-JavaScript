let display = document.getElementById('screen');
let toggle = false;
let parentesis = false;
const equation = [];

document.querySelectorAll('button').forEach((element, index) => {
    const char = element.innerText;
    function put(chars, index){
        const number = [4,5,6,8,9,10,12,13,14,16];
        function raised(numIndex){
            const raisedNum = ["⁰", "¹" ,"²", "³", "⁴" ,"⁵" ,"⁶","⁷" ,"⁸" ,"⁹"];

            switch (numIndex) {
                case 4:
                    return raisedNum[7];
                case 5:
                    return raisedNum[8];
                case 6:
                    return raisedNum[9];
                case 8:
                    return raisedNum[4];
                case 9:
                    return raisedNum[5];
                case 10:
                    return raisedNum[6];
                case 12:
                    return raisedNum[1];
                case 13:
                    return raisedNum[2];
                case 14:
                    return raisedNum[3];
                case 16:
                    return raisedNum[0]
            }
        }

        if(index == 18){
            evaluates(equation.join(""));
            return;
        }

        if(index == 1){
            equation.push(parentesis? ")":"(")
            parentesis = !parentesis
            return;
        }

        if(toggle){
            if(index == 0){
                equation.pop();
                return;
            }
            if(number.includes(index)){
                equation.push(raised(index));
            }
            return;
        }

        if(chars == "C"){
            equation.pop();
            return;
        }
        equation.push(chars);
    }

    if(index == 2){
        element.addEventListener('click',()=>{
            toggle = !toggle
            element.style.backgroundColor = toggle ? "orange" : "gray"; 
            console.log(toggle)
        })
    }else{
        element.addEventListener('click',()=>{
            put(char , index);
            display.innerText = equation.join("")
            if(equation.length == 0){
                display.innerText = 0;
            }
        });
    }
});

function evaluates(expression) {
    const raisedNum = ["⁰", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹"];

    const fixed = expression.split('').map((token, index, array) => {
        if (raisedNum.includes(token)) {
            if (index === 0 || (index > 0 && !raisedNum.includes(array[index - 1]))) {
                return "**" + raisedNum.indexOf(token);
            } else {
                return raisedNum.indexOf(token);
            }
        }
        return token;
    });

    const equation = fixed.join('').split('**').join('**').split('').filter((token) => token !== '').join('');

    try {
        sucess(eval(equation));
    } catch(error) {
        errorDispaly();
    }

    function sucess(msg){
        setTimeout(()=>{
            display.innerText = msg;
        },1)
    }

    function errorDispaly(){
        setTimeout(()=>{
            display.innerText = "Error";
        },1);
    }
}


window.addEventListener('blur',()=>{
    document.querySelector('title').innerText = "Comeback Here";
});

window.addEventListener('focus',()=>{
    document.querySelector('title').innerText = "Web Calculator";
});