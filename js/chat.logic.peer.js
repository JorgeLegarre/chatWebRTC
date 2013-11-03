/*jslint browser:true */
/*global $: false, chat:false, Peer:false,alert: false, confirm: false, console: false, Debug: false, opera: false, prompt: false, WSH: false */
chat.logic.peer = (function () {
    "use strict";
    //PRIVATE AREA
    var users = {}, peer,
        conn = [],

        sendUserToRemote = function (conne) {
            var sendPackage = new chat.model.Package(chat.model.USER, [chat.ui.getUserName()]);
            conne.send(JSON.stringify(sendPackage));
        },
        disconnectFromRemote = function () {
            conn.close();
            chat.ui.setStatusDisconnected();
            chat.ui.log("Connection closed - " + conn.peer);
        },
        setConnectionEvents = function () {
            //declaration of the events of the connection

            //onOpen - We have stablized connection
            conn.on('open', function () {
                chat.ui.log("Connection established - " + conn.peer);

                //when we open a conn, we want to send the userName to the remote
                sendUserToRemote(conn);

                chat.ui.setStatusConnected();
            });

            //onData - We have received some information from a remote peer
            conn.on('data', function (data) {
                var receivedPackage, remoteValue;

                receivedPackage = JSON.parse(data);
                remoteValue = receivedPackage.value[0];

                switch (receivedPackage.type) {
                case chat.model.TEXT:

                    chat.ui.writeOtherMsg(users[conn.peer], remoteValue);
                    break;

                case chat.model.USER: //we receive the userName of this conection
                    users[conn.peer] = remoteValue;
                    chat.ui.chatLog("Connection established with " + remoteValue);

                    break;
                }
            });

            //onClose - connection from the remote peer is close
            conn.on('close', function () {
                disconnectFromRemote();
                chat.ui.chatLog("Connection with " + users[conn.peer] + " is disconnected");

                //we remove the user from the users object
                delete users[conn.peer];

            });

            //onError
            conn.on('error', function (err) {
                chat.ui.log('Connect ERROR');
                chat.ui.showAlert('Connect error: ' + err.message);
            });
        },
        setPeerEvents = function () {
            //declaration of the events of the peer

            //we have connection with the server amd we obtain the id that identifies us to the world (another peers that want to connect us)
            peer.on('open', function (id) {
                chat.ui.log('Peer OPEN - My peer ID is: ' + id);
                chat.ui.setPeerId(id);

                //activate/desactivate controls over the page to be in disconnect status
                chat.ui.setStatusDisconnected();
            });

            //We listen to entry connections
            peer.on('connection', function (conne) {
                conn = conne;

                //we prepare the events for the connection
                setConnectionEvents();
            });

            //we have lost peer connection
            peer.on('close', function () {
                //update id code to ---
                chat.ui.setPeerId("Lost peer connection. Refresh page to obtain a new one.");

                //we dissable all elements(not usernameButton), it's going to be event open of peer the one that activate controls if we had exit
                chat.ui.disableButtons();

            });

            //onError
            peer.on('error', function (err) {
                chat.ui.log('Peer ERROR');
                console.dir(err);
                chat.ui.setStatusError();
                chat.ui.showAlert('Peer error: ' + err.message);
                chat.ui.setStatusDisconnected();
            });
        },
        freePeer = function () {
            if (peer !== undefined && !peer.destroyed) {
                peer.destroy();
            }
        },
        getPeer = function () {
            chat.ui.setStatusGettingPeer();

            //Destroy any previus peer connection to clean all possibilities
            freePeer();

            //creation of the local peer, we use our personal key_code obtained in the registration in peerJs.com
            peer = new Peer({
                key: chat.config.KEY_PEERJS
            });

            setPeerEvents();
        },
        connectToRemote = function (remotePeerId) {
            if (remotePeerId !== "") {
                chat.ui.setStatusConnecting();

                if (peer.open === true) {
                    conn = peer.connect(remotePeerId, {
                        label: 'chat',
                        serialization: 'none',
                        reliable: false
                    });

                    setConnectionEvents();
                } else {
                    chat.ui.showAlert("Peer connection is lost.\n" +
                        "A new peer connection is going to be renewed automatically.\n" +
                        "Please try to connect again after the new one is obtained.");
                    getPeer();
                }
            }
        },
        sendText = function (textSend) {
            var sendPackage = new chat.model.Package(chat.model.TEXT, [textSend]);
            conn.send(JSON.stringify(sendPackage));

        };
    //PUBLIC AREA
    return {
        connectToRemote: connectToRemote,
        disconnectFromRemote: disconnectFromRemote,
        getPeer: getPeer,
        freePeer: freePeer,
        sendText: sendText
    };
}());