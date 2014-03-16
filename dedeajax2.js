<!--
//xmlhttpå’Œxmldomå¯¹è±¡
var DedeXHTTP = null;
var DedeXDOM = null;
var DedeContainer = null;
var DedeShowError = false;
var DedeShowWait = false;
var DedeErrCon = "";
var DedeErrDisplay = "Download data failed";
var DedeWaitDisplay = "Loading date...";

//èŽ·å–æŒ‡å®šIDçš„å…ƒç´ 

function $DE(id) {
	return document.getElementById(id);
}

//gcontainer æ˜¯ä¿å­˜ä¸‹è½½å®Œæˆçš„å†…å®¹çš„å®¹å™¨
//mShowError æ˜¯å¦æç¤ºé”™è¯¯ä¿¡æ¯
//DedeShowWait æ˜¯å¦æç¤ºç­‰å¾…ä¿¡æ¯
//mErrCon æœåŠ¡å™¨è¿”å›žä»€ä¹ˆå­—ç¬¦ä¸²è§†ä¸ºé”™è¯¯
//mErrDisplay å‘ç”Ÿé”™è¯¯æ—¶æ˜¾ç¤ºçš„ä¿¡æ¯
//mWaitDisplay ç­‰å¾…æ—¶æç¤ºä¿¡æ¯
//é»˜è®¤è°ƒç”¨ DedeAjax('divid',false,false,'','','')

function DedeAjax(gcontainer,mShowError,mShowWait,mErrCon,mErrDisplay,mWaitDisplay)
{

	DedeContainer = gcontainer;
	DedeShowError = mShowError;
	DedeShowWait = mShowWait;
	if(mErrCon!="") DedeErrCon = mErrCon;
	if(mErrDisplay!="") DedeErrDisplay = mErrDisplay;
	if(mErrDisplay=="x") DedeErrDisplay = "";
	if(mWaitDisplay!="") DedeWaitDisplay = mWaitDisplay;


	//postæˆ–getå‘é€æ•°æ®çš„é”®å€¼å¯¹
	this.keys = Array();
	this.values = Array();
	this.keyCount = -1;
	this.sendlang = 'gb2312';

	//è¯·æ±‚å¤´ç±»åž‹
	this.rtype = 'text';

	//åˆå§‹åŒ–xmlhttp
	//IE6ã€IE5
	if(window.ActiveXObject) {
		try { DedeXHTTP = new ActiveXObject("Msxml2.XMLHTTP");} catch (e) { }
		if (DedeXHTTP == null) try { DedeXHTTP = new ActiveXObject("Microsoft.XMLHTTP");} catch (e) { }
	}
	else {
		DedeXHTTP = new XMLHttpRequest();
	}

	//å¢žåŠ ä¸€ä¸ªPOSTæˆ–GETé”®å€¼å¯¹
	this.AddKeyN = function(skey,svalue) {
		if(this.sendlang=='utf-8') this.AddKeyUtf8(skey, svalue);
		else this.AddKey(skey, svalue);
	};
	
	this.AddKey = function(skey,svalue) {
		this.keyCount++;
		this.keys[this.keyCount] = skey;
		svalue = svalue+'';
		if(svalue != '') svalue = svalue.replace(/\+/g,'$#$');
		this.values[this.keyCount] = escape(svalue);
	};

	//å¢žåŠ ä¸€ä¸ªPOSTæˆ–GETé”®å€¼å¯¹
	this.AddKeyUtf8 = function(skey,svalue) {
		this.keyCount++;
		this.keys[this.keyCount] = skey;
		svalue = svalue+'';
		if(svalue != '') svalue = svalue.replace(/\+/g,'$#$');
		this.values[this.keyCount] = encodeURI(svalue);
	};

	//å¢žåŠ ä¸€ä¸ªHttpè¯·æ±‚å¤´é”®å€¼å¯¹
	this.AddHead = function(skey,svalue) {
		this.rkeyCount++;
		this.rkeys[this.rkeyCount] = skey;
		this.rvalues[this.rkeyCount] = svalue;
	};

	//æ¸…é™¤å½“å‰å¯¹è±¡çš„å“ˆå¸Œè¡¨å‚æ•°
	this.ClearSet = function() {
		this.keyCount = -1;
		this.keys = Array();
		this.values = Array();
		this.rkeyCount = -1;
		this.rkeys = Array();
		this.rvalues = Array();
	};


	DedeXHTTP.onreadystatechange = function() {
		//åœ¨IE6ä¸­ä¸ç®¡é˜»æ–­æˆ–å¼‚æ­¥æ¨¡å¼éƒ½ä¼šæ‰§è¡Œè¿™ä¸ªäº‹ä»¶çš„
		if(DedeXHTTP.readyState == 4){
			if(DedeXHTTP.status == 200)
			{
				if(DedeXHTTP.responseText!=DedeErrCon) {
					DedeContainer.innerHTML = DedeXHTTP.responseText;
				}
				else {
					if(DedeShowError) DedeContainer.innerHTML = DedeErrDisplay;
				}
				DedeXHTTP = null;
			}
			else { if(DedeShowError) DedeContainer.innerHTML = DedeErrDisplay; }
		}
		else { if(DedeShowWait) DedeContainer.innerHTML = DedeWaitDisplay; }
	};

	//æ£€æµ‹é˜»æ–­æ¨¡å¼çš„çŠ¶æ€
	this.BarrageStat = function() {
		if(DedeXHTTP==null) return;
		if(typeof(DedeXHTTP.status)!=undefined && DedeXHTTP.status == 200)
		{
			if(DedeXHTTP.responseText!=DedeErrCon) {
				DedeContainer.innerHTML = DedeXHTTP.responseText;
			}
			else {
				if(DedeShowError) DedeContainer.innerHTML = DedeErrDisplay;
			}
		}
	};

	//å‘é€httpè¯·æ±‚å¤´
	this.SendHead = function()
	{
		//å‘é€ç”¨æˆ·è‡ªè¡Œè®¾å®šçš„è¯·æ±‚å¤´
		if(this.rkeyCount!=-1)
		{ 
			for(var i = 0;i<=this.rkeyCount;i++)
			{
				DedeXHTTP.setRequestHeader(this.rkeys[i],this.rvalues[i]);
			}
		}
		ã€€if(this.rtype=='binary'){
		ã€€DedeXHTTP.setRequestHeader("Content-Type","multipart/form-data");
	}else{
		DedeXHTTP.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	}
};

//ç”¨Postæ–¹å¼å‘é€æ•°æ®
this.SendPost = function(purl) {
	var pdata = "";
	var i=0;
	this.state = 0;
	DedeXHTTP.open("POST", purl, true);
	this.SendHead();
	//postæ•°æ®
	if(this.keyCount!=-1)
	{
		for(;i<=this.keyCount;i++)
		{
			if(pdata=="") pdata = this.keys[i]+'='+this.values[i];
			else pdata += "&"+this.keys[i]+'='+this.values[i];
		}
	}
	DedeXHTTP.send(pdata);
};

//ç”¨GETæ–¹å¼å‘é€æ•°æ®
this.SendGet = function(purl) {
	var gkey = "";
	var i=0;
	this.state = 0;
	//getå‚æ•°
	if(this.keyCount!=-1)
	{ 
		for(;i<=this.keyCount;i++)
		{
			if(gkey=="") gkey = this.keys[i]+'='+this.values[i];
			else gkey += "&"+this.keys[i]+'='+this.values[i];
		}
		if(purl.indexOf('?')==-1) purl = purl + '?' + gkey;
		else  purl = purl + '&' + gkey;
	}
	DedeXHTTP.open("GET", purl, true);
	this.SendHead();
	DedeXHTTP.send(null);
};

//ç”¨GETæ–¹å¼å‘é€æ•°æ®ï¼Œé˜»å¡žæ¨¡å¼
this.SendGet2 = function(purl) {
	var gkey = "";
	var i=0;
	this.state = 0;
	//getå‚æ•°
	if(this.keyCount!=-1)
	{ 
		for(;i<=this.keyCount;i++)
		{
			if(gkey=="") gkey = this.keys[i]+'='+this.values[i];
			else gkey += "&"+this.keys[i]+'='+this.values[i];
		}
		if(purl.indexOf('?')==-1) purl = purl + '?' + gkey;
		else  purl = purl + '&' + gkey;
	}
	DedeXHTTP.open("GET", purl, false);
	this.SendHead();
	DedeXHTTP.send(null);
	//firefoxä¸­ç›´æŽ¥æ£€æµ‹XHTTPçŠ¶æ€
	this.BarrageStat();
};

//ç”¨Postæ–¹å¼å‘é€æ•°æ®
this.SendPost2 = function(purl) {
	var pdata = "";
	var i=0;
	this.state = 0;
	DedeXHTTP.open("POST", purl, false);
	this.SendHead();
	//postæ•°æ®
	if(this.keyCount!=-1)
	{
		for(;i<=this.keyCount;i++)
		{
			if(pdata=="") pdata = this.keys[i]+'='+this.values[i];
			else pdata += "&"+this.keys[i]+'='+this.values[i];
		}
	}
	DedeXHTTP.send(pdata);
	//firefoxä¸­ç›´æŽ¥æ£€æµ‹XHTTPçŠ¶æ€
	this.BarrageStat();
};


} // End Class DedeAjax

//åˆå§‹åŒ–xmldom
function InitXDom() {
	if(DedeXDOM!=null) return;
	var obj = null;
	// Geckoã€Mozillaã€Firefox
	if (typeof(DOMParser) != "undefined") { 
		var parser = new DOMParser();
		obj = parser.parseFromString(xmlText, "text/xml");
	}
	// IE
	else { 
		try { obj = new ActiveXObject("MSXML2.DOMDocument");} catch (e) { }
		if (obj == null) try { obj = new ActiveXObject("Microsoft.XMLDOM"); } catch (e) { }
	}
	DedeXDOM = obj;
};



//è¯»å†™cookieå‡½æ•°
function GetCookie(c_name)
{
	if (document.cookie.length > 0)
	{
		c_start = document.cookie.indexOf(c_name + "=")
		if (c_start != -1)
		{
			c_start = c_start + c_name.length + 1;
			c_end   = document.cookie.indexOf(";",c_start);
			if (c_end == -1)
			{
				c_end = document.cookie.length;
			}
			return unescape(document.cookie.substring(c_start,c_end));
		}
	}
	return null
}

function SetCookie(c_name,value,expiredays)
{
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + expiredays);
	document.cookie = c_name + "=" +escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()); //ä½¿è®¾ç½®çš„æœ‰æ•ˆæ—¶é—´æ­£ç¡®ã€‚å¢žåŠ toGMTString()
}

-->
