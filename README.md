# SvelteKit Scaleable App

แอปพลิเคชัน SvelteKit ที่ออกแบบมาเพื่อรองรับการขยายตัว พร้อมระบบ Authentication และ Admin Panel

## คุณสมบัติ

- 🔐 **Authentication System** - ระบบเข้าสู่ระบบที่ปลอดภัยด้วย JWT
- 👥 **Role-based Access Control** - ควบคุมการเข้าถึงตาม Role (Admin/User)
- 🛡️ **Protected Routes** - เส้นทางที่มีการป้องกัน
- 📊 **Admin Panel** - หน้าจัดการสำหรับผู้ดูแลระบบ
- 🎨 **Modern UI** - ใช้ Tailwind CSS
- 📱 **Responsive Design** - รองรับทุกขนาดหน้าจอ
- 🔄 **API Integration** - ระบบเชื่อมต่อ API ที่ยืดหยุ่น

## โครงสร้างโปรเจ็กต์

```
src/
├── lib/                      # Shared Layer
│   ├── components/           # Component ใช้ซ้ำ
│   ├── layouts/             # Layout หลัก
│   ├── services/            # ฟังก์ชันเรียก API
│   ├── stores/              # Global store
│   ├── utils/               # Helper functions
│   └── types/               # TypeScript interfaces
│
├── features/                # ฟีเจอร์ตามโมดูล
│   ├── auth/                # Authentication
│   │   ├── components/      # LoginForm, RegisterForm
│   │   ├── services/        # authService
│   │   └── stores/          # authStore
│   │
│   └── admin/               # Admin features
│       ├── services/        # adminService
│       └── stores/          # adminStore
│
├── routes/                  # Routing หลัก
│   ├── (public)/           # Routes สาธารณะ
│   ├── (admin)/            # Routes สำหรับ Admin
│   └── (auth)/             # Routes สำหรับ Auth
│
└── hooks.server.ts         # Server hooks
```

## การติดตั้ง

1. Clone โปรเจ็กต์
```bash
git clone [repository-url]
cd sveltekit-scaleable
```

2. ติดตั้ง dependencies
```bash
npm install
# หรือ
bun install
```

3. คัดลอก environment variables
```bash
cp .env.example .env
```

4. แก้ไขไฟล์ `.env` ตามการตั้งค่าของคุณ

5. เริ่มการพัฒนา
```bash
npm run dev
# หรือ
bun dev
```

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
