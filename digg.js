function postDigg(ftype,aid)
{
	var taget_obj = document.getElementById('newdigg');
	var saveid = GetCookie('diggid');
	if(saveid != null)
	{
		var saveids = saveid.split(',');
		var hasid = false;
		saveid = '';
		j = 1;
		for(i=saveids.length-1;i>=0;i--)
		{
			if(saveids[i]==aid && hasid) continue;
			else {
				if(saveids[i]==aid && !hasid) hasid = true;
				saveid += (saveid=='' ? saveids[i] : ','+saveids[i]);
				j++;
				if(j==20 && hasid) break;
				if(j==19 && !hasid) break;
			}
		}
		if(hasid) { $(".goodup_do").addClass("goodup_do_d");$(".baddown_do").addClass("baddown_do_d");return; }
		else saveid += ','+aid;
		SetCookie('diggid',saveid,1);	
	}
	else
	{
		SetCookie('diggid',aid,1);
	}
	myajax = new DedeAjax(taget_obj,false,false,'','','');
	var url = "http://www.phtheme.com/plus/digg_ajax.php?action="+ftype+"&id="+aid;
	myajax.SendGet2(url);
}
function getDigg(aid)
{
	var taget_obj = document.getElementById('newdigg');
	myajax = new DedeAjax(taget_obj,false,false,'','','');
	myajax.SendGet2("http://www.phtheme.com/plus/digg_ajax.php?id="+aid);
	DedeXHTTP = null;
}
