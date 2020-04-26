let textEditor = document.querySelector("#code");
let lineNumbers = document.querySelector("#line_numbers");
let runButton = document.querySelector("[name='run_button']");
let registersInput = document.querySelector("#registers_input");
let registersOutput = document.querySelector("#registers_output");

let commands = []

function updateLineNumbers() {
    commands = textEditor.value.split('\n');
    var linesString = "";
    for (var i = 0; i < commands.length + 1; i++) {
        linesString = linesString + (i + 1);
        linesString = linesString + "\n";
    }
    lineNumbers.value = linesString
}

textEditor.addEventListener("keydown", (e) => {
    updateLineNumbers()
});

textEditor.addEventListener("scroll", (e) => {
    lineNumbers.scrollTo(0, textEditor.scrollTop);
});
updateLineNumbers()

function parseCommands() {
    updateLineNumbers();

    for (var i = 0; i < commands.length; i++) {
        let command = commands[i];

        let regexJ = new RegExp('^J\\( *[0-9]+ *, *[0-9]+ *, *[0-9]+ *\\) *');
        if (regexJ.test(command)) continue;

        let regexS = new RegExp('^S\\( *[0-9]+ *\\) *');
        if (regexS.test(command)) continue;

        let regexT = new RegExp('^T\\( *[0-9]+ *, *[0-9]+ *\\) *');
        if (regexT.test(command)) continue;

        let regexZ = new RegExp('^Z\\( *[0-9]+ *\\) *');
        if (regexZ.test(command)) continue;

        alert("Greska u komandi " + command + " u redu " + (i + 1));
        return false;
    }
    return true;
}

function checkRegisters() {
    var registers = registersInput.value.split(" ")

    for (var i = 0; i < registers.length; i++) {
        let register = registers[i];

        let regex = new RegExp('^[0-9]+');
        if (regex.test(register)) continue;

        alert("Greska u registru " + (i + 1));
        return false
    }
    return true;
}

var worker = new Worker('evaluate.js');

var isRunning = false;

runButton.addEventListener("click", (e) => {
    if (!isRunning) {
        if (!parseCommands()) {
            return;
        }
        if (!checkRegisters()) {
            return;
        }


        isRunning = true
        runButton.innerText = "Stop"

        worker = new Worker('evaluate.js');
        worker.addEventListener('message', e => {
            registersOutput.value = e.data;
            isRunning = false;
            runButton.innerText = "Run"
        }, false)

        worker.postMessage({
            registers: registersInput.value.split(" "),
            commands: commands
        });
    } else {
        runButton.innerText = "Run"
        isRunning = false;
        worker.terminate()
    }
});

var reader = new FileReader();
reader.onload = function (e) {
    textEditor.value = e.target.result.trim();
    updateLineNumbers()
};

document.getElementById("loadButton").addEventListener('click', function() {
    var file = document.getElementById("myFile").files[0];
    reader.readAsText(file);
});

