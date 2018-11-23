(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{110:function(e,n,t){"use strict";var a=t(0),l=t.n(a),i=t(111),u=t.n(i);n.a=function(e){var n=null,t=[u.a.InputElement];switch(e.invalid&&e.shouldValidate&&e.touched&&t.push(u.a.Invalid),e.elementType){case"input":n=l.a.createElement("input",Object.assign({className:t.join(" ")},e.elementConfig,{value:e.value,onChange:e.changed}));break;case"textarea":n=l.a.createElement("textarea",Object.assign({className:t.join(" ")},e.elementConfig,{value:e.value,onChange:e.changed}));break;case"select":n=l.a.createElement("select",{className:t.join(" "),value:e.value,onChange:e.changed},e.elementConfig.options.map(function(e){return l.a.createElement("option",{key:e.value,value:e.value},e.displayValue)}));break;default:n=l.a.createElement("input",Object.assign({className:t.join(" ")},e.elementConfig,{value:e.value,onChange:e.changed}))}return l.a.createElement("div",{className:u.a.Input},l.a.createElement("label",{className:u.a.Label},e.label),n)}},111:function(e,n,t){e.exports={Input:"Input_Input__3rlVF",Label:"Input_Label__Wm2G6",InputElement:"Input_InputElement__Dmwji",Invalid:"Input_Invalid__4sDgV"}},113:function(e,n,t){"use strict";t.d(n,"b",function(){return l}),t.d(n,"a",function(){return i});var a=t(10),l=function(e,n){return Object(a.a)({},e,n)},i=function(e,n){var t=!0;if(!n)return!0;if(n.required&&(t=""!==e.trim()&&t),n.minLength&&(t=e.length>=n.minLength&&t),n.maxLength&&(t=e.length<=n.maxLength&&t),n.isEmail){t=/[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(e)&&t}if(n.isNumeric){t=/^\d+$/.test(e)&&t}return t}},120:function(e,n,t){e.exports={Auth:"Auth_Auth__uVXkp"}},122:function(e,n,t){"use strict";t.r(n);var a=t(10),l=t(19),i=t(21),u=t(0),c=t.n(u),r=t(2),o=t(123),s=t(110),d=t(30),m=t(36),p=t(120),g=t.n(p),v=t(113);n.default=function(){var e=Object(r.e)(function(e){return e.auth}),n=e.loading,t=e.error,p=e.authRedirectPath,f=Object(r.e)(function(e){return null!==e.auth.token}),h=Object(r.e)(function(e){return e.burgerBuilder.building}),b=Object(r.d)(function(e){return e.auth}),j=b.authUser,E=b.setAuthRedirectPath;Object(u.useEffect)(function(){h||"/"===p||E()},[h,p]);var I=Object(u.useState)({controls:{email:{elementType:"input",elementConfig:{type:"email",placeholder:"Mail Address"},value:"",validation:{required:!0,isEmail:!0},valid:!1,touched:!1},password:{elementType:"input",elementConfig:{type:"password",placeholder:"Password"},value:"",validation:{required:!0,minLength:6},valid:!1,touched:!1}},isSignup:!0}),O=Object(i.a)(I,2),_=O[0],w=O[1],C=[];for(var S in _.controls)C.push({id:S,config:_.controls[S]});var y=C.map(function(e){return c.a.createElement(s.a,{key:e.id,elementType:e.config.elementType,elementConfig:e.config.elementConfig,value:e.config.value,invalid:!e.config.valid,shouldValidate:e.config.validation,touched:e.config.touched,changed:function(n){return function(e,n){var t=Object(v.b)(_.controls,Object(l.a)({},n,Object(v.b)(_.controls[n],{value:e.target.value,valid:Object(v.a)(e.target.value,_.controls[n].validation),touched:!0})));w(Object(a.a)({},_,{controls:t}))}(n,e.id)}})});n&&(y=c.a.createElement(m.a,null));var N=null;t&&(N=c.a.createElement("p",null,t.message));var k=null;return f&&(k=c.a.createElement(o.a,{to:p})),c.a.createElement("div",{className:g.a.Auth},k,N,c.a.createElement("form",{onSubmit:function(e){e.preventDefault(),j({email:_.controls.email.value,password:_.controls.password.value,isSignup:_.isSignup})}},y,c.a.createElement(d.a,{btnType:"Success"},"SUBMIT")),c.a.createElement(d.a,{clicked:function(){w(Object(a.a)({},_,{isSignup:!_.isSignup}))},btnType:"Danger"},"SWITCH TO ",_.isSignup?"SIGNIN":"SIGNUP"))}}}]);
//# sourceMappingURL=3.15d74afc.chunk.js.map