function getMsg(){
    let loading = document.getElementById("messages").innerHTML="<h6>Cargando...</h6>"
    return loading;
}
function getAll() {    
    function getPerfectNumbersInRange(getDataStartingValue1, getDataStartingValue2) {
        if (getDataStartingValue1 > getDataStartingValue2 || getDataStartingValue1 < 1 || getDataStartingValue2 < 1) {
            throw new Error("El rango debe contener números naturales (positivos) y el inicio debe ser menor o igual al final.");
        }
        function isPerfectNumber(num) {
            let sum = 0;
            for (let i = 1; i <= Math.sqrt(num); i++) {
                if (num % i === 0) {
                    sum += i;
                    if (i !== 1 && i !== num / i) {
                        sum += num / i;
                    }
                }
            }
            return sum === num;
        }
        const perfectNumbers = [];
        for (let i = getDataStartingValue1; i <= getDataStartingValue2; i++) {
            if (isPerfectNumber(i)) {
                perfectNumbers.push(i);
            }
        }
        let loaded = document.getElementById("loaded").innerHTML="<h6>Cargado</h6>" 
        return perfectNumbers; 
    }
    
    try {
        document.getElementById("messages").innerHTML = "<h6></h6>";
        document.querySelector("#dataNumbers").innerHTML = "";

        let getDataStartingValue1 = parseInt(document.getElementById("valor1").value);
        let getDataStartingValue2 = parseInt(document.getElementById("valor2").value);

        const perfectNumbers = getPerfectNumbersInRange(getDataStartingValue1, getDataStartingValue2);

        const jsonData = JSON.stringify(perfectNumbers);
        localStorage.setItem('dataNumbers', jsonData);

        const newDate = JSON.parse(localStorage.getItem('dataNumbers'));

        let out = "";
        newDate.forEach((value, index) => {
            out += `
            <tr>
                <td>Puesto ${index + 1}</td> 
                <td>${value}</td>
            </tr>
            `;
        });

        const placeholder = document.querySelector("#dataNumbers");
        placeholder.insertAdjacentHTML('beforeend', out);

        alert(`Total de números perfectos encontrados: ${newDate.length}`);
        document.getElementById("messages").innerHTML = `<h3 style="font-size:40px">Los numeros perfectos en el rango de ${getDataStartingValue1} a ${getDataStartingValue2} son: ${newDate.length}</h3>`;

        const show = document.getElementById('table');
        show.style.display = 'table';
    } 
    catch (error) {
        document.getElementById("messages").innerHTML = "<h5>...Error...</h5>";
        alert("El rango debe contener números naturales (positivos) y el inicio debe ser menor o igual al final.");
        console.error(error.message);
    }
}