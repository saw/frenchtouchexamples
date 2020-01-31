({
    handleRefresh : function(component, event, helper) {
        var id = event.getParam('id');
        var workspaceAPI = component.find("workspace");
        workspaceAPI.openTab({
            url: '#/sObject/'+id+'/view',
            focus: true
        });
    },
    handleClick: function (cmp, evt, helper) {
        alert('yay');
    }
})
