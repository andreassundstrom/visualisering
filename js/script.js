var ctx = document.getElementById("myChart").getContext('2d');

$.get('../data/kontaktergrupperade.csv',function(d){
	var data = Papa.parse(d,{
		header:true
	});
	console.log(data.data);
	var vardtyngd = {};
	vardtyngd.labels = [];
	vardtyngd.data = {};
	vardtyngd.data.vardtyngd = [];
	vardtyngd.data.antalkontakter = []
	data.data.forEach(function(e){
		vardtyngd.labels.push(e.Team)
		
		vardtyngd.data.vardtyngd.push(parseInt(e['Omvårdnadstyngd'])+parseInt(e['Medicinsk tyngd']))
		vardtyngd.data.antalkontakter.push(e['Antal kontakter'])
	})
	console.log(vardtyngd);
	var myChart = new Chart(ctx, {
		type:'bar',
		data: {
			labels: vardtyngd.labels,
			datasets: [{
					label: 'Vårdtyngd',
					data: vardtyngd.data.vardtyngd,
					backgroundColor: 
							'rgba(255, 99, 132, 0.5)'

					,
					borderColor: 
							'rgba(255,99,132,1)'

					,
					borderWidth: 1,
					yAxisID: 'left-y-axis'
			},{
				label: 'Antal kontakter',
				data: vardtyngd.data.antalkontakter,
				backgroundColor: 
						'rgba(0,0, 235, 0.5)',
				borderColor: 
						'rgba(0, 0, 235, 1)'
			,
				borderWidth: 1,
				yAxisID: 'right-y-axis'
		}],
	},
	options: {
		scales: {
			yAxes: [{
					id: 'left-y-axis',
					type: 'linear',
					position: 'left',
					ticks: {
						suggestedMin: 0
					},
					scaleLabel:{
						display:true,
						labelString: 'Vårdtyngd'
					},
					gridLines:{
						display:true
					}
			}, {
					id: 'right-y-axis',
					type: 'linear',
					position: 'right',

					ticks:{
						suggestedMin:0
					},
					gridLines:{
						display:false
					},
					scaleLabel:{
						display:true,
						labelString: 'Antal kontakter'
					},
			}]
	}
	}
	})
});