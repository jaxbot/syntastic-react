#!/usr/bin/env node
var child_process = require("child_process");
var exec = child_process.exec, spawn = child_process.spawn;

// Syntastic will use this to check if the JSXHint checker is available
// Pretend to exist, but leave a note for the users
if (process.argv[2] == "--version") {
        console.log("JSXHint v0.8.3 (2.5) (Impersonating -- This is a drop-in replacement for JSXHint by Jonathan Warner, not the real deal.");
        process.exit();
}

// Run the JSX transformer
exec("jsx " + process.argv[3], function(err, stdout, stderr) {
        // If any errors were found (multiple lines spit out, by default 1 is sent to stderr for each module built),
        // parse the JSX output and convert it into a JSHint format
        if (stderr.split("\n").length > 2) {
                var regex = /Error: (.*)/g;
                var count = 0;
                while ((results = regex.exec(stderr)) !== null) {
                        var line = results[1].match(/Line (\d+)/);
                        if (line)
                                line = line[1];
                        console.log(process.argv[3] + ": line " + line + ", col 1, " + results[1] + ". (E030)");
                        count++;
                }
                console.log("\n" + count + " errors");
        // Otherwise, just run JSHint and pipe it back out
        } else {
                var data = "";
                var jshint = spawn("jshint", ["/dev/stdin", "--verbose", "--filename", "butts"]);
                jshint.stdin.setEncoding = 'utf-8';
                jshint.stdout.on("data", function(chunk) {
                        data += chunk;
                });
                jshint.stdout.on("end", function() {
                        // We have to give it the correct filename
                        // JSHint will define it as "/dev/stdin", which will confuse Syntastic
                        data = data.replace(/\/dev\/stdin/g, process.argv[3]);
                        console.log(data);
                });
                // Send the compiled JSX output to JSHint
                jshint.stdin.write(stdout);
                jshint.stdin.end();
        }
});

