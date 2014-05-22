var State = State || 
{
    isAvailable: function()
    {
        var test = 'test';
        try {
          localStorage.setItem(test, test);
          localStorage.removeItem(test);
          return true;
        } catch(e) {
          return false;
        }
    },
    
    saveState: function(data)
    {
        localStorage.state = data;
    },
    
    getState: function()
    {
        return localStorage.state;
    }
};

