// Sample data
const newsData = [
  {
    id: 1,
    title: "Mbappé inscrit un triplé historique",
    excerpt: "L'attaquant français réalise une performance exceptionnelle face à Barcelone.",
    category: "ligue1",
    categoryLabel: "Ligue 1",
    image: "football-celebration.png",
    author: "Pierre Martin",
    date: "Il y a 1 heure",
    readTime: "3 min",
  },
  {
    id: 2,
    title: "Transfert surprise : Haaland au Real ?",
    excerpt: "Des négociations secrètes auraient lieu entre le club madrilène et l'attaquant norvégien.",
    category: "transferts",
    categoryLabel: "Transferts",
    image: "football-match-celebration.png",
    author: "Marie Dubois",
    date: "Il y a 3 heures",
    readTime: "5 min",
  },
  {
    id: 3,
    title: "France qualifiée pour la finale",
    excerpt: "L'équipe de France décroche sa place en finale après une victoire convaincante.",
    category: "international",
    categoryLabel: "International",
    image: "football-player.png",
    author: "Luc Bernard",
    date: "Il y a 5 heures",
    readTime: "4 min",
  },
  {
    id: 4,
    title: "Nouveau record d'affluence à Marseille",
    excerpt: "Le Vélodrome affiche complet pour le derby face à Nice.",
    category: "ligue1",
    categoryLabel: "Ligue 1",
    image: "football-stadium-crowd.png",
    author: "Sophie Leroy",
    date: "Il y a 6 heures",
    readTime: "2 min",
  },
]

const matchesData = [
  {
    id: 1,
    homeTeam: "PSG",
    awayTeam: "Real Madrid",
    homeScore: 2,
    awayScore: 1,
    status: "live",
    statusLabel: "En direct",
    time: "75'",
    competition: "Ligue des Champions",
  },
  {
    id: 2,
    homeTeam: "Barcelona",
    awayTeam: "Bayern Munich",
    homeScore: 1,
    awayScore: 3,
    status: "finished",
    statusLabel: "Terminé",
    time: "90'",
    competition: "Ligue des Champions",
  },
  {
    id: 3,
    homeTeam: "Manchester City",
    awayTeam: "Liverpool",
    homeScore: null,
    awayScore: null,
    status: "upcoming",
    statusLabel: "À venir",
    time: "20:45",
    competition: "Premier League",
  },
]

const transfersData = [
  {
    id: 1,
    player: "Kylian Mbappé",
    fromClub: "PSG",
    toClub: "Real Madrid",
    amount: "180M€",
    status: "confirmed",
    statusLabel: "Confirmé",
  },
  {
    id: 2,
    player: "Erling Haaland",
    fromClub: "Manchester City",
    toClub: "Real Madrid",
    amount: "200M€",
    status: "rumor",
    statusLabel: "Rumeur",
  },
  {
    id: 3,
    player: "Pedri",
    fromClub: "Barcelona",
    toClub: "PSG",
    amount: "120M€",
    status: "rumor",
    statusLabel: "Rumeur",
  },
]

const standingsData = [
  { position: 1, team: "PSG", played: 15, won: 12, drawn: 2, lost: 1, points: 38 },
  { position: 2, team: "Monaco", played: 15, won: 10, drawn: 3, lost: 2, points: 33 },
  { position: 3, team: "Marseille", played: 15, won: 9, drawn: 4, lost: 2, points: 31 },
  { position: 4, team: "Lyon", played: 15, won: 8, drawn: 5, lost: 2, points: 29 },
  { position: 5, team: "Nice", played: 15, won: 8, drawn: 3, lost: 4, points: 27 },
]

const topScorersData = [
  { name: "Kylian Mbappé", team: "PSG", goals: 18 },
  { name: "Wissam Ben Yedder", team: "Monaco", goals: 15 },
  { name: "Alexandre Lacazette", team: "Lyon", goals: 12 },
  { name: "Dimitri Payet", team: "Marseille", goals: 11 },
]

const upcomingMatchesData = [
  { teams: "PSG vs Lyon", time: "Dimanche 20:45" },
  { teams: "Marseille vs Monaco", time: "Lundi 21:00" },
  { teams: "Nice vs Lille", time: "Mardi 19:00" },
]

// DOM elements
const navLinks = document.querySelectorAll(".nav-link")
const contentSections = document.querySelectorAll(".content-section")
const mobileMenuBtn = document.getElementById("mobileMenuBtn")
const nav = document.getElementById("nav")
const searchInput = document.getElementById("searchInput")
const filterButtons = document.querySelectorAll(".filter-btn")

// Initialize the app
document.addEventListener("DOMContentLoaded", () => {
  renderNewsGrid()
  renderMatches()
  renderTransfers()
  renderStandings()
  renderSidebarContent()
  setupEventListeners()
})

// Event listeners
function setupEventListeners() {
  // Navigation
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const section = this.dataset.section
      switchSection(section)

      // Update active nav link
      navLinks.forEach((l) => l.classList.remove("active"))
      this.classList.add("active")
    })
  })

  // Mobile menu
  mobileMenuBtn.addEventListener("click", () => {
    nav.classList.toggle("active")
  })

  // Filter buttons
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const filter = this.dataset.filter
      filterNews(filter)

      // Update active filter button
      filterButtons.forEach((b) => b.classList.remove("active"))
      this.classList.add("active")
    })
  })

  // Search functionality
  searchInput.addEventListener("input", function () {
    const query = this.value.toLowerCase()
    searchNews(query)
  })

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      nav.classList.remove("active")
    }
  })
}

// Section switching
function switchSection(sectionName) {
  contentSections.forEach((section) => {
    section.classList.remove("active")
  })

  const targetSection = document.getElementById(`${sectionName}-section`)
  if (targetSection) {
    targetSection.classList.add("active")
  }
}

// Render news grid
function renderNewsGrid(data = newsData) {
  const newsGrid = document.getElementById("newsGrid")

  newsGrid.innerHTML = data
    .map(
      (article) => `
        <article class="news-card" data-category="${article.category}">
            <div class="news-card-image">
                <img src="${article.image}" alt="${article.title}">
            </div>
            <div class="news-card-content">
                <span class="news-card-category">${article.categoryLabel}</span>
                <h3 class="news-card-title">${article.title}</h3>
                <p class="news-card-excerpt">${article.excerpt}</p>
                <div class="news-card-meta">
                    <span>${article.author}</span>
                    <span>${article.date} • ${article.readTime}</span>
                </div>
            </div>
        </article>
    `,
    )
    .join("")
}

// Filter news
function filterNews(filter) {
  const newsCards = document.querySelectorAll(".news-card")

  newsCards.forEach((card) => {
    if (filter === "all" || card.dataset.category === filter) {
      card.style.display = "block"
    } else {
      card.style.display = "none"
    }
  })
}

// Search news
function searchNews(query) {
  if (query === "") {
    renderNewsGrid()
    return
  }

  const filteredNews = newsData.filter(
    (article) =>
      article.title.toLowerCase().includes(query) ||
      article.excerpt.toLowerCase().includes(query) ||
      article.categoryLabel.toLowerCase().includes(query),
  )

  renderNewsGrid(filteredNews)
}

// Render matches
function renderMatches() {
  const matchesContainer = document.getElementById("matchesContainer")

  matchesContainer.innerHTML = matchesData
    .map(
      (match) => `
        <div class="match-card">
            <div class="match-teams">
                <div class="team">
                    <div class="team-logo">⚽</div>
                    <span>${match.homeTeam}</span>
                </div>
                <div class="match-score">
                    ${match.homeScore !== null ? `${match.homeScore} - ${match.awayScore}` : "vs"}
                </div>
                <div class="team">
                    <span>${match.awayTeam}</span>
                    <div class="team-logo">⚽</div>
                </div>
            </div>
            <div class="match-info">
                <div class="match-status ${match.status}">${match.statusLabel}</div>
                <div class="match-time">${match.time}</div>
                <div class="match-competition">${match.competition}</div>
            </div>
        </div>
    `,
    )
    .join("")
}

// Render transfers
function renderTransfers() {
  const transfersContainer = document.getElementById("transfersContainer")

  transfersContainer.innerHTML = transfersData
    .map(
      (transfer) => `
        <div class="transfer-card">
            <div class="transfer-header">
                <div class="transfer-player">${transfer.player}</div>
                <div class="transfer-amount">${transfer.amount}</div>
            </div>
            <div class="transfer-details">
                <div class="transfer-clubs">
                    <div class="transfer-club">
                        <div class="team-logo">⚽</div>
                        <span>${transfer.fromClub}</span>
                    </div>
                    <div class="transfer-arrow">→</div>
                    <div class="transfer-club">
                        <div class="team-logo">⚽</div>
                        <span>${transfer.toClub}</span>
                    </div>
                </div>
                <div class="transfer-status ${transfer.status}">${transfer.statusLabel}</div>
            </div>
        </div>
    `,
    )
    .join("")
}

// Render standings
function renderStandings() {
  const standingsContainer = document.getElementById("standingsContainer")

  standingsContainer.innerHTML = `
        <div class="standings-table">
            <table>
                <thead>
                    <tr>
                        <th class="position">#</th>
                        <th>Équipe</th>
                        <th>J</th>
                        <th>G</th>
                        <th>N</th>
                        <th>P</th>
                        <th>Pts</th>
                    </tr>
                </thead>
                <tbody>
                    ${standingsData
                      .map(
                        (team) => `
                        <tr>
                            <td class="position">${team.position}</td>
                            <td>
                                <div class="team">
                                    <div class="team-logo">⚽</div>
                                    <span>${team.team}</span>
                                </div>
                            </td>
                            <td>${team.played}</td>
                            <td>${team.won}</td>
                            <td>${team.drawn}</td>
                            <td>${team.lost}</td>
                            <td><strong>${team.points}</strong></td>
                        </tr>
                    `,
                      )
                      .join("")}
                </tbody>
            </table>
        </div>
    `
}

// Render sidebar content
function renderSidebarContent() {
  // Sidebar standings
  const sidebarStandings = document.getElementById("sidebarStandings")
  sidebarStandings.innerHTML = `
        <table>
            ${standingsData
              .slice(0, 5)
              .map(
                (team) => `
                <tr>
                    <td class="position">${team.position}</td>
                    <td>
                        <div class="team">
                            <div class="team-logo">⚽</div>
                            <span>${team.team}</span>
                        </div>
                    </td>
                    <td><strong>${team.points}</strong></td>
                </tr>
            `,
              )
              .join("")}
        </table>
    `

  // Top scorers
  const topScorers = document.getElementById("topScorers")
  topScorers.innerHTML = topScorersData
    .map(
      (scorer) => `
        <div class="scorer-item">
            <div class="scorer-info">
                <div class="team-logo">⚽</div>
                <div>
                    <div class="scorer-name">${scorer.name}</div>
                    <div class="scorer-team">${scorer.team}</div>
                </div>
            </div>
            <div class="scorer-goals">${scorer.goals}</div>
        </div>
    `,
    )
    .join("")

  // Upcoming matches
  const upcomingMatches = document.getElementById("upcomingMatches")
  upcomingMatches.innerHTML = upcomingMatchesData
    .map(
      (match) => `
        <div class="upcoming-match">
            <div class="upcoming-match-teams">${match.teams}</div>
            <div class="upcoming-match-time">${match.time}</div>
        </div>
    `,
    )
    .join("")
}

// Auto-refresh live scores (simulation)
setInterval(() => {
  const liveMatches = matchesData.filter((match) => match.status === "live")
  liveMatches.forEach((match) => {
    // Simulate score updates
    if (Math.random() > 0.95) {
      if (Math.random() > 0.5) {
        match.homeScore++
      } else {
        match.awayScore++
      }
      renderMatches()
    }
  })
}, 10000) // Update every 10 seconds
