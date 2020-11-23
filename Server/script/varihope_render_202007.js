(function(){

	//--------------------------------------------------;
	// FUNCTION;
	//--------------------------------------------------;
	/**
	 * 
	 * @param {*} data 
	 */
	window.PIEL.REPORT.logic = function( data ){

		if( !window.PIEL || !window.PIEL.REPORT )
		{
			console.log( "report_common.js is not loaded" );
			
			++window.PIEL.REPORT.logic._isLoadCnt;
			console.log( "window.PIEL.REPORT.logic._isLoadCnt : " + window.PIEL.REPORT.logic._isLoadCnt );
			setTimeout(function(){ window.PIEL.REPORT.logic();},2000);
			return;
		}
		console.log( "window.PIEL.REPORT Loaded." );
        
		var target_month = window.PAGE_SETTING._TARGET_MONTH_ +"월";
        
        window.PIEL.REPORT.insertLogo();
        
		if( window.document.getElementById("target_month") )
		{
			var title_month = window.document.getElementById("target_month");
			title_month.innerText = window.PAGE_SETTING._TARGET_YEAR_ + "." + window.COMMON.URIL.pad( window.PAGE_SETTING._TARGET_MONTH_, 2 );
			title_month.style.color = "rgba(0, 0, 0,10)";
		}
	
        window.PIEL.REPORT.drawTable__monthly_marketing_plan( "monthly_planning", data.statistic_monthly, target_month );
        window.PIEL.REPORT.drawCards__monthly_facebook_stastics( "monthly_facebook_stastics", data.total, target_month );
        window.PIEL.REPORT.drawTable__make_facebook_location_htm( "facebook_map_cards", data.location_data, target_month );
        window.PIEL.REPORT.makeInsight( "insight", data.insight[ 0 ], target_month );
        window.PIEL.REPORT.drawTable__make_kols_html( "kols_cards", data.kols, target_month )
        window.PIEL.REPORT.drawTable__make_statistic_google_html__01( "statistic_google", data.google_total, target_month );
        window.PIEL.REPORT.drawTable__google_seo_list( "google_seo_list_data", data.google_seo_list, target_month )
        window.PIEL.REPORT.drawTable__make_marketing_list_none_img( "marketing_list", data.ads_list, target_month )
        window.PIEL.REPORT.drawTable__make_ads_total_statistic( "ads_total", data.ads_total, target_month )
		window.PIEL.REPORT.getDataLatestReport(function(data){ return window.PIEL.REPORT.makeLatestReport( "latest_report", data );	})
    
        am4core.ready(function() {
    
            am4core.useTheme(am4themes_animated);
    
            window.charts.pie[ "연령별 도달" ] = window.PIEL.REPORT.pieChartAge( "chartdiv00", ["연령별 도달"], data.ages.d00 );
            window.charts.pie[ "연령별 노출" ] = window.PIEL.REPORT.pieChartAge( "chartdiv01", ["연령별 노출"], data.ages.d01 );
            window.charts.pie[ "연령별 게시물 참여" ] = window.PIEL.REPORT.pieChartAge( "chartdiv02", ["연령별 게시물 참여"], data.ages.d02 );
            window.charts.pie[ "연령별 페이지 좋아요" ] = window.PIEL.REPORT.pieChartAge( "chartdiv03", ["연령별 페이지 좋아요"], data.ages.d03 );
    
            
            var google_age_title_a = [
                  [ "Paid Search_HT", "브랜드의 인기도 상관없는 비타민C 제품 관련 (Cold )" ]
                , [ "Paid Search_BR", "세럼 비타민C 관련 (Hot)" ]
                , [ "Paid Search_CO", "시장에 인기 있는 세럼 비타민 C 제품 브랜드 관련 (Branded)" ]
                , [ "Paid Search_WM", "비타민C에 대해 알아보고 있는 사람들의 사용 키워드 관련 (Warm)" ]
            ];
    
            window.charts.pie[ google_age_title_a[ 0 ][ 0 ] ] = window.PIEL.REPORT.pieChartAge( "chartdiv07", google_age_title_a[ 0 ], data.google_ages_data[ "Paid Search_HT----브랜드의 인기도 상관없는 비타민C 제품 관련 (Cold )" ] );
            window.charts.pie[ google_age_title_a[ 1 ][ 0 ] ] = window.PIEL.REPORT.pieChartAge( "chartdiv08", google_age_title_a[ 1 ], data.google_ages_data[ "Paid Search_BR----세럼 비타민C 관련 (Hot)" ] );
            window.charts.pie[ google_age_title_a[ 2 ][ 0 ] ] = window.PIEL.REPORT.pieChartAge( "chartdiv09", google_age_title_a[ 2 ], data.google_ages_data[ "Paid Search_CO----시장에 인기 있는 세럼 비타민 C 제품 브랜드 관련 (Branded)" ] );
            window.charts.pie[ google_age_title_a[ 3 ][ 0 ] ] = window.PIEL.REPORT.pieChartAge( "chartdiv10", google_age_title_a[ 3 ], data.google_ages_data[ "Paid Search_WM----비타민C에 대해 알아보고 있는 사람들의 사용 키워드 관련 (Warm)" ] );
    
            window.charts.bar[ "페이스북 시간대별 통계" ] = window.PIEL.REPORT.barChartTime( "chartdiv04", { title : "페이스북 시간대별 통계",label0 : "time",label1 : "view",label2 : "like" }, data.time );
            window.charts.bar[ "구글 광고 시간별별 통계_00" ] = window.PIEL.REPORT.barChartTime( "chartdiv13", { title : "구글 광고 시간별별 통계\n( Google Search + Youtube ads. )",label0 : "time",label1 : "view",label2 : "click" }, data.google_time_data );
            //window.charts.bar[ "구글 광고 시간별별 통계_01" ] = window.PIEL.REPORT.barChartTime( "chartdiv14", { title : "구글 광고 시간별별 통계\n( GDN + Google Shopping  )",label0 : "time",label1 : "view",label2 : "click" }, data.google_time_shopping_data );
    
        });
    
        google.load('visualization', '1', { 'packages': ['geochart'], 'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY' });
        google.setOnLoadCallback( window.PIEL.REPORT.drawVisualization( data.location_data ) );
    
        
        
        //--------------------------------------------------;
        // EVENT;
        //--------------------------------------------------;
        window.document.getElementById( "downloadPdf" ).addEventListener('click',function(e){
            window.PIEL.REPORT.loader.on( "PDF 파일을 생성중입니다." );
        
            var downloadFileNm = "report_" + window.PAGE_SETTING._BRAND_NM_ + "_" + window.PAGE_SETTING._TARGET_YEAR_ + window.PIEL.REPORT.pad( window.PAGE_SETTING._TARGET_MONTH_,2) + ".pdf";
            var uri = "https://github.com/pielchoisukjune/reportToHTMLToPDF/raw/main/report/" + window.PAGE_SETTING._BRAND_NM_ + "/" + window.PAGE_SETTING._TARGET_YEAR_ + window.PIEL.REPORT.pad( window.PAGE_SETTING._TARGET_MONTH_,2) + "/" + downloadFileNm;
            
            setTimeout(function(){
                window.PIEL.REPORT.downloadURI( uri, downloadFileNm );
                window.PIEL.REPORT.loader.off()
            },2000)
        })
	};
	window.PIEL.REPORT.logic._isLoadCnt = 0;
})()
