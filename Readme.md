# Buyings Api Documentation

## 1. Authentication

### - Sign-up/Register User (Public)
~~~
Method: POST
URL: /register
~~~
### Request: 
~~~json
{
"email":  "",

"password":  "",

"first_name":  "",

"last_name":  "",

"username":  ""
}
~~~

### - Login User (Public)
~~~
Method: POST
URL: /login
~~~
### Request: 
~~~json
{
"email":  "",

"password":  "",
}
~~~