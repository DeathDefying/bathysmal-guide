const bossActions =
{
	1000: {
		1103: {msg: 'Head Slam! (Slow)'},
		2103: {msg: 'Head Slam! (Fast)'},
		2104: {msg: 'Spin get out (Fast)'}, 
		1104: {msg: 'Spin get out (Slow)'}, 
		1201: {msg: 'Body Slam!'},
		2105: {msg: 'Get in'},
		3104: {msg: 'SHIELD!'},
	},
	1001: {
		1104: {msg: 'Frontal Spin!'},
		2104: {msg: 'Frontal Spin!'}, 
		1110: {msg: 'Cyclone! (Slow)'},
		2110: {msg: 'Cyclone! (Fast)'},
		2102: {msg: 'Back Flip (Fast)'},
		1102: {msg: 'Back Flip (Slow)'},
		2105: {msg: 'Tail'},
	},
	1002: {
		1107: {msg: 'Back Hit! (Slow)'},
		2107: {msg: 'Back Hit! (Fast)'},
		1112: {msg: 'Jump (Slow)'},
		2112: {msg: 'Jump (Fast)'},
		3105: {msg: 'Get in'}, 
		3117: {msg: 'In Out In'},
		3110: {msg: 'Pizza mech'},
	}
}

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
	
	mod.game.me.on('change_zone', zone => {
		switch(zone)
		{
			case 9054:
				if(enabled)
				{
					load_guide();
					mod.command.message('Welcome to Bathysmal Rise - Extreme Mode');
				}
				break;
			default:
				unload_guide();
				break;
		}
	})
	
	function load_guide()
	{
		if(!hooks.length)
		{
			hook('S_ACTION_STAGE',9,(event) => {
				if(!enabled) return;
				let skill = event.skill.id;
				if(bossActions[event.templateId] && bossActions[event.templateId][skill]) sendMessage(bossActions[event.templateId][skill].msg);
			});
		}
 
	}
	function sendMessage(msg) {
		mod.send('S_CHAT', 1, {
			channel: 21,
			authorName: 'BRGuide',
			message: msg
		});
	}

	function unload_guide() {
		hooks.forEach(hook => mod.unhook(hook))
		hooks = []
	}

	function hook() {
		hooks.push(mod.hook(...arguments))
	}
	
}
