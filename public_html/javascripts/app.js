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

        this.items.$addChildNodeBtn.click(this.onAddChildNodeClick);
        this.items.$editNodeBtn.click(this.onEditNodeClick);
        this.items.$deleteNodeBtn.click(this.onDeleteNodeClick);
        
        var options = {
            onNodeSelected: App.onNodeSelected
        }
        this.items.$tree.treeview(options);
        
        GlobalMediator.subscribe( 'refreshTree', this.refreshTree);

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
    },
    
    onAddChildNodeClick: function()
    {
        GlobalMediator.publish('addChildNode', App.selectedNode, App.items.$nodeText.val());
    },
    
    onEditNodeClick: function()
    {
        GlobalMediator.publish('editNode', App.selectedNode, App.items.$nodeText.val());
    },
    
    onDeleteNodeClick: function()
    {
        GlobalMediator.publish('deleteNode', App.selectedNode);
    }
};