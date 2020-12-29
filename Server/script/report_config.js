
(function() {
	window.COMMON = {};
	window.COMMON.SERVER = {};
	window.COMMON.SERVER.API_SERVER = {};
	window.COMMON.SERVER.API_SERVER.URL = "http://ec2-15-164-215-214.ap-northeast-2.compute.amazonaws.com";
	window.COMMON.SERVER.API_SERVER.PORT = 8888;

	window.EXTERNAL = {};
	window.EXTERNAL.APIS = {};
	window.EXTERNAL.APIS.elfsight = {
		aheads : {
			url : {
				facebook : "https://storage.elfsight.com/api/facebook?q=110304634160721/posts?fields=created_time,permalink_url,from,message,comments.summary(true){from,created_time,message,id},likes.summary(true){name,id},attachments{media,media_type,type,title,description,url,subattachments{media,media_type,type,title,description,url}}&user_id=110304634160721"
				, isntagram : "https://storage.elfsight.com/api/instagram?q=me/media?fields=caption,media_type,media_url,permalink,thumbnail_url,timestamp,username,children{media_type,media_url,thumbnail_url}&user_id=e2403ac5-a96e-4c38-b1f7-bea95c1634fb"
			}
			, options : {
				dateObj : {
					start : ""
					, end : ""
				}
			}	
		}
		, varihope : {
			url : {
				facebook : ""
				, isntagr : ""
			}
			, options : {
				dateObj : {
					start : ""
					, end : ""
				}
			}	
		}
		, bxxxy : {
			url : {
				facebook : ""
				, isntagr : ""
			}
			, options : {
				dateObj : {
					start : ""
					, end : ""
				}
			}	
		}
		, ashseven : {
			url : {
				facebook : ""
				, isntagr : ""
			}
			, options : {
				dateObj : {
					start : ""
					, end : ""
				}
			}	
		}
		, wellderma : {
			url : {
				facebook : ""
				, isntagr : ""
			}
			, options : {
				dateObj : {
					start : ""
					, end : ""
				}
			}	
		}
	};
	

	window.PAGE_SETTING = {}
	window.PAGE_SETTING._BRAND_NM_ = "";
	window.PAGE_SETTING._TARGET_YEAR_ = ""
	window.PAGE_SETTING._TARGET_MONTH_ = -1;
	window.PAGE_SETTING._USE_REST_APIS_ = {
        find_report_by_month : window.COMMON.SERVER.API_SERVER.URL + ":" + window.COMMON.SERVER.API_SERVER.PORT + "/find_report_by_targetDate?"
        , find_report_All_by_brand : window.COMMON.SERVER.API_SERVER.URL + ":" + window.COMMON.SERVER.API_SERVER.PORT + "/find_report_All_by_brand?"
	};
    
    window.PAGE_SETTING.LOGO = {
		varihope : "https://cdn.imweb.me/thumbnail/20200709/8a8f7e32ec0fe.png"
        , aheads : "https://cdn.imweb.me/thumbnail/20201106/e4b5c23727da2.png"
        , wellderma : "https://cdn.imweb.me/thumbnail/20201008/e963a5bd37134.png"
        , ashseven : "https://cdn.imweb.me/thumbnail/20201103/a39576bf72e6c.jpg"
        , bxxxy : "https://cdn.imweb.me/thumbnail/20201103/28686b8c52c16.jpg"
    }

    window.COMMON.URIL = {};
    window.COMMON.URIL.pad = function(n, width){
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
    }

	window.PAGE_SETTING.targetSetting = function( brandNm, year, month ){

        /*//
        var _q = window.location.search.replace("?","").split( "&" );
        var q = {}    
        var i = 0,iLen = _q.length,io,_t;
        for(;i<iLen;++i){
            io = _q[ i ];
            _t = io.split("=");
            q[ _t[0] ] = _t[ 1 ];
        }
        window.PAGE_SETTING._BRAND_NM_ = q.brand;
		window.PAGE_SETTING._TARGET_YEAR_ = q.year;
		window.PAGE_SETTING._TARGET_MONTH_ = q.month;
        /*/
        window.PAGE_SETTING._BRAND_NM_ = brandNm;
		window.PAGE_SETTING._TARGET_YEAR_ = year;
		window.PAGE_SETTING._TARGET_MONTH_ = month;
        //*/
        


		window.CONST = {};
		window.CONST.CONFIG = {};
		window.CONST.CONFIG.jsPath = {
			report : window.COMMON.SERVER.API_SERVER.URL + ":" + window.COMMON.SERVER.API_SERVER.PORT + "/script/report_common.js"
			, render : window.COMMON.SERVER.API_SERVER.URL + ":" + window.COMMON.SERVER.API_SERVER.PORT + "/script/" + window.PAGE_SETTING._BRAND_NM_ + "_render_" + window.PAGE_SETTING._TARGET_YEAR_ + window.COMMON.URIL.pad( window.PAGE_SETTING._TARGET_MONTH_, 2 ) + ".js"
        };
        window.PAGE_SETTING.insertScript( window.CONST.CONFIG.jsPath.render );
	}

	window.PAGE_SETTING.insertScript = function( path ){
		var s = document.createElement('script');
		s.type = 'text/javascript';
		s.async = false;
		var timsstamp = new Date().getTime();
		s.src = path + "?t=" + timsstamp;
		var x = document.getElementsByTagName('script')[ window.PAGE_SETTING.insertScript.cnt ];
		x.parentNode.insertBefore(s, x);
		++window.PAGE_SETTING.insertScript.cnt;
		return;
	}
	window.PAGE_SETTING.insertScript.cnt = 0;

	window.charts = {};
	window.charts.bar = {};
	window.charts.pie = {};
	window.charts.map = {};
	window.marketing = {};
    window.marketing.report = {};
    
    
})();
