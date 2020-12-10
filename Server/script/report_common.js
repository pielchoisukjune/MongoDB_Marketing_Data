(function(){
	
	console.log( "Start - window.PIEL" );
	console.log( "Start - window.PIEL" );
	console.log( "Start - window.PIEL" );

	window.PIEL = {};
	window.PIEL.REPORT= {};

	window.PIEL.REPORT.thumnail_icon = {
		"뷰티유튜버" : "red youtube"
		, "페이스북그룹" : "blue facebook square"
		, "페이스북" : "blue facebook square"
		, "인스타그램" : "red instagram"
		, "언론사노출" : "red newspaper outline"
		, "언론사 노출" : "red newspaper outline"
		, "Fime.vn" : "red edit outline"
		, "Google Top SEO" : "red google outline"
		, "Google" : "red google outline"
	};

	/**
	 * 
	 */
	window.PIEL.REPORT.insertLogo = function(){
		var _el = window.document.getElementById( "logo_top" );
		var imgUrl = window.PAGE_SETTING.LOGO[ window.PAGE_SETTING._BRAND_NM_ ];
		var r = `
			<img src="${imgUrl}">
		`
		_el.innerHTML = r;
		return;
	}

	/*
	 *
	 */
	window.PIEL.REPORT.emptyPieChart = function( domId, title ){
		var chart = am4core.create( domId, am4charts.PieChart);
		var title03 = chart.titles.create();
		title03.text = title;
		title03.fontSize = 25;
		title03.marginBottom = 30;
		title03.marginTop = 30;

		chart.data = [{
		  "country": "Dummy",
		  "disabled": true,
		  "value": 1000,
		  "color": am4core.color("#dadada"),
		  "opacity": 0.3,
		  "strokeDasharray": "4,4",
		  "tooltip": ""
		}];

		/* Create series */
		var series = chart.series.push(new am4charts.PieSeries());
		series.dataFields.value = "value";
		series.dataFields.category = "country";

		/* Set tup slice appearance */
		var slice = series.slices.template;
		slice.propertyFields.fill = "color";
		slice.propertyFields.fillOpacity = "opacity";
		slice.propertyFields.stroke = "color";
		slice.propertyFields.strokeDasharray = "strokeDasharray";
		slice.propertyFields.tooltipText = "tooltip";

		series.labels.template.propertyFields.disabled = "disabled";
		series.ticks.template.propertyFields.disabled = "disabled";

		// Enable export
		chart.exporting.menu = new am4core.ExportMenu();

		chart.events.on("ready", function(e){
			//	
			var pie_chart_loader = window.document.getElementById( domId + "_loader" );
			pie_chart_loader.classList.remove("active");
		});
		
		return chart;
	};

	/*
	 *
	 */
	window.PIEL.REPORT.pieChartAge = function( domId, titles, arr ){
		if( arr.length == 0 )
		{
			return window.PIEL.REPORT.emptyPieChart( domId, titles[ 0 ] );
		}

		var chart = am4core.create(domId, am4charts.PieChart);
		
		if( titles.length > 1 )
		{
			var title01 = chart.titles.create();
			title01.text = titles[ 1 ];
			title01.fontSize = 14;
			//title01.marginBottom = 40;
			title01.marginTop = 10;
		}

		var title00 = chart.titles.create();
		title00.text = titles[ 0 ];
		title00.fontSize = 25;
		//title00.marginBottom = 30;
		title00.marginTop = 10;
		chart.exporting.filePrefix = domId;
		
		//loading;
		chart.preloader.disabled = true;
		
		chart.data = arr;

		// Add and configure Series
		var pieSeries00 = chart.series.push(new am4charts.PieSeries());

		pieSeries00.dataFields.value = "value";
		pieSeries00.dataFields.category = "ages";
		pieSeries00.slices.template.stroke = am4core.color("#fff");
		pieSeries00.slices.template.strokeOpacity = 1;

		// This creates initial animation
		pieSeries00.hiddenState.properties.opacity = 1;
		pieSeries00.hiddenState.properties.endAngle = -90;
		pieSeries00.hiddenState.properties.startAngle = -90;
		pieSeries00.labels.template.fontSize = 14;

		chart.hiddenState.properties.radius = am4core.percent(70);

		pieSeries00.ticks.template.events.on("ready", hideSmall);
		pieSeries00.ticks.template.events.on("visibilitychanged", hideSmall);
		pieSeries00.labels.template.events.on("ready", hideSmall);
		pieSeries00.labels.template.events.on("visibilitychanged", hideSmall);

		function hideSmall(ev) {
		  if (ev.target.dataItem && (ev.target.dataItem.values.value.percent == 0)) {
			ev.target.hide();
		  }
		  else {
			ev.target.show();
		  }
		}

		// Enable export
		chart.exporting.menu = new am4core.ExportMenu();

		chart.events.on("ready", function(e){
			//	
			var pie_chart_loader = window.document.getElementById( domId + "_loader" );
			pie_chart_loader.classList.remove("active");
		});
		
		return chart;
	}

	window.PIEL.REPORT.pieChartAge.dispose = function(){
		var s,so;
		for( s in window.charts.pie )
		{
			so = window.charts.pie[ s ]
			so.dispose();
		}
		window.charts.pie = {};
		return;
	};

	/*
	 *
	 */
	window.PIEL.REPORT.barChartTime = function( domId, options, arr ){

	// Create chart instance
		var chart = am4core.create( domId , am4charts.XYChart);
	//	var title00 = chart.titles.create();
	//	title00.text = options.title;
	//	title00.fontSize = 25;
	//	title00.marginBottom = 30;
	//	title00.marginTop = 30;

		chart.legend = new am4charts.Legend();
		// Export
		//
		chart.exporting.menu = new am4core.ExportMenu();

		if( options.title != "" )
		{
			var title00 = chart.titles.create();
			title00.text = options.title;
			title00.fontSize = 25;
			title00.marginBottom = 30;
			title00.marginTop = 30;	

			chart.exporting.filePrefix = domId;
		}
		
		/* Create axes */
		var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
		categoryAxis.dataFields.category = options.label0;
		categoryAxis.renderer.minGridDistance = 30;
		categoryAxis.renderer.labels.template.horizontalCenter = "right";
		categoryAxis.renderer.labels.template.verticalCenter = "middle";
		categoryAxis.renderer.labels.template.rotation = 300;
		categoryAxis.renderer.labels.template.fontSize = 11;

		/* Create value axis */
		var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

		/* Create series */
		var columnSeries = chart.series.push(new am4charts.ColumnSeries());
		columnSeries.name = options.label1;
		columnSeries.dataFields.valueY = options.label1;
		columnSeries.dataFields.categoryX = "time";

		columnSeries.columns.template.tooltipText = "[#fff font-size: 15px]{name} in {categoryX}:\n[/][#fff font-size: 20px]{valueY}[/] [#fff]{additional}[/]"
		columnSeries.columns.template.propertyFields.fillOpacity = "fillOpacity";
		columnSeries.columns.template.propertyFields.stroke = "stroke";
		columnSeries.columns.template.propertyFields.strokeWidth = "strokeWidth";
		columnSeries.columns.template.propertyFields.strokeDasharray = "columnDash";
		columnSeries.tooltip.label.textAlign = "middle";

		// second value axis for quantity
		var valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
		valueAxis2.renderer.opposite = true;
		valueAxis2.syncWithAxis = valueAxis;
		valueAxis2.tooltip.disabled = true;

		var lineSeries = chart.series.push(new am4charts.LineSeries());
		lineSeries.name = options.label2;
		lineSeries.dataFields.valueY = options.label2;
		lineSeries.dataFields.categoryX = "time";

		lineSeries.yAxis = valueAxis2;

		lineSeries.stroke = am4core.color("#fdd400");
		lineSeries.strokeWidth = 3;
		lineSeries.propertyFields.strokeDasharray = "lineDash";
		lineSeries.tooltip.label.textAlign = "middle";

		var bullet = lineSeries.bullets.push(new am4charts.Bullet());
		bullet.fill = am4core.color("#fdd400"); // tooltips grab fill from parent by default
		bullet.tooltipText = "[#fff font-size: 15px]{name} in {categoryX}:\n[/][#fff font-size: 20px]{valueY}[/] [#fff]{additional}[/]"
		var circle = bullet.createChild(am4core.Circle);
		circle.radius = 4;
		circle.fill = am4core.color("#fff");
		circle.strokeWidth = 3;
		
		// Enable export
		chart.exporting.menu = new am4core.ExportMenu();
		
		chart.data = arr;

		chart.events.on("ready", function(e){
			//	
			var bar_chart_loader = window.document.getElementById( domId + "_loader" );
			bar_chart_loader.classList.remove("active");
		});

		return chart;
	};

	window.PIEL.REPORT.barChartTime.dispose = function(){
		var s,so;
		for( s in window.charts.bar )
		{
			so = window.charts.bar[ s ]
			so.dispose();
		}
		window.charts.bar = {};
		return;
	};
	/*
	 *
	 */
	window.PIEL.REPORT.drawVisualization = function( mapData ){
		
		if( !google.visualization || !google.visualization.arrayToDataTable )
		{
			console.log( "Do not load google.visualization" );
			++window.PIEL.REPORT.drawVisualization.load_cnt;
			console.log( "-- window.PIEL.REPORT.drawVisualization.load_cnt : " + window.PIEL.REPORT.drawVisualization.load_cnt )
			setTimeout(function(){ window.PIEL.REPORT.drawVisualization( mapData ); },2000);
			return;
			
		}
		else
		{
			console.log( "Loaded google.visualization" );
			var data = google.visualization.arrayToDataTable( mapData );

			var opts = {
				region: 'VN'
				, displayMode: 'regions'
				, resolution: 'provinces'
				, colorAxis: {colors: ['yellow', 'red']}
				, legend : {textStyle: {color: 'red', fontSize: 12}}
				, sizeAxis: { minValue: 0, maxValue: 100 }
			};
			var geochart = new google.visualization.GeoChart( document.getElementById('visualization'));
			google.visualization.events.addListener(geochart, 'ready', function() {
				var mpa_chart_loader_title = window.document.getElementById( "map_chart_loader_title" );

				var title = "페이스북 지역별 통계";		
				var r = "";
					r += `
					<div style='padding:20px 0px;'><h3 class="ui left aligned header">${title}</h1></div>
				`;
		
				mpa_chart_loader_title.innerHTML = r;

				map_chart_loader.classList.remove("active");
				//var imgUri = geochart.getImageURI();
				if( !window.charts ) window.charts = {};
				if( !window.charts.map ) window.charts.map = {};
				
				window.charts.map.facebook = geochart;
				window.charts.map.facebook.dataUri = window.charts.map.facebook.getImageURI();
				return;
			});
			geochart.draw(data, opts);	
			return;
		}
	};
	window.PIEL.REPORT.drawVisualization.load_cnt = 0;
	window.PIEL.REPORT.drawVisualization.dispose = function(){

		var s,so;
		for( s in window.charts.map )
		{
			so = window.charts.map[ s ]
			so.clearChart();
		}
		window.charts.map = {};
		return;
	}
	
	/*
	 * 월간집행통계작성;
	 */
	window.PIEL.REPORT.drawTable__monthly_marketing_plan = function( domId, data, target_month ){
		
		var title = "월별 마케팅 진행현황"
		var tDom = window.document.getElementById( domId );

		if( !tDom ) return;
		
		var _tStr = "";
		var titleHtml = `
			<div style='padding:20px 0px;'><h3 class="ui left aligned header">${title}</h1></div>
		`
			_tStr += titleHtml;
			_tStr += `<table class="ui very compact celled table"><thead><!=TABLE_HEAD=!></thead><tbody><!=TABLE_BODY=!></tbody></table>`;	
		var i = 0,iLen = data.length,io;
		var _html0 = "";
		var _html1 = "";
		var r = "";
		var _bg_check = -1;
		for(;i<iLen;i++){
			io = data[ i ];
			if( i == 0 ){
				_bg_check00 = io.indexOf( target_month );
				//_bg_check01 = io.indexOf( target_month ) + 1;

				_html0 += "<tr>"
				var _tidx = 0;
				io.forEach(function(item){

					var _item = item.replace( /\n/gi, "<br>" ).replace( /\r/gi, "<br>" ).replace( /\r\n/gi, "<br>" );

					if( _tidx == 0 )
					{
						_html0 += "<th style='width:18%;font-weight: 400;font-size: 12px;'>" + _item + "</th>\n";
					}
					else if( _tidx == 1 ){
						_html0 += "<th style='width:19%;font-weight: 400;font-size: 12px;'>" + _item + "</th>\n";
					}
					else
					{
						
						if( _bg_check00 == _tidx ) _html0 += "<th style='width:9%;background-color : yellow;color:red;font-weight: 400;font-size: 12px;'>" + _item + "</th>\n";
						//else if( _bg_check01 == _tidx ) _html0 += "<th style='width:9%;background-color : yellow;color:red;font-weight: 400;font-size: 12px;'>" + _item + "</th>\n";
						else _html0 += "<th style='width:9%;font-weight: 400;font-size: 12px;'>" + _item + "</th>\n";
					}
					++_tidx;
				})
				_html0 += "</tr>\n"
			}
			else
			{
				_html1 += "<tr>"
				var _tidx = 0;
				io.forEach(function(item){ 
					var _item = item.replace( /\n/gi, "<br>" ).replace( /\r/gi, "<br>" ).replace( /\r\n/gi, "<br>" );
					if( _bg_check00 == _tidx ) _html1 += "<td style='font-size:11px;background-color : yellow;color:red;'>" + _item + "</td>\n";
					//else if( _bg_check01 == _tidx ) _html1 += "<td style='width:8%;background-color : yellow;color:red;font-weight: 400;font-size: 12px;'>" + _item + "</td>\n";
					else _html1 += "<td style='font-size:11px;'>" + _item + "</td>\n"; 
					++_tidx;
				})
				_html1 += "</tr>\n"
			}
		}
		r = _tStr.replace( "<!=TABLE_HEAD=!>", _html0 ).replace( "<!=TABLE_BODY=!>", _html1 )
		tDom.innerHTML = r;
		return;
	}
	/*
	 *
	 */
	window.PIEL.REPORT.drawCards__monthly_facebook_stastics = function( domId, data, target_month ){
		
		var title = "페이스북광고 통계"
		var tDom = window.document.getElementById( domId );

		if( !tDom ) return;
		
		var r = "";
		var titleHtml = `
			<div style='padding:20px 0px;'><h3 class="ui left aligned header">${title}</h1></div>
		`
		r += titleHtml;
		r += "<table class='ui very compact celled table'>\n";
		r += "<thead>\n<tr>\n";
		
		var headers = [
			"도달 (명)"
			, "노출 수 (회)"
			//, "회수 (번)"
			//, "지출 금액(동)"
			//, "페이지 참여(번)"
			, "게시물 참여(번)"
			, "게시물 댓글 (개)"
			, "게시물 공감(게시물 반응)"
			, "페이지 좋아요"
			//, "동영상 50% 보기"
			//, "동영상 100% 보기"
			//, "새로운 메시지 연결"
			//, "새로운 메시지 한번 연결에 금액"
		];
	
		var tdWidth = 100 / headers.length;
	
		headers.forEach(function(item){
			r += "<th style='width:" + tdWidth + "%;text-align:center;'>" + item + "</th>\n";	
		});
	
		r += "</tr>\n</thead>\n<tbody>\n";
		r += "<tr>\n";
	
		headers.forEach(function(item){
			if( data[ 0 ][ item ] ) r += "<td style='text-align:center;'>" + data[ 0 ][ item ] + " 건</td>\n";	
			else r += "<td style='text-align:center;'> - 건</td>\n";	
		})
			
	
		r += "</tr>\n";
		r += "</tbody>\n</table>\n";

		tDom.innerHTML = r;
		return;

	}
	//-------------------------------------------------------;
	// 페이스북지역통계카드생성;
	//-------------------------------------------------------;
	window.PIEL.REPORT.drawCards__make_facebook_location_html = function( domId, data, target_month ){

		var tDom = window.document.getElementById( domId );
		var _tStr = `<div class="card"><div class="content"><div class="header" style="font-size : 12px;"><!=city=!></div><div class="description" style="font-size : 11px;">도달 : <!=reach=!><br>노출 : <!=view=!></div></div></div>`;
		if( !tDom ) return;

		var i = 1,iLen = data.length,io;
		var _html = "";
		var r = "";
		for(;i<iLen;i++){
			io = data[ i ];

			_html =  _tStr.replace( "<!=city=!>" , io[0].f )
			.replace( "<!=reach=!>" , window.PIEL.REPORT.numberWithCommas( io[1] ) )
			.replace( "<!=view=!>" , window.PIEL.REPORT.numberWithCommas ( io[2] ) );
			r += _html + "\n";

		}
		tDom.innerHTML = r;
		return;
	};

	//-------------------------------------------------------;
	// 페이스북지역통계카드생성 - 테이블;
	//-------------------------------------------------------;
	
	/*
	* 페이스북 지역별 통계 자료 - 왼쪽
	*/
	window.PIEL.REPORT.drawTable__make_facebook_location_htm_01 = function( d ){
		var title = "페이스북 지역별 통계 자료 - 왼쪽";
		
		var r = "";
	//	var titleHtml = `
	//			<div class="align_center pad_20"><h2>${title}</h2></div>
	//		`
	//	r += titleHtml;
		r += "<table class='ui very compact celled table'>\n";
		r += "<thead>\n<tr>\n";
		
		var headers = [ "도시", "도달", "노출" ];

		var tdWidth = 100 / headers.length;

		headers.forEach(function(d){
			r += "<th style='width:" + tdWidth + "%;'>" + d + "</th>\n";	
		});
		

		r += "</tr>\n</thead>\n";
		r += "<tbody>\n";

		var i = 1,iLen = d.length,io;
		for(;i<iLen;++i){
			io = d[ i ]
			if( i == 0 ||  ( i + 2 ) % 2 == 0 )
			{
				r += "<tr>\n";
				
				r += "<td style='background-color:#fff;color:#000;padding:5px;'>" + io[ 0 ][ "f" ] + "</td>";
				r += "<td style='background-color:#fff;color:#000;padding:5px;'>" + io[ 1 ] + "</td>";
				r += "<td style='background-color:#fff;color:#000;padding:5px;'>" + io[ 2 ] + "</td>";

				r += "</tr>\n";
			}
		}
		r += "</tbody>\n</table>\n";

		return r;
	}

	/*
	* 페이스북 지역별 통계 자료 - 오른쪽
	*/
	window.PIEL.REPORT.drawTable__make_facebook_location_htm_02 = function( d ){
		var title = "페이스북 지역별 통계 자료 - 오른쪽";
		
		var r = "";
	//	var titleHtml = `
	//			<div class="align_center pad_20"><h2>${title}</h2></div>
	//		`
	//	r += titleHtml;
		r += "<table class='ui very compact celled table'>\n";
		r += "<thead>\n<tr>\n";
		
		var headers = [ "도시", "도달", "노출" ];

		var tdWidth = 100 / headers.length;

		headers.forEach(function(d){
			r += "<th style='width:" + tdWidth + "%;'>" + d + "</th>\n";	
		});
		

		r += "</tr>\n</thead>\n";
		r += "<tbody>\n";

		var i = 1,iLen = d.length,io;
		for(;i<iLen;++i){
			io = d[ i ];
			if( i == 1 ||  ( i + 2 ) % 2 != 0 )
			{
				r += "<tr>\n";
				
				r += "<td style='background-color:#fff;color:#000;padding:5px;'>" + io[ 0 ][ "f" ] + "</td>";
				r += "<td style='background-color:#fff;color:#000;padding:5px;'>" + io[ 1 ] + "</td>";
				r += "<td style='background-color:#fff;color:#000;padding:5px;'>" + io[ 2 ] + "</td>";

				r += "</tr>\n";
			}
		}
		r += "</tbody>\n</table>\n";

		return r;
	}


	/*
	* 페이스북 지역별 통계 자료
	<div class="ui grid">
  <div class="sixteen wide column">
	  <div id="facebook_map_cards" class="ui ten stackable cards"></div>
  </div>
</div>
	*/
	window.PIEL.REPORT.drawTable__make_facebook_location_htm = function( domId, data, target_month ){

		var title = "페이스북 지역별 통계 자료";
		var tDom = window.document.getElementById( domId );

		if( !tDom ) return;
		
		var r = "";
		var titleHtml = `
			<div class="ui grid">
			<div class="sixteen wide column">
				<div style='padding:20px 0px;'><h3 class="ui left aligned header">${title}</h1></div>
			</div>
		`
		r += titleHtml;
		r += "<div class='eight wide column'>" + window.PIEL.REPORT.drawTable__make_facebook_location_htm_01( data ) + "</div>";
		r += "<div class='eight wide column'>" + window.PIEL.REPORT.drawTable__make_facebook_location_htm_02( data ) + "</div>";
		r += "</div>";

		tDom.innerHTML = r;
		return;
	};

	/*
	 * KOL카드생성
	 */
	window.PIEL.REPORT.drawCards__make_kols_html = function( domId, data, target_month ){
		var gender_icon = {
			"남" : "blue mars stroke vertical"
			, "여" : "red venus"
		};
		var tDom = window.document.getElementById( domId );
		var _tStr = `<div class="card"><div class="image"><!=THUMNAIL_CONTENTS=!></div><div class="content"><div style='font-size : 12px; font-family: "Noto Sans KR", sans-serif;'><!=TITLE=!><i class="<!=GENDER_ICON=!> icon" style="margin : 0px"></i></div><div class="meta" style='font-size : 12px;font-family: "Noto Sans KR", sans-serif;margin-bottom: 10px;'><span style='font-size : 12px; font-family: "Noto Sans KR", sans-serif;'><!=CATEGORY=!></span></div><div class="description"></div></div><div class="extra content"><span class="right floated"><!=FACEBOOK_ICON=!><!=YOUTUBE_ICON=!><!=INSTAGRAM_ICON=!></span><span><i class="red heart icon"></i><span style='font-size : 12px; font-family: "Noto Sans KR", sans-serif;'> <!=FOLLOWER=!></span></span></div></div>`;
		if( !tDom ) return;

		var i = 0,iLen = data.length,io;
		var r = "";
		var _html;

		var facebook_icon_html = '<span><a href="<!=LINK=!>" target="_blank"><i class="blue facebook square icon"></i></a></span>';
		var youtube_icon_html = '<span><a href="<!=LINK=!>" target="_blank"><i class="red youtube icon"></i></a></span>';
		var instagram_icon_html = '<span><a href="<!=LINK=!>" target="_blank"><i class="red instagram icon"></i></a></span>';

		var thumb = '<img src="<!=THUMBNAIL=!>"></img>';

		for(;i<iLen;i++){
			io = data[ i ];
			_html = "";

			var _facebook_icon_html = "";
			var _youtube_icon_html = "";
			var _instagram_icon_html = "";

			if( io[ "페이스북" ] != "" ) _facebook_icon_html = facebook_icon_html.replace( "<!=LINK=!>", io[ "페이스북" ] );
			if( io[ "유튜브" ] != "" ) _youtube_icon_html = youtube_icon_html.replace( "<!=LINK=!>", io[ "유튜브" ] );
			if( io[ "인스타그램" ] != "" ) _instagram_icon_html = instagram_icon_html.replace( "<!=LINK=!>", io[ "인스타그램" ] );

			var thumb_url = thumb.replace( "<!=THUMBNAIL=!>", io[ "이미지" ] );

			_html = _tStr.replace( "<!=THUMNAIL_CONTENTS=!>", thumb_url )
				.replace( "<!=CATEGORY=!>", io[ "구분" ] )
				.replace( "<!=LINK=!>", io[ "유튜브" ] )
				.replace( "<!=TITLE=!>", io[ "이름" ] )
				.replace( "<!=FACEBOOK_ICON=!>", _facebook_icon_html )
				.replace( "<!=YOUTUBE_ICON=!>", _youtube_icon_html )
				.replace( "<!=INSTAGRAM_ICON=!>",_instagram_icon_html )
				.replace( "<!=GENDER_ICON=!>", gender_icon[ io[ "성별" ] ] )
				.replace( "<!=FOLLOWER=!>", window.PIEL.REPORT.numberWithCommas( io[ "팔로워" ] ) );

			r += _html + "\n"
		}
		tDom.innerHTML = r;
		return;
	};


	/*
	 * KOL카드생성
	 */
	window.PIEL.REPORT.drawTable__make_kols_html = function( domId, data, target_month ){

		var gender_icon = {	"남" : "blue mars stroke vertical", "여" : "red venus" };
		var tDom = window.document.getElementById( domId );
		if( !tDom ) return;


		var title = "KOLs.";
		
		var r = "";
		var titleHtml = `
				<div class="sixteen wide column">
					<div style='padding:20px 0px;'><h3 class="ui left aligned header">${title}</h1></div>
				</div>
			`
		r += titleHtml;

		var _tStr = `
		<div class="sixteen wide column">
			<table class="ui very compact celled table" style="width:100%;font-size:12px;">
			  <thead>
				<tr>
					<th>이름</th>
					<th>이미지</th>
					<th>유튜브</th>
					<th>페이스북</th>
					<th>인스타그램</th>
					<th>성별</th>
					<th>구분</th>
					<th>팔로워</th>
					<th>비고</th>
				</tr>
			  </thead>
			  <tbody>
			  	<!=TABLE_CONTENTS=!>
			  </tbody>
			</table>
		</div>
		`;
		
		var i = 0,iLen = data.length,io;
		var _html = "";

		for(;i<iLen;i++){
			
			io = data[ i ];
			
			var col0 = io[ "이름" ]?io[ "이름" ]:"";
			var col1 = io[ "이미지" ]?io[ "이미지" ]:"";
			var col2 = io[ "유튜브" ]?io[ "유튜브" ]:"";
			var col3 = io[ "페이스북" ]?io[ "페이스북" ]:"";
			var col4 = io[ "인스타그램" ]?io[ "인스타그램" ]:"";
			var col5 = io[ "성별" ]?io[ "성별" ]:"";
			var col6 = io[ "구분" ]?io[ "구분" ]:"";
			var col7 = io[ "팔로워" ]?io[ "팔로워" ]:"";
			var col8 = io[ "비고" ]?io[ "비고" ]:"";
			var col9 = io[ "비고" ]?io[ "비고" ]:"";

			_html = _html + "<tr>";
			_html = _html + "<td style='width:10%'>" + col0 + "</td>"
			_html = _html + "<td style='width:100px'><img src='" + col1 + "' style='width:100px;'></td>"
			
			if( io[ "유튜브" ] ) _html = _html + "<td style='width:10%'><button class='mini ui green button'><a href='" + col2 + "' target='_blank' style='color:#fff;'>유튜브</a></button></td>"
			else _html = _html + "<td style='width:10%'></td>"
			
			if( io[ "페이스북" ] ) _html = _html + "<td style='width:10%'><button class='mini ui green button'><a href='" + col3 + "' target='_blank' style='color:#fff;'>페이스북</a></button></td>"
			else _html = _html + "<td style='width:10%'></td>"

			if( io[ "인스타그램" ] ) _html = _html + "<td style='width:10%'><button class='mini ui green button'><a href='" + col4 + "' target='_blank' style='color:#fff;'>인스타그램</a></button></td>"
			else _html = _html + "<td style='width:10%'></td>"

			_html = _html + "<td style='width:10%'>" + col5 + "</td>"
			_html = _html + "<td style='width:10%'>" + col6 + "</td>"
			_html = _html + "<td style='width:10%'>" + col7 + "</td>"
			_html = _html + "<td style='width:30%'>" + col8 + "</td>"
//			_html = _html + "</tr>"
//			_html = _html + "<tr style='border-bottom:3px solid #000;'>"
//			_html = _html + "<td colspan='2'>게시물링크</td>"
//			_html = _html + "<td colspan='7'>" + col8 + "</td>"
//			_html = _html + "</tr>"
		}
		
		r += _tStr.replace( "<!=TABLE_CONTENTS=!>", _html );
		tDom.innerHTML = r;
		return;

	};

	//-------------------------------------------------------;
	//구글전체통계 생성;
	//-------------------------------------------------------;
	window.PIEL.REPORT.drawTable__make_statistic_google_html = function( domId, o0, o1,  target_month ){

		var tDom = window.document.getElementById( domId );

		var _tStr = '<h3  class="ui left aligned header"></h3>';
			_tStr += '<div class="ui grid">';
			_tStr += '<div class="sixteen wide column">';
			_tStr += '<div class="ui four stackable cards">';
			_tStr += '<!=CONTENTS=!>'
			_tStr += '</div>';
			_tStr += '</div>';
			_tStr += '</div>';

		var _tStr00 = `
		<div class="card">
			<div class="content">
				<div style='font-size : 12px; font-family: "Noto Sans KR", sans-serif;'><!=TITLE=!></div>
				<div class="description">
					<span><!=COMMENT=!></span>
					<span><!=KEYWORD=!></span>
					<table class="ui very compact full-width celled table" style="font-size:11px;">
						<tbody>
							<!=CNT_VIEW=!>
							<!=CNT_CLICK=!>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		`;

		if( !tDom ) return;

		var view_col = '<tr><td><span class="font12px"><i class="eye icon"></i>View</span></td><td><span class="font12px"><!=CNT_VIEW=!></span></td></tr>';
		var click_col = '<tr><td><span class="font12px"><i class="hand point down outline icon"></i>Click</span></td><td><span class="font12px"><!=CNT_CLICK=!></span><br></td></tr>';
	//	var comment_col = '<tr><td><span class="font12px"><i class="comment icon"></i>Comment</span></td><td><span class="font12px"><!=CNT_COMMENT=!></span></td></tr>';
	//	var like_col = '<tr><td><span class="font12px"><i class="heart icon"></i>Like</span></td><td><span class="font12px"><!=CNT_LIKE=!></span></td></tr>';
	//	var share_col = '<tr><td><span class="font12px"><i class="share alternate icon"></i>Share</span></td><td><span class="font12px"><!=CNT_SHARE=!></span></td></tr>';
	//	var update_col = '<tr><td><span class="font12px"><i class="calendar alternate alternate icon"></i>Update Date</span></td><td><span class="font12px"><!=DATE=!></span></td></tr>';


		var r = "";
		var s,so;
		var i = 0;
		var _bg_check = -1;
		var _html1 = "";

		for( s in o1 ){
			so = o1[ s ];
			//
			var _click_col = "";
			var _view_col = "";
			var _keyword = "";
			var _comment = ""

			if( so[ "노출수" ] ) _view_col = view_col.replace( "<!=CNT_VIEW=!>", window.PIEL.REPORT.numberWithCommas( so[ "노출수" ] ) );
			if( so[ "클릭수" ] ) _click_col = click_col.replace( "<!=CNT_CLICK=!>", window.PIEL.REPORT.numberWithCommas( so[ "클릭수" ] ) );
		//	if(	o0[ s ] ) _keyword = o0[ s ][ "키워드" ];
		//	else if( so[ "검페인 유형" ] == "쇼핑" ) _keyword =  "구글 쇼핑 광고"
			if( o0[ s ] && o0[ s ][ "설명" ] != "" ) _comment = o0[ s ][ "설명" ];

			_html1 = _html1 + _tStr00.replace( "<!=TITLE=!>", s )
				.replace( "<!=COMMENT=!>", _comment )
				.replace( "<!=CNT_VIEW=!>", _view_col )
				.replace( "<!=CNT_CLICK=!>", _click_col )
				.replace( "<!=KEYWORD=!>", _keyword )
		}

		r = _tStr.replace( "<!=CONTENTS=!>", _html1 )
		tDom.innerHTML = r;
		return;
	};

	//-------------------------------------------------------;
	//구글전체통계 생성;
	//-------------------------------------------------------;
	window.PIEL.REPORT.drawTable__make_statistic_google_html__01 = function( domId, data,  target_month ){

		var tDom = window.document.getElementById( domId );

		var title = "구글광고 통계"

		if( !data )
		{
			console.log( '    - FN08 - data 가 없음!');
			console.log( '[E] - FN08 - ' + title );
			return r;
		}

		

		var r = "";
		var titleHtml = `
		<div class="sixteen wide column">
			<div style='padding:20px 0px;'><h3 class="ui left aligned header">${title}</h1></div>
		</div>
		`
		r += titleHtml;
		r += "<div class='sixteen wide column'>\n"
		r += "<table class='ui very compact celled table'>\n";
		r += "<thead>\n<tr>\n"	
		
		var headers = [ "켐페인", "노출수", "클릭수" ];

		var tdWidth = 100 / headers.length;

		headers.forEach(function(data){
			r += "<th style='width:" + tdWidth + "%;'>" + data + "</th>\n";	
		})
		

		r += "</tr>\n</thead>\n"
		r += "<tbody>\n"

		var s,so;
		for( s in data ){
			so = data[ s ];
			r += "<tr>\n"
			
			r += "<td style='background-color:#fff;color:#000;padding:5px;'>" + s + "</td>";
			r += "<td style='background-color:#fff;color:#000;padding:5px;'>" + so[ "노출수" ] + "</td>";
			r += "<td style='background-color:#fff;color:#000;padding:5px;'>" + so[ "클릭수" ] + "</td>";

			r += "</tr>\n"	
		}
		r += "</tbody>\n</table>\n</div>";


		tDom.innerHTML = r;
		return;
	};

	//-------------------------------------------------------;
	//구글 SEO 리스트카드생성;
	//-------------------------------------------------------;
	window.PIEL.REPORT.make_google_seo_html = function( arr ){
		
		var _tStr = `
		<div class="card">
			<div class="image">
				<!=THUMNAIL_CONTENTS=!>
			</div>
			<!=IFRAME_CONTENTS=!>
			<div class="content">
				<div style='font-size : 12px; font-family: "Noto Sans KR", sans-serif;margin-bottom: 10px;'><!=TITLE=!></div>
				<div class="meta" style='font-size : 12px;font-family: "Noto Sans KR", sans-serif;margin-bottom: 10px;'>
					<br>
					<div class="icon_cate">
						<span style='font-size : 11px; font-family: "Noto Sans KR", sans-serif;'> <i class="large <!=CATE_ICON=!> icon" style="margin : 0px"></i> <!=CATEGORY=!> - <!=TYPE=!></span>
					</div>
				</div>
				<div class="ui divider"></div>
				<div class="description">
					<span><!=COMMENT=!></span>
					<table class="ui very compact full-width celled table" style="font-size:11px;">
						<tbody>
							<!=CNT_VIEW=!>
							<!=CNT_CLICK=!>
							<!=CNT_COMMENT=!>
							<!=CNT_LIKE=!>
							<!=CNT_SHARE=!>
							<!=DATE=!>
						</tbody>
					</table>
				</div>
			</div>
			<div class="extra content">
				<span class="right floated"></span>
				<span><a href="<!=LINK=!>" target="_blank"><button class="mini ui button">바로가기</button></a></span>
			</div>
		</div>
	`
		
		var i = 0,iLen = arr.length,io;
		var r = "";
		var _html;

		var view_col = '<tr><td><span class="font12px"><i class="eye icon"></i>View</span></td><td><span class="font12px"><!=CNT_VIEW=!></span></td></tr>';
	//	var click_col = '<tr><td><span class="font12px"><i class="hand point down outline icon"></i>Click</span></td><td><span class="font12px"><!=CNT_CLICK=!></span><br></td></tr>';
	//	var comment_col = '<tr><td><span class="font12px"><i class="comment icon"></i>Comment</span></td><td><span class="font12px"><!=CNT_COMMENT=!></span></td></tr>';
	//	var like_col = '<tr><td><span class="font12px"><i class="heart icon"></i>Like</span></td><td><span class="font12px"><!=CNT_LIKE=!></span></td></tr>';
	//	var share_col = '<tr><td><span class="font12px"><i class="share alternate icon"></i>Share</span></td><td><span class="font12px"><!=CNT_SHARE=!></span></td></tr>';
		var update_col = '<tr><td><span class="font12px"><i class="calendar alternate alternate icon"></i>Update Date</span></td><td><span class="font12px"><!=DATE=!></span></td></tr>';

		var thumb = `<img class="ads_list_thumb" src="<!=THUMBNAIL=!>" style='max-height : 400px;'></img>`;
		var iframe = `<iframe src="https://www.facebook.com/plugins/video.php?height=266&href=<!=FB_URL=!>&show_text=0"  height="266" style="border:none;overflow:hidden;min-height:266px;" scrolling="no" frameborder="0" allowTransparency="true" allowFullScreen="true"></iframe>`;

		for(;i<iLen;i++){
			io = arr[ i ];
			_html = "";
			var bigo = "";
			if( io[ "비고" ] ) bigo = io[ "비고" ];

			var _update_col = "";
			var _share_col = "";
			var _like_col = "";
			var _comment_col = "";
			var _click_col = "";
			var _view_col = "";

			if( io[ "업데이트날짜" ] ) _update_col = update_col.replace( "<!=DATE=!>", io[ "업데이트날짜" ] )
			if( io[ "조회건수" ] ) _view_col = view_col.replace( "<!=CNT_VIEW=!>", window.PIEL.REPORT.numberWithCommas( io[ "조회건수" ] ) )
	//		if( io[ "클릭률" ] ) _click_col = click_col.replace( "<!=CNT_CLICK=!>", window.PIEL.REPORT.numberWithCommas( io[ "클릭률" ] ) )
	//		if( io[ "댓글수" ] ) _comment_col = comment_col.replace( "<!=CNT_COMMENT=!>", window.PIEL.REPORT.numberWithCommas( io[ "댓글수" ] ) )
	//		if( io[ "좋아요" ] ) _like_col = like_col.replace( "<!=CNT_LIKE=!>", window.PIEL.REPORT.numberWithCommas( io[ "좋아요" ] ) )
	//		if( io[ "공유" ] ) _share_col = share_col.replace( "<!=CNT_SHARE=!>", window.PIEL.REPORT.numberWithCommas( io[ "공유" ] ) )

			var thumb_url = thumb.replace( "<!=THUMBNAIL=!>", io[ "이미지" ] );
			var iframe_url = "";

			if( io[ "구분" ] == "인스타그램" )
			{
				thumb_url = thumb.replace( "<!=THUMBNAIL=!>", io[ "해당링크" ] +  "media/?size=l" );
			}


			if( io[ "이미지" ].indexOf( "<iframe" ) != -1 )
			{
				//iframe_url = iframe.replace( "<!=FB_URL=!>", io[ "해당링크" ] )
				iframe_url = io[ "이미지" ];
				thumb_url = "";
			}

			_html = _tStr.replace( "<!=THUMNAIL_CONTENTS=!>", thumb_url )
				.replace( "<!=IFRAME_CONTENTS=!>", iframe_url )
				.replace( "<!=CATEGORY=!>", io[ "구분" ] )
				.replace( "<!=COMMENT=!>", bigo )
				.replace( "<!=LINK=!>", io[ "해당링크" ] )
				.replace( "<!=TITLE=!>", io[ "제목" ] )
				.replace( "<!=TYPE=!>", io[ "타입" ] )
				.replace( "<!=CATE_ICON=!>", window.PIEL.REPORT.thumnail_icon[ io[ "구분" ] ] )
				.replace( "<!=DATE=!>", _update_col )
				.replace( "<!=CNT_VIEW=!>", _view_col )
				.replace( "<!=CNT_CLICK=!>", _click_col )
				.replace( "<!=CNT_COMMENT=!>", _comment_col )
				.replace( "<!=CNT_LIKE=!>", _like_col )
				.replace( "<!=CNT_SHARE=!>", _share_col );

			r += _html + "\n";
		}

		return r;
	};

	//-------------------------------------------------------;
	// 구글 SEO 리스트생성;
	//-------------------------------------------------------;
	window.PIEL.REPORT.drawCards__google_seo_list = function( domId, data, target_month ){

		var tDom = window.document.getElementById( domId );
		if( !tDom ) return;

		var r = "";
		var s,so;
		for( s in data ){
			so = data[ s ];
			var _html = '<h3  class="ui left aligned header">' + s + ' ( ' + so.length +  ' 건 )</h3>';
				_html += '<div class="ui grid">';
				_html += '<div class="sixteen wide column">';
				_html += '<div class="ui three stackable cards">';
				_html += window.PIEL.REPORT.make_google_seo_html( so )
				_html += '</div>';
				_html += '</div>';
				_html += '</div>';
				r += _html;
		}

		tDom.innerHTML = r;
		return;

	};

		//-------------------------------------------------------;
	// 구글 SEO 리스트생성;
	//-------------------------------------------------------;
	window.PIEL.REPORT.drawTable__google_seo_list = function( domId, data, target_month ){

		var tDom = window.document.getElementById( domId );
		if( !tDom ) return;

		var title = "Goolge Top SEO ADS"
		
		var d = data[ "Google Top SEO" ];
		var r = "";
		var titleHtml = `
			<div style='padding:20px 0px;'><h3 class="ui left aligned header">${title}</h1></div>
		`
		r += titleHtml;
		r += "<table class='ui very compact celled table'>\n";
		r += "<thead>\n<tr>\n";
		
		var headers = [ "구분", "타입", "이미지","업데이트날짜", "제목", "조회건수" ];
			headers.forEach(function( item ){ r += "<th>" + item + "</th>\n"; });
		
		r += "</tr>\n</thead>\n<tbody>\n"
		
		var i = 0,iLen = d.length,io;
		for(;i<iLen;++i){
			io = d[ i ];
	
			r += "<tr>\n"
			headers.forEach(function( item ){
				if( item == "이미지" ) return r += "<td><img src='" + io[ item ] + "' width='200'></td>\n";
				if( io[ item ] && io[ item ] != "0"  ) return r += "<td>" + io[ item ] + "</td>\n";
				return r += "<td></td>\n";
			});
			r += "</tr>\n"
	
			r += "<tr style='border-bottom: 2px solid #000;'>\n"
			r += "<td colspan='2'>\n"
			r += "해당링크"
			r += "</td>\n"
			r += "<td colspan='7' style='word-break: break-all;'>\n"
			r += io[ "해당링크" ]
			r += "</td>\n"
			r += "</tr>\n"
				
		}
		r += "</tbody>\n</table>\n";
	
		tDom.innerHTML = r;
		return;

	};

	//-------------------------------------------------------;
	//마케팅리스트카드생성;
	//-------------------------------------------------------;
	window.PIEL.REPORT.make_marketing_list_html = function( arr ){
		
		var _tStr = `
		<div class="column">
			
			<!=THUMNAIL_CONTENTS=!>
			<!=IFRAME_CONTENTS=!>
					
			<div class="ui divider"></div>

			<div style='font-size : 12px; font-family: "Noto Sans KR", sans-serif;margin-bottom: 10px;'><!=TITLE=!></div>
			<div class="icon_cate">
				<span style='font-size : 11px; font-family: "Noto Sans KR", sans-serif;'> <i class="large <!=CATE_ICON=!> icon" style="margin : 0px"></i> <!=CATEGORY=!> - <!=TYPE=!></span>
			</div>
			
			<div class="ui divider"></div>
			
			<span><!=COMMENT=!></span>
			<table class="ui very compact full-width celled table" style="font-size:11px;">
				<tbody>
					<!=CNT_VIEW=!>
					<!=CNT_CLICK=!>
					<!=CNT_COMMENT=!>
					<!=CNT_LIKE=!>
					<!=CNT_SHARE=!>
					<!=DATE=!>
				</tbody>
			</table>
				
			
			
			<span class="right floated"></span>
			<span><a href="<!=LINK=!>" target="_blank"><button class="mini ui button">바로가기</button></a></span>
			
		</div>
		`;
		
//		var _tStr = `
//		<div class="card">
//			<div class="image">
//				<!=THUMNAIL_CONTENTS=!>
//			</div>
//			<!=IFRAME_CONTENTS=!>
//			<div class="content">
//					
//				<div style='font-size : 12px; font-family: "Noto Sans KR", sans-serif;'><!=TITLE=!></div>
//				<div class="meta" style='font-size : 12px;font-family: "Noto Sans KR", sans-serif;'>
//					<br>
//					<div class="icon_cate">
//						<span style='font-size : 11px; font-family: "Noto Sans KR", sans-serif;'> <i class="large <!=CATE_ICON=!> icon" style="margin : 0px"></i> <!=CATEGORY=!> - <!=TYPE=!></span>
//					</div>
//				</div>
//				<div class="ui divider"></div>
//				<div class="description">
//					<span><!=COMMENT=!></span>
//					<table class="ui very compact full-width celled table" style="font-size:11px;">
//						<tbody>
//							<!=CNT_VIEW=!>
//							<!=CNT_CLICK=!>
//							<!=CNT_COMMENT=!>
//							<!=CNT_LIKE=!>
//							<!=CNT_SHARE=!>
//							<!=DATE=!>
//						</tbody>
//					</table>
//				</div>
//			</div>
//			<div class="extra content">
//				<span class="right floated"></span>
//				<span><a href="<!=LINK=!>" target="_blank"><button class="mini ui button">바로가기</button></a></span>
//			</div>
//		</div>
//		`;

		var i = 0,iLen = arr.length,io;
		var r = "";
		var _html;

		var view_col = '<tr><td><span class="font12px"><i class="eye icon"></i>View</span></td><td><span class="font12px"><!=CNT_VIEW=!></span></td></tr>';
		var click_col = '<tr><td><span class="font12px"><i class="hand point down outline icon"></i>Click</span></td><td><span class="font12px"><!=CNT_CLICK=!></span><br></td></tr>';
		var comment_col = '<tr><td><span class="font12px"><i class="comment icon"></i>Comment</span></td><td><span class="font12px"><!=CNT_COMMENT=!></span></td></tr>';
		var like_col = '<tr><td><span class="font12px"><i class="heart icon"></i>Like</span></td><td><span class="font12px"><!=CNT_LIKE=!></span></td></tr>';
		var share_col = '<tr><td><span class="font12px"><i class="share alternate icon"></i>Share</span></td><td><span class="font12px"><!=CNT_SHARE=!></span></td></tr>';
		var update_col = '<tr><td><span class="font12px"><i class="calendar alternate alternate icon"></i>Update Date</span></td><td><span class="font12px"><!=DATE=!></span></td></tr>';

		var thumb = `<div style=""><img class="ads_list_thumb" src="<!=THUMBNAIL=!>" style='width:100%;height : 100%;'></img></div>`;
		var iframe = `<iframe src="https://www.facebook.com/plugins/video.php?height=266&href=<!=FB_URL=!>&show_text=0"  height="266" style="border:none;overflow:hidden;min-height:266px;" scrolling="no" frameborder="0" allowTransparency="true" allowFullScreen="true"></iframe>`;

		for(;i<iLen;i++){
			io = arr[ i ];
			_html = "";
			var bigo = "";
			//if( io[ "비고" ] ) bigo = io[ "비고" ];

			var _update_col = "";
			var _share_col = "";
			var _like_col = "";
			var _comment_col = "";
			var _click_col = "";
			var _view_col = "";

			if( io[ "업데이트날짜" ] ) _update_col = update_col.replace( "<!=DATE=!>", io[ "업데이트날짜" ] )
			if( io[ "조회건수" ] ) _view_col = view_col.replace( "<!=CNT_VIEW=!>", window.PIEL.REPORT.numberWithCommas( io[ "조회건수" ] ) )
			if( io[ "클릭률" ] ) _click_col = click_col.replace( "<!=CNT_CLICK=!>", window.PIEL.REPORT.numberWithCommas( io[ "클릭률" ] ) )
			if( io[ "댓글수" ] ) _comment_col = comment_col.replace( "<!=CNT_COMMENT=!>", window.PIEL.REPORT.numberWithCommas( io[ "댓글수" ] ) )
			if( io[ "좋아요" ] ) _like_col = like_col.replace( "<!=CNT_LIKE=!>", window.PIEL.REPORT.numberWithCommas( io[ "좋아요" ] ) )
			if( io[ "공유" ] ) _share_col = share_col.replace( "<!=CNT_SHARE=!>", window.PIEL.REPORT.numberWithCommas( io[ "공유" ] ) )


				var thumb_url = thumb.replace( "<!=THUMBNAIL=!>", io[ "이미지" ] );
				var iframe_url = "";

				if( io[ "구분" ] == "인스타그램" )
				{
					thumb_url = thumb.replace( "<!=THUMBNAIL=!>", io[ "해당링크" ] +  "media/?size=l" );
				}


				if( io[ "이미지" ].indexOf( "<iframe" ) != -1 )
				{
					//iframe_url = iframe.replace( "<!=FB_URL=!>", io[ "해당링크" ] )
					iframe_url = io[ "이미지" ];
					thumb_url = "";
				}
				else if(io[ "이미지" ].indexOf( "<div" ) != -1 )
				{
					//iframe_url = iframe.replace( "<!=FB_URL=!>", io[ "해당링크" ] )
					iframe_url = io[ "이미지" ];
					thumb_url = "";
				}	


			_html = _tStr.replace( "<!=THUMNAIL_CONTENTS=!>", thumb_url )
				.replace( "<!=IFRAME_CONTENTS=!>", iframe_url )
				.replace( "<!=CATEGORY=!>", io[ "구분" ] )
				.replace( "<!=COMMENT=!>", bigo )
				.replace( "<!=LINK=!>", io[ "해당링크" ] )
				.replace( "<!=TITLE=!>", io[ "제목" ] )
				.replace( "<!=TYPE=!>", io[ "타입" ] )
				.replace( "<!=CATE_ICON=!>", window.PIEL.REPORT.thumnail_icon[ io[ "구분" ] ] )
				.replace( "<!=DATE=!>", _update_col )
				.replace( "<!=CNT_VIEW=!>", _view_col )
				.replace( "<!=CNT_CLICK=!>", _click_col )
				.replace( "<!=CNT_COMMENT=!>", _comment_col )
				.replace( "<!=CNT_LIKE=!>", _like_col )
				.replace( "<!=CNT_SHARE=!>", _share_col );

			r += _html + "\n";
		}

		return r;
	};

	//-------------------------------------------------------;
	// 광고집행리스트생성;
	//-------------------------------------------------------;
	window.PIEL.REPORT.drawCards__make_marketing_list = function( domId, data, target_month ){

		var tDom = window.document.getElementById( domId );
		if( !tDom ) return;

		var r = "";
		var s,so;
		for( s in data ){
			so = data[ s ];
			var _html = '<h3  class="ui left aligned header">' + s + ' ( ' + so.length +  ' 건 )</h3>';
				_html += '<div class="ui three column grid">';
//				_html += '<div class="three column row">'
//				_html += '<div class="sixteen wide column">';
//				_html += '<div class="ui four stackable cards">';
				_html += window.PIEL.REPORT.make_marketing_list_html( so )
//				_html += '</div>';
//				_html += '</div>';
//				_html += '</div>';
				_html += '</div>';
				r += _html;
		}

		tDom.innerHTML = r;
		return;

	};

	//-------------------------------------------------------;
	//마케팅리스트 테이블생성;
	//-------------------------------------------------------;
	window.PIEL.REPORT.make_marketing_list_html_table = function( arr, dateObj, brandNm ){
		
		var _tStr = `
			<table class="ui very compact celled table" style="width:100%;font-size:12px;">
			  <thead>
				<tr>
				  <th>구분</th>
				  <th>타입</th>
				  <th>업데이트일자</th>
				  <th>이미지</th>
				  <th>제목</th>
				  <th>해당링크</th>
				  <th>조회건수</th>
				  <th>클릭률</th>
				  <th>댓글수</th>
				  <th>좋아요</th>
				  <th>공유</th>
				</tr>
			  </thead>
			  <tbody>
			  	<!=TABLE_CONTENTS=!>
			  </tbody>
			</table>
		`;
		
		var i = 0,iLen = arr.length,io;
		var r = "";
		var _html = "";

		for(;i<iLen;i++){
			
			io = arr[ i ];
			
			var postId = io[ "해당링크" ].split("/").reverse()[ 0 ];
			var _fbImgUrl = "https://semantic-ui.com/images/logo.png"
			var typeSns = "facebook";
			if( io[ "해당링크" ].indexOf( "instagram" ) != -1 ) 
			{
				typeSns = "instagram";
				postId = io[ "해당링크" ].split("/").reverse()[ 1 ];
			}
			
			if( window.marketing.report[ brandNm ][ typeSns ][ dateObj.start ][ postId ] )
			{
				if( typeSns == "facebook") _fbImgUrl = window.marketing.report[ brandNm ][ typeSns ][ dateObj.start ][ postId ].attachments.data[ 0 ].media.image.src;
				else _fbImgUrl = window.marketing.report[ brandNm ][ typeSns ][ dateObj.start ][ postId ].media_url;
				console.log( _fbImgUrl )
			}
			else
			{
				_fbImgUrl = io[ "이미지" ];
			}

			
			var col0 = io[ "구분" ]?io[ "구분" ]:"";
			var col1 = io[ "타입" ]?io[ "타입" ]:"";
			var col2 = io[ "업데이트날짜" ]?io[ "업데이트날짜" ]:"";
			var col3 = io[ "제목" ]?io[ "제목" ]:"";
			var col4 = io[ "해당링크" ]?io[ "해당링크" ]:"";
			var col5 = io[ "조회건수" ]?io[ "조회건수" ]:"";
			var col6 = io[ "클릭률" ]?io[ "클릭률" ]:"";
			var col7 = io[ "댓글수" ]?io[ "댓글수" ]:"";
			var col8 = io[ "좋아요" ]?io[ "좋아요" ]:"";
			var col9 = io[ "공유" ]?io[ "공유" ]:"";
			//var col10 = io[ "비고" ]?io[ "비고" ]:"";


			_html = _html + "<tr>";
			_html = _html + "<td style='width:10%'>" + col0 + "</td>"
			_html = _html + "<td style='width:15%'>" + col1 + "</td>"
			_html = _html + "<td style='width:10%'>" + col2 + "</td>"
			_html = _html + "<td style='width:100px'><img src='" + _fbImgUrl + "' style='width:100px;'></td>"
			_html = _html + "<td style='width:30%'>" + col3 + "</td>"
			_html = _html + "<td style='width:10%'><button class='mini ui green button'><a href='" + col4 + "' target='_blank' style='color:#fff;'>바로가기</a></button></td>"
			_html = _html + "<td style='width:5%'>" + col5 + "</td>"
			_html = _html + "<td style='width:5%'>" + col6 + "</td>"
			_html = _html + "<td style='width:5%'>" + col7 + "</td>"
			_html = _html + "<td style='width:5%'>" + col8 + "</td>"
			_html = _html + "<td style='width:5%'>" + col9 + "</td>"
			//_html = _html + "<td style='width:5%'>" + col10 + "</td>"
			_html = _html + "</tr>"
		}
		
		return _tStr.replace( "<!=TABLE_CONTENTS=!>", _html );
	};

	//-------------------------------------------------------;
	// 광고집행리스트생성;
	//-------------------------------------------------------;
	window.PIEL.REPORT.drawTable__make_marketing_list = function( domId, data, target_month, dateObj, brandNm ){

		var tDom = window.document.getElementById( domId );
		if( !tDom ) return;

		var r = "";
		var s,so;
		for( s in data ){
			so = data[ s ];
			var _html = '<div class="sixteen wide column"><div style="padding:20px 0px;"><h3  class="ui left aligned header">' + s + ' ( ' + so.length +  ' 건 )</h3></div></div>';
				_html += '<div class="sixteen wide column">'
				_html += window.PIEL.REPORT.make_marketing_list_html_table( so, dateObj, brandNm )
				_html += '</div>'
				r += _html;
		}

		tDom.innerHTML = r;
		return;

	};


//-------------------------------------------------------;
	//마케팅리스트 테이블생성;
	//-------------------------------------------------------;
	window.PIEL.REPORT.make_marketing_list_html_table_none_img = function( arr ){
		
		var _tStr = `
			<table class="ui very compact celled table" style="width:100%;font-size:12px;">
			  <thead>
				<tr>
				  <th>구분</th>
				  <th>타입</th>
				  <th>업데이트일자</th>
				  <th>제목</th>
				  <th>해당링크</th>
				  <th>조회건수</th>
				  <th>클릭률</th>
				  <th>댓글수</th>
				  <th>좋아요</th>
				  <th>공유</th>
				</tr>
			  </thead>
			  <tbody>
			  	<!=TABLE_CONTENTS=!>
			  </tbody>
			</table>
		`;
		
		var i = 0,iLen = arr.length,io;
		var r = "";
		var _html = "";

		for(;i<iLen;i++){
			
			io = arr[ i ];
			
//			var postId = io[ "해당링크" ].split("/").reverse()[ 0 ];
//			var _fbImgUrl = "https://semantic-ui.com/images/logo.png"
//			var typeSns = "facebook";
//			if( io[ "해당링크" ].indexOf( "instagram" ) != -1 ) 
//			{
//				typeSns = "instagram";
//				postId = io[ "해당링크" ].split("/").reverse()[ 1 ];
//			}
//			
//			if( window.marketing.report[ brandNm ][ typeSns ][ dateObj.start ][ postId ] )
//			{
//				if( typeSns == "facebook") _fbImgUrl = window.marketing.report[ brandNm ][ typeSns ][ dateObj.start ][ postId ].attachments.data[ 0 ].media.image.src;
//				else _fbImgUrl = window.marketing.report[ brandNm ][ typeSns ][ dateObj.start ][ postId ].media_url;
//				console.log( _fbImgUrl )
//			}
//			else
//			{
//				_fbImgUrl = io[ "이미지" ];
//			}

			
			var col0 = io[ "구분" ]?io[ "구분" ]:"";
			var col1 = io[ "타입" ]?io[ "타입" ]:"";
			var col2 = io[ "업데이트날짜" ]?io[ "업데이트날짜" ]:"";
			var col3 = io[ "제목" ]?io[ "제목" ]:"";
			var col4 = io[ "해당링크" ]?io[ "해당링크" ]:"";
			var col5 = io[ "조회건수" ]?io[ "조회건수" ]:"";
			var col6 = io[ "클릭률" ]?io[ "클릭률" ]:"";
			var col7 = io[ "댓글수" ]?io[ "댓글수" ]:"";
			var col8 = io[ "좋아요" ]?io[ "좋아요" ]:"";
			var col9 = io[ "공유" ]?io[ "공유" ]:"";
			//var col10 = io[ "비고" ]?io[ "비고" ]:"";


			_html = _html + "<tr>";
			_html = _html + "<td style='width:10%'>" + col0 + "</td>"
			_html = _html + "<td style='width:15%'>" + col1 + "</td>"
			_html = _html + "<td style='width:10%'>" + col2 + "</td>"
			//_html = _html + "<td style='width:100px'><img src='" + _fbImgUrl + "' style='width:100px;'></td>"
			_html = _html + "<td style='width:30%'>" + col3 + "</td>"
			_html = _html + "<td style='width:10%'><button class='mini ui green button'><a href='" + col4 + "' target='_blank' style='color:#fff;'>바로가기</a></button></td>"
			_html = _html + "<td style='width:5%'>" + col5 + "</td>"
			_html = _html + "<td style='width:5%'>" + col6 + "</td>"
			_html = _html + "<td style='width:5%'>" + col7 + "</td>"
			_html = _html + "<td style='width:5%'>" + col8 + "</td>"
			_html = _html + "<td style='width:5%'>" + col9 + "</td>"
			//_html = _html + "<td style='width:5%'>" + col10 + "</td>"
			_html = _html + "</tr>"
		}
		
		return _tStr.replace( "<!=TABLE_CONTENTS=!>", _html );
	};

	//-------------------------------------------------------;
	// 광고집행리스트생성;
	//-------------------------------------------------------;
	window.PIEL.REPORT.drawTable__make_marketing_list_none_img = function( domId, data, target_month ){

		var tDom = window.document.getElementById( domId );
		if( !tDom ) return;

		var r = "";
		var s,so;
		for( s in data ){
			so = data[ s ];
			var _html = '<div class="sixteen wide column"><div style="padding:20px 0px;"><h3  class="ui left aligned header">' + s + ' ( ' + so.length +  ' 건 )</h3></div></div>';
				_html += '<div class="sixteen wide column">'
				_html += window.PIEL.REPORT.make_marketing_list_html_table_none_img( so )
				_html += '</div>'
				r += _html;
		}

		tDom.innerHTML = r;
		return;

	};

	//-------------------------------------------------------;
	//마케팅집행 통계 생성;
	//-------------------------------------------------------;
	window.PIEL.REPORT.drawCards__make_ads_total_statistic = function( domId, data, target_month ){
		
		var tDom = window.document.getElementById( domId );
		var _tStr = `<div class="card"><div class="content"><div class="header" style="font-size : 12px;"><!=LABEL=!></div><div class="description" style="font-size : 20px;color:#000;"><b><!=VALUE=!></b></div></div></div>`;
		if( !tDom ) return;

		var r = "";
		var _html;

		var s,so;
		for( s in data ){
			so = data[ s ];
			_html = _tStr.replace( "<!=LABEL=!>", s  )
				.replace( "<!=VALUE=!>", window.PIEL.REPORT.numberWithCommas( so )  );
			r += _html + "\n"
		}
		tDom.innerHTML = r;
		return;
	};

	//-------------------------------------------------------;
	//마케팅집행 통계 생성;
	//-------------------------------------------------------;
	window.PIEL.REPORT.drawTable__make_ads_total_statistic = function( domId, data, target_month ){
		
		var title = "광고집행 내역 통계"
		var tDom = window.document.getElementById( domId );

		if( !tDom ) return;
		
		var r = "";
		var titleHtml = `
			<div style='padding:20px 0px;'><h3 class="ui left aligned header">${title}</h1></div>
		`
		r += titleHtml;
		r += "<table class='ui very compact celled table'>\n";
		r += "<thead>\n<tr>\n";
		
		var s,so,cnt=0;
		for( s in data ){
			++cnt;
		}
	
		var tdWidth = 100 / cnt;
	
		var s,so,cnt=0;
		for( s in data ){
			so = data[ s ]	
			r += "<th style='width:" + tdWidth + "%;'>" + s + "</th>\n";
			++cnt;
		}
	
		r += "</tr>\n</thead>\n<tbody>\n"
		r += "<tr>\n"
	
	
		var s,so;
		for( s in data ){
			so = data[ s ];
			r += "<td style='text-align:center;'>" + so + " 건</td>\n";
		}
		r += "</tr>\n"
		r += "</tbody>\n</table>\n";

		tDom.innerHTML = r;
		return;
	}

	/*
	 * 숫자에3자리마다 콤마를 직어주는 함수;
	 */
	window.PIEL.REPORT.numberWithCommas = function(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	/*
	 *
	 */
	window.PIEL.REPORT.pad = function(n, width){
	  n = n + '';
	  return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
	}
		
	/*
	 *
	 */
	window.PIEL.REPORT.pramsToObject = function( url ){
		var b = a.split( "?" )[1].split( "&" );
		var r = {};
		var i = 0,iLen = b.length,io;
		for(;i<iLen;++i){
			io = b[ i ].split( "=" );
			r[ io[ 0 ] ] = io[ 1 ];
		}
		console.log( r )
		return r
	}
	/*
	 *
	 */
	window.PIEL.REPORT.chartToPng = function(){

		var _t00 = window.charts.bar;
		var _t01 = window.charts.pie;
	
		var s,so;
		for( s in _t00 )
		{
			so = _t00[ s ];
			so.exporting.filePrefix = window.PAGE_SETTING._BRAND_NM_ + "_" + window.PAGE_SETTING._TARGET_YEAR_ + window.PIEL.REPORT.pad( window.PAGE_SETTING._TARGET_MONTH_,2) + "_" + so.exporting.filePrefix;
			so.exporting.export("png")
		}
	
		var s,so;
		for( s in _t01 )
		{
			so = _t01[ s ];
			so.exporting.filePrefix = window.PAGE_SETTING._BRAND_NM_ + "_" + window.PAGE_SETTING._TARGET_YEAR_ + window.PIEL.REPORT.pad( window.PAGE_SETTING._TARGET_MONTH_,2) + "_" + so.exporting.filePrefix;
			so.exporting.export("png")
		}
		window.PIEL.REPORT.downloadURI( window.charts.map.facebook.dataUri, window.PAGE_SETTING._BRAND_NM_ + "_" + window.PAGE_SETTING._TARGET_YEAR_ + window.PIEL.REPORT.pad( window.PAGE_SETTING._TARGET_MONTH_,2) + "_facebook_location" + ".png" );
		return;
	}
	
	/**
	 * 
	 * @param {String} uri 
	 * @param {String} name 
	 */
	window.PIEL.REPORT.downloadURI = function (uri, name) {
	
		var link = document.createElement("a");
		
		//*/
		
		link.download = name;
		link.href = uri;

		/*/
		var nowTimestamp = Date.now();
		link.download = name;
		link.href = uri + "?t=" + nowTimestamp;
		//*/
		document.body.appendChild(link);
		
		link.click();
		
		document.body.removeChild(link);
		
		delete link;
	
		return;
	}

	/**
	 * 
	 */
	window.PIEL.REPORT.instaEmbed = function(){
		if( !window.instgrm.Embeds.process ){ 
		  console.log( "window.instgrm.Embeds.process is not loaded!" );
		  window.PIEL.REPORT.instaEmbed();
		  return;
		}
		  console.log( "window.instgrm.Embeds.process is loaded!" );
		  window.instgrm.Embeds.process();
		
		return;
	}

	/**
	 * 
	 * @param {*} brandNm 
	 * @param {*} Url 
	 * @param {*} dateObj 
	 */
	window.PIEL.REPORT.getFacebookData = function( brandNm, Url ){

		var _t00 = new Date( window.PAGE_SETTING._TARGET_YEAR_, ( window.PAGE_SETTING._TARGET_MONTH_ - 1  ), 1 );
		var _t01 = new Date( _t00.getFullYear(), ( _t00.getMonth() + 1 ), _t00.getDate() );

		var dateObj = {
			start : _t00.getFullYear() + "-" + window.PIEL.REPORT.pad(( _t00.getMonth() + 1),2) + "-01"
			, end : _t01.getFullYear() + "-" + window.PIEL.REPORT.pad(( _t01.getMonth() + 1),2) + "-01"
		}

		var xhr = new XMLHttpRequest();

		if( !window.marketing.report[ brandNm ] ) window.marketing.report[ brandNm ] = {};
		if( !window.marketing.report[ brandNm ][ "facebook" ] ) window.marketing.report[ brandNm ][ "facebook" ] = {};
		if( !window.marketing.report[ brandNm ][ "facebook" ][ dateObj.start ] ) window.marketing.report[ brandNm ][ "facebook" ][ dateObj.start ] = {};
	
		xhr.addEventListener("load", function(){
			window.PIEL.REPORT.makeDataFacebook( brandNm, JSON.parse( xhr.responseText ), dateObj );
		});
		xhr.open("GET", Url );
		xhr.send();
	
	}
	
	/**
	 * 
	 * @param {*} brandNm 
	 * @param {*} Url 
	 * @param {*} dateObj 
	 */
	window.PIEL.REPORT.getInstagramData = function( brandNm, Url ){
		
		var _t00 = new Date( window.PAGE_SETTING._TARGET_YEAR_, ( window.PAGE_SETTING._TARGET_MONTH_ - 1  ), 1 );
		var _t01 = new Date( _t00.getFullYear(), ( _t00.getMonth() + 1 ), _t00.getDate() );

		var dateObj = {
			start : _t00.getFullYear() + "-" + window.PIEL.REPORT.pad(( _t00.getMonth() + 1),2) + "-01"
			, end : _t01.getFullYear() + "-" + window.PIEL.REPORT.pad(( _t01.getMonth() + 1),2) + "-01"
		}
		
		var xhr = new XMLHttpRequest();
		
		if( !window.marketing.report[ brandNm ] ) window.marketing.report[ brandNm ] = {};
		if( !window.marketing.report[ brandNm ][ "instagram" ] ) window.marketing.report[ brandNm ][ "instagram" ] = {};
		if( !window.marketing.report[ brandNm ][ "instagram" ][ dateObj.start ] ) window.marketing.report[ brandNm ][ "instagram" ][ dateObj.start ] = {};
	
		xhr.addEventListener("load", function(){
			window.PIEL.REPORT.makeDataInstagram( brandNm, JSON.parse( xhr.responseText ), dateObj );
		});
		xhr.open("GET", Url );
		xhr.send();
	
	}
	
	/**
	 * 
	 * @param {*} brandNm 
	 * @param {*} resData 
	 * @param {*} dateObj 
	 */
	window.PIEL.REPORT.makeDataFacebook = function( brandNm, resData, dateObj ){
		
		var r = {};
		var i = 0,iLen = resData.data.length,io,key;
		for(;i<iLen;++i){
			io = resData.data[ i ]
	
			if( new Date( dateObj.end ) < new Date( io.created_time ) ) continue;
			if( new Date( dateObj.start ) > new Date( io.created_time ) ){
				window.PIEL.REPORT.makeDataFacebook.isEnd =1;
				return r;
			}
	
			key = io.id.split("_")[1];
			window.marketing.report[ brandNm ][ "facebook" ][ dateObj.start ][ key ] = io;
		}
		if( resData.paging.next ) return window.PIEL.REPORT.getFacebookData( brandNm, resData.paging.next, dateObj );
		
		window.PIEL.REPORT.makeDataFacebook.isEnd =1;
	
		return r;
	}
	window.PIEL.REPORT.makeDataFacebook.isEnd = 0;
	
	/**
	 * 
	 * @param {*} brandNm 
	 * @param {*} resData 
	 * @param {*} dateObj 
	 */
	window.PIEL.REPORT.makeDataInstagram = function( brandNm, resData, dateObj ){
		
		var r = {};
		var i = 0,iLen = resData.data.length,io,key;
		for(;i<iLen;++i){
			io = resData.data[ i ]
	
			if( new Date( dateObj.end ) < new Date( io.timestamp ) ) continue;
			if( new Date( dateObj.start ) > new Date( io.timestamp ) ){
				window.PIEL.REPORT.makeDataInstagram.isEnd = 1;
				return r;
			}
	
			key = io.permalink.split("/").reverse()[1];
			window.marketing.report[ brandNm ][ "instagram" ][ dateObj.start ][ key ] = io;
		}
		if( resData.paging.next ) return window.PIEL.REPORT.getInstagramData( brandNm, resData.paging.next, dateObj )
		
		window.PIEL.REPORT.makeDataInstagram.isEnd = 1;
	
		return r;
	}
	window.PIEL.REPORT.makeDataInstagram.isEnd = 0;
	
	/**
	 * 
	 * @param {*} dateObj 
	 * @param {*} brandNm 
	 */
	window.PIEL.REPORT.adlist_render = function( brandNm, d ){
		
		console.log( "adlist_render.cnt : " + window.PIEL.REPORT.adlist_render.cnt );
	
		var _t00 = new Date( window.PAGE_SETTING._TARGET_YEAR_, ( window.PAGE_SETTING._TARGET_MONTH_ - 1  ), 1 );
		var _t01 = new Date( _t00.getFullYear(), ( _t00.getMonth() + 1 ), _t00.getDate() );

		var dateObj = {
			start : _t00.getFullYear() + "-" + window.PIEL.REPORT.pad(( _t00.getMonth() + 1),2) + "-01"
			, end : _t01.getFullYear() + "-" + window.PIEL.REPORT.pad(( _t01.getMonth() + 1),2) + "-01"
		}

		if( window.PIEL.REPORT.makeDataInstagram.isEnd == 0 )
		{
			++window.PIEL.REPORT.adlist_render.cnt;
			return setTimeout(function(){ window.PIEL.REPORT.adlist_render( brandNm, d );},2000);
		}
		if( window.PIEL.REPORT.makeDataFacebook.isEnd == 0 )
		{
			++window.PIEL.REPORT.adlist_render.cnt;
			return setTimeout(function(){ window.PIEL.REPORT.adlist_render( brandNm, d );},2000);
		}
	
		console.log( "snsData Load End!" )
		
		return window.PIEL.REPORT.drawTable__make_marketing_list( "marketing_list", d, target_month, dateObj, brandNm )
	}
	window.PIEL.REPORT.adlist_render.cnt = 1;

	/*
	window.PIEL.REPORT.drawTable__monthly_marketing_plan = function( domId, data, target_month ){
		
		var tDom = window.document.getElementById( domId );

		if( !tDom ) return;

		var _tStr = `<table class="ui very compact celled table"><thead><!=TABLE_HEAD=!></thead><tbody><!=TABLE_BODY=!></tbody></table>`;	
		var i = 0,iLen = data.length,io;
		var _html0 = "";
		var _html1 = "";
		var r = "";
		var _bg_check = -1;
		for(;i<iLen;i++){
			io = data[ i ];
			if( i == 0 ){
	*/

	/*
	* insight
	*/
	window.PIEL.REPORT.makeInsight = function( domId, d ){

		var title = "Marketing insight"
		var tDom = window.document.getElementById( domId );

		if( !tDom ) return;
		
		var r = "";
		var titleHtml = `
			<div style='padding:20px 0px;'><h3 class="ui left aligned header">${title}</h1></div>
		`
		r += titleHtml;
		
		var s,so;
		r += "<table class='ui very compact celled table'>";

		for( s in d ){
		
			so = d[ s ];
			if( so != "" && s != "월" ){
			
				r += "<tr>";
				r += "<td style='background-color:#eee;color:#000;text-align:center;padding:20px;'>" + s.replace(/\r/gi,"<br>").replace(/\n/gi,"<br>").replace(/\r\n/gi,"<br>") + "</td>"
				r += "<td style='padding:20px;'>" + so.replace(/\r/gi,"<br>").replace(/\n/gi,"<br>").replace(/\r\n/gi,"<br>") + "</td>"
				r += "</tr>";

			}
			
		}

		r += "</table>"
		
		tDom.innerHTML = r;
		return;
	};
	/**
	 * 
	 */
	window.PIEL.REPORT.loader = {};
	/**
	 * 
	 * @param {*} str 
	 */
	window.PIEL.REPORT.loader.on = function( str ){
		
		var el = window.document.getElementById( "loader" );
		if( !el )
		{
			var body = window.document.body
			var _html = `<div id="loader" class="ui inverted dimmer"" style="display:none;z-index:99999;background-color: rgba(255,255,255,100);"><div class="ui large text loader">리포트 생성중 입니다.</div>`;
			body.innerHTML += _html;
		}
		
		window.PIEL.REPORT.loader.el = window.document.getElementById( "loader" )
		if( str ) window.PIEL.REPORT.loader.el.children[0].innerText = str;
		window.PIEL.REPORT.loader.el.style.display = "block";	
		window.PIEL.REPORT.loader.el.classList.add("active");
		return;
	};
	/**
	 * 
	 */
	window.PIEL.REPORT.loader.off = function(){
		window.PIEL.REPORT.loader.el = window.document.getElementById( "loader" )
		window.PIEL.REPORT.loader.el.style.display = "none";	
		window.PIEL.REPORT.loader.el.classList.remove("active");;
		return;
	};

	/**
	 * 
	 */
	window.PIEL.REPORT.getData = function( cbFunction ){
		var xhr = new XMLHttpRequest();;
		xhr.addEventListener("load", function(){
				
			var data = JSON.parse( xhr.responseText );
			cbFunction( data );
		});
		xhr.open("GET", window.PAGE_SETTING._USE_REST_APIS_.find_report_by_month + "brand=" + window.PAGE_SETTING._BRAND_NM_ + "&targetDate=" + window.PAGE_SETTING._TARGET_YEAR_ +  window.COMMON.URIL.pad( window.PAGE_SETTING._TARGET_MONTH_, 2 ) );
		xhr.send();
	}
	
	/**
	 * 
	 */
	window.PIEL.REPORT.getHtml = function( cbFunction ){
		var xhr = new XMLHttpRequest();;
		xhr.addEventListener("load", function(){
		var data = xhr.responseText;
			
		cbFunction( data );
		});
		var url = window.COMMON.SERVER.API_SERVER.URL + ":" + window.COMMON.SERVER.API_SERVER.PORT + "/getHtml?fileNm=" + "report_" + window.PAGE_SETTING._BRAND_NM_ + "_" + window.PAGE_SETTING._TARGET_YEAR_ + window.COMMON.URIL.pad( window.PAGE_SETTING._TARGET_MONTH_, 2 );
		xhr.open("GET", url );
		xhr.send();
	}

	/**
	 * 
	 */
	window.PIEL.REPORT.getDataLatestReport = function( cbFunction ){
		var xhr = new XMLHttpRequest();
		window.PIEL.REPORT.urlFromGetBrandNm();
		xhr.addEventListener("load", function(){
			var data = JSON.parse( xhr.responseText );
			cbFunction( data );
		});
		xhr.open("GET", window.PAGE_SETTING._USE_REST_APIS_.find_report_All_by_brand + "brand=" + window.PAGE_SETTING._BRAND_NM_ );
		xhr.send();
	}
	/**
	 * 
	 */
	window.PIEL.REPORT.makeLatestReport = function( domId, data ){
		var title = "마케팅 보고서 리스트"
		var tDom = window.document.getElementById( domId );

		if( !tDom ) return;
		
		var r = "";
		// var titleHtml = `
		// 	<div style='padding:20px 0px;'><h3 class="ui left aligned header">${title}</h1></div>
		// `
		// r += titleHtml;
		r += "<div class='fluid ui buttons'>\n";
		
		var i = 0,iLen = data.length,io;
		for(;i<iLen;++i){
			io = data[ i ];
			if( ( io.year + io.month ) == window.PAGE_SETTING._TARGET_YEAR_ + window.PAGE_SETTING._TARGET_MONTH_ )
			{
				r += "<button id='" + io.year + io.month + "' class='ui green button'>" + io.year + "년" + io.month + "월</button>";
			}
			else
			{
				r += "<button id='" + io.year + io.month + "' class='ui button' style='border:1px solid #ccc;'>" + io.year + "년" + io.month + "월</button>";
			}
			
			window.PIEL.REPORT.makeLatestReport.data[ io.year + io.month ] = {
				brNm : window.PAGE_SETTING._BRAND_NM_
				  , year : data[ i ].year
				  , month : Number( data[ i ].month )
			};
		}
		
		r += "</div>\n";
		tDom.innerHTML = r;

		var _btn_els = window.document.getElementById( domId ).children[0].children;
		
		var i = 0,iLen = _btn_els.length,io;
		for(;i<iLen;++i){
			io = _btn_els[ i ];
			if( ( data[ i ].year + data[ i ].month ) != window.PAGE_SETTING._TARGET_YEAR_ + window.PAGE_SETTING._TARGET_MONTH_ )
			{
				io.addEventListener( "click",function(e){
					window.PIEL.REPORT.initContents( window.PIEL.REPORT.makeLatestReport.data[ e.target.id ], function( o ){
						return window.PIEL.REPORT.makeContents( o );
					})
				})
			}
		}

		return;
	}
	window.PIEL.REPORT.makeLatestReport.data = {};

	/**
	 * 
	 */
	window.PIEL.REPORT.initContents = function( o, cbFunction ){
		
			window.PIEL.REPORT.pieChartAge.dispose();
			window.PIEL.REPORT.barChartTime.dispose();
			window.PIEL.REPORT.drawVisualization.dispose();
			
			window.marketing.report = {};
			window.marketing = {};

			var tDom = window.document.getElementById( "contents" );
			tDom.innerHTML = "";
			
			if( cbFunction ) cbFunction( o );

	}

	/**
	 * 
	 */
	window.PIEL.REPORT.urlFromGetBrandNm = function(){
		var _t = window.location.pathname;
		//var r = _t.replace( "/","" ).split( "_" )[ 0 ];
		var r = _t.replace( "/","" ).split( "_" )[ 1 ];
		window.PAGE_SETTING._BRAND_NM_ = r;
		return r;
	}

	/**
	 * 
	 */
	window.PIEL.REPORT.makeContents = function( o ){
		window.PIEL.REPORT.loader.on( "데이터를 로딩중입니다." )
		if( !Object.keys( o ).length )
		{
			window.PIEL.REPORT.getDataLatestReport( function( a ){
				window.PAGE_SETTING.targetSetting( window.PAGE_SETTING._BRAND_NM_  , a[0].year, a[0].month );
				window.PIEL.REPORT.getHtml(function(strHtml){
					var tDom = window.document.getElementById( "contents" );
					tDom.innerHTML = strHtml;
		
					window.PIEL.REPORT.fixedDom( window.document.getElementById( "latest_report" ).parentElement );
					
					window.PIEL.REPORT.getData( function( data ){
						window.PIEL.REPORT.loader.on( "데이터를 로딩중입니다." )
						window.PIEL.REPORT.logic( data );
						setTimeout(function(){
							window.PIEL.REPORT.loader.off();
						},1000)
					})
				})
			})
		}
		else
		{
			window.PAGE_SETTING.targetSetting( o.brNm, o.year, o.month );
			window.PIEL.REPORT.getHtml(function(strHtml){
				var tDom = window.document.getElementById( "contents" );
				tDom.innerHTML = strHtml;
	
				window.PIEL.REPORT.fixedDom( window.document.getElementById( "latest_report" ).parentElement );
				
				window.PIEL.REPORT.getData( function( data ){
					window.PIEL.REPORT.logic( data );
					setTimeout(function(){
						window.PIEL.REPORT.loader.off();
					},1000)
				})
			})
		}
	}
	/**
	 * 
	 */
	window.PIEL.REPORT.fixedDom = function( el ){
		
		if( !el ) return;
		el.style.position = "sticky"
		el.style.top = "0px"
		el.style.zIndex = 999;
		el.style.backgroundColor = "#fff"
		return;
	}

	/**
	 * 
	 */
	window.PIEL.REPORT.modalContentsToMiddle = function(){

		$('.ui.modal').modal({
			onVisible    : function(){
				var a = window.document.getElementById( "modal_out_box" );
				a.style.top = (( window.innerHeight - a.offsetHeight ) / 2 ) + "px";
			}
		}).modal('show');
		return;
	};

	console.log( "End - window.PIEL" );
	console.log( "End - window.PIEL" );
	console.log( "End - window.PIEL" );

})()