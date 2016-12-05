angular.module('starter').service('logService', function() {

    var logs = [];
    var listeners = [];

    window.onerror = function(message, url, lineNumber) {

        log(message, {
            url: url,
            lineNumber: lineNumber
        });
        //save error and send to server for example.
        return true;
    };

    return {
        log: log,
        logs: logs,
        listen: listen
    };

    // add log to the list, then call all the listeners
    function log(msg, obj) {
        if (obj)
            console.log(msg, obj);
        else
            console.log(msg);

        logs.push({
            msg: msg,
            object: obj
        })

        // let everyone know the log has been updated
        angular.forEach(listeners, function(listener) {
            listener(logs);
        });
    }

    // add a function to the listeners list
    function listen(fn) {
        listeners.push(fn);
    }
})