# Buyings Api Specification

## 1. Category
### Get Many (Public)
~~~
Method: GET
URL: /category
~~~
Output :
~~~json
{
    {
        "slug": "vegetable",
        "title": "Vegetable",
        "description": "Fresh Vegetable",
        "Product": []
    }
}
~~~

### Get Detail (Public)
~~~
Method: GET
URL: /category/:slug
~~~
Output :
~~~json
{
    "slug": "vegetable",
    "title": "Vegetable",
    "description": "Fresh Vegetable",
    "Product": []
}
~~~

### Create Data (Admin)
~~~
Method: POST
URL: /category
~~~
Authorization: 
~~~
`Bearer ${Token}`
~~~
Input :
~~~json
{
    "slug": "snack",
    "title": "Snack",
    "description": "Fresh Snack"
}
~~~
Output :
~~~json
{
    "message": "Category created successfully",
    "data": {
        "slug": "snack",
        "title": "Snack",
        "description": "Fresh Snack"
    }
}
~~~

### Update Data (Admin)
~~~
Method: PATCH
URL: /category/:slug
~~~
Authorization: 
~~~
`Bearer ${Token}`
~~~
Input :
~~~json
{
    "slug": "snack",
    "title": "Snack",
    "description": "Fresh Snack"
}
~~~
Output :
~~~json
{
    "message": "Category created successfully",
    "data": {
        "slug": "snack",
        "title": "Snack",
        "description": "Fresh Snack"
    }
}
~~~