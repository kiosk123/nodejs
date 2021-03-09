# 템플릿 엔진 사용하기

## Ejs 템플릿 엔진
Ejs를 사용하기 위해서는 먼저 설치해야한다. JSP 스크립틀릿과 사용방법 비슷
```bash
$ npm i ejs
``` 
### app.js에 ejs 설정
```js
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
```
### 문법
#### 변수 출력
```html
<h1> <%= title %>
```
#### 자바스크립트 코드 사용
```html
<%
    var node = 'Node.js'
    var js = 'Javascript'
%>

<p><%= node %>와 <%= js %></p>
```
#### 문자 이스케이프
```html
<p><%- <div>node</div> %>와 </p> 
<!-- &lt;div;&gt; node &lt;/div;&gt; 출력-->
```

#### 반복문
```html
<ul>
    <%
        var fruits = ['apple', 'grape', 'banana']
        for (var i = 0; i < fruits.length; i++) {
    %>
    <li><%= (i + 1) + '번째' + fruints[i] %></li>
    <%}>
</ul>
```

### 조건문
```html
<% if (isLoggendIn) {>
<p>로그인 되었습니다</p>
<% } else { %>
<p>로그인이 필요합니다.</p>
<% } %>
```

### include
HTML 파일을 포함하려면 `<%-include(파일경로, 데이터)%>`를 한다.  
body.ejs
```html
<%-include('header')%>
<%-include('footer', {category: 'Node.js'})%>
```
footer.ejs
```html
<footer>푸터 입니다. 변수: <%= category %></footer>
```

## 에러 처리 미들웨어
에러 처리 미들웨어는 error라는 템플릿 파일을 렌더링한다.  
렌더링시 `res.locals.message`와 `res.locals.error`에 넣어준 값을 함께 렌더링한다.  
`res.render`에 변수를 대입하는 것 외에도, `res.locals`속성에 값을 대입하여 템플릿 엔진에 변수를 주입할 수 있다.
  
error 객체는 시스템 환경에 development(개발환경)이 아는 경우에만 표시  
배포 환경인 경우에는 에러 메시지가 표시되지 않는다. 에러 메시지가 노출되면 보안에 취약할 수 있기 때문이다.
  
`req.app.get('키')`는 app객체에 접근한다. `app.get(키)`가 `app.set(키)`로 설정했던 값을 가져온다.  
```js
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
```

에러가 발생할 경우 error 페이지에서 렌더링 되는데 error 객체가 운영모드일경우 렌더링 되지 않는다.
error.ejs
```html
<%=error.status%> <!-- 404 -->
<%=error.stack%> <!-- 에러 메시지 -->
```

