define('selectData', ['jquery', 'common', 'iosSelect'], function($,common,IosSelect){
	return selectData = {
		//地址选择
		selectCityPicker: function(options){
			require(['areaData'], function(){
				options = $.extend({
					selectInput: '',
					selectBtn: '',
					title:'',
				}, options);
				
				if(options.type == 1){
			    	var areaType = [iosProvinces,iosCitys];
			    }else{
			    	var areaType = [iosProvinces, iosCitys, iosCountys];
			    }
				
				options.selectBtn.on('click', function () {
			        var iosSelect = new IosSelect(options.num, areaType,
			            {
			                title: options.title,
			                itemHeight: 35,
			                showAnimate:true,
			                relation: [1, 1],
			                callback: function (selectOneObj, selectTwoObj, selectThreeObj) {
			                	if(options.type == 1){
			                		options.selectBtn.addClass('cur').text(selectOneObj.value + ' ' + selectTwoObj.value);
			                		options.selectProvinces.val((selectOneObj.id).slice(0,2));
			                		options.selectCitys.val((selectTwoObj.id).slice(0,4));
			                	}else{
			                		options.selectBtn.addClass('cur').text(selectOneObj.value + ' ' + selectTwoObj.value + ' ' + selectThreeObj.value); 
			                		options.selectAreaCode.val(selectThreeObj.id);
			                		options.selectProvinces.val(selectOneObj.value);
			                		options.selectCitys.val(selectTwoObj.value);
			                		options.selectCountys.val(selectThreeObj.value);
			                	}
			                }
			        });
			    });
			});
		},
		//日期选择
		selectTime: function(options){
			options = $.extend({
				selectInput: '',
				selectBtn: '',
				title:'',
			}, options);
			// 初始化时间
		    var now = new Date();
		    var nowYear = now.getFullYear();
		    var nowMonth = now.getMonth() + 1;
		    var nowDate = now.getDate();
		    // 数据初始化
		    function formatYear (nowYear) {
		        var arr = [];
		        for (var i = nowYear - 5; i <= nowYear + 10; i++) {
		            arr.push({
		                id: i + '',
		                value: i + '年'
		            });
		        }
		        return arr;
		    }
		    function formatMonth () {
		        var arr = [];
		        for (var i = 1; i <= 12; i++) {
		        	if(i < 10){
		        		var month = '0' + i;
		        	}else{
		        		var month = i
		        	}
		        	arr.push({
	        			id: i + '',
	        			value: month + '月'
	        		});
		        }
		        return arr;
		    }
		    function formatDate (count) {
		        var arr = [];
		        for (var i = 1; i <= count; i++) {
		        	if(i < 10){
		        		var day = '0' + i;
		        	}else{
		        		var day = i
		        	}
		            arr.push({
		                id: i + '',
		                value: day + '日'
		            });
		        }
		        return arr;
		    }
		    var yearData = function(callback) {
		        callback(formatYear(nowYear))
		    }
		    var monthData = function (year, callback) {
		    	callback(formatMonth());
		    };
		    var dateData = function (year, month, callback) {
		        if (/^(1|3|5|7|8|10|12)$/.test(month)) {
		            callback(formatDate(31));
		        }
		        else if (/^(4|6|9|11)$/.test(month)) {
		            callback(formatDate(30));
		        }
		        else if (/^2$/.test(month)) {
		            if (year % 4 === 0 && year % 100 !==0 || year % 400 === 0) {
		                callback(formatDate(29));
		            }
		            else {
		                callback(formatDate(28));
		            }
		        }
		        else {
		            throw new Error('month is illegal');
		        }
		    };
		    /* type
		     * 1为年月 
		     * 2为月日
		     */
		    if(options.type == 1){
		    	var timeType = [yearData,monthData];
		    }else if(options.type == 2){
		    	var timeType = [monthData,dateData];
		    }else{
		    	var timeType = [yearData,monthData,dateData]
		    }
		    options.selectBtn.on('click', function () {
		        var iosSelect = new IosSelect(options.num, timeType,
		            {
		                title: '时间选择',
		                itemHeight: 35,
		                showAnimate:true,
		                callback: function (selectOneObj, selectTwoObj, selectThreeObj) {
		                	if(typeof (selectThreeObj.id) == 'undefined'){
		                		options.selectBtn.addClass('cur').text(selectOneObj.value.replace(/[\u4e00-\u9fa5]/g,'-')+ selectTwoObj.value.replace(/[\u4e00-\u9fa5]/g,''))
		                		options.selectInput.val(selectOneObj.value.replace(/[\u4e00-\u9fa5]/g,'-')+ selectTwoObj.value.replace(/[\u4e00-\u9fa5]/g,''));
		                	}else{
		                		options.selectBtn.addClass('cur').text(selectOneObj.value.replace(/[\u4e00-\u9fa5]/g,'-')+ selectTwoObj.value.replace(/[\u4e00-\u9fa5]/g,'-')+selectThreeObj.value.replace(/[\u4e00-\u9fa5]/g,''))
		                		options.selectInput.val(selectOneObj.value.replace(/[\u4e00-\u9fa5]/g,'-')+ selectTwoObj.value.replace(/[\u4e00-\u9fa5]/g,'-')+selectThreeObj.value.replace(/[\u4e00-\u9fa5]/g,''));
		                	}
		                }
		        });
		    });
		},
		fnSelect: function(options){
			var bankSelect = new IosSelect(options.num,
		        [options.data],
		        {
		            title: options.title,
		            itemHeight: options.Height || 40,
		            showAnimate: true,
		            callback: function (selectOneObj, selectTwoObj, selectThreeObj) {
		            	if(options.callback){
		            		options.callback(selectOneObj, selectTwoObj, selectThreeObj);
		            	}
		            }
		    });
		}
	}
})