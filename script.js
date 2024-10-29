var creditArray = [];
var GradeArray = [];
var Grade_valueArray = [];  
var total_gca = 0;
var total_credit = 0;
var result = 0;

function calculate() {
    const credit = Number(document.getElementById("Credit").value);
    const Grade = document.getElementById("grade_alpha").value;

   
    if (credit === 0 || Grade === "") {
        alert("Please enter valid credit and grade.");
        return;
    }

    creditArray.push(credit);
    GradeArray.push(Grade);
    
    let Grade_value = 0;
    switch (Grade) {
        case 'O': Grade_value = 10; break;
        case 'A+': Grade_value = 9; break;
        case 'A': Grade_value = 8; break;
        case 'B+': Grade_value = 7; break;
        case 'B': Grade_value = 6; break;
        case 'C': Grade_value = 5; break;
        default: Grade_value = 0;
    }

    Grade_valueArray.push(Grade_value);
    total_credit += credit;
    total_gca += credit * Grade_value;
    const total = total_gca / total_credit;
    result = total;

    document.getElementById("score1").innerText = total.toFixed(2);
    if (total < 6) {
        document.getElementById("score1").style.color = 'red';
    } else if (total >= 6 && total < 8) {
        document.getElementById("score1").style.color = 'yellow';
    } else {
        document.getElementById("score1").style.color = '#40FF00';
    }


    document.getElementById("Credit").value = "";
    document.getElementById("grade_alpha").value = "";
}

function toAdd() {

    document.getElementById("Credit").selectedIndex = 0;
    document.getElementById("grade_alpha").selectedIndex = 0;
    calculate();
}

function createTable() {
    const main = document.querySelector("main").style.display = "none";
    const table_tag = document.querySelector(".tab").style.display = "flex";
    let tablebody = document.querySelector("#dynamicTable tbody");

    if (creditArray.length === GradeArray.length && GradeArray.length === Grade_valueArray.length) {
        for (let i = 0; i < creditArray.length; i++) {
        
            if (creditArray[i] === 0 || Grade_valueArray[i] === 0) continue;

     
            const row = document.createElement("tr");

            const cell1 = document.createElement("td");
            cell1.textContent = i + 1;
            row.appendChild(cell1);

            const cell2 = document.createElement("td");
            cell2.textContent = creditArray[i];
            row.appendChild(cell2);

            const cell3 = document.createElement("td");
            cell3.textContent = GradeArray[i];
            row.appendChild(cell3);

            const cell4 = document.createElement("td");
            cell4.textContent = Grade_valueArray[i];
            row.appendChild(cell4);

        
            tablebody.appendChild(row);
        }

        const foot = document.createElement("tr");
        const cell5 = document.createElement("td");
        cell5.textContent = "Total";
        cell5.setAttribute("colspan", "3");
        foot.appendChild(cell5);

        const cell6 = document.createElement("td");
        cell6.textContent = result.toFixed(2);
        foot.appendChild(cell6);

        tablebody.appendChild(foot);

    } else {
        console.error("Arrays are not the same size!");
    }
}

function back() {
    const main = document.querySelector("main").style.display = "flex";
    const table_tag = document.querySelector(".tab").style.display = "none";
    const tablebody = document.querySelector("#dynamicTable tbody");
    while (tablebody.firstChild) {
        tablebody.removeChild(tablebody.firstChild);
    }
}

function remove() {
    const tablebody = document.querySelector("#dynamicTable tbody");
    const rows = tablebody.querySelectorAll("tr");
    

    if (rows.length > 1) {
        tablebody.removeChild(rows[rows.length - 2]);
        creditArray.pop();
        GradeArray.pop();
        Grade_valueArray.pop();

        total_credit = creditArray.reduce((acc, curr) => acc + curr, 0);
        total_gca = creditArray.reduce((acc, curr, index) => acc + curr * Grade_valueArray[index], 0);
        const total = total_gca / total_credit;
        result = total;

        rows[rows.length - 1].querySelector("td:last-child").textContent = result.toFixed(2);

        if (total < 6) {
            document.getElementById("score1").style.color = 'red';
        } else if (total >= 6 && total < 8) {
            document.getElementById("score1").style.color = 'yellow';
        } else {
            document.getElementById("score1").style.color = '#40FF00';
        }

        document.getElementById("score1").innerText = total.toFixed(2);
    } else {
        console.log("No rows to remove.");
    }
}
function downloadTableAsImage() {
    const table = document.querySelector("#dynamicTable"); // Select the table
    html2canvas(table).then(canvas => {
        // Convert canvas to a downloadable link
        let link = document.createElement("a");
        link.download = "table.png";
        link.href = canvas.toDataURL("image/png");
        link.click(); // Trigger download
    });
}

