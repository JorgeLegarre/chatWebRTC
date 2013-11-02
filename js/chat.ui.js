/*jslint browser:true */
/*global $: false, chat:false, alert: false, confirm: false, console: false, Debug: false, opera: false, prompt: false, WSH: false */
chat.ui = (function () {
    "use strict";
    //PRIVATE AREA

    //STATUS OPERATIONS
    var setStatusGettingPeer = function () {
        chat.ui.status.setStatusGettingPeer();
    },

        setStatusConnected = function () {
            chat.ui.status.setStatusConnected();
        },

        setStatusDisconnected = function () {
            chat.ui.status.setStatusDisconnected();
        },

        setStatusConnecting = function (isConOpen) {
            chat.ui.status.setStatusConnecting(isConOpen);
        },

        setStatusError = function () {
            chat.ui.status.setStatusError();
        },

        //UI RELATED WITH CHAT WINDOW
        chatLog = function (msg) {
            chat.ui.chatText.chatLog(msg);
        },

        getChatText = function () {
            return chat.ui.chatText.getChatText();
        },

        setChatText = function (txt) {
            chat.ui.chatText.setChatText(txt);
        },

        writeOtherMsg = function (userName, msg) {
            chat.ui.chatText.writeOtherMsg(userName, msg);
        },

        writeOwnMsg = function (msg) {
            chat.ui.chatText.writeOwnMsg(msg);
        },

        //GENERAL UI
        //log & alerts
        log = function (msg) {
            console.log(msg);
        },

        showAlert = function (msg) {
            alert(msg);
        },

        //ENABLE/DISABlE, SHOW/HIDE parts
        disableButtons = function () {
            $("#chat input").not("#usernameButton").attr("disabled", "disabled");
        },

        showChat = function () {
            $("#chat").show();
            $("#login").hide();
        },

        showLogin = function () {
            $("#chat").hide();
            $("#login").show();
        },

        //Get/set values in elements
        setPeerId = function (id) {
            $("#myId").text(id);
        },

        getRemoteId = function () {
            return $("#idHost").val().trim();
        },

        setUserName = function (userName) {
            $("#user").text(userName);
        },

        getUserName = function () {
            return $("#user").text();
        };

    //PUBLIC AREA
    return {
        //status
        setStatusGettingPeer: setStatusGettingPeer,
        setStatusConnected: setStatusConnected,
        setStatusDisconnected: setStatusDisconnected,
        setStatusConnecting: setStatusConnecting,
        setStatusError: setStatusError,
        //chat text
        chatLog: chatLog,
        getChatText: getChatText,
        setChatText: setChatText,
        writeOtherMsg: writeOtherMsg,
        writeOwnMsg: writeOwnMsg,
        //log & alerts
        log: log,
        showAlert: showAlert,
        //enable/disable & show/hide
        disableButtons: disableButtons,
        showChat: showChat,
        showLogin: showLogin,
        //get/set
        setPeerId: setPeerId,
        getRemoteId: getRemoteId,
        setUserName: setUserName,
        getUserName: getUserName
    };
}());