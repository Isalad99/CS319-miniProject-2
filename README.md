# Fresh Potatoes

CS319 Mini Project 2

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** (build tool)
- **React Router v7**
- **TanStack React Query v5**
- **Zustand** (state management)
- **Tailwind CSS v4** + **DaisyUI v5**
- **OMDb API** (movie data)

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Pakin51/CS319-miniProject-2.git
cd CS319-miniProject-2
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

โปรเจกต์นี้ใช้ **OMDb API** สำหรับดึงข้อมูลหนัง สร้างไฟล์ `.env.local` ที่ root ของโปรเจกต์

แล้วเพิ่มบรรทัดต่อไปนี้ลงในไฟล์:

```env
VITE_OMDB_API_KEY=your_api_key_here
```

#### วิธีขอ OMDb API Key

1. ไปที่ [https://www.omdbapi.com/apikey.aspx](https://www.omdbapi.com/apikey.aspx)
2. เลือกแผน **FREE** (1,000 requests/day)
3. กรอกอีเมลแล้วกด Submit
4. เช็กอีเมลเพื่อ **activate** API key
5. นำ key ที่ได้มาใส่แทน `your_api_key_here`

### 4. Run development server

```bash
npm run dev
```

เปิดเบราว์เซอร์ที่ [http://localhost:5173](http://localhost:5173)

---

## Project Structure

```
src/
├── components/       # Reusable components (Navbar, MovieCard, ...)
├── hooks/            # Custom React hooks
├── lib/              # API client & query setup
├── pages/            # Page components (Home, Search, Detail, ...)
├── store/            # Zustand stores (ratings, watchlist)
├── types/            # TypeScript type definitions
└── data/             # Static data (featured movies list)
```
