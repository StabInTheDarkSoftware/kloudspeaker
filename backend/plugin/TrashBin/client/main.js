define(['kloudspeaker/plugins', 'kloudspeaker/events', 'kloudspeaker/session', 'kloudspeaker/ui/views', 'kloudspeaker/trashbin/fileview'], function(plugins, events, session, views, TrashBinFileView) {
    var that = this;
    var softDelete = false;
    var initialized = false;
    var initialize = function() {
        if (initialized) return;
        initialized = true;

        var s = session.get();
        _softDelete = (s && s.plugins["TrashBin"] && s.data.plugins["TrashBin"]["soft_delete"]);
    };
    events.addEventHandler(initialize, "session/start");

    views.registerFileViewHandler(new TrashBinFileView({
        isSoftDelete : function() { return _softDelete; }
    }));

    plugins.register({
        id: "plugin-trashbin",
        backendPluginId: "TrashBin",
        initialize: function() {
            if (session.get()) initialize();
        },
        resources: {
            texts: true,
            css: true
        }
    });
});
