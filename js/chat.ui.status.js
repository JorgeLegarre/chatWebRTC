/*jslint browser:true */
/*global $: false, chat:false,alert: false, confirm: false, console: false, Debug: false, opera: false, prompt: false, WSH: false */
chat.ui.status = (function () {
    "use strict";
    //private
    var connectingInterval,
        setStatusGettingPeer = function () {
            $("#status").text("GETTING PEER...");
            $("#myId").text("GETTING PEER...");

            //we dissable all elements(not usernameButton), it's going to be even open of peer the one that activate controls if we had exit
            $("#chat input").not("#usernameButton").attr("disabled", "disabled");
        },

        setStatusConnected = function () {
            $("#status").text("CONNECTED");

            $("#idHost").attr("disabled", "disabled");
            $("#connect").attr("disabled", "disabled");
            $("#disconnect").removeAttr("disabled");

            $("#textSend").removeAttr("disabled");
            $("#send").removeAttr("disabled");

            $("#textSend").focus();
        },

        setStatusDisconnected = function () {
            $("#status").text("DISCONNECTED");

            $("#idHost").removeAttr("disabled");
            $("#connect").removeAttr("disabled");
            $("#disconnect").attr("disabled", "disabled");

            $("#textSend").attr("disabled", "disabled");
            $("#textSend").val("");
            $("#send").attr("disabled", "disabled");

            $("#idHost").focus();
        },

        setStatusConnecting = function (isConOpen) {
            setStatusConnected();
            $("#status").text("CONNECTING...");

            //we wait 10 seconds to connect, if not, we set status disconnect. 
            //Events in connection not return nothing, so it's not possible to know when the connection trial end.
            connectingInterval = setInterval(function () {
                clearInterval(connectingInterval);
                if (isConOpen === false) {
                    setStatusDisconnected();
                }
            }, 10000);
        },

        setStatusError = function () {
            clearInterval(connectingInterval);
            $("#status").text("ERROR");
        };

    //public
    return {
        setStatusGettingPeer: setStatusGettingPeer,
        setStatusConnected: setStatusConnected,
        setStatusDisconnected: setStatusDisconnected,
        setStatusConnecting: setStatusConnecting,
        setStatusError: setStatusError
    };
}());