/*jslint browser:true */
/*global $: false, chat:false, alert: false, confirm: false, console: false, Debug: false, opera: false, prompt: false, WSH: false */
chat.logic = (function () {
    "use strict";
    //PRIVATE AREA
    var connectToRemote = function (remotePeerId) {
        chat.logic.peer.connectToRemote(remotePeerId);
    },

        disconnectFromRemote = function () {
            chat.logic.peer.disconnectFromRemote();
        },

        getPeer = function () {
            chat.logic.peer.getPeer();
        },

        freePeer = function () {
            chat.logic.peer.freePeer();
        },

        sendText = function (textSend) {
            chat.logic.peer.sendText(textSend);

        },

        loginUser = function (userName) {
            localStorage.username = userName;

            location.reload();
        },

        loadUser = function () {
            //if we dont have a saved username, show the login div
            if (localStorage.username === undefined) {
                chat.ui.showLogin();
            } else {
                chat.ui.showChat();
                chat.ui.setUserName(localStorage.username);
            }
        },

        init = function () {
            getPeer();
            chat.ui.events.initEvents();
            loadUser();
        };
    //PUBLIC AREA
    return {
        connectToRemote: connectToRemote,
        disconnectFromRemote: disconnectFromRemote,
        getPeer: getPeer,
        freePeer: freePeer,
        sendText: sendText,
        loginUser: loginUser,
        loadUser: loadUser,
        init: init
    };
}());