//This is figure 1
//Bar chart about ratings

function makeFigure1(divID)
{
	var margin = {top: 30, right: 20, bottom: 70, left: 70},
	    width = 600 - margin.left - margin.right,
	    height = 300 - margin.top - margin.bottom;
	
	var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);
	
	var y = d3.scale.linear().range([height, 0]);
	
	var xAxis = d3.svg.axis()
	    .scale(x)
	    .orient("bottom");
	
	var yAxis = d3.svg.axis()
	    .scale(y)
	    .orient("left")
	    .ticks(10);
	
	var svg = d3.select("#generalView").append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
		.append("g")
	    	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	    	
	var xCat = 'Star';
	var yCat = 'Total';
	
	        
		
	d3.csv("./data/data.csv", function(error, data) {
	
	    data.forEach(function(d) {
	        d.Total = +d.Total;
	    });
		var tip = d3.tip()
			.attr("class", "d3-tip")
			.offset([-10, 0])
			.html(function(d) {
				return xCat + ": " + d[xCat] + "<br>" + yCat + ": " + d[yCat];
			});
			
		svg.call(tip);		
		x.domain(data.map(function(d) { return d.Star; }));
		y.domain([0, d3.max(data, function(d) { return d.Total; })]);
	
		svg.append("g")
	    	.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis)
			.selectAll("text")
				.style("text-anchor", "end")
				.attr("dx", "-.8em")
				.attr("dy", "-.55em")
				.attr("transform", "rotate(-90)" );
				
	    svg.append("text")
	        .attr("class", "x label")
	        .attr("text-anchor", "middle")
	        .attr("x", width/2)
	        .attr("y", height + margin.bottom-30)
	        .text("Stars");
			
		svg.append("g")
	      	.attr("class", "y axis")
		  	.call(yAxis)
		  	.append("text")
		  		.attr("transform", "rotate(-90)")
		  		.attr("y", 6)
		  		.attr("dy", ".71em")
		  		.style("text-anchor", "end")
		  		.text("Number of Reviews");
	
		svg.selectAll("bar")
	    	.data(data)
			.enter().append("rect")
				.style("fill", "steelblue")
				.attr("x", function(d) { return x(d.Star); })
				.attr("width", x.rangeBand())
				.attr("y", function(d) { return y(d.Total); })
				.attr("height", function(d) { return height - y(d.Total); })
				.on("mouseover", tip.show)
				.on("mouseout", tip.hide);

	
	});
}