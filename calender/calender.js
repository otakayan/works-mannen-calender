//セレクトボックス（年）の生成============================================
const generateYear =generateYearRange(1970,2050); //選べる年の範囲
document.querySelector("#year_menu").innerHTML = generateYear; //HTMLのid:year_menuに書き足す
function generateYearRange(start,end) { //start,endは仮引数
    let years=""; //空にしておく
    for(let year=start; year<=end; year++) {
        if(year==2023) {
            years+="<option value='" + year + "' selected>"+year+"年"+"</option>";
        } else {
            years+="<option value='" + year + "'>"+year+"年"+"</option>";
        }
    }
    return years;
}
//========================================================================
let date = new Date(1970, 0, 1); //1970年1月1日の日時を取得
let year = date.getFullYear(); //1970の年を取得
let month = date.getMonth() + 1; //1970の月を取得 +1する
let firstDate = new Date(year, month - 1, 1); //そのままmonthを渡すと翌月になるため-1
let firstDay = firstDate.getDay(); //firstDateの曜日を取得
let lastDate = new Date(year, month, 0); //ここのmonthは-1せず、日の0で先月の末日を表す
let lastDayCount = lastDate.getDate(); //lastDateから末日のデータだけ抜き取る
//=====================================================================
let matsu=[31,28,31,30,31,30,31,31,30,31,30,31];
let matsu2=[31,29,31,30,31,30,31,31,30,31,30,31];
//====================================================================
let selectedYear = document.querySelector('#year_menu');
let selectedMonth = document.querySelector('#month_menu');
let calender = document.querySelector("#calender");
//=========================================================
let cYear = 2023;
let cMonth = 2;
//===============================================================
const prev = document.querySelector('#prev');
const next = document.querySelector('#next');
prev.onclick=prev_month;
next.onclick=next_month;
//=================================================================

function jump() {
    cYear = parseInt(selectedYear.value);
    cMonth = parseInt(selectedMonth.value);
    cMonth = +cMonth;
    showCalender(cYear, cMonth);
    }
function next_month() {
    cYear = selectedYear.value;
    cMonth = selectedMonth.value;
    cMonth = +cMonth;
    if (cYear==2050 && cMonth==12) {
        return
    } else if(cMonth==12) {
        cMonth=1;
        cYear++;
    } else {
        cMonth++;
    }
    selectedYear.value = cYear;
    selectedMonth.value = cMonth;
    showCalender(cYear, cMonth);
}
function prev_month() {
    cYear = selectedYear.value;
    cMonth = selectedMonth.value;
    cMonth = +cMonth;
    if (cYear==1970 && cMonth==1) {
        return
    } else if(cMonth==1) {
        cMonth=12;
        cYear--;
    } else {
        cMonth--;
    }
    selectedYear.value = cYear;
    selectedMonth.value = cMonth;
    showCalender(cYear, cMonth);
    }
// 経過日数を求める===================================================
let pastYears = cYear - 1970;
let pastMonths = Math.abs(cMonth - month);
let pDays=pastYears*365;
let sum=0;
for(let n=0; n<pastMonths; n++) {
    if(cYear%400==0 || (cYear%4==0 && cYear%100!==0)) {
    sum+=matsu2[n];
    } else {
    sum+=matsu[n];
    }
}
let uruCount = 0;
for(let y=1970; y<cYear+1; y++) {
    if(y%400==0 || (y%4==0 && y%100!==0)) {
        uruCount+=1;
    } else {
        continue;
    }
}
if(cMonth<3) {
    uruCount--;
}
pDays=pDays+sum;

let dateNum=0;
dateNum=(pDays%7)+firstDay;
while(1) {
    if (dateNum>6) {
        dateNum-=7;
    } else {
        break;;
    }
}
showCalender(cYear, cMonth);
//==============================================================================
function showCalender(year, month){ //選ばれた年、月を入れたい

    let dayCount = 1;
    let sDate = new Date(year, month-1,1);
    let sDay = sDate.getDay();
    let createHtml = ''; //これから作っていく変数を定義
    month = +month;

    //以下を
    // prev.insertAdjacentHTML("afterend", "<h1 class='midashi'>" + cYear + "年" + cMonth + "月" + "</h1>");
    midashiCreate = document.querySelector("#midashi");
    midashiCreate.innerHTML=cYear+'年'+cMonth+'月';
    // createHtml = '<h1 class="midashi">' + cYear + '年' + cMonth + '月' + '</h1>'; //見出しを作っておく
    createHtml += '<table>' + '<tr>'; //既にあるものに足し上げていくために+=を使う
    
    const weeks = ['日', '月', '火', '水', '木', '金', '土']; //曜日の配列を用意
    //曜日の分だけループを回す
    for(let i=0; i<weeks.length; i++) {
        createHtml +='<td>' + weeks[i] + '</td>'; //week[i]番目を出力
    }
    createHtml += '</tr>'; //ここで曜日の１行修了
    
  //日にちのループ開始
  for(let n=0; n<6; n++) { //最大６週の月まで対応
    createHtml += '<tr>';
    if(cYear%400==0 || (cYear%4==0 && cYear%100!==0)) {
        for(let d=0; d<7; d++) { //日曜から土曜までの7日間を回す
          if(n==0 && d<sDay) { //n==0⇨１行目ということ。d<dateNum→取得している曜日の値がdより小さい
            //土曜日(６)の場合、６週目まで該当
            createHtml += '<td></td>'//空白を生成
          } else if (dayCount > matsu2[month-1]) { //その月の末日よりdayCountが大きいとき
            createHtml += '<td></td>' //空白を生成
          } else { //それ以外
            createHtml += '<td>' + dayCount + '</td>'; //1日ずつ生成
            dayCount++;
            }
        }
    } else {
        for(let d=0; d<7; d++) {
            if(n==0 && d<sDay) { //n==0⇨１行目ということ。d<dateNum→取得している曜日の値がdより小さい
              //土曜日(６)の場合、６週目まで該当  
            createHtml += '<td></td>'//空白を生成
            } else if (dayCount > matsu[month-1]) { //その月の末日よりdayCountが大きいとき
              createHtml += '<td></td>' //空白を生成
            } else { //それ以外
              createHtml += '<td>' + dayCount + '</td>'; //1日ずつ生成
                dayCount++;
            }
        }
        }

    }
    createHtml += '</tr>';
    createHtml += '</table>';
    document.querySelector('#calender').innerHTML = createHtml;
}



