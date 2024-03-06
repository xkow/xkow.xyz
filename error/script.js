document.addEventListener("DOMContentLoaded", function() {
    var inputLine = document.getElementById("input-line");
    var terminalContent = document.getElementById("terminal-content");
    var maxLines = 17; 
    var firstMessageAdded = false; 
    terminalContent.spellcheck = false;

    function addTextToTerminal(text, color) {
        var newContent;
        if (!firstMessageAdded) { 
            newContent = "<div style='animation: fadeIn 0.5s ease forwards;'><span style='color: " + color + ";'>root@xkow.xyz:~# " + text + "</span></div>";
            firstMessageAdded = true; 
        } else {
            newContent = "<div style='animation: fadeIn 0.5s ease forwards;'>root@xkow.xyz:~# " + text + "</div>";
        }
        terminalContent.insertAdjacentHTML('beforeend', newContent);

        var lines = terminalContent.children.length;

        if (lines > maxLines) {
            var excessLines = lines - maxLines;
            for (var i = 0; i < excessLines; i++) {
                terminalContent.removeChild(terminalContent.children[0]);
            }
        }
    }

    function handleCommand(inputText) {
        if (inputText.toLowerCase() === "help") {
            return "help\n\nwelcome to the xkow.xyz command center\n\ncommands:\n  help          shows this menu\n  clear         clears the terminal\n  ipconfig      shows your ip\n  whyamihere    answers all your questions\n  github        directs you to the person who made this";
        } else if (inputText.toLowerCase() === "clear") {
            terminalContent.innerHTML = "Terminal Cleared";
            firstMessageAdded = false; 
            return ""; 
        } else if (inputText.toLowerCase() === "whyamihere") {
            return "whyamihere\n\nyou're on this page because you tried to access something that you didn't have the right permission to";
        } else if (inputText.toLowerCase() === "github") {
            window.open("https://github.com/xkow", "_blank");
            return "github\n\ngithub/xkow";        
        } else if (inputText.toLowerCase() === "ipconfig") {
            fetch('https://api.ipify.org?format=json')
                .then(response => response.json())
                .then(data => {
                    addTextToTerminal("ipconfig\n" + data.ip, "white");
                });
            return "";
        } else if (inputText.toLowerCase() === "hej") {
            return "hej";
        } else {
            return inputText;
        }
    }

    inputLine.focus();

    addTextToTerminal("Error 403: You don't have access to this page!", "red");
    addTextToTerminal("Type 'help' for more information.");

    inputLine.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            var inputText = inputLine.textContent.trim();
            inputLine.textContent = "";
            event.preventDefault();
            setTimeout(function() {
                var commandOutput = handleCommand(inputText);
                if (commandOutput !== "") {
                    addTextToTerminal(commandOutput, "white");
                }
            }, 200);
        }
    });

    document.addEventListener("keydown", function(event) {
        inputLine.focus();
    });
});
