// Make sure ChiliPeppr is ready to run and fully instantiated
// including all of its dependencies like jquery, bootstrap, etc.
cprequire(["chilipeppr_ready"], function () {

    // Element / Flash Message
    // http://jsfiddle.net/jlauer/qp7Em/
    // "inline:com-chilipeppr-elem-flashmsg"
    chilipeppr.load("#com-chilipeppr-flash",
        "http://raw.githubusercontent.com/chilipeppr/element-flash/master/auto-generated-widget.html",
        // "http://fiddle.jshell.net/chilipeppr/90698kax/show/light/",

    function () {
        console.log("mycallback got called after loading flash msg module");
        console.log(chilipeppr);
        require(["inline:com-chilipeppr-elem-flashmsg"], function (fm) {
            //console.log("inside require of " + fm.id);
            fm.init();
            //console.log(fm.publish);
            //chilipeppr.publish(fm.subscribe, "Loaded", "The ChiliPeppr Hardware Fiddle main app is loaded.");
            //chilipeppr.publish(fm.subscribe, "", "The ChiliPeppr Hardware Fiddle main app is loaded.");
            //chilipeppr.publish(fm.subscribe, "", "Third time is a charm");
            //console.log(fm);
            
            // Panel / Header
            //http://jsfiddle.net/chilipeppr/7aX6x/
            chilipeppr.load(
                "#pnlHeader",
                "http://raw.githubusercontent.com/chilipeppr/element-panelheader/master/auto-generated-widget.html",
                // "http://fiddle.jshell.net/chilipeppr/7aX6x/show/light/",
        
            function () {
                //setTimeout(function() {
                cprequire(
                ["inline:com-chilipeppr-hdr"],
        
                function (hdr) {
                    console.log("running of " + hdr.id);
                    hdr.init();
                    
                    // LOAD THE WORKSPACE NOW
                    // Now analyze the window.location URL and load the base boot Javascript
                    // for this particular url from the data storage
                    console.log("window.location", window.location.pathname);
                    var path = window.location.pathname;
                    if (path == "/_display/") {
                        // we're inside jsfiddle, so pretend root
                        path = "";
                    } else {
                        path = path.replace(/^\//, "");
                        path = path.replace(/\/$/, "");
                    }
                    console.log("path of this workspace:", path);
                    var jqxhr = $.getJSON("http://www.chilipeppr.com/dataget?key=userUrl:" + path + "&callback=?")
                    .done(function (data) {
                        console.log("got jsnop callback", data);
                        if (data.KeyExists != undefined && data.KeyExists == false) {
                            console.log("this is a url that doesn't exist. show modal to define page.");
                            //chilipeppr.publish("/com-chilipeppr-elem-flashmsg/flashmsg", "No Workspace Exists Here", "You can go ahead and create a workspace here.");
                            $('#pnlWorkspace').text("No workspace exists at \"" + path + "\", therefore you may use it by clicking Edit Boot Javascript from the upper right corner menu.");
                            // Load the edit boot dialog
                            //cprequire(["inline:com-chilipeppr-hdr"], function(hdr) {
                                hdr.editBoot();
                            //});
                            
                        } else if (data.Error && data.Error == true) {
                            //chilipeppr.publish("/com-chilipeppr-elem-flashmsg/flashmsg", "Error Retrieving Workspace", data.Msg);
                            $('#pnlWorkspace').text("Error retrieving workspace. " + data.Msg);
                            
                        } else {
                            
                            var p = path;
                            if (p == "") p = "(Default)";
                            $('#pnlWorkspace').text("Loading the workspace for path " + p + "...");
                            chilipeppr.publish("/com-chilipeppr-elem-flashmsg/flashmsg", "Loading Workspace", "Loading the workspace for path " + p + "...");
                            eval(data.Value);
                        }
                    })
                    .fail(function (data) {
                        console.log("failed. data:", data);
                        $('#pnlWorkspace').text("Error retrieving workspace. " + JSON.stringify(data));
                
                    })
                    
                    
                });
                //}, 1000);
            });

        });
    });

    /*
    chilipeppr.load("pnlRtSidebar",
        "http://fiddle.jshell.net/jlauer/WXN8J/show/light/");
    */

});