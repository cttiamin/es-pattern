
/***********************************************
 * 权威指南 => 18-15 基于服务器端推送事件的Comet技术
 * 例 18-15: 一个使用EventSource的简易聊天客户端
 */
window.onload = function () {
    // Take care of some UI details
    var nick = prompt("Enter your nickname");     // Get user's nickname
    var input = document.getElementById("input"); // Find the input field
    input.focus();                                // Set keyboard focus

    // Register for notification of new messages using EventSource
    var chat = new EventSource("/chat");
    chat.onmessage = function (event) {            
        // When a new message arrives
        var msg = event.data;                   // Get text from event object
        var node = document.createTextNode(msg);  // Make it into a text node
        var div = document.createElement("div");  // Create a <div>
        div.appendChild(node);                    // Add text node to div
        document.body.insertBefore(div, input);   // And add div before input
        input.scrollIntoView();                   
        // Ensure input elt is visible
    }

    // Post the user's messages to the server using XMLHttpRequest
    input.onchange = function () {           // When user strikes return
        var msg = nick + ": " + input.value; // Username plus user's input
        var xhr = new XMLHttpRequest();           // Create a new XHR
        xhr.open("POST", "/chat");                // to POST to /chat.
        xhr.setRequestHeader("Content-Type",      // Specify plain UTF-8 text
                "text/plain;charset=UTF-8");
        xhr.send(msg);                            // Send the message
        input.value = "";                // Get ready for more input
    }
};

/**
 *  例18-6:用XMLHttpRequest模拟EventSource
 * Emulate the EventSource API for browsers that do not support it.
 * Requires an XMLHttpRequest that sends readystatechange events whenever
 * there is new data written to a long-lived HTTP connection. Note that
 * this is not a complete implementation of the API: it does not support the
 * readyState property, the close() method, nor the open and error events.
 * Also event registration for message events is through the onmessage
 * property only--this version does not define an addEventListener method.
 */
if (window.EventSource === undefined) {     // If EventSource is not defined,
    window.EventSource = function (url) {    // emulate it like this.
        var xhr;                        // Our HTTP connection...
        var evtsrc = this;              // Used in the event handlers.
        var charsReceived = 0;          // So we can tell what is new.
        var type = null;                // To check property response type.
        var data = "";                  // Holds message data
        var eventName = "message";      // The type field of our event objects
        var lastEventId = "";           // For resyncing with the server
        var retrydelay = 1000;          // Delay between connection attempts
        var aborted = false;            // Set true to give up on connecting

        // Create an XHR object
        xhr = new XMLHttpRequest();

        // Define an event handler for it
        xhr.onreadystatechange = function () {
            switch (xhr.readyState) {
                case 3:
                    processData();
                    break;   // When a chunk of data arrives
                case 4:
                    reconnect();
                    break;     // When the request closes
            }
        };

        // And establish a long-lived connection through it
        connect();

        // If the connection closes normally, wait a second and try to restart
        function reconnect() {
            if (aborted) return;             // Don't reconnect after an abort
            if (xhr.status >= 300) return;   // Don't reconnect after an error
            setTimeout(connect, retrydelay); // Wait a bit, then reconnect
        };

        // This is how we establish a connection
        function connect() {
            charsReceived = 0;
            type = null;
            xhr.open("GET", url);
            xhr.setRequestHeader("Cache-Control", "no-cache");
            if (lastEventId) xhr.setRequestHeader("Last-Event-ID", lastEventId);
            xhr.send();
        }

        // Each time data arrives, process it and trigger the onmessage handler
        // This function handles the details of the Server-Sent Events protocol
        function processData() {
            if (!type) {   // Check the response type if we haven't already
                type = xhr.getResponseHeader('Content-Type');
                if (type !== "text/event-stream") {
                    aborted = true;
                    xhr.abort();
                    return;
                }
            }
            // Keep track of how much we've received and get only the
            // portion of the response that we haven't already processed.
            var chunk = xhr.responseText.substring(charsReceived);
            charsReceived = xhr.responseText.length;

            // Break the chunk of text into lines and iterate over them.
            var lines = chunk.replace(/(\r\n|\r|\n)$/, "").split(/\r\n|\r|\n/);
            for (var i = 0; i < lines.length; i++) {
                var line = lines[i], pos = line.indexOf(":"), name, value = "";
                if (pos == 0) continue;               // Ignore comments
                if (pos > 0) {                        // field name:value
                    name = line.substring(0, pos);
                    value = line.substring(pos + 1);
                    if (value.charAt(0) == " ") value = value.substring(1);
                }
                else name = line;                     // field name only

                switch (name) {
                    case "event":
                        eventName = value;
                        break;
                    case "data":
                        data += value + "\n";
                        break;
                    case "id":
                        lastEventId = value;
                        break;
                    case "retry":
                        retrydelay = parseInt(value) || 1000;
                        break;
                    default:
                        break;  // Ignore any other line
                }

                if (line === "") {  // A blank line means send the event
                    if (evtsrc.onmessage && data !== "") {
                        // Chop trailing newline if there is one
                        if (data.charAt(data.length - 1) == "\n")
                            data = data.substring(0, data.length - 1);
                        evtsrc.onmessage({    // This is a fake Event object
                            type: eventName,  // event type
                            data: data,       // event data
                            origin: url       // the origin of the data
                        });
                    }
                    data = "";
                    continue;
                }
            }
        }
    };
}

/**
 * 例18-17: 定制的Server-Sent Events 聊天服务器
 * Node JS code.
 */

