const PASSWORD_KEY = "password";
const LOGIN_KEY = "login";
const STARTUPAPP_KEY = "STARTUPAPP";

const PASSWORD_DEFAULT = "xx";
const LOGIN_DEFAULT = "xxx";
const STARTUPAPP_DEFAULT = true;

function connect2Wifi(){
var url = "https://1.1.1.1/login.html";
var login = getProperty(LOGIN_KEY,LOGIN_DEFAULT);
var pass  = getProperty(PASSWORD_KEY,PASSWORD_DEFAULT);
$.ajax({
type: 'post',
url: url,
data: {'buttonClicked':'4','err_flag':'0','err_msg':'0','info_flag':'0','info_msg':'','username':login,'password':pass},
success: function(data){
},
});

}

function checkConnection() {

var networkState = navigator.network.connection.type;

var states = {};
states[Connection.UNKNOWN] = 'Unknown connection';
states[Connection.ETHERNET] = 'Ethernet connection';
states[Connection.WIFI] = 'WiFi connection';
states[Connection.CELL_2G] = 'Cell 2G connection';
states[Connection.CELL_3G] = 'Cell 3G connection';
states[Connection.CELL_4G] = 'Cell 4G connection';
states[Connection.NONE] = 'No network connection';

setConnectionStatus(states[networkState]);

if(getProperty(STARTUPAPP_KEY,STARTUPAPP_DEFAULT)){
if (networkState == Connection.WIFI) {
connect2Wifi();
}
}

}

function saveSettings(){
setProperty(LOGIN_KEY,$('#login').attr("value"));
setProperty(PASSWORD_KEY,$('#pass').attr("value"));
setProperty(STARTUPAPP_KEY,$('#start').attr("value"));
$.mobile.changePage( "#home", { transition: "slideup"} );
}

function cancelSettings(){
$.mobile.changePage( "#home", { transition: "slideup"} );
}

function setConnectionStatus(status){
document.getElementById('status').innerHTML = status

}
function pgOnOnline() {
checkConnection();
}
function pgOffOnline() {
checkConnection();
}

function getProperty(name,defaultvalue){
var val =localStorage.getItem(name);
if(jQuery.isEmptyObject(val)){
return defaultvalue;
}else{
return val;
}
}
function setProperty(name,value){
try {
localStorage.setItem(name, value);
} catch (e) {
if (e == QUOTA_EXCEEDED_ERR) {
alert('Brak miejsca na zapisanie danych.');
}
}
}
