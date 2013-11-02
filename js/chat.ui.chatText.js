/*jslint browser:true */
/*global $: false, chat:false,alert: false, confirm: false, console: false, Debug: false, opera: false, prompt: false, WSH: false */
chat.ui.chatText = (function () {
    "use strict";
    //privada
    var writeMsg = function (userName, msg, className) {
        var user = (userName !== "") ? userName + ": " : "",
            name = $("<span>").addClass("chatName").text(user),
            newLine = $("<div>").addClass(className).text(msg).prepend(name);

        $("#chatText").append(newLine);

        //posicionar scroll abajo
        $('#chatText').scrollTop($('#chatText')[0].scrollHeight);
    },

        writeOtherMsg = function (userName, msg) {
            writeMsg(userName, msg, "chatLineOther");
        },

        writeOwnMsg = function (msg) {
            writeMsg("You", msg, "chatLineMe");
        },
        chatLog = function (msg) {
            writeMsg("", msg, "chatLog");
        },

        getChatText = function () {
            return $("#textSend").val().trim();
        },

        setChatText = function (txt) {
            $("#textSend").val(txt);
        };

    //publica
    return {
        writeOtherMsg: writeOtherMsg,
        writeOwnMsg: writeOwnMsg,
        chatLog: chatLog,
        getChatText: getChatText,
        setChatText: setChatText
    };
}());