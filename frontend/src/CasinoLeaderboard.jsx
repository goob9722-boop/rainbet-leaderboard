import React, { useEffect, useState } from "react";

const formatNumber = (n) =>
  Number(n || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export default function CasinoLeaderboard({ apiUrl }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  // Date range: start of month -> today
  const today = new Date();
  const formatDate = (d) => d.toISOString().split("T")[0];
  const start = formatDate(new Date(today.getFullYear(), today.getMonth(), 1));
  const end = formatDate(today);

  useEffect(() => {
    function loadData() {
      fetch(`${apiUrl}?start_at=${start}&end_at=${end}`)
        .then((res) => res.json())
        .then((data) => {
          const list = data.affiliates || data || [];

          const normalized = list.map((item) => ({
            username: item.username || item.affiliate_id || "Unknown",
            id: item.id || item.affiliate_id || "-",
            wagered_amount:
              item.wagered_amount ||
              item.total_wager ||
              item.wager ||
              item.wagered ||
              0,
          }));

          const sorted = [...normalized].sort(
            (a, b) =>
              parseFloat(b.wagered_amount || 0) -
              parseFloat(a.wagered_amount || 0)
          );

          setRows(sorted);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }

    // Load immediately
    loadData();

    // Refresh every 30 seconds
    const interval = setInterval(loadData, 3000);
    return () => clearInterval(interval);
  }, [apiUrl, start, end]);

  const topThree = rows.slice(0, 3);
  const others = rows.slice(3);

  return (
    <div className="goobog-bg">
{/* Floating logos */}
<div className="goobog-floating-logos">
  {[...Array(12)].map((_, i) => (
    <img
      key={i}
      src="/goobfloat.png"
      className="goobog-float"
      style={{
        left: Math.random() * 100 + "%",
        animationDuration: 8 + Math.random() * 10 + "s",
        animationDelay: Math.random() * 5 + "s",
      }}
    />
  ))}
</div>

<div className="spotlight1"></div>
<div className="spotlight2"></div>

{/* generate sparkles */}
{[...Array(25)].map((_, i) => (
  <div
    key={i}
    className="sparkle"
    style={{
      top: Math.random() * 100 + "%",
      left: Math.random() * 100 + "%",
      animationDelay: Math.random() * 6 + "s",
    }}
  />
))}

      <div className="goobog-shell">
        <header className="goobog-header">
          <div className="goobog-logo">Rainbet</div>
          <div className="goobog-subtitle">$200 Monthly Top Earners</div>
        </header>

        {loading && <p className="goobog-loading">Loading leaderboard…</p>}

        {!loading && rows.length === 0 && (
          <p className="goobog-loading">No wagers yet for this period.</p>
        )}

        {!loading && rows.length > 0 && (
          <>
            {/* TOP 3 SLOT CARDS */}
            <section className="goobog-top-row">
              {topThree.map((p, index) => (
                <article
                  key={p.id + index}
                  className={
                    "goobog-slot-card " +
                    (index === 0
                      ? "goobog-slot-card--first"
                      : "goobog-slot-card--other")
                  }
                >
                  <div className="goobog-slot-rank">#{index + 1}</div>

                  <div className="goobog-slot-avatar">
                    <div className="goobog-slot-avatar-inner" />
                  </div>

                  <div className="goobog-slot-username-reel">
                    <span className="goobog-slot-label">PLAYER</span>
                    <div className="goobog-slot-username-text">
                      {p.username}
                    </div>
                  </div>

                  <div className="goobog-slot-wager-reel">
                    <span className="goobog-slot-label">WAGERED</span>
                    <div className="goobog-slot-wager-amount">
                      {formatNumber(p.wagered_amount)}
                    </div>
                  </div>

                  <div className="goobog-slot-prize">
                    <span className="goobog-slot-label">EST. REWARD</span>
                    <div className="goobog-slot-prize-amount">
                      $
                      {index === 0
                        ? "100"
                        : index === 1
                        ? "60"
                        : "40"}
                    </div>
                  </div>

                  <div className="goobog-slot-glow" />
                </article>
              ))}
            </section>

            {/* OTHERS LIST */}
            {others.length > 0 && (
              <section className="goobog-list-wrap">
                <h2 className="goobog-list-title">More High Rollers</h2>
                <ul className="goobog-list">
                  {others.map((p, i) => (
                    <li key={p.id + "mini" + i} className="goobog-list-item">
                      <span className="goobog-list-rank">#{i + 4}</span>
                      <span className="goobog-list-name">{p.username}</span>
                      <span className="goobog-list-wager">
                        {formatNumber(p.wagered_amount)}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* SIMPLE PERIOD INFO */}
            <footer className="goobog-footer">
              <div className="goobog-footer-line">
                Leaderboard period: <strong>{start} → {end}</strong>
              </div>
              <div className="goobog-footer-line">
                Keep spinning – wagers update the board live when you refresh.
              </div>
            </footer>
          </>
        )}
      </div>
    </div>
  );
}
