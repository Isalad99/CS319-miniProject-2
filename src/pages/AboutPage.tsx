// src/pages/AboutPage.tsx
import { Link } from "react-router";
import o_pic from "../assets/o2.webp";
import boon_pic from "../assets/boon2.jpeg";
import kong_pic from "../assets/kong2.webp";

interface Member {
  name: string;
  nickname: string;
  studentId: string;
  role: string;
  avatar?: string;
}

const members: Member[] = [
  {
    name: "พชรวรรณ บัวศรีจันทร์",
    nickname: "O",
    studentId: "1660700699",
    role: "Watch Lists และ My review",
    avatar: o_pic,
  },
  {
    name: "นพเชษฐ์ อ่ำกรด",
    nickname: "Boon",
    studentId: "1660707009",
    role: "Movie Detail และ About us",
    avatar: boon_pic,
  },
  {
    name: "ภาคิน หนุนนาค",
    nickname: "Kong",
    studentId: "1660707207",
    role: " Home",
    avatar: kong_pic,
  },
];

function MemberCard({ member }: { member: Member }) {
  return (
    <div className="card bg-base-100 border border-base-300 shadow-md overflow-hidden">
      <div className="card-body items-center text-center gap-1 pt-8 pb-6">
        <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center overflow-hidden mb-3">
          {member.avatar ? (
            <img
              src={member.avatar}
              alt={member.nickname}
              className="w-full h-full object-cover object-top"
            />
          ) : (
            <span className="text-5xl select-none">🥔</span>
          )}
        </div>

        <h2 className="font-semibold text-base text-neutral/80">
          {member.name}
        </h2>
        <p className="text-sm text-neutral/70">({member.nickname})</p>
        <p className="text-sm text-neutral/70">{member.studentId}</p>
        <div className="w-24 border-t-2 border-neutral/80 my-1" />

        <p className="font-semibold text-neutral/80">ทำหน้า {member.role}</p>
      </div>

      <div className="h-6 bg-secondary mx-0 rounded-b-md" />
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <Link to="/" className="text-xs hover:underline">
        ← กลับหน้าหลัก
      </Link>

      <header className="text-center mt-8 mb-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-neutral/80">
          OMDb api
        </h1>
        <a
          href="https://www.omdbapi.com/"
          target="_blank"
          rel="noreferrer"
          className="inline-block mt-4 text-sm font-medium underline"
        >
          https://www.omdbapi.com/
        </a>
      </header>

      <hr className="border-neutral/70 mb-8" />

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {members.map((m) => (
          <MemberCard key={m.studentId} member={m} />
        ))}
      </section>
    </div>
  );
}
