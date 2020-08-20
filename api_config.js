// 此页面用于配置接口地址
const wx_token='/api/cgi-bin/gettoken?corpid=wx9320d37828f8e3fc&corpsecret=Y_JZZKnBrp3hiUoUC-SA7hBU0C-IvS1abbys2QuA3w0';
const wx_userid1='/api/cgi-bin/user/getuserinfo?access_token=';
const wx_userid2='&code=';
const wx_userinfo1='/api/cgi-bin/user/get?access_token=';
const wx_userinfo2='&userid=';
const check_attendence1='http://www.suitdo.cn/HR/api/login/getattendance?userid=';
const check_attendence2='&startdtime=';
const check_attendence3='&enddtime=';
const check_attendence4='&usershift=';

export default {
	wx_token,
	wx_userid1,
	wx_userid2,
	wx_userinfo1,
	wx_userinfo2,
	check_attendence1,
	check_attendence2,
	check_attendence3,
	check_attendence4
}
