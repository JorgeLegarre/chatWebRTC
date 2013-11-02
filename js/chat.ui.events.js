/*jslint browser:true */
/*global $: false, chat:false, alert: false, confirm: false, console: false, Debug: false, opera: false, prompt: false, WSH: false */
chat.ui.events = (function () {
    "use strict";
    //PRIVATE AREA
    var connectToRemote = function () {
        var remotePeerId = chat.ui.getRemoteId();
        if (remotePeerId !== "") {
            chat.logic.connectToRemote(remotePeerId);
        }
    },
        connectEvent = function () {
            //we prepare the event click over button connect
            $("#connect").click(function () {
                connectToRemote();
            });

            //we prepare the event keypress=intro over the idHost inputText
            $("#idHost").keypress(function (e) {
                //if is enter
                if (e.which === 13) {
                    connectToRemote();
                }
            });
        },
        disconnectEvent = function () {
            $("#disconnect").click(function () {
                chat.logic.disconnectFromRemote();
            });

        },
        sendMsg = function () {
            var textSend = chat.ui.getChatText();

            if (textSend !== "") {
                chat.ui.writeOwnMsg(textSend);

                chat.logic.sendText(textSend);

                chat.ui.setChatText("");
            }
        },
        sendMsgEvent = function () {
            //declaration of the event click on the button send
            $("#send").click(function () {
                sendMsg();
            });

            //we send text when press "enter" over the text box
            $("#textSend").keypress(function (e) {
                //if is enter
                if (e.which === 13) {
                    sendMsg();
                }
            });
        },
        closeReloadWindowEvent = function () {
            $(window).on('unload', function () {
                chat.logic.freePeer();
            });
            $(window).on('beforeunload', function () {
                chat.logic.freePeer();
            });
        },
        loginEvent = function () {
            //when login button is pressed, we save the user and reload the page
            $("#loginButton").click(function () {
                chat.logic.loginUser($("#username").val());
            });
            //if user press enter in textbox
            $("#username").keypress(function (e) {
                //if is enter
                if (e.which === 13) {
                    chat.logic.loginUser($("#username").val());
                }
            });
        },
        changeUserEvent = function () {
            //if the user want change the user, we toggle the divs chat and login
            $("#usernameButton").click(function () {
                chat.ui.showLogin();
            });
        },
        chatClickedEvent = function () {
            $("#chatWindow").click(function () {
                $("#textSend").focus();
            });
        },
        initEvents = function () {
            //connect button
            connectEvent();

            //disconnect button
            disconnectEvent();

            //send Msg button
            sendMsgEvent();

            //windows is close or reload
            closeReloadWindowEvent();

            //login view --> login button
            loginEvent();

            //chat view --> change user button
            changeUserEvent();

            //chat clicked
            chatClickedEvent();
        };

    //PUBLIC AREA
    return {
        initEvents: initEvents
    };
}());