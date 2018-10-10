    // ==UserScript==
    // @name         TTTL
    // @namespace    io.github.awittyusername
    // @version      1.0
    // @description  Moves the twitch chat window a bit to the left
    // @author       Wesley :D
    // @include      https://www.twitch.tv/*
    // @run-at       document-end
    // ==/UserScript==

    TTTL = {}
    TTTL.chatWindowPosition = function(){
        var chatWindowElement = document.getElementsByClassName('tw-absolute tw-align-items-end tw-bottom-0 tw-flex tw-flex-row-reverse tw-left-0 whispers-open-threads');
        if(chatWindowElement.length >= 1) {
            chatWindowElement[0].className = "tw-absolute tw-align-items-end tw-bottom-0 tw-flex tw-flex-row tw-left-0 whispers-open-threads";
        }
        chatWindowElement = null;
    };

    document.body.addEventListener("click",TTTL.chatWindowPosition);
