document.addEventListener("DOMContentLoaded", function() {
    var inputLine = document.getElementById("input-line");
    var terminalContent = document.getElementById("terminal-content");
    var maxLines = 17; // Antal linjer, terminalen skal indeholde
    var firstMessageAdded = false; // Flag for at spore, om den første besked er tilføjet
    terminalContent.spellcheck = false;

    // Funktion til at tilføje ny tekst til terminalen med fade-in-animation
    function addTextToTerminal(text, color) {
        var newContent;
        if (!firstMessageAdded) { // Hvis det er den første besked
            newContent = "<div style='animation: fadeIn 0.5s ease forwards;'><span style='color: " + color + ";'>root@xkow.xyz:~# " + text + "</span></div>";
            firstMessageAdded = true; // Angiv flag til true, så vi ved, at den første besked er blevet tilføjet
        } else {
            newContent = "<div style='animation: fadeIn 0.5s ease forwards;'>root@xkow.xyz:~# " + text + "</div>"; // Hvis det ikke er den første besked, tilføj uden ekstra stilarter
        }
        terminalContent.insertAdjacentHTML('beforeend', newContent);

        // Opdater antallet af linjer i terminalen
        var lines = terminalContent.children.length;

        // Hvis antallet af linjer overskrider maxLines
        if (lines > maxLines) {
            // Fjern overskydende linjer
            var excessLines = lines - maxLines;
            for (var i = 0; i < excessLines; i++) {
                terminalContent.removeChild(terminalContent.children[0]);
            }
        }
    }

    // Funktion til at håndtere kommandoer
    function handleCommand(inputText) {
        // Håndter "help" kommando
        if (inputText.toLowerCase() === "help") {
            return "help\n\nwelcome to the xkow.xyz command center\n\ncommands:\n  help          shows this menu\n  clear         clears the terminal\n  ipconfig      shows your ip\n  whyamihere    answers all your questions\n  github        directs you to the person who made this";
        } else if (inputText.toLowerCase() === "clear") {
            // Tøm indholdet af terminalen
            terminalContent.innerHTML = "Terminal Cleared";
            firstMessageAdded = false; // Nulstil flagget for den første besked
            return ""; // Returner tom streng, da der ikke skal tilføjes tekst til terminalen
        } else if (inputText.toLowerCase() === "whyamihere") {
            return "whyamihere\n\nyou're on this page be  cause you tried to access something that you didn't have the right permission to";
        } else if (inputText.toLowerCase() === "github") {
            window.open("https://github.com/xkow", "_blank");
            return "github\n\ngithub/xkow";        
        } else if (inputText.toLowerCase() === "ipconfig") {
            // Implementer funktionen til at hente IP-adressen her
            // Her er et eksempel på, hvordan du kan gøre det med JavaScript fetch API
            fetch('https://api.ipify.org?format=json')
                .then(response => response.json())
                .then(data => {
                    addTextToTerminal("ipconfig\n" + data.ip, "white");
                });
            // Returner tom streng, da der ikke skal tilføjes tekst til terminalen endnu
            return "";
        } else if (inputText.toLowerCase() === "hej") {
            return "hej";
        } else {
            // Hvis det ikke er en kendt kommando, returner den oprindelige inputtekst
            return inputText;
        }
    }

    // Fokuser input-linjen, når DOM'en er blevet fuldt indlæst
    inputLine.focus();

    // Tilføj initialbesked til terminalen ved indlæsningstidspunktet
    addTextToTerminal("Error 403: You don't have access to this page!", "red");
    addTextToTerminal("Type 'help' for more information.");

    // Lyt efter tastaturhændelser på input-linjen
    inputLine.addEventListener("keydown", function(event) {
        // Hvis Enter-tasten trykkes
        if (event.key === "Enter") {
            // Få teksten fra input-linjen
            var inputText = inputLine.textContent.trim();
            // Ryd input-linjen
            inputLine.textContent = "";
            // Forhindre standard opførsel af Enter-tasten
            event.preventDefault();
            // Behandle kommando med forsinkelse på 0.2 sekunder
            setTimeout(function() {
                var commandOutput = handleCommand(inputText);
                if (commandOutput !== "") {
                    // Hvis kommandoen ikke returnerer en tom streng, tilføj outputtet til terminalen
                    addTextToTerminal(commandOutput, "white");
                }
            }, 200);
        }
    });

    // Lyt efter tastaturhændelser på dokumentniveauet
    document.addEventListener("keydown", function(event) {
        // Fokusér input-linjen når der trykkes på en tast
        inputLine.focus();
    });
});
