# Project Giữa kỳ môn Lập trình đa nền tảng - VKU

## Mô tả  
Project sử dụng React native Expo cùng với MongoDB
Ứng dụng giúp quản lý bán merch, bao gồm các chức năng:  
- Đăng nhập, đăng ký
- Thêm, sửa, xóa merch  
- Lưu ảnh merch vào MongoDB
## Cài đặt
### Backend  
Clone project:
```bash
git clone https://github.com/user/merch-manager.git
```
Install dependencies
```bash
cd backend  
npm install
```
Build Docker

```bash
cd ../
docker-compose up --build
```
### Frontend
```bash
cd .\frontend\merch-store-app\
```
Install dependencies
```bash
npm install
```
Run Project
```bash
 npx expo start
```
## Folder Structure
```bash
merch-store/
│── backend/
│   ├── models/            # Mô hình dữ liệu MongoDB
│   ├── routes/           # Các route API
│   ├── middleware/       # Middleware xác thực
│   ├── config/           # Cấu hình kết nối DB
│   ├── server.ts         # Server chính
│   │── package.json        # Danh sách thư viện
│   │── tsconfig.json       # Cấu hình TypeScript
│── frontend/merch-store-app
│   │── api/              # Các hàm kết nối tới API
│   │── app/
│   │   │──_layout.tsx  # Bố cục chính của ứng dụng
│   │   │──add.tsx      # màn hình ADD
│   │   │──edit.tsx      # màn hình Edit
│   │   │──home.tsx      # màn hình trang chủ
│   │   │──index.tsx      # màn hình login
│   │   │──registerScreen.tsx   # màn hình register
│   │── interface/         # Interface
│── docker-compose.yml     # Cấu hình Docker




















