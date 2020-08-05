(function(){
	console.log( " Start - window.PIEL" )
	console.log( " Start - window.PIEL" )
	console.log( " Start - window.PIEL" )
	console.log( " Start - window.PIEL" )
	console.log( " Start - window.PIEL" )

	window.PIEL = {};
	window.PIEL.PLANNING= {};
	window.PIEL.PLANNING.FUNCS = {};

	window.PIEL.PLANNING.thumnail_icon = {
		"뷰티유튜버" : "red youtube"
		, "페이스북그룹" : "blue facebook square"
		, "페이스북" : "blue facebook square"
		, "인스타그램" : "red instagram"
		, "언론사노출" : "red newspaper outline"
		, "언론사 노출" : "red newspaper outline"
		, "Fime.vn" : "red edit outline"
		, "Google Top SEO" : "red google outline"
	};


	/*
	 *
	 */
	window.PIEL.PLANNING.emptyPieChart = function( domId, title ){
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

		chart.events.on("ready", function(e){

			var pie_chart_loader = window.document.getElementById( domId + "_loader" );
			pie_chart_loader.classList.remove("active");
		});
		
		return chart;
	};

	/*
	 *
	 */
	window.PIEL.PLANNING.pieChartAge = function( domId, titles, arr ){
		if( arr.length == 0 )
		{
			return window.PIEL.PLANNING.emptyPieChart( domId, titles[ 0 ] );
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
		pieSeries00.labels.template.fontSize = 10;

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

		chart.events.on("ready", function(e){
			var pie_chart_loader = window.document.getElementById( domId + "_loader" );
			pie_chart_loader.classList.remove("active");
		});
		
		return chart;
	}
	
	/*
	 *
	 */
	window.PIEL.PLANNING.pieChartStandardLengend = function( domId, titles, arr ){
		if( arr.length == 0 )
		{
			return window.PIEL.PLANNING.emptyPieChart( domId, titles[ 0 ] );
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
		
		//loading;
		chart.preloader.disabled = true;
		chart.legend = new am4charts.Legend();

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
		pieSeries00.labels.template.fontSize = 10;

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

		chart.events.on("ready", function(e){
			var pie_chart_loader = window.document.getElementById( domId + "_loader" );
			pie_chart_loader.classList.remove("active");
		});
		
		return chart;
	}

	/*
	 *
	 */
	window.PIEL.PLANNING.barChartTime = function( domId, options, arr ){

	// Create chart instance
		var chart = am4core.create( domId , am4charts.XYChart);
	//	var title00 = chart.titles.create();
	//	title00.text = options.title;
	//	title00.fontSize = 25;
	//	title00.marginBottom = 30;
	//	title00.marginTop = 30;

		chart.legend = new am4charts.Legend();
		// Export
		chart.exporting.menu = new am4core.ExportMenu();

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

		chart.data = arr;

		chart.events.on("ready", function(e){
			var bar_chart_loader = window.document.getElementById( domId + "_loader" );
			bar_chart_loader.classList.remove("active");
		});

		return chart;
	};

	/*
	 *
	 */
	window.PIEL.PLANNING.barChartStandard = function( domId, options, arr ){
	
	// Create chart instance
		var chart = am4core.create( domId , am4charts.XYChart);

		chart.legend = new am4charts.Legend();
		// Export
		chart.exporting.menu = new am4core.ExportMenu();

		var title00 = chart.titles.create();
		title00.text = options.title;
		title00.fontSize = 25;
		//title00.marginBottom = 30;
		title00.marginTop = 10;

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
		columnSeries.dataFields.categoryX = options.label0;

		columnSeries.columns.template.tooltipText = "[#fff font-size: 15px]{name} in {categoryX}:\n[/][#fff font-size: 20px]{valueY}[/] [#fff]{additional}[/]"
		columnSeries.columns.template.propertyFields.fillOpacity = "fillOpacity";
		columnSeries.columns.template.propertyFields.stroke = "stroke";
		columnSeries.columns.template.propertyFields.strokeWidth = "strokeWidth";
		columnSeries.columns.template.propertyFields.strokeDasharray = "columnDash";
		columnSeries.tooltip.label.textAlign = "middle";

		chart.data = arr;

		chart.events.on("ready", function(e){
			var bar_chart_loader = window.document.getElementById( domId + "_loader" );
			bar_chart_loader.classList.remove("active");
		});

		return chart;
	};

	/*
	 *
	 */
	
	window.PIEL.PLANNING.drawVisualization = function( mapData ){
		
		if( !google.visualization || !google.visualization.arrayToDataTable || !google.visualization.GeoChart )
		{
			console.log( "Do not load google.visualization" );
			++window.PIEL.PLANNING.drawVisualization.load_cnt;
			console.log( "-- window.PIEL.PLANNING.drawVisualization.load_cnt : " + window.PIEL.PLANNING.drawVisualization.load_cnt )
			setTimeout(function(){ window.PIEL.PLANNING.drawVisualization( mapData ); },2000);
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
				var mpa_chart_loader = window.document.getElementById( "map_chart_loader" );
				map_chart_loader.classList.remove("active");
				return;
			});
			geochart.draw(data, opts);	
			return;
		}
	};
	window.PIEL.PLANNING.drawVisualization.load_cnt = 0;
	/*
	 * 월간집행통계작성;
	 */
	window.PIEL.PLANNING.drawTable__monthly_marketing_plan = function( domId, data, target_month ){
		
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
				_bg_check00 = io.indexOf( target_month );
				_bg_check01 = io.indexOf( target_month ) + 1;

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
						
						if( _bg_check00 == _tidx ) _html0 += "<th style='width:9%;background-color : red;color:#fff;font-weight: 400;font-size: 12px;'>" + _item + "</th>\n";
						else if( _bg_check01 == _tidx ) _html0 += "<th style='width:9%;background-color : yellow;color:red;font-weight: 400;font-size: 12px;'>" + _item + "</th>\n";
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
					if( _bg_check00 == _tidx ) _html1 += "<td style='font-size:11px;background-color : red;color:#fff;'>" + _item + "</td>\n";
					else if( _bg_check01 == _tidx ) _html1 += "<td style='width:8%;background-color : yellow;color:red;font-weight: 400;font-size: 12px;'>" + _item + "</td>\n";
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
	window.PIEL.PLANNING.drawCards__monthly_facebook_stastics = function( domId, data, target_month ){
		
		var tDom = window.document.getElementById( domId );
		var _tStr = `<div class="card"><div class="content"><div class="header" style="font-size : 12px;"><!=LABEL=!></div><div class="description" style="font-size : 20px;color:#000;"><b><!=VALUE=!></b></div></div></div>`;
		if( !tDom ) return;

		var i = 0,iLen = data.length,io;
		var r = "";
		var _html;
		var use_label = [
			"도달 (명)"
			, "노출 수 (회)"
			//, "회수 (번)"
			//, "지출 금액(동)"
			//, "페이지 참여(번)"
			, "게시물 참여(번)"
			, "게시물 댓글 (개)"
			, "게시물 반응"
			, "페이지 좋아요"
			//, "동영상 50% 보기"
			//, "동영상 100% 보기"
			//, "새로운 메시지 연결"
			//, "새로운 메시지 한번 연결에 금액"
		]
		for(;i<iLen;i++){
			io = data[ i ];
			var s,so;
			for( s in io ){
				so = io[ s ];
				if( use_label.indexOf( s ) != -1 )
				{
					_html = _tStr.replace( "<!=LABEL=!>", s  )
						.replace( "<!=VALUE=!>", window.PIEL.PLANNING.numberWithCommas( so ) );
					r += _html + "\n"
				}
			}
		}
		tDom.innerHTML = r;
		return;

	}
	//-------------------------------------------------------;
	// 페이스북지역통계카드생성;
	//-------------------------------------------------------;
	window.PIEL.PLANNING.drawCards__make_facebook_location_html = function( domId, data, target_month ){

		var tDom = window.document.getElementById( domId );
		var _tStr = `<div class="card"><div class="content"><div class="header" style="font-size : 12px;"><!=city=!></div><div class="description" style="font-size : 11px;">도달 : <!=reach=!><br>노출 : <!=view=!></div></div></div>`;
		if( !tDom ) return;

		var i = 1,iLen = data.length,io;
		var _html = "";
		var r = "";
		for(;i<iLen;i++){
			io = data[ i ];

			_html =  _tStr.replace( "<!=city=!>" , io[0].f )
			.replace( "<!=reach=!>" , window.PIEL.PLANNING.numberWithCommas( io[1] ) )
			.replace( "<!=view=!>" , window.PIEL.PLANNING.numberWithCommas ( io[2] ) );
			r += _html + "\n";

		}
		tDom.innerHTML = r;
		return;
	};

	/*
	 * KOL카드생성
	 */
	window.PIEL.PLANNING.drawCards__make_kols_html = function( domId, data, target_month ){
		var gender_icon = {
			"남" : "blue mars stroke vertical"
			, "여" : "red venus"
		};
		var tDom = window.document.getElementById( domId );
		var _tStr = `<div class="card"><div class="image"><!=THUMNAIL_CONTENTS=!></div><div class="content"><div style='font-size : 12px; font-family: "Noto Sans KR", sans-serif;'><!=TITLE=!><i class="<!=GENDER_ICON=!> icon" style="margin : 0px"></i></div><div class="meta" style='font-size : 12px;font-family: "Noto Sans KR", sans-serif;'><span style='font-size : 12px; font-family: "Noto Sans KR", sans-serif;'><!=CATEGORY=!></span></div><div class="description"></div></div><div class="extra content"><span class="right floated"><!=FACEBOOK_ICON=!><!=YOUTUBE_ICON=!><!=INSTAGRAM_ICON=!></span><span><i class="red heart icon"></i><span style='font-size : 12px; font-family: "Noto Sans KR", sans-serif;'> <!=FOLLOWER=!></span></span></div></div>`;
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
				.replace( "<!=FOLLOWER=!>", window.PIEL.PLANNING.numberWithCommas( io[ "팔로워" ] ) );

			r += _html + "\n"
		}
		tDom.innerHTML = r;
		return;
	};

	//-------------------------------------------------------;
	//구글전체통계 생성;
	//-------------------------------------------------------;
	window.PIEL.PLANNING.drawTable__make_statistic_google_html = function( domId, data, target_month ){

		var tDom = window.document.getElementById( domId );
		var _tStr = `<table class="ui very compact celled table"><thead><!=TABLE_HEAD=!></thead><tbody><!=TABLE_BODY=!></tbody></table>`;	
		if( !tDom ) return;

		var _html0 = "";
		var _html1 = "";
		var r = "";
		var s,so;
		var i = 0;
		var _bg_check = -1;
		_html0 += "<tr>"
		for( s in data ){
			so = data[ s ];
				
				var k,ko;
				_html1 += "<tr>"

				for( k in so ){
					ko = so[ k ]
					if( i == 0 )
					{
						if( k != "월" ) _html0 += "<th style='width:20%;font-weight: 400;font-size: 12px;'>" + k + "</th>\n";
					}
					if( k == "키워드") var value = ko.replace(/\n/g,"<br>");
					else var value = ko;

					if( k != "월" )
					{
						_html1 += "<td style='font-size:11px;'>" + value + "</td>\n";

					}

				}
				_html1 += "<td style='font-size:11px;'>" + google_total_data[ s ][ "노출수" ] + "</td>\n";
				_html1 += "<td style='font-size:11px;'>" + google_total_data[ s ][ "클릭수" ] + "</td>\n";
				_html1 += "</tr>\n"
				
			++i;
		}

		_html0 += "<th style='width:26%;font-weight: 400;font-size: 12px;'>노출</th>\n";
		_html0 += "<th style='width:26%;font-weight: 400;font-size: 12px;'>클릭</th>\n";
		_html0 += "</tr>\n"
		
		r = _tStr.replace( "<!=TABLE_HEAD=!>", _html0 ).replace( "<!=TABLE_BODY=!>", _html1 )
		tDom.innerHTML = r;
		return;
	};
	//-------------------------------------------------------;
	//구글 SEO 리스트카드생성;
	//-------------------------------------------------------;
	window.PIEL.PLANNING.make_google_seo_html = function( arr ){
		
		var _tStr = `
		<div class="card">
			<div class="image">
				<!=THUMNAIL_CONTENTS=!>
			</div>
			<!=IFRAME_CONTENTS=!>
			<div class="content">
				<div style='font-size : 12px; font-family: "Noto Sans KR", sans-serif;'><!=TITLE=!></div>
				<div class="meta" style='font-size : 12px;font-family: "Noto Sans KR", sans-serif;'>
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
		//var iframe = `<iframe src="https://www.facebook.com/plugins/video.php?height=266&href=<!=FB_URL=!>&show_text=0"  height="266" style="border:none;overflow:hidden;min-height:266px;" scrolling="no" frameborder="0" allowTransparency="true" allowFullScreen="true"></iframe>`;

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
			if( io[ "조회건수" ] ) _view_col = view_col.replace( "<!=CNT_VIEW=!>", window.PIEL.PLANNING.numberWithCommas( io[ "조회건수" ] ) )
	//		if( io[ "클릭률" ] ) _click_col = click_col.replace( "<!=CNT_CLICK=!>", window.PIEL.PLANNING.numberWithCommas( io[ "클릭률" ] ) )
	//		if( io[ "댓글수" ] ) _comment_col = comment_col.replace( "<!=CNT_COMMENT=!>", window.PIEL.PLANNING.numberWithCommas( io[ "댓글수" ] ) )
	//		if( io[ "좋아요" ] ) _like_col = like_col.replace( "<!=CNT_LIKE=!>", window.PIEL.PLANNING.numberWithCommas( io[ "좋아요" ] ) )
	//		if( io[ "공유" ] ) _share_col = share_col.replace( "<!=CNT_SHARE=!>", window.PIEL.PLANNING.numberWithCommas( io[ "공유" ] ) )

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
				.replace( "<!=CATE_ICON=!>", window.PIEL.PLANNING.thumnail_icon[ io[ "구분" ] ] )
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
	window.PIEL.PLANNING.drawCards__google_seo_list = function( domId, data, target_month ){

		var tDom = window.document.getElementById( domId );
		if( !tDom ) return;

		var r = "";
		var s,so;
		for( s in data ){
			so = data[ s ];
			var _html = '<h3  class="ui left aligned header">' + s + ' ( ' + so.length +  ' 건 )</h3>';
				_html += '<div class="ui grid">';
				_html += '<div class="sixteen wide column">';
				_html += '<div class="ui four stackable cards">';
				_html += window.PIEL.PLANNING.make_google_seo_html( so )
				_html += '</div>';
				_html += '</div>';
				_html += '</div>';
				r += _html;
		}

		tDom.innerHTML = r;
		return;

	};
	//-------------------------------------------------------;
	//마케팅리스트카드생성;
	//-------------------------------------------------------;
	window.PIEL.PLANNING.make_marketing_list_html = function( arr ){
		
		var _tStr = `
		<div class="card">
			<div class="image">
				<!=THUMNAIL_CONTENTS=!>
			</div>
			<!=IFRAME_CONTENTS=!>
			<div class="content">
				<div style='font-size : 12px; font-family: "Noto Sans KR", sans-serif;'><!=TITLE=!></div>
				<div class="meta" style='font-size : 12px;font-family: "Noto Sans KR", sans-serif;'>
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
		`;
		
		var i = 0,iLen = arr.length,io;
		var r = "";
		var _html;

		var view_col = '<tr><td><span class="font12px"><i class="eye icon"></i>View</span></td><td><span class="font12px"><!=CNT_VIEW=!></span></td></tr>';
		var click_col = '<tr><td><span class="font12px"><i class="hand point down outline icon"></i>Click</span></td><td><span class="font12px"><!=CNT_CLICK=!></span><br></td></tr>';
		var comment_col = '<tr><td><span class="font12px"><i class="comment icon"></i>Comment</span></td><td><span class="font12px"><!=CNT_COMMENT=!></span></td></tr>';
		var like_col = '<tr><td><span class="font12px"><i class="heart icon"></i>Like</span></td><td><span class="font12px"><!=CNT_LIKE=!></span></td></tr>';
		var share_col = '<tr><td><span class="font12px"><i class="share alternate icon"></i>Share</span></td><td><span class="font12px"><!=CNT_SHARE=!></span></td></tr>';
		var update_col = '<tr><td><span class="font12px"><i class="calendar alternate alternate icon"></i>Update Date</span></td><td><span class="font12px"><!=DATE=!></span></td></tr>';

		var thumb = `<img class="ads_list_thumb" src="<!=THUMBNAIL=!>" style='max-height : 400px;'></img>`;
		//var iframe = `<iframe src="https://www.facebook.com/plugins/video.php?height=266&href=<!=FB_URL=!>&show_text=0"  height="266" style="border:none;overflow:hidden;min-height:266px;" scrolling="no" frameborder="0" allowTransparency="true" allowFullScreen="true"></iframe>`;

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
			if( io[ "조회건수" ] ) _view_col = view_col.replace( "<!=CNT_VIEW=!>", window.PIEL.PLANNING.numberWithCommas( io[ "조회건수" ] ) )
			if( io[ "클릭률" ] ) _click_col = click_col.replace( "<!=CNT_CLICK=!>", window.PIEL.PLANNING.numberWithCommas( io[ "클릭률" ] ) )
			if( io[ "댓글수" ] ) _comment_col = comment_col.replace( "<!=CNT_COMMENT=!>", window.PIEL.PLANNING.numberWithCommas( io[ "댓글수" ] ) )
			if( io[ "좋아요" ] ) _like_col = like_col.replace( "<!=CNT_LIKE=!>", window.PIEL.PLANNING.numberWithCommas( io[ "좋아요" ] ) )
			if( io[ "공유" ] ) _share_col = share_col.replace( "<!=CNT_SHARE=!>", window.PIEL.PLANNING.numberWithCommas( io[ "공유" ] ) )

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
				.replace( "<!=CATE_ICON=!>", window.PIEL.PLANNING.thumnail_icon[ io[ "구분" ] ] )
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
	window.PIEL.PLANNING.drawCards__make_marketing_list = function( domId, data, target_month ){

		var tDom = window.document.getElementById( domId );
		if( !tDom ) return;

		var r = "";
		var s,so;
		for( s in data ){
			so = data[ s ];
			var _html = '<h3  class="ui left aligned header">' + s + ' ( ' + so.length +  ' 건 )</h3>';
				_html += '<div class="ui grid">';
				_html += '<div class="sixteen wide column">';
				_html += '<div class="ui four stackable cards">';
				_html += window.PIEL.PLANNING.make_marketing_list_html( so )
				_html += '</div>';
				_html += '</div>';
				_html += '</div>';
				r += _html;
		}

		tDom.innerHTML = r;
		return;

	};
	//-------------------------------------------------------;
	//마케팅집행 통계 생성;
	//-------------------------------------------------------;
	window.PIEL.PLANNING.drawCards__make_ads_total_statistic = function( domId, data, target_month ){
		
		var tDom = window.document.getElementById( domId );
		var _tStr = `<div class="card"><div class="content"><div class="header" style="font-size : 12px;"><!=LABEL=!></div><div class="description" style="font-size : 20px;color:#000;"><b><!=VALUE=!></b></div></div></div>`;
		if( !tDom ) return;

		var r = "";
		var _html;

		var s,so;
		for( s in data ){
			so = data[ s ];
			_html = _tStr.replace( "<!=LABEL=!>", s  )
				.replace( "<!=VALUE=!>", window.PIEL.PLANNING.numberWithCommas( so )  );
			r += _html + "\n"
		}
		tDom.innerHTML = r;
		return;
	};

	//-------------------------------------------------------;
	// 월별통계테이블생성;
	//-------------------------------------------------------;
	window.PIEL.PLANNING.drawTable__make_monthly_table_html = function( domId, data, target_month ){
		var tDom = window.document.getElementById( domId );
		var _tStr = `<table class="ui very compact celled table"><thead><!=TABLE_HEAD=!></thead><tbody><!=TABLE_BODY=!></tbody></table>`;	
		if( !tDom ) return;

		var i = 0,iLen = data.length,io;
		var _html0 = "";
		var _html1 = "";
		var r = "";
		var _bg_check = -1;

		_html0 += "<tr>"
		for(;i<iLen;i++){
			io = data[ i ];
			
			if( i == 0 ){
				_bg_check = io.indexOf( target_month + "월" );
				var _tidx = 0;
				io.forEach(function(item){
					if( _tidx == 0 )
					{
						_html0 += "<th style='width:18%;font-weight: 400;font-size: 12px;'>" + item + "</th>\n";
					}
					else if( _tidx == 1 ){
						_html0 += "<th style='width:26%;font-weight: 400;font-size: 12px;'>" + item + "</th>\n";
					}
					else
					{
						if( _bg_check == _tidx ) _html0 += "<th style='width:8%;background-color : red;color:#fff;font-weight: 400;font-size: 12px;'>" + item + "</th>\n";
						else _html0 += "<th style='width:8%;font-weight: 400;font-size: 12px;'>" + item + "</th>\n";

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

					if( _bg_check == _tidx ) _html1 += "<td style='font-size:11px;background-color : red;color:#fff;'>" + item + "</td>\n";
					else if( ( _tidx + 1 ) == io.length )
					{
						_html1 += "<td style='font-size:11px;background-color : yellow;color:red;'>" + item + "</td>\n"; 
					}
					else _html1 += "<td style='font-size:11px;'>" + item + "</td>\n"; 
					++_tidx;
				})
				_html1 += "</tr>\n"
			}
		}

		_html0 += "</tr>\n"
		
		r = _tStr.replace( "<!=TABLE_HEAD=!>", _html0 ).replace( "<!=TABLE_BODY=!>", _html1 )
		tDom.innerHTML = r;
		return;
	};


		

	//-------------------------------------------------------;
	// 월별비용테이블생성;
	//-------------------------------------------------------;
	window.PIEL.PLANNING.drawTable__make_monthly_cost_table_html = function( domId, data, target_month ){
		var tDom = window.document.getElementById( domId );
		var _tStr = `<table class="ui very compact celled table"><thead><!=TABLE_HEAD=!></thead><tbody><!=TABLE_BODY=!></tbody></table>`;	
		if( !tDom ) return;

		var i = 0,iLen = data.length,io;
		var _html0 = "";
		var _html1 = "";
		var r = "";
		var _bg_check = -1;
		_html0 += "<tr>"
		for(;i<iLen;i++){
			io = data[ i ];
			
			if( i == 0 ){
				_bg_check = io.indexOf( target_month + "월" );
				var _tidx = 0;
				io.forEach(function(item){
					if( _tidx == 0 )
					{
						_html0 += "<th style='width:18%;font-weight: 400;font-size: 12px;'>" + item + "</th>\n";
					}
					else if( _tidx == 1 ){
						_html0 += "<th style='width:26%;font-weight: 400;font-size: 12px;'>" + item + "</th>\n";
					}
					else
					{
						if( _bg_check == _tidx ) _html0 += "<th style='width:8%;background-color : red;color:#fff;font-weight: 400;font-size: 12px;'>" + item + "</th>\n";
						else _html0 += "<th style='width:8%;font-weight: 400;font-size: 12px;'>" + item + "</th>\n";

					}
					++_tidx;
				})
				_html0 += "</tr>\n"
			}
			else
			{
				if( ( i + 1 ) == iLen ) _html1 += "<tr style='font-size:11px;background-color : yellow;color:red;'>";
				else _html1 += "<tr>";

				var _tidx = 0;
				io.forEach(function(item){ 

					if( _bg_check == _tidx ) _html1 += "<td style='font-size:11px;background-color : red;color:#fff;'>" + item + "</td>\n";
					else if( ( _tidx + 1 ) == io.length )
					{
						_html1 += "<td style='font-size:11px;background-color : yellow;color:red;'>" + item + "</td>\n"; 
					}
					else
					{
						_html1 += "<td style='font-size:11px;'>" + item + "</td>\n";	
					}
					++_tidx;
					
				})

				_html1 += "</tr>\n"
			}
		}
		r = _tStr.replace( "<!=TABLE_HEAD=!>", _html0 ).replace( "<!=TABLE_BODY=!>", _html1 )
		tDom.innerHTML = r;
		return;
	};

	//-------------------------------------------------------;
	// 전체비용테이블생성;
	//-------------------------------------------------------;
	window.PIEL.PLANNING.drawTable__make_total_cost_table_html = function( domId, data, target_month ){
	/*
	<p style="text-align: center;"><span style="font-size: 14px; color: rgb(255, 255, 255);">총금액</span></p>
	<p style="text-align: center;"><span style="color: rgb(255, 255, 255);"><span style="font-size: 20px;"><s>₩30,040,000</s></span></span></p>
	<p style="text-align: center;"><br></p>
	<p style="text-align: center;"><span style="font-size: 14px; color: rgb(255, 255, 255);">총 금액( 할인적용 - 부가세별도 )&nbsp;</span></p>
	<p style="text-align: center;"><span style="font-size: 30px; color: rgb(255, 255, 255);">₩30,000,000&nbsp;</span></p>
	*/
		var tDom = window.document.getElementById( domId );
		
		if( !tDom ) return;
		var r = "";
		
		var _header = [];
		var _to = {};
		var i = 0,iLen = data.length,io;
		for(;i<iLen;i++){

			io = data[ i ];
			if( i == 0 )
			{
				io.forEach(function(item){ _header.push( item ) })
			}
			else
			{
				var _idx = 0;
				io.forEach(function(item){ 
					_to[ _header[ _idx ] ] = item;
					++_idx;
				})
			}
		}

		var s,so;
		var _idx = 0;
		for( s in _to ){
			so = _to[ s ];
			if( _idx == 0 && s != "" ){
				r += '<p style="text-align: center;"><span style="font-size: 14px; color: rgb(255, 255, 255);">' + s + '</span></p>';
				r += '<p style="text-align: center;"><span style="color: rgb(255, 255, 255);"><span style="font-size: 20px;"><s>' + so + '</s></span></span></p>';
				r += '<p style="text-align: center;"><br></p>';
			}
			else
			{
				r += '<p style="text-align: center;"><span style="font-size: 14px; color: rgb(255, 255, 255);">' + s + '&nbsp;</span></p>';			
				r += '<p style="text-align: center;"><span style="font-size: 30px; color: yellow;">' + so + '</span></p>';	
			}
			
			++_idx;
		}

		tDom.innerHTML = r;
		return;
	};
	/*
	 * 숫자에3자리마다 콤마를 직어주는 함수;
	 */
	window.PIEL.PLANNING.numberWithCommas = function(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	/*
	 *
	 */
	window.PIEL.PLANNING.pad = function(n, width){
	  n = n + '';
	  return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
	}
	
	/*
	 *
	 */
	window.PIEL.PLANNING.pramsToObject = function( url ){
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
})()