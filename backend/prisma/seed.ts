import { PrismaClient, GameType } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

const sportsGames = [
  // === CRICKET - IPL (3 matches) ===
  {
    name: "Mumbai Indians vs Chennai Super Kings",
    type: GameType.SPORTS,
    sport: "Cricket",
    league: "IPL",
    teamA: "Mumbai Indians",
    teamB: "Chennai Super Kings",
    startTime: new Date("2026-04-15T19:30:00Z"),
    imageUrl:
      "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400",
  },
  {
    name: "Royal Challengers Bangalore vs Kolkata Knight Riders",
    type: GameType.SPORTS,
    sport: "Cricket",
    league: "IPL",
    teamA: "Royal Challengers Bangalore",
    teamB: "Kolkata Knight Riders",
    startTime: new Date("2026-04-16T15:30:00Z"),
    imageUrl:
      "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400",
  },
  {
    name: "Delhi Capitals vs Punjab Kings",
    type: GameType.SPORTS,
    sport: "Cricket",
    league: "IPL",
    teamA: "Delhi Capitals",
    teamB: "Punjab Kings",
    startTime: new Date("2026-04-17T19:30:00Z"),
    imageUrl:
      "https://images.unsplash.com/photo-1512719994953-eabf50895df7?w=400",
  },

  // === CRICKET - BBL (4 matches) ===
  {
    name: "Sydney Thunder vs Melbourne Stars",
    type: GameType.SPORTS,
    sport: "Cricket",
    league: "BBL",
    teamA: "Sydney Thunder",
    teamB: "Melbourne Stars",
    startTime: new Date("2026-01-10T09:15:00Z"),
    imageUrl:
      "https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=400",
  },
  {
    name: "Perth Scorchers vs Adelaide Strikers",
    type: GameType.SPORTS,
    sport: "Cricket",
    league: "BBL",
    teamA: "Perth Scorchers",
    teamB: "Adelaide Strikers",
    startTime: new Date("2026-01-11T08:30:00Z"),
    imageUrl:
      "https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=400",
  },
  {
    name: "Brisbane Heat vs Hobart Hurricanes",
    type: GameType.SPORTS,
    sport: "Cricket",
    league: "BBL",
    teamA: "Brisbane Heat",
    teamB: "Hobart Hurricanes",
    startTime: new Date("2026-01-12T09:45:00Z"),
    imageUrl:
      "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400",
  },
  {
    name: "Sydney Sixers vs Melbourne Renegades",
    type: GameType.SPORTS,
    sport: "Cricket",
    league: "BBL",
    teamA: "Sydney Sixers",
    teamB: "Melbourne Renegades",
    startTime: new Date("2026-01-13T10:00:00Z"),
    imageUrl:
      "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400",
  },

  // === FOOTBALL - EPL (5 matches) ===
  {
    name: "Manchester United vs Liverpool",
    type: GameType.SPORTS,
    sport: "Football",
    league: "EPL",
    teamA: "Manchester United",
    teamB: "Liverpool",
    startTime: new Date("2026-02-08T15:00:00Z"),
    imageUrl:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400",
  },
  {
    name: "Arsenal vs Chelsea",
    type: GameType.SPORTS,
    sport: "Football",
    league: "EPL",
    teamA: "Arsenal",
    teamB: "Chelsea",
    startTime: new Date("2026-02-09T17:30:00Z"),
    imageUrl:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400",
  },
  {
    name: "Manchester City vs Tottenham",
    type: GameType.SPORTS,
    sport: "Football",
    league: "EPL",
    teamA: "Manchester City",
    teamB: "Tottenham",
    startTime: new Date("2026-02-10T12:30:00Z"),
    imageUrl:
      "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=400",
  },
  {
    name: "Newcastle vs Aston Villa",
    type: GameType.SPORTS,
    sport: "Football",
    league: "EPL",
    teamA: "Newcastle",
    teamB: "Aston Villa",
    startTime: new Date("2026-02-11T15:00:00Z"),
    imageUrl:
      "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=400",
  },
  {
    name: "West Ham vs Brighton",
    type: GameType.SPORTS,
    sport: "Football",
    league: "EPL",
    teamA: "West Ham",
    teamB: "Brighton",
    startTime: new Date("2026-02-12T19:45:00Z"),
    imageUrl:
      "https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=400",
  },

  // === FOOTBALL - La Liga (3 matches) ===
  {
    name: "Real Madrid vs Barcelona",
    type: GameType.SPORTS,
    sport: "Football",
    league: "La Liga",
    teamA: "Real Madrid",
    teamB: "Barcelona",
    startTime: new Date("2026-03-20T20:00:00Z"),
    imageUrl: "https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=400",
  },
  {
    name: "Atletico Madrid vs Sevilla",
    type: GameType.SPORTS,
    sport: "Football",
    league: "La Liga",
    teamA: "Atletico Madrid",
    teamB: "Sevilla",
    startTime: new Date("2026-03-21T18:30:00Z"),
    imageUrl:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400",
  },
  {
    name: "Valencia vs Real Sociedad",
    type: GameType.SPORTS,
    sport: "Football",
    league: "La Liga",
    teamA: "Valencia",
    teamB: "Real Sociedad",
    startTime: new Date("2026-03-22T16:15:00Z"),
    imageUrl:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400",
  },

  // === TENNIS - ATP (4 matches) ===
  {
    name: "Australian Open - Men's Final",
    type: GameType.SPORTS,
    sport: "Tennis",
    league: "ATP",
    teamA: "Novak Djokovic",
    teamB: "Carlos Alcaraz",
    startTime: new Date("2026-01-28T08:30:00Z"),
    imageUrl:
      "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400",
  },
  {
    name: "Miami Open - Quarter Final",
    type: GameType.SPORTS,
    sport: "Tennis",
    league: "ATP",
    teamA: "Jannik Sinner",
    teamB: "Daniil Medvedev",
    startTime: new Date("2026-03-28T19:00:00Z"),
    imageUrl: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400",
  },
  {
    name: "Indian Wells - Semi Final",
    type: GameType.SPORTS,
    sport: "Tennis",
    league: "ATP",
    teamA: "Rafael Nadal",
    teamB: "Stefanos Tsitsipas",
    startTime: new Date("2026-03-15T22:00:00Z"),
    imageUrl:
      "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=400",
  },
  {
    name: "Madrid Open - Final",
    type: GameType.SPORTS,
    sport: "Tennis",
    league: "ATP",
    teamA: "Alexander Zverev",
    teamB: "Andrey Rublev",
    startTime: new Date("2026-05-05T14:00:00Z"),
    imageUrl:
      "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400",
  },
];

const casinoGames = [
  // === EVOLUTION - Live Casino (7 games) ===
  {
    name: "Lightning Roulette",
    type: GameType.CASINO,
    provider: "Evolution",
    category: "Live Casino",
    imageUrl:
      "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=400",
  },
  {
    name: "Crazy Time",
    type: GameType.CASINO,
    provider: "Evolution",
    category: "Live Casino",
    imageUrl:
      "https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=400",
  },
  {
    name: "Monopoly Live",
    type: GameType.CASINO,
    provider: "Evolution",
    category: "Live Casino",
    imageUrl:
      "https://images.unsplash.com/photo-1605522324893-7a0fc55da0c1?w=400",
  },
  {
    name: "Mega Ball",
    type: GameType.CASINO,
    provider: "Evolution",
    category: "Live Casino",
    imageUrl:
      "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400",
  },
  {
    name: "Deal or No Deal",
    type: GameType.CASINO,
    provider: "Evolution",
    category: "Live Casino",
    imageUrl:
      "https://images.unsplash.com/photo-1601933470096-c5948abfeba0?w=400",
  },
  {
    name: "Dream Catcher",
    type: GameType.CASINO,
    provider: "Evolution",
    category: "Live Casino",
    imageUrl:
      "https://images.unsplash.com/photo-1629155689241-c8b0c6e8d9c0?w=400",
  },
  {
    name: "Lightning Blackjack",
    type: GameType.CASINO,
    provider: "Evolution",
    category: "Live Casino",
    imageUrl:
      "https://images.unsplash.com/photo-1541278107931-e006523892df?w=400",
  },

  // === PRAGMATIC PLAY (7 games) ===
  {
    name: "Gates of Olympus",
    type: GameType.CASINO,
    provider: "Pragmatic Play",
    category: "Slots",
    imageUrl:
      "https://images.unsplash.com/photo-1606177639279-3652f1225562?w=400",
  },
  {
    name: "Sweet Bonanza",
    type: GameType.CASINO,
    provider: "Pragmatic Play",
    category: "Slots",
    imageUrl:
      "https://images.unsplash.com/photo-1615887023516-4d7e7a7ffaeb?w=400",
  },
  {
    name: "The Dog House Megaways",
    type: GameType.CASINO,
    provider: "Pragmatic Play",
    category: "Slots",
    imageUrl:
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400",
  },
  {
    name: "Wolf Gold",
    type: GameType.CASINO,
    provider: "Pragmatic Play",
    category: "Slots",
    imageUrl:
      "https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?w=400",
  },
  {
    name: "Great Rhino Megaways",
    type: GameType.CASINO,
    provider: "Pragmatic Play",
    category: "Slots",
    imageUrl: "https://images.unsplash.com/photo-1549366021-9f761d450615?w=400",
  },
  {
    name: "John Hunter and the Book of Tut",
    type: GameType.CASINO,
    provider: "Pragmatic Play",
    category: "Slots",
    imageUrl:
      "https://images.unsplash.com/photo-1512699355324-f07e3106dae5?w=400",
  },
  {
    name: "Starlight Princess",
    type: GameType.CASINO,
    provider: "Pragmatic Play",
    category: "Slots",
    imageUrl:
      "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400",
  },

  // === NETENT (6 games) ===
  {
    name: "Starburst",
    type: GameType.CASINO,
    provider: "NetEnt",
    category: "Slots",
    imageUrl:
      "https://images.unsplash.com/photo-1605522324893-7a0fc55da0c1?w=400",
  },
  {
    name: "Gonzo's Quest",
    type: GameType.CASINO,
    provider: "NetEnt",
    category: "Slots",
    imageUrl:
      "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400",
  },
  {
    name: "Dead or Alive 2",
    type: GameType.CASINO,
    provider: "NetEnt",
    category: "Slots",
    imageUrl:
      "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=400",
  },
  {
    name: "Blood Suckers",
    type: GameType.CASINO,
    provider: "NetEnt",
    category: "Slots",
    imageUrl:
      "https://images.unsplash.com/photo-1601933470096-c5948abfeba0?w=400",
  },
  {
    name: "Divine Fortune",
    type: GameType.CASINO,
    provider: "NetEnt",
    category: "Slots",
    imageUrl:
      "https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=400",
  },
  {
    name: "Jack and the Beanstalk",
    type: GameType.CASINO,
    provider: "NetEnt",
    category: "Slots",
    imageUrl:
      "https://images.unsplash.com/photo-1541278107931-e006523892df?w=400",
  },
];

async function main() {
  console.log("🌱 Starting seed...");

  // Clear existing data
  await prisma.favorite.deleteMany();
  await prisma.game.deleteMany();
  await prisma.user.deleteMany();

  console.log("   ✓ Cleared existing data");

  // Create test user
  const hashedPassword = await bcrypt.hash("Test1234", 12);
  const testUser = await prisma.user.create({
    data: {
      name: "Test User",
      email: "test@example.com",
      password: hashedPassword,
    },
  });

  console.log(`   ✓ Created test user: ${testUser.email}`);

  // Create sports games
  const sportsCreated = await prisma.game.createMany({
    data: sportsGames,
  });

  console.log(`   ✓ Created ${sportsCreated.count} sports matches`);

  // Create casino games
  const casinoCreated = await prisma.game.createMany({
    data: casinoGames,
  });

  console.log(`   ✓ Created ${casinoCreated.count} casino games`);

  console.log("✅ Seed completed successfully!");
  console.log(`   - ${sportsCreated.count} sports matches`);
  console.log(`   - ${casinoCreated.count} casino games`);
  console.log(`   - 1 test user`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
