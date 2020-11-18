(function(){
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
	
	if( window.document.getElementById("target_month") )
	{
		var title_month = window.document.getElementById("target_month");
		title_month.innerText = target_month;
		title_month.style.color = "rgba(255, 255, 255,10)";
	}

	window.PIEL.REPORT.drawTable__monthly_marketing_plan( "monthly_planning", data.statistic_monthly, target_month );
	window.PIEL.REPORT.drawCards__monthly_facebook_stastics( "monthly_facebook_stastics", data.total, target_month );
	window.PIEL.REPORT.drawCards__make_facebook_location_html( "facebook_map_cards", data.location_data, target_month );

	window.PIEL.REPORT.drawTable__make_kols_html( "kols_cards", data.kols, target_month );
	//window.PIEL.REPORT.drawTable__make_statistic_google_html( "statistic_google", data.google_ad_info_list, data.google_total, target_month );
	//window.PIEL.REPORT.drawCards__google_seo_list( "google_seo_list_data", data.google_seo_list, target_month );
	
	window.PIEL.REPORT.getFacebookData( window.PAGE_SETTING._BRAND_NM_, window.EXTERNAL.API.facebookAheadsUrl, window.EXTERNAL.API.dateObj );
	window.PIEL.REPORT.getInstagramData( window.PAGE_SETTING._BRAND_NM_, window.EXTERNAL.API.isntagramAheadsUrl, window.EXTERNAL.API.dateObj );
	window.PIEL.REPORT.adlist_render( window.EXTERNAL.API.dateObj, window.PAGE_SETTING._BRAND_NM_, data.ads_list );


	window.PIEL.REPORT.drawCards__make_ads_total_statistic( "ads_total", data.ads_total, target_month );

	am4core.ready(function() {

		am4core.useTheme(am4themes_animated);

		window.charts.pie[ "연령별 도달" ] = window.PIEL.REPORT.pieChartAge( "chartdiv00", ["연령별 도달"], data.ages.d00 );
		window.charts.pie[ "연령별 노출" ] = window.PIEL.REPORT.pieChartAge( "chartdiv01", ["연령별 노출"], data.ages.d01 );
		window.charts.pie[ "연령별 게시물 참여" ] = window.PIEL.REPORT.pieChartAge( "chartdiv02", ["연령별 게시물 참여"], data.ages.d02 );
		window.charts.pie[ "연령별 페이지 좋아요" ] = window.PIEL.REPORT.pieChartAge( "chartdiv03", ["연령별 페이지 좋아요"], data.ages.d03 );

		window.charts.bar[ "페이스북 시간대별 통계" ] = window.PIEL.REPORT.barChartTime( "chartdiv04", { title : "페이스북 시간대별 통계",label0 : "time",label1 : "view",label2 : "like" }, data.time );
		//window.PIEL.REPORT.barChartTime( "chartdiv13", { title : "",label0 : "time",label1 : "view",label2 : "click" }, data.google_time_data );
		//window.PIEL.REPORT.barChartTime( "chartdiv14", { title : "",label0 : "time",label1 : "view",label2 : "click" }, data.google_time_shopping_data );

	});

	google.load('visualization', '1', { 'packages': ['geochart'], 'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY' });
	google.setOnLoadCallback( window.PIEL.REPORT.drawVisualization( data.location_data ) );

};
window.PIEL.REPORT.logic._isLoadCnt = 0;
  
window.addEventListener('DOMContentLoaded', function( e ){
	var xhr = new XMLHttpRequest();
	xhr.addEventListener("load", function(){
	  var data = JSON.parse( xhr.responseText );
	  window.PIEL.REPORT.logic( data );
	});
	xhr.open("GET", window.PAGE_SETTING._USE_REST_APIS_.find_report_by_month + "brand=" + window.PAGE_SETTING._BRAND_NM_ + "&month=" + window.PAGE_SETTING._TARGET_MONTH_ );
	xhr.send();
});

window.document.getElementById( "downloadPdf" ).addEventListener('click',function(e){
	window.PIEL.REPORT.loader.on();

	var downloadFileNm = "report_" + window.PAGE_SETTING._BRAND_NM_ + "_" + window.PAGE_SETTING._TARGET_YEAR_ + window.PIEL.REPORT.pad( window.PAGE_SETTING._TARGET_MONTH_,2) + ".pdf";
	var uri = "https://github.com/pielchoisukjune/reportToHTMLToPDF/raw/main/report/" + window.PAGE_SETTING._BRAND_NM_ + "/" + window.PAGE_SETTING._TARGET_YEAR_ + window.PIEL.REPORT.pad( window.PAGE_SETTING._TARGET_MONTH_,2) + "/" + downloadFileNm;
	
	setTimeout(function(){
		window.PIEL.REPORT.downloadURI( uri, downloadFileNm );
		window.PIEL.REPORT.loader.off()
	},2000)
})
})();