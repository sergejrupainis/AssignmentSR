var TreeController = TreeController || 
{
    lastId: 3,
    
    treeData: [
        {id: 0, text: "Parent 0"},
        {id: 1, text: "Parent 1"},
        {id: 2, text: "Parent 2"}
    ],
    
    init: function()
    {
        App.mediator.subscribe( 'addChildNode', this.addChildNode);
        App.mediator.subscribe( 'editNode', this.editNode);
        App.mediator.subscribe( 'deleteNode', this.deleteNode);
        
        this.refreshTree();
    },
    
    addChildNode: function(parentNode, text)
    {
        var self = TreeController;
        
        if(parentNode === null)
        {
            self.treeData.push({id: self.lastId++, text: text});
        }else
        {
            var node = self.findNodeById(self.treeData, parentNode.id);
            if(node !== null)
            {
                if(typeof node.nodes === 'undefined')
                {
                    node.nodes = [];
                }
                
                node.nodes.push({id: self.lastId++, text: text});
            }
        }
        
        self.refreshTree();
    },
    
    editNode: function(node, text)
    {
        if(node === null) return;
        
        var self = TreeController;
        
        var treeNode = self.findNodeById(self.treeData, node.id);
        if(treeNode === null) return;
        
        treeNode.text = text;
        
        self.refreshTree();
    },
    
    deleteNode: function(node)
    {
        if(node === null) return;
        
        var treeNode = TreeController.findNodeById(TreeController.treeData, node.id);
        
        
    },
    
    ///
    findNodeById: function(data, id) {
        for(var i = data.length; i >= 0; i--){
            if(typeof data[i] !== 'undefined')
            {
                if(data[i].id === id){
                    return data[i];
                }
                
                if(typeof data[i].nodes !== 'undefined')
                {
                    if(data[i].nodes.length > 0){
                        return TreeController.findKey(data[i].nodes, id);
                    }
                }
            }
        }
        
        return null;
    },
    
    refreshTree: function()
    {
        App.mediator.publish('refreshTree', TreeController.treeData);
    }
};