## Các folder cần thiết của 1 dự án

Tạo một file `sever.js`

Khởi động dự án

`
npm init -y
`

Giải thích `-y` nó sẽ tạo cho ta một file mặc định `package.json` với các giá trị default

`sever.js` :Khởi động network node js không phải nơi để khai báo middleware

src : bao gồm các folder như là
- models
- controllers
- services
- utils: chứa hàm, class thường sử dụng
- configs:
```
src/
├── models/
├── controllers/
├── services/
├── utils/
└── app.js
```

Tiếp theo khỏi tạo `.env` ở `./`

Và tải express: `npm i express --save`
Thông thường sẽ có một file mới `package-lock.json`  bao gồm tracking những package đã cài dặt

Cấu trúc của file `app.js` sẽ khá đơn giản
```
const express = require('express')
const app = express()

// Khởi tạo middlewares

// khởi tạo db

// Khởi tạo router

// Xử lý lỗi

modulde.exports = app
```

`server.js` sẽ chỉ có một vai trò duy nhất là khai báo port, khởi tạo server.
```
const app = reuqire('./src/app')
const PORT = 3000
const server = app.listen(PORT, () => {
    console.log(`Khởi động server tại port: ${PORT}`)
})

process.on('SIGINT', () =>{ //KHi CTRL C sẽ in ra tắt server
    server.close(()=>{
        console.log("Tắt server")
    })
})
// Hết tác dụng
```
Để chạy server hãy dùng:
`node sever.js` hoặc `npm start` đôi khi ở git bash không chạy được câu lệnh 2

## Các package cần thiét
ex: 
#### Morgan
`npm i morgan --save-dev`


```
# app.js
...
const morgan = require('morgan')

// Khởi tạo middlewares
app.use(morgan("dev"))
// app.use(morgan("combined"))
// app.use(morgan("common"))
// app.use(morgan("short"))
// app.use(morgan("tiny"))
// khoi tao router

app.get('/',(req, res, next)=>{
    return res.status(400).json({
        message: "Ngu lam"
    })
})
...
```
Để kiểm tra từng middleware morgan kết hợp 2 cú pháp sau
```
node sever.js -watch 
//npm start -watch
```
Kết quả:
```
GET / 400 3.457 ms - 21 //dev 400 có màu

// combined bao gồm: IP REQUEST, Thời gian request Phương thức , http phiên bản, status, chạy bằng gì ?
::1 - - [18/Oct/2024:09:54:43 +0000] "GET / HTTP/1.1" 400 21 "-" "curl/8.9.1"

//common cũng tương tự combined nhưng không biết chạy bằng gì

//short bao gồm: IP res, phương thức, http, thời gian phản hồi

//tiny: phương thức, status, thời gian phản hồi
```
và
`crul http://localhost:3000`
`crul.exe http://localhost:3000` với powershell
Kết quả:
`{"message":"Ngu lam"}`

#### helmet
`npm i helmet --save-dev`

Tránh để người khác biết được công nghệ sử dụng của ứng dụng đó là lý do ta cần helmet

`crul http://localhost:3000 --include` ví dụ cho việc truy cứu công nghệ sử dụng

```
const helmet = require('helmet')

// Khởi tạo middlewares
app.use(helmet())
```
#### Compression
Vận chuyển dữ liệu (payload) quá nhiều đến mobile, backend,... tốn băng thông

`npm i compression --save-dev`

```
const compression = require('compression')

// Khởi tạo middlewares
app.use(compression())

// giảm khoảng 10 lần so với không sử dụng
// kiểm tra ở network trong devtool trình duyệt
```
## Lưu ý:
Xóa cái gì trên node cứ vào dir đấy dùng lệnh cho nhanh
`rm <file_name>`

Các folder và file như .env và node_modules sẽ không được đăng lên git vì vậy cần sử dụng `.gitignore`
```
# gitignore
node_modules
.env
```