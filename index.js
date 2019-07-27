const firstBossActions =
{
    1103: {msg: 'Head Slam! (Slow)'},   
    2103: {msg: 'Head Slam! (Fast)'},   
    2104: {msg: 'Spin get out (Fast)'}, 
    1104: {msg: 'Spin get out (Slow)'}, 
    1201: {msg: 'Body Slam!'},
    2105: {msg: 'Get in'},
    3104: {msg: 'SHIELD!'}
}

const secondBossActions =
{
    1104: {msg: 'Frontal Spin!'},
    2104: {msg: 'Frontal Spin!'}, 
    1110: {msg: 'Cyclone! (Slow)'},
    2110: {msg: 'Cyclone! (Fast)'},
    2102: {msg: 'Back Flip (Fast)'},
    1102: {msg: 'Back Flip (Slow)'},
    2105: {msg: 'Tail'}
};

const thirdBossActions = 
{
    1107: {msg: 'Back Hit! (Slow)'},
    2107: {msg: 'Back Hit! (Fast)'},
    1112: {msg: 'Jump (Slow)'},
    2112: {msg: 'Jump (Fast)'},
    3105: {msg: 'Get in'}, 
    3117: {msg: 'In Out In'},
    3110: {msg: 'Pizza mech'}
}; 

const firstBoss = 1000;
const secondBoss = 1001;
const thirdBoss = 1002;

module.exports = function BathysmalRiseGuide(mod)
{
    let hooks = [],
    enabled = true;

    mod.command.add(['br'],(arg) => {
        if(arg && arg.length > 0) arg = arg.toLowerCase();
        enabled = !enabled;
        mod.command.message(`Bathysmal Guide ${enabled ? 'Enabled' : 'Disabled'}`);
        if(!enabled) unload_guide();
    });
    
        mod.hook('S_LOAD_TOPO',3,(event) => {
        if(event.zone === 9054 && enabled)
        {
            mod.command.message('Welcome to Bathysmal Rise - Extreme Mode');
            load_guide();
        }
        else
        {
            unload_guide();
        }
    });
    
    function load_guide()
    {
        if(!hooks.length)
        {
            mod.hook('S_ACTION_STAGE',9,(event) => {
                if(!enabled) return;
                let skill = event.skill.id;
                switch(event.templateId)
                {   
                    case firstBoss:
                        if(firstBossActions[skill])
                        {
                            sendMessage(firstBossActions[skill].msg);
                        }
                    break;
                    case secondBoss:
                        if(secondBossActions[skill])
                        {
                            sendMessage(secondBossActions[skill].msg);
                        }
                    break;
                    case thirdBoss:      
                        if(thirdBossActions[skill])
                        {   
                            sendMessage(thirdBossActions[skill].msg);
                        }
                    break;
                }
            });
        }
 
    }
    function sendMessage(msg)
    {
            mod.send('S_CHAT',1,{
            channel: 21, 
            authorName: 'Guide',
            message: msg
        });
    }

    function unload_guide() 
    {
		if(hooks.length) {
			for(let h of hooks) mod.unhook(h)

			hooks = []
		}
	}

    function hook() 
    {
		hooks.push(mod.hook(...arguments))
	}
    
}