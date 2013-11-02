/*jslint browser:true */
/*global $: false, alert: false, chat: false,confirm: false, console: false, Debug: false, opera: false, prompt: false, WSH: false */
chat.model = (function () {
    "use strict";
    //private
    var Package = function (type, value) {
        this.type = type;
        this.value = value;
    };

    //public
    return {
        Package: Package,
        TEXT: "TEXT",
        USER: "USER"
    };
}());