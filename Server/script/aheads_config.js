
(function() {
	window.COMMON = {};
	window.COMMON.SERVER = {};
	window.COMMON.SERVER.API_SERVER = {};
	window.COMMON.SERVER.API_SERVER.URL = "http://ec2-15-164-215-214.ap-northeast-2.compute.amazonaws.com";
	window.COMMON.SERVER.API_SERVER.PORT = 8888;

	window.PAGE_SETTING = {}
	window.PAGE_SETTING._BRAND_NM_ = "";
	window.PAGE_SETTING._TARGET_YEAR_ = ""
	window.PAGE_SETTING._TARGET_MONTH_ = -1;
	window.PAGE_SETTING._USE_REST_APIS_ = {
		find_report_by_month : window.COMMON.SERVER.API_SERVER.URL + ":" + window.COMMON.SERVER.API_SERVER.PORT + "/find_report_by_month?"
	};
	
	window.PAGE_SETTING.targetSetting = function( brandNm, year, month ){
		window.PAGE_SETTING._BRAND_NM_ = brandNm;
		window.PAGE_SETTING._TARGET_YEAR_ = year;
		window.PAGE_SETTING._TARGET_MONTH_ = month;

		window.CONST = {};
		window.CONST.CONFIG = {};
		window.CONST.CONFIG.jsPath = {
			report : window.COMMON.SERVER.API_SERVER.URL + ":" + window.COMMON.SERVER.API_SERVER.PORT + "/script/report_common.js"
			, render : window.COMMON.SERVER.API_SERVER.URL + ":" + window.COMMON.SERVER.API_SERVER.PORT + "/script/aheads_render_" + window.PAGE_SETTING._TARGET_YEAR_ + window.PAGE_SETTING._TARGET_MONTH_ + ".js"
		};
	}

	window.PAGE_SETTING.insertScript = function( path ){
		var s = document.createElement('script');
		s.type = 'text/javascript';
		s.async = true;
		var timsstamp = new Date().getTime();
		s.src = path + "?t=" + timsstamp;
		var x = document.getElementsByTagName('script')[0];
		x.parentNode.insertBefore(s, x);
	}

	window.charts = {};
	window.charts.bar = {};
	window.charts.pie = {};
	window.charts.map = {};
	window.marketing = {};
	window.marketing.report = {};
	
	window.EXTERNAL = {};
	window.EXTERNAL.API = {};
	window.EXTERNAL.API.facebookAheadsUrl = "https://storage.elfsight.com/api/facebook?q=110304634160721/posts?fields=created_time,permalink_url,from,message,comments.summary(true){from,created_time,message,id},likes.summary(true){name,id},attachments{media,media_type,type,title,description,url,subattachments{media,media_type,type,title,description,url}}&user_id=110304634160721"
	window.EXTERNAL.API.isntagramAheadsUrl = "https://storage.elfsight.com/api/instagram?q=me/media?fields=caption,media_type,media_url,permalink,thumbnail_url,timestamp,username,children{media_type,media_url,thumbnail_url}&user_id=e2403ac5-a96e-4c38-b1f7-bea95c1634fb"
	window.EXTERNAL.API.dateObj = { start : "2020-10-01", end : "2020-11-01" };
  
})();
