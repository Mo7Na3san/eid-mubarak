import { useState, useEffect, useRef } from "react";

const QUESTIONS = [
  {
    id: 1,
    emoji: "🍪",
    text: "الحلا المفضل بالعيد؟",
    options: [
      { label: "معمول", value: "social" },
      { label: "كليجا", value: "social" },
      { label: "شوكولاتة", value: "sweet" },
      { label: "لقيمات", value: "sweet" },
      { label: "تشيزكيك", value: "vip" },
      { label: "ما آكل حلا أصلًا", value: "coffee" },
    ],
  },
  {
    id: 2,
    emoji: "😴",
    text: "كم ساعة تنام بعد صلاة العيد؟",
    options: [
      { label: "ما أنام", value: "social" },
      { label: "ساعة", value: "vip" },
      { label: "3 ساعات", value: "sweet" },
      { label: "لين المغرب", value: "bear" },
      { label: "أنام وأصحى ثاني يوم", value: "bear" },
    ],
  },
  {
    id: 3,
    emoji: "🎉",
    text: "كم يوم يستمر عيدك؟",
    options: [
      { label: "أول يوم فقط", value: "bear" },
      { label: "يومين", value: "online" },
      { label: "أسبوع كامل", value: "social" },
      { label: "طول ذي الحجة", value: "sheikh" },
    ],
  },
  {
    id: 4,
    emoji: "👀",
    text: "أول شيء تسويه بالعيد؟",
    options: [
      { label: "آكل", value: "sweet" },
      { label: "ألبس وأتصور", value: "vip" },
      { label: "أزور الأهل", value: "sheikh" },
      { label: "أرسل معايدات", value: "online" },
      { label: "أختفي وأنام", value: "bear" },
    ],
  },
  {
    id: 5,
    emoji: "☕",
    text: "قهوتك بالعيد؟",
    options: [
      { label: "عربية", value: "sheikh" },
      { label: "سوداء", value: "coffee" },
      { label: "لاتيه", value: "vip" },
      { label: "شاهي", value: "social" },
      { label: "أي شيء فيه كافيين", value: "coffee" },
    ],
  },
];

const PERSONALITIES = {
  sheikh: {
    id: "sheikh",
    name: 'شيخ العيد',
    emoji: "👑",
    color: "#C8973A",
    bg: "linear-gradient(135deg, #1a0e00 0%, #3d2200 50%, #1a0e00 100%)",
    accent: "#FFD166",
    desc: "أنت عمود الفقار بالعيد. تصحى قبل الأذان، تعرف جدول كل العائلة، وما يبدأ العيد إلا بوجودك.",
    traits: { اجتماعي: 98, منظّم: 95, "صاحب هيبة": 100 },
  },
  bear: {
    id: "bear",
    name: 'الدب الشتوي',
    emoji: "😴",
    color: "#6B8CFF",
    bg: "linear-gradient(135deg, #060d2e 0%, #0d1a4a 50%, #060d2e 100%)",
    accent: "#A0B4FF",
    desc: "بعد الصلاة مباشرة تختفي. العيد بالنسبة لك = نوم + وسادة. مستحيل يرد قبل العصر.",
    traits: { نوم: 100, "راحة نفسية": 95, "بطل الصمت": 88 },
  },
  sweet: {
    id: "sweet",
    name: 'خبير الحلا',
    emoji: "🍫",
    color: "#C0622F",
    bg: "linear-gradient(135deg, #1a0800 0%, #3d1500 50%, #1a0800 100%)",
    accent: "#FF9A5C",
    desc: "تعرف أفضل معمول بالمدينة. تبدأ العيد بالسكر وتنهيه بالقهوة. تقييمك للحلا أخطر من تقييم المطاعم.",
    traits: { "عاشق الحلا": 100, ذوّاقة: 92, "خبير تغذية عكسي": 87 },
  },
  vip: {
    id: "vip",
    name: 'VIP العيد',
    emoji: "📸",
    color: "#C46BAD",
    bg: "linear-gradient(135deg, #1a0015 0%, #3d0030 50%, #1a0015 100%)",
    accent: "#FF90D6",
    desc: "همك الأساسي اللوك والصور. كل ساعة ستوري جديدة. تعرف أفضل إضاءة قبل السلام عليكم.",
    traits: { "حب الكاميرا": 99, أناقة: 96, "جهوزية دائمة": 91 },
  },
  coffee: {
    id: "coffee",
    name: 'مدمن القهوة',
    emoji: "☕",
    color: "#7B9E5A",
    bg: "linear-gradient(135deg, #030e00 0%, #0d2200 50%, #030e00 100%)",
    accent: "#A8D878",
    desc: "ما تعايد قبل الكافيين. تشرب 7 أكواب وتقول 'آخر واحد'. تعيش على القهوة والحلويات.",
    traits: { "إدمان قهوة": 100, صراحة: 89, "طاقة مزيّفة": 94 },
  },
  social: {
    id: "social",
    name: 'مندوب الزيارات',
    emoji: "🏃",
    color: "#4EADA0",
    bg: "linear-gradient(135deg, #00100e 0%, #002825 50%, #00100e 100%)",
    accent: "#6EDDD0",
    desc: "تزور 14 بيت بيوم واحد. حافظ الشوارع بدون خرائط. طاقتك غير بشرية.",
    traits: { اجتماعي: 100, "لياقة بدنية": 90, "بطل الزيارات": 97 },
  },
  online: {
    id: "online",
    name: 'العيد أونلاين',
    emoji: "🤖",
    color: "#A0A0A0",
    bg: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)",
    accent: "#D0D0D0",
    desc: "كل معايداتك واتساب. تختفي بالحقيقة وتظهر بالستوري. اجتماعي رقميًا فقط 😂",
    traits: { "حضور رقمي": 100, "غياب حقيقي": 95, "بطل الإيموجي": 88 },
  },
};

const PERSONALITY_LABELS = {
  sheikh: "شيخ العيد 👑",
  bear: "الدب الشتوي 😴",
  sweet: "خبير الحلا 🍫",
  vip: "VIP العيد 📸",
  coffee: "مدمن القهوة ☕",
  social: "مندوب الزيارات 🏃",
  online: "العيد أونلاين 🤖",
};

function computeResult(answers) {
  const counts = {};
  answers.forEach((v) => { counts[v] = (counts[v] || 0) + 1; });
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}

function StarBg() {
  const stars = Array.from({ length: 48 }, (_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    s: Math.random() * 2 + 0.5,
    d: Math.random() * 3 + 1,
  }));
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {stars.map((st, i) => (
        <div key={i} style={{
          position: "absolute", left: `${st.x}%`, top: `${st.y}%`,
          width: st.s, height: st.s, borderRadius: "50%",
          background: "rgba(255,220,120,0.7)",
          animation: `twinkle ${st.d}s ease-in-out infinite alternate`,
        }} />
      ))}
    </div>
  );
}

function LanternSvg({ color = "#FFD166", style }) {
  return (
    <svg viewBox="0 0 40 70" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
      <rect x="16" y="0" width="8" height="8" rx="2" fill={color} opacity="0.5" />
      <rect x="18" y="7" width="4" height="5" fill={color} opacity="0.6" />
      <ellipse cx="20" cy="18" rx="12" ry="4" fill={color} opacity="0.3" />
      <rect x="8" y="18" width="24" height="34" rx="6" fill={color} opacity="0.15" />
      <rect x="8" y="18" width="24" height="34" rx="6" stroke={color} strokeWidth="1.5" />
      {[0, 1, 2, 3].map(i => (
        <line key={i} x1={8 + i * 8} y1="18" x2={8 + i * 8} y2="52" stroke={color} strokeWidth="0.7" opacity="0.4" />
      ))}
      <ellipse cx="20" cy="52" rx="12" ry="4" fill={color} opacity="0.3" />
      <rect x="18" y="52" width="4" height="8" fill={color} opacity="0.5" />
      <ellipse cx="20" cy="62" rx="4" ry="2" fill={color} opacity="0.7" />
    </svg>
  );
}

export default function EidQuiz() {
  const [screen, setScreen] = useState("intro"); // intro | quiz | result | board
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [leaderboard, setLeaderboard] = useState({});
  const [copied, setCopied] = useState(false);
  const [animating, setAnimating] = useState(false);
  const cardRef = useRef();

  // Load leaderboard from storage
  useEffect(() => {
    async function load() {
      try {
        const res = await window.storage.get("eid-leaderboard", true);
        if (res) setLeaderboard(JSON.parse(res.value));
      } catch {}
    }
    load();
  }, []);

  async function saveToLeaderboard(pid) {
    try {
      const res = await window.storage.get("eid-leaderboard", true);
      const current = res ? JSON.parse(res.value) : {};
      current[pid] = (current[pid] || 0) + 1;
      await window.storage.set("eid-leaderboard", JSON.stringify(current), true);
      setLeaderboard({ ...current });
    } catch {}
  }

  function handleAnswer(value) {
    if (animating) return;
    setAnimating(true);
    const newAnswers = [...answers, value];
    setTimeout(() => {
      setAnimating(false);
      if (step + 1 < QUESTIONS.length) {
        setAnswers(newAnswers);
        setStep(step + 1);
      } else {
        const pid = computeResult(newAnswers);
        setResult(pid);
        saveToLeaderboard(pid);
        setScreen("result");
      }
    }, 300);
  }

  function restart() {
    setStep(0);
    setAnswers([]);
    setResult(null);
    setAnimating(false);
    setScreen("intro");
  }

  function copyResult() {
    const p = PERSONALITIES[result];
    const text = `🎉 عيدك يكشفك!\nأنت شخصية "${p.name}" ${p.emoji}\n${p.desc}\nجرّب الاختبار: أي شخصية عيد أنت؟`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const totalVotes = Object.values(leaderboard).reduce((a, b) => a + b, 0) || 1;

  const styles = {
    root: {
      minHeight: "100vh",
      background: "linear-gradient(160deg, #060410 0%, #0d0820 40%, #06090d 100%)",
      fontFamily: "'Noto Naskh Arabic', 'Amiri', serif",
      direction: "rtl",
      color: "#F5E6C8",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      overflow: "hidden",
    },
    lanternRow: {
      display: "flex",
      gap: 24,
      justifyContent: "center",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      padding: "0 20px",
      pointerEvents: "none",
    },
    container: {
      position: "relative",
      zIndex: 1,
      width: "100%",
      maxWidth: 500,
      padding: "24px 16px 80px",
      boxSizing: "border-box",
    },
  };

  return (
    <div style={styles.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Noto+Naskh+Arabic:wght@400;600;700&display=swap');
        @keyframes twinkle { from { opacity:0.2; transform:scale(0.8); } to { opacity:1; transform:scale(1.2); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes swing { 0%,100%{transform:rotate(-6deg)} 50%{transform:rotate(6deg)} }
        @keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.06)} }
        @keyframes slideIn { from{opacity:0;transform:translateX(40px)} to{opacity:1;transform:translateX(0)} }
        @keyframes barGrow { from{width:0%} to{width:var(--w)} }
        .opt-btn { transition: background 0.2s, transform 0.15s, box-shadow 0.2s; }
        .opt-btn:hover { transform: scale(1.03); }
        .opt-btn:active { transform: scale(0.97); }
        .cta-btn:hover { transform:scale(1.04); box-shadow: 0 0 32px rgba(255,200,80,0.5); }
        .cta-btn:active { transform:scale(0.97); }
      `}</style>
      <StarBg />
      <div style={styles.lanternRow}>
        {[...Array(6)].map((_, i) => (
          <LanternSvg key={i} color={["#FFD166","#FF8A6B","#6B8CFF","#C46BAD","#4EADA0","#FFD166"][i]}
            style={{ width: 32, height: 56, animation: `swing ${2.2 + i * 0.3}s ease-in-out infinite`, transformOrigin: "top center" }} />
        ))}
      </div>

      <div style={styles.container}>
        {screen === "intro" && <IntroScreen onStart={() => setScreen("quiz")} onBoard={() => setScreen("board")} leaderboard={leaderboard} totalVotes={totalVotes} />}
        {screen === "quiz" && (
          <QuizScreen
            question={QUESTIONS[step]}
            step={step}
            total={QUESTIONS.length}
            onAnswer={handleAnswer}
            animating={animating}
          />
        )}
        {screen === "result" && result && (
          <ResultScreen
            personality={PERSONALITIES[result]}
            onRestart={restart}
            onBoard={() => setScreen("board")}
            onCopy={copyResult}
            copied={copied}
            cardRef={cardRef}
          />
        )}
        {screen === "board" && (
          <LeaderboardScreen leaderboard={leaderboard} totalVotes={totalVotes} onBack={() => setScreen("intro")} />
        )}
      </div>
    </div>
  );
}

function IntroScreen({ onStart, onBoard, leaderboard, totalVotes }) {
  const top = Object.entries(leaderboard).sort((a, b) => b[1] - a[1]).slice(0, 1)[0];
  return (
    <div style={{ animation: "fadeUp 0.7s ease both", textAlign: "center" }}>
      <div style={{ fontSize: 72, marginBottom: 8, filter: "drop-shadow(0 0 20px #FFD16688)" }}>🎭</div>
      <div style={{ fontSize: 13, letterSpacing: 4, color: "#FFD166", opacity: 0.7, marginBottom: 8, textTransform: "uppercase" }}>اختبار شخصية</div>
      <h1 style={{ fontFamily: "'Amiri', serif", fontSize: 32, fontWeight: 700, margin: "0 0 8px", color: "#FFE8A0", lineHeight: 1.3 }}>
        أي شخصية عيد أنت؟
      </h1>
      <div style={{ fontSize: 22, marginBottom: 24 }}>🌙✨</div>
      <p style={{ color: "#C8B88A", fontSize: 15, lineHeight: 1.8, marginBottom: 32, maxWidth: 360, margin: "0 auto 32px" }}>
        5 أسئلة بس تكشف شخصيتك الحقيقية بالعيد 👀<br />
        شارك النتيجة وشوف مين أفخم شخصية!
      </p>
      <button className="cta-btn" onClick={onStart} style={{
        background: "linear-gradient(135deg, #C8973A, #FFD166)",
        color: "#1a0800",
        border: "none",
        borderRadius: 999,
        padding: "16px 48px",
        fontSize: 18,
        fontFamily: "'Noto Naskh Arabic', serif",
        fontWeight: 700,
        cursor: "pointer",
        boxShadow: "0 4px 24px rgba(200,151,58,0.4)",
        marginBottom: 16,
        display: "block",
        width: "100%",
        maxWidth: 300,
        margin: "0 auto 16px",
        transition: "all 0.2s",
      }}>
        ابدأ الاختبار 🎉
      </button>
      <button onClick={onBoard} style={{
        background: "transparent",
        border: "1px solid rgba(255,209,102,0.3)",
        color: "#FFD166",
        borderRadius: 999,
        padding: "10px 32px",
        fontSize: 14,
        cursor: "pointer",
        fontFamily: "'Noto Naskh Arabic', serif",
        display: "block",
        margin: "0 auto",
        transition: "all 0.2s",
      }}>
        🏆 اللوحة الشرفية
      </button>
      {top && (
        <div style={{ marginTop: 32, background: "rgba(255,209,102,0.07)", border: "1px solid rgba(255,209,102,0.15)", borderRadius: 16, padding: "14px 20px" }}>
          <div style={{ fontSize: 12, color: "#C8B88A", marginBottom: 4 }}>أكثر شخصية انتشارًا 🔥</div>
          <div style={{ fontSize: 17, color: "#FFD166", fontWeight: 700 }}>
            {PERSONALITIES[top[0]]?.emoji} {PERSONALITIES[top[0]]?.name}
            <span style={{ fontSize: 13, color: "#C8B88A", fontWeight: 400, marginRight: 8 }}>
              {Math.round((top[1] / (Object.values(leaderboard).reduce((a,b)=>a+b,0)||1)) * 100)}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

function QuizScreen({ question, step, total, onAnswer, animating }) {
  return (
    <div key={step} style={{ animation: "slideIn 0.35s ease both" }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={{ fontSize: 13, color: "#C8B88A" }}>سؤال {step + 1} من {total}</span>
          <span style={{ fontSize: 13, color: "#C8B88A" }}>{Math.round(((step) / total) * 100)}%</span>
        </div>
        <div style={{ height: 4, background: "rgba(255,255,255,0.1)", borderRadius: 2, overflow: "hidden" }}>
          <div style={{
            height: "100%",
            width: `${((step) / total) * 100}%`,
            background: "linear-gradient(90deg, #C8973A, #FFD166)",
            borderRadius: 2,
            transition: "width 0.4s ease",
          }} />
        </div>
      </div>

      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{ fontSize: 52, marginBottom: 8, animation: "pulse 2s ease infinite", filter: "drop-shadow(0 0 16px rgba(255,209,102,0.5))" }}>
          {question.emoji}
        </div>
        <h2 style={{ fontFamily: "'Amiri', serif", fontSize: 24, fontWeight: 700, color: "#FFE8A0", margin: 0 }}>
          {question.text}
        </h2>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {question.options.map((opt, i) => (
          <button
            key={i}
            className="opt-btn"
            onClick={() => onAnswer(opt.value)}
            disabled={animating}
            style={{
              background: "rgba(255,209,102,0.07)",
              border: "1.5px solid rgba(255,209,102,0.2)",
              borderRadius: 14,
              padding: "14px 20px",
              color: "#F5E6C8",
              fontSize: 16,
              cursor: "pointer",
              textAlign: "right",
              fontFamily: "'Noto Naskh Arabic', serif",
              backdropFilter: "blur(8px)",
              animationDelay: `${i * 0.05}s`,
              animation: "fadeUp 0.4s ease both",
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function ResultScreen({ personality: p, onRestart, onBoard, onCopy, copied, cardRef }) {
  return (
    <div style={{ animation: "fadeUp 0.6s ease both", textAlign: "center" }}>
      <div ref={cardRef} style={{
        background: p.bg,
        border: `2px solid ${p.color}44`,
        borderRadius: 24,
        padding: "32px 24px",
        marginBottom: 20,
        boxShadow: `0 0 48px ${p.color}22, inset 0 1px 0 ${p.color}33`,
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 0%, ${p.color}18 0%, transparent 70%)`, pointerEvents: "none" }} />
        <div style={{ fontSize: 11, letterSpacing: 4, color: p.accent, opacity: 0.8, marginBottom: 12, textTransform: "uppercase" }}>
          نتيجتك بالعيد
        </div>
        <div style={{ fontSize: 64, marginBottom: 8, filter: `drop-shadow(0 0 24px ${p.color})`, animation: "pulse 2.5s ease infinite" }}>
          {p.emoji}
        </div>
        <div style={{ fontSize: 13, color: p.accent, opacity: 0.7, marginBottom: 4 }}>أنت شخصية</div>
        <h2 style={{ fontFamily: "'Amiri', serif", fontSize: 30, fontWeight: 700, color: p.accent, margin: "0 0 16px" }}>
          "{p.name}"
        </h2>
        <p style={{ color: "#D4C4A0", fontSize: 15, lineHeight: 1.9, marginBottom: 24 }}>{p.desc}</p>
        
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {Object.entries(p.traits).map(([k, v]) => (
            <div key={k}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 13, color: "#C8B88A" }}>{k}</span>
                <span style={{ fontSize: 13, color: p.accent, fontWeight: 700 }}>{v}%</span>
              </div>
              <div style={{ height: 6, background: "rgba(255,255,255,0.08)", borderRadius: 3, overflow: "hidden" }}>
                <div style={{
                  height: "100%",
                  width: `${v}%`,
                  background: `linear-gradient(90deg, ${p.color}88, ${p.accent})`,
                  borderRadius: 3,
                  animation: "barGrow 1.2s ease both",
                  "--w": `${v}%`,
                }} />
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 20, padding: "12px 16px", background: `${p.color}15`, borderRadius: 12, border: `1px solid ${p.color}30`, fontSize: 12, color: "#A09070" }}>
          🌙 أي شخصية عيد أنت؟ — اختبار العيد
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <button className="cta-btn" onClick={onCopy} style={{
          background: copied ? "rgba(100,200,100,0.2)" : `linear-gradient(135deg, ${p.color}, ${p.accent})`,
          color: copied ? "#80FF80" : "#1a0800",
          border: "none",
          borderRadius: 999,
          padding: "14px",
          fontSize: 16,
          fontFamily: "'Noto Naskh Arabic', serif",
          fontWeight: 700,
          cursor: "pointer",
          transition: "all 0.3s",
        }}>
          {copied ? "✅ تم النسخ!" : "📤 شارك نتيجتك"}
        </button>
        <button onClick={onBoard} style={{
          background: "rgba(255,209,102,0.1)",
          border: "1px solid rgba(255,209,102,0.25)",
          color: "#FFD166",
          borderRadius: 999,
          padding: "12px",
          fontSize: 15,
          cursor: "pointer",
          fontFamily: "'Noto Naskh Arabic', serif",
          transition: "all 0.2s",
        }}>
          🏆 اللوحة الشرفية
        </button>
        <button onClick={onRestart} style={{
          background: "transparent",
          border: "1px solid rgba(255,255,255,0.12)",
          color: "#C8B88A",
          borderRadius: 999,
          padding: "12px",
          fontSize: 15,
          cursor: "pointer",
          fontFamily: "'Noto Naskh Arabic', serif",
          transition: "all 0.2s",
        }}>
          🔄 جرّب مجددًا
        </button>
      </div>
    </div>
  );
}

function LeaderboardScreen({ leaderboard, totalVotes, onBack }) {
  const sorted = Object.entries(leaderboard).sort((a, b) => b[1] - a[1]);
  const colors = ["#FFD166", "#C0C0C0", "#CD7F32", "#6B8CFF", "#C46BAD", "#4EADA0", "#C0622F"];
  const medals = ["🥇", "🥈", "🥉"];

  return (
    <div style={{ animation: "fadeUp 0.6s ease both" }}>
      <button onClick={onBack} style={{
        background: "transparent", border: "none", color: "#C8B88A",
        cursor: "pointer", fontSize: 14, marginBottom: 20, padding: 0,
        fontFamily: "'Noto Naskh Arabic', serif",
      }}>← رجوع</button>
      
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{ fontSize: 48, marginBottom: 8 }}>🏆</div>
        <h2 style={{ fontFamily: "'Amiri', serif", fontSize: 26, color: "#FFD166", margin: 0 }}>
          اللوحة الشرفية
        </h2>
        <div style={{ fontSize: 13, color: "#C8B88A", marginTop: 4 }}>
          أكثر شخصيات العيد انتشارًا • {Object.values(leaderboard).reduce((a,b)=>a+b,0)} مشارك
        </div>
      </div>

      {sorted.length === 0 ? (
        <div style={{ textAlign: "center", color: "#C8B88A", padding: "48px 0" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🌙</div>
          لا يوجد بيانات بعد. كن أول من يشارك!
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {sorted.map(([pid, count], i) => {
            const p = PERSONALITIES[pid];
            if (!p) return null;
            const pct = Math.round((count / totalVotes) * 100);
            return (
              <div key={pid} style={{
                background: `rgba(255,255,255,0.04)`,
                border: `1.5px solid ${i === 0 ? "#FFD16644" : "rgba(255,255,255,0.08)"}`,
                borderRadius: 16,
                padding: "14px 18px",
                animation: `fadeUp 0.5s ease ${i * 0.07}s both`,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                  <span style={{ fontSize: 22 }}>{medals[i] || `${i+1}.`}</span>
                  <span style={{ fontSize: 22 }}>{p.emoji}</span>
                  <span style={{ flex: 1, fontSize: 16, color: "#F5E6C8", fontWeight: 600 }}>{p.name}</span>
                  <span style={{ fontSize: 15, color: colors[i] || "#C8B88A", fontWeight: 700 }}>{pct}%</span>
                </div>
                <div style={{ height: 5, background: "rgba(255,255,255,0.07)", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{
                    height: "100%",
                    width: `${pct}%`,
                    background: `linear-gradient(90deg, ${p.color}88, ${p.accent})`,
                    borderRadius: 3,
                    animation: "barGrow 1s ease both",
                    "--w": `${pct}%`,
                    transition: "width 0.8s ease",
                  }} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
