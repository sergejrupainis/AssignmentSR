var App = App || 
{
    selectedNode: null,
    
    init: function()
    {
        App.items = {
            $tree: $('#tree'),
            $nodeText: $('#nodeText'),
            $addChildNodeBtn: $('#addChildNodeBtn'),
            $editNodeBtn: $('#editNodeBtn'),
            $deleteNodeBtn: $('#deleteNodeBtn')
        };
        App.mediator = new Mediator();
        
        this.items.$addChildNodeBtn.click(this.onAddChildNodeClick);
        this.items.$editNodeBtn.click(this.onEditNodeClick);
        this.items.$deleteNodeBtn.click(this.onDeleteNodeClick);
        
        var options = {
            onNodeSelected: App.onNodeSelected
        }
        this.items.$tree.treeview(options);
        
        App.mediator.subscribe( 'refreshTree', this.refreshTree);

        TreeController.init();
    },
        
    refreshTree: function(treeData)
    {
        App.items.$tree.treeview({data: treeData});
    },
    
    //Events
    onNodeSelected: function(event, node)
    {
        App.selectedNode = node;
        App.items.$nodeText.val(node.text);
        console.log(node);
    },
    
    onAddChildNodeClick: function()
    {
        App.mediator.publish('addChildNode', App.selectedNode, App.items.$nodeText.val());
    },
    
    onEditNodeClick: function()
    {
        App.mediator.publish('editNode', App.selectedNode, App.items.$nodeText.val());
    },
    
    onDeleteNodeClick: function()
    {
        App.mediator.publish('deleteNode', App.selectedNode);
    }
};