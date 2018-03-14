# Telus Developer Challenge

## View Live Demo

Navigate to ~~http://35.194.27.76~~. Demo has been taken down.


## Installing / Getting started

You will need Docker

```shell
git clone https://github.com/NisanthanNanthakumar/telus-lighthouse.git

cd telus-lighthouse

docker build -t telus-lighthouse .

docker run --cap-add=SYS_ADMIN --rm -it -p 8080:8080 telus-lighthouse
```

This starts up a local server on port 8080. Navigate to [http://localhost:8080](http://localhost:8080).

Alternatively if you do not have Docker installed,

```shell
git clone https://github.com/NisanthanNanthakumar/telus-lighthouse.git

cd telus-lighthouse

npm install

npm start 
```

Local server is still on port 8080. Navigate to [http://localhost:8080](http://localhost:8080).

## Tests

```shell
npm test
```

## API Specifications

Any route not detailed below will return an

**Error Response**

Status Code **404**

```javascript
{
    "message": "Not Found",
    "description": "The requested resource doesn't exist."
}
```

### `/` Resource

**Url** `/`

**Method** `Get`

**URL Params** 

Query param: `q`

>Description: Url that you would like to check for dataLayer object. If url is not given or query paramater not used, the default url is `https://www.telus.com/en/on/mobility/phones/samsung-galaxy-note-8`

>Required: `false`

>Example: `localhost:8080/?q=https://www.google.com`

Query param: `nocache`

>Description: Skip the cache. Defaults to false. 

>Required: `false`

>Example `localhost:8080/?q=https://www.telus.com&nocache=true`

**Data Params** None

**Success Response**

Status Code: **200**

Returns an HTML file.

**Error Response:**

Status Code: **400**

```javascript
{
    "message": "Bad Request",
    "description": ...
}
```
