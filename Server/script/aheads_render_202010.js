
(function(){
	window.addEventListener('DOMContentLoaded', function( e ){ window.PIEL.REPORT.getData() });
	window.document.getElementById( "downloadPdf" ).addEventListener('click',function(e){
		window.PIEL.REPORT.loader.on();
	
		var downloadFileNm = "report_" + window.PAGE_SETTING._BRAND_NM_ + "_" + window.PAGE_SETTING._TARGET_YEAR_ + window.PIEL.REPORT.pad( window.PAGE_SETTING._TARGET_MONTH_,2) + ".pdf";
		var uri = "https://github.com/pielchoisukjune/reportToHTMLToPDF/raw/main/report/" + window.PAGE_SETTING._BRAND_NM_ + "/" + window.PAGE_SETTING._TARGET_YEAR_ + window.PIEL.REPORT.pad( window.PAGE_SETTING._TARGET_MONTH_,2) + "/" + downloadFileNm;
		
		setTimeout(function(){
			window.PIEL.REPORT.downloadURI( uri, downloadFileNm );
			window.PIEL.REPORT.loader.off()
		},2000)
	})
})()
