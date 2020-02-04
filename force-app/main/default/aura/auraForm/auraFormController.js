({
    myAction : function(component, event, helper) {

    },

    handleChange: function(cmp, evt, helper) {
        cmp.set('v.showSection', evt.getParam('checked'));
    }
})
