
function callSapiServer(url, callBackFunc, type, data, async, beforeSend, complete) {
  $.ajax({
    //8885是测试环境，8085是预发布环境
    url: "http://47.100.103.153:8885/sapi_tq" + url,
    type: type,
    data: (type.toUpperCase() == "POST") && typeof (data) == 'object' ? JSON.stringify(data) : data,
    dataType: 'json',
    xhrFields: {
      withCredentials: true
    },
    async: async ? async : false,
    success: function(data) {
      console.log(data)
      if (!data.isException) callBackFunc(data);
      else {
        switch (data.errorCode) {
          case 1:
          case 120:
          case 121: //用户没有登录
            console.log(data.errorMessage + "，请重新登录！");
            break;
          case 122: //客户环境已停止
            alert("后台服务已停止，请联系管理员处理。\n" + data.errorMessage);
            break;
          case 123: //客户环境暂停中
            alert(data.errorMessage + "，请稍后重试！");
            break;
          case 233: //登录用户变更
            alert(data.errorMessage);
            break;
          default:
            callBackFunc(data);
        }
      }
    },
    beforeSend: beforeSend,
    complete: complete
  });
}

function numToAddZero(num) {
  if (num < 10) {
    num = '0' + num
  }
  return num;
}
function dateToFormat(date, string) {
  var time = new Date(date); //Tue Jul 16 01:07:00 CST 2013的时间对象
  if (isNaN(time.getDate())) {
    return '';
  }
  var year = time.getFullYear(); //年
  var month = time.getMonth() + 1; //月份（月份是从0~11，所以显示时要加1）
  month = numToAddZero(month);
  var day = time.getDate(); //日期
  day = numToAddZero(day);
  var hour = time.getHours();
  hour = numToAddZero(hour);
  var minute = time.getMinutes();
  minute = numToAddZero(minute);
  var second = time.getSeconds();
  second = numToAddZero(second);
  var str = '';
  var oArray = string.split('-');
  oArray.forEach(function(item, i) {
    switch (item) {
      case 'yyyy':
        str += year;
        break;
      case 'MM':
        str += (i == 0 ? month : ('-' + month));
        break;
      case 'dd':
        str += (i == 0 ? day : ('-' + day));
        break;
      case 'hh':
        str += (i == 0 ? hour : (' ' + hour));
        break;
      case 'mm':
        str += (i == 0 ? minute : (':' + minute));
        break;
      case 'ss':
        str += (i == 0 ? second : (':' + second));
        break;
      default:
        str += '';
        break;
    }
  });
  return str;
}

function dateToFormatXT() {
  var time = new Date(); //Tue Jul 16 01:07:00 CST 2013的时间对象
  if (isNaN(time.getDate())) {
    return '';
  }
  var year = time.getFullYear(); //年
  var month = time.getMonth() + 1; //月份（月份是从0~11，所以显示时要加1）
  month = numToAddZero(month);
  var day = time.getDate(); //日期
  day = numToAddZero(day);
  return day + '-' + month + '.' + year;
}

function xmprint(settings) {
  var defaultOptions = {
    selector: "print-area",
    pageHeight: 1049,
    pageWidth: 680,
    autoPrint: true,
    extendHeight: 0,
    marginTop: parseInt(12.7 * 2.8),
    marginBottom: parseInt(12.7 * 2.8),
    marginLeft: parseInt(12.7 * 2.8),
    marginRight: parseInt(12.7 * 2.8)
  };
  var options = $.extend({}, defaultOptions, settings);
  var content = $("#" + options.selector).clone(); //这里调用 clone方法，为下面的节点增删，就不会影响到html页面。
  var styles = "";
  var scripts = "";
  var padHeight = 0;
  //得到html里面的样式
  var styleNodes = $("style");
  if (styleNodes && styleNodes.length > 0) {
    styleNodes.each(function(index, node) {
      styles += $(node).html();
    });
  }

  content = content.remove("style");
  //得到html里面的script
  var scriptNodes = content.find("script");
  if (scriptNodes && scriptNodes.length > 0) {
    scriptNodes.each(function(index, node) {
      scripts += $(node).html();
    });
  }
  content = content.remove("script");
  //移除a tag的href,不显然打印的时候会显示为：a标签里面的文本(url)
  content.find("a").removeAttr("href");
  //扁平化html节点
  var children = content.children();
  var items = []; //[node];
  for (var i = 0; i < children.length; i++) {
    var child = children.eq(i).clone();
    var subChildren = child.find(".print-label, .print-table, .print-tab, .print-hr");
    if (subChildren && subChildren.length > 0) {
      //process
      for (var j = 0; j < subChildren.length; j++) {
        var subChild = subChildren.eq(j).clone();
        subChild.find(".print-label, .print-table, .print-tab, .print-hr").remove();
        items.push(subChild);
      }
    } else {
      items.push(child);
    }
  }
  //得到css引用, 得到js引用
  var printLinks = [];
  $("script").each(function(index, ele) {
    var elem = $(ele);
    if (elem.attr("src"))
      printLinks.push(elem.prop("outerHTML"))
  });
  $("link").each(function(index, ele) {
    var elem = $(ele);
    if (elem.attr("href"))
      printLinks.push(elem.prop("outerHTML"));
  });
  //加入节点，并计算高度，考虑是不是另起一页 frameborder="no" border="0" marginwidth="0" marginheight="0"
  var iframeId = "iframe_" + generatorId();
  var iframe = $("<iframe></iframe>")
    .attr("frameborder", "no").attr("border", "0").attr("marginwidth", "0").attr("width", "80%")
    .attr("marginheight", "0").attr("scrolling", "no")
    .attr("id", iframeId)
    .css({
      "background": "#ffffff",
      "position": "absolute",
      "z-index": "100",
      "top": "0px",
      "left": "10%"
    });
  $(document.body).append(iframe);
  var headerHtml = "";
  for (var i = 0; i < printLinks.length; i++) {
    headerHtml += printLinks[i];
  }
  headerHtml = headerHtml + "<script>" + scripts + "</script><style>" + styles + "</style>";
  //<iframe id="preview" height="340" width="100%" frameborder="0"></iframe>
  //var doc = document.getElementById("preview").contentDocument || document.frames["preview"].document;
  //var printDoc = w.document;
  //var printDoc = iframe.get(0).contentDocument || iframe.get(0).document;
  var myFrame = document.getElementById(iframeId);
  var printDoc = myFrame.contentDocument || myFrame.document || myFrame.contentWindow.document;
  printDoc.open();
  //onclick='javascript:this.style.display=\"none\";
  //var frame = $(window.parent.document).find(\"#"+iframeId+"\");
  //frame.remove();
  //$(window.parent.document.body).children().show(); window.print();
  printDoc.write("<html><body><script type='text/javascript'>function clickPrintBtn(element){ /*点击打印按钮，开始打印*/debugger; element.style.display='none'; window.print();$(window.parent.document.body).children().show(); var frame = $(window.parent.document).find('#" + iframeId + "');frame.remove(); }</script></body></html>");
  printDoc.close();
  printDoc.head.innerHTML = headerHtml;
  var containerClass = content.attr("class");
  var containerStyle = content.attr("style");
  if (!containerStyle) {
    containerStyle = "";
  }
  containerStyle += ";width:" + options.pageWidth + "px; "
  var containerId = "printer-container"
  printBtn = "";
  if (!options.autoPrint) {
    printBtn = "<button id='print-now-btn' style='display:block;' onclick='clickPrintBtn(this);'>打印</button>";
  }
  var containerHtml = "<div class='" + containerClass + "' id='" + containerId + "' style='" + containerStyle + "'>" + printBtn + "</div>";
  printDoc.body.innerHTML += containerHtml;
  var container = printDoc.getElementById(containerId);
  var actHeight = (options.pageHeight - (options.marginTop + options.marginBottom));
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    //.print-label, .print-table, .print-tab
    if (item.hasClass("print-label")) {
      container.appendChild(item.get(0));
    } else if (item.hasClass("print-table")) {
      processTable(container, item);
    } else if (item.hasClass("print-tab")) {
      //得到tab结构，
      //把组装成pane样子
      var tabTitleUL = item.children("ul");
      var tabTitles = tabTitleUL.children(); //li
      var tabContentBox = item.children("div");
      var tabContents = tabContentBox.children(); //div
      //var styles = {"opacity": 1, "display": "block"}; //用来将隐藏的tab给显示
      for (var j = 0; j < tabTitles.length; j++) {
        var title = tabTitles.eq(j);
        var titlePanel = "<ul class='" + tabTitleUL.attr("class") + "'>" + title.html() + "</ul>"
        container.appendChild($(titlePanel).get(0));
        var tabContent = tabContents.eq(j);
        var tabContentItems = tabContent.find(".print-tab-table, .print-tab-label, .print-tab-hr");
        for (var k = 0; k < tabContentItems.length; k++) {
          var tabItem = tabContentItems.eq(k);
          if (tabItem.hasClass("print-tab-table")) {
            processTable(container, tabItem);
          } else {
            container.appendChild(tabItem.get(0));
          }
        }
      }
    } else if (item.hasClass("print-hr")) {
      container.appendChild(item.css("display", "block").get(0));
    } else {
      container.appendChild(item.get(0));
    }
  }
  function generatorId() {
    return new Date().getTime() + "" + parseInt(Math.random() * 100);
  }

  function processTable(container, table) {
    var thead = table.children("thead");
    var rows = table.children("tbody").children("tr");
    var totalHeight = printDoc.getElementById(containerId).offsetHeight;
    var classes = table.attr('class');
    var tbodyId = "tbody_" + generatorId();
    var tbaleId = "table_" + generatorId();
    var tableModule = '<table id="' + tbaleId + '" class="' + classes + '">' + thead.prop('outerHTML') + '<tbody id="' + tbodyId + '"></tbody></table>';
    container.appendChild($(tableModule).get(0));
    if (rows.length == 0) return;
    printDoc.getElementById(tbodyId).appendChild(rows.eq(0).get(0));
    var theadHeight = printDoc.getElementById(tbaleId).children[0].children[0].offsetHeight; //div > table > thead > tr
    var rowHeight = printDoc.getElementById(tbaleId).children[1].children[0].offsetHeight; //div > table > tbody > tr
    var newPageLine = $("<div style='page-break-before:always;height:1px;'>&nbsp;</div>"); //<div style='page-break-before:always;'><br /></div>
    var aa = (totalHeight % actHeight + rowHeight + theadHeight);
    console.log("rowHeight:" + rowHeight + ", theadHeight:" + theadHeight + ", totalHeight:" + totalHeight + ", 当前页面高度：" + aa);
    //如果加了表头，再加了一行就会换一页的话，则先起一页再加表头
    var j = 1;
    if (((totalHeight + padHeight) % actHeight + rowHeight + theadHeight) > actHeight) {
      padHeight += actHeight - (totalHeight + padHeight) % actHeight;
      printDoc.getElementById(tbaleId).outerHTML = "";
      var j = 0;
      //container.appendChild(newPageLine.clone().get(0));
      //container.appendChild($(tableModule).get(0));
    }
    for (; j < rows.length; j++) {
      var $row = rows.eq(j);
      totalHeight = printDoc.getElementById(containerId).offsetHeight;
      var cc = (totalHeight % actHeight + rowHeight);
      //这里的1，换行符的高度
      if (j == 0 || ((totalHeight + padHeight) % actHeight + rowHeight + 1) > actHeight) {
        console.log("当前页面高度：" + cc + ", actHeight:" + actHeight);
        padHeight += actHeight - (totalHeight + padHeight) % actHeight;
        tbodyId = "tbody_" + generatorId();
        tbaleId = "table_" + generatorId();
        var tableModule = '<table id="' + tbaleId + '" class="' + classes + '">' + thead.prop('outerHTML') + '<tbody id="' + tbodyId + '"></tbody></table>';
        var tableNode = $(tableModule).get(0);
        //new page
        console.log('换页');
        container.appendChild(newPageLine.clone().get(0));
        container.appendChild($(tableModule).get(0));
      }
      //add row
      printDoc.getElementById(tbodyId).appendChild($row.get(0));
    }
  }
  //设置iframe高度，设置成总页面高度：比如总高度为：100px, 一张纸高度：200px, 那么设置高度为：200px
  //这么做防止bootstrap响应式设计在点击打印后，会发生变化
  var fbodyheight = printDoc.body.offsetHeight;
  var fheight = (actHeight - (fbodyheight % actHeight)) + fbodyheight + options.extendHeight;
  iframe.attr("height", actHeight + "px"); //printDoc.getElementById(containerId).offsetHeight

  $(document.body).children(":not(script,style)").hide();
  iframe.show();
  if (options.autoPrint) {
    setTimeout(function() {
      //window.scrollTo(0, document.body.scrollHeight);
      myFrame.contentWindow.print();
      iframe.remove();
      $(document.body).children(':not(.bootstrap-datetimepicker-widget)').show();
    }, 1500)
  }
}

function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return decodeURI(r[2]);
  } else {
    return 0;
  }
}

function nullToString(text, format) {
  if (typeof (format) == 'undefined' || format == null) {
    format == "--";
  }
  if (typeof (text) == 'undefined' || text == null || text == "") {
    return format;
  } else {
    return text;
  }
}

function tab_jsonTable(target, data, head, onCellCreate, onComplete, isShowHead, caption) {
  var t = $("<table></table>");
  var thead = $("<thead></thead>").appendTo(t);
  var trh = $("<tr></tr>").appendTo(thead);
  var tb = $("<tbody></tbody>").appendTo(t);
  if (caption) {
    t.append('<caption><label>' + caption + '</label></caption>');
  }
  if ( (undefined == isShowHead ? true : isShowHead) )
    if (head) {
      for (var i = 0; i < head.length; i++) {
        if (head[i] != null)
          $("<th></th>").appendTo(trh).append(head[i]);
      }
    }
  if (!data || data.length == 0) {
    var td = $("<td></td>").appendTo($("<tr></tr>").appendTo(tb)).append(
      "暂无内容");
    if (head)
      td.attr("colspan", head.length);
  } else {
    for (var j = 0; j < data.length; j++) {
      var trc = $("<tr></tr>").appendTo(tb);
      for (var k = 0; k < head.length; k++) {
        var td = $("<td></td>").appendTo(trc);
        var hi = data[j];
        if (onCellCreate) {
          var rs = onCellCreate(td, j, k, hi);
          if (typeof (rs) == "undefined") {
          } else if (null == rs) {
            td.remove();
            continue;
          } else {
            hi = rs;
          }
        }
        td.append(hi);
      }
    }
  }
  if (target) $(target).html(t);
  if (onComplete) onComplete(t);
}

//自动匹配form表单的对象，自动赋值
function jsonToForm(target, data, forceBlank) {
  $(target).find("select").each(function() {
    var v = data[$(this).attr("name")];
    if (v != undefined && (forceBlank || v != '')) $(this).val(v);
  });
  $(target).find("textarea").each(function() {
    var v = data[$(this).attr("name")];
    if (v != undefined && (forceBlank || v != '')) $(this).val(v);
  });
  $(target).find("input").each(function() {
    var type = $(this).attr("type");
    switch (type) {
      case "radio":
        var v = data[$(this).attr("name")];
        if (v != undefined && (forceBlank || v != '')) {
          var radio = $(target).find("input[name='" + $(this).attr("name") + "'][value='" + v + "']");
          $(radio).attr("checked", "checked");
        }
        break;
      default:
        var v = data[$(this).attr("name")];
        if (v != undefined && (forceBlank || v != '')) $(this).val(v);
    }
  });
}


function FillDataToTable() {
  var url = decodeURI(window.location.href);
  var index = url.match(/\d\.html/);
  if (index)
    index = parseInt(index[0]) - 1;
  else
    index = 0;
  var querys = url.match(/(\?|&).+?(?=&|$)/g);
  var query = {};
  for (var i in querys) {
    var key = querys[i].split('=')[0].substring(1);
    var value = querys[i].split('=')[1];
    query[key] = value;
  }
  var param = {};
  var rname = query.rname;
  param.type = 0;
  param.reportName = rname;
  param.year = query.year;
  param.month = ('0' + query.month).slice(-2);
  param.day = ('0' + query.day).slice(-2);
  param.type = parseInt(query.type);
  param.flag = query.flag;
  var _corp = query.corp;
  if (query.subcorp != undefined && query.station != undefined) {
    param.corp = query.subcorp;
    param.station = query.station;
    _corp += query.subcorp + query.station;
  }
  //填相关信息
  $("#corp").html(_corp);
  switch (param.type) {
    case 0: //月报表
      $("#dateInfo").html(query.year + "年" + query.month + "月");
      break;
    case 1: //季度
    case 2: //半年
    case 3: //年报表
      $("#dateInfo").html(query.year + query.flag);
      break;
    default: //日报表
      $("#dateInfo").html(query.year + "年" + query.month + "月" + query.day + "日");
      break;
  }
  $("#reportName").html(query.rname);
  //填充表格
  callSapiServer("/report/statistical_form", function(result) {
    if (!result.isException) {
      var tableList = result.data ? result.data : [];
      $("table").each(function() {
        var tableInfo = tableList[index++];
        //若没有信息就删除该表格
        if (!tableInfo) {
          if (this.previousSibling.tagName == 'DIV')
            this.previousSibling.remove();
          else if (this.previousSibling.nodeName == '#text')
            this.previousSibling.previousSibling.remove();
          this.remove();
          return false;
        }
        if (tableInfo.tableData.length == 0) {
          var o = $(this).prev('.statInfo');
          o.html(o.html().replace(/-?(\d{1,3},?)+(\.\d+)?/g, '0.00'));
          return;
        }
        $(this).prev(".statInfo").html(tableInfo.summation);
        var headList = [];
        $(this).find("thead tr").find("th,td").each(function() {
          headList.push(this.innerHTML);
        });
        var html = "";
        for (var i in tableInfo.tableData) {
          html += "<tr>";
          for (var j in headList) {
            if (headList[j] == '序号')
              html += "<td>" + (parseInt(i) + 1) + "</td>";
            else {
              var mark = tableInfo.tableData[i][headList[j]] == undefined ? '#' : '';
              var value = tableInfo.tableData[i][mark + headList[j]];
              if (mark == '#' && value == "")
                value = 0;
              html += "<td>" + value + "</td>";
            }
          }
          html += "</tr>";
        }
        $(this).find("tbody").append(html);
      });
    }
  }, 'POST', param, false);
}


// 生产调度 拌台打印机配置
window.printInfo = {
  '深圳思伟': {
    '1': {
      printIndex: '-1', //打印机序号或者名称
      printStyle: 'Horient', //Vorient,横版 竖版
    },
    '2': {
      printIndex: '-1', //打印机序号或者名称
      printStyle: 'Horient', //Vorient,横版 竖版
    },
    '3': {
      printIndex: '-1', //打印机序号或者名称
      printStyle: 'Horient', //Vorient,横版 竖版
    },
    '4': {
      printIndex: '-1', //打印机序号或者名称
      printStyle: 'Horient', //Vorient,横版 竖版
    }
  },
  '郑州思伟': {
    '1': {
      printIndex: '-1', //打印机序号或者名称
      printStyle: 'Horient', //Vorient,横版 竖版
    },
    '2': {
      printIndex: '-1', //打印机序号或者名称
      printStyle: 'Horient', //Vorient,横版 竖版
    },
    '3': {
      printIndex: '-1', //打印机序号或者名称
      printStyle: 'Horient', //Vorient,横版 竖版
    },
    '4': {
      printIndex: '-1', //打印机序号或者名称
      printStyle: 'Horient', //Vorient,横版 竖版
    }
  },
  '太仓市建国混凝土制品有限公司': {
    '1': {
      printIndex: '-1', //打印机序号或者名称
      printStyle: 'Horient', //Vorient,横版 竖版
    },
    '2': {
      printIndex: '-1', //打印机序号或者名称
      printStyle: 'Horient', //Vorient,横版 竖版
    },
    '3': {
      printIndex: '-1', //打印机序号或者名称
      printStyle: 'Horient', //Vorient,横版 竖版
    },
    '4': {
      printIndex: '-1', //打印机序号或者名称
      printStyle: 'Horient', //Vorient,横版 竖版
    }
  },
  '吴江永盛混凝土有限公司': {
    '1': {
      printIndex: '-1', //打印机序号或者名称
      printStyle: 'Horient', //Vorient,横版 竖版
    },
    '2': {
      printIndex: '-1', //打印机序号或者名称
      printStyle: 'Horient', //Vorient,横版 竖版
    },
    '3': {
      printIndex: '-1', //打印机序号或者名称
      printStyle: 'Horient', //Vorient,横版 竖版
    },
    '4': {
      printIndex: '-1', //打印机序号或者名称
      printStyle: 'Horient', //Vorient,横版 竖版
    }
  },
  '泉州华源有限公司': {
    '1': {
      printIndex: '-1', //打印机序号或者名称
      printStyle: 'Horient', //Vorient,横版 竖版
    },
    '2': {
      printIndex: '-1', //打印机序号或者名称
      printStyle: 'Horient', //Vorient,横版 竖版
    },
    '3': {
      printIndex: '-1', //打印机序号或者名称
      printStyle: 'Horient', //Vorient,横版 竖版
    },
    '4': {
      printIndex: '-1', //打印机序号或者名称
      printStyle: 'Horient', //Vorient,横版 竖版
    }
  },




}

